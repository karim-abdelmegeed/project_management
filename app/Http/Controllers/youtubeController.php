<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\File;

class youtubeController extends Controller
{
    public function index()
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'Youtube.index';
        
        return view('Youtube.base', $data);
    }
    public function unProcessed()
    {
        $file = File::where('processed', 2)->first();
        if ($file) {
            $path = public_path("uploads/".$file->hash."/".$file->file);
            
            return response()->json(['action'=>'process','path'=>$path,'id'=>$file->id]);
        } else {
            return response()->json(['action'=>'none']);
        }
    }
    public function setProcessed(Request $request)
    {
        $data = $request->input();
        $file = File::find($data['id']);
        $file->processed = 1;
        $file->youtube_id = $data['youtube_id'];
        $file->save();
        return response()->json(['status'=>'success']);
    }
}
