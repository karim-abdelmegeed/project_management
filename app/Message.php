<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table='messages';
    protected $fillable=[ 'sender_id', 'reciever_id', 'content'];
    
    public function sender()
    {
        return $this->belongsTo('App\Sender', 'sender_id');
    }

    public function reciever()
    {
        return $this->belongsTo('App\Reciever', 'reciever_id');
    }

//relations
}
