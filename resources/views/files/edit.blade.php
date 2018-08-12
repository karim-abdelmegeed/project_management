<div class="portlet light bordered">
<div class="portlet-title">
    <div class="hide" id="multiple_id" data-value="{{$multiple}}"></div>
        <div class="caption font-color">
            <i class="fa fa-gift font-color"></i>Choose Files
        </div>
    </div>
    <div class="portlet-body form">
        <!-- BEGIN FORM-->
        <form id="main-form"  class="ajax_form j-forms" method="post" action="{{route('files.getFiles', ['multiple'=>$multiple , 'model_name'=>$model_name , 'model_field' =>$model_field , 'id'=> $id])}}">
            {{csrf_field()}}
            <div class="content">
                <div class="filemanager">

                    <div class="search">
                        <input type="search" placeholder="Find a file.." />
                    </div>

                    <div class="breadcrumbs"></div>

                    <ul class="data"></ul>

                    <div class="nothingfound">
                        <div class="nofiles"></div>
                        <span>No files here.</span>
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
        </form>
        <!-- END FORM-->
</div>
</div>
