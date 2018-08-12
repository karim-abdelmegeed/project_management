<?php

namespace App\Http\Controllers;

use App\Link;
use Illuminate\Http\Request;

class LinksController extends Controller
{

    public function index()
    {
        //
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $link = new Link();

        $link->type = $request->type;
        $link->source = $request->source;
        $link->target = $request->target;

        $link->save();

        return response()->json([
            "action" => "inserted",
            "tid" => $link->id
        ]);

    }
    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update($id, Request $request){
        $link = Link::find($id);

        $link->type = $request->type;
        $link->source = $request->source;
        $link->target = $request->target;

        $link->save();

        return response()->json([
            "action"=> "updated"
        ]);
    }


    public function destroy($id){
        $link = Link::find($id);
        $link->delete();

        return response()->json([
            "action"=> "deleted"
        ]);
    }
}
