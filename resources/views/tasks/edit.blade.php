<div class="portlet light bordered">
<div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-gift font-color"></i>Task
        </div>
    </div>
    <div class="portlet-body form">
        <!-- BEGIN FORM-->
        <form id="main-form"  class="ajax_form j-forms" method="post" action="{{route('tasks.edit' , ['id'=>$task_20->id])}}">
            {{csrf_field()}}
            <div class="content">
                  
<div class="unit form-group "  >
    <input value="{{Auth::user()->company_id}}" class="form-control" type="hidden" name="company_id" id="company_id" data-name="company_id"  data-validation="" />
</div>

<div class="unit form-group " >
    <label class="label">Project</label>
    <label class="input select">
        <select name="project_id" id="project_id" class="form-control "  data-name="Project" data-validation=",required" >
            @foreach($projects_20 as $project)
                <option data-depending-value="{{$project->id}}" @if($task_20->project_id && ($task_20->project_id == $project->id)) selected @endif value="{{$project->id}}">{{$project->project_name}}</option>
            @endforeach
                      {{--<option>add new option</option>--}}
        </select>
        <span class="error_message error-view"></span>
        <i></i>
    </label>
</div>

<div class="unit form-group " >
    <label class="label">Assign to</label>
    <label class="input select">
        <select name="user_id" id="user_id" class="form-control "  data-name="Assign to" data-validation=",required" >
            @foreach($users_20 as $user)
                <option data-depending-value="{{$user->id}}" @if($task_20->user_id && ($task_20->user_id == $user->id)) selected @endif value="{{$user->id}}">{{$user->name}}</option>
            @endforeach
                      {{--<option>add new option</option>--}}
        </select>
        <span class="error_message error-view"></span>
        <i></i>
    </label>
</div>

<div class="unit form-group "  >
    <input value="{{Auth::user()->id}}" class="form-control" type="hidden" name="task_allocator_id" id="task_allocator_id" data-name="task_allocator_id"  data-validation="" />
</div>

<div class="unit form-group "  >
    <label class="label">Task name</label>
    <input value="{{$task_20&&$task_20->task_name?$task_20->task_name:''}}" class="form-control" type="text" name="task_name" id="task_name" data-name="Task name"  data-validation="" />
</div>

<div class="unit form-group "  >
    <label class="label">Should be finished before</label>
    <div class="input">
        <label class="icon-left" >
            <i class="fa fa-calendar "></i>
        </label>
        <input value="{{$task_20&&$task_20->deadline_date?$task_20->deadline_date:''}}" class="form-control datePicker val" type="text" name="deadline_date" id="deadline_date" data-name="This Field"  data-validation="" />
        <span class="error_message error-view"></span>
    </div>
</div>

<div class="unit form-group "  >
    <input value="Pending" class="form-control" type="hidden" name="task_status" id="task_status" data-name="task_status"  data-validation="" />
</div>

<div class="unit form-group "  >
    <input value="{{$task_20&&$task_20->task_progress?$task_20->task_progress:''}}" class="form-control" type="hidden" name="task_progress" id="task_progress" data-name="task_progress"  data-validation="" />
</div>

<div class="unit form-group "  >
    <label class="label">Description</label>
    <textarea id="task_remarks" name="task_remarks" data-name="Description" data-validation="">
        {{$task_20&&$task_20->task_remarks?$task_20->task_remarks:''}}
    </textarea>
</div>
<?php
                            // Uploader instantiation
                            $selector = "type";
                            $allowed_extentions = json_encode(["jpg", "jpeg", "png", "pdf", "doc", "docx"]);
                            $maximum_file_size = 5000000;
                            $youtube_videos = "0";
                            $encrypt_files = "1";
                            $multiple = "true";
                            $model = "taskFile";
                            $field = "task_id";
                            $entity_id = $task_20->id;
							
                            ?>
                            <label class="label">Upload
                                <span class="required" aria-required="true"> * </span>
                            </label>
                            @foreach($task_20->files as $file)


                                <div class="row form-group">

                                    @if($file)

                                        <div class="col-md-8">
                                            <span class="filenameplaceholder">
                                                    <a href="/uploads/{{$file->hash}}/{{$file->file}}" class="filename">
                                                        {{$file->file}}
                                                    </a>

                                            </span>
                                        </div>
                                        <div class="col-md-4">

                                            <button type="button" class="btn btn-danger pull-right removefile {{$task_20 && $file?'':'hidden'}}"
                                                    data-action="{{route('files.delete_file',['id'=>$file&&$file->pivot?$file->pivot->id:'' , 'model'=>'taskFile' , 'file_column'=>0])}}"
                                            >
                                                Remove
                                            </button>

                                        </div>
                                    @endif
                                </div>
                            @endforeach

                            <div class="contract_id_uploader">
                                <div id="{{$selector}}">
                                </div>
                                <a class="popup btn btn-success"
                                   href="{{route('files.index', ['multiple'=>$multiple , 'model_name'=>$model , 'model_field' =>$field , 'id'=> $entity_id])}}">Choose
                                    From Your Uploads</a>
                                @include('vendor.fine-uploader.uploader', ['allowedExtensions'=>$allowed_extentions])
                            </div>

                        </div>

            </div>
            <div class="form-actions">
                <div class="btn-set pull-right">
                <?php if(isset($_GET['clone'])){?><input type="hidden" name="new" value="1"><?php ;}?> <input type="submit" name="new" class="<?php if(!isset($_GET['clone'])){?>hide<?php ;}?> btn btn-lg color do_clone" value="Save as new">
                <input type="submit" name="update" class="<?php if(isset($_GET['clone'])){?>hide<?php ;}?> btn btn-lg btn-edit do_save" value="Save">
                </div>
            </div>
        </form>
        <!-- END FORM-->
</div>
</div>


@include('vendor.lrgt.ajax_script', ['form' => '#main-form',
'request'=>'App/Http/Requests/tasksRequest','on_start'=>false])