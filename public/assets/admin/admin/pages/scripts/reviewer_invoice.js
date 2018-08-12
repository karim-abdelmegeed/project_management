$(document).on('ready pjax:success', function () {
    $("select.select2").select2();
    /*$.get('/reviewer_invoice/user_name_data', function (response) {
        response.forEach(function (element) {
            $('select[name=reviewer_invoice_user_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=reviewer_invoice_user_name]").change(function () {
        array_push = [];
        var values = $("select[name=reviewer_invoice_user_name]").val();
        if (values === null) {
            reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $.get('/reviewer_invoice/project_name_data', function (response) {
        response.forEach(function (element) {
            $('select[name=reviewer_invoice_project_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=reviewer_invoice_project_name]").change(function () {
        array_push = [];
        var values = $("select[name=reviewer_invoice_project_name]").val();
        if (values === null) {
            reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $.get('/reviewer_invoice/subproject_name_data', function (response) {
        response.forEach(function (element) {
            $('select[name=reviewer_invoice_subproject_name]')
                .append($("<option></option>")
                    .attr("value", element.name)
                    .text(element.name));
        });

    });
    $("select[name=reviewer_invoice_subproject_name]").change(function () {
        array_push = [];
        var values = $("select[name=reviewer_invoice_subproject_name]").val();
        if (values === null) {
            reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else {
            values.forEach(function (element) {
                array_push.push('(?=.*' + element + ')');
            });
            $(this).each(function () {
                reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                reviewer_invoice_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });*/

    var reviewer_invoice_table = $('#reviewer_invoice-259').DataTable({
        'scrollX': true,
        dom: 'Bfrtip',
        buttons: [
            {extend: 'pdf', exportOptions: {columns: [':visible']},
                orientation: 'landscape',//landscape give you more space
            },
            {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
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

    var reviewer_invoices_table = $('#reviewer_invoice').DataTable({
        'scrollX': true,
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':visible']}}, {
            extend: 'excel',
            exportOptions: {columns: [':visible']}
        }, 'colvis'],

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [0,]},
            {"orderable": false, "targets": [0,]}
        ]

    });
    reviewer_invoices_table.search('').draw();
    reviewer_invoices_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    /* $(document).on('click', '#reviewer_invoice_search-form', function () {
         reviewer_invoice_table.draw();
     });
     $(".reviewer_invoice_filter").change(function () {
         reviewer_invoice_table.search('');
         $(this).each(function () {
             reviewer_invoice_table.column($(this).data('column-index')).search($(this).val()).draw();
         });
     });*/
    /*  var ID;
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
              reviewer_invoice_table.draw();
          }
      });
      $.fn.dataTable.ext.search.push(
          function (settings, data, dataIndex) {

              var slider_values = [];
              var date_ranges_search = [];
              $(".date_ranges_search ").each(function () {
                  if ($(this).attr('class').includes('start_date')) {
                      // console.log($(this).next('.end_date').val());
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
                  //  console.log($element);
                  //  console.log($element['start_date'], $element['end_date'], data[$element['column_index']]);
                  return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
                      ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
                      ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
                      ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
                      )
              }

              function check_correct($element) {
                  // console.log($element['start_range'], $element['end_range'], data[$element['column_index']]);
                  return (( $element['end_range']) === "" && ($element['start_range']) === "" ) ||
                      ($element['start_range'] === "" && parseInt(data[$element['column_index']]) <= $element['end_range'] ) ||
                      ( parseInt($element['start_range']) <= data[$element['column_index']] && ($element['end_range']) === "" ) ||
                      ( parseInt($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseInt($element['end_range'])
                      )
              }

              return slider_values.every(check_correct) && date_ranges_search.every(check_correct_dates);


          }
      );
  */
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
