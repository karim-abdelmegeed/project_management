<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table= "groups";
    protected $fillable=["name","role_id"];

    public function user(){
        return $this->belongsToMany(User::class,'user_group','group_id','user_id');
    }
    public function roles(){
        return $this->belongsTo(Role::class,'role_id');
    }
}
