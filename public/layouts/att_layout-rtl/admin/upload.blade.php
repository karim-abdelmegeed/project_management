@extends('admin.master')


@section('add_css')
<link href="/assets/global/plugins/dropzone/css/dropzone.css" rel="stylesheet"/>
@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/dropzone/dropzone.js"></script>

@stop

@section('add_js_scripts')
<script>
    Dropzone.options.dropzone = {
        init: function () {
            var myDropzone = this;
            $('#submit').click(function (e) {
                e.preventDefault();
                myDropzone.processQueue();
            });
            this.on("addedfile", function (file) {
            });
        },
        url: "/admin/upload",
        autoProcessQueue: false,
        clickable: '#choose-file',
    }
</script>
@stop

@section('add_inits')

@stop

@section('title')
File Upload
@stop

@section('page_title')
File Upload
@stop

@section('page_title_small')
Dropzone
@stop

@section('content')
<span id="dropzone"></span>
<div id="actions" class="row">

    <div class="col-lg-5">
        <!-- The fileinput-button span is used to style the file input field as button -->
        <span class="btn btn-success" id="choose-file">
            <i class="glyphicon glyphicon-plus"></i>
            <span>Choose File</span>
        </span>
    </div>
    <div class="col-lg-7 hidden" id="file-preview">
        <div>
            <div>
                <span class="preview"><img data-dz-thumbnail /></span>
            </div>
            <div>
                <p class="name" data-dz-name></p>
                <strong class="error text-danger" data-dz-errormessage></strong>
            </div>
            <div>
                <p class="size" data-dz-size></p>
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                    <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                </div>
                <button data-dz-remove class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>

            </div>
        </div>
    </div>

</div>
<br>
<!-- HTML heavily inspired by http://blueimp.github.io/jQuery-File-Upload/ -->
<form class="form" action="/admin/upload" method="POST" id="form">
    {!! csrf_field()!!}
    <div class="form-group">
        <input type="text" class="form-control" name="email">
    </div> 
    <button type="submit" id="submit" class="btn btn-primary">Save</button>
</form>
@stop



