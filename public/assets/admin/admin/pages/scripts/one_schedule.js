$(document).on('ready pjax:success', function () {
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
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
    // student
    var url = $('#main-form [name=student]').data('action') + '?q=%QUERY%';
    var engine = new Bloodhound({
        remote: {
            url: url,
            wildcard: '%QUERY%',
            cache: false
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $("#main-form [name=student]").typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
    }, {
        source: engine.ttAdapter(),
        display: ' ',
        // This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
        name: 'students',
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
$(document).on('typeahead:select', '#main-form .typehead', function (ev, suggestion) {
    var $displayName = $(this).closest('.form-group').find('.displayname');
    var $list = $('#hidden .students').clone();
    $displayName.data('id', suggestion.acc_id);
    var title = $displayName.data('type');
    $displayName.html('');
    $displayName.append($list);
    $displayName.find(".append_name").html(suggestion.name + ' (' + suggestion.user.email + ') ');
    //$displayName.find(".list-title").html(title);

});
$(document).on('typeahead:close typeahead:change', '#main-form .typehead', function (ev, suggestion) {
    $(this).val("");
    $(this).closest('.form-group').removeClass('has-error')
            .closest('.participants').find('.text-danger').remove();
});
$(document).on('click', '#main-form .displayname button', function () {
    $(this).closest('.displayname').attr('data-id', '').html("");
});

$(document).on('click', '#add_new_schedule', function () {
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
$(document).on('change', '#main-form [name=frequency]', function () {
    $('#sessions').html("")
    var number = parseInt($(this).val());
    if (Math.ceil(number) != number) {
        return false;
    }
    for (var i = 1; i <= number; i++) {
        var $session = $('#hidden .session').clone();
        $session.find('.timepicker')
                .datetimepicker({
                    format: 'hh:ii',
                    weekStart: 1,
                    todayBtn: 0,
                    autoclose: 1,
                    todayHighlight: 0,
                    startView: 1,
                    minView: 0,
                    maxView: 1,
                    forceParse: 0,
                    showMeridian: true,
                });

        $('#sessions').append($session);
    }
});
$(document).on('change', '#main-form [name=course]', function () {
    if ($(this).val() == "") {
        $('#vc_link input').val("");
        $('#vc_link').addClass('hidden');
        return false;
    }
    var has_vc = $(this).find(':selected').data('vc');
    if (has_vc) {
        $('#vc_link').removeClass('hidden');
    } else {
        $('#vc_link input').val("");
        $('#vc_link').addClass('hidden');
    }
});
$(document).on('keydown', '#main-form [name=n_sessions]', function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1
            // Allow: Ctrl+A, Command+A
            || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 90 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 76 && (e.ctrlKey === true || e.metaKey === true))
            || (e.keyCode === 68 && (e.ctrlKey === true || e.metaKey === true))
            // Allow: home, end, left, right, down, up
            || (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
        return false;
    }
});
$(document).on('keyup', '#main-form [name=n_sessions]', function (e) {
    if ($(this).val() == "" || $(this).val() == 0) {
        $('#n_sessions_price input').val("");
        $('#n_sessions_price').addClass('hidden');
        return;
    }
    var n_sessions = Number($(this).val());
    if (Math.ceil(n_sessions) != n_sessions) {
        $(this).val("");
        $('#n_sessions_price input').val("");
        $('#n_sessions_price').addClass('hidden');
        return;
    }
    $('#n_sessions_price').removeClass('hidden');
    $('#n_sessions_price label').html('Price of ' + n_sessions + ' sessions');
});

function nSessions($input) {
    if ($input.val() == "") {
        $('#n_sessions_price input').val("");
        $('#n_sessions_price').addClass('hidden');
        return;
    }
    var n_sessions = Number($input.val());
    if (Math.ceil(n_sessions) != n_sessions) {
        $input.val("");
        $('#n_sessions_price input').val("");
        $('#n_sessions_price').addClass('hidden');
        return;
    }
    $('#n_sessions_price').removeClass('hidden');
    $('#n_sessions_price label').html('Price of ' + n_sessions + ' sessions');

}
$(document).on('click', '#save-all, #publish', function () {
    App.blockUI();
    var parent = this;
    this.blocked = this.blocked || false;
    if (this.blocked) {
        return;
    }
    this.blocked = true;
    $('#main-form .val').closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
    $('#main-form [name=teacher],#main-form [name=student]').closest('.form-group').removeClass('has-error')
            .closest('.participants').find('.text-danger').remove();
    $('#sessions .form-group').removeClass('has-error')
            .find('.help-block').remove();
    var url = $(this).data('action');
    var $mainForm = $('#main-form');
    var data = {};
    data['course'] = $mainForm.find('[name=course]').val();
    data['shift'] = $mainForm.find('[name=shift]').val();
    data['teacher'] = $mainForm.find('[name=teacher]')
            .closest('.form-group').find('.displayname').data('id');
    data['student'] = $mainForm.find('[name=student]')
            .closest('.form-group').find('.displayname').data('id');
    data['vc_link'] = $mainForm.find('[name=vc_link]').val();
    data['start_date'] = $mainForm.find('[name=start_date]').val();
    data['frequency'] = $mainForm.find('[name=frequency]').val();
    data['n_sessions'] = $mainForm.find('[name=n_sessions]').val();
    data['n_sessions_price'] = $mainForm.find('[name=n_sessions_price]').val();
    var sessions = [];
    $('#sessions .session').each(function (index) {
        var session = {};
        session['index'] = index
        session['day'] = $(this).find('[name=day]').val();
        session['session_time'] = $(this).find('[name=session_time]').val();
        sessions.push(session);
    });
    data['sessions'] = sessions;
    $.ajax({
        url: url,
        method: 'patch',
        data: data,
        success: function (data) {
            if (data.errors) {
                if (data.errors.main.teacher) {
                    $('#main-form').find('[name=teacher]')
                            .closest('.form-group').addClass('has-error')
                            .closest('.participants')
                            .append('<div class="text-danger">' + data.errors.main.teacher[0] + '</div>');
                    delete data.errors.main.teacher
                }
                if (data.errors.main.student) {
                    $('#main-form').find('[name=student]')
                            .closest('.form-group').addClass('has-error')
                            .closest('.participants')
                            .append('<div class="text-danger">' + data.errors.main.student[0] + '</div>');
                    delete data.errors.main.student
                }
                if (data.errors.main.sessions) {
                    delete data.errors.main.sessions;
                }
                $.each(data.errors.main, function (field, errors) {
                    $('#main-form [name=' + field + ']').closest('.form-group')
                            .addClass('has-error')
                            .append('<p class="help-block error-help-block">' + errors[0] + '</p>')
                });
                $.each(data.errors.sessions, function (index, list) {
                    var $session = $('#sessions .session:eq(' + index + ')');
                    $.each(list, function (field, errors) {
                        $session.find('[name=' + field + ']').closest('.form-group')
                                .addClass('has-error')
                                .append('<div class="help-block">' + errors[0] + '</div>')
                    });
                });
                return;
            }
            toastr['success']('Schedule successfuly saved', "Done");
            pjaxPage(data.url);
        },
        complete: function () {
            App.unblockUI();
            parent.blocked = false;
        }
    })

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
            }
        });

    });
});
$(document).on('change', '#main-form .val', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
})
$(document).on('change', '#sessions input,#sessions select', function () {
    $(this).closest('.form-group').removeClass('has-error')
            .find('.help-block').remove();
})