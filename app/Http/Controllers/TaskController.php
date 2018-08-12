<?php

namespace App\Http\Controllers;

use App\Task;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Auth;

class TaskController extends Controller
{
    public function store(Request $request)
    {

        $task = new Task();
        $task->text = $request->text;
        $task->start_date = Carbon::parse($request->start_date);
        $task->duration = $request->duration;
        $task->progress = $request->has("progress") ? $request->progress : 0;
        $task->parent = $request->parent;
        $task->owner_id = $request->owner_id;
        $task->priority = $request->priority;
        $task->sortorder = Task::max('sortorder') + 1;
        $task->save();

        return response()->json([
            "action" => "inserted",
            "tid" => $task->id
        ]);
    }

    public function update($id, Request $request)
    {

        $task = Task::find($id);
        $target = $request->target;
        $task->text = $request->text;
        $task->start_date = Carbon::parse($request->start_date);
        $task->duration = $request->duration;
        $task->progress = $request->has("progress") ? $request->progress : 0;
        $task->parent = $request->parent;
        $task->owner_id = $request->owner_id;
        $task->priority = $request->priority;
        if($request->parent==0){
            $task->type="project";
        }
        $task->save();

        // get id of adjacent task and check whether updated task should go before or after it
        if (strpos($target, 'next:') !== false) {
            $targetTaskId = explode('next:', $target)[1];
            $nextTask = true;

        } else {
            $targetTaskId = $target;
            $nextTask = false;
        }

        $currentTask = Task::find($task->id);
        $targetTask = Task::find($targetTaskId);
        if ($targetTaskId) {
            // updated task will receive the sortorder value of the adjacent task
            $targetOrder = $targetTask->sortorder;

// if it should go after the adjacent task, it should receive a bigger sortorder
            if ($nextTask) {
                $targetOrder++;
            }

// increase sort orders of tasks that should go after the updated task
           $tasks= Task::where('sortorder', '>=', $targetOrder)->get();
            foreach ($tasks as $task){
                $task->sortorder=$task->sortorder+1;
                $task->save();
            }

// and update the task with its new sortorder
            $currentTask->sortorder = $targetOrder;
            $currentTask->save();
        }


        return response()->json([
            "action" => "updated"
        ]);
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();

        return response()->json([
            "action" => "deleted"
        ]);
    }

    public function show()
    {

    }

    public function create()
    {

    }

    public function setTaskRating($task_id)
    {
        $data = [];
        $data['partialView'] = 'set_task_rate.edit';
        $data['tasks'] = Task::where('id',$task_id)->get();
        return view('set_task_rate.base', $data);
    }

    public function setQualityRate($task_id, $rate)
    {
        Task::setQualityRate($task_id, $rate);
    }

    public function setTimeRate($task_id, $rate)
    {
        Task::setTimeRate($task_id, $rate);
    }

    public function saveTaskComment(Request $request)
    {
        $task = Task::find($request->task_id);
        $task->saveTaskComment($request->admin_comment);
        return response()->json(['status' => 'success', 'msg' => 'Task rating successfully saved', 'url' => '']);
    }

    public function viewRatedTasks()
    {
        $data = [];
        $data['tasks'] = Task::ratedTasks();
        $data['chart_data'] = User::averageRate(Carbon::now()->subDays(30)->toDateString(), Carbon::now()->toDateString());
        $data['users'] = User::where('id', '!=', 1)
            ->where('admin_show', 1)
            ->pluck('name');
        $data['partialView'] = 'view_rated_tasks.index';
        return view('view_rated_tasks.base', $data);
    }

    public function rateInRange(Request $request)
    {
        $chart_data = User::averageRate($request->start_date, $request->end_date);
        return response()->json(['chartData' => $chart_data]);
    }

}
