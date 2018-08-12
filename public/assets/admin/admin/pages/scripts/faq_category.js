var table = null;
$(document).on('ready pjax:success', function () {
    var drake = dragula([$('#table-dt tbody')[0]]);
    drake.on('drop', function (el, target, source, sibling) {
        $('.reorder').prop('disabled', false);
    });
    $('.timepicker').datetimepicker({
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
    if ($('#table-dt').length) {
        table = $('#table-dt').DataTable({'scrollX':true,
            paging: false,
            columnDefs: [
                {
                    targets: '_all',
                    sortable: false,
                    orderable: false
                },
                {
                    targets: 'table-checkbox-col',
                    width: 10
                }
            ],
            paging: false
        });
    }
    $('.no-sorting').removeClass('sorting sorting_asc sorting_desc');
});
$(document).on('click', '.reorder', function () {
    $('.reorder').prop('disabled', true);
    var newSequence = [];
    $('.reorder-vals').each(function (index, element) {
        newSequence.push(element.value)
    });
    url = $(this).data('action');
    var ajaxData = {orderList: newSequence};
    $.ajax({
        url: url,
        method: 'post',
        data: ajaxData,
        success: function (data) {
            toastr['success'](data.message, "Done reordering");
        }
    })
});
$('#table-dt').on('draw.dt', function () {
    if ($('.table-checkbox:checked').length) {
        $('.delete_multiple').prop('disabled', false);
        $('.group-checkable').prop('checked', true);
    } else {
        $('.delete_multiple').prop('disabled', true);
        $('.group-checkable').prop('checked', false);
    }

});
$(document).on('change', '.group-checkable', function () {
    if ($(this).is(':checked')) {
        $('.table-checkbox').prop('checked', true);
    } else {
        $('.table-checkbox').prop('checked', false);
    }
    $('.table-checkbox').each(function () {
        if ($(this).is(':checked')) {
            $(this).parents('tr').addClass("active to-remove");
        } else {
            $(this).parents('tr').removeClass("active to-remove");
        }
    });
    var formId = $(this).closest('form').attr('id');
    var $button = $('[data-form=' + formId + ']');
    if ($('.table-checkbox:checked').length) {
        $button.prop('disabled', false);
    } else {
        $button.prop('disabled', true);
    }
});
$(document).on('change', '.table-checkbox', function () {
    var formId = $(this).closest('form').attr('id');
    var $button = $('[data-form=' + formId + ']');
    if ($(this).is(':checked')) {
        $(this).parents('tr').addClass("active to-remove");
    } else {
        $(this).parents('tr').removeClass("active to-remove");
    }
    if ($('.table-checkbox:checked').length) {
        $button.prop('disabled', false);
    } else {
        $('.group-checkable').prop('checked', false);
        $button.prop('disabled', true);
    }
});
$(document).on('click', '.no-sorting', function () {
    $(this).removeClass('sorting sorting_asc sorting_desc');
});
$(document).on('click', '.remove-category', function (e) {
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
$(document).on('click', '.delete_multiple', function () {
    var $form = $('#' + $(this).data('form'));
    var formData = $form.serialize();
    var url = $form.attr('action');
    swal({title: "Are you sure?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", closeOnConfirm: false}, function () {
        $.ajax({
            url: url,
            method: 'delete',
            data: formData,
            success: function (data) {
                table.rows('tr.to-remove').remove().draw();
                $('.group-checkable').prop('checked', false);
                swal("Deleted!", data.message, "success");
                return false;
            },
            error: function (data) {
                $('tr.to-remove').removeClass('to-remove');
            }
        });
    });
})
$(document).on('click', '#save', function () {
    var $mainForm = $('#main-form');
    $mainForm.find('.form-group').removeClass('has-error');
    $mainForm.find('.error-help-block').remove();
    var url = $(this).data('action');
    var method = $(this).data('method');
    var data = {};
    data['name'] = $mainForm.find('[name=name]').val();
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
            toastr['success']('Successfuly saved', "Done");
            pjaxPage(data.url);
        },
    })
});
function pjaxPage(url) {
    var link = document.getElementById('pjax-goto-link');
    link.href = url;
    link.click();
}
$(document).on('change', '#main-form input', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.form-group').find('.error-help-block').remove();
});