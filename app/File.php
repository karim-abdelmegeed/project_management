<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table='files';
    protected $fillable=[ 'user_id', 'file' , 'hash' , 'file_type' ];

    public function assignment()
    {
        return $this->belongsToMany('App\Assignment')->withPivot('id');
    }


    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

//relations
}
