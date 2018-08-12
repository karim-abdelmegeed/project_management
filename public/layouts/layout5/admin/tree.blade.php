@extends('admin.master')

@section('add_css')
<link rel="stylesheet" type="text/css" href="/assets/global/plugins/jstree/dist/themes/default/style.min.css"/>

@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/jstree/dist/jstree.min.js"></script>
@stop

@section('add_js_scripts')
<script>
    var MyTree = function () {
        return {
            init: function () {
                $("#tree").jstree({
                    "core": {
                        "themes": {
                            "responsive": false
                        },
                        // so that create works
                        "check_callback": true,
                        'data': [{
                                "text": "Parent Node",
                                "children": [{
                                        "text": "Initially selected",
                                        "state": {
                                            "selected": true
                                        }
                                    }, {
                                        "text": "Custom Icon",
                                        "icon": "fa fa-warning icon-state-danger"
                                    }, {
                                        "text": "Initially open",
                                        "icon": "fa fa-folder icon-state-success",
                                        "state": {
                                            "opened": true
                                        },
                                        "children": [
                                            {"text": "Another node", "icon": "fa fa-file icon-state-warning"}
                                        ]
                                    }, {
                                        "text": "Another Custom Icon",
                                        "icon": "fa fa-warning icon-state-warning"
                                    }, {
                                        "text": "Disabled Node",
                                        "icon": "fa fa-check icon-state-success",
                                        "state": {
                                            "disabled": true
                                        }
                                    }, {
                                        "text": "Sub Nodes",
                                        "icon": "fa fa-folder icon-state-danger",
                                        "children": [
                                            {"text": "Item 1", "icon": "fa fa-file icon-state-warning"},
                                            {"text": "Item 2", "icon": "fa fa-file icon-state-success"},
                                            {"text": "Item 3", "icon": "fa fa-file icon-state-default"},
                                            {"text": "Item 4", "icon": "fa fa-file icon-state-danger"},
                                            {"text": "Item 5", "icon": "fa fa-file icon-state-info"}
                                        ]
                                    }]
                            },
                            "Another Node"
                        ]
                    },
                    "types": {
                        "default": {
                            "icon": "fa fa-folder icon-state-warning icon-lg"
                        },
                        "file": {
                            "icon": "fa fa-file icon-state-warning icon-lg"
                        }
                    },
                    "state": {"key": "demo2"},
                    "plugins": ["contextmenu", "dnd", "state", "types"]
                });


            }
        }
    }();
</script>
@stop

@section('add_inits')
MyTree.init();
@stop

@section('title')
Tree
@stop

@section('page_title')
Tree
@stop

@section('page_title_small')

@stop

@section('content')

<div class="portlet yellow-lemon box">
    <div class="portlet-title">
        <div class="caption">
            <i class="fa fa-cogs"></i>Contextual Menu with Drag & Drop
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
        <div id="tree" class="tree-demo">
        </div>
        <div class="alert alert-success no-margin margin-top-10">
            Note! Opened and selected nodes will be saved in the user's browser, so when returning to the same tree the previous state will be restored.
        </div>
    </div>
</div>


@stop


