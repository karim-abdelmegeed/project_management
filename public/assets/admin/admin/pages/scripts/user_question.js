var table = null;
// codeblock datatable     
$(document).on('ready pjax:success', function () {
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
// codeblock draw.dt    
$('#table-dt').on('draw.dt', function () {
    if ($('.table-checkbox:checked').length) {
        $('.delete_multiple').prop('disabled', false);
        $('.group-checkable').prop('checked', true);
    } else {
        $('.delete_multiple').prop('disabled', true);
        $('.group-checkable').prop('checked', false);
    }

});
// codeblock group_checkable    
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
// codeblock table_checkbox   
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
// codeblock no_sorting    
$(document).on('click', '.no-sorting', function () {
    $(this).removeClass('sorting sorting_asc sorting_desc');
});
// codeblock remove_category     
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
// codeblock delete_multiple   
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
// codeblock save    
$(document).on('click', '#save', function () {
    var $mainForm = $('#main-form');
    $mainForm.find('.form-group').removeClass('has-error');
    $mainForm.find('.error-help-block').remove();
    var url = $(this).data('action');
    var method = $(this).data('method');
    var data = {};
    data['question'] = $mainForm.find('[name=question]').val();
    data['answer'] = $mainForm.find('[name=answer]').val();
    data['category'] = $mainForm.find('[name=category]').val();
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
// codeblock pjaxPage  
function pjaxPage(url) {
    var link = document.getElementById('pjax-goto-link');
    link.href = url;
    link.click();
}
// codeblock main_form  
$(document).on('change', '#main-form .va', function () {
    $(this).closest('.form-group').removeClass('has-error');
    $(this).closest('.form-group').find('.error-help-block').remove();
});
// codeblock status_filter   
$(document).on('change', '#status-filter [name=status]', function () {
    
    pjaxPage($(this).val());
});
// codeblock send   
$(document).on('click', '#send', function () {
    var $mainForm = $('#main-form');
    $mainForm.find('.form-group').removeClass('has-error');
    $mainForm.find('.error-help-block').remove();
    var url = $(this).data('action');
    var method = $(this).data('method');
    var data = {};
    data['answer'] = $mainForm.find('[name=answer]').val();
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
            toastr['success']('Successfuly sent', "Done");
            pjaxPage(data.url);
        },
    })
});
// codeblock copy   
$(document).on('click', '#copy', function () {
    var $button = $(this);
    var url = $button.data('action');
    var method = $button.data('method');
    $.ajax({
        url: url,
        method: method,
        success: function (data) {
            toastr['success']('Successfuly copied', "Done");
            $button.remove();
        },
    })
});
// codeblock report    
$(document).on('click', '#report', function () {
    var $button = $(this);
    var url = $button.data('action');
    var method = $button.data('method');
    $.ajax({
        url: url,
        method: method,
        success: function (data) {
            toastr['success']('Successfuly reported', "Done");
            pjaxPage(data.url);
        },
    })
});
