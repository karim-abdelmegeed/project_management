$(document).on('click', '#add_new', function () {
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url)
    });
});



$(document).on('click', '.filepicker', function () {
    $(this).closest('.form-group').find('.fileinput').click();
});
$(document).on('change', '.fileinput', function () {
    var $container = $(this).closest('.form-group');
    $container.find('.filepicker').addClass('hidden');
    $container.find('.filenameplaceholder').addClass('hidden');
    var $progressBar = $container.find('.progress-bar');
    $progressBar.removeClass('hidden').find('span').removeClass('hidden');
    $container.find('.cancel').removeClass('hidden');
    var data = new FormData();
    var $file = $(this);
    var url = $file.data('action');
    data.append('file', $file[0].files[0]);
    $.ajax({
        method: 'post',
        url: url,
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        beforeSend: function (xhr) {
            $file.val("");
            $container.find('.cancel').click(function () {
                xhr.abort();
                $container.find('.cancel').addClass('hidden');
                $container.find('.filepicker').removeClass('hidden');
                $container.find('.filenameplaceholder').removeClass('hidden');
                $progressBar.width(0);
                $progressBar.addClass('hidden');
            })
        },
        xhr: function () {
            // get the native XmlHttpRequest object
            var xhr = $.ajaxSettings.xhr();
            // set the onprogress event handler
            xhr.upload.onprogress = function (evt) {
                var percent = Math.ceil(evt.loaded / evt.total * 100);
                $progressBar.width(percent + '%');
                $progressBar.find('span').html(percent + '%');
            };
            // return the customized object
            return xhr;
        },
        success: function (data) {
            $progressBar.width(0);
            $progressBar.addClass('hidden');
            $container.find('.cancel').addClass('hidden');
            link = document.createElement('a');
            link.href = data.download_action;
            link.classList.add('btn');
            link.classList.add('btn-primary');
            link.innerHTML = "Download file";
            
            $container.find('.filenameplaceholder ').html(link).removeClass('hidden');
            $container.find('.removefile')
                    .attr('data-action', data.remove_action)
                    .removeClass('hidden');
        }
    });

});
$(document).on('change', '.material_type', function () {
    selectedOption = $(this).val();
    
    if(selectedOption == "File"){
        $('.fileUploading').removeClass('hide');
        $('.youtube').addClass('hide');
    }
    if(selectedOption == "Video"){
        $('.youtube').removeClass('hide');
        $('.fileUploading').addClass('hide');
    }
    if(selectedOption == ""){
        $('.youtube').addClass('hide');
        $('.fileUploading').addClass('hide');
    }
});

$(document).on('change', '.material_type1', function () {
    selectedOption = $(this).val();
    
    
    if(selectedOption == "Course"){
        $('.courseType').removeClass('hide');
        
    }
    if(selectedOption == "Training"){
        
        $('.courseType').addClass('hide');
    }
    
});


$(document).on('click', '.removefile', function (e) {
    var $container = $(this).closest('.form-group');
    e.preventDefault();
    $.ajax({
        method: 'delete',
        url: $(this).data('action'),
        success: function () {
            $container.find('.filenameplaceholder').html('No file selected');
            $container.find('.removefile').addClass('hidden');
            $container.find('.filepicker').removeClass('hidden');
        }
    });
});
$(document).on('change', '.editable-select', function () {
    selectedOption = $(this).val();
    
    
    if(selectedOption == ""){
        $('#delete-course').addClass('hide');
        
    }
    
    
});
$('.editable-select').editableSelect().on('select.editable-select', function (e,li) {
    if(li.val() != ""){
        $('#delete-course').removeClass('hide');
    }else{
        $('#delete-course').addClass('hide');
    }
});

$(document).on('click', '#save-all', function () {
	
    var url = $(this).data('action');
    var data = {};
    var $mainForm = $('#main-form');
    data['name'] = $mainForm.find('[name=material_name]').val();
    data['material_type'] = $mainForm.find('[name=material_type1]').val();
    data['type'] = $mainForm.find('[name=material_type]').val();
    data['order'] = $mainForm.find('[name=material_order]').val();
    data['youtube_id'] = $mainForm.find('[name=youtube_id]').val();
    data['course_id'] = $mainForm.find('[name=course_id]').val();
   
   
    if(data['name'] == ""){
        toastr['error']('Please insert a name', "Sorry");
        return false;
    }
    if(data['material_type'] == ""){
        toastr['error']('Please select a material type', "Sorry");
        return false;
    }
    if(data['type'] == ""){
        toastr['error']('Please select a type', "Sorry");
        return false;
    }
    if(data['type'] == "Video" && data['youtube_id'] == ""){
        toastr['error']('Please insert a Youtube ID', "Sorry");
        return false;
    }
    if(data['material_type'] == "Course" && data['course_id'] == ""){
        toastr['error']('Please select a course', "Sorry");
        return false;
    }
    
    
	
    $.ajax({
        method: 'patch',
        url: url,
        data: data,
        success: function (data) {
            toastr['success']('Material successfuly saved', "Done");
            var url = document.URL;
                    var goTo = url.replace("#", "");
                    pjaxPage(goTo);
        },
        error: function (data) {
            
        }
    });
});
$(document).on('click', '#delete-course', function () {
	
    var data = {};
    var $mainForm = $('#main-form');
    
    data['course_id'] = $mainForm.find('[name=course_id]').val();
    swal({title: "Are you sure?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", closeOnConfirm: true}, function () {
        $.ajax({
        method: 'get',
        url: '/admin/material/deleteCourse/'+data['course_id'],
        success: function (data) {
            toastr['success']('Course successfuly deleted', "Done");
            var url = document.URL;
                    var goTo = url.replace("#", "");
                    pjaxPage(goTo);
            
        },
        error: function (data) {
            
        }
    });
    });
    
    
});

$(document).on('click', '.remove-course', function (e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).attr('href');
    swal({title: "Are you sure?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", closeOnConfirm: false}, function () {
        $.ajax({
            url: action,
            method: 'delete',
            success: function () {
                swal("Deleted!", 'Successfuly deleted', "success");
                
                $row.remove();
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });
});

