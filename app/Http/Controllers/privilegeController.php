<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Privilege;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;
use Illuminate\Support\Facades\Schema;
use Auth;
use App\User;
use App\Group;
use App\privilegesUser;

//uses
class privilegeController extends Controller
{
    public function index()
    {
        $data = [];
        $data['partialView'] = 'privilege.index';
        $data['send_privileges'] = Privilege::orderBy('stuff_order', 'asc')->where('privilege_type','Send tasks')->where('admin_show', 1)->get();
        $data['follow_privileges'] = Privilege::orderBy('stuff_order', 'asc')->where('privilege_type','Follow tasks')->where('admin_show', 1)->get();
        //@@some-data@@
        return view('privilege.base', $data);
    }


    public function edit($id)
    {
        $privilege_22 = Privilege::findOrFail($id);
        $data = [];
        $data['partialView'] = 'privilege.edit';
        $data['groups'] = Group::where('admin_show',1)->get();
        $data['users'] = User::where('admin_show',1)->get();
        $data['existing_from_groups']  = privilegesUser::
                where('from_or_to',"from")
                ->where('stuff_type',"group")
                ->where('privilege_id',$id)
                ->pluck('stuff_id')->toArray();
        $data['existing_to_groups']  = privilegesUser::
                where('from_or_to',"to")
                ->where('stuff_type',"group")
                ->where('privilege_id',$id)
                ->pluck('stuff_id')->toArray();
        $data['existing_from_users']  = privilegesUser::
                where('from_or_to',"from")
                ->where('stuff_type',"user")
                ->where('privilege_id',$id)
                ->pluck('stuff_id')->toArray();
        $data['existing_to_users']  = privilegesUser::
                where('from_or_to',"to")
                ->where('stuff_type',"user")
                ->where('privilege_id',$id)
                ->pluck('stuff_id')->toArray();
        $data['privilege_22'] = $privilege_22;
        return view('privilege.base', $data);
    }


    public function update(Request $request, $id)
    {
        $privilege = Privilege::findOrFail($id);
        $data = $request->input();
        //validations
        if(!isset($data['from_users']) && !isset($data['from_groups'])){
            return response()->json(['status' => 'error', 'msg' => 'Please select at least one group or user in the left box', 'url' => route('privilege.index')]);
        }
        if(!isset($data['to_users']) && !isset($data['to_groups'])){
            return response()->json(['status' => 'error', 'msg' => 'Please select at least one group or user in the right box', 'url' => route('privilege.index')]);
        }
        //some-data
        
        if (!$privilege->admin_show) {
            $description = Auth::user()->name . ' saved privilege record';
            $operation = 'save';
        } else {
            $description = Auth::user()->name . ' updated Privilege record';
            $operation = 'update';
        }
        $privilege->admin_show = 1;

        for($i=1;$i<=4;$i++){
            unset($array);
            if($i==1){
                $from_to = "from";
                $stuff_type= "group";
                if(isset($data['from_groups'])){
                    $array = $data['from_groups'];
                }else{
                $delete_unchecked_from_groups = privilegesUser::
                where('privilege_id',$privilege->id)
                ->where('stuff_type',$stuff_type)
                ->where('from_or_to',$from_to)
                ->delete();

                }
                    


            }
            if($i==2){
                $from_to = "from";
                    $stuff_type= "user";
                if(isset($data['from_users'])){
                    $array = $data['from_users'];
                    
                }else{
                $delete_unchecked_from_groups = privilegesUser::
                where('privilege_id',$privilege->id)
                ->where('stuff_type',$stuff_type)
                ->where('from_or_to',$from_to)
                ->delete();

                }
                
            }
            if($i==3){
                $from_to = "to";
                    $stuff_type= "user";
                if(isset($data['to_users'])){
                    $array = $data['to_users'];
                    
                }else{
                $delete_unchecked_from_groups = privilegesUser::
                where('privilege_id',$privilege->id)
                ->where('stuff_type',$stuff_type)
                ->where('from_or_to',$from_to)
                ->delete();

                }
                
            }
            if($i==4){
                $from_to = "to";
                    $stuff_type= "group";
                if(isset($data['to_groups'])){
                    $array = $data['to_groups'];
                    
                }else{
                $delete_unchecked_from_groups = privilegesUser::
                where('privilege_id',$privilege->id)
                ->where('stuff_type',$stuff_type)
                ->where('from_or_to',$from_to)
                ->delete();

                }
                
            }
            if(isset($array)){
                //add from groups
                foreach($array as $stuff_id){
                    //check if user already added to the group
                    $group_already_exists = privilegesUser::
                    where('from_or_to',$from_to)
                    ->where('stuff_id',$stuff_id)
                    ->where('stuff_type',$stuff_type)
                    ->where('privilege_id',$privilege->id)
                    ->count();
                    if($group_already_exists ==0){
                        $new_from_group = new privilegesUser();
                        $new_from_group->from_or_to = $from_to;
                        $new_from_group->stuff_id = $stuff_id;
                        $new_from_group->stuff_type = $stuff_type;
                        $new_from_group->privilege_id = $privilege->id;
                        $new_from_group->save();
                    }
                }
                // Remove from groups
                $delete_unchecked_from_groups = privilegesUser::
                whereNotIn('stuff_id',$array)
                ->where('privilege_id',$privilege->id)
                ->where('stuff_type',$stuff_type)
                ->where('from_or_to',$from_to)
                ->delete();
            }
        }
        
        $privilege->update($data);
        $data = Helper::init('Privilege', $privilege->id, null, null, $operation, $description);
        //if you use array inputs, you should use $request->except([array inputs])
        return response()->json(['status' => 'success', 'msg' => 'Privilege successfully saved', 'url' => route('privilege.index')]);
    }

    public function init()
    {
        $privilege = new Privilege();
        $privilege->save();
        $description = Auth::user()->name.' initialized Privilege record';
        $data = Helper::init('Privilege', $privilege->id, null, null, 'init', $description);
        return redirect(route('privilege.edit', ['id' => $privilege->id]));
    }

    public function delete($id)
    {

        Privilege::destroy($id) or abort(404);
        privilegesUser::where('privilege_id',$id)->delete();
        $description = Auth::user()->name.' deleted Privilege record';
        $data = Helper::init('Privilege', $id, null, null, 'delete', $description);
    }//functions
}
