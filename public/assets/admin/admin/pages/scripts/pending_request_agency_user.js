$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    $.get('/search/project_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select.project_name_data')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=pending_agency_users_service]").change(function () {
        array_push = [];
        var values = $("select[name=pending_agency_users_service]").val();
        if (values === null) {
            pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=pending_agency_users_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=pending_agency_users_user_name]").val();
        if (values === null) {
            pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=pending_agency_users_project_name]").change(function () {
        array_push = [];
        var values = $("select[name=pending_agency_users_project_name]").val();
        if (values === null) {
            pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                pending_request_agency_user_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var pending_request_agency_user_table = $('#pending_request_agency_user-234').DataTable({
        'scrollX': true,
        "initComplete": function (settings, json) {
            $('#pending_request_agency_user-234').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');


        },

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [0,1,2]}}, {
            extend: 'excel',
            exportOptions: {columns: [0,1,2]}
        }, 'colvis'],

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [3, 4]},
            {"orderable": false, "targets": [3, 4]}
        ]

    });
    pending_request_agency_user_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        pending_request_agency_user_table.draw();
    });
    $(".filter").change(function () {
        pending_request_agency_user_table.search('');
        $(this).each(function () {
            pending_request_agency_user_table.column($(this).data('column-index')).search($(this).val()).draw();
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
            pending_request_agency_user_table.draw();
        }
    });
    var allowFilter = ['pending_request_agency_user-234']; //useful for multiple tables in view
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
            if ($.inArray(oSettings.nTable.getAttribute('id'), allowFilter) == -1) {
                return true
            }
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

            function check_current_correct($element) {
                return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                    ($element['start_range'] === "" && parseFloat(aData[$element['column_index']]) <= $element['end_range'] ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && ($element['end_range']) === "" ) ||
                    ( $element['start_range'] <= parseFloat(aData[$element['column_index']]) && parseFloat(aData[$element['column_index']]) <= $element['end_range']
                    )
            }

            return slider_values.every(check_correct);

        }
    );

//js-fn
// codeblock approve_agency_users       
    $(document).on('click', '.approve_agency_users', function (e) {
        appBlockUI();
        e.preventDefault();
        var row = $(this).closest('tr');
        var projectUserId = $(this).attr('data-id');
        var quantity = $(this).parent().parent().find('input[name^=approved_users]').val();
        var formData = new FormData();
        formData.append('id', projectUserId);
        formData.append('quantity', quantity);
        $.ajax({
            url: '/pending_request_agency_user/approve_agency_users',
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
                    pending_request_agency_user_table.row($row).remove()
                        .draw();
                    html2canvas($("#pending_request_agency_user-234"), {
                        onrendered: function (canvas) {
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
