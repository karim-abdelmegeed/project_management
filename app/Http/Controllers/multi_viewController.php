<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;
use App\Helpers\assignment2Helper;
use App\Helpers\assignment5Helper;

class multi_viewController extends Controller
{
    public function index()
    {
        $data = [];
        $data['assignments_359'] = assignment2Helper::index();
        $data['assignments_362'] = assignment5Helper::index();
//@@some-data@@
        $data['partialView'] = 'multi_view.index';
        return view('multi_view.base', $data);
    }

//functions
}
