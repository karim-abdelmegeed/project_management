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
<body class="page-header-fixed page-quick-sidebar-over-content" @yield('body_attributes')>
<!-- BEGIN HIDDEN ATTRIBUTES -->
@include('admin_includes.hidden_attributes')
<!-- END HIDDEN ATTRIBUTES -->

<!-- BEGIN HEADER -->
@include('admin_includes.header')
<!-- END HEADER -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->

<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	@include('admin_includes.sidebar')
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content">
			
			
			<!-- BEGIN PAGE HEADER-->
			@include('admin_includes.page_header')
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="page-content-body" id="ajaxBody">
				<div class="row">
					<div class="col-md-12">
						 @yield('content')
					</div>
				</div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<!-- BEGIN QUICK SIDEBAR -->
    @include('admin_includes.q_sidebar')
    <!-- END QUICK SIDEBAR -->
</div>
<!-- END CONTAINER -->
    @include('admin_includes.footer')
<!-- BEGIN FOOTER -->

<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
    @include('admin_includes.js_low')
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>