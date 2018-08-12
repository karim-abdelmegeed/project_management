@extends('admin.master')
	<link rel="stylesheet" type="text/css" href="/assets/global/plugins/select2/select2.css"/>
	<link rel="stylesheet" type="text/css" href="/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>
@section('add_css')
	
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

			$(document).ready(function(){

			// Enabled button
			$('#check-enable-button').on('change', function() {
				if ( $('#check-enable-button').is(':checked') ) {
					$('#enable-button').attr('disabled', false).removeClass('disabled-view');
				} else {
					$('#enable-button').attr('disabled', true).addClass('disabled-view');
				};
			});

			});
			TableManaged.init();


		}
	</script>
@stop

@section('add_inits')
	
@stop

@section('title')
	Blank Page
@stop

@section('page_title')
	Blank Page
@stop

@section('page_title_small')
	Sub-title goes here
@stop

@section('content')

<div id="countrytabs" class="shadetabs" style="display:none;" >
    <li><a href="/admin/getBlanks" rel="countrycontainer"></a></li>
</div>

@stop