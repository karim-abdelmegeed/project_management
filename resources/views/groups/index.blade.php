<div class="m-portlet m-portlet--mobile">

    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    Groups
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
        <a href="{{route('groups.init')}}"
           class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill portlet-btn">
                   <span>
                       <i class="la la-plus"></i>
                       <span>
                           Add
                       </span>
                   </span>
        </a>
        <table class="table table-striped table-responsive m_datatable m-datatable--default m-datatable__table"
               id="assignment-361">

            <thead>

            <tr>
                <th valign="middle" data-name="name">
                    Name
                </th>
                <th valign="middle" data-name="name">
                    Actions
                </th>
            </tr>

            </thead>
            <tbody>
            @foreach($groups as $group)
            <tr>
                <td valign="middle">{{$group->name}}</td>
                <td valign="middle">
                    <a href="{{route('groups.edit',['id'=>$group->id])}}"
                       class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill"
                       title="Edit"><i class="la la-edit"></i></a>
                    <a href="{{route('groups.delete',['id'=>$group->id])}}" data-method="delete"
                       class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill remove-stuff remove-stuff"
                       title="Delete"><i class="la la-trash"></i></a>
                </td>
            </tr>
            @endforeach
            </tbody>
        </table>

        <!--end: Datatable -->
    </div>
</div>
