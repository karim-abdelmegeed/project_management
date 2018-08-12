<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class services3Request extends FormRequest
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
            'name'=>'' ,
            'description'=>'' ,
            'admin_show'=>'' ,
            'stuff_order'=>'' ,
            'created_at'=>'' ,
            'updated_at'=>'' ,

        ];
    }
   // --@messages_fn@--
}
