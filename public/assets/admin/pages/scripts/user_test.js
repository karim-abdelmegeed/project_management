$(document).on('ready pjax:success', function () {
    // codeblock change_radios     
    $(document).on('change','.radios',function(){
        if($(this).find('.add_textField').is(':checked')){
            $(this).closest('.inline-group').find('textarea[name^=answers]').prop('readonly','')
        }
        else if($(this).find('.add_textField').is(":not(:checked)")){
            $(this).closest('.inline-group').find('textarea[name^=answers]').prop('readonly',true).val("");
        }
    });
    // codeblock change_checkboxes     
    $(document).on('change','.checkboxs',function(){
        if($(this).find('.add_textField').is(':checked')){
            $(this).closest('.inline-group').find('textarea[name^=answers]').prop('readonly','')
        }
        else if($(this).find('.add_textField').is(":not(:checked)")){
            $(this).closest('.inline-group').find('textarea[name^=answers]').prop('readonly',true).val("");
        }
    });
   
    // codeblock ajaxForm     
    $(document).ready(function () {
        var options = {
            target: '', // target element(s) to be updated with server response
            beforeSubmit: showRequest, // pre-submit callback
            success: showResponse // post-submit callback
        };
        $('.ajax_form2').ajaxForm(options);
    });
    // pre-submit callback
    // codeblock pre-submit-callback       
    function showRequest(formData, jqForm, options) {


        $('.submit_answer').hide();
        App.blockUI({
            boxed: true
        });
        selectedValuex = formData.length;
        if (selectedValuex <= 2 ) {
            var $toast = toastr["error"]("Error", "Please select an answer");
            App.unblockUI();
            $('.submit_answer').show();
            return false;

        }
        return true;
    }
    // post-submit callback
    // codeblock post-submit-callback      
    function showResponse(responseText, statusText, xhr, $form) {
     var quiz_id=$('input[name=quiz_id]').val();
     pjaxRedirect('/admin/user_test/index/'+quiz_id);
        App.unblockUI();
    }
});
$(document).on('ready', function () {
     // codeblock clock  
    if ($(".clock").length) {
        $(function () {
            var clock;
             var seconds_remaining= $(".clock").data('seconds-left');
             
            clock = $('.clock').FlipClock({
                clockFace: 'HourCounter',
                autoStart: false,
                callbacks: {
                    stop: function() {
                        //console.log("ana gowa el stop");
                        appBlockUI();
                        var quiz_id=$('input[name=quiz_id]').val();
                        var entry_id=$('input[name=entry_id]').val();
                        $.ajax({url: '/admin/user_test/endTest/'+quiz_id+'/'+entry_id, success: function(result){
                            location.reload();
                        }});
                        
                    }
                }
            });
            clock.setTime(seconds_remaining);
            clock.setCountdown(true);
            clock.start();
            })
}

});
$(document).on('pjax:success', function () {
    var clock;
             var seconds_remaining= $(".clock").data('seconds-left');
clock = $('.clock').FlipClock({
                clockFace: 'HourCounter',
                autoStart: false
                
            });
clock.setTime(seconds_remaining);
            clock.setCountdown(true);
            clock.start();
});


