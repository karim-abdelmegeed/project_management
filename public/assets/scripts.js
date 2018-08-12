var table = null;

$(document).on('ready pjax:success', function () {

    $(document).on('click', '.m-topbar__notifications--img a', function (e) {
        $(this).removeClass("shake-top-bar");
        $(this).closest('.m-topbar__notifications--img').find("span.m-nav__link-badge").removeClass("m-badge--danger");
        $(this).closest('.m-topbar__notifications--img').find('.m-animate-shake').removeClass("m-animate-shake");
        $(this).closest('.m-topbar__notifications--img').find('.m-animate-blink').removeClass("m-animate-blink");
    });

    $(document).on('click', '.nav-tabs.nav-justified li', function (e) {

        $(".nav-tabs.nav-justified li").removeClass("active1");
        $(this).addClass('active1');

    });



    $(document).on('click', '.pdf_export', function (e) {
        e.preventDefault();


        $(this).closest('.m-portlet').find('.buttons-pdf').click();

    });
    $(document).on('click', '.excel_export', function (e) {

        e.preventDefault();


        $(this).closest('.m-portlet').find('.buttons-excel').click();

    });

    $(document).on('click', '.read-notification', function (e) {
        url = $(this).data('url');
        // e.preventDefault();

        $.ajax({
            url:url ,
            method: 'post',
            success: function (data) {

            }
        });

    });

    // Handle remove button
    $portlets = $(".portlet.portlet-color");

    if ($portlets.length != 0) {
        $portlets.each(function () {
            $(this).find(".collapse").click();

            $removeButton = $(this).find('.remove,.delete_Question');
            $removeButton.html('');
            // console.log($removeButton);
            $removeButton.css('font-size', '28px', 'important');


        });
        $(".hidden .portlet").find(".expand").click();
        $(".force_open.portlet").find(".expand").click();
    }
    if (window.opener) {
        // pop-up window or target=_blank window
    } else if (window.top !== window.self) {
        //inside an iframe
        $('.page-header.navbar.navbar-fixed-top , .page-footer,.page-logo,.dropdown .dropdown-user , .menu-toggler .responsive-toggler').css('display', 'none');
    } else {
        //top level window
    }

    $('.timepicker-24').each(function () {
        $(this).timepicker({
            showMeridian: false,
        });

    });
    $('.and-data').each(function () {
        $text_data = $(this).text();
        $text_data = $text_data.trim();

        $(this).text($text_data.substring(0, $text_data.length - 1) + '.');


    });

    $('.call-lrgt').each(function () {
        var my_form = $(this);
        var name_class = my_form.attr('data-request');
        var on_start = my_form.attr('data-on-start');
        initialize(my_form, name_class, on_start);
    });

    //collapse portal onchange input value
    // $(document).on('change', '.collapse-on-change', function () {
    //     console.log($(this));
    //     $portlet = $(this).parents('.portlet').first();
    //     console.log($portlet);
    //     $portlet.find('.caption').html($(this).val())

    //     $portlet.find('.collapse').removeClass('collapse').addClass('expand')
    //     $portlet.find('.portlet-body').hide()
    // });
});

function pjaxPage(url) {
    var link = document.getElementById('pjax-goto-link');
    link.href = url;
    link.click();
}
function pjaxRedirect(url) {
    var link = document.getElementById('pjax-goto-page');
    link.href = url;
    link.click();
}
function province(){
    // alert($('select[name=country] option:selected').val());
    var country = $('select[name=country]').val();
    //alert(country);
    if(country == 'Canada'){
        $(document).find('input[name =province]').hide();
        $(document).find('select[name=province_id]').show();
    }
    else{
        $(document).find('input[name =province]').show();
        $(document).find('select[name=province_id]').hide();
    }
}
function scrollToTop() {
    var aTag = $('#page-top');
    $('html,body').animate({
        scrollTop: aTag.offset().top
    }, 'slow');
}

// Blocking UI
function appBlockUI() {
    console.log("ana block");
    $.blockUI({
        message: '<h1><img src="/assets/global/img/ring-alt.svg" /> </h1>',
        overlayCSS: {
            backgroundColor: '#000',
            bgOpacity: 0.6,
            opacity: 0.8
        },
        css: {
            border: 'none',
            padding: '0',
            backgroundColor: 'none',

        }
    });
}

// unblocking UI
function appUnBlockUI() {
    $.unblockUI();
}

/* to be revised*/
function customFileInput($elements) {
    $elements.each(function (index, el) {
        var data = {
            id: $(el).closest('.level').find('input[name=id]').val()
        };
        var url = $(el).data('delete');
        $(el).fileinput({
            uploadUrl: $(el).data('action'),
            showPreview: false,
            uploadExtraData: function (previewId, index) {
                return data;
            },
            allowedPreviewTypes: ['image'],
            initialPreviewConfig: [
                {
                    caption: 'desert.jpg',
                    width: '120px',
                    url: url, // server delete action
                    key: 100,
                    extra: {
                        id: 100
                    }
                }
            ]
        });
        $(el).on('fileclear', function () {
            // console.log("fileclear");
        });
        $(el).on('fileloaded', function (event, file, previewId, index, reader) {
            // console.log("fileloaded");
        });
        $(el).on('filedeleted', function (event, key) {
            // console.log('Key = ' + key);
        });

    });
}

$(document).on('ready pjax:success', function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    initDates();

    /*$('.datepicker').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
     });*/

    // if ($('#table-dt').length) {
    //     table = $('#table-dt').DataTable({
    //         bLengthChange: false,
    //         columnDefs: [
    //             {
    //                 targets: 'no-sorting',
    //                 sortable: false,
    //                 searchable: false,
    //                 orderable: false
    //             },
    //             {
    //                 targets: 'table-checkbox-col',
    //                 width: 10
    //             }
    //         ]
    //     });
    // }
    $('.no-sorting').removeClass('sorting sorting_asc sorting_desc');

    /* Elements Reordering */
    // if ($('.reorder').length) {
    //     var drake = dragula([$('#table-dt tbody')[0]]);
    //     drake.on('drop', function (el, target, source, sibling) {
    //         $('.reorder').prop('disabled', false);
    //     });
    // }

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

$(document).on('click', '.delete_single', function () { // delete_single isn't used , has been replaced by remove
    var url = $(this).data('action');
    var $tr = $(this).closest('tr');
    var redirect = $(this).data('redirect');
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
            url: url,
            method: 'delete',
            success: function (data) {
                if (data.status == 1) {
                    if (redirect) {
                        ajaxPage(pageAttributes.indexUrl);
                    } else {
                        table.row($tr).remove().draw();
                    }
                    swal("Deleted!", data.message, "success");
                    return false;
                }
                if (data.status == -1) {
                    swal("Error", data.message, "error");
                    return false;
                }
            }
        });
    });
})
$(document).on('click', '.delete_multiple', function () {
    var $form = $('#' + $(this).data('form'));
    var formData = $form.serialize();
    var url = $form.attr('action');
    // console.log(url);

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

$(document).on('click', '.remove', function () {
    var role = $(this).data('role');
    var $element = $(this).closest('.' + role);
    var url = $(this).data('action');
    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        appBlockUI();

        $.ajax({
            url: url,
            method: "delete",
            success: function (data) {
                if (data.status == false) {
                    var $toast = toastr["error"](data.msg, "Sorry");
                } else {

                    $element.remove();
                    toastr['success'](role + ' deleted successfully', "Done");
                    swal("Deleted!", role + ' deleted successfully', "success");
                    if (typeof RemoveSuccess !== "undefined") {
                        // safe to use the function

                        RemoveSuccess();
                    }
                }
            },
            error: function (data) {
                toastr['error']('Something went wrong', "Sorry");

            },
            complete: function () {
                appUnBlockUI();
            }
        });
    });

});
$(document).on('change', 'input[type=text],textarea,select', function () {

    $(this).closest(".has-error").removeClass("has-error").find(".with-errors").html("");
});
$(document).on('click', '.expand', function () {
    $portlet = $(this).closest(".portlet");
    $element = $portlet.find('input[type=text],textarea,select').filter(':visible:first');
    if ($element.is("select")) {
        caption = $portlet.find('select:first option:selected').text();
    } else {
        caption = $element.val();
    }
    if (caption == "") {
        caption = "Untitled !";
    }
    $question_order = $portlet.find(".caption").find('.q_order');
    if($question_order.length > 0){
        var weight = $portlet.find('input[name^=weight]').val();
        $portlet.find(".caption").find('.q_content').html(caption);
        $portlet.find(".caption").find('.q_weight').html("( w = "+weight+" )");
        $portlet.find(".caption").find('.q_content').html(caption);
    }else{
        $portlet.find(".caption").html(caption);
    }

});
$(document).on('click', '.add', function () { // add child element to page
    appBlockUI();
    var actionButton = $(this);
    var role = $(this).data('role');
    var toAppend = $(this).data('target');//"#objectives.child.ol";
    var array = toAppend.split("-");
    var ToClass = array[0];
    $.post($(this).data('url'), function (data) {
        $('#hidden').find('.' + role).find('select.select2').each(function () {
            $(this).select2('destroy');
        });
        $(ToClass).find(".collapse").click();
        $portlets = $(ToClass).find(".portlet");
        if ($portlets.length != 0) {
            $portlets.each(function () {

                $element = $(this).find('input[type=text],textarea,select').filter(':visible:first');
                if ($element.is("select")) {
                    caption = $(this).find('select:first option:selected').text();
                } else {
                    caption = $element.val();
                }
                if (caption == "") {
                    caption = "Untitled !";
                }
                $(this).find(".caption").html(caption);
            });

        }
        var $element = $('#hidden').find('.' + role).clone();
        // console.log($element);
        if (array.length > 1) {
            var obj = array[1];
            // console.log('obj:'+obj);
            $(ToClass).children('ol').append($element);
        } else {
            $(ToClass).append($element);

            // console.log('element:'+$element);
            // console.log('obj:'+obj);
        }
        $element.find('.portlet-body').css("display",'block');
        $element.find('.' + role + '_id').last().val(data.id);
        $element.attr('data-id', data.id);
        $element.find('.remove,.delete_Question').attr('data-action', data.remove);
        $element.find('input').attr('data-count', data.id);
        $element.find('input[name^=' + role + '_id]').val(data.id);

        $dependent_elements = $element.find(".options_dependent");
        $dependent_elements.each(function () {
            var depending_on_name = $(this).attr("data-depending-on");
            $depending_on_element = $(this).parent().find("[name=" + depending_on_name + "]");
            $new_name = $depending_on_element.attr('name') + data.id;
            $depending_on_element.attr('name', $new_name);
            $(this).attr("data-depending-on", $new_name);
            // optionDependency($dependent_elements ,$new_name );
        });
        //  console.log($element);

        if (typeof addExtraActions !== "undefined") {

            // safe to use the function
            addExtraActions(data, $element, actionButton);

        }

        $('select.select2').select2();


        $element.find('.errorValidation').removeClass("errorValidation");
        $element.find(".error_message").hide();

        // $.each(data,function(key , value){
        //     if (key == 'popup'){
        //         $element.find('.popup').attr('href',value);
        //         $('.popup').magnificPopup({
        //             type: 'iframe'
        //         });
        //     } else {
        //
        //     }
        //     $element.find('.'+key+' .fileinput').attr('data-action', value);
        // });
    }).complete(function () {
        initDates();


        appUnBlockUI();
    });
});

$(document).on('click', '.mt-checkbox .checkbox', function () {
    $input = $(this).find('input');
    // console.log('checked');
    if ($input.is(':checked')) {
        $input.prop('checked', false);
    } else {
        $input.prop('checked', true);
    }
});

$(document).on('click', ':checkbox', function () {
    $input = $(this).find('input');
    // console.log($(this).attr('name'))
    if ($(this).is(':checked')) {
        $(this).parent().find('input.hidden-checkbox').attr('name', "");
    } else {
        $(this).parent().find('input.hidden-checkbox').attr('name', $(this).attr('name'));
    }
});
$(document).on('click', '.filepicker', function () {
    var target = $(this).data('target');
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
            //Download photo action
            link = document.createElement('a');
            link.href = data.download_action;
            link.innerHTML = data.file_name;
            $container.find('.filenameplaceholder ').html(link).removeClass('hidden');
            //Delete photo action
            $container.find('.removefile')
                .attr('data-action', data.remove_action)
                .removeClass('hidden');
            //Show photo action
            $('.show').find('img').attr('src', data.show_action)
            link = document.createElement('img');
            link.setAttribute('class', 'img-thumbnail');
            link.src = data.show_action;
            link.innerHTML = data.file_name;
            $container.find('.show ').html(link).removeClass('hidden');
        },
        complete: function () {
            $('#save-all').prop('disabled', false);
        }
    });

});
$(document).on('click', '.removefile', function (e) {
    appBlockUI();
    var $container = $(this).closest('.form-group');
    e.preventDefault();
    $.ajax({
        method: 'delete',
        url: $(this).data('action'),
        success: function () {
            $container.find('.filenameplaceholder').html('');
            /*No file selected*/
            $container.find('.removefile').addClass('hidden');
            $container.find('.filepicker').removeClass('hidden');
        },
        complete: function () {
            appUnBlockUI();
        }
    });
});


$(document).on('click', '.remove-stuff', function (e) {//Delete from list
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
                swal("Deleted!", 'Successfuly deleted', "success");
                table.row($row).remove().draw();
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });
});
$(document).on('click', '.reject', function () {
    var url = $(this).data('action');
    var method = $(this).data('method');
    $.ajax({
        url: url,
        method: method,
        success: function (data) {
            toastr['success']('Successfuly rejected', "Done");
            pjaxPage(data.url);
        },
    })
});
/* Reordering Elements in data table */
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
/* Drawing data table */
$('#table-dt').on('draw.dt', function () {
    if ($('.table-checkbox:checked').length) {
        $('.delete_multiple').prop('disabled', false);
        $('.group-checkable').prop('checked', true);
    } else {
        $('.delete_multiple').prop('disabled', true);
        $('.group-checkable').prop('checked', false);
    }

});
/* End reordering elements in data table*/

/* Status Filter */
$(document).on('change', '#status-filter [name=status]', function () {
    pjaxPage($(this).val());
});
/*numbers only are click-able*/
$(document).on('keydown', '.numbers', function (e) { // reject all keys except numbers
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
/*
 * disable selected options in other select tag in the same page
 */
/* Wasn't working with cloned divs
 $('select.option-disable').on('change', function() {
 $('option').prop('disabled', false);
 console.log('111');
 $('select.option-disable').each(function() {
 var val = this.value;
 $('select.option-disable').not(this).find('option').filter(function() {
 return this.value === val;
 }).prop('disabled', true);
 });
 $('option.empty').prop('disabled', false);
 }).change();*/
$(document).on('click', '.option-disable', function () {
    $('option').prop('disabled', false);
    $('select.option-disable').each(function () {
        var val = this.value;
        $('select.option-disable').not(this).find('option').filter(function () {
            return this.value === val;
        }).prop('disabled', true);
    });
    $('option.empty').prop('disabled', false);
}).change();

function initDates() {
    $('.timepicker').keypress(function (event) {
        event.preventDefault();
        return false;
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
    $(".datePicker").datetimepicker({
        format: 'yyyy-mm-dd',
        dateFormat: 'yy-mm-dd',
        startView: 'month',
        minView: 'month',
        autoclose: 1,
        // startDate: '-1d',
        prevText: '<i class="fa fa-caret-left"></i>',
        nextText: '<i class="fa fa-caret-right"></i>'

    });
    $(".monthPicker").datetimepicker({
        format: 'yyyy-mm',
        dateFormat: 'yy-mm',
        startView: 'year',
        minView: 'year',
        autoclose: true,
        startDate: '+2m',
        prevText: '<i class="fa fa-caret-left"></i>',
        nextText: '<i class="fa fa-caret-right"></i>'

    });
    $(".yearPicker").datetimepicker({
        format: 'yyyy',
        dateFormat: 'yyyy',
        startView: 4,
        minView: 4,
        autoclose: true,
        startDate: 'y',
        prevText: '<i class="fa fa-caret-left"></i>',
        nextText: '<i class="fa fa-caret-right"></i>'

    });
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function changeUrlParam (param, value) {
    var currentURL = window.location.href+'&';
    var change = new RegExp('('+param+')=(.*)&', 'g');
    var newURL = currentURL.replace(change, '$1='+value+'&');

    if (getURLParameter(param) !== null){
        try {
            window.history.replaceState('', '', newURL.slice(0, - 1) );
        } catch (e) {
            // console.log(e);
        }
    } else {
        var currURL = window.location.href;
        if (currURL.indexOf("?") !== -1){
            window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
        } else {
            window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
        }
    }
}
$(document).on('click', 'ul.nav-tabs li a', function (e) {

    var tab_index = $(this).attr('data-tab_index');
    if (typeof tab_index !== "undefined") {
        changeUrlParam ("tab_index", tab_index);

        var target_tab = $(this).attr('data-header');
        $(".tab-pane").removeClass("active");
        if($("#"+target_tab).length >0){
            $("#"+target_tab).addClass("active");
            // $("#"+target_tab).addClass("active").find('.table-striped th:first').click();
            $("#"+target_tab).find('.table-striped').each(function () {
                $(this).find('th:first').click();
            });
        }


    }





});
$(document).on('click', '.advanced_search', function (e) {
    e.preventDefault();

    $(this).closest('.m-portlet').find('.m-form').toggle(100);

});

function refreshAjax(){
    var url = document.URL;

    var goTo = url.split("#");


    pjaxPage(goTo[0]);
}


