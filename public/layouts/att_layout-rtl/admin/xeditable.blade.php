@extends('admin.master')

@section('add_css')
<link rel="stylesheet" type="text/css" href="/assets/global/plugins/bootstrap-editable/bootstrap-editable/css/bootstrap-editable.css"/>
@stop

@section('add_js_plugins')
<script type="text/javascript" src="/assets/global/plugins/bootstrap-editable/bootstrap-editable/js/bootstrap-editable.js"></script>

@stop

@section('add_js_scripts')
<Script>
    var MyXEditable = function () {
        return {
            init: function () {
                $.fn.editable.defaults.mode = 'inline';
                $.fn.editable.defaults.params = {
                    _token: "{{csrf_token()}}"
                };

                $('#username').editable({
                    url: '/admin/xeditable',
                    method: 'post',
                    type: 'text',
                    pk: 1,
                    name: 'username',
                    title: 'Enter username'
                });
            }
        }
    }();
</script>
@stop

@section('add_inits')
MyXEditable.init();
@stop

@section('title')
X-editable
@stop

@section('page_title')
X-editable
@stop

@section('page_title_small')
@stop

@section('content')

<table id="user" class="table table-bordered table-striped">
    <tbody>
        <tr>
            <td style="width:15%">
                Username
            </td>
            <td style="width:50%">
                <a href="javascript:;" id="username" data-type="text" data-pk="1" data-original-title="Enter username">
                    superuser </a>
            </td>
        </tr>
    </tbody>
</table>

@stop
