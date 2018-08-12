$(document).on('ready pjax:success', function () {
    $('#objectives.dd').nestable();
    var lessonsOptions = {
        moves: function (el, source, handle, sibling) {
            return !el.classList.contains('topics-area');
        },
        accepts: function (el, target, source, sibling) {
            if (target.id == 'lessons' && source.id != 'lessons') {
                return false
            }
            return true;
        },
    };
    var drLessons = dragula([document.querySelector('#lessons')], lessonsOptions);
    $('.lessons-area').each(function () {
        drLessons.containers.push($(this)[0]);
    });
    var moduleOptions = {
        moves: function (el, source, handle, sibling) {
            return !el.classList.contains('lessons-area');
        },
        accepts: function (el, target, source, sibling) {
            if (target.id == 'modules' && source.id != 'modules') {
                return false
            }
            return true;
        },
    };
    var drModules = dragula([document.querySelector('#modules'), document.querySelector('#modules-area')], moduleOptions);
    var topicsOptions = {
        accepts: function (el, target, source, sibling) {
            if (target.id == 'topics' && source.id != 'topics') {
                return false
            }
            return true;
        },
    };
    var drTopics = dragula([document.querySelector('#topics')], topicsOptions);
    $('.topics-area').each(function () {
        drTopics.containers.push($(this)[0]);
    });
    drLessons.on('drop', function (el, target, source, sibling) {
        if (source.id == 'lessons' && $(target).hasClass('lessons-area')) {
            $topicsArea = $('<div class="topics-area bordered"></div>');
            $(el).append($topicsArea);
            drTopics.containers.push($topicsArea[0]);
        }
    });
    drModules.on('drop', function (el, target, source, sibling) {
        if (source.id == 'modules' && target.id == 'modules-area') {
            $lessonsArea = $('<div class="lessons-area bordered"></div>');
            $(el).append($lessonsArea);
            drLessons.containers.push($lessonsArea[0]);
        }
    });
    $(document).on('mouseover', '.lessons-area .lesson', function () {
        drModules.containers = [];
    })
    $(document).on('mouseout', '.lessons-area .lesson', function () {
        drModules.containers = [document.querySelector('#modules'), document.querySelector('#modules-area')];
    });
    $(document).on('mouseover', '.topics-area .topic', function () {
        drLessons.containers = [];
    })
    $(document).on('mouseout', '.topics-area .topic', function () {
        drLessons.containers = [document.querySelector('#lessons')];
        $('.lessons-area').each(function () {
            drLessons.containers.push($(this)[0]);
        });
    });
});
$(document).on('click', '#add_objective', function () {
//    $.post($(this).data('url'), function (data) {
    var $objective = $('#hidden').find('.objective').clone();
    $objective.attr('data-id', $('#objectives .objective').length + 1);
    $('#objectives').first().children('ol').append($objective);
//    $objective.data('id', data.id);
//    $objective.find('input[name=id]').val(data.id);
//    });
});

$(document).on('click', '#add_module', function () {
    App.blockUI();
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        var $module = $('#hidden .module').clone();
        $module.attr('data-id', data.id);
        $module.find('.remove_unit').attr('data-action', data.remove_action);
        $('#modules').append($module);
    }).complete(function () {
        App.unblockUI();
    });
});
$(document).on('click', '#add_lesson', function () {
    App.blockUI();
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        var $lesson = $('#hidden .lesson').clone();
        $lesson.attr('data-id', data.id);
        $lesson.find('.remove_unit').attr('data-action', data.remove_action);
        $('#lessons').append($lesson);
    }).complete(function () {
        App.unblockUI();
    });
});
$(document).on('click', '#add_topic', function () {
    App.blockUI();
    var url = $(this).data('action');
    $.post(url).success(function (data) {
        var $topic = $('#hidden .topic').clone();
        $topic.attr('data-id', data.id);
        $topic.find('.remove_unit').attr('data-action', data.remove_action);
        $('#topics').append($topic);
    }).complete(function () {
        App.unblockUI();
    });
});
$(document).on('click', '#save, #publish', function () {
//    App.blockUI();
    var url = $(this).data('action');
    var data = {};
    data.main = {};
    data.lists = {};
    data.lists.modules = [];
    data.lists.lessons = [];
    data.lists.topics = [];
    data.map = {};
    data.map.modules = [];
    data.map.lessons = [];
    data.map.topics = [];
    $('#modules .module').each(function () {
        var module = {};
        module.id = $(this).data('id');
        module.title = $(this).find('[name=title]').val();
        data.lists.modules.push(module);
    });
    $('#lessons .lesson').each(function () {
        var lesson = {};
        lesson.id = $(this).data('id');
        lesson.title = $(this).find('[name=title]').val();
        data.lists.lessons.push(lesson);
    });
    $('#topics .topic').each(function () {
        var topic = {};
        topic.id = $(this).data('id');
        topic.title = $(this).find('[name=title]').val();
        data.lists.topics.push(topic);
    });
    $('#modules-area .module').each(function (index) {
        var module = {};
        module.id = $(this).data('id');
        module.title = $(this).find('[name=title]').val();
        module.stuff_order = index + 1;
        data.map.modules.push(module);
        $(this).find('.lessons-area .lesson').each(function (index) {
            var lesson = {};
            lesson.id = $(this).data('id');
            lesson.title = $(this).find('[name=title]').val();
            lesson.module = module.id;
            lesson.stuff_order = index + 1;
            data.map.lessons.push(lesson);
            $(this).find('.topics-area .topic').each(function (index) {
                var topic = {};
                topic.id = $(this).data('id');
                topic.title = $(this).find('[name=title]').val();
                topic.lesson = lesson.id;
                topic.stuff_order = index + 1;
                data.map.topics.push(topic);
            });
        });
    });

    $.ajax({
        url: url,
        method: "patch",
        data: data,
        success: function (data) {

        },
        complete: function () {
            App.unblockUI();
        }
    })
});
$(document).on('click', '.remove_unit', function () {
    var parent = this;
    this.blocked = this.blocked || false;
    if (this.blocked) {
        return;
    }
    this.blocked = true;
    var url = $(this).data('action');
    var $unit = $(this).closest('.unit');
    $.ajax({
        url: url,
        method: 'delete',
        success: function (data) {
            $unit.remove();
        },
        complete: function (data) {
            parent.blocked = false;
        }
    });
})