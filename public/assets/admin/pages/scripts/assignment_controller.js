$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();
    






    var assignment_357 = $('#assignment-357').DataTable({
     "initComplete": function (settings, json) {
            $('#assignment-357').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search...");
            //--@Advanced-search@--
        },

     //export-buttons
        "ordering": false,

        "columnDefs": [
            {"searchable": false, "targets": []}, {
                targets: 'no-sorting',
                sortable: false,
                searchable: false,
                orderable: false
            },
            {
                targets: 'table-checkbox-col',
                width: 10
            }
        ]
    });
    assignment_357.columns().search( '' ).draw();
    if ($('.reorder').length) {
        var drake = dragula([$('#assignment-357 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }

    $(document).on('click', '#assignment-357search-form', function () {
        assignment_357.draw();
    });
    $(".filter").change(function () {
        assignment_357.search('');
        $(this).each(function () {
            assignment_357.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });

        $(".start_date ,.end_date").on('change',function(){
           assignment_357.draw()
        });
        var ID;


    var allowFilter = ['assignment-357']; //useful for multiple tables in view
    $.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
            if ( $.inArray( oSettings.nTable.getAttribute('id'), allowFilter ) == -1 )
            {
                return true
            }
            var date_ranges_search = [];
            var slider_values = [];

            $(".date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    date_ranges_search.push({
                        'start_date': $(this).val(),
                        'end_date': $(this).next().val(),
                        'column_index': $(this).data('column-index')
                    })
                }
            });

            $(".sliders_search ").each(function () {
                if ($(this).attr('class').includes('start_range')) {
                    slider_values.push({
                        'start_range': $(this).val(),
                        'end_range': $(this).next('.end_range').val(),
                        'column_index': $(this).data('column-index')
                    })
                }
            });

            function check_correct_dates($element) {
                return (( $element['start_date']) ===  ($element['end_date']) && aData[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (aData[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && aData[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }

            function check_correct($element) {
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseFloat(aData[$element['column_index']]) <= $element['end_range'] ) ||
                    ( parseFloat($element['start_range']) <= aData[$element['column_index']] && ($element['end_range']) === "" ) ||
                    ( parseFloat($element['start_range']) <= aData[$element['column_index']] && aData[$element['column_index']] <= parseFloat($element['end_range'])
                    )
            }

            return slider_values.every(check_correct) && date_ranges_search.every(check_correct_dates);

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
            html2canvas($("#assignment-357"), {
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
