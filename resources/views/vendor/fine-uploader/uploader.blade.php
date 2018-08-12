<style>
    button.qq-btn.qq-upload-delete-selector.qq-upload-delete{
        display:none;
    }
</style>

<script>
<?php $min_width = 0;
$min_height = 0;
$scaling_max_size = 100000000000000000;
if(isset($minimum_width)){
	$min_width = $minimum_width;
	
	
}
if(isset($minimum_height)){
	$min_height = $minimum_height;
	
	
}
if(isset($minimum_width)){
	$min_width = $minimum_width;
	
	
}
if(isset($scale_max_size)){
	$scaling_max_size = $scale_max_size;
	
	
}
?>
    $(document).on('ready pjax:success', function () {

        runFineUploader("<?php echo $selector;?>", <?php echo $maximum_file_size;?> , <?php echo $youtube_videos;?> ,<?php echo $encrypt_files;?>  , <?php echo $multiple;?> , "<?php echo $model;?>", "<?php echo $field;?>",<?php echo $entity_id;?>,<?php echo $min_width;?>,<?php echo $min_height;?>,<?php echo $scaling_max_size;?>  );

    });

    function runFineUploader($selector, $maximum_file_size, $youtube_videos, $encrypt_files, $multiple, $model, $field, $entity_id,$min_width=0,$min_height =0,$scaling_max_size=10000000000000) {
        
//        alert($allowedExtensions);
        var errorHandler = function (id, fileName, reason) {
                return qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
            },
            validatingUploader;
        var uploaded_ids ='';

        validatingUploader = new qq.FineUploader({
            element: document.getElementById($selector),
            multiple: $multiple,
            request: {
                endpoint: "{{route('files.endpoint')}}",
                params: {
                    "_token": "{{ csrf_token() }}"
                }
            },
            deleteFile: {
                enabled: true,
                endpoint: "/files/endpoint",
                forceConfirm: true,
                params: {
                    "_token": "{{ csrf_token() }}"
                }
            },
            debug: false,
            validation: {
                allowedExtensions: <?php echo $allowedExtensions;?>,
                sizeLimit: $maximum_file_size,
                minSizeLimit: 0,
				image:{
					minWidth: $min_width,
					minHeight: $min_height
				}
            },
            text: {
                uploadButton: "Click Or Drop"
            },
            display: {
                fileSizeOnSubmit: true
            },

            chunking: {
                enabled: true,
                concurrent: {
                    enabled: false
                },
                success: {
                    endpoint: "{{route('files.endpoint')}}?done"
                }
            },
            resume: {
                enabled: true
            },
            retry: {
                enableAuto: true
            },
            scaling: {
                sendOriginal: false,
                sizes: [
                    {name: "original", maxSize: $scaling_max_size}

                ]
            },
            callbacks: {
                onError: errorHandler,
                onComplete: function (id, filename, responseJSON, xhr) {
                    var uuid = this.getUuid(id);

//                    uploaded_ids = '';
                    $.ajax({
                        url: "{{route('files.save_file')}}",
                        method: "post",
                        data: {
                            uuid: uuid,
                            name: filename,
                            youtube_videos: $youtube_videos,
                            encrypt_files: $encrypt_files,
                            multiple: $multiple,
                            model: $model,
                            field: $field,
                            entity_id: $entity_id
                        }
                        ,success: function (response) {
                            uploaded_ids = uploaded_ids.concat(','+ response);//add uploaded id
                        },
                        async: false
                    });
                    console.log(uuid);
                    if (typeof uploaderComplete !== "undefined") {
                        // safe to use the function
                        uploaderComplete($selector);
                    }
                }
                , onAllComplete: function() {
					appUnBlockUI();
					$("#"+$selector).find(".qq-upload-button").show();
                    if (typeof uploaderAllComplete !== "undefined") {
                        // safe to use the function
                        uploaderAllComplete(uploaded_ids);
                    }
                    uploaded_ids = '';
                },
				onSubmit: function(id,name) {
					appBlockUI();
					
					$("#"+$selector).find(".qq-upload-list li").hide();
                    $("#"+$selector).find(".qq-upload-button").hide();
                },
                 onDeleteComplete: function (id, isError) {
                    var uuid = this.getUuid(id);
                    if (typeof uploaderRemove !== "undefined") {
// safe to use the function
                        uploaderRemove($selector);
                    }
                }
            }
        });

    }

</script>