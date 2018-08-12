$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    $.get('/search/agencies_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=user_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/administration_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=approved_by_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });
    });
    $.get('/search/service_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=service]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/search/project_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=project]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    if ($('.reorder').length) {
        var drake = dragula([$('#history_request_agency_quiz-231 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var column_data = [];
    var input_values = [];
    var datatable_obj = $("th").map(function () {
        return $(this).data('name');
    });
    var form_element_names = $('.element').map(function () {
        return $(this).data('input');
    });
    $.each(datatable_obj, function (key, value) {
        column_data[key] = {"data": value}
    });

    $('#search-form').on('click', function (e) {
        $('.element').each(function () {
            input_values = [];
        });
        table.draw();
        e.preventDefault();
    });

    var table = $('#history_request_agency_quiz-231').DataTable({'scrollX':true,
        "columnDefs": [
            {"orderable": false, "targets": [0,3,4,5,6]}
        ],   dom: 'Bfrtip',
        buttons: [{extend:'pdf',exportOptions:{columns:[':not(:last-child)']}},{extend:'excel',exportOptions:{columns:[':not(:last-child)']}},'colvis'],
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },
        processing: true,
        serverSide: true,
        bFilter: false,
        //--@sorting@--
        //--@disable-sorting@--
        columns: column_data,
        ajax: {
            url: '/history_request_agency_quiz/history_request_agency_quiz_data',
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
    //--@hide-sorting@--
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID= $(this).attr('id');
            $("."+ID+".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("."+ID+".start_range").val(ui.values[0]);
            $("."+ID+".end_range").val(ui.values[1]);
        }

    });

});

//js-fn
    


