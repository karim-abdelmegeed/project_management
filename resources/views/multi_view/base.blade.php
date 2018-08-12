<?php
$i = '';
$j = '';
?>
@extends('admin.master')
@section('plugins_css')

@endsection
@section('plugins_js')

@endsection

@section('page_js')

    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/assignment2.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/admin/pages/scripts/assignment5.js')}}"></script>

    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/ajaxForms.js')}}"></script>

@endsection


@section('add_inits')

@stop


@section('page_title_small')

@stop

@section('content')
    @include($partialView)
@stop