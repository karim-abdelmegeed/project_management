

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
                        <label class="label" for="admin_comment_{{$task->id}}" style="margin-left:-224px">Add Comment</label>
                        <textarea id="admin_comment_{{$task->id}}" name="admin_comment"></textarea>
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
                onSet: function (rating) {
                    $.get("/task/set_task_time_rate/" + task_id + '/' + rating);
                }
            });
            $("#quality_rate_{{$task->id}}").jRate({
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
