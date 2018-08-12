<style>
.page-title{
	display:none !important;
}
h2{
	margin-top:0 !important;
	padding-top:0 !important;
}
</style>
<h2>{{$task->task_name}}</h2>
<p><?php echo $task->task_remarks;?></p>

@foreach($task->files as $file)
	<a href="/uploads/{{$file->hash}}/{{$file->file}}" target="_blank"> {{$file->file}} </a>
    </br>
@endforeach

@if($task->comment != "")
<h4>Comment</h4>
<?php echo $task->comment;?>
@endif
