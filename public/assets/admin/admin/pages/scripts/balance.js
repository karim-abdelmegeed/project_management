$(document).on('ready pjax:success', function () {
    week_start = $(".employees").find(':selected').data('week_start');
    week_start = fixWeekStart(week_start)
        console.log(week_start);
        $(".wpicker").attr("data-week_start", week_start);
        
        $(".wpicker").weekpicker();
    $(".employees").change(function () {

        week_start = $(this).find(':selected').data('week_start');
       week_start = fixWeekStart(week_start)
        console.log(week_start);
        $(".wpicker").attr("data-week_start", week_start);
        $(".wpicker").val("");
        $(".wpicker").weekpicker();





    });

});


function fixWeekStart(week_start) {
    week_start = parseInt(week_start);
    week_start = week_start - 2;
    if (week_start > 7) {
        week_start = week_start - 7 ;
    }
    if (week_start < 0) {
        week_start = week_start + 7;
    }
    
    return week_start;

}
