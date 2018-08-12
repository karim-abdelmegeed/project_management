<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
@include('admin_includes.meta')
<!-- BEGIN GLOBAL MANDATORY STYLES -->
@include('admin_includes.css_global')
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN THEME STYLES -->
@include('admin_includes.css_theme')
<!-- END THEME STYLES -->
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
@include('admin_includes.hints')
<body class="login">
<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
<div class="menu-toggler sidebar-toggler">
</div>
<!-- END SIDEBAR TOGGLER BUTTON -->
<!-- BEGIN LOGO -->
@yield('logo')
<!-- END LOGO -->
<!-- BEGIN LOGIN -->
<div class="content">
	<!-- BEGIN LOGIN FORM -->
	@yield('login_form')
	<!-- END LOGIN FORM -->
	<!-- BEGIN FORGOT PASSWORD FORM -->
	@yield('forget_form')
	<!-- END FORGOT PASSWORD FORM -->
	<!-- BEGIN REGISTRATION FORM -->
	<!-- END REGISTRATION FORM -->
</div>
<div class="copyright">
	 2016 © SMART Project Management
</div>
<!-- END LOGIN -->

<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
    @include('admin_includes.js_low')
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>