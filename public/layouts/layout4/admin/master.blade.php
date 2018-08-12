<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
        @include('admin_includes.meta')
        @include('admin_includes.styles')
        <script src="{{asset('assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('assets/global/plugins/pjax.js')}}" type="text/javascript"></script>
        <script>
$(document).on('ready', function () {
    new Pjax({
        elements: "a.pjax-link",
        selectors: ["#pjax-container", "title", ".page-title"]
    })
});
$(document).on('pjax:complete', function () {
    App.unblockUI();
});
$(document).on('pjax:send', function () {
    App.blockUI({
        boxed: true
    });
});
        </script>
    </head>
    <!-- END HEAD -->
    @include('admin_includes.hints')
    <!-- BEGIN BODY -->
    <body class="page-header-fixed page-quick-sidebar-over-content page-sidebar-fixed" @yield('body_attributes')>
          <a href="#" id="pjax-goto-link" class="pjax-link hidden" hidden>link</a>
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
                    <a id="page-top"></a>
                    <div class="page-content-body">
                        <div class="row" id="pjax-container">
                            @yield('content')
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
        @include('admin_includes.scripts')
        <!-- END JAVASCRIPTS -->
        <!-- Begin Hidden attributes-->
        @include('admin_includes.hidden_attributes')
        <!-- end Hidden attributes-->
    </body>
    <!-- END BODY -->
</html>