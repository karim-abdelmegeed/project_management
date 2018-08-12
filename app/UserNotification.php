<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserNotification extends Model
{
    protected $table='user_notifications';
    protected $fillable=[ 'user_id', 'role_id' , 'notification_id','read_at', 'read'];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function notification()
    {
        return $this->belongsTo('App\Notification', 'notification_id');
    }


    public function approvalsNotification()
    {
        return $this->belongsTo('App\Notification', 'notification_id')->where('type', 'approvals');
    }
}
