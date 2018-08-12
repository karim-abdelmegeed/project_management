$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();
    $(function () {
        $('#user_color').colorpicker(
            {format:'hexa'}
        );

    });

console.log("haw");




    // $.get('/user/company_name_data',function(response){
    //     response.forEach(function(element){
    //         $('select[name=company_name]')
    //             .append($("<option></option>")
    //                 .attr("value",element.name)
    //                 .text(element.name));
    //     });
    //
    // });
    $("select[name=company_name]").change(function () {
        array_push=[];
       var values= $("select[name=company_name]").val();
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
    $(document).on("click", ".multiple_delete", function () {

        if ($(".group-checkable").is(":checked")) {
            var deleted_items = [];
            $("input[name^=items]").each(function () {
                deleted_items.push($(this).val())
            });

            $.post("/user/deleteCells", {"item": deleted_items}, function (response) {
                toastr.success(response.delete)
            });
            table.clear().draw()
        }
        else {
            $("input[name^=items]").each(function () {
                if ($(this).is(":checked")) {
                    $item = $(this);
                    $.post("/user/deleteCells", {"item": $(this).val()}, function (response) {
                        table.rows($item.closest('tr')).remove().draw();
                        toastr.success(response.delete)
                    });
                }
            });
        }
    });
    var table = $('#users-11').DataTable({

     //export-buttons

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
                            console.log($element);
                            console.log($element['start_date'], $element['end_date'], data[$element['column_index']]);
                            return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
                                ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
                                ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
                                ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
                                )
                        }
                        function check_correct($element) {
                            console.log($element['start_range'],$element['end_range'],data[$element['column_index']]);
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
            html2canvas($("#users-11"), {
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
