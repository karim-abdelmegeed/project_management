$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    $.get('/search/user_name_data', function (response) {
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
    $.get('/search/role_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=role]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    if ($('.reorder').length) {
        var drake = dragula([$('#signature_history-225 tbody')[0]]);
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

    var table = $('#signature_history-225').DataTable({
        "columnDefs": [
            {"orderable": false, "targets": [0,1,3,4,5]}
        ],'scrollX': true,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
            $('.popup_image').magnificPopup({
                type: 'image'
            });
        },

        processing: true,
        serverSide: true,
        bFilter: false,
        //--@sorting@--
        //--@disable-sorting@--
        columns: column_data,
        ajax: {
            url: '/signature_history/signature_history_data',
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
            ID = $(this).attr('id');
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
        }

    });

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
                    table.row($row).remove()
                        .draw();
                    html2canvas($("#signature_history-225"), {
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
