$(document).on('ready pjax:success', function () {


    available_projects_table = $('#available_projects-262').DataTable({'scrollX':true,
        "initComplete": function (settings, json) {
            $('#available_projects-262').closest(".m-portlet").find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');


        },
            dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],
        //
        //     "ordering": true},
        //
        // {
            "columnDefs": [
                {"searchable": false, "targets": [10]},
                {"orderable": false, "targets": [10]}
            ]

    });
    $("input.form-control.input-sm.input-small.input-inline").css({'display': 'none'});

    $("select.select2").select2();
    $.get('/search/reviewers_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.reviewer_name')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=available_reviewer_name]").change(function () {
        array_push = [];
        var values = $("select[name=available_reviewer_name]").val();
        if (values === null) {
            available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=available_service_name]").change(function () {
        array_push = [];
        var values = $("select[name=available_service_name]").val();
        if (values === null) {
            available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=available_locale_name]").change(function () {
        array_push = [];
        var values = $("select[name=available_locale_name]").val();
        if (values === null) {
            available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=available_language_name]").change(function () {
        array_push = [];
        var values = $("select[name=available_language_name]").val();
        if (values === null) {
            available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=available_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=available_user_name]").val();
        if (values === null) {
            available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                available_projects_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });

    available_projects_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();

    // codeblock available_search_form  
    $(document).on('click', '#available_search-form', function () {
        available_projects_table.draw();
    });
    $(document).on('click', '.apply_to_project', function (e) {
        appBlockUI();
        e.preventDefault();
        var project_id = $(this).attr('data-project_id');
        var user_type = $(this).attr('data-user_type');

        $.ajax({
            url: '/supplier_agency_available_projects/' + project_id + '/apply',
            method: 'post',
            data: {
                quantity: 1
            },
            success: function (data) {

                if (data.url != "none") {
                    // swal({
                    //     type: data.status,
                    //     title: data.title,
                    //     html: data.msg,
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // })
                    
                        window.location.href = data.url;
                    

                } else {
                    appUnBlockUI();
                    swal({
                        type: data.status,
                        title: data.title,
                        text: data.msg
                    })
                }
            }
        });

    });
    $(".available_filter").change(function () {
        available_projects_table.search('');
        $(this).each(function () {
            available_projects_table.column($(this).data('column-index')).search($(this).val()).draw();
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
            available_projects_table.draw();
        }
    });

    var allowFilter = ['available_projects-262']; //useful for multiple tables in view
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
            if ($.inArray(oSettings.nTable.getAttribute('id'), allowFilter) == -1) {
                return true
            }
            var date_available_ranges_search = [];
            var available_slider_values = [];
            $(".available_date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    date_available_ranges_search.push({
                        'start_date': $(this).val(),
                        'end_date': $(this).next().val(),
                        'column_index': $(this).data('column-index')
                    });
                }
            });

            $(".available_sliders_search ").each(function () {
                if ($(this).attr('class').includes('start_range')) {
                    available_slider_values.push({
                        'start_range': $(this).val(),
                        'end_range': $(this).next('.end_range').val(),
                        'column_index': $(this).next().next().data('column-index')
                    });
                }
            });

            function check_available_correct_dates($element) {
                return (( $element['start_date']) === ($element['end_date']) && aData[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (aData[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && aData[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }

            function check_available_correct($element) {
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseFloat(aData[$element['column_index']]) <= $element['end_range'] ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && ($element['end_range']) === "" ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && parseFloat(aData[$element['column_index']]) <= $element['end_range']
                    )
            }

            return available_slider_values.every(check_available_correct) && date_available_ranges_search.every(check_available_correct_dates);

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
                    available_projects_table.row($row).remove()
                        .draw();
                    html2canvas($("#available_projects-262"), {
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
