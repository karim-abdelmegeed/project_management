$(document).on('click', '.show_form', function () {
    var status = $(this).attr('data-status');
    var type = $(this).attr('data-type');

    $(this).parent('.buttons').next('.timepickerDiv').find('.log_type').val(type);
    $(this).parent('.buttons').next('.timepickerDiv').find('.timepicker').attr('placeholder', type + ' time').val('');

    $(this).parent('.buttons').hide();
    $(this).parent('.buttons').next('.timepickerDiv').show();

});
$(document).on('click', '.cancel_update', function () {
    var status = $(this).attr('data-status');
    $(this).closest('.timepickerDiv').hide();
    $(this).closest('.timepickerDiv').prev('.buttons').show();

});


$(document).on('click', '#add_new_course', function () {

    var url = $(this).data('action');
    $.post(url).success(function (data) {
        pjaxPage(data.url);
    }).complete(function () {
        parent.blocked = false;
    });
});
$(document).on('ready pjax:success', function () {

    $(".running_status").hover(function () {
        var status = $(this).attr('data-status');

        var new_html;


        if (status == "Running") {
            new_html = '<i class="fa fa-pause" aria-hidden="true"></i> Pause';
        } else {
            new_html = '<i class="fa fa-play" aria-hidden="true"></i> Resume';
        }
        $(this).html(new_html);
    }, function () {
        var status = $(this).attr('data-status');

        var new_html;


        if (status == "Running") {
            new_html = '<i class="fa fa-play" aria-hidden="true"></i> Running';
        } else {
            new_html = '<i class="fa fa-pause" aria-hidden="true"></i> Paused';
        }
        $(this).html(new_html);
    });

    $.getScript("/assets/global/scripts/app.js");
    $(".approval_select").change(function () {
        var task_id = $(this).attr('data-task_id');
        var state = $(this).val();
        $selectMenu = $(this);

        if (state == "Approved") {
            status = "Approved";
            var action = '/admin/tasks/' + task_id + '/' + status + '/Ok/updateApprovalStatus';
            $.ajax({
                url: action,
                method: 'post',
                success: function (result) {
                    setNotification('.pending_badge', result);
                }




            });

        }
        if (state == "Rejected") {
            $(this).val('Pending');
            status = "Rejected";

            swal({
                title: 'Accept task with a comment',
                input: 'textarea',
                text: 'Please type you comment',
                showCancelButton: true,
                confirmButtonText: 'Done',
                showLoaderOnConfirm: true,
                preConfirm: function (comment) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {

                            resolve()


                        }, 2000)
                    })
                },
                allowOutsideClick: false
            }).then(function (comment) {
                if (comment == "") {
                    comment = "Ok";
                }
                var action = '/admin/tasks/' + task_id + '/' + status + '/' + comment + '/updateApprovalStatus';
                $.ajax({
                    url: action,
                    method: 'post',
                    success: function (result) {
                        setNotification('.pending_badge', result);
                    }

                });

                $selectMenu.val('Rejected');
                swal({
                    type: 'success',
                    title: 'Task Updated',
                    html: 'Done'
                })
            })

        }
    });








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

    $(document).ready(function () {
        var options = {
            target: '', // target element(s) to be updated with server response 
            beforeSubmit: showRequest1, // pre-submit callback 
            success: showResponse1 // post-submit callback 

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
        $('.ajax_form1').ajaxForm(options);
    });

    // pre-submit callback 
    function showRequest(formData, jqForm, options) {

        var name = formData[2]['value'];
        var software = formData[3]['value'];
        var hours = formData[4]['value'];
        var mins = formData[5]['value'];
        var project_type = formData[6]['value'];
        var source = formData[7]['value'];
        var target = formData[8]['value'];
        var start_time = formData[9]['value'];
        var email_subject = formData[10]['value'];

        if (name == '') {
            var $toast = toastr["error"]("Error", "Please insert a name");

            return false;
        }
        if (software == '') {
            var $toast = toastr["error"]("Error", "Please insert a software");

            return false;
        }
        if (isNaN(hours)) {
            var $toast = toastr["error"]("Error", "Please insert valid estimated hours");

            return false;
        }
        if (isNaN(mins) || mins >= 60) {
            var $toast = toastr["error"]("Error", "Please insert valid estimated minutes");

            return false;
        }

        if (project_type == '') {
            var $toast = toastr["error"]("Error", "Please select a project type");

            return false;
        }
        if (source == '') {
            var $toast = toastr["error"]("Error", "Please select language source");

            return false;
        }
        if (target == '') {
            var $toast = toastr["error"]("Error", "Please select language target");

            return false;
        }
        if (start_time == '') {
            var $toast = toastr["error"]("Error", "Please insert a start time");

            return false;
        }
        if (email_subject == '') {
            var $toast = toastr["error"]("Error", "Please insert Email subject");

            return false;
        }

        return true;
    }

    // post-submit callback 
    function showResponse(responseText, statusText, xhr, $form) {

        var data = responseText['data'];
        var $toast = toastr[data.type](data.msg, data.type);
        if (data.type == "success") {
            pjaxPage('/admin/tasks');
        }




    }

    function showRequest1(formData, jqForm, options) {
        $('.submit_log').attr('disabled', 'disabled');
        var time = formData[0]['value'];




        if (time == '') {
            var $toast = toastr["error"]("Error", "Please insert a time");
            $('.submit_log').attr('disabled', false);
            return false;
        }

        //        $.ajax({
        //            url: '/admin/tasks/checkDay',
        //            method: 'post',
        //            data: {
        //                task_id:task_id,
        //                start_time:time
        //            },
        //            success: function (data) {
        //                if(data == 1){
        //                    swal("Deleted!", 'Successfuly deleted', "success");
        //                    
        //                    return false;
        //                }
        //            }
        //        });

        return true;

    }

    // post-submit callback 
    function showResponse1(responseText, statusText, xhr, $form) {
        var data = responseText['data'];
        var $toast = toastr[data.type](data.msg, data.type);
        $('.submit_log').attr('disabled', false);
        if (data.type == "success") {
            var url = document.URL;
            var goTo = url.replace("#", "");
            pjaxPage(goTo);
        }

        if (data.update_running == 1) {
            updateNotification('.running_badge', 'subtract', 1);

        }

    }
});

$(document).on('click', '.remove-course', function (e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).attr('href');



    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(function () {
        $.ajax({
            url: action,
            method: 'delete',
            success: function () {
                swal("Deleted!", 'Successfuly deleted', "success");
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

    })
});


function updateNotification(container, type, number) {
    $notContainer = $(container);
    currentVal = parseInt($notContainer.html());
    if (type == 'add') {
        newVal = currentVal + number;
        $notContainer.show();
    } else {
        newVal = currentVal - number;
        if (newVal <= 0) {
            $notContainer.hide();
        }

    }
    $notContainer.html(newVal);
}


function setNotification(container, number) {
    $notContainer = $(container);

    if (number > 0) {

        $notContainer.show();
    } else {


        $notContainer.hide();


    }
    $notContainer.html(number);
}
