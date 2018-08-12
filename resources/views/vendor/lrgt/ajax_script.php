<script>
    <?php
    if (!isset($form)) {
        $form = 'form';
    }
    if (!isset($on_start)) {
        $on_start = false;
    }
    if (!isset($auto_focus)) {
        $auto_focus = true;
    }
    ?>
    var validated = false;
    var button_submit = false;
    //    var my_form = $('<?//=$form?>//');
    //    var name_class = '<?//=$request?>//';
    //    var on_start = '<?//=$on_start?>//';
    var auto_focus = '<?=$auto_focus?>';

    //    initialize( my_form, name_class, on_start);

    function initialize(my_form, name_class, on_start) {

        my_form.on('submit', function () {

            appBlockUI();
            if (validated == true) {
                var $form = $(this);

                return true;
            } else {

                return validate(my_form, name_class, on_start, auto_focus);
            }
        });

        my_form.find("input[type=submit]").on('click', function (e) {

            e.preventDefault();
            button_submit = true;
            validate(my_form, name_class, on_start, auto_focus);
        });



        my_form.find('.form-group').append('<div class="help-block with-errors"></div>');


        my_form.find(':input').each(function () {
            $(this).on('change', function () {
                //validate(my_form, name_class , on_start, auto_focus);
            });
        });

        if (on_start == '1') {
            validate(my_form, name_class, on_start, auto_focus);
        }

        if (auto_focus) {
            $(':input:enabled:visible:first').focus();
        }
    }

    function removeSerialize(thisArray, thisName) {
        "use strict";
        return thisArray.filter(function (item) {
            return item.name != thisName;
        });
    }

    function validate(my_form, name_class, on_start, auto_focus, step=false) {
        appBlockUI();
        // console.log(my_form, name_class, on_start, auto_focus);
        var data = my_form.serializeArray();

        //data = removeSerialize(data,'users[]');


        data.push({name: 'class', value: name_class});
        console.log(data);
        for (var i = 0; i < data.length; i++) {

            item = data[i];
            $name = item.name;
//			console.log(i+ " - "+$name);
            if (item.name == '_method') {
                data.splice(i, 1);
            }
            if (item.name.includes("[]")) {
                data.splice(i, 1);

                $name = $name.replace('[]', '');

            }
            $element = $("*[name=" + $name + "]");

            if ($element.hasClass("no_validation")) {
                data.splice(i, 1);

            }

            if ($element.hasClass("no_validation") || item.name.includes("[]")) {
                i--;
            }


        }

        //console.log(data);
        $.ajax({
            url: '<?=url('validation')?>',
            type: 'post',
            data: $.param(data),
            dataType: 'json',
            success: function (data) {
                appUnBlockUI();
                if (data.success) {
                    formFields = my_form.serializeArray();

                    for (var i = 0; i < formFields.length; i++) {
                        item = formFields[i];
                        if (item.name.includes("[]")) {
                            formFields.splice(i, 1);
                            i--;
                        }
                    }
                    $.each(formFields, function (i, field) {
                        var father = $('#' + field.name).parent('.form-group');
                        father.removeClass('has-error');
                        father.addClass('has-success');
                        father.find('.help-block').html('');
                    });

                    validated = true;

                    if (button_submit == true) {

                        if(!step){
                            my_form.submit();
                        }
                    }
                    if (typeof goToNextStep === "function" && step) {
                        goToNextStep();
                    }
                } else {
                    var campos_error = [];

                    $.each(data.errors, function (key, data) {
                        var campo = $('#' + key);
                        var father = campo.parents('.form-group');
                        console.log(father)
                        father.removeClass('has-success');
                        father.addClass('has-error');
                        father.find('.help-block').html(data[0]);
                        campos_error.push(key);
                    });
                    $('html, body').animate({
                        scrollTop: $('.has-error:first').offset().top - 100
                    }, 500);
                    $('.has-error:first').find('input[type=text],textarea,select').filter(':visible:first').focus();
                    formFields = my_form.serializeArray();

                    for (var i = 0; i < formFields.length; i++) {
                        item = formFields[i];

                        if (item.name.includes("[]")) {
                            formFields.splice(i, 1);
                            i--;
                        }
                    }
                    $.each(formFields, function (i, field) {
                        if ($.inArray(field.name, campos_error) === -1) {
                            var father = $('#' + field.name).parent('.form-group');
                            father.removeClass('has-error');
                            father.addClass('has-success');
                            father.find('.help-block').html('');
                        }
                    });

                    validated = false;
                    button_submit = false;
                }
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });
        return false;
    }
</script>