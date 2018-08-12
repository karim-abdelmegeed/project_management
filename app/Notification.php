<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Notification extends Model
{
    protected $table='notifications';
    protected $fillable=['type', 'type','administration_url','reviewer_url','supplier_agency_url', 'notification', 'user_id','project_id', 'subproject_id', 'progress_id', 'invoice_id', 'manager_id'];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function message()
    {
        $notification = $this->notification;
        /*if ($this->user_id){
            $user = User::where('id', $this->user_id)->first();
            $notification =   str_replace('<username>', $user->name, $notification);
        }
       */
        return $notification;
    }

    public function url()
    {
        return $this->administration_url;
        if (Auth::user()->signedInAs(["Super Admin","Manager","Team Leader"])) {
        }
        if (Auth::user()->signedInAs(["Reviewer"])) {
            return $this->reviewer_url;
        }
        if (Auth::user()->signedInAs(["Supplier","Agency"])) {
            return $this->supplier_agency_url;
        }
        return ;
    }
//relations
}
