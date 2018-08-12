<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    protected $table='assignments';
    protected $fillable=[ 'coordinator_id', 'name', 'status', 'estimate_hour_num', 'description', 'volunteer_num', 'deadline'];
    
    public function user()
    {
        return $this->belongsTo('App\User', 'coordinator_id');
    }


    public function file()
    {
        return $this->belongsToMany('App\File')->withPivot('id');
    }


    public function skill()
    {
        return $this->belongsToMany('App\Skill')->withPivot('id');
    }


    public function volunteer()
    {
        return $this->belongsToMany('App\Volunteer')->withPivot('id');
    }

//relations
}
