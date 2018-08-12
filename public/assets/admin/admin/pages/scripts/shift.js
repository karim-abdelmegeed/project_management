$(document).on('click', '#save-all', function () {
    var $mainForm = $('#main-form');
    $mainForm.find('.form-group').removeClass('has-error');
    $mainForm.find('.error-help-block').remove();
    var url = $(this).data('action');
    var method = $(this).data('method');
    var data = {};
    data['name'] = $mainForm.find('[name=name]').val();
    data['start_time'] = $mainForm.find('[name=start_time]').val();
    data['end_time'] = $mainForm.find('[name=end_time]').val();
    $.ajax({
        url: url,
        method: method,
        data: data,
        success: function (data) {
            if (data.errors) {
                $.each(data.errors, function (name, errors) {
                    $input = $mainForm.find('[name=' + name + ']');
                    $input.closest('.form-group').addClass('has-error');
                    $error = $('<p class="help-block error-help-block">' + errors[0] + '</p>');
                    $error.insertAfter($input);
                });
                return;
            }
            if (data.interference) {
                toastr['error']('This shift interferes with other shifts', "Intereference");
                return;
            }
            toastr['success']('Schedule successfuly saved', "Done");
            pjaxPage(data.url);
        },
    })
});
$(document).on('click', '.remove-shift', function (e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).data('action');
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
$(document).on('change', '#main-form input', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.form-group').find('.error-help-block').remove();
});