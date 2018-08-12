<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Task;
use App\Http\Requests;
use DB;

class User extends Authenticatable
{
    protected $table = 'users';

    protected $fillable = ['name', 'email', 'password', 'color'];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function task_owner()
    {
        return $this->hasMany(\App\Task::class, 'owner_id');
    }

    public function file()
    {
        return $this->hasMany('App\File');
    }

    public function roles()
    {
        return $this->belongsToMany('App\Role', 'user_role', 'user_id', 'role_id');
    }

    public function hasAnyRole($roles)
    {
        if (is_array($roles)) {
            foreach ($roles as $role) {
                if ($this->hasRole($role)) {
                    return true;
                }
            }
        } else {
            if ($this->hasRole($roles)) {
                return true;
            }
        }
        return false;
    }

    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first()) {
            return true;
        }
        return false;
    }


    public function signedInAs($roles)
    {
        if (empty($roles)) {
            return true;
        }

        if (is_array($roles) && count($roles) != 0) {
            foreach ($roles as $role) {
                if ($role == "") {
                    return true;
                }
                $current_role = Role::where('name', $role)->first();
                if ($current_role->id == $this->getLoggedInRoleID()) {
                    return true;
                }
            }
        } else {
            $current_role = Role::where('name', $roles)->first();
            if ($current_role->id == $this->getLoggedInRoleID()) {
                return true;
            }
        }
        return false;
    }


    public function getLoggedInRoleID()
    {
        if (session()->has('logged_in_role_id')) {
            return session('logged_in_role_id');
        }

        return null;
    }

    public function setLoggedInRoleID($role_id)
    {
        session(['logged_in_role_id' => $role_id]);
    }

    public function userNotifications()
    {
        if ($this->getLoggedInRoleID() == null) {
            return $this->hasMany('App\UserNotification', 'user_id', 'id')->where('role_id', null);
        } else {
            return $this->hasMany('App\UserNotification', 'user_id', 'id')
                ->where(function ($query) {
                    $query->where('role_id', $this->getLoggedInRoleID())
                        ->orWhere('role_id', null);
                });
        }
    }

    public function userNotificationsPaginated()
    {
        $notification = $this->userNotifications();

        $notifications = $notification->orderBy('id', 'desc')->paginate(3);
        return $notifications;
    }

    public function readNotifications()
    {
        return $this->userNotifications()
            ->whereNotNull('read_at');
    }

    public function unreadNotifications()
    {
        return $this->userNotifications()
            ->whereNull('read_at');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'user_group', 'user_id', 'group_id')->withPivot(['id', 'user_id', 'group_id']);

    }

    public function group_ids()
    {
        return $this->belongsToMany(Group::class, 'user_group', 'user_id', 'group_id')->pluck('groups.id')->toArray();
    }

    public function TasksCreated($parent_ids)
    {
        $tasks_ids = [];
        for ($i = 1; $i < 1000000000000; $i++) {
            $parent_tasks_parent_ids = Task::whereIn('id', $parent_ids)->where('parent', '!=', 0)->pluck('parent')->toArray();
            $parent_tasks_tasks_ids = Task::whereIn('id', $parent_ids)->where('parent', '!=', 0)->pluck('id')->toArray();
            array_push($parent_ids, $parent_tasks_parent_ids);
            array_push($tasks_ids, $parent_tasks_tasks_ids);
            $parent_tasks_parent_ids1 = Task::whereIn('id', $parent_ids)->where('parent', '!=', 0)->pluck('parent')->toArray();
            if (count($parent_tasks_parent_ids) == count($parent_tasks_parent_ids1)) {
                break;
            }
        }
        $tasks_ids = array_flatten($tasks_ids);
        $tasks = Task::whereIn('id', $tasks_ids)
            ->select('*', DB::raw(' "red" as color'), DB::raw(' "a" as task_order'))
            ->orderBy('task_order', 'asc');
        $allocator_tasks = Task::Where(function ($query) {
            $query->orWhere('allocator_id', $this->id);
        })
            ->select('*', DB::raw(' "blue" as color'), DB::raw(' "b" as task_order'))
            ->orderBy('task_order', 'asc');
        $tasks = $tasks->union($allocator_tasks)->get();
        $tasks[0]->parent = 0;
        return $tasks;
//        return  Task::whereIn('id',$tasks_ids)->orWhere('allocator_id',$this->id)->get();


    }

    public static function averageRate($start_date, $end_date)
    {
        $start_date = Carbon::parse($start_date);
        $end_date = Carbon::parse($end_date);
        $users_names = [];
        $users_ratings = [];
        $users_time_ratings = [];
        $users_quality_ratings = [];
        $chart_data = [];
        $users = Self::where('id', '!=', 1)->get();
        $j = 1;
        $start = $start_date->copy();
        while ($start <= $end_date) {
            foreach ($users as $user) {
                $time_ratings = $user->task_owner()
                    ->where(function ($query) use ($start) {
                        $query->whereBetween('created_at', [$start, $start->copy()->addDays(7)]);
                    })->avg('time_rating');
                $quality_ratings = $user->task_owner()
                    ->where(function ($query) use ($start) {
                        $query->whereBetween('created_at', [$start, $start->copy()->addDays(7)]);
                    })->avg('quality_rating');
                array_push($users_names, $user->name);
                array_push($users_time_ratings, $time_ratings);
                array_push($users_quality_ratings, $quality_ratings);
                array_push($users_ratings, ((double)$time_ratings + (double)$quality_ratings) / 2.0);

            }
            $object = new \stdClass();
            foreach ($users_names as $index => $user_name) {
                $name = $user_name;
                $object->$name = $users_ratings[$index];
                $object->{$name . '_name'} = 2;
                $object->{$name . '_time_rating'} = $users_time_ratings[$index];
                $object->{$name . '_quality_rating'} = $users_quality_ratings[$index];
            }
            $object->week = 'week' . $j;
            $chart_data[] = $object;
            $start->addDays(7);
            $j++;
        }
        $all_time_rate=User::allTimeRate();
        $chart_data[]=$all_time_rate;
        return $chart_data;
    }

    public static function  allTimeRate()
    {
        $users = Self::where('id', '!=', 1)->get();
        $object = new \stdClass();
        $object->week = "All";
        foreach ($users as $user) {
            $time_ratings = $user->task_owner()->avg('time_rating');
            $quality_ratings = $user->task_owner()->avg('quality_rating');
            $name = $user->name;
            $object->{$name . '_time_all'} = $time_ratings;
            $object->{$name . '_quality_all'} = $quality_ratings;

        }
        return $object;
    }

    public function TasksIShouldDo(){
      $task_ids  =Task::where('owner_id', $this->id)->pluck('id');
      return $task_ids;
    }
//relations
}
