<div class="container">
    <div class="row clearfix">
        <div class="col-md-12">
            
            <div class="m-portlet m-portlet--mobile">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    assignment5

                </h3>
            </div>
        </div>

    </div>
    <div class="m-portlet__body portlet_body_form">
        <!--begin: Form -->


        <form id="main-form" class="ajax_form j-forms call-lrgt" method="post" action="{{route('assignment5.edit' , ['id'=>$assignment_363->id])}}"
              data-request="App/Http/Requests/assignment5Request" data-on-start="false"
        >
            {{csrf_field()}}
            <div class="content">
                
                <div class="unit form-group "  >
                    <label class="label">name</label>
                    <input value="{{$assignment_363&&$assignment_363->name?$assignment_363->name:''}}" class="form-control" type="text" name="name" id="name" data-name="name"  data-validation="" />
                </div>

                <div class="unit form-group "  >
                    <label class="label">status</label>
                    <input value="{{$assignment_363&&$assignment_363->status?$assignment_363->status:''}}" class="form-control" type="text" name="status" id="status" data-name="status"  data-validation="" />
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
            
            <div class="m-portlet m-portlet--mobile">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    assignment5

                </h3>
            </div>
        </div>

    </div>
    <div class="m-portlet__body portlet_body_form">
        <!--begin: Form -->


        <form id="main-form" class="ajax_form j-forms call-lrgt" method="post" action="{{route('assignment5.edit' , ['id'=>$assignment_363->id])}}"
              data-request="App/Http/Requests/assignment5Request" data-on-start="false"
        >
            {{csrf_field()}}
            <div class="content">
                
                <div class="unit form-group "  >
                    <label class="label">name</label>
                    <input value="{{$assignment_363&&$assignment_363->name?$assignment_363->name:''}}" class="form-control" type="text" name="name" id="name" data-name="name"  data-validation="" />
                </div>

                <div class="unit form-group "  >
                    <label class="label">status</label>
                    <input value="{{$assignment_363&&$assignment_363->status?$assignment_363->status:''}}" class="form-control" type="text" name="status" id="status" data-name="status"  data-validation="" />
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
        </div>
    </div>
</div>