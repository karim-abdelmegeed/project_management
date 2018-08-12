<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Link;
use App\Task;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
class GanttController extends Controller
{
    public function get()
    {
        $tasks = Task::orderBy('sortorder','asc')->get();
        $user=Auth::user();
        $finished_tasks_id = Task::where('progress', 1)->pluck('id');
        $Auth_user_following_ids = Helper::getUsers('Follow tasks', Auth::user())->pluck('id')->toArray();
        $i_should_do_tasks_id = $user->TasksIShouldDo();
        $i_should_do_tasks_id->union($Auth_user_following_ids)->union($finished_tasks_id);
        $task=Task::whereIn('id',$i_should_do_tasks_id->union($Auth_user_following_ids)->union($finished_tasks_id))->get();


        $links = Link::all();
        foreach ($tasks as $task){
           $task->color=$task->task_owner->color;
        }
        return response()->json([
            "data" => $tasks,
            "links" => $links
        ]);
    }

    public function getLastTask()
    {
        $task = Task::orderby('id', 'desc')->first();
        return response()->json(['task' => $task]);
    }

    public function getLastUpdatedTask()
    {
        $task = Task::orderby('updated_at', 'desc')->first();
        return response()->json(['task' => $task]);
    }

    public function getTaskParents($id)
    {
        $data = Helper::getTaskParents($id);
        return response()->json(['tasks' => $data]);
    }

    public function selectedChildren($id)
    {
        $tasks = DB::select('call getTasks3(' . $id . ')');
        $tasks[0]->parent = 0;
        return response()->json([
            'data' => $tasks,
            'links' => Link::all()
        ]);
    }

    public function getTasksJs()
    {
        $tasks = Task::all();
        $data = [];
        $root_task = Task::where('parent', 0)->first();
        $object = new \stdClass();
        $object->id = $root_task->id;
        $object->parent = "#";
        $object->text = $root_task->text;
        $data[] = $object;
        foreach ($tasks as $task) {
            if ($root_task->id != $task->id) {
                $object = new \stdClass();
                $object->id = $task->id;
                $object->parent = $task->parent;
                $object->text = $task->text;
                $data[] = $object;

            }
        }
        return $data;
    }

    public function tasksICreated()
    {
        $parent_ids = Task::where('allocator_id',Auth::id())->where('parent','!=',0)->pluck('parent')->toArray();
        return response()->json(['data'=>Auth::user()->TasksCreated($parent_ids)]);
    }

    public function tasksIShouldDo()
    {
        $tasks = Task::where('owner_id', Auth::id())->get();
        $tasks_parents=Task::where('owner_id', Auth::id())->pluck('parent')->toArray();
        $links = Link::all();

        foreach ($tasks as $task) //ignore tree hierarchy
        {
            if(!in_array($task->id,$tasks_parents)){
                $task->parent=0;

            }
            $task->color=$task->task_owner->color;

        }
        return response()->json(['data'=>$tasks,'links'=>$links]);
    }

    public function finished()
    {
        $tasks = Task::where('progress', 1)->get();
        $tasks_parents=Task::where('progress',1)->pluck('parent')->toArray();;

        foreach ($tasks as $task) //ignore tree hierarchy
        {
            if(!in_array($task->id,$tasks_parents)){
                $task->parent=0;

            }            $task->color=$task->task_owner->color;

        }
        return response()->json(['data'=>$tasks,$links = Link::all()]);
    }

    public function tasksIFollow()
    {

        $Auth_user_following_ids = Helper::getUsers('Follow tasks', Auth::user())->pluck('id')->toArray();
        $tasks=Task::whereIn('id',$Auth_user_following_ids)->get();

        foreach ($tasks as $task) //ignore tree hierarchy
        {
            $task->color=$task->task_owner->color;

        }

        return response()->json(['data'=>$tasks]);

    }

    public function addTaskAllocator($task_id)
    {
        Task::where('id', $task_id)->update(['allocator_id' => Auth::id()]);
    }


}
