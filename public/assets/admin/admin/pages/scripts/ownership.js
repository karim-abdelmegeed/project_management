$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();
  // codeblock select_owner      
    $(document).on('change','select[name=owner]', function () {
        $owner_id = $(this).val();
        if($owner_id == ''){
            $('.qualified_owner').addClass('hidden');
            $('.primary_owner').addClass('hidden');
            $('.secondary_owner').addClass('hidden');
        }else{
            appBlockUI();
            $('.primary_owner p').html('');
            $('.secondary_owner p').html('');
            $.ajax({
                url: "/ownership/projects",
                method: 'get',
                data:{
                    owner_id: $owner_id
                }
                ,
                success: function (response) {
                    console.log(response);
                    if (response.status == 'error') {
                        var $toast = toastr["error"](response.msg, "Sorry");
                    } else {
                        $.each(response.primary_in_projects, function (index, el) {

                            $('.primary_owner').append('<p> '+el['name']+'</p>');
                        });
                        $.each(response.secondary_in_projects, function (index, el) {

                            $('.secondary_owner').append('<p> '+el['name']+'</p>');
                        });
                        $('.primary_owner').removeClass('hidden');
                        $('.secondary_owner').removeClass('hidden');
                        // addTableRows(response.suppliers);

                    }
                },
                complete: function () {
                    appUnBlockUI();
                }
            });
            $("[name=qualified_owner]").children("option").show();
            $("[name=qualified_owner]").children("option[value^=" + $owner_id + "]").hide()

            $('.qualified_owner').removeClass('hidden')
        }



    });
    var table = $('#project_owner-238').DataTable({'scrollX':true,

     //export-buttons

    "ordering": true},

    {
        "columnDefs": [
            {"searchable": false, "targets": []}
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
            html2canvas($("#project_owner-238"), {
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
