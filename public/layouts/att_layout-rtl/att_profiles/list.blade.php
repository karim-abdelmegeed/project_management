<div class="portlet light">
    <div class="portlet-title">
        <div class="caption font-color">
            <i class="fa fa-folder font-color"></i>Attendance profiles
        </div>
    </div>
    <div class="portlet-body">
      <div class="table-toolbar">
            <div class="row">
                <div class="col-md-6">
                    <div class="btn-group">
                    <a href="{{route('admin.att_profiles.init')}}" class="pjax-link" >
                        <button class="btn color" id="add_new" data-action="{{route('admin.att_profiles.init')}}">
                            Add New <i class="fa fa-plus"></i>
                        </button>      
                        </a>                  
                    </div>
                </div>
                <div class="col-md-6"></div>
            </div>
        </div>
        <table class="table table-striped table-bordered table-hover table-dt" id="table-dt" >
            <thead>
                <tr class="tr-head font-color">
                  <th valign="middle">
                      Name
                  </th>
                  <th valign="middle">Type</th>
                  <th valign="middle">Office</th>
                    <th valign="middle">
                        Created at
                    </th>
                    <th valign="middle">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                @foreach($att_profiles as $att_profile)
                <tr class="odd gradeX" id="data-row-{{$att_profile->id}}">
                  <td valign="middle">
                      {{$att_profile->name}}
                    </td>
                  <td valign="middle">{{$att_profile->profile_type}}</td>
                  <td valign="middle">{{$att_profile->getOffice->name}}</td>
                    <td valign="middle">
                        {{$att_profile->created_at}}
                    </td>
                    <td valign="middle">
                        <a href="{{route('admin.att_profiles.edit',['id'=>$att_profile->id])}}" class="btn btn-edit pjax-link" ><i class="fa fa-edit"></i> Edit</a>
                        <a href="#" data-action="{{route('admin.att_profiles.delete',['id'=>$att_profile->id])}}"  class="btn btn-delete delete_single" ><i class="fa fa-remove"></i> Delete</a>
                        <a href="{{route('admin.att_profiles.edit',['id'=>$att_profile->id])}}?clone=1" class="btn color pjax-link" ><i class="fa fa-copy"></i> Copy Profile</a>
                    </td>
                </tr>
                @endforeach

        </table>
    </div>
</div>