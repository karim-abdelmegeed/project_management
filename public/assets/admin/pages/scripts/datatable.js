var columndata=[];
var inputvalues=[];
var datatableobj=$("th").map(function() {
    return $(this).data('name');
});
$(".header-element").each(function(key,value){
    var togglename =document.getElementsByTagName("th")[key].innerHTML
    $("<a> "+togglename+" </a>").appendTo('.column-toggle')
        .addClass('toggle-visibility')
        .attr('data-column',key)
})
var formelementnames=$('.element').map(function(){
    return $(this).data('input');
});
$.each(datatableobj, function(key,value) {
    columndata[key]={"data":value}
});
var oTable = $('#users-table').DataTable({'scrollX':true,
        "drawCallback": function (settings) {
            $('.popup').magnificPopup({
                type: 'iframe'
            });
        },
        processing: true,
        serverSide: true,
        bFilter: false,
        bLengthChange: false,
        ajax: {
            url: 'studentData',
        data:
            function (d) {
                $('.element').each(function(){
                    inputvalues.push($(this).val());
                });
                $.each(formelementnames,function(key,value){
                    d[value]=inputvalues[key]
                });
            }
    },
    columns:columndata
});
$('#search-form').on('submit', function (e) {
    $('.element').each(function(){
        inputvalues=[];
    });
    oTable.draw();
    e.preventDefault();
});
$('a.toggle-visibility').on('click', function (e) {
    var  val=$(this).attr('data-column');
    e.preventDefault();
    var column = oTable.column($(this).attr('data-column'));
    column.visible(!column.visible());
    console.log(oTable.column($(this).attr('data-column')).visible());
    if (oTable.column($(this).attr('data-column')).visible()) {
        $('[data-column="'+val+'"]').css('font-weight', 'bold');
    }
    else {
        $('[data-column="'+val+'"]').css('font-weight', 'normal');
    }
});
