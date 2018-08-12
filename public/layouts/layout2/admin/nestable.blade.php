@extends('admin.master')

@section('add_css')
<link rel="stylesheet" type="text/css" href="/assets/global/plugins/jquery-nestable/jquery.nestable.css"/>

@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/jquery-nestable/jquery.nestable.js"></script>

@stop

@section('add_js_scripts')
<script>
    var MyNestable = function () {
        return {
            init: function () {
                $('.dd').nestable();
            }
        }
    }();
</script>
@stop

@section('add_inits')
MyNestable.init();
@stop

@section('title')
Nestable
@stop

@section('page_title')
Nestable
@stop

@section('page_title_small')
@stop

@section('content')
<div class="row">
    <div class="col-md-6">
        <div class="portlet box blue">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-comments"></i>Nestable List 1
                </div>
                <div class="tools">
                    <a href="javascript:;" class="collapse">
                    </a>
                    <a href="#portlet-config" data-toggle="modal" class="config">
                    </a>
                    <a href="javascript:;" class="reload">
                    </a>
                    <a href="javascript:;" class="remove">
                    </a>
                </div>
            </div>
            <div class="portlet-body ">
                <div class="dd" id="nestable_list_1">
                    <ol class="dd-list">
                        <li class="dd-item" data-id="1">
                            <div class="dd-handle">
                                Item 1
                            </div>
                        </li>
                        <li class="dd-item" data-id="2">
                            <div class="dd-handle">
                                Item 2
                            </div>
                            <ol class="dd-list">
                                <li class="dd-item" data-id="3">
                                    <div class="dd-handle">
                                        Item 3
                                    </div>
                                </li>
                                <li class="dd-item" data-id="4">
                                    <div class="dd-handle">
                                        Item 4
                                    </div>
                                </li>
                                <li class="dd-item" data-id="5">
                                    <div class="dd-handle">
                                        Item 5
                                    </div>
                                    <ol class="dd-list">
                                        <li class="dd-item" data-id="6">
                                            <div class="dd-handle">
                                                Item 6
                                            </div>
                                        </li>
                                        <li class="dd-item" data-id="7">
                                            <div class="dd-handle">
                                                Item 7
                                            </div>
                                        </li>
                                        <li class="dd-item" data-id="8">
                                            <div class="dd-handle">
                                                Item 8
                                            </div>
                                        </li>
                                    </ol>
                                </li>
                                <li class="dd-item" data-id="9">
                                    <div class="dd-handle">
                                        Item 9
                                    </div>
                                </li>
                                <li class="dd-item" data-id="10">
                                    <div class="dd-handle">
                                        Item 10
                                    </div>
                                </li>
                            </ol>
                        </li>
                        <li class="dd-item" data-id="11">
                            <div class="dd-handle">
                                Item 11
                            </div>
                        </li>
                        <li class="dd-item" data-id="12">
                            <div class="dd-handle">
                                Item 12
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="portlet box green">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-comments"></i>Nestable List 2
                </div>
                <div class="tools">
                    <a href="javascript:;" class="collapse">
                    </a>
                    <a href="#portlet-config" data-toggle="modal" class="config">
                    </a>
                    <a href="javascript:;" class="reload">
                    </a>
                    <a href="javascript:;" class="remove">
                    </a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="dd" id="nestable_list_2">
                    <ol class="dd-list">
                        <li class="dd-item" data-id="13">
                            <div class="dd-handle">
                                Item 13
                            </div>
                        </li>
                        <li class="dd-item" data-id="14">
                            <div class="dd-handle">
                                Item 14
                            </div>
                        </li>
                        <li class="dd-item" data-id="15">
                            <div class="dd-handle">
                                Item 15
                            </div>
                            <ol class="dd-list">
                                <li class="dd-item" data-id="16">
                                    <div class="dd-handle">
                                        Item 16
                                    </div>
                                </li>
                                <li class="dd-item" data-id="17">
                                    <div class="dd-handle">
                                        Item 17
                                    </div>
                                </li>
                                <li class="dd-item" data-id="18">
                                    <div class="dd-handle">
                                        Item 18
                                    </div>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
