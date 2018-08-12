$(document).on('ready pjax:success', function () {
    $("select.select2").select2();

    tinymce.init({
        selector: '#invoicing_policy',
        height: 300,
        theme: 'modern',
        menubar: false,
        statusbar: false,
        toolbar: false,
        init_instance_callback: function (editor) {
            editor.on('Change', function (e) {
                content = tinymce.get('invoicing_policy').getContent();
                $("#invoicing_policy").val(content);
            });
        }
    });
    tinymce.init({
        selector: '#payment_details',
        height: 300,
        theme: 'modern',
        menubar: false,
        statusbar: false,
        toolbar: false,
        init_instance_callback: function (editor) {
            editor.on('Change', function (e) {
                content = tinymce.get('payment_details').getContent();
                $("#payment_details").val(content);
            });
        }
    });
    tinymce.init({
        selector: '#shipping_information',
        height: 300,
        theme: 'modern',
        menubar: false,
        statusbar: false,
        toolbar: false,
        init_instance_callback: function (editor) {
            editor.on('Change', function (e) {
                content = tinymce.get('shipping_information').getContent();
                $("#shipping_information").val(content);
            });
        }
    });
//start phone number implementation
  // codeblock phone_number_implementation        
    $(".phone").each(function () {
        $(this).intlTelInput({

            //allowExtensions: true,
            //autoFormat: false,
            autoHideDialCode: false,
            autoPlaceholder: true,
            //defaultCountry: "auto",
            // geoIpLookup: function(callback) {
            //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
            //     var countryCode = (resp && resp.country) ? resp.country : "";
            //     callback(countryCode);
            //   });
            // },
            //nationalMode: false,
            numberType: "FIXED_LINE",
            //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
            //preferredCountries: ['cn', 'jp'],
            utilsScript: "/assets/global/plugins/phone_input/js/utils.js"
        });
        $(this).intlTelInput("setCountry", "al")
    });

    $("#fax").intlTelInput({
        //allowExtensions: true,
        //autoFormat: false,
        autoHideDialCode: false,
        autoPlaceholder: true,
        //defaultCountry: "auto",
        // geoIpLookup: function(callback) {
        //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        //nationalMode: false,
        numberType: "FIXED_LINE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        utilsScript: "assets/global/plugins/phone_input/js/utils.js"
    });
    $("#mobile").intlTelInput({
        //allowExtensions: true,
        //autoFormat: false,
        autoHideDialCode: false,
        autoPlaceholder: true,
        //defaultCountry: "auto",
        // geoIpLookup: function(callback) {
        //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        //nationalMode: false,
        numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        //preferredCountries: ['cn', 'jp'],
        utilsScript: "assets/global/plugins/phone_input/js/utils.js"
    });
//end phone number implementation

    $("form.phone").each(function(){
        $flag = $(this).parent().parent().find('input.country_title').val();
        if($flag != undefined){
            $li = $(this).parent().find('[data-country-code='+$flag+']');
            $li.parent().find('li').removeClass('active').removeClass('highlight')
            $li.addClass('active').addClass('highlight')
            $country_name = $li.find('.country-name').text();
            $dial_code = $li.find('.dial-code').text();

            $(this).parent().find('.selected-flag').attr('title', $country_name+': '+$dial_code);

            $(this).parent().parent().find('.selected-flag .iti-flag.us').removeClass('us').addClass($flag);

        }


    });
    var clients_table = $('#clients-191').DataTable({
        'scrollX': true,
        "initComplete": function (settings, json) {
            $(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');
        },
        dom: 'Bfrtip',
        buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
            extend: 'excel',
            exportOptions: {columns: [':not(:last-child)']}
        }, 'colvis'],
        //export-buttons

        "ordering": true,

        "columnDefs": [
            {"orderable": false, "targets": [7]}
        ]

    });
        var clients_contact_table = $('#client_contacts').DataTable();
    $("input.form-control.input-sm.input-small.input-inline").css({'display':'none'});
    clients_table.columns().search('').draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();


    $(document).on('click', '#search-form', function () {
        clients_table.draw();
    });
    $(".filter").change(function () {
        clients_table.search('');
        $(this).each(function () {
            clients_table.column($(this).data('column-index')).search($(this).val()).draw();
    });
    });
    var ID;
    $(".num_range").slider({
        range: true,
        min: 0,
        max: 1000,
        slide: function (event, ui) {
            ID = $(this).attr('id');
            $("." + ID + ".amount").val(+ui.values[0] + "-" + ui.values[1]);
        },
        stop: function (event, ui) {
            // $id= $(this).attr('id');
            $("." + ID + ".start_range").val(ui.values[0]);
            $("." + ID + ".end_range").val(ui.values[1]);
            table.draw();
        }
    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var date_ranges_search = [];
            $(".date_ranges_search ").each(function () {
                if ($(this).attr('class').includes('start_date')) {
                    console.log($(this).next('.end_date').val());
                    date_ranges_search.push({
                        'start_date': $(this).val(),
                        'end_date': $(this).next().val(),
                        'column_index': $(this).data('column-index')
                    })
                }
            });


            function check_correct_dates($element) {
                return (( $element['start_date']) ===  ($element['end_date']) && data[$element['column_index']].split(' ')[0] === ($element['end_date'])) ||
                    (( $element['start_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (data[$element['column_index']].split(' ')[0]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= data[$element['column_index']].split(' ')[0] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= data[$element['column_index']].split(' ')[0] && data[$element['column_index']].split(' ')[0] <= ($element['end_date'])
                    )
            }



            return  date_ranges_search.every(check_correct_dates);
        }
    );



//js-fn
    $(document).on('click', '.remove-stuff', function (e) {//Delete from list(rewrite the function in scripts.js)
        e.preventDefault();
        $row = $(this).closest('tr');
        var action = $(this).attr('href');
        swal({
            title: "Are you sure?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: action,
                method: 'delete',
                success: function () {
                    swal("Deleted!", 'Successfully deleted', "success");
                    table.row($row).remove()
                        .draw();
                    html2canvas($("#clients-191"), {
                        onrendered: function (canvas) {
                            console.log(canvas);
                            var img = canvas.toDataURL("image/png");
                            $("a.image").attr('href', img)
                        }
                    });
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });


    $('[name^=contact_country]').each(function () {
        CountryCity($(this), $(this).attr('id'), "city"+$(this).data('id'));

    });

});
// codeblock addExtraAction    
function addExtraActions(data , $element){
    $country = $element.find('[name^=contact_country]');
    $element.find('[name^=contact_country]').attr('id', 'country'+data.id);
    $element.find('[name^=contact_country]').attr('data-region-id', 'city'+data.id);
    $element.find('[name^=contact_city]').attr('id', 'city'+data.id);

    CountryCity($country, "country"+data.id, "city"+data.id);

}
 // codeblock ajaxFormBeforeSerialize    
function ajaxFormBeforeSerialize(){
    $('.phone').each(function(){
        $country_name = $(this).parent().find('.iti-flag:first').attr('class');
        $(this).parent().parent().find('.country_title').val($country_name.split(' ')[1]);
    })
}