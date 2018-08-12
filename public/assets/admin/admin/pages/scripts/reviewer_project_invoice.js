$(document).on('ready pjax:success', function () {
    $("select.select2").select2();

    var reviewer_invoice_table = $('#reviewer_invoice-259').DataTable({
        'scrollX': true,
        dom: 'Bfrtip',
        buttons: [
            {extend: 'pdf', exportOptions: {columns: [':not(:last-child)']},
                orientation: 'landscape',//landscape give you more space
            },
            {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],
        // "initComplete": function (settings, json) {
        //     // $('#reviewer_invoice-259').closest(".tab-pane").find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');
        // },
        //export-buttons
        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [7,]},
            {"orderable": false, "targets": [7,]}
        ]

    });
    reviewer_invoice_table.search('').draw();//reset search after reloading
    reviewer_invoice_table.columns().search('').draw();


    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();



//js-fn
    $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
    });
//get progress invoicing data
// codeblock invoicing_date    
    $(document).on('click', '.invoicing_date', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        var formData = new FormData();
        formData.append('id', id);
        $.ajax({
            url: '/reviewer_invoice/get_invoicing_date',
            method: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                swal({
                    title: "Invoicing date",
                    text: data,
                    closeOnConfirm: true
                })
            }
        })
    });
// codeblock cancel_invoice   
    $(document).on('click', '.cancel-invoice', function (e) {
        e.preventDefault();
        var action = $(this).attr('href');
        swal({
            title: "Are you sure?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, cancel it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'post',
                success: function () {
                    swal("Canceled!", 'Successfully canceled', "success");
                    refreshAjax();

                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });

// codeblock change_payment_status  
    $(document).on('click', '.change_payment_status', function (e) {
        e.preventDefault();
        var payment_status = $(this).attr('data-status');
        var action = $(this).attr('href');
        var parent = $(this).parent();
        var formData = new FormData();
        formData.append('payment_status', payment_status);
        $.ajax({
            url: action,
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                parent.empty();
                parent.append('Acknowledged');
            },
            error: function () {
                //console.log('error');
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
                    table.row($row).remove()
                        .draw();
                    html2canvas($("#reviewer_invoice-259"), {
                        onrendered: function (canvas) {
                            //  console.log(canvas);
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
