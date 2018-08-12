<div>
    <label class="radio-inline">
        <input type="radio" name="task_status" value="All" checked>All
    </label>

    <label class="radio-inline">
        <input type="radio" name="task_status" value="do">Tasks I should do
    </label>

    <label class="radio-inline">
        <input type="radio" name="task_status" value="follow">Tasks I follow
    </label>

    <label class="radio-inline">
        <input type="radio" name="task_status" value="finished">Tasks finished
    </label>

    <br>
    <label> Available Scales</label>


    <label class="radio-inline">
        <input type="radio" name="scales" value="week">Week
    </label>

    <label class="radio-inline">
        <input type="radio" name="scales" value="month">Month
    </label>
    <label class="radio-inline">
        <input type="radio" name="scales" value="year">Year
    </label>

    <div style="text-align: center;height: 40px;line-height: 40px;">
        <button class="btn btn-primary" type="button" onclick="toggleMode(this)">Zoom to Fit</button>
    </div>

    <div class="form-group">
        <button class="btn btn-warning" type="button" id="up">Up</button>
    </div>

    <ol class="breadcrumb tasks_breadcrumb">
    </ol>
    <div>
        <div id="gantt_here" class="gantt"></div>
        <input type="hidden" id="user_color" value="{{Auth::user()->color}}"/>
    </div>
</div>


<script>
    gantt.attachEvent('onGanttReady', function () {
        $(".gantt").height($("#m_aside_left").height() - 180);

    });
    $(window).resize(function () {
        $(".gantt").height($("#m_aside_left").height() - 180);
    });
    $("#m_aside_left_minimize_toggle").on("click", function () {
        $(".gantt").width(1400 - ($("#m_aside_left_minimize_toggle").width()));
        gantt.init("gantt_here");

    });


</script>

<script type="text/javascript">

    var colHeader = '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="gantt.createTask()"></div>',
        colContent = function (task) {

            return ('<i class="fa gantt_button_grid gantt_grid_edit fa-eye" onclick="clickGridButton(' + task.id + ',\'edit\')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_add fa-plus" onclick="clickGridButton(' + task.id + ',\'add\')"></i>' +
            '<a class="fa gantt_button_grid gantt_grid_delete fa-star popup" href=' + '/task/task_rating/' + task.id + '></a>')
        };
    let date_to_str = gantt.date.date_to_str(gantt.config.task_date);

    var today = new Date(Date.now());

    gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Today",
        title: "Today: " + date_to_str(today)
    });


    gantt.config.columns = [
        {name: "text", tree: true, width: '130px', resize: true},
        {name: "duration", align: "center"},
        {
            name: "owner", width: 60, align: "center", template: function (item) {
            return byId(gantt.serverList('staff'), item.owner_id)
        }
        },
        {
            name: "priority", width: 60, align: "center", template: function (item) {
            return byId(gantt.serverList('priority'), item.priority)
        }
        },
        {
            name: "buttons",
            label: colHeader,
            width: 200,
            template: colContent
        }
    ];
    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.branch_loading = true;
    gantt.config.static_background = true;
    gantt.config.step = 1;
    gantt.config.autoscroll_speed = 50;
    gantt.config.grid_width = 420;
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    gantt.config.work_time = true;
    gantt.config.start_on_monday = false;

    gantt.templates.scale_cell_class = function (date) {
        if (date.getDay() == 5 || date.getDay() == 6) {
            console.log(date);
            return "weekend";
        }

    };
    gantt.templates.task_cell_class = function (item, date) {
        if (date.getDay() == 0 || date.getDay() == 6) {
            return "weekend"
        }
    };
    gantt.autoSchedule();

    var holidays = [
        new Date(2018, 5, 17),
        new Date(2018, 7, 21),
        new Date(2018, 7, 22),
        new Date(2018, 7, 23),
        new Date(2018, 7, 24),
    ];

    for (var i = 0; i < holidays.length; i++) {
        gantt.setWorkTime({
            date: holidays[i],
            hours: false
        });

    }
    gantt.setWorkTime({day: 5, hours: false});
    gantt.setWorkTime({day: 6, hours: false});
    gantt.setWorkTime({day: 0, hours: true});


    gantt.serverList("staff", <?php echo $users ?>);
    gantt.serverList("priority", <?php echo $priority;?>);

    // end test data
    gantt.config.open_tree_initially = true;
    gantt.config.auto_scheduling = true;
    gantt.config.auto_scheduling_strict = true;


    var labels = gantt.locale.labels;
    labels.column_priority = labels.section_priority = "Priority";
    labels.column_owner = labels.section_owner = "Owner";

    function byId(list, id) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].key == id)
                return list[i].label || "";
        }
        return "";
    }

    gantt.config.lightbox.sections = [
        {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
        {name: "priority", height: 22, map_to: "priority", type: "select", options: gantt.serverList("priority")},

        {
            name: "owner", height: 22, map_to: "owner_id", type: "select", options: gantt.serverList("staff"),
            default_value:{{\Illuminate\Support\Facades\Auth::id()}}
            , onchange: function () {
            $.get('/user/get_user_color/' + $(this).val(), function (res) {
                $('#user_color').val(res.color)
            });
        }
        },
        {name: "time", type: "duration", map_to: "auto"}
    ];

    gantt.templates.rightside_text = function (start, end, task) {
        return byId(gantt.serverList('staff'), task.owner_id);
    };
    gantt.templates.grid_row_class =
        gantt.templates.task_row_class =
            gantt.templates.task_class = function (start, end, task) {
                var css = [];
                if (task.$virtual || task.type == gantt.config.types.project)
                    css.push("summary-bar");

                if (task.owner_id) {
                    css.push("gantt_resource_task gantt_resource_" + task.owner_id);
                }

                return css.join(" ");
            };
    gantt.attachEvent("onLoadEnd", function () {
//        zoomToFit();

        var styleId = "dynamicGanttStyles";
        var element = document.getElementById(styleId);
        if (!element) {
            element = document.createElement("style");
            element.id = styleId;
            document.querySelector("head").appendChild(element);
        }
        var html = [];
        var resources = gantt.serverList("staff");

        resources.forEach(function (r) {
            html.push(".gantt_task_line.gantt_resource_" + r.id + "{" +
                "background-color:" + r.backgroundColor + "; " +
                "color:" + r.textColor + ";" +
                "}");
            html.push(".gantt_row.gantt_resource_" + r.id + " .gantt_cell:nth-child(1) .gantt_tree_content{" +
                "background-color:" + r.backgroundColor + "; " +
                "color:" + r.textColor + ";" +
                "}");
        });
        element.innerHTML = html.join("");
    });

    $(document).on("click", ".task_item", function () {
        var task_id = $(this).attr("id");
        $(".tasks_breadcrumb").text('');
        $(".tasks_breadcrumb").append('<li class="breadcrumb-item task_item"><a href="#">Root</a></li>');

        if (task_id) {
            $.get('/get_task_parents/' + task_id, function (res) {
                res.tasks.forEach(function (element) {
                    $(".tasks_breadcrumb").append('<li class="breadcrumb-item task_item" id="' + element.id + '"><a href="#">' + element.text + '</a></li>');

                });
            });
            gantt.clearAll();
            gantt.load('/api/selectedChildren/' + task_id);
        }
        else {
            gantt.clearAll();
            gantt.load("/api/data");
        }

    });


    gantt.attachEvent("onAfterTaskAdd", function (id, item) {
        gantt.getTask(id).color = $('#user_color').val();
    });
    function zoomToFit() {
        appBlockUI();

        var project = gantt.getSubtaskDates(),
            areaWidth = gantt.$task.offsetWidth;

        for (var i = 0; i < scaleConfigs.length; i++) {
            var columnCount = getUnitsBetween(project.start_date, project.end_date, scaleConfigs[i].unit, scaleConfigs[i].step);
            if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
                break;
            }
        }

        if (i == scaleConfigs.length) {
            i--;
        }

        applyConfig(scaleConfigs[i], project);
        gantt.render();
        appUnBlockUI();

    }

    function getUnitsBetween(from, to, unit, step) {
        var start = new Date(from),
            end = new Date(to);
        var units = 0;
        while (start.valueOf() < end.valueOf()) {
            units++;
            start = gantt.date.add(start, step, unit);
        }
        return units;
    }
    function toggleMode(toggle) {
        toggle.enabled = !toggle.enabled;
        if (toggle.enabled) {
            toggle.innerHTML = "Set default Scale";
            saveConfig();
            zoomToFit();

        } else {

            toggle.innerHTML = "Zoom to Fit";
            restoreConfig();
            gantt.render();
        }
    }
    function saveConfig() {
        var config = gantt.config;
        cachedSettings = {};
        cachedSettings.scale_unit = config.scale_unit;
        cachedSettings.date_scale = config.date_scale;
        cachedSettings.step = config.step;
        cachedSettings.subscales = config.subscales;
        cachedSettings.template = gantt.templates.date_scale;
        cachedSettings.start_date = config.start_date;
        cachedSettings.end_date = config.end_date;
    }

    function restoreConfig() {
        applyConfig(cachedSettings);
    }


    var scaleConfigs = [
        // minutes
        {
            unit: "minute", step: 1, scale_unit: "hour", date_scale: "%H", subscales: [
            {unit: "minute", step: 1, date: "%H:%i"}
        ]
        },
        // hours
        {
            unit: "hour", step: 1, scale_unit: "day", date_scale: "%j %M",
            subscales: [
                {unit: "hour", step: 1, date: "%H:%i"}
            ]
        },
        // days
        {
            unit: "day", step: 1, scale_unit: "month", date_scale: "%F",
            subscales: [
                {unit: "day", step: 1, date: "%j"}
            ]
        },
        // weeks
        {
            unit: "week", step: 1, scale_unit: "month", date_scale: "%F",
            subscales: [
                {
                    unit: "week", step: 1, template: function (date) {
                    var dateToStr = gantt.date.date_to_str("%d %M");
                    var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                }
                }
            ]
        },
        // months
        {
            unit: "month", step: 1, scale_unit: "year", date_scale: "%Y",
            subscales: [
                {unit: "month", step: 1, date: "%M"}
            ]
        },
        // quarters
        {
            unit: "month", step: 3, scale_unit: "year", date_scale: "%Y",
            subscales: [
                {
                    unit: "month", step: 3, template: function (date) {
                    var dateToStr = gantt.date.date_to_str("%M");
                    var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                }
                }
            ]
        },
        // years
        {
            unit: "year", step: 1, scale_unit: "year", date_scale: "%Y",
            subscales: [
                {
                    unit: "year", step: 5, template: function (date) {
                    var dateToStr = gantt.date.date_to_str("%Y");
                    var endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                }
                }
            ]
        },
        // decades
        {
            unit: "year", step: 10, scale_unit: "year", template: function (date) {
            var dateToStr = gantt.date.date_to_str("%Y");
            var endDate = gantt.date.add(gantt.date.add(date, 10, "year"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
        },
            subscales: [
                {
                    unit: "year", step: 100, template: function (date) {
                    var dateToStr = gantt.date.date_to_str("%Y");
                    var endDate = gantt.date.add(gantt.date.add(date, 100, "year"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                }
                }
            ]
        }
    ];

    function applyConfig(config, dates) {
        gantt.config.scale_unit = config.scale_unit;
        if (config.date_scale) {
            gantt.config.date_scale = config.date_scale;
            gantt.templates.date_scale = null;
        }
        else {
            gantt.templates.date_scale = config.template;
        }

        gantt.config.step = config.step;
        gantt.config.subscales = config.subscales;

        if (dates) {
            gantt.config.start_date = gantt.date.add(dates.start_date, -1, config.unit);
            gantt.config.end_date = gantt.date.add(gantt.date[config.unit + "_start"](dates.end_date), 2, config.unit);
        } else {
            gantt.config.start_date = gantt.config.end_date = null;
        }
    }

    function initPopup() {
        $('.popup').magnificPopup({
            type: 'iframe',
            callbacks: {
                open: function () {
                    if (typeof popupExtraAcions !== "undefined") {
                        popupExtraAcions();
                    }
                },
                close: function () {
                }
            }
        });
    }

    gantt.attachEvent("onDataRender", function () {
        initPopup();
    });
    gantt.attachEvent("onTemplatesReady", function () {
        var toggle = document.createElement("i");
        toggle.className = "fa fa-expand gantt-fullscreen";
        gantt.toggleIcon = toggle;
        gantt.$container.appendChild(toggle);
        toggle.onclick = function () {
            if (!gantt.getState().fullscreen) {
                gantt.expand();
            }
            else {
                gantt.collapse();
            }
        };
    });
    gantt.init("gantt_here");
    gantt.load("/api/data");
    var dp = new gantt.dataProcessor("/api");
    dp.init(gantt);
    dp.setTransactionMode("REST");
    dp.attachEvent("onAfterUpdate", function (id, action, tid, response) {
        if (action === "inserted") {
            $.get('/task/add_task_allocator/' + tid)
        }
    });

    function clickGridButton(id, action) {
        switch (action) {
            case "edit":
                gantt.clearAll();
                $(".tasks_breadcrumb").text('');
                $(".tasks_breadcrumb").append('<li class="breadcrumb-item task_item"><a href="#">Root</a></li>');

                gantt.load('/api/selectedChildren/' + id);
                $.get('/get_task_parents/' + id, function (res) {
                    res.tasks.forEach(function (element) {
                        $(".tasks_breadcrumb").append('<li class="breadcrumb-item task_item" id="' + element.id + '"><a href="#">' + element.text + '</a></li>');

                    });
                });
                break;
            case "add":
                gantt.createTask(null, id);
                break;
            case "delete":
                gantt.confirm({
                    title: gantt.locale.labels.confirm_deleting_title,
                    text: gantt.locale.labels.confirm_deleting,
                    callback: function (res) {
                        if (res)
                            gantt.deleteTask(id);
                        $(".tasks_breadcrumb").find("li#" + id).hide();
                    }
                });
                break;

        }
    }


</script>
<script>
    $(document).on("change", "input[name=task_status]", function () {
        $(".tasks_breadcrumb").text('');
        if ($(this).val() === "All") {
            gantt.clearAll();
            gantt.load("/api/data");
        }
        else if ($(this).val() === "do") {
            gantt.clearAll();
            gantt.load('/task/tasks_i_should_do');
        }
        else if ($(this).val() === "finished") {
            gantt.clearAll();
            gantt.load('/task/finished');
        }
        else if ($(this).val() === "follow") {
            gantt.clearAll();
            gantt.load('/task/tasks_i_follow');
        }
    });
</script>
<script>
    $(document).on('change', 'input[name=scales]', function () {
        var value = $(this).val();
        setScaleConfig(value);
        gantt.render();
    });
    function setScaleConfig(level) {
        switch (level) {
            case "day":
                gantt.config.scale_unit = "day";
                gantt.config.step = 1;
                gantt.config.date_scale = "%d %M";
                gantt.config.subscales = [];
                gantt.config.scale_height = 27;
                gantt.templates.date_scale = null;
                break;
            case "month":
                var weekScaleTemplate = function (date) {
                    var dateToStr = gantt.date.date_to_str("%M");
                    var startDate = gantt.date.week_start(new Date(date));
                    var endDate = gantt.date.add(gantt.date.add(startDate, 1, "week"), -1, "day");
                    return dateToStr(startDate) + " - " + dateToStr(endDate);
                };

                gantt.config.scale_unit = "month";
                gantt.config.step = 1;
                gantt.templates.date_scale = weekScaleTemplate;
                gantt.config.subscales = [
                    {unit: "week", step: 1, date: " week #%W"}
                ];
                gantt.config.scale_height = 50;
                break;
            case "week":
                gantt.config.scale_unit = "month";
                gantt.config.step = 1;
                gantt.config.date_scale = "%F, %Y";
                gantt.config.min_column_width = 50;

                gantt.config.scale_height = 90;

                var weekScaleTemplate = function (date) {
                    var dateToStr = gantt.date.date_to_str("%d %M");
                    var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                    return dateToStr(date) + " - " + dateToStr(endDate);
                };

                gantt.config.subscales = [
                    {unit: "week", step: 1, template: weekScaleTemplate},
                    {unit: "day", step: 1, date: "%D %d"}
                ];
                break;
            case "year":
                gantt.config.scale_unit = "year";
                gantt.config.step = 1;
                gantt.config.date_scale = "%Y";
                gantt.templates.date_scale = null;

                gantt.config.min_column_width = 50;
                gantt.config.scale_height = 90;

                gantt.config.subscales = [
                    {unit: "month", step: 1, date: "%M"},
                ];
                break;
        }
    }
</script>
<script>

    gantt.attachEvent("onExpand", function () {
        var icon = gantt.toggleIcon;
        if (icon) {
            icon.className = icon.className.replace("fa-expand", "fa-compress");
        }
        $("#gantt_here").css('z-index', 100000000);
        $("#m_aside_left").css('z-index', -1);
    });
    gantt.attachEvent("onCollapse", function () {
        var icon = gantt.toggleIcon;
        if (icon) {
            icon.className = icon.className.replace("fa-compress", "fa-expand");
        }
        $("#gantt_here").css('z-index', 0);
        $("#m_aside_left").css('z-index', 0)


    });
</script>
<script>
    $(document).on('click', '.gantt_delete_btn', function () {
        $(this).closest('.gantt_cal_light').css('z-index', 0)
    });
</script>
<script>
   $(document).on('click','#up',function () {
       let task_id=gantt.getSelectedId();
        if(task_id != null){
           
        }
   });
</script>