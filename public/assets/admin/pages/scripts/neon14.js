$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();
    





    $.get('/neon14/assignment_coordinator_id_data',function(response){
        response.forEach(function(element){
            $('select[name=assignment_coordinator_id_388]')
                .append($("<option></option>")
                    .attr("value",element.coordinator_id)
                    .text(element.coordinator_id));
        });

    });
    $(document).on("click", ".multiple_delete", function () {

        if ($(".group-checkable").is(":checked")) {
            var deleted_items = [];
            $("input[name^=items]").each(function () {
                deleted_items.push($(this).val())
            });

            $.post("/neon14/deleteCells", {"item": deleted_items}, function (response) {
                toastr.success(response.delete)
            });
            neon6_388.clear().draw()
        }
        else {
            $("input[name^=items]").each(function () {
                if ($(this).is(":checked")) {
                    $item = $(this);
                    $.post("/neon14/deleteCells", {"item": $(this).val()}, function (response) {
                        neon6_388.rows($item.closest('tr')).remove().draw();
                        toastr.success(response.delete)
                    });
                }
            });
        }
    });

     if ($('.reorder').length) {
            var drake = dragula([$('#neon6-388 tbody')[0]]);
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

    $('#neon6-388search-form').on('click', function (e) {
        $('.element').each(function () {
            input_values = [];
        });
        neon6_388.draw();
        e.preventDefault();
    });

    var neon6_388 = $('#neon6-388').DataTable({
        //--@initialize-table-complete@--
        //export-buttons
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },
        processing: true,
        serverSide: true,
        bFilter: false, //default search is not working on server side datatables
        bSort: false,
        //--@disable-sorting@--
        columns: column_data,
        ajax: {
            url: '/neon14/neon14_data',
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
    neon6_388.column( 0 ).visible( false );
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
            neon6_388.row($row).remove().draw();
            html2canvas($("#neon6-388"), {
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
