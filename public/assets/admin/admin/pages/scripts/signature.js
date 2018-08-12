$(document).on('ready pjax:success' , function () {
    // clickButton();
    $("select.select2").select2();





    
    $.get('/signature/user_name_data',function(response){
      response.forEach(function(element){
        $('.srch_form').find('select[name=user_name]')
        .append($("<option></option>")
          .attr("value",element.name)
          .text(element.name));
      });

    });
//     $(window).load(function () {
//     $('#click_button').click();
// })

  //   function clickButton(){
  //   $('#click_button').click();
  //   console.log($('#click_button')[0]);
  //   console.log($('#click_button').attr('data-x'));
  // }
  $("select[name=user_name]").change(function () {
    array_push=[];
    var values= $("select[name=user_name]").val();
    if(values===null){
     table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
   }
   else{
     values.forEach(function(element){
       array_push.push('(?=.*' +element + ')');
     });
     $(this).each(function () {
      table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
      table.column($(this).data('column-index')).search(array_push.join('|')).draw();
    });
   }
 });

  $('.image_export').on('click', function() {

    var $this = $(this);
    $this.button('loading');
    html2canvas($("#signatures-203"), {
      onrendered: function(canvas) {
        var img=canvas.toDataURL("image/png");
        $("a.image").attr('href',img)
      }
    });
    setTimeout(function() {
      $this.button('reset');
      $('.image_export').addClass('hidden');
      $('.image_download').removeClass('hidden')
    }, 3000);
  });
  var table = $('#signatures-203').DataTable({'scrollX':true,

   dom: 'Bfrtip',
   buttons: [{extend:'pdf',exportOptions:{columns:[':not(:last-child)']}},{extend:'excel',exportOptions:{columns:[':not(:last-child)']}},'colvis'],

   "ordering": true},

   {
    "columnDefs": [
    {"searchable": false, "targets": [0,1,]}
    ]

  });
  table.columns().search( '' ).draw();
  var column_index = $("#amount").data('column-index');
  var start_range = $("input[name=start_range]").val();
  var end_range = $("input[name=end_range]").val();


  $(document).on('click', '#search-form', function () {
    table.draw();
  });
  $(".filter").change(function () {
    table.search('');
    $(this).each(function () {
      table.column($(this).data('column-index')).search($(this).val()).draw();
    });
  });
  var ID;
  $(".num_range").slider({
   range: true,
   min: 0,
   max: 1000,
   slide: function (event, ui) {
     ID= $(this).attr('id');
     $("."+ID+".amount").val(+ui.values[0] + "-" + ui.values[1]);
   },
   stop: function (event, ui) {
               // $id= $(this).attr('id');
               $("."+ID+".start_range").val(ui.values[0]);
               $("."+ID+".end_range").val(ui.values[1]);
               table.draw();
             }
           });
  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {

      var slider_values=[];
      var date_ranges_search = [];
      $(".date_ranges_search ").each(function () {
        if ($(this).attr('class').includes('start_date')) {
         // console.log($(this).next('.end_date').val());
          date_ranges_search.push({
            'start_date': $(this).val(),
            'end_date': $(this).next().val(),
            'column_index': $(this).data('column-index')
          })
        }
      });

      $(".sliders_search ").each(function () {
        if($(this).attr('class').includes('start_range')){
          slider_values.push({'start_range':$(this).val(),'end_range':$(this).next('.end_range').val(),'column_index':$(this).next().next().data('column-index')})
        }
      });
      function check_correct_dates($element) {
     //   console.log($element);
    //    console.log($element['start_date'], $element['end_date'], data[$element['column_index']]);
        return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
        ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
        ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
        ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
          )
      }
      function check_correct($element) {
    //    console.log($element['start_range'],$element['end_range'],data[$element['column_index']]);
        return (( $element['end_range'])=== "" && ($element['start_range'])=== "" ) ||
        ($element['start_range']==="" && parseInt(data[$element['column_index']]) <= $element['end_range'] ) ||
        ( parseInt($element['start_range'])<= data[$element['column_index']] && ($element['end_range'])==="" ) ||
        ( parseInt($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseInt($element['end_range'])
         )
      }
      return slider_values.every(check_correct)  && date_ranges_search.every(check_correct_dates);


    }
    );
  // codeblock convert_html_pages_to_pdf  
  $(document).on('click','.print',function(e){
    e.preventDefault();
    appBlockUI();
    
    setTimeout(function () {
      var x = 0 ;
    var count = $(this).attr('data-count');
    var contract = $(this).attr('data-contract');
    var userContract = $(this).attr('data-userContract');
   // $elements = $('.parent');
   var number_of_pages = $('.parent').length;
   //alert(number_of_pages);
   var j = 1;
   $('.parent').each(function(i, element){
    
    html2canvas(element, {
      onrendered: function(canvas) {

       var extra_canvas = document.createElement("canvas");
       extra_canvas.setAttribute('width',1000);
       extra_canvas.setAttribute('height',1415);
       var ctx = extra_canvas.getContext('2d');
       ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,1000,1415);
       var formData = new FormData();
    // formData.append('page', canvas.toDataURL("image/png"));
    // var imagedata = canvas.toDataURL('image/png');
    // var imgdata = imagedata.replace(/^data:image\/(png|jpg);base64,/, "");
    // formData.append('page', );

    var imgData = extra_canvas.toDataURL('image/png'); 
    formData.append('image', imgData);
    formData.append('x', i);
    formData.append('contract', contract);
    formData.append('user_contract', userContract);
//      for (var [key, value] of formData.entries()) { 
//   console.log(key, value);
// }
$.ajax({
  url: '/signature/next_page',
  method: 'post',
  data: formData,
  contentType: false,
  processData: false,
  async: false,
  success: function (data) {

               if(j ==number_of_pages)   {
                  $.ajax({
                url: '/signature/export_as_pdf',
                method: 'get',
                async: false,
                success: function(data){
                  if (typeof data.status !== "undefined") {
                    if(data.status == "error"){
                      appUnBlockUI();
                      swal({
                        type: data.status,
                        title: data.title,
                        text: data.msg
                      });
                      window.location.href = "/";
                      return false;
                    }

                      
                  }
                  var images = [];
                  var doc = new jsPDF("p","pt","a4",true);
                  
                  
                //  console.log(data);
                  
                    var i =1;
                    //var index =0;
                    data.forEach(function(image) {
                     
                      if(i>1){
                        doc.addPage();
                      }
                      doc.addImage('data:image/png;base64,'+image, 'png', 0, 0, 595, 842,undefined,'FAST');

                      i++;
                      //index++;
                    });
                    var data = new FormData();
                    var pdf = doc.output('blob');
                  //  console.log(pdf);
                      data.append('pdf', pdf);
                    
                    
                    $.ajax({
                      url: '/signature/save_pdf',
                      method: 'post',
                      data: data,
                      contentType: false,
                      processData: false,
                      success: function(data){
                        doc.save('Contract.pdf');
                        appUnBlockUI();
                        if(data.redirect == "yes"){
                          window.location.href = data.route;
                        }
                      }
                    });
                   
                  
                // console.log('1');
                


              }
            });
               }  
               j++; 
             }
           });
        // canvas is the final rendered <canvas> element
      },

    });
    x++;
  });
      
    }, 500);
    

               // window.location = '/signature/'+data.user_contract+'/export_as_pdf';
          
               
             
             })




//js-fn
// function download_files(files) {
//   function download_next(i) {
//     if (i >= files.length) {
//       return;
//     }
//     var a = document.createElement('a');
//     a.href = files[i].download;
//     a.target = '_parent';
//     // Use a.download if available, it prevents plugins from opening.
//     if ('download' in a) {
//       a.download = files[i].filename;
//     }
//     // Add a to the doc for click to work.
//     (document.body || document.documentElement).appendChild(a);
//     if (a.click) {
//       a.click(); // The click method is supported by most browsers.
//     } else {
//       $(a).click(); // Backup using jquery
//     }
//     // Delete the temporary link.
//     a.parentNode.removeChild(a);
//     // Download the next file with a small timeout. The timeout is necessary
//     // for IE, which will otherwise only download the first file.
//     setTimeout(function() {
//       download_next(i + 1);
//     }, 500);
//   }
//   // Initiate the first download.
//   download_next(0);
// }
// $(document).on('click','#download',function(e){
//    e.preventDefault();
//    var array = $(this).data('stuff').split(',');
//     download_files([{download: "uploads/00a9f777-7de4-444b-8e1c-15dc153b11d2/Hydrangeas (original).jpg"}
//      ]);
//   });
//     $(document).on('click','#download',function(e){
//        e.preventDefault();
//        var link = document.createElement('a');
//        link.setAttribute('download', null);
//        link.style.display = 'none';
//        document.body.appendChild(link);
//        var array = $(this).data('stuff').split(',');
//        $.each(array,function( index,value ) {
//       link.setAttribute('href',value);
//        // console.log(value);
//      });
// link.click();

//   document.body.removeChild(link);
//     });
    $(document).on('click', '.remove-stuff', function (e) {//Delete from list(rewrite the function in scripts.js)
      e.preventDefault();
      $row = $(this).closest('tr');
      var action = $(this).attr('href');
      swal({title: "Are you sure?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", closeOnConfirm: false}, function () {
        $.ajax({
          url: action,
          method: 'delete',
          success: function () {
            swal("Deleted!", 'Successfully deleted', "success");
            table.row($row).remove()
            .draw();
            html2canvas($("#signatures-203"), {
              onrendered: function (canvas) {
               // console.log(canvas);
                var img = canvas.toDataURL("image/png");
                $("a.image").attr('href', img)
              }
            });
          },
          error: function () {
           swal("Error", 'Something is wrong, Try again later', "error");
         }
       });

      });
    });
  });
