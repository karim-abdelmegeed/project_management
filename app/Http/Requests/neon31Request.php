<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class neon31Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'coordinator_id'=>'' ,
            'name'=>'' ,
            'status'=>'' ,
            'estimate_hour_num'=>'' ,
            'description'=>'' ,
            'volunteer_num'=>'' ,
            'deadline'=>'' ,
            'admin_show'=>'' ,
            'stuff_order'=>'' ,
            'created_at'=>'' ,
            'updated_at'=>'' ,

        ];
    }
   // --@messages_fn@--
}
