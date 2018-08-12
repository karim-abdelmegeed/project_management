$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();
    





    $.get('/neon21/user_name_data',function(response){
        response.forEach(function(element){
            $('select[name=user_name_398]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    $("select[name=user_name_398]").change(function () {
        array_push=[];
       var values= $("select[name=user_name_398]").val();
       if(values===null){
           contacts_398.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
       }
       else{
           values.forEach(function(element){
               array_push.push('(?=.*' +element + ')');
           });
          $(this).each(function () {
          contacts_398.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
          contacts_398.column($(this).data('column-index')).search(array_push.join('|')).draw();
           });
       }
    });
    $(document).on("click", ".multiple_delete", function () {

        if ($(".group-checkable").is(":checked")) {
            var deleted_items = [];
            $("input[name^=items]").each(function () {
                deleted_items.push($(this).val())
            });

            $.post("/neon21/deleteCells", {"item": deleted_items}, function (response) {
                toastr.success(response.delete)
            });
            contacts_398.clear().draw()
        }
        else {
            $("input[name^=items]").each(function () {
                if ($(this).is(":checked")) {
                    $item = $(this);
                    $.post("/neon21/deleteCells", {"item": $(this).val()}, function (response) {
                        contacts_398.rows($item.closest('tr')).remove().draw();
                        toastr.success(response.delete)
                    });
                }
            });
        }
    });
    var contacts_398 = $('#contacts-398').DataTable({

     "initComplete": function (settings, json) {
            $('#contacts-398').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search...");
            $('#contacts-398').closest('.m-portlet').find(".dataTables_filter").find('input')
                .after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');

        },

     //export-buttons
         "ordering": true,


        "columnDefs": [
            {"searchable": false, "targets": []}
        ]

    });
        contacts_398.columns().search( '' ).draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#contacts-398search-form', function () {
        contacts_398.draw();
    });
    $(".filter").change(function () {
        contacts_398.search('');
        $(this).each(function () {
            contacts_398.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });
          var ID;

    var allowFilter = ['contacts-398']; //useful for multiple tables in view
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
            contacts_398.row($row).remove().draw();
            html2canvas($("#contacts-398"), {
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
