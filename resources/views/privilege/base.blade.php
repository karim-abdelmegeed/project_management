<?php
$i = '';
$j = '';
?>
@extends('admin.master')
@section('plugins_css')
    <style>
        input.form-control.input-sm.input-small.input-inline[type="search"]{
            display: none;
        }
    </style>
@endsection
@section('plugins_js')

@endsection

@section('page_js')

    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/privilege.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/ajaxForms.js')}}"></script>

@endsection


@section('add_inits')

@stop


@section('page_title_small')

@stop

@section('content')
    @include($partialView)
@stop