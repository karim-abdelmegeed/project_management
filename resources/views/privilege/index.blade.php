<div class="m-portlet m-portlet--mobile">

    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    Privileges
                </h3>
            </div>
        </div>
        {{--@m-portlet__head-tools@--}}
    </div>

    <div class="m-portlet__body">
        <div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
            <div class="row align-items-center">
                <div class="col-xl-8 order-2 order-xl-1">

                </div>
                <div class="col-xl-4 order-1 order-xl-2 m--align-right">


                    <div class="m-separator m-separator--dashed d-xl-none"></div>
                </div>
            </div>
        </div>


        <!--begin: Search Form -->
        <div style="display:none;" class="srch_form m-form m-form--label-align-right  m--margin-bottom-30">
            <div class="row align-items-center">
                <div class="col-xl-12 order-2 order-xl-1">
                    <form>
                        {{csrf_field()}}
                        <div class="row">

                            {{--@@search-inputs@@--}}

                            <div class="col-md-12">
                                <input class="btn search btn-default" id="assignment-361search-form" type="button"
                                       style="float:right"
                                       value="Search"/>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <a href="{{route('privilege.init')}}"
           class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill portlet-btn">
                   <span>
                       <i class="la la-plus"></i>
                       <span>
                           Add
                       </span>
                   </span>
        </a>
        <div class="tabbable-line">
            <ul class="nav nav-tabs ">
                <li class="active">
                    <a href="#tab_15_1" data-toggle="tab" aria-expanded="true">
                        Send </a>
                </li>
                <li class="">
                    <a href="#tab_15_2" data-toggle="tab" aria-expanded="false">
                        Follow </a>
                </li>

            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_15_1">
                    <table class="table table-striped table-bordered table-hover privileges-21 " id="privileges-21">

                        <thead>
                        <tr class="tr-head">

                            {{--@th-multiple @--}}

                            <th valign="middle">
                                Name
                            </th>
                            <th valign="middle">Actions</th>

                        </tr>
                        </thead>
                        <tbody>
                        @foreach($send_privileges as $index => $privilege_21)
                            <tr class="odd gradeX" id="data-row-{{$privilege_21->id}}">

                                {{--@td-multiple @--}}
                                <td valign="middle">
                                    {{$privilege_21->name}}
                                </td>
                                <td valign="middle">
                                    <a href="{{route('privilege.edit',['id'=>$privilege_21->id])}}"
                                       class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill"
                                       title="Edit"><i class="la la-edit"></i></a>

                                    <a href="{{route('privilege.delete',['id'=>$privilege_21->id])}}" data-method="delete"
                                       class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill remove-stuff remove-stuff"
                                       title="Delete"><i class="la la-trash"></i></a>

                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="tab-pane" id="tab_15_2">
                    <table class="table table-striped table-bordered table-hover follow-privileges " id="follow-privileges">

                        <thead>
                        <tr class="tr-head">

                            {{--@th-multiple @--}}

                            <th valign="middle">
                                Name
                            </th>
                            <th valign="middle">Actions</th>

                        </tr>
                        </thead>
                        <tbody>
                        @foreach($follow_privileges as $index => $privilege_21)
                            <tr class="odd gradeX" id="data-row-{{$privilege_21->id}}">

                                {{--@td-multiple @--}}
                                <td valign="middle">
                                    {{$privilege_21->name}}
                                </td>
                                <td valign="middle">

                                    <a href="{{route('privilege.edit',['id'=>$privilege_21->id])}}"
                                       class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill"
                                       title="Edit"><i class="la la-edit"></i></a>

                                    <a href="{{route('privilege.delete',['id'=>$privilege_21->id])}}" data-method="delete"
                                       class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill remove-stuff remove-stuff"
                                       title="Delete"><i class="la la-trash"></i></a>

                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <!--end: Datatable -->
    </div>
</div>
