<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\Helpers\Helper;
use App\Assignment;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

class Assignment5Helper
{
    public static function index()
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'assignment5.index';
        $assignments_362 = Assignment::orderBy('stuff_order', 'asc')->where('admin_show', 1)->get();
        return $assignments_362;
    }



    public static function edit($id)
    {
        $assignment_363 = Assignment::findOrFail($id);
        $data = [];
        $data['partialView'] = 'assignment5.edit';
        
        $data['assignment_363'] = $assignment_363;
        return $data;
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


    public static function init()
    {
        $assignment = new Assignment();
        $assignment->save();
        $description = Auth::user()->name.' initialized Assignment record';
        $data = Helper::init('Assignment', $assignment->id, null, null, 'init', $description);
        return  $assignment;
    }

    public function delete($id)
    {
        Assignment::destroy($id) or abort(404);
        $description = Auth::user()->name.' deleted Assignment record';
        $data = Helper::init('Assignment', $id, null, null, 'delete', $description);
    }
//function
}
