<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Privilege extends Model
{

    protected $table='privileges';
    protected $fillable=['name', 'privilege_type', 'admin_show'];

}
