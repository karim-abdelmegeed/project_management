<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
	<link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css" />
	<link href="{{asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css')}}" rel="stylesheet" type="text/css" />
	<link href="{{asset('assets/global/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
	<link href="{{asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css')}}" rel="stylesheet" type="text/css" />
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	{{--<link href="../assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />--}}
	{{--<link href="../assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />--}}
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN THEME GLOBAL STYLES -->
	<link href="{{asset('assets/global/css/components.min.css')}}" rel="stylesheet" id="style_components" type="text/css" />
	<link href="{{asset('assets/global/css/plugins.min.css')}}" rel="stylesheet" type="text/css" />
	<!-- END THEME GLOBAL STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link href="{{asset('assets/pages/css/login-5.min.css')}}" rel="stylesheet" type="text/css" />

	<script src="{{asset('assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>
	<script src="{{asset('assets/global/plugins/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
{{--	<script src="{{asset('assets/global/plugins/js.cookie.min.js" type="text/javascript')}}"></script>--}}
	<script src="{{asset('assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js')}}" type="text/javascript"></script>
	<script src="{{asset('assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js')}}" type="text/javascript"></script>
	{{--<script src="{{asset('assets/global/plugins/jquery.blockui.min.js" type="text/javascript')}}"></script>--}}
	<script src="{{asset('assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js')}}" type="text/javascript"></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="{{asset('assets/global/plugins/jquery-validation/js/jquery.validate.min.js')}}" type="text/javascript"></script>
	<script src="{{asset('assets/global/plugins/jquery-validation/js/additional-methods.min.js')}}" type="text/javascript"></script>
	<script src="{{asset('assets/global/plugins/select2/select2.min.js')}}" type="text/javascript"></script>
	<script src="{{asset('assets/global/plugins/backstretch/jquery.backstretch.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/pages/scripts/login-5.min.js')}}"></script>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
{{--@include('admin_includes.hints')--}}
<body class="login">
<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
{{--<div class="menu-toggler sidebar-toggler">--}}
{{--</div>--}}
<!-- END SIDEBAR TOGGLER BUTTON -->
<!-- BEGIN LOGO -->
{{--@yield('logo')--}}
<!-- END LOGO -->
<!-- BEGIN LOGIN -->
<div class="content">
@yield('content')
	<!-- BEGIN LOGIN FORM -->
	{{--@yield('login_form')--}}
	<!-- END LOGIN FORM -->
	<!-- BEGIN FORGOT PASSWORD FORM -->
	{{--@yield('forget_form')--}}
	<!-- END FORGOT PASSWORD FORM -->
	<!-- BEGIN REGISTRATION FORM -->
	<!-- END REGISTRATION FORM -->
</div>
<div class="copyright">
	 2016 © SMART Project Management
</div>
<!-- END LOGIN -->

<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>