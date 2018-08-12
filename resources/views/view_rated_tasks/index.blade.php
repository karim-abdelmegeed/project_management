<div class="hidden">
    @foreach($tasks as $task)
        <div class="col-lg-6">
            <div class="m-portlet">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
												<span class="m-portlet__head-icon">
													<i class="flaticon-cogwheel-2"></i>
												</span>
                            <h3 class="m-portlet__head-text m--font-brand">
                                {{$task?$task->text:""}}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="m-portlet__body">
                    <form method="post" action="{{url('/task/save_task_comment')}}"
                          class="m-form m-form--fit m-form--label-align-right ajax_form">
                        <div class="form-group m-form__group">
                            <input type="hidden" id="task_{{$task->id}}" name="task_id" value="{{$task->id}}"/>
                            <div class="col-lg-6">
                                <label>Task Owner</label>
                            </div>
                            <div class="col-lg-6">
                                <p>{{$task->task_owner->name}}</p>
                            </div>
                        </div>
                        <div class="form-group m-form__group">
                            <div class="col-lg-6">
                                <label> set task time rating </label>
                            </div>
                            <div id="time_rate_{{$task->id}}" class="col-lg-6"></div>
                        </div>
                        <div class="form-group m-form__group">

                            <div class="col-lg-6" style="margin-right: 2px;">
                                <label> set task quality rating </label>
                            </div>

                            <div id="quality_rate_{{$task->id}}" class="col-lg-6"
                                 style="margin-left: 226px;margin-top: -27px"></div>
                        </div>
                        <div class="form-group m-form__group">
                            <label class="label" for="admin_comment_{{$task->id}}" style="margin-left:-224px">Add
                                Comment</label>
                            <textarea id="admin_comment_{{$task->id}}"
                                      name="admin_comment">{{$task->admin_comment}}</textarea>
                        </div>
                        <div class="m-form__actions">
                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <script>
            $(document).on('ready', function () {
                var task_id = $("#task_{{$task->id}}").val();
                $("#time_rate_{{$task->id}}").jRate({
                    readOnly: false,
                    rating:{{$task->time_rating}},
                    onSet: function (rating) {
                        $.get("/task/set_task_time_rate/" + task_id + '/' + rating);
                    }
                });
                $("#quality_rate_{{$task->id}}").jRate({
                    readOnly: false,
                    rating:{{$task->quality_rating}},
                    onSet: function (rating) {
                        $.get("/task/set_task_quality_rate/" + task_id + '/' + rating);
                    }
                });
            });
            tinymce.init({
                selector: '#admin_comment_{{$task->id}}',
                height: 300,
                theme: 'modern',
                menubar: false,
                statusbar: false,
                toolbar: false,
                init_instance_callback: function (editor) {
                    editor.on('Change', function (e) {
                        content = tinymce.get('admin_comment_{{$task->id}}').getContent();
                        $("#admin_comment_{{$task->id}}").val(content);
                    });
                }
            });
        </script>
    @endforeach
</div>

<div class="col-lg-12">
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
												<span class="m-portlet__head-icon">
													<i class="flaticon-cogwheel-2"></i>
												</span>
                    <h3 class="m-portlet__head-text m--font-brand">
                        Users Task rating Graph
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">

            <div class="input-group input-daterange">
                <input type="text" class="form-control graph_range start_graph_range"
                       value=" <?php echo \Carbon\Carbon::now()->subDays(30)->toDateString(); ?>">
                <div class="input-group-addon">to</div>
                <input type="text" class="form-control graph_range end_graph_range"
                       value=" <?php echo \Carbon\Carbon::now()->toDateString(); ?>">
            </div>
            <div id="chartdiv" style="width: 1000px; height: 500px;"></div>
        </div>
    </div>
</div>
<script>
    $('.input-daterange input').each(function () {
        $(this).datepicker({startDate: new Date(2007, 1 - 1, 1)}).on("changeDate", function () {
            $.post("/task/rate_in_range", {
                'start_date': $(".start_graph_range").val(),
                'end_date': $(".end_graph_range").val()
            }, function (res) {
                chart.dataProvider = res.chartData;
                chart.validateData();

            });

        });

    });


    var users =  <?php echo json_encode($users) ?>;

    var chart;

    var chartData = <?php echo json_encode($chart_data) ?>;

    AmCharts.ready(function () {
        // SERIAL CHART
        chart = new AmCharts.AmSerialChart();
        chart.listeners = [{
            "event": "rendered",
            "method": handleRender
        }];
        chart.dataProvider = chartData;
        chart.categoryField = "week";
        chart.plotAreaBorderAlpha = 0.2;
        // AXES

        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.gridAlpha = 0.1;
        categoryAxis.axisAlpha = 0;
        categoryAxis.gridPosition = "start";

        // value
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.stackType = "regular";
        valueAxis.gridAlpha = 0.1;
        valueAxis.axisAlpha = 0;
        valueAxis.title = "Ratings";
        chart.addValueAxis(valueAxis);


        users.forEach(function (user) {
            graph = new AmCharts.AmGraph();
            graph.title = user;
            graph.color = '#fff';
            graph.labelText = "[[value]]";
            graph.fontSize = 8;
            graph.valueField = user;
            graph.type = "column";
            graph.newStack = true; // this line starts new stack
            graph.lineAlpha = 1;
            graph.fontColor = '#fff';
            graph.fillAlphas = 1;
            graph.lineColor = "#2398bd";
            graph.balloonText = "<span style='color:#2398bd;'>[[category]]</span><br><span style='font-size:14px'>[[title]]:<b>[[value]]</b></span>";
            chart.addGraph(graph);

            graph = new AmCharts.AmGraph();
            graph.fontSize = 8;
            graph.color = '#fff';
            graph.title = user + '_time_rating';
            graph.labelText = "[[value]]";
            graph.valueField = user + '_time_rating';
            graph.type = "column";
            graph.lineAlpha = 1;
            graph.fillAlphas = 1;
            graph.lineColor = "#f27334";
            graph.balloonText = "<span style='color:#555555;'>[[category]]</span><br><span style='font-size:14px'>[[title]]:<b>[[value]]</b></span>";
            chart.addGraph(graph);

            graph = new AmCharts.AmGraph();
            graph.fontSize = 8;
            graph.color = '#fff';

            graph.title = user + '_quality_rating';
            graph.labelText = "[[value]]";
            graph.valueField = user;
            graph.type = "column";
            graph.lineAlpha = 1;
            graph.fillAlphas = 1;
            graph.lineColor = "#a9d5e4";
            graph.balloonText = "<span style='color:#a9d5e4;'>[[category]]</span><br><span style='font-size:14px'>[[title]]:<b>[[value]]</b></span>";
            chart.addGraph(graph);

            graph = new AmCharts.AmGraph();
            var username = user.split(" ");
            if (username.length > 1) {
                if (username[1][1]) {
                    username = username[0][0] + '.' + username[1][0] + username[1][1] + username[1][2]
                }
                console.log(username);
            }
            else {
                username = username[0];
            }
            graph.fontSize = 8;
            graph.labelColorField = "#fff";
            graph.title = user;
            graph.labelText = username;
            graph.valueField = user + "_name";
            graph.type = "column";
            graph.width = "150px";
            graph.lineAlpha = 1;
            graph.fillAlphas = 1;
            graph.color = '#fff';

            graph.lineColor = "#0d3e56";
            graph.balloonText = "<span style='color:#0d3e56;'>[[category]]</span><br><span style='font-size:14px'>[[title]]</span>";
            chart.addGraph(graph);

            graph = new AmCharts.AmGraph();
            graph.fontSize = 8;
            graph.color = '#fff';
            graph.title = user + "_time_all";
            graph.labelText = "[[value]]";
            graph.valueField = user + "_time_all";
            graph.type = "column";
            graph.lineAlpha = 1;
            graph.fillAlphas = 1;
            graph.lineColor = "#f27334";
            graph.balloonText = "<span style='color:#f27334;'>[[category]]</span><br><span style='font-size:14px'>[[title]]</span>";
            chart.addGraph(graph);

            graph = new AmCharts.AmGraph();
            graph.fontSize =8;
            graph.color = '#fff';
            graph.title = user + "_quality_all";
            graph.labelText = "[[value]]";
            graph.valueField = user + "_quality_all";
            graph.type = "column";
            graph.lineAlpha = 1;
            graph.fillAlphas = 1;
            graph.lineColor = "#0d3e56";
            graph.balloonText = "<span style='color:#0d3e56;'>[[category]]</span><br><span style='font-size:14px'>[[title]]</span>";
            chart.addGraph(graph);
        });


        // LEGEND
        var legend = new AmCharts.AmLegend();
        legend.borderAlpha = 0.2;
        legend.horizontalGap = 10;
        chart.addLegend(legend);
        chart.depth3D = 25;
        chart.angle = 30;
        // WRITE
        chart.write("chartdiv");
        chart.removeLegend();

    });
    function handleRender() {
     setTimeout(function () {
         $(".amcharts-chart-div").find('a').hide();

     },1000);

    }
</script>
