var ajaxPageHandler = function () {

    var handlePage = function () {


       $(document).ready(function () {
        var defaultPage = $("#hiddenAttributes").attr("data-default_page");
        var hash = window.location.hash;
        var page = hash.replace("#", "");
        if (page == "") {
            page = defaultPage;
        }
        
        taps.loadajaxpage(page);
    });



    $(window).on('hashchange', function () {
        var defaultPage = $("#hiddenAttributes").attr("data-default_page");
        var hash = window.location.hash;
        var page = hash.replace("#", "");
        if (page == "") {
            page = defaultPage;
        }
        taps.loadajaxpage(page);

    });



    }


    return {

        //main function to initiate the module
        init: function () {
            handlePage();

        }
    };

}();