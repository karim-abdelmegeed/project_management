$(document).on('ready pjax:success', function () {
    if ($('.reorder').length) {
        var drake = dragula([$('#projects-214 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var column_data = [];
    var input_values = [];
    var datatable_obj = $("th.project-owner").map(function () {
        return $(this).data('name');
    });

    var form_element_names = $('.element').map(function () {
        return $(this).data('input');
    });


    $.each(datatable_obj, function (key, value) {
        column_data[key] = {"data": value}
    });

    $.get('/search/client_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=client_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    $.get('/search/units_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=unit]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    $.get('/search/locale_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=locale_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    $.get('/search/service_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=service_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    $.get('/search/language_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=language_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/administration_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name^=lead_owner]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
            $('.srch_form').find('select[name^=lead_secondary_owner]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });


    var table = $('#projects-214').DataTable({
        'scrollX': true,

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf',
            orientation: 'landscape',//landscape give you more space
            exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },
        processing: true,

        serverSide: true,
        bFilter: false,
        "columnDefs": [{
            "targets": [1, 2, 3, 4],
            "orderable": false
        }],
        //--@sorting@--
        //--@disable-sorting@--
        columns: column_data,
        ajax: {
            url: '/project/owner_projects_data',
            data: function (d) {
                $('.element').each(function () {
                    input_values.push($(this).val());
                });
                $.each(form_element_names, function (key, value) {
                    d[value] = input_values[key]
                });
            }
        }
    });

    // $.fn.dataTable.ext.search.push(
    //     function (settings, data, dataIndex) {
    //
    //         var slider_values=[];
    //         $(".sliders_search ").each(function () {
    //             if($(this).attr('class').includes('start_range')){
    //                 slider_values.push({'start_range':$(this).val(),'end_range':$(this).next('.end_range').val(),'column_index':$(this).next().next().data('column-index')})
    //             }
    //         });
    //         return slider_values.every(check_correct);
    //         function check_correct($element) {
    //             console.log($element['start_range'],$element['end_range'],data[$element['column_index']]);
    //             return (( $element['end_range'])=== "" && ($element['start_range'])=== "" ) ||
    //                 ($element['start_range']==="" && parseInt(data[$element['column_index']]) <= $element['end_range'] ) ||
    //                 ( parseInt($element['start_range'])<= data[$element['column_index']] && ($element['end_range'])==="" ) ||
    //                 ( parseInt($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseInt($element['end_range'])
    //                 )
    //         }
    //
    //     }
    // );
    if ($('.reorder').length) {
        var drake = dragula([$('#sec-projects-214 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var sec_column_data = [];
    var sec_input_values = [];
    var sec_datatable_obj = $("th.secondary").map(function () {
        return $(this).data('name');
    });

    var sec_form_element_names = $('.element').map(function () {
        return $(this).data('input');
    });


    $.each(sec_datatable_obj, function (key, value) {
        sec_column_data[key] = {"data": value}
    });


    var secTable = $('#sec-projects-214').DataTable({
        'scrollX': true,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf',
            orientation: 'landscape',//landscape give you more space
            exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },
        processing: true,
        serverSide: true,
        bFilter: false,
        "columnDefs": [{
            "targets": [1, 2, 3, 4],
            "orderable": false
        }],
        //--@sorting@--
        //--@disable-sorting@--
        columns: sec_column_data,
        ajax: {
            url: '/project/secondary_projects_data',
            data: function (d) {
                $('.element').each(function () {
                    sec_input_values.push($(this).val());
                });
                $.each(sec_form_element_names, function (key, value) {
                    d[value] = sec_input_values[key]
                });
            }
        }
    });

    $('#search-form').on('click', function (e) {
        $('.element').each(function () {
            input_values = [];
        });
        table.draw();
        e.preventDefault();
    });

    $('#sec-search-form').on('click', function (e) {
        $('.element').each(function () {
            sec_input_values = [];
        });
        secTable.draw();
        e.preventDefault();
    });
    //--@hide-sorting@--
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            console.log(ID);
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });
    $(".num_range_secondary").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            console.log(ID);
            $("." + ID + ".amount_secondary").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });


    if ($('.reorder').length) {
        var drake = dragula([$('#lead-projects-214 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var lead_column_data = [];
    var lead_input_values = [];
    var lead_datatable_obj = $("th.lead").map(function () {
        return $(this).data('name');
    });

    var lead_form_element_names = $('.element').map(function () {
        return $(this).data('input');
    });


    $.each(lead_datatable_obj, function (key, value) {
        lead_column_data[key] = {"data": value}
    });


    var leadTable = $('#lead-projects-214').DataTable({
        'scrollX': true,
        dom: 'Bfrtip',
        buttons: [
            {extend: 'pdf',
                orientation: 'landscape',//landscape give you more space
                exportOptions: {columns: [':visible']}},
            {
                extend: 'excel',
                exportOptions: {columns: [':visible']}
            }, 'colvis'
        ],
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },
        processing: true,
        serverSide: true,
        bFilter: false,

        "columnDefs": [{
            "targets": [3, 4, 5, 6],
            "orderable": false
        }],
        //--@sorting@--
        //--@disable-sorting@--
        columns: lead_column_data,
        ajax: {
            url: '/project/lead_projects_data',
            data: function (d) {
                $('.element').each(function () {
                    lead_input_values.push($(this).val());
                });
                $.each(lead_form_element_names, function (key, value) {
                    d[value] = lead_input_values[key]
                });
            }
        }
    });


    $('#lead-search-form').on('click', function (e) {
        $('.element').each(function () {
            lead_input_values = [];
        });
        leadTable.draw();
        e.preventDefault();
    });
    //--@hide-sorting@--
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            console.log(ID);
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });
    $(".num_range_lead").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            console.log(ID);
            $("." + ID + ".amount_lead").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });


    if ($('.reorder').length) {
        var drake = dragula([$('#history-projects-214 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var history_column_data = [];
    var history_input_values = [];
    var history_datatable_obj = $("th.history").map(function () {
        return $(this).data('name');
    });

    var history_form_element_names = $('.element').map(function () {
        return $(this).data('input');
    });


    $.each(history_datatable_obj, function (key, value) {
        history_column_data[key] = {"data": value}
    });


    var historyTable = $('#history-projects-214').DataTable({
        'scrollX': true,

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf',
            pageSize: 'A3',//A0 is the largest A5 smallest(A0,A1,A2,A3,legal,A4,A5,letter))
            orientation: 'landscape',//landscape give you more space
            exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },

        "columnDefs": [{
            "targets": [6],
            "orderable": false
        }],
        processing: true,
        serverSide: true,
        bFilter: false,

        //--@sorting@--
        //--@disable-sorting@--
        columns: history_column_data,
        ajax: {
            url: '/project/history_projects_data',
            data: function (d) {
                $('.element').each(function () {
                    history_input_values.push($(this).val());
                });
                $.each(history_form_element_names, function (key, value) {
                    d[value] = history_input_values[key]
                });
            }
        }
    });


    $('#history-search-form').on('click', function (e) {
        $('.element').each(function () {
            history_input_values = [];
        });
        historyTable.draw();
        e.preventDefault();
    });
    //--@hide-sorting@--
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            console.log(ID);
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });
    $(".num_range_history").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            console.log(ID);
            $("." + ID + ".amount_history").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });


    var participants = $('#participants').DataTable({
        'scrollX': true,
        "columnDefs": [
            {"orderable": false, "targets": [4, 5, 7]},
            {"searchable": false, "targets": [4, 5, 7,]}
        ],
        "initComplete": function (settings, json) {
            $(".dataTables_filter").find('input').attr('placeholder', "Search");


        },
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],

        "ordering": true

    });
    //  $("input.form-control.input-sm.input-small.input-inline").on('change',function(){
    // });

    // $.fn.dataTable.ext.search.push(
    //     function( settings, searchData, index, rowData, counter ) {
    //       $(".form-control input-sm input-small input-inline").on('change',function(){
    //      console.log(rowData);
    //      });
    //     });

    var progresses = $('#progresses').DataTable({
            'scrollX': true,

            "initComplete": function (settings, json) {
                $(".dataTables_filter").find('input').attr('placeholder', "Search");


            },
            dom: 'Bfrtip',
            buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
                extend: 'excel',
                exportOptions: {columns: [':visible']}
            }, 'colvis'],

            "ordering": true
        },

        {
            "columnDefs": [
                {"searchable": false, "targets": [5,]}
            ]

        });

    var contracts = $('#contracts').DataTable({
        'scrollX': true,

        "initComplete": function (settings, json) {
            $(".dataTables_filter").find('input').attr('placeholder', "Search");


        },
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [3,]},
            {"orderable": false, "targets": [3,]}
        ]

    });

    var project_invoices = $('#project-invoices').DataTable({
            'scrollX': true,
            "initComplete": function (settings, json) {
                $(".dataTables_filter").find('input').attr('placeholder', "Search");
            },
            dom: 'Bfrtip',
            buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
                extend: 'excel',
                exportOptions: {columns: [':visible']}
            }, 'colvis'],
            "ordering": true
        },

        {
            "columnDefs": [
                {"searchable": false, "targets": [7,]}
            ]

        });
    var contracts = $('#suprojects').DataTable({
        'scrollX': true,

        "initComplete": function (settings, json) {
            $(".dataTables_filter").find('input').attr('placeholder', "Search");


        },
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],

        "ordering": true
        ,
        // "columnDefs": [
        //     {"searchable": false, "targets": [9,]},
        //     {"orderable": false, "targets": [9,]}
        // ]

    });
    // var suprojects = $('#suprojects').DataTable(
    //     {
    //         columnDefs: [
    //             {targets: [10], searchable: false}
    //         ]
    //     }
    // );

    var agency_user_accounts = $('#agency_user_accounts').DataTable();


    $("#suprojects-search-form").on('click', function (e) {
        suprojects.draw();
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {

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


            function check_correct_dates($element) {
                console.log($element);
                console.log($element['start_date'], $element['end_date'], data[$element['column_index']]);
                return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
                    )
            }


            return date_ranges_search.every(check_correct_dates);


        }
    );
});
