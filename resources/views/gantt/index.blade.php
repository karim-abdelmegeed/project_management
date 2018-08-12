<!DOCTYPE html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    @include('admin_includes.styles')
    @include('admin_includes.scripts')
    <script src="{{asset('./dhtmlxgantt.js')}}"></script>
    <link href="{{asset('./dhtmlxgantt.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('dhtmlxgantt_broadway.css?v=20180322')}}">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css?v=20180322">
    <script src="{{asset('dhtmlxgantt_smart_rendering.js?v=20180322')}}"></script>
    <script src="{{asset('dhtmlxgantt_fullscreen.js')}}"></script>
    <style type="text/css">
        .gantt-error {
            display: none;
        }
        html, body{
            height:100%;
            padding:0px;
            margin:0px;
            overflow: hidden;
        }

        .fa {
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            opacity: 0.2;
            padding: 5px;
        }

        .fa:hover {
            opacity: 1;
        }

        .fa-eye {
            color: #ffa011;
        }

        .fa-plus {
            color: #328EA0;
        }

        .fa-times {
            color: red;
        }
    </style>
</head>
<body>
<div id="gantt_tree"></div>


<div style="text-align: center;height: 40px;line-height: 40px;display: none" >
    <button style="height: 34px;line-height: 30px;margin:3px auto" onclick="toggleMode(this)">Zoom to Fit</button>
</div>
<div id="gantt_here" style='width:100%; height:40%;'></div>

<script type="text/javascript">
    var colHeader = '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="gantt.createTask()"></div>',
     colContent = function (task) {
            return ('<i class="fa gantt_button_grid gantt_grid_edit fa-eye" onclick="clickGridButton(' + task.id + ', \'edit\')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_add fa-plus" onclick="clickGridButton(' + task.id + ', \'add\')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_delete fa-times" onclick="clickGridButton(' + task.id + ', \'delete\')"></i>');
        };
    gantt.config.columns = [
        {name: "text", tree: true, width: '*', resize: true},
        {name: "start_date", align: "center", resize: true},
        {name: "duration", align: "center"},
        {
            name: "buttons",
            label: colHeader,
            width: 75,
            template: colContent
        }
    ];

    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
    gantt.config.branch_loading = true;
    gantt.config.static_background = true;
    gantt.config.scale_unit = "month";
    gantt.config.step = 1;
    gantt.config.autoscroll_speed = 50;
    gantt.config.scale_unit = "month";
    gantt.config.open_tree_initially = true;

    gantt.config.subscales = [
        {unit:"day",  step:1, date:"%D" }
    ];

    gantt.templates.task_class = function (st, end, item) {
        return item.$level == 0 ? "gantt_project" : ""
    };
    gantt.init("gantt_here");


    function clickGridButton(id, action) {
        switch (action) {
            case "edit":
                gantt.clearAll();
                gantt.load('/api/selectedChildren/'+id);

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
                    }
                });
                break;
        }
    }


    function toggleMode(toggle) {
        toggle.enabled = !toggle.enabled;
        if (toggle.enabled) {
            toggle.innerHTML = "Set default Scale";
            //Saving previous scale state for future restore
            saveConfig();
            zoomToFit();
        } else {

            toggle.innerHTML = "Zoom to Fit";
            //Restore previous scale state
            restoreConfig();
            gantt.render();
        }
    }

    var cachedSettings = {};

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

    function zoomToFit() {
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

    gantt.load("/api/data");
    var dp = new gantt.dataProcessor("/api");
    dp.init(gantt);
    dp.setTransactionMode("REST");
    gantt.attachEvent('onAfterTaskAdd', function () {
        tree.jstree("refresh");

    });
    gantt.attachEvent('onAfterTaskDelete', function () {
        tree.jstree("refresh");
    });
    gantt.attachEvent("onTaskSelected", function(id){
        tree.jstree("deselect_all");
        tree.jstree('select_node', id);
    });

</script>


</body>

