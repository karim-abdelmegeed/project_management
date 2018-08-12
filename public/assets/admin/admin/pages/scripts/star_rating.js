$(document).ready(function () {
    var rate = $('div.rating').map(function () {
        return $(this).attr('data-rate')
    }).get();
    $(".rating").each(function (key, value) {
        $(this).rateYo({
            rating: rate[key],
            readOnly: true
        });
    })
});