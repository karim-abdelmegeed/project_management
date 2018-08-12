$(document).on('click', '#add_new_course', function () {
    
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url);
    }).complete(function () {
        parent.blocked = false;
    });
});
$(document).on('ready pjax:success', function () {
    dragula([$('#levels')[0]]);
//    dragula([$('#objectives')[0]]);
    $('#objectives.dd').nestable();
});
$(document).on('ready pjax:success', function () {
    // prepare the form when the DOM is ready 
    $(document).ready(function () {
        var options = {
            target: '', // target element(s) to be updated with server response 
            beforeSubmit: showRequest, // pre-submit callback 
            success: showResponse // post-submit callback 

            // other available options: 
            //url:       url         // override for form's 'action' attribute 
            //type:      type        // 'get' or 'post', override for form's 'method' attribute 
            //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
            //clearForm: true        // clear all form fields after successful submit 
            //resetForm: true        // reset the form after successful submit 

            // $.ajax options can be used here too, for example: 
            //timeout:   3000 
        };

        // bind form using 'ajaxForm' 
        $('.ajax_form').ajaxForm(options);
    });

    // pre-submit callback 
    function showRequest(formData, jqForm, options) {
        var name = formData[2]['value'];
        var email = formData[3]['value'];
        var password = formData[4]['value'];
        

        
       
        if (name == '') {
            var $toast = toastr["error"]("Error", "Please insert a name");

            return false;
        }
         if (email == "") {
            var $toast = toastr["error"]("Error", "Please insert an Email");
            return false;
        }
        if(!validateEmail(email)){
            var $toast = toastr["error"]("Error", "Please insert a valid Email");
            return false;
        }
         if (password == "") {
            var $toast = toastr["error"]("Error", "Please insert a password");
            return false;
        }

        return true;
    }

    // post-submit callback 
    function showResponse(responseText, statusText, xhr, $form) {
        var $toast = toastr["success"]("Done", "Successfully Saved");
        pjaxPage('/admin/users/0');
    }
});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
$(document).on('click', '.remove-course', function (e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).attr('href');
    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: action,
            method: 'delete',
            success: function () {
                swal("Decommissioned!", 'Successfuly decommissioned', "success");
                var url = document.URL;
                var goTo = url.replace("#", ""); 
                pjaxPage(goTo);
                return false;
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
                return false;
            }
        });

    });
});

$(document).on('click', '.recommission_user', function (e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).attr('href');
    swal({
        title: "Are you sure?",
        text: "",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: action,
            method: 'post',
            success: function () {
                swal("Recommissioned!", 'Successfuly recommissioned', "success");
                var url = document.URL;
                var goTo = url.replace("#", ""); 
                pjaxPage(goTo);
                return false;
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
                return false;
            }
        });

    });
});
