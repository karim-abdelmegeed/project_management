$(document).on('ready pjax:success', function () {
    dragula([$('#sessions')[0]]);

});
$(document).on('click', '#add_new_template', function () {
    var url = $(this).data('action');
    console.log(url);
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
$(document).on('click', '#add_session', function () {
    $.post($(this).data('url'), function (data) {
        var $session = $('#hidden').find('.session').clone();
        $('#sessions').append($session);
        $session.find('input[name=id]').val(data.id);
        $session.attr('data-id', data.id)
        $session.find('.content .fileinput').attr('data-action', data.upload_content_action);
        $session.find('.material .fileinput').attr('data-action', data.upload_material_action);
        $session.find('.remove_session').attr('data-action', data.remove_session_action);
    });
});
$(document).on('click', '.remove_session', function () {
    var $level = $(this).closest('.session');
    var url = $(this).data('action');
    $.ajax({
        url: url,
        method: "delete",
        success: function (data) {
            $level.remove();
            toastr['success']('Session deleted successfully', "Done");
        }
    });
});
$(document).on('click', '#save-all, #publish', function () {
    var parent = this;
    this.blocked = this.blocked || false;
    if (this.blocked) {
        return;
    }
    this.blocked = true;
    App.blockUI();
    $('#main-form .val').closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
    $('#sessions .session .form-group').removeClass('has-error')
            .find('.help-block').remove();
    var url = $(this).data('action');
    var data = {};
    var $mainForm = $('#main-form');
    data['template_title'] = $mainForm.find('[name=template_title]').val();
    data['course'] = $mainForm.find('[name=course]').val();
    data['homework_count'] = $mainForm.find('[name=homework_count]').val();
    var sessions = [];
    $('#sessions').find('.session').each(function () {
        var session = {};
        session['id'] = $(this).find('[name=id]').val();
        session['title'] = $(this).find('[name=title]').val();
        session['duration'] = $(this).find('[name=duration]').val();
        sessions.push(session);
    });
    data['sessions'] = sessions;

    $.ajax({
        method: 'patch',
        url: url,
        data: data,
        success: function (data) {
            if (data.errors) {
                $.each(data.errors.main, function (field, errors) {
                    $('#main-form [name=' + field + ']').closest('.form-group')
                            .addClass('has-error')
                            .append('<div class="help-block error-help-block">' + errors[0] + '</div>')
                });
                $.each(data.errors.sessions, function (id, list) {
                    var $session = $('#sessions .session[data-id=' + id + ']');
                    $.each(list, function (field, errors) {
                        $session.find('[name=' + field + ']').closest('.form-group')
                                .addClass('has-error')
                                .append('<div class="help-block">' + errors[0] + '</div>');
                    });
                });
                toastr['error']('Please correct the mentioned erros and try again', "Not saved");
                return;
            }
            toastr['success']('Course successfuly saved', "Done");
//            pjaxPage(data.url);
        },
        complete: function () {
            parent.blocked = false;
            App.unblockUI();
        }
    });
});
$(document).on('click', '.remove-template', function (e) {
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
$(document).on('change', '#main-form .val', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
});
$(document).on('change', '#sessions .session input', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
})