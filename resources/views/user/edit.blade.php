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

    <div class="m-portlet__body portlet_body_form">
        <!-- BEGIN FORM-->
        <form id="main-form" class="ajax_form j-forms" method="post"
              action="{{route('user.edit' , ['id'=>$user_12->id])}}">
            {{csrf_field()}}
            <div class="content">

                <div class="unit form-group ">
                    <label class="label">Name</label>
                    <input value="{{$user_12&&$user_12->name?$user_12->name:''}}" class="form-control" type="text"
                           name="name" id="name" data-name="Name" data-validation=",required"/>
                </div>

                <div class="unit form-group ">
                    <label class="label">Email</label>
                    <input value="{{$user_12&&$user_12->email?$user_12->email:''}}" class="form-control" type="text"
                           name="email" id="email" data-name="Email" data-validation=",email,required"/>
                </div>

                <div class="unit form-group ">
                    <label class="label">Password</label>
                    <input class="form-control" type="password" name="password" id="password" data-name="Password"
                           data-validation=",required"/>
                </div>
                <div class="unit form-group ">
                    <label class="label">Retype Password</label>
                    <input class="form-control" type="password" name="password_confirmation" id="password_confirmation"
                           data-name="Password" data-validation=",required"/>
                </div>
                <div class="unit form-group">
                    <label>select color</label>
                    <input  id="user_color" name="color"  class="form-control" value="{{$user_12&&$user_12->color?$user_12->color:''}}"/>
                </div>
                @if($user_12->admin_show == 0)
                    <div class="unit form-group">
                        <input value="Employee" class="form-control" type="hidden" name="user_type" id="user_type"
                               data-name="user_type" data-validation=""/>
                    </div>

                @endif
                <div class="form-actions form_save">
                    <div class="btn-set pull-right">
                        <!-- save as-->
                        <input name="publish" type="submit" value="Save" class="btn btn-lg primary-btn"
                               id="publish"/>
                    </div>
                </div>
            </div>

        </form>

        <!-- END FORM-->
    </div>
</div>


@include('vendor.lrgt.ajax_script', ['form' => '#main-form',
'request'=>'App/Http/Requests/userRequest','on_start'=>false])