$(document).on('ready pjax:success', function () {
    $('.datetimepicker').datetimepicker({
        autoclose: 1,
    });
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });

    // Set the Options for "Bloodhound" suggestion engine
    var url = $('#students').data('students') + '?q=%QUERY%';
    var engine = new Bloodhound({
        remote: {
            url: url,
            wildcard: '%QUERY%',
            cache: false
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $("#add_student").typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
    }, {
        source: engine.ttAdapter(),
        // This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
        name: 'students',
        display: ' ',
        // the key from the array we want to display (name,id,email,etc...)
        templates: {
            empty: [
                '<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
            ],
            header: [
                '<div class="list-group search-results-dropdown">'
            ],
            suggestion: function (data) {
                return '<a  class="list-group-item select-user">' + data.name + ' (' + data.user.email + ')' + '</a>';
            },
        }
    });
    var url = $('#main-form [name=teacher]').data('action') + '?q=%QUERY%';
    var engine = new Bloodhound({
        remote: {
            url: url,
            wildcard: '%QUERY%',
            cache: false
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $("#main-form [name=teacher]").typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
    }, {
        source: engine.ttAdapter(),
        display: ' ',
        // This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
        name: 'teachers',
        // the key from the array we want to display (name,id,email,etc...)
        templates: {
            empty: [
                '<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
            ],
            header: [
                '<div class="list-group search-results-dropdown">'
            ],
            suggestion: function (data) {
                return '<a  class="list-group-item select-user">' + data.name + ' (' + data.user.email + ')' + '</a>';
            },
        }
    });

});
$(document).on('typeahead:select', '#add_student', function (ev, suggestion) {
    var $list = $('#hidden .students').clone();
    var reqData = {id: suggestion.acc_id};
    var url = $('#students').data('add');
    $.post(url, reqData, function (data) {
        $('#students').append($list);
        $list.data("id", 4);
        $list.find(".append_name").html(suggestion.name + ' (' + suggestion.user.email + ') ');

    });
});
$(document).on('typeahead:select', '#main-form [name=teacher]', function (ev, suggestion) {

    var $displayName = $('#teacher .displayname');

    var $list = $('#hidden .teachers').clone();
    $displayName.data('id', suggestion.acc_id);

    $displayName.html('');
    $displayName.append($list);
    $displayName.find(".append_name").html(suggestion.name + ' (' + suggestion.user.email + ') ');

});
$(document).on('typeahead:change typeahead:close', '#teacher [name=teacher]', function (ev, suggestion) {
    $(this).val("");
    $(this).closest('.form-group')
            .removeClass('has-error')
            .find('.help-block').remove();
});
$(document).on('typeahead:change typeahead:close', '#add_student', function (ev, suggestion) {
    $(this).val("");
});
$(document).on('click', '#add_new_schedule', function () {
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url);
    });
});
$(document).on('change', '#main-form [name=course]', function () {
    var $template = $('#main-form').find('[name=template]');
    $('#sessions').html('');
    var selected = $(this).val();
    if (selected == "") {
        $template.attr('disabled', 'disabled');
        $template.html('<option value="" selected></option');
    } else {
        var url = $(this).data('action');
        $.get(url, {id: selected}, function (data) {
            $template.removeAttr('disabled');
            $template.html('<option value="" selected></option>');
            var html = ''; //$('#hidden .templates').find('[data-course=' + selected + ']').html();
            $.each(data.templates, function (index, el) {
                html += '<option value="' + el.id + '">' + el.title + '</option>'
            });
            $template.append(html);
        });
    }
});
$(document).on('change', '#main-form [name=template]', function () {
    var selected = $(this).val();
    if (selected == "") {
        $('#sessions').html("");
    } else {
        var selected = $(this).val();
        var url = $(this).data('action');
        $.get(url, {id: selected}, function (data) {
            $('#sessions').html("");
            $.each(data.sessions, function (index, el) {
                var $session = $('#hidden .session').clone();
                $session.attr('data-id', el.id);
                var title = el.title ? el.title : 'Not set';
                var duration = el.duration ? el.duration : 'Not set';
                $session.find('.title').html('Title: ' + title);
                $session.find('.duration').html('Duration: ' + duration);
                $session.find('.datetimepicker').datetimepicker({
                    autoclose: 1,
                });
                $('#sessions').append($session);
            });
        });
    }
});
$(document).on('click', '#students .remove-student', function () {
    var url = $('#students').data('delete');
    var $student = $(this).closest('.student');
    var id = $student.data('id');
    $.ajax({
        url: url,
        method: 'delete',
        data: {id: id},
        success: function (data) {
            $student.remove();
        }
    });
});
$(document).on('click', '.remove-teacher', function () {
    $('#teacher .displayname').remove();
    $('#teacher').append('<span class="displayname" data-id=""></span');

});
$(document).on('click', '#save-all,#publish', function () {
    var parent = this;
    this.blocked = this.blocked || false;
    if (this.blocked) {
        return;
    }
    this.blocked = true;
    App.blockUI();
    $('#main-form .val').closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
    $('#sessions .form-group').closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
    $('#teacher [name=teacher]').closest('.form-group')
            .removeClass('has-error')
            .find('.help-block').remove();
    var url = $(this).data('action');
    var $mainForm = $('#main-form');
    var data = {};
    data['course'] = $mainForm.find('[name=course]').val();
    data['template'] = $mainForm.find('[name=template]').val();
    data['shift'] = $mainForm.find('[name=shift]').val();
    data['teacher'] = $('#teacher .displayname').data('id');
    data['vc_link'] = $mainForm.find('[name=vc_link]').val();
    data['price'] = $mainForm.find('[name=price]').val();
    data['teacher_payment'] = $mainForm.find('[name=teacher_payment]').val();
    data['closed_group'] = $mainForm.find('[name=closed_group]').is(':checked') + 0;
    data['locked_by'] = $mainForm.find('[name=locked_by]').val();
    data['hidden_by'] = $mainForm.find('[name=hidden_by]').val();
    data['archived_by'] = $mainForm.find('[name=archived_by]').val();
    var sessions = [];

    $('#sessions .session').each(function () {
        var session = {};
        session['id'] = $(this).data('id');
        session['start_time'] = $(this).find('[name=start_time]').val();
        sessions.push(session);
    });
    data['sessions'] = sessions;
    $.ajax({
        url: url,
        method: 'patch',
        data: data,
        success: function (data) {
            if (data.errors) {
                console.log(data.errors);
                $.each(data.errors.main, function (field, errors) {
                    $('#main-form [name=' + field + ']').closest('.form-group')
                            .addClass('has-error')
                            .append('<div class="help-block">' + errors[0] + '</div>');
                });
                if (data.errors.teacher) {
                    $('#teacher [name=teacher]').closest('.form-group')
                            .addClass('has-error')
                            .append('<div class="help-block">' + data.errors.teacher + '</div>');
                }
                $.each(data.errors.sessions, function (id, list) {
                    var $session = $('#sessions .session[data-id=' + id + ']');
                    $.each(list, function (field, errors) {
                        $session.find('[name=' + field + ']').closest('.form-group')
                                .addClass('has-error')
                                .append('<div class="help-block">' + errors[0] + '</div>');
                    });
                });
                toastr['error']('Please correct the errors and try again.', "Not saved");
                return;
            }
            toastr['success']('Schedule successfuly saved', "Done");
            pjaxPage(data.url);
        },
        complete: function () {
            parent.blocked = false;
            App.unblockUI();
        }
    })
});
$(document).on('click', '.mt-checkbox', function () {
    $input = $(this).find('input');
    if ($input.is(':checked')) {
        $input.prop('checked', false);
    } else {
        $input.prop('checked', true);
    }
});
$(document).on('click', '.remove-schedule', function (e) {
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
            },
        });

    });
});
$(document).on('change', '#main-form .val', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
});
$(document).on('change', '#sessions input', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
});