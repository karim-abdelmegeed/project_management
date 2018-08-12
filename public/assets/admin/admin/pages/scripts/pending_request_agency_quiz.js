$(document).on('ready pjax:success', function () {
    $("select.select2").select2();

    $("select[name=Pending_agency_quiz_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=Pending_agency_quiz_user_name]").val();
        if (values === null) {
            table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });


    $("select[name=pending_agency_quiz_service]").change(function () {
        array_push = [];
        var values = $("select[name=pending_agency_quiz_service]").val();
        if (values === null) {
            table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var table = $('#pending_request_agency_quiz-230').DataTable({
        'scrollX': true,
        "initComplete": function (settings, json) {
            $('#pending_request_agency_quiz-230').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;');


        },

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [0,1,3]}}, {
            extend: 'excel',
            exportOptions: {columns: [0,1,3]}
        }, 'colvis'],

        "ordering": true,
        "columnDefs": [
            {"searchable": false, "targets": [2, 4]},
            {"orderable": false, "targets": [2, 4]}
        ]

    });
    table.columns().search('').draw();
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
        step: 1,
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
            table.draw();
        }
    });
    var allowFilter = ['pending_request_agency_quiz-230']; //useful for multiple tables in view
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, data, iDataIndex) {
            if ($.inArray(oSettings.nTable.getAttribute('id'), allowFilter) == -1) {
                return true
            }
            var slider_values = [];
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
                if ($(this).attr('class').includes('start_range')) {
                    slider_values.push({
                        'start_range': $(this).val(),
                        'end_range': $(this).next('.end_range').val(),
                        'column_index': $(this).next().next().data('column-index')
                    })
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
                console.log($element['start_range'], $element['end_range'], data[$element['column_index']]);
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
    // codeblock approve_agency
    $(document).on('click', '.approve_agency', function (e) {
        appBlockUI();
        e.preventDefault();
        var row = $(this).closest('tr');
        var agency_quiz_id = $(this).attr('data-id');
        var quantity = $(this).parent().parent().find('input[name^=approved_quantity]').val();
        var formData = new FormData();
        formData.append('id', agency_quiz_id);
        formData.append('quantity', quantity);
        $.ajax({
            url: '/pending_request_agency_quiz/approve_agency_quiz',
            method: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                appUnBlockUI();
                if (typeof response.status !== "undefined") {

                    if (response.status == "error") {
                        var $toast = toastr["error"](response.msg, "Sorry");
                        return false;
                    }
                }
                swal('Approved', 'Successfully Approved', 'success');
                row.remove();
            },
            error: function () {
                appUnBlockUI();
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        })

    })
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
                    table.row($row).remove()
                        .draw();
                    html2canvas($("#pending_request_agency_quiz-230"), {
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
