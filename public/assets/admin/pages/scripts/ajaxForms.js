// prepare the form when the DOM is ready 
$(document).on('ready pjax:success', function () {


    //Hidden elements Dependencies
    $dependent_emements = $(".dependent");


    $dependent_emements.each(function () {
        $dependent_element = $(this);
        var depending_on_name = $dependent_element.attr("data-depending-on");
        var depending_on_value = $dependent_element.attr("data-depending-value");
        //console.log(depending_on_name);
        $depending_on_element = $("[name=" + depending_on_name + "]");
        $depending_on_element.addClass("master_dependency");
        depending_on_element_val = $depending_on_element.find('option:selected').attr('data-depend');
        if (depending_on_element_val == null || depending_on_element_val == '') {
            var depending_on_element_val = $depending_on_element.val();
        }

        var type_of_depending_on_element = $depending_on_element.prop('type');
        if (type_of_depending_on_element == 'checkbox') {
            if ($depending_on_element.is(':checked')) {
                depending_on_element_val = 1;
            } else {
                depending_on_element_val = 0;
            }
        }
       // console.log(depending_on_name)
        if (depending_on_value.startsWith("[") && depending_on_value.endsWith("]")) {
            var depending_on_values = depending_on_value.slice(1, -1).split(',');//get array of probable value
            validateDependentValue($dependent_element, depending_on_element_val, depending_on_values);
        } else {
            validateDependentValue($dependent_element, depending_on_element_val, depending_on_value);
        }

    });

    // $(".master_dependency").change(function () {
    $(document).on('change', '.master_dependency', function () {//more helpful in dynamically created elements
         var element_name = $(this).attr("name");
        var element_value = $(this).find('option:selected').attr('data-depend');//depending_on_element_val
        if (element_value == null || element_value == '') {
            var element_value = $(this).val();//depending_on_element_val
        }
       // console.log(element_value)
        var type_of_depending_on_element = $(this).prop('type');
        if (type_of_depending_on_element == 'checkbox') {
            if ($(this).is(':checked')) {
                element_value = 1;
            } else {
                element_value = 0;
            }
        }
        $dependent_element = $('*[data-depending-on="' + element_name + '"]');

        $dependent_element.each(function () {
            var showValue = $(this).attr("data-depending-value"); //get array of probable value

            if (showValue.startsWith("[") && showValue.endsWith("]")) {
                var depending_on_values = showValue.slice(1, -1).split(',');
                validateDependentValue($(this), element_value, depending_on_values);
            } else {
                validateDependentValue($(this), element_value, showValue);
            }


        });
    });
    // Hidden options dependencies

    $dependent_emements = $(".options_dependent");


    $dependent_emements.each(function () {
        var depending_on_name = $(this).attr("data-depending-on");
        //var depending_on_value = $(this).attr("data-depending-value");

        $depending_on_element = $("[name=" + depending_on_name + "]");
        $depending_on_element.addClass("master_options_dependency");
        var masterValue = $depending_on_element.val();

        var pair_dependency = $(this).data('pair-dependency');
        optionDependency($(this), depending_on_name , pair_dependency );
    });

    $('form').on('change', ".master_options_dependency", function () {
        var element_name = $(this).attr("name");
        var element_value = $(this).val();
        
        $dependent_element = $('*[data-depending-on="' + element_name + '"]');
        $dependent_element.find("option").each(function () {
            // optionDependency($dependent_emements, element_name);

            var iteratingOkVal = $(this).attr("data-depending-value");
//console.log(element_value);
            if (iteratingOkVal == element_value || iteratingOkVal == "force_show" || $(this).attr("value") == "") {


                $(this).show();
                if ($(this).parent('select').hasClass("select2")) {
                    $(this).removeAttr("disabled");
                    $(this).parent('select').select2();
                }
            } else {
                $(this).hide();

                if ($(this).parent('select').hasClass("select2")) {
                    $(this).attr("disabled", "disabled");
                    $(this).parent('select').select2("val", "");
                    $(this).parent('select').select2();

                }
                $(this).parent('select').val("");

            }
        });

        //Select All option
        var select_all_option = $dependent_element.data('select-all-option');

        if (select_all_option == 1){
            $dependent_element.find("option[value='all']").remove();
            $dependent_element.append('<option value="all">All</option>');
        }

    });

    //Start working with option All
    var previously;
    $(document).on('select2:selecting', '.option-all', function (evt) {
        previously = $(this).val();
    });

    $(document).on('select2:select', '.option-all', function (evt) {
        var now = $(this).val();
        if(jQuery.inArray("all", now) != -1){ //array contain all
            if(jQuery.inArray("all", previously) != -1){//select last selected option only
                now = jQuery.grep(now, function(value) {
                    return value !='all';
                });
                $(this).select2("val", now);
            } else{//Select All option only
                $(this).select2("val", "all");
            }
        }

    });
    //End working with option All

    // hide error on changing
    $("input,select").change(function () {
        $(this).removeClass("errorValidation");
        $(this).closest('div').removeClass('error-view');
        $(this).next(".error_message").hide();
    });
    // $(".select2").select2({
    //     placeholder: "",
    //     allowClear: true
    // });
    var options = {
        beforeSubmit: beforeSubmit, // pre-submit callback
        success: success, // post-submit callback
        error: error,
        beforeSerialize: beforeSerialize
    };
    // bind form using 'ajaxForm'
    $('.ajax_form').ajaxForm(options);

    if (typeof ajaxFormAdditionalDependency !== "undefined") {

        // safe to use the function
        ajaxFormAdditionalDependency();
    }
});


function beforeSerialize($form, options) {
    // return false to cancel submit

    if (typeof ajaxFormBeforeSerialize !== "undefined") {
        // safe to use the function
        ajaxFormBeforeSerialize();
    }

}

// pre-submit callback
function beforeSubmit(formData, jqForm, options) {
    appBlockUI();

    if (typeof ajaxFormBeforeSubmit !== "undefined") {
        // safe to use the function
        ajaxFormBeforeSubmit();
    }

    // App.blockUI();
    // formData is an array; here we use $.param to convert it to a string to display it
    // but the form plugin does this for you automatically when it submits the data
    var queryString = $.param(formData);
    var formElement = jqForm[0];
    var pass = 1;
    $(".error_message").hide();
    if (JSON.stringify(formData).includes('publish') || JSON.stringify(formData).includes('confirm') || JSON.stringify(formData).includes('modify')) {

        for (var i = 0; i < formData.length; i++) {

            var elementName = formData[i].name.replace("[]", "");
            if (formData[i].type == "select-one") {
                $formElement = $('select[name=' + elementName + ']');
            } else if (formData[i].type == "textarea") {
                $formElement = $('textarea[name=' + elementName + ']');
            } else {
                $formElement = $('input[name=' + elementName + ']');
            }
            $formElement.closest('div').removeClass('error-view');
            $formElement.removeClass("errorValidation");

            validationRules = $formElement.attr('data-validation');

            validationName = $formElement.attr('data-name');
            var check_dependency = true;

            if (!validationRules && !validationName) { // works with array of inputs
                if (formData[i].type == "select-one") {
                    $formElement = $("select[name='" + formData[i].name + "']");
                } else {
                    $formElement = $("input[name='" + formData[i].name + "']");
                }

                for (key = 1; key < $formElement.length; key++) {
                    $input = $($formElement[key - 1])
                    validationRules = $input.attr('data-validation');
                    validationName = $input.attr('data-name');
                    validationCount = $input.attr('data-count');

                    pass = validateAll(validationRules, check_dependency, $input, pass)
                   // console.log($input)
                 //   console.log(pass)
                }


            } else { //works with normal (non array) inputs
                $input = $("input[name='" + formData[i].name + "']");
                if ($input.length == 0) {//for <select>
                    $input = $("select[name='" + formData[i].name + "'");

                }
                pass = validateAll(validationRules, check_dependency, $input, pass)

            }
            if ($formElement.closest('.dependent').length != 0) {
                if ($formElement.css('display').toLowerCase() == 'none') {
                    check_dependency = false;
                }
            }

        }

    }
    if (JSON.stringify(formData).includes('report')) {
        pass = 1;
    }

    if (pass == 1) {
        return true;
    } else {

        return false;
    }
}

// post-submit callback 
function success(responseText, statusText, xhr, $form) {
    appUnBlockUI();
    if (typeof ajaxFormSuccess !== "undefined") {

        // safe to use the function
        ajaxFormSuccess(responseText);
    }
    // App.unblockUI();

    var response = responseText;
    // console.log(response);
    if (response.status == "error") {
        var $toast = toastr["error"](response.msg, "Sorry");
    } else {
        if (window.top == window.self) {
            var $toast = toastr["success"](response.msg, "Success");
        }
        if (response.page == "none") {
            $(".resetForm").click();
            if (window.top != window.self) {
                if (response.status =='success'){
                    swal(
                        "Success", response.msg, "success", {
                            button: false,
                        }
                    );
                    setTimeout(
                        function () {
                            $('.mfp-close', window.parent.document).click();

                        }, 2000);

                }else{
                    swal(
                        "Wrong", response.msg, "error", {
                            button: false,
                        }
                    );
                    setTimeout(
                        function () {
                            $('.mfp-close', window.parent.document).click();

                        }, 2000);


                }


            }
            $(".close_modal").click();
            $(".close_modal").click();
        } else {

            if (typeof response.without_pjax !== "undefined") {

                window.location.href = response.url;
                return false;
            }
            if(typeof response.reload !== "undefined"){
                location.reload();
                return false;
            }
            

             pjaxPage(response.url);
            

        }
    }
}

function error(responseText, statusText, xhr, $form) {
//    appUnBlockUI();
    App.unblockUI();

    var $toast = toastr["error"](responseText, statusText);
    //location.reload();

}

function validateAll(validationRules, check_dependency, $Input, pass) {


    if (typeof validationRules !== 'undefined' && check_dependency) {
        if (validationRules.includes("match")) {

            var split = validationRules.split(".");
            var field = split[1];
            var fieldValue = $('input[name=' + field + ']').val();
            if ($Input.val() !== fieldValue) {
                //appUnBlockUI();
                App.unblockUI();

                //var $toast = toastr["error"]("Error", validationName+" is required");
                $Input.addClass("errorValidation");
                $Input.closest('div').addClass('error-view');
                $Input.next(".error_message").show().html(field + "s don't match");
                pass = 0;
            }
        }
        if ($Input.val() == "Choose Time" && $Input.hasClass("timepicker")) {
            //appUnBlockUI();
            App.unblockUI();

            //var $toast = toastr["error"]("Error", " Invalid Email");
            $Input.addClass("errorValidation");
            $Input.closest('div').addClass('error-view');
            $Input.next(".error_message").show().html("Invalid Time");
            pass = 0;
        }

        if (!validateEmail($Input.val()) && validationRules.includes("email")) {
            //appUnBlockUI();
            App.unblockUI();

            //var $toast = toastr["error"]("Error", " Invalid Email");
            $Input.addClass("errorValidation");
            $Input.closest('div').addClass('error-view');
            $Input.next(".error_message").show().html("Invalid Email");
            pass = 0;
        }

        if (isNaN($Input.val()) && validationRules.includes("number")) {
            //appUnBlockUI();
            App.unblockUI();

            //var $toast = toastr["error"]("Error", validationName+" must be a number");
            $Input.addClass("errorValidation");
            $Input.closest('div').addClass('error-view');
            $Input.next(".error_message").show().html(validationName + " must be a number");
            pass = 0;
        }

        if ($Input.val() == "" && validationRules.includes("required")) {
            App.unblockUI();
            $Input.addClass("errorValidation");
            $Input.closest('div').addClass('error-view');
            $Input.next(".error_message").show().html(validationName + " is required");
            //var $toast = toastr["error"]("Error", validationName+" is required");
            pass = 0;
        }
        if (!validateURL($Input.val()) && validationRules.includes("url")) {
            // appUnBlockUI();
            App.unblockUI();
            $Input.addClass("errorValidation");
            $Input.closest('div').addClass('error-view');
            $Input.next(".error_message").show().html("Invalid URL");
            pass = 0;
        }
        if (!validateSkypeName($Input.val()) && validationRules.includes("skypeName")) {
            // appUnBlockUI();
            App.unblockUI();
            $Input.addClass("errorValidation");
            $Input.closest('div').addClass('error-view');
            $Input.next(".error_message").show().html("Invalid skype name");
            pass = 0;
        }

        return pass;
    }
    return pass;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateURL(url) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(url);
}

function validateSkypeName(skypeName) {
    var regex = /([a-zA-Z][a-zA-Z0-9_\-\,\.]{5,31})$/;
    return regex.test(skypeName)
}


function optionDependency($dependent_elements, depending_on_name, pair_dependency = 1) {
   // console.log(pair_dependency);
    if (pair_dependency == 1) {
        $depending_on_element = $dependent_elements.parent().find("[name=" + depending_on_name + "]");
    } else{
    $depending_on_element =  $("[name=" + depending_on_name + "]");    
    }
//console.log(depending_on_name)
    
    var masterValue = $depending_on_element.val();

    //console.log($dependent_elements);

    $dependent_elements.find("option").each(function () {
        var iteratingOkVal = $(this).attr("data-depending-value");
        var selectedValue = $(this).parent('select').val();

        if (iteratingOkVal == masterValue || iteratingOkVal == "force_show" || $(this).attr("value") == ""
            || $(this).attr("value") == "all" //<option value="all">
        ) {
            $(this).show();
            if ($(this).parent('select').hasClass("select2")) {
                $(this).removeAttr("disabled");
                $(this).parent('select').select2();
            }
        } else {
            $(this).hide();
            if ($(this).parent('select').hasClass("select2")) {
                $(this).attr("disabled", "disabled");
                $(this).parent('select').select2();

            }
            if (selectedValue == $(this).attr("value")) {
                $(this).parent('select').val("");
            }
        }

    });
/*
    //Select All option
    var select_all_option = $dependent_elements.data('select-all-option');

    if (select_all_option == 1){
        $dependent_elements.find("option[value='all']").remove();
        $dependent_elements.append('<option value="all">All</option>');
    }*/
}

function validateDependentValue($element, $depending_on_element_val, depending_on_value) {
    if (!depending_on_value.includes($depending_on_element_val)) {//In Array Dependency
        
        // $(this).find("input,select").val("");
        $element.find("input,select").change();
        $element.find("input,select").hide();
        $element.hide(250);

    } else {
        //$(this).find(".timepicker").val("Choose Time");
        $element.find("input,select").show();

        $element.show(250);
    }

}