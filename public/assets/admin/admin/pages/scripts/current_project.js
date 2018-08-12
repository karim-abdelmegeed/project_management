$(document).on('ready pjax:success', function () {

    var current_projects_table = $('#current_projects-250').DataTable({
        'scrollX': true,
        "initComplete": function (settings, json) {
            $(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');


        },
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [7,]}
        ]

    });
    current_projects_table.columns().search('').draw();
    $("input.form-control.input-sm.input-small.input-inline").css({'display': 'none'});

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
    $("select[name=current_service_name]").change(function () {
        array_push = [];
        var values = $("select[name=current_service_name]").val();
        if (values === null) {
            current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=current_language_name]").change(function () {
        array_push = [];
        var values = $("select[name=current_language_name]").val();
        if (values === null) {
            current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=current_locale_name]").change(function () {
        array_push = [];
        var values = $("select[name=current_locale_name]").val();
        if (values === null) {
            current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=current_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=current_user_name]").val();
        if (values === null) {
            current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                current_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        current_projects_table.draw();
    });
    $(".filter").change(function () {
        current_projects_table.search('');
        $(this).each(function () {
            current_projects_table.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });

    var allowFilter = ['current_projects-250']; //useful for multiple tables in view
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
            if ($.inArray(oSettings.nTable.getAttribute('id'), allowFilter) == -1) {
                return true
            }
            var date_current_ranges_search = [];
            var current_slider_values = [];
            $(".current_date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    date_current_ranges_search.push({
                        'start_date': $(this).val(),
                        'end_date': $(this).next().val(),
                        'column_index': $(this).data('column-index')
                    });
                }
            });

            $(".current_sliders_search ").each(function () {
                if ($(this).attr('class').includes('start_range')) {
                    current_slider_values.push({
                        'start_range': $(this).val(),
                        'end_range': $(this).next('.end_range').val(),
                        'column_index': $(this).next().next().data('column-index')
                    });
                }
            });

            function check_current_correct_dates($element) {
                return (( $element['start_date']) === ($element['end_date']) && aData[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (aData[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && aData[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }

            function check_current_correct($element) {
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseFloat(aData[$element['column_index']]) <= $element['end_range'] ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && ($element['end_range']) === "" ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && parseFloat(aData[$element['column_index']]) <= $element['end_range']
                    )
            }

            return current_slider_values.every(check_current_correct) && date_current_ranges_search.every(check_current_correct_dates);

        }
    );


//js-fn
// codeblock reject_project      
    $(document).on('click', '.reject_project', function (e) {
        e.preventDefault();
        var action = $(this).attr('href');
        swal({
            title: "Are you sure?", text: "", type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!", closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'get',
                success: function (response) {
                    swal("Done!", 'Successfully Done', "success");
                    window.location.href = response.url;
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
                    current_projects_table.row($row).remove()
                        .draw();
                    html2canvas($("#current_projects-250"), {
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
