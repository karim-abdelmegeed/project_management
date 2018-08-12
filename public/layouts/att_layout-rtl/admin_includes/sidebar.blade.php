<div class="page-sidebar-wrapper">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar navbar-collapse collapse">
                    <!-- BEGIN SIDEBAR MENU -->
                    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
                    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
                    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
                    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; ">

                <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                    <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                    <li class="sidebar-toggler-wrapper">
                        <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                        <div class="sidebar-toggler">
                            <span></span>
                        </div>
                        <!-- END SIDEBAR TOGGLER BUTTON -->
                    </li>
                    <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
                    <li class="sidebar-search-wrapper">
                        <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
                        <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
                        <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
                        <form class="sidebar-search hide" action="page_general_search_3.html" method="POST">
                            <a href="javascript:;" class="remove">
                                <i class="icon-close"></i>
                            </a>
                            <div class="input-group">
                                <input class="form-control" placeholder="Search..." type="text">
                                <span class="input-group-btn">
                                        <a href="javascript:;" class="btn submit">
                                            <i class="icon-magnifier"></i>
                                        </a>
                                    </span>
                            </div>
                        </form>
                        <!-- END RESPONSIVE QUICK SEARCH FORM -->
                    </li>
                    <h3></h3>
                    {{--@@START@@--}}
                    <li class="nav-item start <?php if($i=='att_profiles'){?>active<?php ;}?>">
                        <a href="/admin/att_profiles" class="nav-link nav-toggle">
                            <i class="fa fa-folder" aria-hidden="true"></i>
                            <span class="title">Attendance Profiles</span>
                        </a>

                    </li>

                    <li class="nav-item start <?php if($i=='attendance_actions'){?>active<?php ;}?>">
                        <a href="#" class="nav-link nav-toggle">
                            <i class="fa fa-user"></i>
                            <span class="title">Attendance Actions</span>
                        </a>
                        <ul class="sub-menu">
                            <li class="nav-item <?php if($i=='attendance_actions' && $j =='Permissions'){?>active open<?php ;}?>">
                                <a href="/admin/requests/Permissions" class="nav-link ">
                                    <i class="fa fa-bolt"></i>
                                    <span class="title">Permissions</span>
                                </a>
                            </li>
                            <li class="nav-item <?php if($i=='attendance_actions' && $j =='Normal Leaves'){?>active open<?php ;}?>">
                                <a href="/admin/requests/Normal Leaves" class="nav-link ">
                                    <i class="fa fa-question-circle"></i>
                                    <span class="title">Normal Leaves</span>
                                </a>
                            </li>
                            <li class="nav-item <?php if($i=='attendance_actions' && $j =='Half Day'){?>active open<?php ;}?>">
                                <a href="/admin/requests/Half Day" class="nav-link ">
                                    <i class="fa fa-star-half-full"></i>
                                    <span class="title">Half Day</span>
                                </a>
                            </li>
                            <li class="nav-item <?php if($i=='attendance_actions' && $j =='Emergency Leaves'){?>active open<?php ;}?>">
                                <a href="/admin/requests/Emergency Leaves" class="nav-link ">
                                    <i class="fa fa-ambulance"></i>
                                    <span class="title">Emergency Leaves</span>
                                </a>
                            </li>
                            @if(Auth::user()->can_work_home == 1)
                                <li class="nav-item <?php if($i=='attendance_actions' && $j =='Home'){?>active open<?php ;}?>">
                                    <a href="/admin/requests/Home" class="nav-link ">
                                        <i class="fa fa-home"></i>
                                        <span class="title">Work From Home</span>
                                    </a>
                                </li>
                            @endif
                        </ul>


                    </li>

                    {{--@@END@@--}}

                </ul>
                <!-- END SIDEBAR MENU -->
                <!-- END SIDEBAR MENU -->
                <div class="slimScrollBar" style="background: rgb(187, 187, 187); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 1100px;"></div>
            </div>

        </div>
	</div>