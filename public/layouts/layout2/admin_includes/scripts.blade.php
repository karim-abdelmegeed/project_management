<!--[if lt IE 9]>
<script src="/assets/global/plugins/respond.min.js"></script>
<script src="/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="{{asset('assets/global/plugins/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/js.cookie.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/jquery.blockui.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/uniform/jquery.uniform.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/magnific-popup/jquery.magnific-popup.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/admin/pages/scripts/popups.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/admin/pages/scripts/jquery.form.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="{{asset('assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/pages/scripts/components-bootstrap-select.js')}}" type="text/javascript"></script>
<script src="//rawgithub.com/indrimuska/jquery-editable-select/master/dist/jquery-editable-select.min.js"></script>
<link href="//rawgithub.com/indrimuska/jquery-editable-select/master/dist/jquery-editable-select.min.css" rel="stylesheet">

 
<!-- END CORE PLUGINS -->
<!-- BENGIN PAGE LEVEL PLUGINS !-->
@yield('plugins_js')
<!-- END PAGE LEVEL PLUGINS !-->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="{{asset('assets/global/scripts/app.js')}}" type="text/javascript"></script>
@yield('theme_js')
<!-- END THEME GLOBAL SCRIPTS -->
@yield('page_js')
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="{{asset('assets/admin/layout/scripts/layout.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/admin/layout/scripts/demo.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/admin/global/scripts/quick-sidebar.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/Connection.js')}}"></script>
<!-- END THEME LAYOUT SCRIPTS -->
@yield('layout_js')
