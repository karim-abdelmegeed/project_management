<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssignmentVolunteer extends Model
{
    protected $table='assignment_volunteer';
    protected $fillable=[ 'assignment_id', 'volunteer_id'];
    
//relations
}
