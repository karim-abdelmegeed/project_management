<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Firebase extends Model
{
    public $timestamps=false;
    protected $table="firebase";
    protected $fillable=['user_id','token'];
    protected $primaryKey="id";
}
