$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
// codeblock override       
    $(document).on('click', '.override', function (e) {//Delete from list
        e.preventDefault();
        $row = $(this).closest('tr');
        var action = $(this).attr('href');
        swal({
            title: "Are you sure?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, override it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'get',
                success: function () {
                    swal("Overridden!", 'Successfully overridden', "success");
                    $row.find('.override').closest('td').html("Overridden");
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });
    // codeblock cancel_qualifications  
    $(document).on('click', '.cancel-qualification', function (e) {//Delete from list
        e.preventDefault();
        $row = $(this).closest('tr');
        var action = $(this).attr('href');
        swal({
            title: "Are you sure?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Cancel Qualification/Quiz!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'get',
                success: function () {
                    swal("Canceled!", 'Successfully Canceled', "success");
                    $row.find('.cancel-qualification').remove();
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });
    // $.get('/qualification/user_name_data',function(response){
    //     response.forEach(function(element){
    //         $('select[name=user_name]')
    //             .append($("<option></option>")
    //                 .attr("value",element.name)
    //                 .text(element.name));
    //     });
    //
    // });
    $.get('/search/service_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.service_search')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/agencies_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.agency_name_search')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/suppliers_name_data', function (response) {
        response.forEach(function (element) {
            $('select.supplier_search_name')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/language_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.language_search')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });
    });
    $.get('/search/locale_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.locale_search')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });
    });
    $.get('/search/administration_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.qualified_by_search')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });
    });
    $.get('/search/client_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.client_search')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });
        $('.srch_form').find('select.client_search')
            .append($("<option></option>")
                .attr("value", 'All')
                .text('All'));
    });

    $(".select-all").click(function () {
        $select_class = $(this).data('select');
        if ($(this).is(':checked')) {
            $("." + $select_class + " > option").prop("selected", "selected");
            $("." + $select_class).trigger("change");
        } else {
            $("." + $select_class + " > option").removeAttr("selected");
            $("." + $select_class + "").trigger("change");
        }
    });
    $("select[name^=type]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            agency_qual_quiz_table.column(0).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });

        }
    });
    $("select[name^=service_search]").change(function () {
        array_push = [];
        var values = $("select[name^=service_search]").val();
        if (values === null) {
            agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=name_search]").change(function () {
        array_push = [];
        var values = $("select[name^=name_search]").val();
        if (values === null) {
            agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=language_search]").change(function () {
        array_push = [];
        var values = $("select[name^=language_search]").val();
        if (values === null) {
            agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=locale_search]").change(function () {
        array_push = [];
        var values = $("select[name^=locale_search]").val();
        if (values === null) {
            agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=qualified_by_search]").change(function () {
        array_push = [];
        var values = $("select[name^=qualified_by_search]").val();
        if (values === null) {
            agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=client_search]").change(function () {
        array_push = [];
        var values = $("select[name^=client_search]").val();
        if (values === null) {
            agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                agency_qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    // $.get('/qualification/language_name_data',function(response){
    //     response.forEach(function(element){
    //         $('select[name=language_name]')
    //             .append($("<option></option>")
    //                 .attr("value",element.name)
    //                 .text(element.name));
    //     });
    //
    // });
    // $.get('/qualification/locale_name_data',function(response){
    //     response.forEach(function(element){
    //         $('select[name=locale_name]')
    //             .append($("<option></option>")
    //                 .attr("value",element.name)
    //                 .text(element.name));
    //     });
    //
    // });
    // $.get('/qualification/service_name_data',function(response){
    //     response.forEach(function(element){
    //         $('select[name=service_name]')
    //             .append($("<option></option>")
    //                 .attr("value",element.name)
    //                 .text(element.name));
    //     });
    //
    // });
    // $.get('/qualification/client_name_data',function(response){
    //     response.forEach(function(element){
    //         $('select[name=client_name]')
    //             .append($("<option></option>")
    //                 .attr("value",element.name)
    //                 .text(element.name));
    //     });
    //
    // });
    $("select[name^=record]").change(function () {
        array_push = [];
        var values = $(this).val();
        console.log(values)
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });

        }
    });
    $("select[name^=supp_status_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });

        }
    });
    $("select[name^=supp_type_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });

        }
    });
    $("select[name^=supp_service_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=supp_language_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=supp_locale_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=supp_qualified_by_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=supplier_search_name]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=supp_client_search]").change(function () {
        array_push = [];
        var values = $(this).val();
        if (values === null) {
            qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                qual_quiz_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var qual_quiz_table = $('#qualificationsand_quizzes-218').DataTable({
            'scrollX': true,
            dom: 'Bfrtip',
            buttons: [{
                extend: 'pdf',
                orientation: 'landscape',//landscape give you more space
                exportOptions: {columns: [':not(:last-child)']}
            }, {
                extend: 'excel',
                exportOptions: {columns: [':not(:last-child)']}
            }, 'colvis'],
            // bFilter: false,
            "ordering": true
            ,
            "columnDefs": [
                {"orderable": false, "targets": [10,]},
                // {"searchable": false}
            ]

        }
    );
    var agency_qual_quiz_table = $('#agency_qualificationsand_quizzes-218').DataTable({
        'scrollX': true,
        "ordering": true,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'pdf',
            orientation: 'landscape',//landscape give you more space
            exportOptions: {columns: [':not(:last-child)']}
        }, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],
        "columnDefs": [
            {"orderable": false, "targets": [8,]},
            // {"searchable": false}
        ]
        // bFilter: false //bfilter false stops the datatable search again


    });
    $("input.form-control.input-sm.input-small.input-inline").css({'display': 'none'});

    agency_qual_quiz_table.columns().search('').draw();
    qual_quiz_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        agency_qual_quiz_table.draw();
        qual_quiz_table.draw();
    });
    $(".filter").change(function () {
        agency_qual_quiz_table.search('');
        $(this).each(function () {
            agency_qual_quiz_table.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });
    $(".supp_filter").change(function () {
        qual_quiz_table.search('');
        $(this).each(function () {
            qual_quiz_table.column($(this).data('column-index')).search($(this).val()).draw();
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
            agency_qual_quiz_table.draw();
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
                return (( $element['start_date']) === ($element['end_date']) && data[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (data[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= data[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= data[$element['column_index']].split(' ')[0] && data[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }

            function check_correct($element) {
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseFloat(parseFloat(data[$element['column_index']])) <= $element['end_range'] ) ||
                    ( parseFloat($element['start_range']) <= parseFloat(data[$element['column_index']]) && ($element['end_range']) === "" ) ||
                    ( parseFloat($element['start_range']) <= parseFloat(data[$element['column_index']]) && parseFloat(data[$element['column_index']]) <= parseFloat($element['end_range'])
                    )
            }

            return slider_values.every(check_correct) && date_ranges_search.every(check_correct_dates);

        }
    );

//js-fn



    $(document).on('click', '.remove-qual', function (e) {//Delete from list(rewrite the function in scripts.js)
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
                    qual_quiz_table.row($row).remove()
                        .draw();//used in both tables

                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });$(document).on('click', '.remove-stuff', function (e) {//Delete from list(rewrite the function in scripts.js)
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
                    agency_qual_quiz_table.row($row).remove()
                        .draw();//used in both tables
                    html2canvas($("#qualificationsand_quizzes-218"), {
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
