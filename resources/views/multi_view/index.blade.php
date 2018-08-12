<div class="container">
    <div class="row clearfix">
        <div class="col-md-12">
            
            <div class="m-portlet m-portlet--mobile">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    Assignment

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
                                <input class="btn search btn-default" id="assignment-359search-form" type="button" style="float:right"
                                       value="Search"/>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        </div>

        <!--end: Search Form -->
        <!--begin: Datatable -->


        {{--@advanced-search@--}}
        {{--@init-button@--}}
        
                <div class="portlet-btn">
                    <div class="btn-group portlet-btn">
                        <button disabled class="btn btn-info multiple_delete m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill reorder" data-action="{{route('assignment2.reorder')}}">
                            Reorder
                        </button>
                    </div>
                </div>

        {{--@delete-button@--}}
        <table class="table table-striped table-responsive m_datatable m-datatable--default m-datatable__table" id="assignment-359">

            <thead>

              <tr>

                <th valign="middle" data-name="order">order</th>
<th valign="middle" data-name="name">
                        Name
                    </th>
<th valign="middle" data-name="status">
                        Status
                    </th>


              </tr>

            </thead>
            <tbody>
            </tbody>
        </table>

        <!--end: Datatable -->
    </div>
</div>

            
            
<div class="m-portlet m-portlet--mobile">
    <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text">
                    Assignment

                </h3>
            </div>
        </div>
        {{--@m-portlet__head-tools@--}}
    </div>
        <div class="m-portlet__body">
            <!--begin: Search Form -->
            <div style="display:none;" class="srch_form m-form m-form--label-align-right  m--margin-bottom-30">
                <div class="row align-items-center">
                    <div class="col-xl-12 order-2 order-xl-1">
                        <form>
                            {{csrf_field()}}
                            <div class="row">

                                
                                <div class="col-md-12">
                                    <input class="btn search btn-default" id="assignment-362search-form" type="button" style="float:right"
                                           value="Search"/>
                                </div>
                            </div>


                        </form>
                    </div>

                </div>

        </div>
        <!--end: Search Form -->
        {{--@advanced-search@--}}
        
                <a  href="{{route('assignment5.init')}}"
                  class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill portlet-btn  pjax-link">
                   <span>
                       <i class="la la-plus"></i>
                       <span>
                           Add
                       </span>
                   </span>
               </a>
        {{--@reorder-button@--}}
        {{--@delete-button@--}}

        <!--begin: Datatable -->

      <table class="table table-striped table-responsive m-datatable--default m-datatable__table assignment-362 " id="assignment-362" width="100%">
        <thead>
        <tr class="tr-head">
            {{--@th-multiple @--}}
            <th valign="middle">
                        name
                    </th>
<th valign="middle">
                        status
                    </th>
<th valign="middle">
                        description
                    </th>
<th valign="middle">Actions</th>

        </tr>
        </thead>
        <tbody>
        @foreach($assignments_362 as $index => $assignment_362)
                <tr class="odd gradeX" id="data-row-{{$assignment_362->id}}">

                   {{--@td-multiple @--}}
                    <td valign="middle">
                        {{$assignment_362->name}}
                    </td>
<td valign="middle">
                        {{$assignment_362->status}}
                    </td>
<td valign="middle">
                        {{$assignment_362->description}}
                    </td>
<td valign="middle">

<a href="{{route('assignment5.edit',['id'=>$assignment_362->id])}}" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill pjax-link"  title="Edit"><i class="la la-edit"></i></a>


<a href="{{route('assignment5.delete',['id'=>$assignment_362->id])}}" data-method="delete" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill remove-stuff remove-stuff" title="Delete"><i class="la la-trash"></i></a>

</td>
                </tr>
        @endforeach
        </tbody>
    </table>

        <!--end: Datatable -->
    </div>
</div>

        </div>
    </div>
</div>