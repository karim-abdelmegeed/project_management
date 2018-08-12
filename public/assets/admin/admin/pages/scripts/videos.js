$(document).on('ready pjax:success' , function () {
  $("select.select2").select2();
    // codeblock choice_btn      
  $(document).on('click', '.choice_btn', function () {
    // alert(2345)
    var url = $(this).data('action');
    $.get(url, function (response) {
      $question_element = $(".multi_question_hidden:first").clone();
      $question_element.removeClass('multi_question_hidden');
      $question_element.find('input[type=text]').val("");
      $question_element.find('input[type=text]').each(function () {
        $(this).attr('data-name', 'field').attr('data-validation', 'required');
      });
      $question_element.find("input[type=checkbox]").attr('checked', false);
      $question_element.find(".add_new_answer").addClass('hidden');
      $question_element.find('input[name^=multi_question_id]').val(response.id);
      $question_element.find("input[name^=question_type]").val("choices");
      $question_element.find('.uploader').attr('id', 'questions_' + response.id);
      $question_element.find('.uploader').css({'height': '100%', 'width': '100%'});

      $("ol.questions").append($question_element).find('.delete_Question').attr('data-action', '/admin/questions/' + response.id + '/delete');
      runFineUploader('questions_' + response.id, 500000000000000, 0, 0, false, 'Question', 'file_id', response.id);
    });

  });

    $.get('/search/service_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=service_search]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    $("select[name^=service_search].element").change(function () {
        array_push=[];
        var values= $("select[name^=service_search].element").val();
        if(values===null){
            table_video.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table_video.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table_video.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $.get('/search/language_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=language_search]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });
        $('.srch_form').find('select[name^=language_search]')
            .append($("<option></option>")
                .attr("value",'All Languages')
                .text('All Languages'));
    });
    $("select[name^=language_search].element").change(function () {
        array_push=[];
        var values= $("select[name^=language_search].element").val();
        if(values===null){
            table_video.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table_video.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table_video.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });

    var table_video = $('#videos-240').DataTable({
        "columnDefs": [
            {"searchable": false, "targets": [3, 4]},
            {"orderable": false, "targets": [2,3, 4]}
        ],
        "initComplete": function (settings, json) {
            $('#videos-240').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;');
        },
        'scrollX': true,
        dom: 'Bfrtip',
        bFilter: true,
        buttons: [
            {extend: 'pdf',
                exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
            }, 'colvis'
        ],


        //export-buttons

        "ordering": true


    });
    $("input.form-control.input-sm.input-small.input-inline").css({'display':'none'});
    table_video.columns().search( '' ).draw();
  var column_index = $("#amount").data('column-index');
  var start_range = $("input[name=start_range]").val();
  var end_range = $("input[name=end_range]").val();


  $(document).on('click', '#search-form-video', function () {
    table_video.draw();
  });
  $(".videos_filter").change(function () {
    table_video.search('');
    $(this).each(function () {console.log($(this).data('column-index'))
      table_video.column($(this).data('column-index')).search($(this).val()).draw();
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
               table_video.draw();
             }
           });
  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {

      var slider_values=[];
      var date_ranges_search = [];
      $(".date_ranges_search ").each(function () {
        if ($(this).attr('class').includes('start_date')) {
          console.log($(this).next('.end_date').val());
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
        return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
        ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
        ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
        ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
          )
      }
      function check_correct($element) {
        return (( $element['end_range'])=== "" && ($element['start_range'])=== "" ) ||
        ($element['start_range']==="" && parseInt(data[$element['column_index']]) <= $element['end_range'] ) ||
        ( parseInt($element['start_range'])<= data[$element['column_index']] && ($element['end_range'])==="" ) ||
        ( parseInt($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseInt($element['end_range'])
         )
      }
      return slider_values.every(check_correct)  && date_ranges_search.every(check_correct_dates);


    }
    );

//js-fn
// codeblock select_language    
selectValue();
var previously;
$(document).on('select2:selecting', '.language', function (evt) {
  previously = $(this).val();
});
$(document).on('select2:select', '.language', function (evt) {
  var now = $(this).val();
  var parent = $(this).parent();
  var count = $('.Language').length;
  if(now == 'all'){
    $('#add_language').addClass('hidden');
    $('.locale').addClass('hidden');
    if(count > 2){
     $('form').find('.Language').not(parent).each(function(){
       $(this).remove();
     });
   }
 }
 else{
  $('#add_language').removeClass('hidden');
  console.log(count);
  if(count == 2){
    $('.locale').removeClass('hidden'); 
    $('select.select2').select2(); 
  }
}
$('.language option[value="' + now + '"]').not($(this).find('option[value="' + now + '"]')).attr("disabled", "disabled");
$('.language option[value="' + previously + '"]').removeAttr("disabled");
$('.language option[value=""]').removeAttr("disabled");
$('select.select2').select2();
});
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
            html2canvas($("#videos-240"), {
              onrendered: function (canvas) {
                console.log(canvas);
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
// codeblock add_extra_actions  
function addExtraActions(data, $element,actionButton){
  $('.locale').attr('value','');
  $('.locale').addClass('hidden');
  var id = $('form').find('input[name^=Answer_id]:last').val()
  $('form').find('input[name^=correct]:last').attr('value',id);
  $('select[name=language]').attr('name','language[]');  
}
// codeblock remove_success    
function RemoveSuccess(){
  var count = $('.Language').length;
  if(count == 2){
    if($('form').find('.language').val() == 'all'){
      $('.locale').addClass('hidden');
    }
    else{
      $('.locale').removeClass('hidden');
    }
    $('select.select2').select2();
    $('select[name^=language]').attr('name','language'); 
  }
  $('.language option').removeAttr("disabled");
  selectValue();
}
  // codeblock select_value      
function selectValue() {
  var latest_value = $("option:selected", $('.language')).each(function () {
    console.log($(this))
    $id = ($(this).val());
    $('.language option[value="' + $id + '"]').not(this).attr("disabled", "disabled");
    $('.language option[value=""]').removeAttr("disabled");
    $('select.select2').select2();
  });
}
