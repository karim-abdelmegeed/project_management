@extends('admin.master')

@section('add_css')
<link href="/assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css" rel="stylesheet" type="text/css"/>
<link href="/assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css" rel="stylesheet" type="text/css"/>
@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js" type="text/javascript"></script>
<script src="/assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js" type="text/javascript"></script>
@stop

@section('add_js_scripts')
<script>
    var MyModal = function () {
        return {
            init: function () {
                $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
                        '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
                        '<div class="progress progress-striped active">' +
                        '<div class="progress-bar" style="width: 100%;"></div>' +
                        '</div>' +
                        '</div>';

                $.fn.modalmanager.defaults.resize = true;
                $modal = $('#static').modal();
                $modal.find('.continue').click(function () {
                    $modal.modal('hide');
                    alert('Task Continued');
                });

            }
        }
    }();
</script>
@stop

@section('add_inits')
MyModal.init();
@stop

@section('title')
Modals
@stop

@section('page_title')
Modals
@stop

@section('page_title_small')

@stop

@section('content')

<div id="static" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
    <div class="modal-body">
        <p>
            Would you like to continue with some arbitrary task?
        </p>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="btn btn-default">Cancel</button>
        <button type="button"  class="btn blue continue">Continue Task</button>
    </div>
</div>

@stop
