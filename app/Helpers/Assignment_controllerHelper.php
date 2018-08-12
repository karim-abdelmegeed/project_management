<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\Helpers\Helper;
use App\Assignment;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;

class Assignment_controllerHelper
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
        $data['partialView'] = 'assignment_controller.index';
        $assignments_357 = Assignment::orderBy('stuff_order', 'asc')->where('admin_show', 1)->get();
        return $assignments_357;
    }


//function
}
