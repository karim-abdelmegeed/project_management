// $(document).on('ready pjax:success', function () {

var group = $("ol.ordering").sortable({
    group: 'ordering',
    delay: 500,
    onDrop: function ($item, container, _super) {
        _super($item, container);
    }
});

var group= $("ol.drop_targets").sortable({
    group: 'drop_targets',
    nested: true,
    // containerSelector: "ol",
    // vertical: false,
    delay: 500,
    exclude: '.not-moving',

    isValidTarget: function  ($item, container) {
        if(
            (container.el.is('.map') && $item.is('.module')) ||
            (container.el.is('.module_map') && $item.is('.lesson')) ||
            (container.el.is('.lesson_map') && $item.is('.topic')) ||

            ($item.parent().is('.map') && container.el.is('.modules')) ||
            ($item.parent().is('.module_map') && container.el.is('.lessons')) ||
            ($item.parent().is('.lesson_map') && container.el.is('.topics'))
        ){

            return true;
       } else {

           return $item.parent("ol")[0] == container.el[0];
       }
    },
    onDrop: function($item, container, _super) {
        $item.find('ol.drop_targets').sortable('enable');
        if ($item.is('.module')){
            if($item.parent().is('.map')){//module
                if (! $item.children().is('ol')){
                    $item.append('<ol class="module_map">  </ol>')
                }
                if($("li").hasClass('lesson')){
                    $("li.lesson").removeClass('not-moving');
                }
            }
        }
        if ($item.is('.lesson') && $item.parent().is('.module_map')){ // lesson
            if (! $item.children().is('ol')){
                $item.append('<ol class="lesson_map">  </ol>')
            }
            if($("li").hasClass('topic')){
                $("li.topic").removeClass('not-moving');
            }
        }
         if (! container.el.is('.map')){
            if ($('ol.map').children().length == 0 ){
                if($("li").hasClass('lesson')){
                    $("li.lesson").addClass('not-moving');
                }
                if($("li").hasClass('topic')){
                    $("li.topic").addClass('not-moving');
                }
            }
        }
        var data = $('ol.map').sortable("serialize").get();
        var jsonString = JSON.stringify(data, null, ' ');
        $('#map_output2').text(jsonString);
        $('.map_output2').val(jsonString);
        _super($item, container);
    }
});

var group = $("ol.serialization").sortable({
    group: 'serialization',
    delay: 500,
    onDrop: function ($item, container, _super) {
        var data = group.sortable("serialize").get();
        var jsonString = JSON.stringify(data, null, ' ');

        // $('#serialize_output2').text(jsonString);
        $('.serialize_output2').val(jsonString);
        _super($item, container);
    }
});
// });
