<?php
$i = '';
$j = '';
?>
@extends('admin.master')
@section('plugins_css')
    <link href="{{asset('assets/global/plugins/cute-file-browser/assets/css/styles.css')}}" rel="stylesheet"/>
    <style type="text/css">
        .page-header.navbar.navbar-fixed-top , .page-footer,.page-logo,.dropdown .dropdown-user , .menu-toggler .responsive-toggler{
            display: none;
        }
    </style>
@endsection
@section('plugins_js')
    <script type="text/javascript" src="{{asset('assets/global/plugins/cute-file-browser/assets/js/script.js')}}"></script>

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