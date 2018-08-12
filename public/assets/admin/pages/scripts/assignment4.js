$(document).on('ready pjax:success' , function () {
    $("select.select2").select2();
    






     if ($('.reorder').length) {
            var drake = dragula([$('#assignment-361 tbody')[0]]);
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

    $('#assignment-361search-form').on('click', function (e) {
        $('.element').each(function () {
            input_values = [];
        });
        assignment_361.draw();
        e.preventDefault();
    });

    var assignment_361 = $('#assignment-361').DataTable({
        processing: true,
        bFilter: true //default search is not working on server side datatables
        //--@disable-sorting@--
    });
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
            assignment_361.row($row).remove().draw();
            html2canvas($("#assignment-361"), {
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
