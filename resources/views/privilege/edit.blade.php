<div class="m-portlet m-portlet--mobile">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                 Privileges
                </h3>
            </div>
        </div>

    </div>
    <div class="m-portlet__body portlet_body_form">
        <!--begin: Form -->
        <form id="main-form" class="ajax_form j-forms" method="post"
              action="{{route('privilege.edit' , ['id'=>$privilege_22->id])}}">
            {{csrf_field()}}
            <div class="content">

                <div class="unit form-group ">
                    <label class="label">name</label>
                    <input value="{{$privilege_22&&$privilege_22->name?$privilege_22->name:''}}" class="form-control"
                           type="text" name="name" id="name" data-name="name" data-validation=",required"/>
                </div>
                <div class="unit form-group ">
                    <label class="label">Privilege Type</label>
                    <select class="select2" name="privilege_type">

                        <option value="Send tasks"
                                <?php if($privilege_22->privilege_type == "Send tasks"){?> selected="selected"<?php ;}?>>
                            Send tasks
                        </option>
                        <option value="Follow tasks"
                                <?php if($privilege_22->privilege_type == "Follow tasks"){?> selected="selected"<?php ;}?>>
                            Follow tasks
                        </option>

                    </select>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <div class="unit form-group ">
                            <label class="label">Select groups</label>
                            <select class="select2" multiple="multiple" name="from_groups[]">
                                @foreach($groups as $group)
                                    <option value="{{$group->id}}"
                                            <?php if(in_array($group->id, $existing_from_groups)){?> selected="selected"<?php ;}?>>{{$group->name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="unit form-group ">
                            <label class="label">Select users</label>
                            <select class="select2" multiple="multiple" name="from_users[]">
                                @foreach($users as $user)
                                    <option value="{{$user->id}}"
                                            <?php if(in_array($user->id, $existing_from_users)){?> selected="selected"<?php ;}?>>{{$user->name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <img src="/images/right-arrow.gif" style="max-width:80%; margin:0 auto; display:block;"
                             height="160"/>
                    </div>
                    <div class="col-md-5">
                        <div class="unit form-group ">
                            <label class="label">Select groups</label>
                            <select class="select2" multiple="multiple" name="to_groups[]">
                                @foreach($groups as $group)
                                    <option value="{{$group->id}}"
                                            <?php if(in_array($group->id, $existing_to_groups)){?> selected="selected"<?php ;}?>>{{$group->name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="unit form-group ">
                            <label class="label">Select users</label>
                            <select class="select2" multiple="multiple" name="to_users[]">
                                @foreach($users as $user)
                                    <option value="{{$user->id}}"
                                            <?php if(in_array($user->id, $existing_to_users)){?> selected="selected"<?php ;}?>>{{$user->name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
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