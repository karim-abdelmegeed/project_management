@extends('admin.master')

@section('add_css')
<link rel="stylesheet" href="/assets/global/plugins/bootstrap-star-rating/star-rating.min.css">
@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/bootstrap-star-rating/star-rating.min.js"></script>
@stop

@section('add_js_scripts')
@stop

@section('add_inits')

@stop

@section('title')
Review
@stop

@section('page_title')
Review
@stop

@section('page_title_small')

@stop

@section('content')
<div>
    <input id="rating-input" type="text" class="rating rating-loading" data-show-caption="false" data-show-clear="false" value="2" data-size="xs" title="">
</div>
@stop
