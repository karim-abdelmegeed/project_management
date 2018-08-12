$(document).on('ready pjax:success', function () {
    $(".save_progress").click();
    $('.tags_field').tagsInput({
                'delimiter': ['Ω12345678910Ω'],
                'width':'450px',
                'defaultText':'Answer'

            });
    table = $('#quiz_generator').DataTable(
        {
            "initComplete": function (settings, json) {
                $(".dataTables_filter").find('input').attr('placeholder', "Search").after('&nbsp;&nbsp;<a href="#" class="advanced_search btn btn-secondary">Advanced Search</a>');
            },

            dom: 'Bfrtip',
            buttons: [{extend: 'pdf', exportOptions: {columns: [':not(:last-child)']}}, {
                extend: 'excel',
                exportOptions: {columns: [':not(:last-child)']}
            }, 'colvis'],

            //export-buttons
            "ordering": true
       ,
            "columnDefs": [
                {"orderable": false, "targets": [8]},
                {"searchable": false, "targets": [8]}
            ]

        }
    );

    $(".select-all").click(function(){
        $select_class = $(this).data('select');
        if($(this).is(':checked') ){
            $("." +$select_class+ " > option").prop("selected","selected");
            $("." +$select_class).trigger("change");
        }else{
            $("." + $select_class+" > option").removeAttr("selected");
            $("." +$select_class+ "").trigger("change");
        }
    });
    table.columns().search( '' ).draw();
    var column_index = $("#amount").data('column-index');
    var start_range = $("input[name=start_range]").val();
    var end_range = $("input[name=end_range]").val();

    $(document).on('click', '#search-form', function () {
        table.draw();
    });

    $(".filter").change(function () {
        table.search('');
        $(this).each(function () {
            table.column($(this).data('column-index')).search($(this).val()).draw();
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
            table.draw();
        }
    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {

            var slider_values=[];
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

            $(".sliders_search ").each(function () {
                if($(this).attr('class').includes('start_range')){
                    slider_values.push({'start_range':$(this).val(),'end_range':$(this).next('.end_range').val(),'column_index':$(this).next().next().data('column-index')})
                }
            });
            function check_correct_dates($element) {
                console.log($element);
                console.log($element['start_date'], $element['end_date'], data[$element['column_index']]);
                return (( $element['end_date']) === "" && ($element['end_date']) === "" ) ||
                    ($element['start_date'] === "" && (data[$element['column_index']]) <= $element['end_date'] ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && ($element['end_date']) === "" ) ||
                    ( ($element['start_date']) <= data[$element['column_index']] && data[$element['column_index']] <= ($element['end_date'])
                    )
            }
            function check_correct($element) {
                return (( $element['end_range'])=== "" && ($element['start_range'])=== "" ) ||
                    ($element['start_range']==="" && parseFloat(data[$element['column_index']]) <= $element['end_range'] ) ||
                    ( parseFloat($element['start_range'])<= data[$element['column_index']] && ($element['end_range'])==="" ) ||
                    ( parseFloat($element['start_range']) <= data[$element['column_index']] && data[$element['column_index']] <= parseFloat($element['end_range'])
                    )
            }
            return slider_values.every(check_correct)  && date_ranges_search.every(check_correct_dates);


        }
    );
      // codeblock randomize_is_checked    
    if ($("input[name=randomize]").is(':checked')) {
        $(".rand_num").removeClass('hidden');
    }
    // codeblock change_service    
    $(document).on('change', 'select[name=service_id]', function () {
        $mandatory_language = $(this).find('option:selected').attr('data-language');
        $mandatory_locale = $(this).find('option:selected').attr('data-locale');
        $step = $(this).closest('.form_step');
        $('input[name=mandatory_locale]').val(0);
        if ($mandatory_locale == 1) {
            $('input[name=mandatory_locale]').val(2);

        } else if ($mandatory_language == 1) {
            $('input[name=mandatory_locale]').val(1);

        }
    });
    

    // codeblock collapse    
    $(document).on('click', 'ol.questions .portlet.question .collapse', function () {
        $("ol.questions").find('.collapse').addClass("let_collpase");
        $(this).removeClass('let_collpase');
        $("ol.questions").find('.collapse.let_collpase').click();
    });
    // codeblock locales  
    $('.locales-names').each(function () {
        $locales_names  = $(this).text();
        $locales_names = $locales_names.trim();

        $(this).text($locales_names.substring(0,$locales_names.length-1)+'.');


    });
    $("select.select2").select2();
     // codeblock ordering  
    $(".ordering").sortable({
        update: function (event, ui) {
            $(".ordering li.portlet").each(function (i) {
                i++;
                $(this).find(".caption").find('.q_order').html(i);
            });
            var postData = $(this).sortable('serialize');

            var quiz_id = $(".quiz_id").val();
            console.log(postData);
            $.post('/admin/questions/order', {'order': postData, 'quiz_id': quiz_id}, function () {
            });
        }
    });
    // tinymce.init({
    //     selector: '#description',
    //     height: 300,
    //     theme: 'modern',
    //     menubar: false,
    //     statusbar: false,
    //     toolbar: false,
    //     init_instance_callback: function (editor) {
    //         editor.on('Change', function (e) {
    //             content = tinymce.get('description').getContent();
    //             $("#description").val(content);
    //         });
    //     }
    // });

});
$(document).on('ready', function () {
    $("select.select2").select2();
    // codeblock service_ajaxRequest   
    $.get('/search/service_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name=service_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
     // codeblock language_ajaxRequest   
    $.get('/search/language_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name=language_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });

    });
    // codeblock locale_ajaxRequest    
    $.get('/search/locale_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name=locale_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });


    });
    // codeblock client_ajaxRequest   
    $.get('/search/client_name_data',function(response){
        response.forEach(function(element){
            $('.srch_form').find('select[name=client_name]')
                .append($("<option></option>")
                    .attr("value",element.name)
                    .text(element.name));
        });
        $('.srch_form').find('select[name=client_name]')
            .append($("<option></option>")
                .attr("value","All")
                .text("All"));
    });
    // codeblock service   
    $("select[name=service_name]").change(function () {
        array_push=[];
        var values= $("select[name=service_name]").val();
        if(values===null){
            table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    // codeblock language   
    $("select[name=language_name]").change(function () {
        array_push=[];
        var values= $("select[name=language_name]").val();
        if(values===null){
            table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
     // codeblock locale   
    $("select[name=locale_name]").change(function () {
        array_push=[];
        var values= $("select[name=locale_name]").val();
        if(values===null){
            table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
     // codeblock client     
    $("select[name=client_name]").change(function () {
        array_push=[];
        var values= $("select[name=client_name]").val();
        if(values===null){
            table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
        }
        else{
            values.forEach(function(element){
                array_push.push('(?=.*' +element + ')');
            });
            $(this).each(function () {
                table.column($(this).data('column-index')).search(array_push.join('|'), true, false, true).draw();
                table.column($(this).data('column-index')).search(array_push.join('|')).draw();
            });
        }
    });
    
     // codeblock add_new    
    $(document).on('click', '.add_new', function () {
        appBlockUI();
        url = $(this).data('action');
        $.get(url, function (response) {
            window.location.href = response.url
        });
    });
      // codeblock question_choices_type   
    $(document).on('change', 'select[name^=question_choices_type]', function () {
        $correct_answer = $(".correct_answer");
        $(".add_new_answer").removeClass('hidden');

        if ($("select[name^=question_choices_type]").val() === "checkbox") {
            console.log($(this).closest('.question').find('input[name^=correct_answers]'));

            $(this).closest('.question').find('.correct_answer').find('input[type=checkbox]').prop('checked', false);
            $(this).closest('.question').find('.correct_answer').find('input[type=checkbox]').attr('name', '');
            $(this).closest('.question').find('.correct_answer').find('input[type=hidden]').attr('name', 'correct_answers[]').val(0);

        }
        if ($("select[name^=question_choices_type]").val() === "Radio") {
            console.log($(this).closest('.question').find('input[name^=correct_answers]'));

            $(this).closest('.question').find('.correct_answer').find('input[type=checkbox]').prop('checked', false);
            $(this).closest('.question').find('.correct_answer').find('input[type=checkbox]').attr('name', '');
            $(this).closest('.question').find('.correct_answer').find('input[type=hidden]').attr('name', 'correct_answers[]').val(0);
        }
    });
    // codeblock add_new_answer   
    $(document).on('click', '.add_new_answer', function () {
        var url = $(this).data('action');
        $selected_choices_type = $(this).parent().find('select[name^=question_choices_type] option:selected');
        if($selected_choices_type.val()==''){
            swal("Oops", "Please select choice type", "error");
        } else {
            $question_container = $(this).closest('.question');
            $multi_question_id = $question_container.find('input[name^=multi_question_id]').val();
            var answer_id = $.ajax({type: "GET", url: url,data:{question_id:$multi_question_id}, async: false}).responseText;
            $answer_block = $('.hidden_answer_block').clone();
            $answer_block.removeClass('hidden_answer_block').addClass('answer_block');
            if ($(this).prev().prev().find('select[name^=answer_type]').val() === "Text") {
                console.log($answer_block);
                $answer_block.find('input[name^=answer_type]').val('Text');

                $answer_block.find('.hidden_question_answer_text').addClass('question_answer').removeClass('hidden_question_answer_text');
                $answer_block.find('.hidden_question_answer_file').remove();
                $answer_block.find('input[name^=question_choices_id]').val(answer_id);

            }
            else if ($(this).prev().prev().find('select[name^=answer_type]').val() === "File") {
                console.log($answer_block);
                $answer_block.find('input[name^=answer_type]').val('File');
                $answer_block.find('.hidden_question_answer_file').removeClass('hidden_question_answer_file');
                $answer_block.find('.hidden_question_answer_text').remove();
                $answer_block.addClass('question_answer');
                $answer_block.find('.uploader').removeClass('hidden');
                $answer_block.find('.answer_field').addClass('hidden');
                $answer_block.find('input[name^=question_choices_id]').val(answer_id);
            }
            $answer_block.find('input[type=text]').each(function () {
                $(this).attr('data-name', 'answer').attr('data-validation', 'required');
            });
            $answer_block.find("input[type=text]").val("");
            $answer_block.find("input[type=checkbox]").attr('checked', false);
            $answer_block.find('.correct_answer').find("input[type=hidden]").attr('name', 'correct_answers[]');
            if ($selected_choices_type.val() === "Radio") {
                $(this).next('.choice_answers').append($answer_block);
                $question_container = $(this).closest('.question');
                $(this).next().find('input[name^=answer_id]').val($question_container.find('input[name^=multi_question_id]').val());
                $(this).next().find('.uploader:last').attr('id', 'answer_' + answer_id);
                if (($(this).prev().prev().find('select[name^=answer_type]').val() === "File")) {
                    $(this).next().find('.uploader:last').removeClass('hidden');
                    runFineUploader('answer_' + answer_id, 500000000000000, 0, 0, false, 'QuestionChoices', 'file_id', answer_id);
                    $answer_block.find('.portlet-body').css('height','240px');
                }
            }
            else if ($selected_choices_type.val() === "checkbox") {
                $(this).next('.choice_answers').append($answer_block);
                $question_container = $(this).closest('.question');
                $(this).next().find('input[name^=answer_id]').val($question_container.find('input[name^=multi_question_id]').val());
                $(this).next().find('.uploader:last').attr('id', 'answer_' + answer_id);
                if (($(this).prev().prev().find('select[name^=answer_type]').val() === "File")) {
                    runFineUploader('answer_' + answer_id, 500000000000000, 0, 0, false, 'QuestionChoices', 'file_id', answer_id);
                    $answer_block.find('.portlet-body').css('height','240px');
                }
            }
            $answer_block.find('.passible_answers_btn').attr('data-target','#possible_text_answers-'+answer_id);
            $answer_block.find('.modal').attr('id','possible_text_answers-'+answer_id);
            

        }

    });
     // codeblock choice_btn   
    $(document).on('click', '.choice_btn', function () {
        var url = $(this).data('action');
        $.get(url, function (response) {
            $question_element = $(".multi_question_hidden:first").clone();
            $question_element.removeClass('multi_question_hidden');
            $question_element.find('input[type=text]').val("");
            $question_element.find('input[type=text]').each(function () {
                $(this).attr('data-name', 'field').attr('data-validation', 'required');
            });
            $question_element.find("input[type=checkbox]").attr('checked', false);
            $question_element.find(".add_new_answer").addClass('hidden');
            $question_element.find('input[name^=multi_question_id]').val(response.id);
            $question_element.find("input[name^=question_type]").val("choices");
            $question_element.find('.uploader').attr('id', 'questions_' + response.id);
            $question_element.find('.uploader').css({'height': '100%', 'width': '100%'});

            $question_element.find('.delete_Question').attr('data-action', '/admin/questions/' + response.id + '/delete');
            

            $('ol.questions').find(".collapse").click();
            $("ol.questions").append($question_element);
            $portlets = $('ol.questions').find("li.portlet.question");
             if($portlets.length != 0){
                $portlets.each(function(i){
                    i++;
                    $element = $(this).find('input[type=text],textarea,select').filter(':visible:first');
                    if ( $element.is( "select" ) ) {
                        caption = $(this).find('select option:selected').text();
                    }else{
                        caption = $element.val();
                    }
                    if (caption == ""){
                        caption = "Untitled !";
                    }
                    $question_order = $(this).find(".caption").find('.q_order');
                    if($question_order.length > 0){
                        var weight = $(this).find('input[name^=weight]').val();
                        
                        $(this).find(".caption").find('.q_order').html(i);
                        $(this).find(".caption").find('.q_content').html(caption);
                        $(this).find(".caption").find('.q_weight').html("( w = "+weight+" )");
                    }else{
                        $(this).find(".caption").html(caption);
                    }
                   
                });

            }
            //$("ol.questions").append($question_element).find('.delete_Question').attr('data-action', '/admin/questions/' + response.id + '/delete');
            $('html, body').animate({
                scrollTop: $question_element.offset().top
            }, 1000);

            runFineUploader('questions_' + response.id, 500000000000000, 0, 0, false, 'Question', 'file_id', response.id);
        });

    });
    // codeblock text_btn   
    $(document).on('click', '.text_btn', function () {
        var url = $(this).data('action');
        $.get(url, function (response) {
            $question_element = $(".text_question_hidden:first").clone();
            $question_element.removeClass('text_question_hidden');
            $question_element.find('input').val("");
            $question_element.find('input[type=text]').each(function () {
                $(this).attr('data-name', 'field').attr('data-validation', 'required');
            });
            $question_element.find('input[name^=multi_question_id]').val(response.id);
            $question_element.find("input[name^=question_type]").val("text");
            $question_element.find('.uploader').attr('id', 'questions_' + response.id);
            $question_element.find('.uploader').css({'height': '100%', 'width': '100%'});

            $question_element.find('.delete_Question').attr('data-action', '/admin/questions/' + response.id + '/delete');
            
            $('ol.questions').find(".collapse").click();
            $("ol.questions").append($question_element);
            $portlets = $('ol.questions').find("li.portlet.question");
             if($portlets.length != 0){
                $portlets.each(function(i){

                    i++;
                    $element = $(this).find('input[type=text],textarea,select').filter(':visible:first');
                    if ( $element.is( "select" ) ) {
                        caption = $(this).find('select option:selected').text();
                    }else{
                        caption = $element.val();
                    }
                    if (caption == ""){
                        caption = "Untitled !";
                    }
                    
                    $question_order = $(this).find(".caption").find('.q_order');
                    if($question_order.length > 0){
                        var weight = $(this).find('input[name^=weight]').val();
                        $(this).find(".caption").find('.q_order').html(i);
                        $(this).find(".caption").find('.q_content').html(caption);
                        $(this).find(".caption").find('.q_weight').html("( w = "+weight+" )");
                    }else{
                        $(this).find(".caption").html(caption);
                    }
                });

            }
            //$("ol.questions").append($question_element).find('.delete_Question').attr('data-action', '/admin/questions/' + response.id + '/delete');
            $('html, body').animate({
                scrollTop: $question_element.offset().top
            }, 1000);

            runFineUploader('questions_' + response.id, 500000000000000, 0, 0, false, 'Question', 'file_id', response.id);

        });
    });
     // codeblock delete_question   
    $(document).on('click', '.delete_Question', function () {
        appBlockUI();
        var url = $(this).data('action');
        $question = $(this).closest('li');
        console.log(url)
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (response) {
                $question.remove();
                appUnBlockUI();
                toastr.success('Deleted successfully')
            }
        });
    });

    $(document).on('click', '.remove-stuff', function (e) {//Delete from list
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
                    swal("Deleted!", 'Successfuly deleted', "success");
                    table.row($row).remove()
                        .draw()


                    ;
                },
                error: function () {
                    swal("Error", 'Something is wrong, Try again later', "error");
                }
            });

        });
    });
     // codeblock randomize    
    $(document).on('click', "input[name=randomize]", function () {
        if ($(this).is(':checked')) {
            $(".rand_num").removeClass('hidden');
        }
        else {
            $(".rand_num").addClass('hidden');
            $(".rand_num").find('input').val(null);
        }
    });



    // codeblock change_text_field  
    $(document).on('change', ".text_field", function () {

        
        if ($(this).is(':checked')) {
            console.log("checked");
            $textField = $(this).closest('.portlet-body').find('input.question_answers:first');
            $newTextField1 = $textField.clone();
            $textField.remove();
            $(this).closest('.portlet-body').find(".modal-body").html("");
            $(this).closest('.portlet-body').find(".modal-body").append($newTextField1);
            
            $newTextField1.tagsInput({
                'delimiter': ['Ω12345678910Ω'],
                'width':'450px',
                'defaultText':'Answer'

            });
            $(this).closest('.portlet-body').find(".passible_answers_btn").removeClass("hidden");
            
        }else{
            console.log("not checked");
            $textField = $(this).closest('.portlet-body').find('.modal-body').find('input.question_answers:first');
            $textField.val('');
            $textField.show();
            $textField.removeAttr("id").removeAttr("data-tagsinput-init");
             $newTextField = $textField.clone();
            $(this).closest('.portlet-body').find('.tagsinput').remove();
            
           
            $(this).closest('.portlet-body').find('div.input:first').find(".passible_answers_btn").before($newTextField);
            $textField.remove();
            $(this).closest('.portlet-body').find('div.input:first').find(".passible_answers_btn").addClass("hidden");
        }
    });
    // codeblock correct_answer   
    $(document).on('change', ".correct_answer", function () {
        $question_container = $(this).closest('.question');
        console.log($question_container);
        if ($(this).find('input[type=checkbox]').is(':checked')) {
            console.log($question_container.find('input[name=correctness_validation]').val());
            $question_container.find('input[name=correctness_validation]').val(1);
            $(this).find('input[type=checkbox]').attr('name', 'correct_answers[]').val(1);
            $(this).find('input[type=hidden]').attr('name', '')
        }
        else {
            console.log($question_container.find('input[name=correctness_validation]').val());

            $question_container.find('input[name=correctness_validation]').attr('value', '');
            $(this).find('input[type=checkbox]').attr('name', '');
            $(this).find('input[type=hidden]').attr('name', 'correct_answers[]').val(0)
        }
    });
     // codeblock answer_field    
    $(document).on('change', ".answer_field", function () {

        if ($(this).find('input[type=checkbox]').is(':checked')) {
            $(this).find('input[type=checkbox]').attr('name', 'answer_field[]').val(1);
            $(this).find('input[type=hidden]').attr('name', '')
        }
        else {
            $(this).find('input[type=checkbox]').attr('name', '');
            $(this).find('input[type=hidden]').attr('name', 'answer_field[]').val(0)

        }
    });
    // codeblock text_field   
    $(document).on("change", '.text_field', function () {
        $question_container = $(this).closest('.question');
        $question_container.find('input[name^=answer_field][type=checkbox]').prop('checked', false).attr('name', '').change();
        $question_container.find('.answer_field').find('input[type=hidden]').attr('name', 'answer_field[]');
        // $(this).prop('checked', true);
    });
     // codeblock correct   
    $(document).on('change', '.correct', function () {
        var question_type = $(this).closest('.choice_answers').prev().prev().find('select[name^=question_choices_type]').val();
        $question_container = $(this).closest('.question');
        if (question_type === "Radio") {
            $question_container.find('input[name^=correct_answers][type=checkbox]').prop('checked', false).attr('name', '');
            $question_container.find('.correct_answer').find('input[type=hidden]').attr('name', 'correct_answers[]');
            $(this).prop('checked', true);
        }
    });
    // codeblock add_new_text_answer     
    $(document).on('click', '.add_new_text_answer', function () {
        var qusetion_id = $(this).closest('.question').find('input[name^=multi_question_id]').val();
        $answer_element = $('.hidden_text_answers:first').clone();
        $answer_element.removeClass('hidden_text_answers').removeClass('hidden').addClass('answer_block');
        $answer_element.find('input[type=text]').each(function () {
            $(this).attr('data-name', ' Text answer').attr('data-validation', 'required');
        });
        $answer_element.find('input[name^=answer_id]').val(qusetion_id);
        $answer_element.find('input[type=text]').val("");
        $answer_element.find('input[type=text]').each(function () {
            $(this).attr('data-validation', 'required').attr('data-name', 'answer');
        });
        $(this).closest('.text_answers').append($answer_element);
    });
     // codeblock remove_file     
    $(document).on('click', '.removefile', function () {
        $(this).closest('.form-group').next().removeClass('hidden');
    });

    $(document).on('change', 'select[name^=answer_type]', function () {
        // $choices_answers = $(this).closest('.answer_type').next().next().next();
        // console.log($choices_answers);
        // var choice_id = $choices_answers.find('.question_answer').find('input[name^=answer_id]').val();
        // $choices_answers.html('');
        // console.log(choice_id);
        // if(choice_id!==undefined){
        //     $.post('/admin/questions/remove_choices', {'id': choice_id});
        // }
    });

});
  // codeblock uploaderComplete     
function uploaderComplete($selector) {
    $('#' + $selector).parent().parent().find('input[name^=question_content]').attr('data-validation', '')
}
  // codeblock uploader_remove     
function uploaderRemove($selector) {
    $('#' + $selector).parent().parent().find('input[name^=question_content]').attr('data-validation', 'required')
}
  // codeblock remove_answer_field     
$(document).on('click', '.remove_answer_field', function () {
    //console.log($(this).closest('div.answer_block'));
    $(this).closest('div.answer_block').remove();
    var choice_id = $(this).closest('div.answer_block').find('input[name^=question_choices_id]').val();
    $.post('/admin/questions/remove_choices', {'id': choice_id});
});
   // codeblock ajaxFormBeforeSerialize   
function ajaxFormBeforeSerialize() {
    // $text_answers = $("input[name^=question_answers]");
    // $text_answers.each(function (index) {
    //     $is_tags_input = $(this).closest('div.input').find(".tagsinput");
    //     if($is_tags_input.length > 0){
    //         current_value = $(this).val();
    //         to_array = current_value.split("Ω12345678910Ω");
    //         $(this).val(to_array);
    //         alert(to_array);
    //         console.log($(this).val());
    //     }
    // });
    $("ol.questions").find('li').each(function (index) {
        var id = $("input[name^=multi_question_id]").eq(index).val();
        console.log(id);
        $(this).attr('id', 'item_' + id);
    });
    var postData = $('.ordering').sortable('serialize');
    var quiz_id = $(".quiz_id").val();
    $cloned = window.location.search.indexOf('clone=1');

    if ( $cloned == -1){
        $.post('/admin/questions/order', {'order': postData, 'quiz_id': quiz_id}, function () {
        });
    }

}