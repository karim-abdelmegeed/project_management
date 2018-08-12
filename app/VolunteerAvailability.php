<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VolunteerAvailability extends Model
{
    protected $table='volunteer_availability';
    protected $fillable=[ 'volunteer_id', 'day'];
    
    public function volunteer()
    {
        return $this->belongsTo('App\Volunteer', 'volunteer_id');
    }

//relations
}
