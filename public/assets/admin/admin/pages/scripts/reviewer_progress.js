$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    //$('.datetimepicker').datetimepicker();


    $.get('/reviewer_progress/subproject_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=subproject_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=subproject_name]").change(function () {
        array_push = [];
        var values = $("select[name=subproject_name]").val();
        if (values === null) {
            reviewer_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                reviewer_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                reviewer_progress_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var reviewer_progress_table = $('#subprojects-252').DataTable({
            'scrollX': true,

            //export-buttons
            "initComplete": function (settings, json) {
                $(".dataTables_filter").find('input').attr('placeholder', "Search");


            },
            dom: 'Bfrtip',
            buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
                extend: 'excel',
                exportOptions: {columns: [':not(:last-child)']}
            }, 'colvis'],

            "ordering": true
        },

        {
            "columnDefs": [
                {"searchable": false, "targets": [3,]}
            ]

        });
    reviewer_progress_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#reviewer_progress_search-form', function () {
        reviewer_progress_table.draw();
    });
    $(".reviewer_progress_filter").change(function () {
        reviewer_progress_table.search('');
        $(this).each(function () {
            reviewer_progress_table.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });
    var ID;
    $(".reviewer_progress_num_range").slider({
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
            reviewer_progress_table.draw();
        }
    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {

            var slider_values = [];
            var date_ranges_search = [];
            $(".date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    //    console.log($(this).next('.end_date').val());
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
                //  console.log($element);
                //  console.log($element['start_date'], $element['end_date'], data[$element['column_index']]);
                return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
                    )
            }

            function check_correct($element) {
                // console.log($element['start_range'], $element['end_range'], data[$element['column_index']]);
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
    $(document).on('click', '.cancel', function (e) {
        e.preventDefault();
        var action = $(this).attr('href');
        var button = $(this);
        var row = $(this).parent().parent();
        swal({
            title: "Are you sure?", text: "", type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, cancel it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'get',
                success: function () {
                    swal({
                        title: "Canceled!",
                        text: "Successfully Canceled",
                        type: "success",
                        timer: 1500
                    });
                    refreshAjax();
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });
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
                    html2canvas($("#subprojects-252"), {
                        onrendered: function (canvas) {
                            //  console.log(canvas);
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

function ajaxFormBeforeSerialize() {
    if ($('form').hasClass('mce-tinymce')) {
        var content = tinymce.get('description').getContent();
        if (content != '') {
            content = content.split('<p>');
            content = content[1].split('</p>');
            $("#description").val(content[0]);
        }
    }


}