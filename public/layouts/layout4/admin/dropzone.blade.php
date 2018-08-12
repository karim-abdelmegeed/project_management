@extends('admin.master')


@section('add_css')
<link href="/assets/global/plugins/dropzone/css/dropzone.css" rel="stylesheet"/>
@stop

@section('add_js_plugins')
<script src="/assets/global/plugins/dropzone/dropzone.js"></script>

@stop

@section('add_js_scripts')
<script src="/assets/admin/pages/scripts/form-dropzone.js"></script>
<script>
    var FormDropzone = function () {


        return {
            //main function to initiate the module
            init: function () {

                Dropzone.options.myDropzone = {
                    parallelUploads: 3,
                    uploadMultiple: false,
//                maxFiles: 2,
                    init: function () {
                        var myDropzone = this;
                        $('#upload').click(function (e) {
                            e.preventDefault();
                            myDropzone.processQueue();
                        });
                        this.on("addedfile", function (file) {
                            // Create the remove button
                            var removeButton = Dropzone.createElement("<button class='btn btn-sm btn-block'>Remove file</button>");

                            // Capture the Dropzone instance as closure.
                            var _this = this;

                            // Listen to the click event
                            removeButton.addEventListener("click", function (e) {
                                // Make sure the button click doesn't submit the form:
                                e.preventDefault();
                                e.stopPropagation();

                                // Remove the file preview.
                                _this.removeFile(file);
                                // If you want to the delete the file on the server as well,
                                // you can do the AJAX request here.
                            });

                            // Add the button to the file preview element.
                            file.previewElement.appendChild(removeButton);
                        });
                    },
//                autoProcessQueue: false,
//                previewsContainer: '#previewsContainer'
                }
            }
        };
    }();
</script>
@stop

@section('add_inits')
FormDropzone.init();
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

<form action="/admin/dropzone" class="dropzone" id="my-dropzone">
    {!! csrf_field() !!}
<!--    <input type="text" placeholder="Example input.." class="form-control"> -->

</form>
<button class="btn btn-primary" id="upload">Upload</button>
<div id="previewsContainer" class="dropzone-previews"></div>
@stop