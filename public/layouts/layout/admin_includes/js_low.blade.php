<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="/assets/global/plugins/respond.min.js"></script>
<script src="/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<script src="/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/jquery.ui.min.js"></script>
<script src="/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/ajaxtabs/ajaxtabs.js"></script>
<script src="/assets/global/plugins/j-folder/js/jquery.validate.min.js"></script>
<script src="/assets/global/plugins/j-folder/js/jquery.form.min.js"></script>
<script src="/assets/global/plugins/j-folder/js/j-forms.js"></script>
<script src="/assets/global/plugins/j-folder/js/jquery.ui.min.js"></script>
<script src="/assets/global/plugins/j-folder/js/jquery.ui.timepicker.min.js"></script>
<script src="/assets/global/plugins/j-folder/js/jquery.ui.touch-punch.min.js"></script>
<script src="/assets/global/plugins/j-folder/js/jquery.spectrum.min.js"></script>
<script src="/assets/global/plugins/chosen.jquery.js"></script>
<script src="{{asset('assets/global/plugins/jquery.blockUI.js')}}"></script>

<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
@yield('add_js_plugins')
<script src="/assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js" type="text/javascript"></script>
<script src="/assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<script src="/assets/global/plugins/bootstrap-toastr/toastr.min.js"></script>
<script src="/assets/admin/pages/scripts/ui-toastr.js"></script>
<script src="/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="/assets/admin/pages/scripts/ui-alert-dialog-api.js"></script>
<script src="/assets/admin/pages/scripts/dropzone.js"></script>
<script type="text/javascript">

var taps=new ddajaxtabs("countrytabs", "ajaxBody")
taps.setpersist(true)
taps.setselectedClassTarget("link") //"link" or "linkparent"
taps.init()
 $('.make-switch').on('switchChange.bootstrapSwitch', function (event, state) {
	newDay = $(this).attr("data-day");
	
	currVal = $("#days").val();
	
	if(state == false){
		newVal = currVal+","+newDay;
	}else{
		toRemove = ","+newDay;
		newVal = currVal.replace(toRemove, '');
 	}
	$("#days").val(newVal);
    
	});
	
	// prepare the form when the DOM is ready 
$(document).ready(function() { 
    var options = { 
           // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
 
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
    $('#companyHoildays').ajaxForm(options); 
}); 
 
// pre-submit callback 
function showRequest(formData, jqForm, options) { 
    // formData is an array; here we use $.param to convert it to a string to display it 
    // but the form plugin does this for you automatically when it submits the data 
    var queryString = $.param(formData); 
 
    // jqForm is a jQuery object encapsulating the form element.  To access the 
    // DOM element for the form do this: 
    // var formElement = jqForm[0]; 
 
    //alert('About to submit: \n\n' + queryString); 
 
    // here we could return false to prevent the form from being submitted; 
    // returning anything other than false will allow the form submit to continue 
    return true; 
} 
 
// post-submit callback 
function showResponse(responseText, statusText, xhr, $form)  { 
    // for normal html responses, the first argument to the success callback 
    // is the XMLHttpRequest object's responseText property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'xml' then the first argument to the success callback 
    // is the XMLHttpRequest object's responseXML property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'json' then the first argument to the success callback 
    // is the json data object returned by the server 
 
    msg = "Successfully Saved"	;
	title = "Congratulations";
	theme ="success";
	var $toast = toastr[theme](title, msg); 
} 


</script>

@yield('add_js_scripts')
<script>
  jQuery(document).ready(function() {    
    Metronic.init(); // init metronic core components
	Layout.init(); // init current layout
	QuickSidebar.init(); // init quick sidebar
	Demo.init(); // init demo features
	UIToastr.init();
	  
	@yield('add_inits')
  });
</script>
