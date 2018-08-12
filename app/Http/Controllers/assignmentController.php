<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Assignment;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

//uses
class assignmentController extends Controller
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
        $data['partialView'] = 'assignment.index';
        $data['assignments_358'] = Assignment::orderBy('stuff_order', 'asc')->where('admin_show', 1)->get();
        if (!Schema::hasColumn('assignments', 'stuff_order')) {
            Schema::table('assignments', function ($table) {
                $table->integer('stuff_order');
            }
            );
        }
//@@some-data@@
        return view('assignment.base', $data);
    }


    public function assignment_data(Request $request)
    {
        $data=[];
        //some_data
        $assignments_358= Assignment::with([])->where('assignments.admin_show', 1)
            ->orderBy('stuff_order', 'asc')
         ;
        return Datatables::eloquent($assignments_358)
                    
                    
                    
            ->addColumn('order', function ($assignment) {
                $order = '';
                $order .= '
                <td valign="middle">
            <input type="hidden" value="'.$assignment->id.'" class="reorder-vals"/>
        </td>
        ';
                return $order;
            })->rawColumns([  'order',])
                    //--@image-proccessing@--
        ->filter(function ($query) use ($request) {
        }
        )->make(true);
    }
//functions
}
