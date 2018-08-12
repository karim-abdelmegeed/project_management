<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WeeklyTime extends Model
{
    protected $table='weekly_times';
    protected $fillable=[ 'availability_id', 'from_hour', 'to_hour', 'admin_show', 'stuff_order'];
    
    public function availability()
    {
        return $this->belongsTo('App\Availability', 'availability_id');
    }

//relations
}
