$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
 /*   $.get('/reviewer_supplier_progress/role_name_data', function (response) {
        response.forEach(function (element) {
            $('select[name=supplier_progress_role_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/reviewer_supplier_progress/subproject_name_data', function (response) {
        response.forEach(function (element) {
            $('select[name=supplier_progress_subproject_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $.get('/reviewer_supplier_progress/user_name_data', function (response) {
        response.forEach(function (element) {
            $('select[name=supplier_progress_user_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });*/
    $("select[name=supplier_progress_role_name]").change(function () {
        array_push = [];
        var values = $("select[name=supplier_progress_role_name]").val();
        if (values === null) {
            supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });

    $("select[name=supplier_progress_subproject_name]").change(function () {
        array_push = [];
        var values = $("select[name=supplier_progress_subproject_name]").val();
        if (values === null) {
            supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name=supplier_progress_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=supplier_progress_user_name]").val();
        if (values === null) {
            supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                supplier_progress_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var supplier_progress_table = $('#subprojects-254').DataTable({
        'scrollX': true,

        //export-buttons
        "initComplete": function (settings, json) {
            // $('#subprojects-254').closest(".tab-content").find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');
        }, dom: 'Bfrtip',
        buttons: [{
            extend: 'pdf',
            orientation: 'landscape',//landscape give you more space
            exportOptions: {columns: [':visible']}
        }, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],


        //export-buttons

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [8,]}
        ]

    });
    supplier_progress_table.search('').draw();
    supplier_progress_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#supplier_progress_search-form', function () {
        table.draw();
    });
    $(".supplier_progress_filter").change(function () {
        supplier_progress_table.search('');
        $(this).each(function () {
            supplier_progress_table.column($(this).data('column-index')).search($(this).val()).draw();
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
                 return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
                    )
            }

            function check_correct($element) {
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
                    html2canvas($("#subprojects-254"), {
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
    // codeblock change_status   
    $(document).on('click', '.change_status', function (e) {
        e.preventDefault();
        var status = $(this).attr('data-status');
        var action = $(this).attr('href');
        var parent = $(this).parent();
        var id = $(this).attr('data-id');
        var formData = new FormData();
        formData.append('status', status);
        $.ajax({
            url: action,
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                parent.empty();
                if (status == 'Approved') {
                    parent.append('Approved');
                    parent.append('<a  href="" class="btn btn-delete change_status" data-status="Rejected"><i class="fa fa-remove"></i> Reject</a>');
                    parent.find('a').attr('href', '/reviewer_project/' + id + '/change_progress_status')
                }
                else {
                    parent.append('Rejected');
                    parent.append('<a href="" class="btn btn-edit change_status" data-status="Approved" ><i class="fa fa-check" aria-hidden="true"></i> Approve</a>');
                    parent.find('a').attr('href', '/reviewer_project/' + id + '/change_progress_status')
                }
            },
            error: function () {
                console.log('error');
            }
        })
    })
});

// codeblock ajaxFormSuccess
function ajaxFormSuccess(responseText) {
    if (responseText.swal) {
        var projectId = $('.supplier_project_id').val();
        var subprojectId = $('.supplier_subproject_id').val();
        var userId = $('.supplier_user_id').val();
        var date = $('.supplier_date').val();
        var progress = $('.supplier_progress').val();
        var progressId = $('.supplier_progress_id').val();
        // console.log(projectId+'-'+subprojectId+'-'+userId+'-'+date+'-'+progress);
        var formData = new FormData();
        formData.append('project_id', projectId);
        if (subprojectId != null) {
            formData.append('subproject_id', subprojectId);
        }

        formData.append('user_id', userId);
        formData.append('date', date);
        formData.append('number_of_units', progress);
        swal({
            showCancelButton: true,
            type: 'warning',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
            title: "The total of approved records exceeds the limit",
            text: "You want to proceed !",
        }, function () {
            $.ajax('/reviewer_supplier_progress/' + projectId + '/' + progressId + '/edit', {
                method: "post",
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    toastr["success"]("Progress successfully saved", "Success");
                    location.reload();

                },
                error: function () {
                    console.log('error');
                }
            })

        });

    }
}
