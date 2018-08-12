<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Assignment;
use App\Priority;
use App\Task;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

//uses
class assignment5Controller extends Controller
{
    public function index()
    {
        $data = [];
        $data['roles']=[];
        $data['partialView'] = 'assignment5.index';
        $data['tasks'] = Task::all();
        $priorities = Priority::all();
        $users=Helper::getUsers('Send tasks', Auth::user());
        foreach ($priorities as $priority) {
            $priority->key = $priority->id;
            $priority->label = $priority->name;
        }
        foreach ($users as $user) {
            $user->key = $user->id;
            $user->label = $user->name;
        }
        $data['users']=$users;
        $data['priority'] =$priorities;

        //@@some-data@@
        return view('assignment5.base', $data);
    }


    public function edit($id)
    {
        $assignment_363 = Assignment::findOrFail($id);
        $data = [];
        $data['partialView'] = 'assignment5.edit';

        $data['assignment_363'] = $assignment_363;
        return view('assignment5.base', $data);
    }


    public function update(Request $request, $id)
    {
        $assignment = Assignment::findOrFail($id);
        $data = $request->input();
        //some-data

        if (!$assignment->admin_show) {
            $description = Auth::user()->name . ' saved assignment record';
            $operation = 'save';
        } else {
            $description = Auth::user()->name . ' updated Assignment record';
            $operation = 'update';
        }
        $assignment->admin_show = 1;
        $assignment->update($data);
        $data = Helper::init('Assignment', $assignment->id, null, null, $operation, $description);
        //if you use array inputs, you should use $request->except([array inputs])
        return response()->json(['status' => 'success', 'msg' => 'Assignment successfully saved', 'url' => route('assignment5.index')]);
    }

    public function init()
    {
        $assignment = new Assignment();
        $assignment->save();
        $description = Auth::user()->name . ' initialized Assignment record';
        $data = Helper::init('Assignment', $assignment->id, null, null, 'init', $description);
        return redirect(route('assignment5.edit', ['id' => $assignment->id]));
    }

    public function delete($id)
    {
        Assignment::destroy($id) or abort(404);
        $description = Auth::user()->name . ' deleted Assignment record';
        $data = Helper::init('Assignment', $id, null, null, 'delete', $description);
    }//functions
}
