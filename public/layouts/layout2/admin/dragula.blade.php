@extends('admin.master')

@section('add_css')
<link rel="stylesheet" href="/assets/global/plugins/dragula/dragula.min.css">
@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/dragula/dragula.min.js"></script>
@stop

@section('add_js_scripts')
<script>
    var MyDragula = function () {
        return {
            init: function () {
                dragula([document.getElementById('box1'), document.getElementById('box2')])
                        .on('drop', function (el) {
                            $form = $('#boxes-vals');
                            $el = $(el);
                            id = $el.children().first().attr('id');
                            boxId = $el.parent().attr('id');
                            $form.append('<input name="' + boxId + '[]" type="hidden" value="' + id + '">');
                        });
            }
        }
    }();
</script>
@stop

@section('add_inits')
MyDragula.init();
@stop

@section('title')
Drag and Drop
@stop

@section('page_title')
Drag and Drop
@stop

@section('page_title_small')
Dragula
@stop

@section('content')
<div class="portlet blue box">
    <div class="portlet-title">
        <div class="caption">
            BOX 1
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
    <div class="portlet-body" id="box1">
        <div>
            <button class="btn blue btn-block" id="one">ONE</button>
        </div>
        <div>
            <button class="btn blue btn-block" id="two">TWO</button>
        </div>
        <div>
            <button class="btn blue btn-block" id="three">THREE</button>
        </div>
    </div>
</div>

<div class="portlet red box">
    <div class="portlet-title">
        <div class="caption">
            BOX 2
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
    <div class="portlet-body" id="box2">
        <div>
            <button class="btn red btn-block" id="four">FOUR</button>
        </div>
        <div>
            <button class="btn red btn-block" id="five">FIVE</button>
        </div>
        <div>
            <button class="btn red btn-block" id="six">SIX</button>
        </div>
    </div>
</div>

<form action="/admin/dragula" method="POST" id="boxes-vals">
    {!! csrf_field() !!}
    <button type="submit" class="btn btn-success">Save</button>
</form>


@stop
