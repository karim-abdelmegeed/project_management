<div class="m-portlet m-portlet--mobile">

    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    Users
                </h3>
            </div>
        </div>
    </div>

    <div class="m-portlet__body">
        <div class="table-toolbar">
            <div class="row">
                <div class="col-md-6">
                    <div class="btn-group">
                        <a href="{{route('user.init')}}"
                           class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill portlet-btn">
                   <span>
                       <i class="la la-plus"></i>
                       <span>
                           Add
                       </span>
                   </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>


        <table class="table table-striped table-bordered table-hover users-11 " id="users-11">

            <thead>
            <tr class="tr-head">

                <th valign="middle">
                    Name
                </th>
                <th valign="middle">Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach($users_11 as $index => $user_11)
                <tr class="odd gradeX" id="data-row-{{$user_11->id}}">

                    <td valign="middle">
                        {{$user_11->name}}
                    </td>
                    <td valign="middle">
                        <a href="{{route('user.edit',['id'=>$user_11->id])}}"
                           class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill"
                           title="Edit"><i class="la la-edit"></i></a>
                        <a href="{{route('user.delete',['id'=>$user_11->id])}}" data-method="delete"
                           class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill remove-stuff remove-stuff"
                           title="Delete"><i class="la la-trash"></i></a>
                    </td>

                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
