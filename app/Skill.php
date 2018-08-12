<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $table='skills';
    protected $fillable=[ 'name', 'description'];
    
    public function assignment()
    {
        return $this->belongsToMany('App\Assignment')->withPivot('id');
    }


//relations
}
