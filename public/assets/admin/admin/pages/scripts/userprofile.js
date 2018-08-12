$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    $(document).on('click', '#headers a', function () {
        document.location.hash = $(this).attr('href');

    });
    // codeblock approve_user_stuff
    $(document).on('click', '.approve_user_stuff', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            method: 'get',
            success: function () {
                swal('Approved', 'Successfully Approved', 'success');
                $(this).closest('td').html('Approved');
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });
    });
    // codeblock reject_user_stuff   
    $(document).on('click', '.reject_user_stuff', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            method: 'get',
            success: function () {
                swal('Rejected', 'Successfully Rejected', 'success');
                $(this).closest('td').html('Rejected');
            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });
    });

    var pending_contract_table = $('#pending_contract-227').DataTable({
        'scrollX': true,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],
        "ordering": true,
        "columnDefs": [
            {"searchable": false, "targets": [2,]},
            {"orderable": false, "targets": [2,4,]}
        ],
        //export-buttons




    });

        var table = $('#nda-226').DataTable({


                'scrollX':true,

                dom: 'Bfrtip',
                buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
                    extend: 'excel',
                    exportOptions: {columns: [':visible']}
                }, 'colvis'],

                "ordering": true
            ,
                "columnDefs": [
                    {"searchable": false, "targets": [2,]},
                    {"orderable": false, "targets": [2,3,]}
                ]

            });

    //user signature datatable
        var signature_table = $('#user_signatures').DataTable({'scrollX':true,


                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        exportOptions: {columns: [':not(:last-child)']}
                    },
                    {
                        extend: 'excel',
                        exportOptions: {columns: [':not(:last-child)']}
                    },
                    'colvis'],

                "ordering": true
            }
        );


//js-fn
    $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
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
                    html2canvas($("#pending_contract-227"), {
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
