$(document).on('ready pjax:success', function () {

    $service_id = $('form').find('[name=service_id]').val();
    $language_id = $('form').find('[name=language_id]').val();
    $locale_id = $('form').find('[name=locale_id]').val();
    $client_id = $('form').find('[name=client_id]').val();
    getQuizzes($client_id, $service_id, $language_id, $locale_id);

    $("select.select2").select2();
    table_supliers = $("#suppliers").DataTable({
        'scrollX': true,
        "colDefs": {
            target: [0],
            orderable: false
        }
    });
    // codeblock agency_accounts       
    $(document).on('click', '.agency_accounts', function () {
        $("#" + $(this).attr('href')).modal();
    });
    // codeblock invoice_detail
    $(document).on('click', 'invoive-detail', function () {
        $("#" + $(this).attr('href')).modal();
    });
    // codeblock add_bonus_penalty
    $(document).on('click', '.add_bonus_penalty', function () {
        $(this).addClass('hidden');
        $(document).find('.bonus_penalty').removeClass('hidden');
    });
    // codeblock added_value        
    $(document).on('change', 'input[name=added_value]', function () {
        $('.amount').removeClass('hidden');
    });
    // codeblock have_quiz
    $(document).on('change', 'input[name=have_quiz]', function () {
        $have_quiz = $(this).val();
        // alert($have_quiz);
        if ($have_quiz == 'choose') {
            $('.quiz').removeClass('hidden');
        } else {
            $('.quiz').addClass('hidden');
        }
    });
    // codeblock require_user_accounts
    $(document).on('change', 'input[name=require_user_accounts]', function () {
        $('input[name=allowed_applicants]').prop('checked', true);
    });
    $(document).on('change', 'input[name=allowed_applicants]', function () {
        $allowed_applicants = $(this).val();
        if ($allowed_applicants == '1') {
            $('.allowed_applicants').removeClass('hidden');
        } else {
            $('.allowed_applicants').addClass('hidden');
        }
    });
    // codeblock change_language_locale_service       
    $(document).on('change', '[name=language_id],[name=locale_id],[name=service_id]', function () {

        table_supliers.rows().remove().draw();

    });
    // codeblock sub_reviewer_name        
    $(document).on('change', 'select[name^=sub_reviewer_name]', function () { //dependency for array name input
        arrayInputDependency($(this));

    });


    // codeblock checkbox primary owner
    $(document).on('change', 'input[name=owner]', function () {
        $id = $(this).val();
        if ($(this).is(':checked')) {
            unViewSecondaryOption($id);

        } else {
            viewSecondaryOption($id);
        }
    });

    var previously;
    $(document).on('select2:selecting', 'select[name=primary_owner]', function (evt) {
        previously = $(this).val();

    });
    // codeblock select primary owner
    $(document).on('select2:select', 'select[name=primary_owner]', function (evt) {
        var now = $(this).val();
        viewSecondaryOption(previously);
        unViewSecondaryOption(now);
    });


    tinymce.init({
        selector: '#description',
        height: 300,
        theme: 'modern',
        menubar: false,
        statusbar: false,
        toolbar: false,
        init_instance_callback: function (editor) {
            editor.on('Change', function (e) {
                content = tinymce.get('description').getContent();
                $("#description").val(content);
            });
        }
    });
    // codeblock change_service
    $(document).on('change', 'select[name=service_id]', function () {
        $mandatory_language = $(this).find('option:selected').attr('data-language');
        $mandatory_locale = $(this).find('option:selected').attr('data-locale');
        $step = $(this).closest('.form_step');
        $('input[name=mandatory_locale]').val(0);
        if ($mandatory_locale == 1) {
            $('input[name=mandatory_locale]').val(2);

        } else if ($mandatory_language == 1) {
            $('input[name=mandatory_locale]').val(1);

        }
    });
    // codeblock invite_supplier       
    $(document).on('change', '[name=invite_supplier]', function () {
        $this = $(this);
        $invite_by = $this.val();
        // $('.supplier-invitation table').find('tr.gradeX').remove();
        table_supliers.rows().remove().draw();

        if ($invite_by == 'by_criteria') {
            appBlockUI();
            $service_id = $('form').find('[name=service_id]').val();
            $language_id = $('form').find('[name=language_id]').val();
            $locale_id = $('form').find('[name=locale_id]').val();

            $.ajax({
                url: "/project/suppliers",
                method: 'get',
                data: {
                    type: 'by_criteria',
                    service_id: $service_id,
                    language_id: $language_id,
                    locale_id: $locale_id
                }
                ,
                success: function (response) {
                    if (response.status == 'error') {
                        var $toast = toastr["error"](response.msg, "Sorry");
                        $('[name=invite_supplier]').each(function () {
                            $(this).removeAttr('checked');
                        })
                    } else {
                        addTableRows(response.suppliers);

                    }
                },
                complete: function () {
                    appUnBlockUI();
                }
            });
        } else {
        }
    });
    // codeblock header       
    $(document).on('click', '#headers a', function () {
        // console.log($(this).attr('href'))
        document.location.hash = $(this).attr('href');

    });
    // codeblock change_status       
    $(document).on('click', '.change-status', function (e) {
        e.preventDefault();
        var action = $(this).attr('data-action');
        var secondAction = $(this).attr('data-secondAction');
        $td = $(this).closest('td');
        $type = $(this).attr('data-type');
        swal({
            title: "Are you sure?",
            text: "Once changed, status will be approved",
            icon: "warning",
            buttons: true,
            dangerMode: true,

            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#c9cfe7",
            confirmButtonText: "Yes.",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'post',
                success: function (response) {
                    // console.log(response);
                    if ($type == 'invoice' && response == 2) {
                        swal({
                            title: "Are you sure you want to approve?",
                            text: "This invoice contains Pending Progress, they will be approved",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,

                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#c9cfe7",
                            confirmButtonText: "Yes.",
                            closeOnConfirm: false
                        }, function () {
                            $.ajax({
                                url: secondAction,
                                method: 'post',
                                success: function (response) {
                                    swal("Updated!", 'Successfully updated', "success");
                                    refreshAjax();
                                },
                                error: function () {
                                    swal("Error", 'Something is wrong, Try again later', "error");
                                }
                            })
                        })
                    }
                    else {
                        swal("Updated!", 'Successfully updated', "success");
                        // $td.text($status);
                        // console.log(response.url);
                        refreshAjax();

                        // window.location.reload();
                        // pjaxPage(response.url);
                        // alert('done')
                    }
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });

    });
    // codeblock change_invoicing_policy   
    $(document).on('click', '.change-policy', function (e) {
        e.preventDefault();
        var action = $(this).attr('href');
        var current_process = $(this).attr('data-action');
        if (current_process == "do") {
            text_msg = "This will allow the user to invoice anytime";
        } else {
            text_msg = "This will undo overriding the policy";
        }

        swal({
            title: "Are you sure?",
            text: text_msg,
            icon: "warning",
            buttons: true,
            dangerMode: true,

            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#c9cfe7",
            confirmButtonText: "Yes.",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'get',
                success: function (response) {
                    // console.log(response);

                    swal("Updated!", 'Successfully updated', "success");
                    // $td.text($status);
                    // console.log(response.url);
                    refreshAjax();
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });

    });
    // codeblock group_checkable       
    $(document).on('change', 'input.group-checkable', function () {
        $('.supplier-invitation .table-checkbox').each(function () {
            // console.log($(this))
            inviteSuppliers($(this));
        });
    });
    // codeblock suppliers       
    $(document).on('change', 'input[name^=suppliers]', function () {
        inviteSuppliers($(this));
    });
    /* $(document).on('click', '.supplier', function () {
         $li = $('#hidden').find('li.task-list-item').clone();
         $input = $(this).find('input');

         $supplier_id = $input.val();
         $supplier_name = $(this).find('.supplier-name').text();
         if ($input.prop('checked') == false) {
             $li.find('input[name^=supplier_id]').val($supplier_id);
             $li.find('.task-content').text($supplier_name);
             $li.attr('id', $supplier_id);
             $('.suppliers-ul').append($li);
             $input.attr('checked', true);
         } else {
             $('.suppliers-ul').find('li#' + $supplier_id).remove();
             $input.attr('checked', false);
         }
     });*/
    // codeblock remove_supplier
    $(document).on('click', '.remove-supplier', function () {
        $li = $(this).closest('li');
        $supplier_id = $li.find('input[name^=supplier_id]').val();
        $tr = $('.supplier-invitation').find('#data-row-' + $supplier_id);
        $tr.removeClass('active');
        $tr.find('input[name^=suppliers]').attr('checked', false);
        $li.remove();

    });

    $(document).on('change', '[name=reviewer_required]', function () {


    });

    // codeblock add_user_accounts       
    $(document).on('click', '.add-user-accounts', function () {

        appBlockUI();
        $useraccounts_usernames = [];
        $useraccounts_passwords = [];
        $('input[name=passed]').each(function () {
            if ($(this).val() == 'true') {
                $tr = $(this).closest('tr');
                // console.log($tr)
                // console.log($tr.find('.user-account-username'));
                $username = $tr.find('.user-account-username').text();
                $password = $tr.find('.user-account-password').text();
                $useraccounts_usernames.push($username);
                $useraccounts_passwords.push($password);
            }

        });
        var project_id = $('input[name=project_id]').val();


        $.ajax({
            url: "/project/" + project_id + "/user_accounts_save",
            method: 'post',
            data: {project_id: project_id, passwords: $useraccounts_passwords, usernames: $useraccounts_usernames},
            success: function (response) {
                swal("Updated!", 'Successfully updated', "success");
                $('#basic').modal('hide');
                $('#basic div').remove();
                if (window.top != window.self) {
                    setTimeout(
                        function () {
                            $('.mfp-close', window.parent.document).click();

                        }, 2000);


                }
                $.ajax({
                    url: "/project/reload_accounts/" + project_id,
                    method: 'get',

                    success: function (response) {
                        $("#append_user_accounts").html(response);
                        $('#basic').modal('hide');
                        $('#basic div').remove();
                        runFineUploader("user_accounts_file_id", "500000000", "0", "0", "true", "projectUserAccountFile", "project_id", project_id, 0, 0, 10000000000000);
                    },
                    error: function () {
                        swal("Error", 'Something is wrong, Try again later', "error");
                    }
                });
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });
        $('#basic').modal('hide');
        $('#basic div').remove();

        appUnBlockUI();
    });

    //js-fn
    $(document).on('click', '.remove-stuff', function (e) {//Delete from list(rewrite the function in scripts.js)
        e.preventDefault();
        $row = $(this).closest('tr');
        var action = $(this).attr('href');
        swal({
            title: "Are you sure?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'delete',
                success: function () {
                    swal("Deleted!", 'Successfully deleted', "success");
                    table.row($row).remove()
                        .draw();
                    html2canvas($("#projects-214"), {
                        onrendered: function (canvas) {
                            // console.log(canvas);
                            var img = canvas.toDataURL("image/png");
                            $("a.image").attr('href', img)
                        }
                    });
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });

});

// codeblock ajaxFormBeforeSerialize
function ajaxFormBeforeSerialize() {
    if ($('form').hasClass('mce-tinymce')) {
        var content = tinymce.get('description').getContent();
        if (content != '') {
            content = content.split('<p>');
            content = content[1].split('</p>');
            $("#description").val(content[0]);

        }
    }


}

// codeblock getSupplier
function getSupplier() {
    appBlockUI();

    $service_id = $('[name=invite_service]').val();
    $languague_id = $('[name=invite_language]').val();
    $locale_id = $('[name^=invite_locale]').val();
    $pass_fail = $('[name=pass_fail]').val();
    $('.supplier-invitation table').find('tr.gradeX').remove();
    table_supliers.rows().remove().draw();
    $.ajax({
        url: "/project/suppliers",
        method: 'get',
        data: {
            type: 'manual',
            service_id: $service_id,
            language_id: $languague_id,
            locale_id: $locale_id,
            pass_fail: $pass_fail
        }
        ,
        success: function (response) {
            if (response.status == 'error') {
                var $toast = toastr["error"](response.msg, "Sorry");
                $('[name=invite_supplier]').each(function () {
                    $(this).removeAttr('checked');
                })
            } else {
                addTableRows(response.suppliers);

            }
        },
        complete: function () {
            appUnBlockUI();
        }
    });


}

// codeblock addTableRows
function addTableRows(data) {
    var options = '';
    $('.group-checkable').attr('checked', false);
    table_supliers.rows().remove().draw();

    $.each(data, function (index, el) {
        $tr = $('.hidden tr').clone();
        if ($('.suppliers-ul').find('li').is('#' + el['id'])) {
            $tr.addClass('active');
            $tr.find('input[name^=suppliers]').attr('checked', true);
        } else {
            $tr.removeClass('active');
            $tr.find('input[name^=suppliers]').attr('checked', false);

        }
        $tr.attr('data-id', el['id']);
        $tr.attr('id', 'data-row-' + el['id']);
        $tr.find('input[name^=suppliers]').val(el['id']);
        $tr.find('.supplier-name').text(el['name']);
        // $('.supplier-invitation tbody').append($tr);
        table_supliers.row.add($tr).draw();
    });
    return options;
}

// codeblock ajaxFormAdditionalDependency
function ajaxFormAdditionalDependency() {
    $('select[name^=sub_reviewer_name]').each(function () {
        arrayInputDependency($(this));
    });
}

// codeblock arrayInputDependency
function arrayInputDependency($element) {//create subproject reviewer if required
    var element_value = $element.find('option:selected').attr('data-depend');
    $subproject_div = $element.closest('.subproject');
    $dependent_element = $subproject_div.find('*[data-depending-on="sub_reviewer_name"]');

    $dependent_element.each(function () {
        var showValue = $(this).attr("data-depending-value"); //get array of probable value

        if (showValue.startsWith("[") && showValue.endsWith("]")) {
            var depending_on_values = showValue.slice(1, -1).split(',');
            validateDependentValue($(this), element_value, depending_on_values);
        } else {
            validateDependentValue($(this), element_value, showValue);
        }

    });
}

// codeblock additionalAjaxFormServerSideValidationSteps
function additionalAjaxFormServerSideValidationSteps(my_form) {

    var inputs = my_form.find(':input').not('.no_validation').not(':button, :hidden');
    inputs = inputs.serializeArray();
    project_id = $('input[name=project_id]').val();
    var data;

    $.ajax({
        url: "/project/validation",
        method: 'post',
        data: {inputs: inputs, project_id: project_id},
        success: function (response) {
            if (response.status == "error") {//validation failed
                var $toast = toastr["error"](response.msg, "Sorry");
                data = false;
            } else {
                data = true;
            }

        },
        async: false
    });

    return data;

}

// codeblock uploaderAllComplete
function uploaderAllComplete(uploaded_ids) {

    var project_id = $('input[name=project_id]').val();
    $('#basic div').remove();

    $uploaderAllComplete = $('#main-form').attr('data-uploaderAllComplete');
    if (typeof $uploaderAllComplete !== "undefined") {

        $.ajax({
            method: 'POST',
            url: "/project/" + project_id + "/user_accounts?ids=" + uploaded_ids,
            data: {uploaded_ids: uploaded_ids},
            dataType: 'json',
            success: function (response) {
                $uploaded_user_accounts = $('#hidden').find('.uploaded-user-accounts').clone();
                $('.uploaded-accounts').append($uploaded_user_accounts);
                $.each(response.user_accounts, function (i, row) {
                    //  console.log(row);
                    $user_account = $('#hidden').find('.user-account').clone();
                    $user_account.find('.user-account-id').text(i + 1).append('<input name="passed" type="hidden" value="' + row.passed + '" />');
                    $user_account.find('.user-account-username').text(row.username);
                    $user_account.find('.user-account-password').text(row.password);
                    if (row.passed == false) {
                        $user_account.find('.user-account-status').text(row.reason);
                        $user_account.addClass('danger');
                    } else {
                        $user_account.find('.user-account-status').text("Success");
                    }
                    $uploaded_user_accounts.find('tbody').append($user_account);
                    $("#basic").modal();
                });

            },
            error: function (xhr, textStatus, errorThrown) {
                $.ajax({
                    method: 'POST',
                    url: "/project/" + project_id + "/user_accounts_error_msg?ids=" + uploaded_ids,
                    data: {uploaded_ids: uploaded_ids},
                });
                swal("Error", 'Something is wrong, Try again later', "error");
            },
            async: false
        });

    }
}

// codeblock inviteSuppliers
function inviteSuppliers(checkbox_input) {
    $li = $('#hidden').find('li.task-list-item').clone();
    $supplier_id = checkbox_input.val();
    //console.log(checkbox_input)
    $supplier_name = checkbox_input.closest('tr').find('.supplier-name').text();
    if (checkbox_input.is(':checked')) {
        $('.suppliers-ul').find('li#' + $supplier_id).remove();

        $li.find('input[name^=supplier_id]').val($supplier_id);
        $li.find('.task-content').text($supplier_name);
        $li.attr('id', $supplier_id);
        $('.suppliers-ul').append($li);
    } else {
        $('.suppliers-ul').find('li#' + $supplier_id).remove();
    }
    if ($('.supplier-invitation td .table-checkbox:checked').length == 0) {
        $('.group-checkable').prop('checked', false);
    }
}

$(document).on('click', '.toggle_submission', function () {
    $(".submission_form").toggle(100);
});

function additionalANextStep(nextStep) {
    if (nextStep == 2) {
        $service_id = $('form').find('[name=service_id]').val();
        $language_id = $('form').find('[name=language_id]').val();
        $locale_id = $('form').find('[name=locale_id]').val();
        $client_id = $('form').find('[name=client_id]').val();
        getQuizzes($client_id, $service_id, $language_id, $locale_id);


    }

}

$(document).on('change', 'select[name=client_id]', function () {
    $service_id = $('form').find('[name=service_id]').val();
    $language_id = $('form').find('[name=language_id]').val();
    $locale_id = $('form').find('[name=locale_id]').val();
    $client_id = $(this).val();
    getQuizzes($client_id, $service_id, $language_id, $locale_id);
});

function getQuizzes($client_id, $service_id, $language_id, $locale_id) {
    $.ajax({
        url: "/project/getQuizzes",
        method: 'post',
        data: {
            client_id: $client_id,
            service_id: $service_id,
            language_id: $language_id,
            locale_id: $locale_id
        }
        ,
        success: function (response) {
            $("#quiz_id option").remove();
            $('#quiz_id').append('<option value="" >Choose quiz</option>');
            var i;
            var selected;
            for (i = 0; i < response.quizzes.length; ++i) {
                console.log($('form').find('[name=quiz_id_edit]').val() + " " + response.quizzes[i].id);

                if ($('form').find('[name=quiz_id_edit]').val() == response.quizzes[i].id) {
                    selected = "selected";
                } else {
                    selected = "";
                }
                $('#quiz_id').append('<option ' + selected + ' value="' + response.quizzes[i].id + '" >' + response.quizzes[i].title + '</option>');
            }


        },
        complete: function () {
            appUnBlockUI();
        }
    });
}

// codeblock viewSecondaryOption
function viewSecondaryOption($id) {
    $('select[name^=secondary_owners]').find("option").each(function () {
        if ($(this).parent('select').hasClass("select2")) {
            if ($(this).val() == $id) {
                $(this).removeAttr("disabled");
                $(this).parent('select').select2();
            }

        }
    });
}

// codeblock unViewSecondaryOption
function unViewSecondaryOption($id) {
    $('select[name^=secondary_owners]').find("option").each(function () {
        if ($(this).parent('select').hasClass("select2")) {
            if ($(this).val() == $id) {
                $(this).attr("disabled", "disabled");
                $(this).parent('select').select2();
            }
        }
    });
}