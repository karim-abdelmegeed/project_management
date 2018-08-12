@extends('admin.master')

@section('add_css')
	<link rel="stylesheet" href="/assets/global/plugins/calendar/dhtmlxscheduler.css" type="text/css" title="no title" charset="utf-8">
	<style type="text/css" media="screen">
		html, body{
			margin:0;
			padding:0;
			height:100%;
			overflow:hidden;
		}

		.dhx_cal_event div.dhx_footer,
		.dhx_cal_event.past_event div.dhx_footer,
		.dhx_cal_event.event_english div.dhx_footer,
		.dhx_cal_event.event_Meeting div.dhx_footer,
		.dhx_cal_event.event_science div.dhx_footer{
			background-color: transparent !important;
		}
		.dhx_cal_event .dhx_body{
			-webkit-transition: opacity 0.1s;
			transition: opacity 0.1s;
			opacity: 0.7;
		}
		.dhx_cal_event .dhx_title{
			line-height: 12px;
		}
		.dhx_cal_event_line:hover,
		.dhx_cal_event:hover .dhx_body,
		.dhx_cal_event.selected .dhx_body,
		.dhx_cal_event.dhx_cal_select_menu .dhx_body{
			opacity: 1;
		}

		.dhx_cal_event.event_Meeting div, .dhx_cal_event_line.event_Meeting{
			background-color: orange !important;
			border-color: #a36800 !important;
		}
		.dhx_cal_event_clear.event_Meeting{
			color:orange !important;
		}

		.dhx_cal_event.event_science div, .dhx_cal_event_line.event_science{
			background-color: #36BD14 !important;
			border-color: #698490 !important;
		}
		.dhx_cal_event_clear.event_science{
			color:#36BD14 !important;
		}

		.dhx_cal_event.event_english div, .dhx_cal_event_line.event_english{
			background-color: #FC5BD5 !important;
			border-color: #839595 !important;
		}
		.dhx_cal_event_clear.event_english{
			color:#B82594 !important;
		}
		.col-md-12{
			height: 830px;
		}
	</style>
@stop

@section('add_js_plugins')
	<script src="/assets/global/plugins/calendar/dhtmlxscheduler.js" type="text/javascript" charset="utf-8"></script>
@stop

@section('add_js_scripts')
	<script src="/assets/admin/pages/scripts/calendarInit.js"></script>
@stop

@section('add_inits')
	CalendarInit.init();
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
@section('body_attributes')
	
@stop
@section('content')

	<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
		<div class="dhx_cal_navline">
			<div class="dhx_cal_prev_button">&nbsp;</div>
			<div class="dhx_cal_next_button">&nbsp;</div>
			<div class="dhx_cal_today_button"></div>
			<div class="dhx_cal_date"></div>
			<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
			<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
			<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
		</div>
		<div class="dhx_cal_header">
		</div>
		<div class="dhx_cal_data">
		</div>
	</div>

@stop