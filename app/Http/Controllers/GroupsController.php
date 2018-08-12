<?php

namespace App\Http\Controllers;

use App\Group;
use App\Helpers\Helper;
use App\Assignment;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

//uses
class groupsController extends Controller
{

    public function init()
    {
      $group= new Group();
      $group->save();
      return redirect('/groups/edit/'.$group->id);
    }

    public function index()
    {
        $data = [];
        $data['partialView'] = 'groups.index';
        $data['groups'] = Group::where('admin_show', 1)->get();
        return view('groups.base', $data);
    }

    public function edit($id)
    {
        $assignment_363 = Group::findOrFail($id);
        $users=User::where('admin_show','1')->get();
        $data = [];
        $data['partialView'] = 'groups.edit';
        $data['users']=$users;
        $data['assignment_363'] = $assignment_363;
        return view('groups.base', $data);
    }



    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);
        $data = $request->input();
        $group->user()->detach();
        $group->user()->attach($request->user_id);

        //some-data

        if (!$group->admin_show) {
            $description = Auth::user()->name . ' saved group record';
            $operation = 'save';
        }
        else {
            $description = Auth::user()->name . ' updated group record';
            $operation = 'update';
        }
        $group->admin_show = 1;
        $group->update($data);
        $data = Helper::init('Group', $group->id, null, null, $operation, $description);
        //if you use array inputs, you should use $request->except([array inputs])
        return response()->json(['status' => 'success', 'msg' => 'Group successfully saved', 'url' => route('groups.index')]);
    }
    public function delete($group_id){
        Group::destroy($group_id) or abort(404);
        $description = Auth::user()->name.'deleted Module record';
        $data = Helper::init('Diploma', $group_id, null, null, 'delete', $description);
    }


//functions
}
