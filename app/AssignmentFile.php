<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssignmentFile extends Model
{
    protected $table='assignment_file';
    protected $fillable=[ 'file_id', 'assignment_id', 'sender_id'];
    
//relations
}
