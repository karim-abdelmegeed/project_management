$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();

    // if ($('.reorder').length) {
    //     var drake = dragula([$('#f_a_qs-244 tbody')[0]]);
    //     drake.on('drop', function (el, target, source, sibling) {
    //         $('.reorder').prop('disabled', false);
    //     });
    // }
    // var column_data = [];
    // var input_values = [];
    // var datatable_obj = $("th").map(function () {
    //     return $(this).data('name');
    // });
    // var form_element_names = $('.element').map(function () {
    //     return $(this).data('input');
    // });
    // $.each(datatable_obj, function (key, value) {
    //     column_data[key] = {"data": value}
    // });

    // $('#search-form').on('click', function (e) {
    //     $('.element').each(function () {
    //         input_values = [];
    //     });
    //     table.draw();
    //     e.preventDefault();
    // });
    $.get('/search/client_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name^=client_search]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });
    });

    $("select[name^=client_search].faq-search").change(function () {
        array_push=[];
        var values= $("select[name^=client_search].faq-search").val();
        if(values===null){
            table_faq.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table_faq.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table_faq.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    $("select[name^=service_search].faq-search").change(function () {
        array_push=[];
        var values= $("select[name^=service_search].faq-search").val();
        if(values===null){
            table_faq.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table_faq.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table_faq.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    var table_faq = $('#f_a_qs-244').DataTable({
        'scrollX': true,
        "columnDefs": [
            {"searchable": false, "targets": [4]},
            {"orderable": false, "targets": [1, 4]}
        ],
        "initComplete": function (settings, json) {
            $('#f_a_qs-244').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;');


        },

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],


        //export-buttons

        "ordering": true
    });
    $("input.form-control.input-sm.input-small.input-inline").css({'display':'none'});

    table_faq.columns().search( '' ).draw();
  var column_index = $("#amount").data('column-index');
  var start_range = $("input[name=start_range]").val();
  var end_range = $("input[name=end_range]").val();
   $(document).on('click', '#search-form-faq', function () {
    table_faq.draw();
  });
     $(".faq_filter").change(function () {
    table_faq.search('');
    $(this).each(function () {
      table_faq.column($(this).data('column-index')).search($(this).val()).draw();
    });
  });
      var ID;
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

//js-fn
    $(document).on('click', '.remove-stuff', function (e) {//Delete from list(rewrite the function in scripts.js)
        e.preventDefault();
        $row = $(this).closest('tr');
        var action = $(this).attr('href');
        swal({title: "Are you sure?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", closeOnConfirm: false}, function () {
            $.ajax({
                url: action,
                method: 'delete',
                success: function () {
                    swal("Deleted!", 'Successfully deleted', "success");
                    table_faq.row($row).remove()
                    .draw();
                    html2canvas($("#f_a_qs-244"), {
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
