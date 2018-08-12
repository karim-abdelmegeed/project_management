<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table='logs';
    protected $fillable=[ 'model_name', 'data_id' , 'model_parent' , 'parent_id' , 'user_id' , 'operation' , 'description' ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
