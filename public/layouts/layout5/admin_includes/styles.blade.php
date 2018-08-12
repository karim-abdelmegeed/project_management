<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/uniform/css/uniform.default.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/magnific-popup/magnific-popup.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/global/css/j-forms.css')}}" rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
@yield('plugins_css')
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="{{asset('assets/global/css/components.css')}}" id="style_components" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/global/css/plugins.css')}}" rel="stylesheet" type="text/css"/>
<!-- END THEME GLOBAL STYLES -->
@yield('theme_css')
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="{{asset('assets/admin/layout5/css/layout.css')}}" rel="stylesheet" type="text/css"/>
<link id="style_color" href="{{asset('assets/admin/layout/css/themes/darkblue.css')}}" rel="stylesheet" type="text/css"/>
<link href="{{asset('assets/admin/layout5/css/custom.css')}}" rel="stylesheet" type="text/css"/>
<!-- END THEME LAYOUT STYLES -->
@yield('layout_css')
<link href="{{asset('assets/styles.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/global/css/theme.css')}}" rel="stylesheet" type="text/css" />
@yield('page_css')