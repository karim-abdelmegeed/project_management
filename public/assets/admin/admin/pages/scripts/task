$(document).on('click', '#add_new_course', function () {
    var parent = this;
    this.blocked = this.blocked || false;
    if (this.blocked) {
        return;
    }
    this.blocked = true;
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url);
    }).complete(function () {
        parent.blocked = false;
    });
});
$(document).on('ready pjax:success', function () {
    dragula([$('#levels')[0]]);
//    dragula([$('#objectives')[0]]);
    $('#objectives.dd').nestable();
});
$(document).on('change', 'input[name=objective-content]', function () {
    $(this).closest('.objective').data('content', $(this).val());
});
$(document).on('click', '#add_level', function () {
    App.blockUI();
    $.post($(this).data('url'), function (data) {
        var $level = $('#hidden').find('.level').clone();
        $('#levels').append($level);
        $level.find('input[name=id]').val(data.id);
        $level.attr('data-id', data.id);
        $level.find('.ig .fileinput').attr('data-action', data.upload_ig_action);
        $level.find('.material .fileinput').attr('data-action', data.upload_material_action);
        $level.find('.remove_level').attr('data-action', data.remove_level_action);
    }).complete(function () {
        App.unblockUI();
    });
});
$(document).on('click', '.remove_level', function () {
    App.blockUI();
    var $level = $(this).closest('.level');
    var id = $level.find('input[name=id]').val();
    var url = $(this).data('action')
    $.ajax({
        url: url,
        method: "delete",
        data: {id: id},
        success: function (data) {
            $level.remove();
            toastr['success']('Level deleted successfully', "Done");
        },
        complete: function () {
            App.unblockUI();
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
    $('#levels .level .form-group').removeClass('has-error');
    $('#levels .level .form-group .help-block').remove();
    $('#objectives .objective .form-group').removeClass('has-error');
    $('#objectives .objective .help-block').remove();
    $('#pricings .pricing .form-group').removeClass('has-error');
    $('#pricings .pricing .text-danger').remove();
    $('#main-form .global-errors').addClass('hidden').html("");
    var data = {};
    var url = $(this).data('action');
    data['section'] = $('#main-form').find('select[name=section]').val();
    data['course_title'] = $('#main-form').find('input[name=course_title]').val();
    data['max_frequency'] = $('#main-form').find('select[name=max_frequency]').val();
    data['session_duration'] = $('#main-form').find('input[name=session_duration]').val();
    data['max_start_date'] = $('#main-form').find('input[name=max_start_date]').val();
    data['description_overall'] = $('#main-form').find('textarea[name=description_overall]').val();
    data['description_section'] = $('#main-form').find('textarea[name=description_section]').val();
    data['description_course'] = $('#main-form').find('textarea[name=description_course]').val();
    data['has_vc'] = $('#main-form').find('input[name=has_vc]').is(':checked') + 0;
    var shifts = [];
    $('#shifts').find('input[type=checkbox]').each(function () {
        if ($(this).is(':checked')) {
            shifts.push($(this).val());
        }
    });
    data['shifts'] = shifts;
    var levels = [];
    $('#levels').find('.level').each(function () {
        var level = {};
        level['id'] = $(this).find('input[name=id]').val();
        level['title'] = $(this).find('input[name=title]').val();
        levels.push(level);
    });
    data['levels'] = levels;
    data['objectives'] = $('#objectives').nestable('serialize');
//    parseObjectives(objectives);
//    console.log(objectives);
//    return false;
//    $('#objectives').find('.objective').each(function () {
//        var objective = {};
//        objective['id'] = $(this).find('input[name=id]').val();
//        objective['content'] = $(this).find('input[name=objective-content]').val();
//        objectives.push(objective);
//    });
//    data['objectives'] = objectives;
    var pricings = [];
    $('#pricings').find('.pricing').each(function () {
        var pricing = {};
        pricing['id'] = $(this).find('input[name=id]').val();
        pricing['count'] = $(this).find('input[name=count]').val();
        pricing['basic_basic'] = $(this).find('input[name=basic_basic]').val();
        pricing['basic_premium'] = $(this).find('input[name=basic_premium]').val();
        pricing['premium_basic'] = $(this).find('input[name=premium_basic]').val();
        pricing['premium_premium'] = $(this).find('input[name=premium_premium]').val();
        pricings.push(pricing);
    });
    data['pricings'] = pricings;
    $.ajax({
        method: 'patch',
        data: data,
        url: url,
        success: function (data) {
            if (data.errors) {
                $.each(data.errors.main, function (id, errors) {
                    var $formgroup = $('#main-form [name=' + id + ']').closest('.form-group');
                    $formgroup.addClass('has-error')
                            .append('<p class="help-block error-help-block">' + errors[0] + '</p>')
                });
                $.each(data.errors.arrays, function (name, errors) {
                    $('#main-form .global-errors').append('<div>' + errors[0] + '</div>').removeClass('hidden');
                });
                $.each(data.errors.levels, function (id, error) {
                    var $level = $('#levels').find('[data-id=' + id + ']');
//                    $level.closest('.portlet').removeClass('blue-hoki').addClass('red');
                    $level.find('[name=title]').closest('.form-group')
                            .addClass('has-error')
                            .append('<p class="help-block error-help-block">' + error + '</p>');
                });
                $.each(data.errors.objectives, function (id) {
                    var $objective = $('#objectives [data-id=' + id + ']');
                    $objective.find('[name=objective-content]').first().closest('.form-group')
                            .addClass('has-error')
                            .after('<p class="help-block text-danger">Objetive can\'t be empty.</p>');
                });
                $.each(data.errors.pricings, function (id, errors) {
                    var $pricing = $('#pricings .pricing[data-id=' + id + ']');
                    $.each(errors, function (field, errors) {
                        $pricing.find('[name=' + field + ']').closest('.form-group').addClass('has-error');
                        $pricing.find('.form-inline')
                                .append('<div class="text-danger ' + field + '-error">' + errors[0] + '</div>');
                    });
                })
                toastr['error']('Please correct the errors and try again', "Error");
//                scrollToTop();
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
$(document).on('click', '#add_objective', function () {
//    $.post($(this).data('url'), function (data) {
    var $objective = $('#hidden').find('.objective').clone();
    $objective.attr('data-id', $('#objectives .objective').length + 1);
    $('#objectives').first().children('ol').append($objective);
//    $objective.data('id', data.id);
//    $objective.find('input[name=id]').val(data.id);
//    });
});
$(document).on('click', '#add_pricing', function (data) {
    App.blockUI();
    $.post($(this).data('url'), function (data) {
        var $pricing = $('#hidden').find('.pricing').clone();
        $pricing.attr('data-id', data.id)
        $('#pricings').append($pricing);
        $pricing.find('input[name=id]').val(data.id);
        $pricing.find('.remove_pricing').attr('data-action', data.remove_pricing_action);
    }).complete(function () {
        App.unblockUI();
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
$(document).on('click', '.remove_pricing', function () {
    App.blockUI();
    var $pricing = $(this).closest('.pricing');
    var id = $pricing.find('input[name=id]').val();
    var url = $(this).data('action');
    $.ajax({
        url: url,
        method: "delete",
        data: {id: id},
        success: function (data) {
            $pricing.remove();
            toastr['success']('Session pricing deleted successfully', "Done");
        },
        complete: function () {
            App.unblockUI();
        }
    });
});
$(document).on('click', '.filepicker', function () {
    $(this).closest('.form-group').find('.fileinput').click();
});
$(document).on('change', '.fileinput', function () {
    $('#save-all').prop('disabled', true);
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
                $progressBar.addClass('hidden');
                $progressBar.width(0);
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
        },
        complete: function () {
            $('#save-all').prop('disabled', false);
        }
    });

});
$(document).on('click', '.removefile', function (e) {
    App.blockUI();
    var $container = $(this).closest('.form-group');
    e.preventDefault();
    $.ajax({
        method: 'delete',
        url: $(this).data('action'),
        success: function () {
            $container.find('.filenameplaceholder').html('No file selected');
            $container.find('.removefile').addClass('hidden');
            $container.find('.filepicker').removeClass('hidden');
        },
        complete: function () {
            App.unblockUI();
        }
    });
});
$(document).on('click', '.mt-checkbox', function () {
    $input = $(this).find('input');
    if ($input.is(':checked')) {
        $input.prop('checked', false);
    } else {
        $input.prop('checked', true);
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
                return false;
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
                return false;
            }
        });

    });
});
$(document).on('change', '#pricings .pricing input', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.pricing').find('.' + $(this).attr('name') + '-error').remove();
});
$(document).on('change', '#objectives .objective [name=objective-content]', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.objective').find('.help-block').remove();
});
$(document).on('change', '#levels .level [name=title]', function () {
    $(this).closest('.form-group').removeClass('has-error').find('.help-block').remove();
});
$(document).on('change', '#main-form .val', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
});
