<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class privilegesUser extends Model
{
    protected $table='privileges_users';
    protected $fillable=[ 'from_or_to', 'stuff_type', 'stuff_id'];
}
