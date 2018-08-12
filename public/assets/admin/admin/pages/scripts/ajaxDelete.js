var DeleteHandler = function () {

    var handleDelete = function () {


        //Single Delete Handler
        $('.delete').click(function () {
            stuffId = $(this).attr('id');
            modelName = $(this).attr('data-model');
            swal({
                title: "Are you sure?",
                text: "Are you sure you want to delete this record",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {



                $.ajax({
                    type: "GET",
                    url: "delete/" + modelName + "/" + stuffId + "",
                    dataType: "html",
                    success: deleteSuccess,
                    error: errorFn


                });

                function errorFn(xhr, status, strErr) {

                    msg = "Nothing Deleted";
                    title = "There was an error";
                    theme = "error";
                    swal(msg, title, theme);

                }

                function deleteSuccess(result) {
                    var table = $('#sample_1').DataTable();

                    table
                        .row($("#data-row-" + stuffId))
                        .remove()
                        .draw();
                    //$("#data-row-"+stuffId).remove();
                    msg = "Successfully Deleted";
                    title = "";
                    theme = "success";
                    swal(msg, title, theme);
                }


            });

        });
        //Multiple Delete Handler
        $('.delete_multiple').click(function () {

            modelName = $(this).attr('data-model');


            swal({
                title: "Are you sure?",
                text: "Are You sure you want to delete multiple records?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {

                $("#deleteMult").ajaxSubmit({
                    url: "delete/multiple/" + modelName + "",
                    type: 'post',
                    success: deleteSuccess,
                    error: errorFn
                });

                function errorFn(xhr, status, strErr) {

                    msg = "Nothing Deleted";
                    title = "There was an error";
                    theme = "error";
                    swal(msg, title, theme);
                }

                function deleteSuccess(data) {
                    var arr = data.split(',');

                    for (var i = 0; i < arr.length; i++) {
                        //Bad idea to use .each(), much slower in this case
                        var table = $('#sample_1').DataTable();

                        table
                            .row($("#data-row-" + arr[i]))
                            .remove()
                            .draw();

                        //$("#data-row-"+arr[i]).remove();

                    }
                    //$("#data-row-"+stuffId).remove();
                    msg = "Successfully Deleted";
                    title = "";
                    theme = "success";
                    swal(msg, title, theme);
                }



            });

        });




    }


    return {

        //main function to initiate the module
        init: function () {
            handleDelete();

        }
    };

}();