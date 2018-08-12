
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
                                    <input class="btn search btn-default" id="assignment-357search-form" type="button" style="float:right"
                                           value="Search"/>
                                </div>
                            </div>


                        </form>
                    </div>

                </div>

        </div>
        <!--end: Search Form -->
        {{--@advanced-search@--}}
        {{--@init-button@--}}
        
                <div class="portlet-btn">
                    <div class="btn-group portlet-btn">
                        <button disabled class="btn btn-info multiple_delete m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill reorder" data-action="{{route('assignment_controller.reorder')}}">
                            Reorder
                        </button>
                    </div>
                </div>

        {{--@delete-button@--}}

        <!--begin: Datatable -->

      <table class="table table-striped table-responsive m-datatable--default m-datatable__table assignment-357 " id="assignment-357" width="100%">
        <thead>
        <tr class="tr-head">
            {{--@th-multiple @--}}
            <th valign="middle">
                        Name
                    </th>
<th valign="middle">
                        Status
                    </th>

        </tr>
        </thead>
        <tbody>
        @foreach($assignments_357 as $index => $assignment_357)
                <tr class="odd gradeX" id="data-row-{{$assignment_357->id}}">

                   {{--@td-multiple @--}}
                    <td valign="middle">
                        {{$assignment_357->name}}
                    </td>
<td valign="middle">
                        {{$assignment_357->status}}
                    </td>

                </tr>
        @endforeach
        </tbody>
    </table>

        <!--end: Datatable -->
    </div>
</div>
