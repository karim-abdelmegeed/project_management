@extends('admin.master')

@section('add_css')
	<link rel="stylesheet" type="text/css" href="/assets/global/plugins/select2/select2.css"/>
	<link rel="stylesheet" type="text/css" href="/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>
@stop

@section('add_js_plugins')
	<script type="text/javascript" src="/assets/global/plugins/select2/select2.min.js"></script>
	<script type="text/javascript" src="/assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>

@stop

@section('add_js_scripts')
	<script src="/assets/admin/pages/scripts/table-managed.js"></script>
	<script type="text/javascript">
		taps.onajaxpageload=function(pageurl){

			$("#back-btn").show();
			$("#back-btn").attr("href","javascript: taps.loadajaxpage('/admin/getUsers');") ;
			$(document).ready(function(){

	// Enabled button
	$('#check-enable-button').on('change', function() {
		if ( $('#check-enable-button').is(':checked') ) {
			$('#enable-button').attr('disabled', false).removeClass('disabled-view');
		} else {
			$('#enable-button').attr('disabled', true).addClass('disabled-view');
		};
	});

	/***************************************/
	/* Form validation */
	/***************************************/
	$( '#j-forms' ).validate({

		/* @validation states + elements */
		errorClass: 'error-view',
		validClass: 'success-view',
		errorElement: 'span',
		onkeyup: false,
		onclick: false,

		/* @validation rules */
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			login: {
				required: true
			},
			password: {
				required: true,
				minlength: 6
			}
		},
		messages: {
			name: {
				required: 'Please enter your name'
			},
			email: {
				required: 'Please enter your email',
				email: 'Incorrect email format'
			},
			login: {
				required: 'Please enter your login'
			},
			password: {
				required: 'Please enter your password',
				minlength: 'At least 6 characters'
			}
		},
		// Add class 'error-view'
		highlight: function(element, errorClass, validClass) {
			$(element).closest('.input').removeClass(validClass).addClass(errorClass);
			if ( $(element).is(':checkbox') || $(element).is(':radio') ) {
				$(element).closest('.check').removeClass(validClass).addClass(errorClass);
			}
		},
		// Add class 'success-view'
		unhighlight: function(element, errorClass, validClass) {
			$(element).closest('.input').removeClass(errorClass).addClass(validClass);
			if ( $(element).is(':checkbox') || $(element).is(':radio') ) {
				$(element).closest('.check').removeClass(errorClass).addClass(validClass);
			}
		},
		// Error placement
		errorPlacement: function(error, element) {
			if ( $(element).is(':checkbox') || $(element).is(':radio') ) {
				$(element).closest('.check').append(error);
			} else {
				$(element).closest('.unit').append(error);
			}
		},
		// Submit the form
		submitHandler:function() {
			$( '#j-forms' ).ajaxSubmit({

				// Server response placement
				target:'#j-forms #response',
				
				// If error occurs
				error:function(xhr) {
					//$('#j-forms #response').html('An error occured: ' + xhr.status + ' - ' + xhr.statusText);
					msg = "There was an error"	;
						title = "Failed";	
						theme ="error";
					var $toast = toastr[theme](title, msg);
					$('#j-forms button[type="submit"]').attr('disabled', false).removeClass('processing');
				},

				// Before submiting the form
				beforeSubmit:function(){
					// Add class 'processing' to the submit button
					$('#j-forms button[type="submit"]').attr('disabled', true).addClass('processing');
				},

				// If success occurs
				success:function(xhr){
					//alert(xhr);
						msg = "Successfully Saved"	;
						title = "Congratulations";
						theme ="success";
					var $toast = toastr[theme](title, msg); // Wire up an event handler to a button in the toast, if it exists

					// Remove class 'processing'
					$('#j-forms button[type="submit"]').attr('disabled', false).removeClass('processing');

					// Remove classes 'error-view' and 'success-view'
					$('#j-forms .input').removeClass('success-view error-view');
					$('#j-forms .check').removeClass('success-view error-view');

					// If response from the server is a 'success-message'
					if ( $('#j-forms .success-message').length ) {

						// Reset form
						$('#j-forms').resetForm();

						// Make checkbox 'terms of use' unavailable
						$('#check-enable-button').attr('checked', false);
						$('#check-enable-button').attr('disabled', true);

						// Make 'submit' button unavailable while checkbox doesn't checked
						$('#enable-button').attr('disabled', true).addClass('disabled-view');

						setTimeout(function(){
							// Delete success message after 5 seconds
							$('#j-forms #response').removeClass('success-message').html('');

							// Make checkbox 'terms of use' available
							$('#check-enable-button').attr('disabled', false);
						}, 5000);
					}
				}
			});
		}
	});
	/***************************************/
	/* end form validation */
	/***************************************/
});
TableManaged.init();


		}
	</script>
@stop
@section('add_inits')
	
	
@stop
@section('title')
	Users
@stop

@section('page_title')
	Users
@stop

@section('page_title_small')
	
@stop

@section('content')

<div id="countrytabs" class="shadetabs" style="display:none;" >
    <li><a href="/admin/getUsers" rel="countrycontainer">All users</a></li>
</div>

@stop



