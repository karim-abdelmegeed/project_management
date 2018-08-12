<?php
$i = '';
$j = '';
?>
@extends('admin.master')
@section('plugins_css')
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css?v=20180322">

    <link href="{{asset('./dhtmlxgantt.css')}}" rel="stylesheet">
    <style type="text/css">
        .gantt_container, .gantt_cal_light, .gantt_message_area, .gantt_modal_box, .gantt_cal_quick_info, .gantt_tooltip{
            height: 300px;
        }
        .gantt-error {
            display: none;
        }
        .gantt-fullscreen {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 30px;
            height: 30px;
            padding: 2px;
            font-size: 32px;
            background: transparent;
            cursor: pointer;
            opacity: 0.5;
            text-align: center;
            -webkit-transition: background-color 0.5s, opacity 0.5s;
            transition: background-color 0.5s, opacity 0.5s;
        }

        .gantt-fullscreen:hover {
            background: rgba(150, 150, 150, 0.5);
            opacity: 1;
        }
        html, body{
            height:100%;
            padding:0px;
            margin:0px;
            overflow: hidden;
        }

        .fa {
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            opacity: 0.2;
            padding: 5px;
        }

        .fa:hover {
            opacity: 1;
        }

        .fa-eye {
            color: #ffa011;
        }

        .fa-plus {
            color: #328EA0;
        }

        .fa-times {
            color: red;
        }
        .gantt_cal_light{
            z-index: 100000;
        }
        .status_line {
            background-color: #0ca30a;
        }

        .today_marker{
            height: 100%;
            width: 2px;
            top:0;
            position: absolute;
            background-color: rgba(255, 0, 0, 0.4);
        }

        .weekend{
            background: #fbffe9;
        }
        .gantt_task_scale .gantt_scale_line:nth-child(2) .gantt_scale_cell:nth-child(7n+2),
        .gantt_task_scale .gantt_scale_line:nth-child(2) .gantt_scale_cell:nth-child(7n+3){
            background: #fbffe9;
        }
    </style>

@endsection
@section('plugins_js')
    <script src="{{asset('./dhtmlxgantt.js')}}"></script>
    <script src="{{asset('dhtmlxgantt_smart_rendering.js?v=20180322')}}"></script>
    <script src="{{asset('./dhtmlxgantt_auto_scheduling.js')}}"></script>
    <script src="{{asset('./dhtmlxgantt_fullscreen.js')}}"></script>
    <script src="{{asset('./dhtmlxgantt_marker.js?v=20180322')}}"></script>

@endsection

@section('page_js')
    <script>
        $(document).on('ready',function () {
            $("body").addClass('m-brand--minimize m-aside-left--minimize');

        });

    </script>

    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/ajaxForms.js')}}"></script>
@endsection


@section('add_inits')

@stop


@section('page_title_small')

@stop

@section('content')
    @include($partialView)
@stop