<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\Helpers\Helper;
use App\Assignment;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

class Assignment4Helper
{
    public function reorder(Request $request)
    {
        $order = 1;
        $newSequence = $request->orderList;
        foreach ($newSequence as $id) {
            Assignment::where('id', '=', $id)->update(['stuff_order' => $order++]);
        }
    }



    public static function index()
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'assignment4.index';
        $assignments_361 = Assignment::orderBy('stuff_order', 'asc')->where('admin_show', 1)->get();
        return $assignments_361;
    }



    public function assignment4_data(Request $request)
    {
        $data=[];
        //some_data
        $assignments_361= Assignment::with([])->where('assignments.admin_show', 1)
            ->orderBy('stuff_order', 'asc')
         ;
        return Datatables::eloquent($assignments_361)
                    
                    
                    
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

//function
}
