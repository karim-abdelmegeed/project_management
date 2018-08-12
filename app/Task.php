<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $appends = ["open"];
    protected $fillable = ['text', 'duration', 'progress', 'start_date', 'owner_id',
        'priority', 'parent', 'quality_rating','q_rating_time','t_rating_time',
        'time_rating','admin_comment','created_at'];

    public function getOpenAttribute()
    {
        return true;
    }

    public function task_owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public static function ratedTasks(){
        $tasks = Task::where('progress', 1)
            ->where('owner_id','!=',1)
            ->where(function ($query) {
                $query->where('quality_rating','!=', null)->Where('time_rating', '!=',null);
            })->get();
        return $tasks;
    }
    public static function unratedTasks()
    {
        $tasks = Task::where('progress', 1)
            ->where('owner_id','!=',1)
            ->where(function ($query) {
                $query->where('quality_rating', null)
                    ->orWhere('time_rating', null);
            })->get();
        return $tasks;
    }

    public static function setQualityRate($task_id, $rate)
    {
        $task = Task::find($task_id);
        $date= Carbon::now()->toDateTimeString();
        $task->update(['quality_rating' => $rate,'q_rating_time'=>$date]);
    }

    public static function setTimeRate($task_id, $rate)
    {
        $task = Task::find($task_id);
        $date= Carbon::now()->toDateTimeString();
        $task->update(['time_rating' => $rate,'t_rating_time'=>$date]);
    }

    public  function saveTaskComment($comment)
    {
        $this->update(['admin_comment' => $comment]);
    }
}
