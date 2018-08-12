<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $table='portfolio';
    protected $fillable=[ 'name', 'code', 'email'];
    
//relations
}
