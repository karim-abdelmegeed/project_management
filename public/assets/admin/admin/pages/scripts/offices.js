$(document).on('ready pjax:success', function () {
    currTimeZone = $('#time_zone1').val();
    $('#time_zone').val(currTimeZone);
});