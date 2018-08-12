$(document).on('ready pjax:success', function () {

    $(document).on('click', '.read_material', function () {
        action = $(this).attr('data-action');
        $row = $(this).closest('tr');
        $.ajax({
            url: action,
            method: 'get',
            success: function () {

                $row.find('.viewed').html('Viewed');
                // swal(
                //     "Success",
                //     "Material viewed successfully", "success", {
                //         button: false,
                //     }
                // );
            },
            error: function () {
                // swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });

    $(document).on('click', '.header-tabs', function () {
        $(this).find('span').remove()
    });

    $(document).on('click', '.faq', function () {
        action = $(this).attr('data-action');
        $.ajax({
            url: action,
            method: 'get',
            success: function () {
                // swal(
                //     "Success",
                //     "FAQ viewed successfully", "success", {
                //         button: false,
                //     }
                // );
            },
            error: function () {
                // swal("Error", 'Something is wrong, Try again later', "error");
            }
        });

    });
    //js-fn

});
// codeblock ajaxFormSuccess      
function ajaxFormSuccess(responseText) {

    $("#data-row-"+responseText.id,parent.document).find('.viewed').html('Viewed')

}