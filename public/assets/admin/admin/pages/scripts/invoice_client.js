var table = '';
var history_invoices_table = '';
var invoiceTable = '';
$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
     // codeblock new_invoice      
    $(document).on('click', '#new_invoice', function () {
        $('.portlet-body').removeClass('hidden');
    })
    var clientId;
    // codeblock search_client       
    $(document).on('click', '#search_client', function () {
        $('.invoice_datatable').removeClass('hidden');
        clientId = $('select[name=client_id]').val();
        console.log(clientId);
        invoiceTable.draw();
        table.draw();
    });

    $.get('/search/client_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=client_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    $.get('/search/super_admin_manager_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=issuer]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    $.get('/search/administration_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=owner]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    $.get('/search/project_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=project_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    // codeblock acknowledge_invoice       
    $(document).on('click', '.aknowledge_invoice', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        var invoice = $(this).parent();
        console.log(invoice);
        $.ajax({
            url: url,
            method: 'get',
            success: function (data) {
                invoice.html('Aknowledged')

            },
            error: function () {
                swal("Error", 'Something is wrong, Try again later', "error");
            }
        });
    });
    // codeblock check_project      
    $(document).on('click', '.check_project', function () {
        if ($(this).prop('checked') == true) {
            $(this).closest('tr').find('.price').prop("disabled", false);
            $(this).closest('tr').find('.units_no').prop("disabled", false);
            $(this).closest('tr').find('.currency').prop("disabled", false);
            $po_input = $(this).closest('tr').find('.client_po');
            if($po_input.attr('data-changeable') == "yes"){
                $(this).closest('tr').find('.client_po').prop("disabled", false);    
            }else{
                $(this).closest('tr').find('.client_po').prop("disabled", false);  
                $(this).closest('tr').find('.client_po').attr("readonly", "readonly");      
            }
            
            $(this).closest('tr').find('.project_id').prop("disabled", false);
            $(this).closest('tr').find('.subproject_id').prop("disabled", false);
            $(this).closest('tr').find('.remaining').prop("disabled", false);
        }
        else {
            $(this).closest('tr').find('.price').prop("disabled", true);
            $(this).closest('tr').find('.units_no').prop("disabled", true);
            $(this).closest('tr').find('.currency').prop("disabled", true);
            $(this).closest('tr').find('.client_po').prop("disabled", true);
            $(this).closest('tr').find('.project_id').prop("disabled", true);
            $(this).closest('tr').find('.subproject_id').prop("disabled", true);
            $(this).closest('tr').find('.remaining').prop("disabled", true);
        }
    });
    // codeblock download_invoice      
    $(document).on('click','.download_invoice',function(e){
     e.preventDefault();
     var pdf = new jsPDF();
        var options = {
            background: '#fff' //background is transparent if you don't set it, which turns it black for some reason.
                
        };
         // x = 10px;
         // y = 10px;
        pdf.addHTML($('#invoice'), options, function () {
                pdf.save('Invoice.pdf');
        });
     // var clone = element.clone();
     // $('.clone_invoice').append(clone);
     // var formData = new FormData();
     // formData.append('image', clone);
     // $.ajax({
     //        url: '/invoice_client/'+invoiceId+'/download_invoice',
     //        method: 'post',
     //        data: formData,
     //        contentType: false,
     //        processData: false,
     //        success: function (data) {
     //      }
     //    });
//      html2canvas(element, {
//     onrendered: function(canvas) {
//        var extra_canvas = document.createElement("canvas");
//       extra_canvas.setAttribute('width',1000);
//       extra_canvas.setAttribute('height',1415);
//       var ctx = extra_canvas.getContext('2d');
//       ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,1000,1415);
//     var formData = new FormData();
//     var imgData = extra_canvas.toDataURL('image/png'); 
//     formData.append('image', imgData);
//     formData.append('invoice_id', invoiceId);
// //      for (var [key, value] of formData.entries()) { 
// //   console.log(key, value);
// // }
//       $.ajax({
//             url: '/invoice_client/'+invoiceId+'/download_invoice',
//             method: 'post',
//             data: formData,
//             contentType: false,
//             processData: false,
//             success: function (data) {
//           }
//         });
//         // canvas is the final rendered <canvas> element
//     },
    
// });
    });
    $.get('/search/user_name_data', function (response) {
        response.forEach(function (element) {
            $('.srch_form').find('select[name=user_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });

    if ($('.reorder').length) {
        var drake = dragula([$('#issued_invoices-220 tbody')[0]]);
        drake.on('drop', function (el, target, source, sibling) {
            $('.reorder').prop('disabled', false);
        });
    }
    var column_data = [];
    var input_values = [];
    var datatable_obj = $(".issued_th").map(function () {
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

    $('#history-search-form').on('click', function (e) {
        $('.element').each(function () {
            input_values = [];
        });
        history_invoices_table.draw();
        e.preventDefault();
    });

    table = $('#issued_invoices-220').DataTable({'scrollX':true,
        //export-buttons
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
            $('.popup_refresh').magnificPopup({
                type: 'iframe',
                callbacks: {
                    open: function () {
                        // Will fire when this exact popup is opened
                        // this - is Magnific Popup object
                    },
                    close: function () {
                        table.draw();
                        invoiceTable.draw();
                        // var url = document.URL;
                        // var goTo = url.replace("#", "");
                        // pjaxPage(goTo);

                    }
                    // e.t.c.
                }

            });

        },
        processing: true,
        serverSide: true,
        bFilter: false,

        "columnDefs": [ {
            "targets": [0,1,2,4,5,6,7],
            "orderable": false
        }
        ],
        columns: column_data,
        ajax: {
            url: '/invoice_client/invoice_client_data',
            data: function (d) {
                $('.element').each(function () {
                    input_values.push($(this).val());
                });
                $.each(form_element_names, function (key, value) {
                    d[value] = input_values[key]
                });
                d.clientId = clientId
            }
        }
    });
    history_invoices_table = $('#history_invoices').DataTable({'scrollX':true,
        //export-buttons
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
            $('.popup_refresh').magnificPopup({
                type: 'iframe',
                callbacks: {
                    open: function () {
                        // Will fire when this exact popup is opened
                        // this - is Magnific Popup object
                    },
                    close: function () {
                        history_invoices_table.draw();
                        // var url = document.URL;
                        // var goTo = url.replace("#", "");
                        // pjaxPage(goTo);

                    }
                    // e.t.c.
                }

            });

        },
        processing: true,
        serverSide: true,
        bFilter: false,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {
                columns: [':not(:last-child)']
            }
        }, 'colvis'],
        "columnDefs": [ {
            "targets": [0,1,2,4,5,6,7],
            "orderable": false
        }
        ],
        columns: column_data,
        ajax: {
            url: '/client_invoices_history/invoice_client_data',
            data: function (d) {
                $('.element').each(function () {
                    input_values.push($(this).val());
                });
                $.each(form_element_names, function (key, value) {
                    d[value] = input_values[key]
                });
                d.clientId = clientId
            }
        }
    });
    // first DataTable
    // if ($('.reorder').length) {
    //     var drake = dragula([$('#invoice_client tbody')[0]]);
    //     drake.on('drop', function (el, target, source, sibling) {
    //         $('.reorder').prop('disabled', false);
    //     });
    // }
    var invoice_column_data = [];
    var invoice_input_values = [];
    var invoice_datatable_obj = $(".invoice_th").map(function () {
        return $(this).data('name');
    });
    var invoice_form_element_names = $('.invoice_element').map(function () {
           console.log($(this).data('input'));
        return $(this).data('input');
    });
    $.each(invoice_datatable_obj, function (key, value) {
        invoice_column_data[key] = {"data": value}
        console.log(invoice_column_data)
    });


    invoiceTable = $('#invoice_client').DataTable({
        processing: true,
        serverSide: true,
        bFilter: false,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],
        "columnDefs": [ {
            "targets": [2,3,6,9],
            "orderable": false
        }
        ],
        ajax: {
            url: '/invoice_client/get_client_project',
            data: function (d) {
                $('.invoice_element').each(function () {
                    invoice_input_values.push($(this).val());
                });
                $.each(invoice_form_element_names, function (key, value) {
                    d[value] = invoice_input_values[key]
                });

                // d.clientId = clientId
            }
        },
        columns: invoice_column_data

    });
    $('#invoice-search').on('click', function (e) {
        $('.invoice_element').each(function () {
            invoice_input_values = [];
        });
        invoiceTable.draw();
        e.preventDefault();
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
                    html2canvas($("#issued_invoices-220"), {
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

// codeblock ajaxFormSuccess 
function ajaxFormSuccess(response) {
    if(response.status != "error"){
        table.draw();
        invoiceTable.draw();
    }

}
