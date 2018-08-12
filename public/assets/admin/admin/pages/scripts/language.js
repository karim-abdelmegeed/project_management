$(document).on('ready pjax:success', function () {

    $("select").select2();


    $('.image_export').on('click', function () {

        var $this = $(this);
        $this.button('loading');
        html2canvas($("#languages-173"), {
            onrendered: function (canvas) {
                var img = canvas.toDataURL("image/png");
                $("a.image").attr('href', img)
            }
        });
        setTimeout(function () {
            $this.button('reset');
            $('.image_export').addClass('hidden');
            $('.image_download').removeClass('hidden')
        }, 3000);
    });
    var table = $('#languages-173').DataTable({
        'scrollX': true,
        "initComplete": function (settings, json) {
            $(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;');


        },

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [2]},
            {"orderable": false, "targets": [2]}
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
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {

            var slider_values = [];
            $(".sliders_search ").each(function () {
                if ($(this).attr('class').includes('start_range')) {
                    slider_values.push({
                        'start_range': $(this).val(),
                        'end_range': $(this).next('.end_range').val(),
                        'column_index': $(this).next().next().data('column-index')
                    })
                }
            });
            return slider_values.every(check_correct);

            function check_correct($element) {
                console.log($element['start_range'], $element['end_range'], data[$element['column_index']]);
                return (($element['end_range']) === "" && ($element['start_range']) === "") ||
                    ($element['start_range'] === "" && parseInt(data[$element['column_index']]) <= $element['end_range']) ||
                    (parseInt($element['start_range']) <= data[$element['column_index']] && ($element['end_range']) === "") ||
                    (parseInt($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseInt($element['end_range'])
                    )
            }

        }
    );

//js-fn
    $(document).on('click', '.remove-stuff', function (e) {//Delete from list
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
                    html2canvas($("#languages-173"), {
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
