<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\File;
use App\Group;
use App\Task;
use App\User;
use Illuminate\Filesystem\Filesystem;
use App\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

use LoggedAccount;
use App\privilegesUser;
use Intervention\Image\Facades\Image;

class Helper
{

    public static function getUsers($privilege_type, $user)
    {
        $privileges_ids = privilegesUser::where(function ($query) use ($user) {
            $query
                ->where('from_or_to', 'from')
                ->whereIn('stuff_id', $user->group_ids())
                ->where('stuff_type', 'group');
        })->orWhere(function ($query) use ($user) {
                $query
                    ->where('from_or_to', 'from')
                    ->where('stuff_id', $user->id)
                    ->where('stuff_type', 'user');
            })
            ->pluck('privilege_id')
            ->toArray();

        $privileges = privilegesUser::join('privileges', 'privileges.id', '=', 'privileges_users.privilege_id')
            ->whereIn('privilege_id', $privileges_ids)
            ->where('from_or_to', 'to')
            ->where('privilege_type', $privilege_type)
            ->get();

        $user_ids = array();
        array_push($user_ids, $user->id);
        foreach ($privileges as $privilege) {
            if ($privilege->stuff_type == "user") {
                array_push($user_ids, $privilege->stuff_id);
            } elseif ($privilege->stuff_type == "group") {
                $group = Group::find($privilege->stuff_id);
                foreach ($group->user as $user) {
                    array_push($user_ids, $user->id);
                }
            }
        }
        $users = User::whereIn('id', $user_ids)->get();
        return $users;
    }

    public static function getTaskParents($task_id){
        $data=[];
        $parent= Task::where('id',$task_id)->first()->parent;
        if($parent==0){
            $task=Task::find($task_id);
            array_push($data,$task);
        }
        while($parent!=0){
            $task=Task::where('id',$parent)->first();
            array_push($data,$task);
            $parent=$task->parent;
        }
        $data=array_reverse($data);
        return $data;
    }

    public static function init($model_name, $data_id, $model_parent, $parent_id, $operation, $description)
    {
        $log = new Log();
        $log->model_name = $model_name;
        $log->data_id = $data_id;
        $log->model_parent = $model_parent;
        $log->parent_id = $parent_id;
        $log->user_id = Auth::user()->id;
        $log->operation = $operation;
        $log->description = $description;
        $log->save();
        return $log->id;
    }

    public static function getImage($file_id, $image_height, $image_width)
    {
        $file = File::where('id', $file_id)->first();
        $dir = new Filesystem();
        if ($file) {
            if ($dir->exists('./uploads/' . $file->hash . '/' . $image_height . 'x' . $image_width . '.jpg')) {
                return '/uploads/' . $file->hash . '/' . $image_height . 'x' . $image_width . '.jpg';
            } else {
                $image = Image::make('./uploads/' . $file->hash . '/' . $file->file . '')
                    ->resize($image_height, $image_width);
                $image->save('./uploads/' . $file->hash . '/' . $image_height . 'x' . $image_width . '.jpg');
                return substr($image->dirname, 1) . '/' . $image->basename;
            }
        } else {
            return '//';
        }
    }


    public static function getUserFiles()
    {
        $files = [];
        $user_files = File::where('user_id', Auth::user()->id)->get();
        foreach ($user_files as $file) {
            // It is a file
            $files[] = array(
                "id" => $file->id,
                "name" => $file->file,
                "type" => "file",
                "path" => 'uploads/' . $file->hash . '/' . $file->file,
                "size" => filesize('uploads/' . $file->hash . '/' . $file->file) // Gets the size of this file
            );
        }
        return array(
            "name" => "uploads",
            "type" => "folder",
            "path" => 'uploads',
            "items" => $files
        );
    }


    public static function deleteFile($model_id, $model, $file_column)
    {
        $model = 'App\\' . $model;
        if ($file_column == "0") { //many to many
            $file_id = $model::where('id', $model_id)->delete();
        } else {
            $file_id = $model::where('id', $model_id)->first()->$file_column;
            $file = File::where('id', $file_id)->first();
            $dir = new Filesystem();
//            $delete_file = $dir->deleteDirectory('./uploads/'.$file->hash);
//            $file= File::where('id', $file_id)->delete();
            $model::where('id', $model_id)->update([$file_column => null]);
        }
    }



    //functions
}
