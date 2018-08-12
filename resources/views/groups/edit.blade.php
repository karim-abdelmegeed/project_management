<div class="m-portlet m-portlet--mobile">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    Add Group
                </h3>
            </div>
        </div>

    </div>
    <div class="m-portlet__body portlet_body_form">
        <!--begin: Form -->
        <form id="main-form" class="ajax_form j-forms call-lrgt" method="post" action="{{route('groups.edit' , ['id'=>$assignment_363->id])}}"
              data-request="App/Http/Requests/assignment5Request" data-on-start="false"
        >
            {{csrf_field()}}
            <div class="content">
                <div class="unit form-group">
                    <label class="label">name</label>
                    <input value="{{$assignment_363&&$assignment_363->name?$assignment_363->name:''}}" class="form-control" type="text" name="name" id="name" data-name="name"  data-validation="" />
                </div>
                <div class="unit form-group">
                    <label class="label">Users</label>
                    <select  class=" select2" name="user_id[]" multiple>
                        @foreach($users as $user)
                            <option value="{{$user->id}}" @if(in_array($user->id,$assignment_363->user->pluck('id')->toArray())) selected @endif>
                                {{$user->name}}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="form-actions form_save">
                    <div class="btn-set pull-right">
                        <!-- save as-->
                        <input name="publish" type="submit" value="Save" class="btn btn-lg primary-btn"
                               id="publish"/>
                    </div>
                </div>
            </div>
        </form>
        <!--end: Form -->
    </div>
</div>


@include('vendor.lrgt.ajax_script')