<div class="portlet box color hidden">
    <div class="portlet-title">
            <div class="caption font-color-box">
               <i class="fa fa-search font-color-box"></i> Search
            </div>
        <div class="tools">
            <a href="" class="collapse" data-original-title="" title=""> </a>
        </div>
    </div>
    <div class="portlet-body" style="display: block;">
      <form>
        {{csrf_field()}}
        <div class="row">

        <div class="col-md-4"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td>deadline_date</td><td><input class="form-control datePicker start_date date_ranges_search deadline_date" name="deadline_date" type="text" data-column-index="4"/><input class="form-control datePicker end_date date_ranges_search  deadline_date" name="deadline_date" type="text" data-column-index="4"/>
                        </td></tr></tbody></table></div><div class="col-md-4">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>project_project_name</td>
                            <td>
                                <select class="form-control" name="project_project_name" data-column-index="7" multiple>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

          <div class="col-md-2">
               <input class="btn search btn-default" id="search-form" type="button"  style="float:right" value="Search"/>
          </div>
        </div>
      </form>
    </div>
</div>
<div class="portlet light">
    <div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-globe font-color"></i> Tasks I should do
      </div>

    </div>
    <div class="portlet-body">
        <div class="table-toolbar">
            <div class="row">

                <div class="col-md-6">
                    <div class="btn-group">
                        <a class="btn color " href="{{route('tasks.init')}}">
                            Add New <i class="fa fa-plus"></i>
                        </a>

                    </div>
                </div>


                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="btn-group">
                        
                  </div>
                </div>
{{--@export-image-button@--}}

            </div>
        </div>

    </div>


    <table class="table table-striped table-bordered table-hover tasks-19 " id="tasks-19">

        <thead>
        <tr class="tr-head">

          <th valign="middle">
                        Task
                    </th>
<th valign="middle">
                        Due by
                    </th>
<th valign="middle">
                        Status
                    </th>
<th valign="middle">Project</th>
<th valign="middle">Assigned By</th><th valign="middle">Actions</th>

        </tr>
        </thead>
        <tbody>
        @foreach($my_tasks as $index => $task)
        <tr class="odd gradeX" id="data-row-{{$task->id}}">

          <td valign="middle">
          @if($task->task_remarks != "" || count($task->files) > 0 || $task->comment != "")
<a href="{{route('tasks.view',['id'=>$task->id])}}" class="popup" >
@endif
                        {{$task->task_name}} @if($task->comment != "") <img src="/images/comment.png" width="15"  /> @endif
                        @if($task->task_remarks != "")
                        </a>
                        @endif
                    </td>
<td valign="middle">



<span <?php if(strtotime($task->deadline_date) < strtotime(date("Y-m-d"))){?>class="red"<?php ;}?>>
                        {{$task->deadline_date}}
                        </span>
                    </td>
<td valign="middle">
                        {{$task->task_status}}
                    </td>
<td valign="middle">{{$task->project?$task->project->project_name:''}}</td><td valign="middle">{{$task->task_allocator?$task->task_allocator->name:''}}</td><td valign="middle">
@if($task->user_id == Auth::user()->id && $task->task_status == "Pending")

<form action="{{route('tasks.reallocate')}}" class="ajax_form" method="post" style="display:inline;">
<select name="user_id" style="display:inline;">
	@foreach($users as $user)
        <option value="{{$user->id}}" <?php if($task->user_id == $user->id){?> selected="selected" <?php ;}?>>{{$user->name}}</option>
    @endforeach
</select>
<input type="submit" class="btn btn-primary" value="Reallocate" style="display:inline;"  />
<input type="hidden" name="id" id="id" value="{{$task->id}}" />
</form>
<a href="{{route('tasks.finishView',['id'=>$task->id])}}" class="btn green  popup_refresh" ><i class="fa fa-check"></i> Finished</a>
@endif


@if($task->task_allocator_id == Auth::user()->id)
<a href="{{route('tasks.edit',['id'=>$task->id])}}" class="btn btn-edit  " ><i class="fa fa-edit"></i> Edit</a>


<a href="{{route('tasks.delete',['id'=>$task->id])}}" data-method="delete" class="btn btn-delete remove-stuff" ><i class="fa fa-remove"></i> Delete</a>
@endif
</td>
        </tr>
        @endforeach
    </table>
</div>

<div class="portlet light">
    <div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-globe font-color"></i> Tasks I created
        </div>

    </div>
  <div class="portlet-body">
        <div class="table-toolbar">
            <div class="row">

                <div class="col-md-6">
                    <div class="btn-group"></div>
                </div>


                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>
{{--@export-image-button@--}}

            </div>
        </div>

    </div>


    <table class="table table-striped table-bordered table-hover tasks-i-created " id="tasks-i-created">

        <thead>
        <tr class="tr-head">

          <th valign="middle">
                        Task
                    </th>
          <th valign="middle">Assigned to</th>
<th valign="middle">
                        Due by
                    </th>
<th valign="middle">
                        Status
                    </th>
<th valign="middle">Project</th>
<th valign="middle">Assigned By</th><th valign="middle">Actions</th>

        </tr>
        </thead>
        <tbody>
        @foreach($tasks_i_created as $index => $task)
        <tr class="odd gradeX" id="data-row-{{$task->id}}">

          <td valign="middle">
                        @if($task->task_remarks != "" || count($task->files) > 0 || $task->comment != "")
<a href="{{route('tasks.view',['id'=>$task->id])}}" class="popup" >
@endif
                        {{$task->task_name}} @if($task->comment != "") <img src="/images/comment.png" width="15"  /> @endif
                        @if($task->task_remarks != "")
                        </a>
                        @endif
                    </td>
          <td valign="middle">{{$task->user->name}}</td>
<td valign="middle">
<span <?php if(strtotime($task->deadline_date) < strtotime(date("Y-m-d"))){?>class="red"<?php ;}?>>
                        {{$task->deadline_date}}
                        </span>
                    </td>
<td valign="middle">
                        {{$task->task_status}}
                    </td>
<td valign="middle">{{$task->project?$task->project->project_name:''}}</td><td valign="middle">{{$task->task_allocator?$task->task_allocator->name:''}}</td><td valign="middle">
@if($task->task_allocator_id == Auth::user()->id)
<a href="{{route('tasks.edit',['id'=>$task->id])}}" class="btn btn-edit  " ><i class="fa fa-edit"></i> Edit</a>


<a href="{{route('tasks.delete',['id'=>$task->id])}}" data-method="delete" class="btn btn-delete remove-stuff" ><i class="fa fa-remove"></i> Delete</a>
@endif

</td>
        </tr>
        @endforeach
    </table>
</div>
<div class="portlet light">
    <div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-globe font-color"></i> Tasks I follow
        </div>

    </div>
  <div class="portlet-body">
        <div class="table-toolbar">
            <div class="row">

                <div class="col-md-6">
                    <div class="btn-group"></div>
                </div>


                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>
{{--@export-image-button@--}}

            </div>
        </div>

    </div>


    <table class="table table-striped table-bordered table-hover tasks-i-follow " id="tasks-i-follow">

        <thead>
        <tr class="tr-head">

          <th valign="middle">
                        Task
                    </th>
          <th valign="middle">Assigned to</th>
<th valign="middle">
                        Due by
                    </th>
<th valign="middle">
                        Status
                    </th>
<th valign="middle">Project</th>
<th valign="middle">Assigned By</th><th valign="middle">Actions</th>

        </tr>
        </thead>
        <tbody>
        @foreach($tasks_i_follow as $index => $task)
        <tr class="odd gradeX" id="data-row-{{$task->id}}">

          <td valign="middle">
                        @if($task->task_remarks != "" || count($task->files) > 0 || $task->comment != "")
<a href="{{route('tasks.view',['id'=>$task->id])}}" class="popup" >
@endif
                        {{$task->task_name}} @if($task->comment != "") <img src="/images/comment.png" width="15"  /> @endif
                        @if($task->task_remarks != "")
                        </a>
                        @endif
                    </td>
          <td valign="middle">{{$task->user->name}}</td>
<td valign="middle">
<span <?php if(strtotime($task->deadline_date) < strtotime(date("Y-m-d"))){?>class="red"<?php ;}?>>
                        {{$task->deadline_date}}
                        </span>
                    </td>
<td valign="middle">
                        {{$task->task_status}}
                    </td>
<td valign="middle">{{$task->project?$task->project->project_name:''}}</td><td valign="middle">{{$task->task_allocator?$task->task_allocator->name:''}}</td><td valign="middle">
@if($task->task_allocator_id == Auth::user()->id)
<a href="{{route('tasks.edit',['id'=>$task->id])}}" class="btn btn-edit  " ><i class="fa fa-edit"></i> Edit</a>


<a href="{{route('tasks.delete',['id'=>$task->id])}}" data-method="delete" class="btn btn-delete remove-stuff" ><i class="fa fa-remove"></i> Delete</a>
@endif

</td>
        </tr>
        @endforeach
    </table>
</div>

<div class="portlet light">
    <div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-globe font-color"></i> Finished
        </div>

    </div>
  <div class="portlet-body">
        <div class="table-toolbar">
            <div class="row">

                <div class="col-md-6">
                    <div class="btn-group"></div>
                </div>


                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="btn-group">
                        
                    </div>
                </div>
{{--@export-image-button@--}}

            </div>
        </div>

    </div>


    <table class="table table-striped table-bordered table-hover finished-tasks" id="finished-tasks">

        <thead>
        <tr class="tr-head">

          <th valign="middle">
                        Task
                    </th>
          <th valign="middle">Assigned to</th>
<th valign="middle">
                        Due by
                    </th>
<th valign="middle">
                        Status
                    </th>
<th valign="middle">Project</th>
<th valign="middle">Assigned By</th><th valign="middle">Actions</th>

        </tr>
        </thead>
        <tbody>
        @foreach($finished_tasks as $index => $task)
        <tr class="odd gradeX" id="data-row-{{$task->id}}">

          <td valign="middle">
                        @if($task->task_remarks != "" || count($task->files) > 0 || $task->comment != "")
<a href="{{route('tasks.view',['id'=>$task->id])}}" class="popup" >
@endif
                        {{$task->task_name}} @if($task->comment != "") <img src="/images/comment.png" width="15"  /> @endif
                        @if($task->task_remarks != "")
                        </a>
                        @endif
                    </td>
          <td valign="middle">{{$task->user->name}}</td>
<td valign="middle">
                        {{$task->deadline_date}}
                    </td>
<td valign="middle">
                        {{$task->task_status}}
                    </td>
<td valign="middle">{{$task->project?$task->project->project_name:''}}</td><td valign="middle">{{$task->task_allocator?$task->task_allocator->name:''}}</td><td valign="middle">
@if($task->task_allocator_id == Auth::user()->id)
<a href="{{route('tasks.edit',['id'=>$task->id])}}" class="btn btn-edit  " ><i class="fa fa-edit"></i> Edit</a>


<a href="{{route('tasks.delete',['id'=>$task->id])}}" data-method="delete" class="btn btn-delete remove-stuff" ><i class="fa fa-remove"></i> Delete</a>
@endif

</td>
        </tr>
        @endforeach
    </table>
</div>
