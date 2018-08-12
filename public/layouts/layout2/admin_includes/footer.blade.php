<div class="page-footer">
	<div class="page-footer-inner">
		 2016 &copy; SMART Project management by. <a href="http://cloudwrld.com" title="Cloud World Official Website" target="_blank">Cloud World</a>
	</div>
	<div class="scroll-to-top">
		<i class="icon-arrow-up"></i>
	</div>
</div>

<script type="text/javascript">
$(document).on('click', '.pilot_ready', function (e) {
    e.preventDefault();
    
    var action = $(this).attr('href');
    swal({title: "Are you sure you are ready for the pilot test ?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes", closeOnConfirm: false}, function () {
        $.ajax({
            url: action,
            method: 'get',
            success: function () {
                swal("OK!", 'We will contact you soon', "success");
				$('.pilot_readyx').remove();
                
                
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });
});
</script>