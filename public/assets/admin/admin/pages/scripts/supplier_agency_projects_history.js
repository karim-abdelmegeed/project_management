$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    $.get('/search/service_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.service_name')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/language_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.language_name')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    $.get('/search/locale_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.locale_name')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/administration_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.user_name')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=service_name]").change(function () {
        array_push = [];
        var values = $("select[name=service_name]").val();
        if (values === null) {
            historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=locale_name]").change(function () {
        array_push = [];
        var values = $("select[name=locale_name]").val();
        if (values === null) {
            historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=language_name]").change(function () {
        array_push = [];
        var values = $("select[name=language_name]").val();
        if (values === null) {
            historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=user_name]").change(function () {
        array_push = [];
        var values = $("select[name=user_name]").val();
        if (values === null) {
            historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                historyof_projects.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var historyof_projects = $('#historyof_projects-278').DataTable({'scrollX':true,

            "initComplete": function (settings, json) {
                $(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');


            },

            dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],


            //export-buttons

            "ordering": true
        });
    $("input.form-control.input-sm.input-small.input-inline").css({'display': 'none'});

    historyof_projects.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        historyof_projects.draw();
    });
    $(".filter").change(function () {
        historyof_projects.search('');
        $(this).each(function () {
            historyof_projects.column($(this).data('column-index')).search($(this).val()).draw();
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
            historyof_projects.draw();
        }
    });
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {

            var date_ranges_search = [];
            var slider_values = [];
            $(".date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    date_ranges_search.push({
                        'start_date': $(this).val(),
                        'end_date': $(this).next().val(),
                        'column_index': $(this).data('column-index')
                    });
                }
            });

            $(".sliders_search ").each(function () {
                if ($(this).attr('class').includes('start_range')) {
                    slider_values.push({
                        'start_range': $(this).val(),
                        'end_range': $(this).next('.end_range').val(),
                        'column_index': $(this).next().next().data('column-index')
                    });
                }
            });

            function check_correct_dates($element) {
                return (( $element['start_date']) === ($element['end_date']) && aData[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (aData[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && aData[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }

            function check_correct($element) {
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseFloat(aData[$element['column_index']]) <= $element['end_range'] ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && ($element['end_range']) === "" ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && parseFloat(aData[$element['column_index']]) <= $element['end_range']
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
                    historyof_projects.row($row).remove()
                        .draw();
                    html2canvas($("#historyof_projects-278"), {
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
