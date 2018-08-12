<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;
use App\Company;

//uses
class userController extends Controller
{
    public function Company_name_data()
    {
        $model  = 'Company';
        $column_name = 'name';
        $app='App\\'.$model;

        $data= $app::select($column_name)->get();
        return $data;
    }
    public function deleteCells(Request $request)
    {
        $deleted_items_id = $request->item;
        if (is_array($deleted_items_id)) {
            User::whereIn('id', $deleted_items_id)->delete();
        } else {
            User::where('id', $deleted_items_id)->delete();
        }
        return Response()->json(['delete' => 'items deleted successfully']);
    }
    public function index()
    {
        $data = [];
        $data['partialView'] = 'user.index';
        $data['users_11'] = User::where('admin_show', 1)->get();
        
        
        //@@some-data@@
        return view('user.base', $data);
    }


    public function edit($id)
    {
        $user_12 = User::findOrFail($id);
        $data = [];
        $data['partialView'] = 'user.edit';
        $data['user_12'] = $user_12;
        return view('user.base', $data);
    }


    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->input();
        //some-data
        $data['password'] = bcrypt($data['password']);

        if (!$user->admin_show) {
            $description = Auth::user()->name . ' saved user record';
            $operation = 'save';
        } else {
            $description = Auth::user()->name . ' updated User record';
            $operation = 'update';
        }
        $user->admin_show = 1;
        $user->update($data);
        $user->roles()->attach(2);

        $data = Helper::init('User', $user->id, null, null, $operation, $description);
        //if you use array inputs, you should use $request->except([array inputs])
        return response()->json(['status' => 'success', 'msg' => 'User successfully saved', 'url' => route('user.index')]);
    }

    public function init()
    {
        $user = new User();
        $user->save();
        $description = Auth::user()->name.' initialized User record';
        $data = Helper::init('User', $user->id, null, null, 'init', $description);
        return redirect(route('user.edit', ['id' => $user->id]));
    }

    public function delete($id)
    {
        User::destroy($id) or abort(404);
        $description = Auth::user()->name.' deleted User record';
        $data = Helper::init('User', $id, null, null, 'delete', $description);
    }
    public function getColor($user_id){
        $user_color=User::find($user_id)->color;
        return response()->json(['color'=>$user_color]);
    }
    //functions

}
