
<?php
$i = '';
$j = '';
?>
@extends('admin.master')
@section('plugins_css')
    <style type="text/css">
        .gantt-error {
            display: none;
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
    </style>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <script src="{{asset('./dhtmlxgantt.js')}}"></script>
    <link href="{{asset('./dhtmlxgantt.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('dhtmlxgantt_broadway.css?v=20180322')}}">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css?v=20180322">
    <script src="{{asset('dhtmlxgantt_smart_rendering.js?v=20180322')}}"></script>
    <script src="{{asset('dhtmlxgantt_fullscreen.js')}}"></script>
@endsection
@section('plugins_js')

@endsection

@section('page_js')
    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/ajaxForms.js')}}"></script>
@endsection


@section('add_inits')

@stop


@section('page_title_small')

@stop

@section('content')
    @include($partialView)
@stop