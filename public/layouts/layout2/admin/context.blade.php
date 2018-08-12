
@extends('admin.master')

@section('add_css')

@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/bootstrap-contextmenu/bootstrap-contextmenu.js"></script>
@stop

@section('add_js_scripts')
@stop

@section('add_inits')

@stop

@section('title')
Context
@stop

@section('page_title')
Context
@stop

@section('page_title_small')
@stop

@section('content')

<div class="portlet light bg-inverse">
    <div class="portlet-title">
        <div class="caption font-purple-plum">
            <i class="icon-speech font-purple-plum"></i>
            <span class="caption-subject bold uppercase"> Demo 1</span>
            <span class="caption-helper">right click inside the box</span>
        </div>
        <div class="actions">
            <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                <i class="icon-cloud-upload"></i>
            </a>
            <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                <i class="icon-wrench"></i>
            </a>
            <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                <i class="icon-trash"></i>
            </a>
            <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
            </a>
        </div>
    </div>
    <div class="portlet-body">
        <div id="context" data-toggle="context" data-target="#context-menu">
            <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit.
            </p>
        </div>
        <!-- Your custom menu with dropdown-menu as default styling -->
        <div id="context-menu">
            <ul class="dropdown-menu" role="menu">
                <li>
                    <a href="javascript:;">
                        <i class="icon-user"></i> New User </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="icon-present"></i> New Event <span class="badge badge-success">4</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="icon-basket"></i> New order </a>
                </li>
                <li class="divider">
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="icon-flag"></i> Pending Orders <span class="badge badge-danger">4</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="icon-users"></i> Pending Users <span class="badge badge-warning">12</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

@stop