<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;
use App\Helpers\assignment5Helper;

class happy_multi_viewsController extends Controller
{
    public function index()
    {
        $data = [];
        $data['assignment_363'] = assignment5Helper::init();
        $data['assignment_363'] = assignment5Helper::init();
//@@some-data@@
        $data['partialView'] = 'happy_multi_views.index';
        return view('happy_multi_views.base', $data);
    }

//functions
}
