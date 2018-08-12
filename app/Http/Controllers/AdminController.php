<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Log;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

//uses
class AdminController extends Controller
{
    public function index(Request $request)
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'files.edit';
        $data['model_name']=$request->model_name;
        $data['model_field']=$request->model_field;
        $data['multiple'] = $request->multiple;
        $data['id'] = $request->id;
        return view('files.base', $data);
    }

    public function choose_role_view()
    {
        $data = [];
        $data['roles'] = Auth::user()->roles;
        $data['partialView'] = 'user.choose_role';
        return view('user.base', $data);
    }

    public function choose_role($role_id)
    {
        // if a guest is signed in to take a quiz
        if (session()->has('external_agency_quiz_token')) {
            return false;
        } else {
            Auth::user()->setLoggedInRoleID($role_id);
            return redirect(route('landing_page'));
        }
    }

//functions
}
