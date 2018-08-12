$(document).on('click', '#save-all', function () {
    var $mainForm = $('#main-form');
    $mainForm.find('.form-group').removeClass('has-error');
    $mainForm.find('.error-help-block').remove();
    var url = $(this).data('action');
    var method = $(this).data('method');
    var data = {};
    data['name'] = $mainForm.find('[name=name]').val();
    data['email'] = $mainForm.find('[name=email]').val();
    data['type'] = $mainForm.find('[name=type]').val();
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
            toastr['success']('Schedule successfuly saved', "Done");
            pjaxPage(data.url);
        },
    })
});
$(document).on('change', '#main-form .val', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.form-group').find('.error-help-block').remove();
});
$(document).on('click', '.remove-user', function (e) {
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
