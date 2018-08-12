$(document).on('click', '#add_new_course', function () {

    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url);
    }).complete(function () {
        parent.blocked = false;
    });
});

$(document).on('ready pjax:success', function () {
    $.getScript("/assets/global/scripts/app.js");
    // prepare the form when the DOM is ready 
    taskChange();
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
        var start_time = formData[0]['value'];
        var end_time = formData[1]['value'];





        if (start_time == '') {
            var $toast = toastr["error"]("Error", "Please insert a start time");

            return false;
        }
        if (end_time == "") {
            var $toast = toastr["error"]("Error", "Please insert an end time");
            return false;
        }


        return true;
    }

    // post-submit callback 
    function showResponse(responseText, statusText, xhr, $form) {
        var data = responseText['data'];
        var $toast = toastr[data.type](data.msg, data.type);
        if (data.type == "success") {
            pjaxPage('/admin/tasks/' + data.task_id + '/logs');
        }
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
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: action,
            method: 'delete',
            success: function () {
                swal("Deleted!", 'Successfuly deleted', "success");
                $row.remove();
                return false;
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
                return false;
            }
        });

    });
});

function taskChange() {
    $('input[name="task-status"]').on('switchChange.bootstrapSwitch', function (event, state) {
        var task_id = $('#task_id').val();
        var status;

        if (state) {
            status = "Finished";
            $('.ajax_form').hide();
            $('.remove-course').hide();
        } else {
            status = "Running";
            $('.ajax_form').show();
            $('.remove-course').show();
        }
        var action = '/admin/tasks/' + task_id + '/' + status + '/updateStatus';
        $.ajax({
            url: action,
            method: 'post'

        });


    });
}
