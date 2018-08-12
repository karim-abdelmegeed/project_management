$(document).on('click', '#add_new_quiz', function () {
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url)
    });
});
$(document).on('click', '#add_question', function () {
	
    var $question = $('#templates').find('.question').clone();
    $('#questions').first().children('ol').append($question);
    var quiz_id = $(this).data('quiz_id');
    var url = "/admin/quizzes/question_add/"+quiz_id;
    
    
    $.ajax({
        method: 'post',
        url: url,
        cache: false,
        contentType: false,
        processData: false,
        data: {
            quiz_id:1,
            },
        success: function (data) {
            $('.dd-list .question:last').attr('data-id',data);
            $('#questions .fileinput').attr('data-action','/admin/quizzes/'+data+'/upload_question_file');
            $('#questions .removefile').attr('data-action','/admin/quizzes/'+data+'/delete_question_file');
            var answers_url = '/admin/quizzes/answers/'+data;
            $question.find('.answers_links').attr('href',answers_url);
            $('.popup').magnificPopup({
              type: 'iframe'
              // other options
            });
            
        }
    });
});
$(document).on('ready pjax:success', function () {
    $('#questions.dd').nestable();
});
$(document).on('change', 'input[name=objective-content]', function () {
    $(this).closest('.question').data('content', $(this).val());
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

$(document).on('click', '#save-all', function () {
	
    var url = $(this).data('action');
    var data = {};
    var $mainForm = $('#main-form');
    data['title'] = $mainForm.find('[name=quiz-title]').val();
    data['weight'] = $mainForm.find('[name=quiz-weight]').val();
    
    data['questions'] = $('#questions').nestable('serialize');
	
    $.ajax({
        method: 'patch',
        url: url,
        data: data,
        success: function (data) {
            toastr['success']('Quiz successfuly saved', "Done");
           // pjaxPage(data.url);
        },
        error: function (data) {
            
        }
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
                table.row($row).remove().draw();
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });
});
$(document).on('click', '.remove_question', function () {
    var $question = $(this).closest('.question');
//    var id = $objective.find('input[name=id]').val();
//    $.ajax({
//        url: "{{route('admin.one_on_one.delete_objective')}}",
//        method: "delete",
//        data: {id: id},
//        success: function (data) {
            $question.fadeOut(500, function(){ 
               $question.remove(); 
            });
//    toastr['success']('Objective deleted successfully', "Done");
//        }
//    });
});
// Answers ------------------------------------------------------------------
$(document).on('click', '#add_answer', function () {
	
    var $answer = $('#templates').find('.answer').clone();
    $('#answers').first().children('ol').append($answer);
    var question_id= $(this).data('question_id');
    var url = "/admin/quizzes/answer_add/"+question_id+"";
    
    $.ajax({
        method: 'post',
        url: url,
        cache: false,
        contentType: false,
        processData: false,
        data: {
            quiz_id:1,
            },
        success: function (data) {
            $('.dd-list .answer:last').attr('data-id',data);
            $('#answers .fileinput').attr('data-action','/admin/quizzes/'+data+'/upload_answer_file');
            $('#answers .removefile').attr('data-action','/admin/quizzes/'+data+'/delete_answer_file');
            $answer.find("input[name~='correct']").attr("id","radio"+data);
            $answer.find(".rLabel").attr("for","radio"+data);
            
        }
    });
});

$(document).on('click', '#save-all-answers', function () {
	
    var url = $(this).data('action');
    var data = {};
    var $mainForm = $('#main-form');
    
    
    data['answers'] = $('#answers').nestable('serialize');
	
    $.ajax({
        method: 'patch',
        url: url,
        data: data,
        success: function (data) {
            toastr['success']('Quiz successfuly saved', "Done");
           // pjaxPage(data.url);
        },
        error: function (data) {
            
        }
    });
});

$(document).on('click', '.remove_answer', function () {
    var $answer = $(this).closest('.answer');
//    var id = $objective.find('input[name=id]').val();
//    $.ajax({
//        url: "{{route('admin.one_on_one.delete_objective')}}",
//        method: "delete",
//        data: {id: id},
//        success: function (data) {
    $answer.remove();
//    toastr['success']('Objective deleted successfully', "Done");
//        }
//    });
});

$(document).on('ready pjax:success', function () {
    $('#answers.dd').nestable();
});
$(document).on('change', 'input[name=objective-content]', function () {
    $(this).closest('.answer').data('content', $(this).val());
});
$(document).on('change', 'input[name=question-weight]', function () {
    $(this).closest('.question').data('weight', $(this).val());
});
$(document).on('change', 'input[name="correct"]', function () {
    if($(this).is(":checked")) {
            selectedValue = 1;
            
        }else{
           selectedValue = 0; 
        }
     
    
    $(this).closest('.answer').attr('data-correct', selectedValue);
});

