var datetimepickersHandler = function () {

    var handleDatetimepickers = function () {


        $('.timepicker').datetimepicker({
            format: 'yy-mm-dd hh:ii',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0,
            showMeridian: true
        });



    }


    return {
        //main function to initiate the module
        init: function () {
            handleDatetimepickers();

        }
    };

}();