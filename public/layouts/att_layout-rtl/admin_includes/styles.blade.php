<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/uniform/css/uniform.default.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch-rtl.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/magnific-popup/magnific-popup.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css')}}" rel="stylesheet" type="text/css" />

<!-- END GLOBAL MANDATORY STYLES -->
@yield('plugins_css')
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="{{asset('assets/global/css/components.css')}}" id="style_components" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/css/components-rtl.css')}}" id="style_components" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/css/plugins.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/css/plugins-rtl.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/datetimepicker/bootstrap-datetimepicker.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/global/plugins/bootstrap-toastr/toastr.min.css')}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="{{asset('assets/global/plugins/datatables/datatables.min.css')}}"/>
<link rel="stylesheet" type="text/css" href="{{asset('assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css')}}"/>
<link rel="stylesheet" type="text/css" href="{{asset('assets/css/sweetalert2.min.css')}}"/>
<link rel="stylesheet" type="text/css" href="{{asset('assets/global/plugins/jquery-nestable/jquery.nestable.css')}}"/>
<link href="{{asset('assets/css/jquery-editable-select.min.css')}}" rel="stylesheet">
<link href="{{asset('assets/global/plugins/select2/css/select2.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/global/plugins/select2/css/select2-bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css')}}" rel="stylesheet" type="text/css" /><!-- END THEME GLOBAL STYLES -->
<link href="{{asset('assets/week-picker-view.css')}}" rel="stylesheet"/>
@yield('theme_css')
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="{{asset('assets/admin/layout4/css/layout.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/admin/layout4/css/layout-rtl.css')}}" rel="stylesheet" type="text/css"/>

<link id="style_color" href="{{asset('assets/admin/layout4/css/themes/light-rtl.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/admin/layout4/css/custom.css')}}" rel="stylesheet" type="text/css"/>
<!-- END THEME LAYOUT STYLES -->
@yield('layout_css')
<link href="{{asset('assets/styles.css')}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="{{asset('assets/j-folder/css/j-forms.css')}}">
<link rel="stylesheet" href="{{asset('assets/j-folder/css/j-forms-rtl.css')}}">
<link href="{{asset('assets/global/css/theme_3.css')}}" rel="stylesheet" type="text/css" />
@yield('page_css')