$(document).on('click', '#add_new_course', function () {
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url)
    });
});
$(document).on('click', '#add_objective', function () {
    var $objective = $('#hidden').find('.objective').clone();
    $objective.attr('data-id', $('#objectives .objective').length + 1);
    $('#objectives').first().children('ol').append($objective);
});
$(document).on('ready pjax:success', function () {
    $('#objectives.dd').nestable();
});
$(document).on('change', 'input[name=objective-content]', function () {
    $(this).closest('.objective').data('content', $(this).val());
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
            link.innerHTML = data.file_name;
            $container.find('.filenameplaceholder ').html(link).removeClass('hidden');
            $container.find('.removefile')
                    .attr('data-action', data.remove_action)
                    .removeClass('hidden');
        }
    });

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

$(document).on('click', '#save-all, #publish', function () {
    App.blockUI();
    $('#objectives .objective .form-group').removeClass('has-error');
    $('#objectives .objective .help-block').remove();
    $('#main-form .val').closest('.form-group').removeClass('has-error')
            .find('help-block').remove();
    var parent = this;
    this.blocked = this.blocked || false;
    if (this.blocked) {
        return;
    }
    this.blocked = true;
    var url = $(this).data('action');
    var data = {};
    var $mainForm = $('#main-form');
    data['title'] = $mainForm.find('[name=title]').val();
    data['section'] = $mainForm.find('[name=section]').val();
    data['description_overall'] = $mainForm.find('[name=description_overall]').val();
    data['description_section'] = $mainForm.find('[name=description_section]').val();
    data['description_course'] = $mainForm.find('[name=description_course]').val();
    data['max_students'] = $mainForm.find('[name=max_students]').val();
    data['estimated_time'] = $mainForm.find('[name=estimated_time]').val();
    data['level_access'] = $mainForm.find('[name=level_access]').val();
    data['test_your_self'] = $mainForm.find('[name=test_your_self]').val();
    data['dependent_course'] = $mainForm.find('[name=dependent_course]').val();
    data['objectives'] = $('#objectives').nestable('serialize');
    $.ajax({
        method: 'patch',
        url: url,
        data: data,
        success: function (data) {
            if (data.errors) {
                $.each(data.errors.main, function (field, errors) {
                    $('#main-form [name=' + field + ']').closest('.form-group')
                            .addClass('has-error')
                            .append('<p class="help-block error-help-block">' + errors[0] + '</p>')
                });
                $.each(data.errors.objectives, function (id) {
                    var $objective = $('#objectives [data-id=' + id + ']');
                    $objective.find('[name=objective-content]').first().closest('.form-group')
                            .addClass('has-error')
                            .after('<p class="help-block text-danger">Objetive can\'t be empty.</p>');
                });
                return;
            }
            toastr['success']('Course successfuly saved', "Done");
            pjaxPage(data.url);
        },
        complete: function () {
            App.unblockUI();
            parent.blocked = false;
        }
    });
});
$(document).on('change', '[name=dependent_course]', function () {
    if ($(this).val() == "") {
        $('#level-access-test').addClass('hidden');
    } else {
        $('#level-access-test').removeClass('hidden');
    }
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
                table.row($row).remove().draw();
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });
});
$(document).on('click', '.remove_objective', function () {
    var $objective = $(this).closest('.objective');
//    var id = $objective.find('input[name=id]').val();
//    $.ajax({
//        url: "{{route('admin.one_on_one.delete_objective')}}",
//        method: "delete",
//        data: {id: id},
//        success: function (data) {
    $objective.remove();
//    toastr['success']('Objective deleted successfully', "Done");
//        }
//    });
});
$(document).on('change', '#main-form .val', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('help-block').remove();
});
$(document).on('change', '#objectives .objective [name=objective-content]', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.objective').find('.help-block').remove();
});
