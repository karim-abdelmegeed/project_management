var checkboxHandler = function () {

    var handleCheckbox = function () {


        /***************************************/
        /* Checkboxes handling */
        /***************************************/
        var checkboxes = $("input[type='checkbox']"),
                submitButt = $(".delete_multiple");
        checkboxes.click(function () {
            submitButt.attr("disabled", !checkboxes.is(":checked"));
        });



    }


    return {

        //main function to initiate the module
        init: function () {
            handleCheckbox();

        }
    };

}();