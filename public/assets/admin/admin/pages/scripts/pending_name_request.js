$(document).on('ready pjax:success', function () {
    $("select.select2").select2();

    $("select[name=pending_name_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=pending_name_user_name]").val();
        if (values === null) {
            pending_name_request_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                pending_name_request_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                pending_name_request_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    }); $("select[name=pending_name_role_name]").change(function () {
        array_push = [];
        var values = $("select[name=pending_name_role_name]").val();
        if (values === null) {
            pending_name_request_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                pending_name_request_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                pending_name_request_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var pending_name_request_table = $('#pending_name_request-236').DataTable({
            'scrollX': true,
            "initComplete": function (settings, json) {
                $('#pending_name_request-236').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');


            },

            //export-buttons
            dom: 'Bfrtip',
            buttons: [{extend: 'pdf', exportOptions: {columns: [0,1,2]}}, {
                extend: 'excel',
                exportOptions: {columns: [0,1,2]}
            }, 'colvis'],
            "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [3, 4]},
            {"orderable": false, "targets": [3, 4]}
        ]


    });
    pending_name_request_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        pending_name_request_table.draw();
    });
    $(".filter").change(function () {
        pending_name_request_table.search('');
        $(this).each(function () {
            pending_name_request_table.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });
    var ID;
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
            pending_name_request_table.draw();
        }
    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {

            var slider_values = [];
            var date_ranges_search = [];
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
                        'column_index': $(this).next().next().data('column-index')
                    })
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
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseInt(data[$element['column_index']]) <= $element['end_range'] ) ||
                    ( parseInt($element['start_range']) <= data[$element['column_index']] && ($element['end_range']) === "" ) ||
                    ( parseInt($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseInt($element['end_range'])
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
        swal({
            title: "Are you sure?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'delete',
                success: function () {
                    swal("Deleted!", 'Successfully deleted', "success");
                    pending_name_request_table.row($row).remove()
                        .draw();
                    html2canvas($("#pending_name_request-236"), {
                        onrendered: function (canvas) {
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
