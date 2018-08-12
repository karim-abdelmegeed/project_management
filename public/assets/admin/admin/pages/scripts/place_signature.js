// codeblock increase_image      
$(document).on('click','.increase_image',function(){
var width = $(this).closest('.signature').css('width');
var increase_width = parseInt(width) + 10;
var increase_height = increase_width / 3;
$(this).closest('.signature').css('width',increase_width);
$(this).closest('.signature').css('height',increase_height);
$(this).closest('.signature').find('input[name^=image_width]').val(increase_width);
$(this).closest('.signature').find('input[name^=image_height]').val(increase_height);

});
// codeblock decrease_image       
$(document).on('click','.decrease_image',function(){
var width = $(this).closest('.signature').css('width');
var decrease_width = parseInt(width) - 10;
var decrease_height = decrease_width / 3;
$(this).closest('.signature').css('width',decrease_width);
$(this).closest('.signature').css('height',decrease_height);
$(this).closest('.signature').find('input[name^=image_width]').val(decrease_width);
$(this).closest('.signature').find('input[name^=image_height]').val(decrease_height);
});
// codeblock increase_font       
$(document).on('click','.increase_font',function(){
  var font = $(this).parent().find('.field').css('font-size');
  var increase_font = parseInt(font) + 2;
  $(this).parent().find('.field').css('font-size',increase_font);
  $(this).parent().find('input[name^=font_size]').val(increase_font);
  console.log(increase_font);
});
// codeblock decrease_font       
$(document).on('click','.decrease_font',function(){
  var font = $(this).parent().find('.field').css('font-size');
  var decrease_font = parseInt(font) - 2;
  $(this).parent().find('.field').css('font-size',decrease_font);
  $(this).parent().find('input[name^=font_size]').val(decrease_font);
  console.log(decrease_font);
});
// codeblock increase_width       
$(document).on('click','.increase_width',function(){
var width = $(this).closest('.signature').css('width');
var increase_width = parseInt(width) + 10;
$(this).closest('.signature').css('width',increase_width);
$(this).closest('.signature').find('input[name^=image_width]').val(increase_width);
});
// codeblock decrease_width        
$(document).on('click','.decrease_width',function(){
var width = $(this).closest('.signature').css('width');
var decrease_width = parseInt(width) - 10;
$(this).closest('.signature').css('width',decrease_width);
$(this).closest('.signature').find('input[name^=image_width]').val(decrease_width);
});
$(document).on('ready pjax:success' , function () {
  // codeblock add_signature        
$(document).on('click','#add_signature',function(){
  var clone = $('#hidden').find('.signature').clone();
  // console.log(clone);
  var target = $('.parent');
  // console.log(target);
     target.append(clone);
 })
// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM fully loaded and parsed");
//   });
// codeblock remove_signature      
$(document).on('click','.remove_signature',function(){
  $(this).parent().remove();
})
// codeblock add_field    
$(document).on('click','#add_field',function(){
   $('.fields').find('.dropdown-menu').slideToggle();
})

// codeblock drage_drop_field       
 interact('.signature')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    
    restrict: {
      restriction: "parent"
        ,
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');
      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
      
      var target = event.target,

      x = target.getAttribute('data-x');
      console.log(event.dx+" - "+x);
      y = target.getAttribute('data-y');
      target.querySelector(".left").value =parseInt(target.querySelector(".left").value) + parseInt(event.dx);
      target.querySelector(".top").value = parseInt(target.querySelector(".top").value) + parseInt(event.dy);

    }
  }); 


  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
   // enable draggables to be dropped into this
//    $(document).on('click','#next_nda_page',function(){
//     var page_id = $(this).attr('page-id');
//     // console.log(page_id);
//     var contract_id = $(this).attr('contract-id');
//     var x = $(this).attr('x');
//     var left = [];
//     var top = [];
//      $('input[name^="left"]').each(function() {
//       left.push($(this).val());
// });
//      $('input[name^="top"]').each(function() {
//       top.push($(this).val());
// });
//      // console.log(page_id);
//     var formData = new FormData();
//     formData.append('page_id', page_id);
//     formData.append('left', left);
//     formData.append('top', top);
//     formData.append('contract_id', contract_id);
//     formData.append('x', x);
// //     for (var [key, value] of formData.entries()) { 
// //   console.log(key, value);
// // }
//       $.ajax({
//         url: '/signature/signature_coordinates',
//         method: "post",
//         data: formData,
//         contentType: false,
//         processData: false,
//         success: function (data) {
          
//         },
//         error:function (data) {
//             toastr['error']('Something went wrong', "Sorry");

//         },
//     });
//  });
 })
 