$(document).on('ready pjax:success' , function () {
var image = document.getElementById('image');
var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = document.getElementById('image');
  var dataX = 0;
  var dataY = 0;
  var dataHeight = 200;
  var dataWidth = 200;
  var dataRotate = 0;
  var dataScaleX = 1;
  var dataScaleY = 1;
  var options = {
        aspectRatio: 3 / 1,
        preview: '.img-preview',
        // dragMode: 'move',
        crop: function (e) {
          var data = e.detail;

          console.log(e.type);
          dataX.value = Math.round(data.x);
          dataY.value = Math.round(data.y);
          dataHeight.value = Math.round(data.height);
          dataWidth.value = Math.round(data.width);
          dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
          dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
          dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function (e) {
          console.log(e.type, e.detail.ratio);
        }
      };
  var cropper = new Cropper(image, options);
// codeblock crop_signature  
 $(document).on('click','#crop_image',function(){
  var id = $(this).attr('data-id');
  console.log(id);
  cropper.getCroppedCanvas();

cropper.getCroppedCanvas({
  width: 300,
  height: 122,
  minWidth: 256,
  minHeight: 20,
  maxWidth: 767,
  maxHeight: 32,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high',
});

 cropper.getCroppedCanvas().toBlob(function (blob) {
  var formData = new FormData();
  formData.append('croppedImage', blob);
  console.log(blob);
  console.log(formData);
//  for (var [key, value] of formData.entries()) { 
//   console.log(key, value);
// }
  // Use `jQuery.ajax` method
  $.ajax('/signature/upload_cropped_signature', {
    method: "post",
    data: formData,
    contentType: false,
    processData: false,
    success: function () {
      console.log('Upload success');
      
                
    },
    error: function () {
      console.log('Upload error');
    }
  }).done(function(respond){
    // console.log(respond.file_id);
    $img = "/uploads/" + respond.hash + "/cropped_signature.png";
        swal({
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: false,
                        title: "Is it Your Signature?",
                        text: "<img src=" + $img + ">",
                        html: true
                    }, function () {
                        $.ajax({
                            type: "POST",
                            url: "/signature/"+id+"/"+respond.file_id+"/upload_user_signature",
                        }).done(function (respond) {
                         
                        swal({
                        confirmButtonText: "Okay",
                        closeOnConfirm: true,
                        title: "Your Signature is successfully saved",
                            
                        },function(){
                          window.location.href = '/signature/waiting_signature_approval';
                        }
                        )
                            
                        });

                    });
  })
});
 })
})
