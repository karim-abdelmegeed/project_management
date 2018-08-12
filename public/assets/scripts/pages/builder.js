$(document).on('click', '.browse', function () {
    var file = $(this).parent().parent().parent().find('.file');
    file.trigger('click');
});

$(document).on('change', '.file', function () {
    var file = $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});

$(".convert").on('click', function () {
    var file = $(".file").val().replace(/C:\\fakepath\\/i, '')
    console.log(file)
    var file_format = file.split('.').pop();
    if (file_format != "sql") {
        return toastr.error("File Extension Must be SQL")
    }
    else{
        
    }
})
