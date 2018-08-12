$(document).on('ready pjax:success' , function () {

    $("select[name=pending_nda_user_name]").change(function () {
        array_push=[];
       var values= $("select[name=pending_nda_user_name]").val();
       if(values===null){
           pending_nda_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
       }
       else{
           values.forEach(function(element){
               array_push.push('(?=.*' +element + ')');
           });
          $(this).each(function () {
          pending_nda_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
          pending_nda_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
           });
       }
    });

    $("select[name=pending_nda_role_name]").change(function () {
        array_push=[];
       var values= $("select[name=pending_nda_role_name]").val();
       if(values===null){
           pending_nda_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
       }
       else{
           values.forEach(function(element){
               array_push.push('(?=.*' +element + ')');
           });
          $(this).each(function () {
          pending_nda_table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
          pending_nda_table.column($(this).data('column-index')).search(array_push.join('|')).draw();
           });
       }
    });
    var pending_nda_table = $('#pending_n_d_a-226').DataTable({
        'scrollX': true,
        "initComplete": function (settings, json) {
            $('#pending_n_d_a-226').closest('.m-portlet').find(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');


        },

        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [0,1,2]}}, {
            extend: 'excel',
            exportOptions: {columns: [0,1,2]}
        }, 'colvis'],

        "ordering": true
        ,
        "columnDefs": [
            {"searchable": false, "targets": [3, 4]},
            {"orderable": false, "targets": [3, 4]}
        ]

    });
        pending_nda_table.columns().search( '' ).draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        pending_nda_table.draw();
    });
    $(".filter").change(function () {
        pending_nda_table.search('');
        $(this).each(function () {
            pending_nda_table.column($(this).data('column-index')).search($(this).val()).draw();
        });
    });
          var ID;
       $(".num_range").slider({
           range: true,
           min: 0,
           max: 1000,
           slide: function (event, ui) {
               ID= $(this).attr('id');
               $("."+ID+".amount").val(+ui.values[0] + "-" + ui.values[1]);
           },
           stop: function (event, ui) {
               // $id= $(this).attr('id');
               $("."+ID+".start_range").val(ui.values[0]);
               $("."+ID+".end_range").val(ui.values[1]);
               pending_nda_table.draw();
           }
       });
    var allowFilter = ['pending_n_d_a-226']; //useful for multiple tables in view
    $.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
            if ( $.inArray( oSettings.nTable.getAttribute('id'), allowFilter ) == -1 )
            {
                return true
            }
            var date_nda_ranges_search = [];
            $(".nda_date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    date_nda_ranges_search.push({
                        'start_date': $(this).val(),
                        'end_date': $(this).next().val(),
                        'column_index': $(this).data('column-index')
                    })
                }
            });

            function check_nda_correct_dates($element) {
                return (( $element['start_date']) ===  ($element['end_date']) && aData[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (aData[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= aData[$element['column_index']].split(' ')[0] && aData[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }
            return  date_nda_ranges_search.every(check_nda_correct_dates);

        }
    );

//js-fn
    $(document).on('click', '.remove-stuff', function (e) {//Delete from list(rewrite the function in scripts.js)
        e.preventDefault();
        appBlockUI();
        $row = $(this).closest('tr');
        var action = $(this).attr('href');
        swal({title: "Are you sure?", text: "", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", closeOnConfirm: false}, function () {
        $.ajax({
        url: action,
        method: 'delete',
        success: function () {
          appUnBlockUI();
            swal("Deleted!", 'Successfully deleted', "success");
            pending_nda_table.row($row).remove()
            .draw();
            html2canvas($("#pending_n_d_a-226"), {
                        onrendered: function (canvas) {
                                  var img = canvas.toDataURL("image/png");
                                  $("a.image").attr('href', img)
                                  }
                        });
        },
        error: function () {
          appUnBlockUI();
               swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

         });
    });
});
