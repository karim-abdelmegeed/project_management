<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Assignment;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

//uses
class assignment_controllerController extends Controller
{
    public function reorder(Request $request)
    {
        $order = 1;
        $newSequence = $request->orderList;
        foreach ($newSequence as $id) {
            Assignment::where('id', '=', $id)->update(['stuff_order' => $order++]);
        }
    }


    public function index()
    {
        $data = [];
        $data['partialView'] = 'assignment_controller.index';
        $data['assignments_357'] = Assignment::orderBy('stuff_order', 'asc')->where('admin_show', 1)->get();
        if (!Schema::hasColumn('assignments', 'stuff_order')) {
            Schema::table('assignments', function ($table) {
                $table->integer('stuff_order');
            }
            );
        }
//@@some-data@@
        return view('assignment_controller.base', $data);
    }

//functions
}
