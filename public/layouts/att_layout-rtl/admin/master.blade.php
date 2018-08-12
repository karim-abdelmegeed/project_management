<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" dir="rtl">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
        @include('admin_includes.meta')
        @include('admin_includes.styles')
        

    </head>
    <!-- END HEAD -->
    @include('admin_includes.hints')
    <!-- BEGIN BODY -->

    <body class="page-container-bg-solid page-sidebar-closed-hide-logo page-header-fixed page-sidebar-fixed" @yield('body_attributes')>
          <a href="#" id="pjax-goto-link" class="pjax-link hidden" hidden>link</a>
        <!-- BEGIN HEADER -->
        @include('admin_includes.header')
        <!-- END HEADER -->
        <div class="clearfix"></div>
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
                    <div class="row" id="pjax-container" style="margin-left:10px; margin-right:0;">
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