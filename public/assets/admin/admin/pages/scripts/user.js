$(document).on('ready pjax:success', function () {
       // province();

    $("select.select2").select2();
    $('.all-locale').each(function () {
        $selected_locales =  $(this).val();
        if($.inArray("all", $selected_locales) != -1) { //all is in selected
            $(this).select2('val', '')
            $(this).select2('val', 'all')
        }
    });


    $.get('/search/service_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=service_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/role_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=role]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    $.get('/search/language_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=language_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    $(document).on('change','[name = country]',function(){
    province();
    });
    // codeblock make_manager   
    $(document).on('click', '.make_manager', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        swal({
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
            title: "Make Teamleader a Manager",
            text: " Are you sure?",
        }, function () {
            $.ajax({
                url: url,
                method: "get",
                success: function ($data) {
                    table.draw();
                },
                error: function () {
                    console.log('Upload error');
                }
            })

        });

    });
    // codeblock admin_add_role   
    $(document).on('click', '.admin_add_role', function () {
        var role_id = $(this).parent().find('select[name^=role_id] option:selected').val();
        var url = $(this).attr('data-url');
        console.log(url);
        var formData = new FormData();
        formData.append('role_id', role_id);
        $.ajax({
            url: url,
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function ($data) {
                if ($data.status == "error") {
                    var $toast = toastr["error"]($data.msg, "Sorry");
                }
                table.draw();
            },
            error: function () {
                console.log('Upload error');
            }
        })
    });
    // codeblock edit_user_signature 
    $(document).on('click', '.edit_signature', function (e) {
        e.preventDefault();
        var button_clicked = $(this);
        $.ajax('/signature/check_pending_signature', {
            method: "get",
            success: function ($data) {
                console.log($data);
                if ($data == 1) {
                    swal({
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true,
                        title: "You have a Pending Signature",
                        text: "Do you want to cancel it ?",
                    }, function () {
                        $.ajax({
                            type: "get",
                            url: "/signature/cancel_pending_signature",
                        }).done(function (respond) {

                            // swal("Canceled!", 'Pending Signature cancelled Successfully', "success");
                            $('#add_signature').click();
                        });

                    });
                }
                else {
                    $('#add_signature').click();
                }
            },
            error: function () {
                console.log('Upload error');
            }
        })
    });
    // codeblock edit_user_name  
    $(document).on('click', '#edit_name', function (e) {
        appBlockUI();
        e.preventDefault();
        $.ajax('/user/check_pending_names', {
            method: "get",
            success: function ($data) {
                 appUnBlockUI();
                console.log($data);
                if ($data == 1) {
                    swal({
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true,
                        title: "You have a Pending Name",
                        text: "Do you want to cancel it ?",
                    }, function () {
                        appBlockUI();
                        $.ajax({
                            type: "get",
                            url: "/user/cancel_pending_names",
                        }).done(function (respond) {

                            // swal("Canceled!", 'Pending Name cancelled Successfully', "success");
                            $('#add_name').click();
                            appUnBlockUI();
                        });

                    });
                }
                else {
                    $('#add_name').click();
                }
            },
            error: function () {
                appUnBlockUI();
                console.log('Upload error');
            }
        })
    });

    // codeblock phone_number_implementation  

    $(".phone").each(function () {
        $(this).intlTelInput({

            //allowExtensions: true,
            //autoFormat: false,
            autoHideDialCode: false,
            autoPlaceholder: true,
            //defaultCountry: "auto",
            // geoIpLookup: function(callback) {
            //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
            //     var countryCode = (resp && resp.country) ? resp.country : "";
            //     callback(countryCode);
            //   });
            // },
            //nationalMode: false,
            numberType: "MOBILE",//phone in normal cases is "FIXED_LINE"
            //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
            //preferredCountries: ['cn', 'jp'],
            utilsScript: "/assets/global/plugins/phone_input/js/utils.js"
        });
        $(this).intlTelInput("setCountry", "al")
    });

    $('.fax').each(function () {
        $(this).intlTelInput({
            //allowExtensions: true,
            //autoFormat: false,
            autoHideDialCode: false,
            autoPlaceholder: true,
            //defaultCountry: "auto",
            // geoIpLookup: function(callback) {
            //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
            //     var countryCode = (resp && resp.country) ? resp.country : "";
            //     callback(countryCode);
            //   });
            // },
            //nationalMode: false,
            numberType: "FIXED_LINE",
            //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
            //preferredCountries: ['cn', 'jp'],
            utilsScript: "assets/global/plugins/phone_input/js/utils.js"
        });
    });

    $("#mobile").intlTelInput({
        //allowExtensions: true,
        //autoFormat: false,
        autoHideDialCode: false,
        autoPlaceholder: true,
        //defaultCountry: "auto",
        // geoIpLookup: function(callback) {
        //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        //nationalMode: false,
        numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        utilsScript: "assets/global/plugins/phone_input/js/utils.js"
    });
//end phone number implementation

    $(".phone").each(function () {
        $flag = $(this).parent().parent().find('input.country_title').val();
        if ($flag != undefined && $flag != '') {
            $li = $(this).parent().find('[data-country-code=' + $flag + ']');
            $li.parent().find('li').removeClass('active').removeClass('highlight');
            $li.addClass('active').addClass('highlight');
            $country_name = $li.find('.country-name').text();
            $dial_code = $li.find('.dial-code').text();

            $(this).parent().find('.selected-flag').attr('title', $country_name + ': ' + $dial_code);

            $(this).parent().parent().find('.selected-flag .iti-flag.us').removeClass('us').addClass($flag);

        }


    });
  // codeblock name_placeholder    
    function name_placeholder() {
        if ($('[name=role]').val() == 4) {
            $("input[name='name']").attr("placeholder", "Company Legal Name");
        }
        else {
            $("input[name='name']").attr("placeholder", "Write Your Name as in ID");
        }
    }

    name_placeholder();
    // codeblock change_role    
    $(document).on('change', '[name=role]', function () {
        var id = $(this).attr('data-id');
        if ($(this).val() == 4) {
            $("input[name='name']").attr("placeholder", "Company Legal Name");

            $.ajax({
                url: '/' + id + '/User/AgencyContact/agencyContact/agency_contacts/init',
                method: 'post',
                success: function (data) {
                    var role = 'agency_contact';
                    var toAppend = '.agency_contacts';
                    var array = toAppend.split("-");
                    var ToClass = array[0];
                    var $element = $('#hidden').find('.' + role).clone();
                    $(ToClass).append($element);
                    $element.find('.' + role + '_id').last().val(data.id);
                    $element.attr('data-id', data.id);
                    $element.find('.remove').attr('data-action', data.remove);
                    $element.find('input').attr('data-count', data.id);
                    $element.find('input[name^=' + role + '_id]').val(data.id);

                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });
        }
        else {
            $("input[name='name']").attr("placeholder", "Write Your Name as in ID");
            $.ajax({
                url: '/user/' + id + '/delete_agency_contacts',
                method: 'get',
                success: function () {
                    $('form').find('.agency_contact').each(function () {
                        $(this).remove();
                    })
                }
            })
        }
    });

    if ($('.reorder').length) {
        var drake = dragula([$('#users-175 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var column_data = [];
    var input_values = [];
    var datatable_obj = $("th").map(function () {
        return $(this).data('name');
    });
    var form_element_names = $('.element').map(function () {
        return $(this).data('input');
    });
    $.each(datatable_obj, function (key, value) {
        column_data[key] = {"data": value}
    });


    $('#search-form').on('click', function (e) {
        $('.element').each(function () {
            input_values = [];

    table.draw();
    e.preventDefault();
    });

});



    var table = $('#users-175').DataTable({'scrollX':true,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],

        "columnDefs": [ {
            "targets": [2,3,4,7],
            "orderable": false
        } ],
        "drawCallback": function (settings) {
            $(".btn.btn-xs.btn-primary.popup_refresh").removeClass('btn-xs').removeClass('btn-primary').addClass('m-btn--pill').addClass('btn-info').addClass('m-btn').addClass('m-btn--custom');
        $(".admin_add_role").addClass('m-btn--pill').addClass('btn-info').addClass('m-btn').addClass('m-btn--custom');
            $('.popup').magnificPopup({
                type: 'iframe'
            });
            $('.popup_refresh').magnificPopup({
                type: 'iframe',
                callbacks: {
                    open: function () {
                        // Will fire when this exact popup is opened
                        // this - is Magnific Popup object
                    },
                    close: function () {
                        table.draw();

                    }
                    // e.t.c.
                }

            });
        },
        processing: true,
        serverSide: true,
        bFilter: false,
        //--@sorting@--
        //--@disable-sorting@--
        columns: column_data,
        ajax: {
            url: '/user/user_data',
            data: function (d) {
                $('.element').each(function () {
                    input_values.push($(this).val());
                });
                $.each(form_element_names, function (key, value) {
                    d[value] = input_values[key]
                });
            }
        },
        createdRow: function (row, data, dataIndex) {
            if (row.hasClass('not-admin')) {

                $(row).find('td:last-child').attr('class', 'hidden');
            }
        }
    });
//--@hide-sorting@--
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);

        }

    });

//js-fn

    $('[name^=bank_country]').each(function () {
        CountryCity($(this), $(this).attr('id'), "city"+$(this).data('id'));

    });
    // codeblock change_role_status    
    $(document).on('click', '.change_role_status', function (e) {//Delete from list
        e.preventDefault();
        var button = $(this);
        var role_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        swal({
            title: "Submit password to change status",
            // text: "Write something interesting:",
            type: "input",
            inputType:"password",
            showCancelButton: true,
            closeOnConfirm: false,
            inputPlaceholder: "Write your password"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("Password is required");
                return false
            }
            $.ajax({
                url: '/user/confirm_auth' ,
                method: 'get',
                data:{
                    password: inputValue,
                },
                success: function (response) {
                    if(response == '0')
                    {
                        swal.showInputError(
                            'Wrong password, try again.'
                        );
                    } else{
                        if(button.attr('data-status') == 'active'){
                            $.ajax({
                                url:  '/user/'+0+'/'+role_id+'/change_role_status',
                                method: 'get',
                                success: function ($data) {
                                    if($data.project){
                                        var projects = '';
                                        console.log($data.project[0]);

                                        for(var i =0; i<$data.project[0].length;i++){
                                            projects += '<li><b>Project Name:</b> '+$data.project[0][i]+' <b>Role:</b> '+$data.position[0][i]+'</li>';
                                        }
                                    }
                                    console.log(projects);
                                    swal({
                                        title: "Are you sure you want to suspend?",
                                        text:projects,
                                        type: "warning",
                                        showCancelButton: true,
                                        html: true,
                                        confirmButtonText: "Yes, change it!",
                                        closeOnConfirm: true
                                    },function(){
                                        $.ajax({
                                            url: '/user/'+1+'/'+role_id+'/change_role_status',
                                            method: 'get',
                                            success: function(){

                                                button.parent().parent().find('.status').html('suspended');
                                                button.html('Reactivate');
                                                button.attr('data-status','suspended');
                                                swal("Success", 'User role suspended Successfully', "success");

                                            }

                                        })
                                    })

                                    // }, success: function ($data) {
                                    //     //
                                    //     // button.parent().parent().find('.status').html('suspended');
                                    //     // button.html('Reactivate');
                                    //     // button.attr('data-status', 'suspended');
                                    //     // swal("Success", 'User role suspended Successfully', "success");
                                },
                                error: function () {
                                    swal("Error", 'Something is wrong, Try again later', "error");
                                }
                            });
                        }
                        else{
                            $.ajax({
                                url: '/user/'+1+'/'+role_id+'/change_role_status',
                                method: 'get',
                                success: function(){

                                    button.parent().parent().find('.status').html('Active');
                                    button.html('Suspend');
                                    button.attr('data-status','active');
                                    swal("Success", 'User role activated Successfully', "success");

                                }

                            });

                        }
                    }
                }
            });
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
                    swal("Deleted!", 'Successfully deleted', "success");
                    table.row($row).remove()
                        .draw();
                    html2canvas($("#users-175"), {
                        onrendered: function (canvas) {
                            console.log(canvas);
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

    selectValue();


    var previously;
    $(document).on('select2:selecting', '.language_locale', function (evt) {
        previously = $(this).val();

    });
    // codeblock language_locale   
    $(document).on('select2:select', '.language_locale', function (evt) {
        var now = $(this).val();
        $('.language_locale option[value="' + now + '"]').not($(this).find('option[value="' + now + '"]')).attr("disabled", "disabled");
        $('.language_locale option[value="' + previously + '"]').removeAttr("disabled");
        $('.language_locale option[value=""]').removeAttr("disabled");
        $('select.select2').select2();
    });
});

// codeblock ajaxFormBeforeSerialize   
function ajaxFormBeforeSerialize() {
    $('.phone').each(function () {
        $country_name = $(this).parent().find('.iti-flag:first').attr('class');
        $(this).parent().parent().find('.country_title').val($country_name.split(' ')[1]);
    });

    $('.fax').each(function () {
        $country_name = $(this).parent().find('.iti-flag:first').attr('class');
        $(this).parent().parent().find('.country_title').val($country_name.split(' ')[1]);
    });
}
 // codeblock select_value   
function selectValue() {
    var latest_value = $("option:selected", $('.language_locale')).each(function () {
        console.log($(this))
        $id = ($(this).val());
        $('.language_locale option[value="' + $id + '"]').not(this).attr("disabled", "disabled");
        $('.language_locale option[value=""]').removeAttr("disabled");
        $('select.select2').select2();
    });
}
// codeblock removeSuccess  
function RemoveSuccess() {
    $('.language_locale option').removeAttr("disabled");
    selectValue();
}

//     function ajaxFormSuccess(response){
//      if(response.close){
//         window.parent.$.magnificPopup.close();
//     }
// }
// codeblock addExtraAction    
function addExtraActions(data , $element){
    $bank = $element.find('[name^=bank_country]');
    $element.find('[name^=bank_country]').attr('id', 'country'+data.id);
    $element.find('[name^=bank_country]').attr('data-region-id', 'city'+data.id);
    $element.find('[name^=bank_city]').attr('id', 'city'+data.id);
    $element.find('.dependent').attr('data-depending-on','payment_method'+data.id);
    $element.find('.master').attr('name','payment_method'+data.id);
    CountryCity($bank, "country"+data.id, "city"+data.id);

}
