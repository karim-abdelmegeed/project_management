<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\Helpers\Helper;
use App\Portfolio;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;
class NeonHelper
{
    
    public static function index()
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'neon.index';
        $portfolios_364 = Portfolio::orderBy('stuff_order', 'asc')->where('admin_show', 1)->get();
        return $portfolios_364;
    }


//function
}

