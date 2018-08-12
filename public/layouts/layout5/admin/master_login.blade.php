<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/3.3.3/css/bootstrap2/bootstrap-switch.css"/>
	<link href="{{asset('assets/global/css/components.min.css')}}" rel="stylesheet" type="text/css"/>
	<link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"/>
	<link href="{{asset('assets/global/css/plugins.css')}}" rel="stylesheet" type="text/css"/>
	<link href="{{asset('assets/pages/css/login.css')}}" rel="stylesheet" type="text/css"/>
	<script src="{{asset('assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"> </script>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
<div class="logo">
<img src="/images/logo.png" alt="logo" class="logo-default"/>
</div>
<div>
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

<!-- END LOGIN -->

<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
    {{--@include('admin_includes.js_low')--}}
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>