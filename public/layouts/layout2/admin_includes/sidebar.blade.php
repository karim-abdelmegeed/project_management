<div class="page-sidebar-wrapper">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar navbar">
                    <!-- BEGIN SIDEBAR MENU -->
                    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
                    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
                    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
                    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <ul class="page-sidebar-menu  page-header-fixed page-sidebar-menu-submenu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">                        <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
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
                        @if(Auth::user()->user_type == "Admin")
                       <li class="nav-item start <?php if($i=='quizzes'){?>active<?php ;}?>">
                            <a href="/admin/quizzes" class="nav-link nav-toggle">
                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                <span class="title">Islamic Knowledge Test</span>
                                <span class="selected"></span>
                                {{--<span class="arrow open"></span>--}}
                            </a>
                            
                        </li>
                        <li class="nav-item start <?php if($i=='material'){?>active<?php ;}?>">
                            <a href="/admin/material" class="nav-link nav-toggle">
                                <i class="fa fa-database" aria-hidden="true"></i>
                                <span class="title">Training & Course Materials</span>
                                <span class="selected"></span>
                                {{--<span class="arrow open"></span>--}}
                            </a>
                            
                        </li>
                        <li class="nav-item start <?php if($i=='candidates'){?>active<?php ;}?>">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="icon-check"></i>
                                <span class="title">Candidates</span>
                                <span class="selected"></span>
                                {{--<span class="arrow open"></span>--}}
                            </a>
                            
                            <ul class="sub-menu">
                            <li class="nav-item <?php if($i=='candidates' && $j =='all'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/all/all" class="nav-link ">
                                    	<i class="fa fa-user"></i>
                                        <span class="title">All candidates</span>
                                        <span class="selected"></span>
                                        {{--<span class="arrow open"></span>--}}
                                       
                                    </a>
                                </li>
                                <li class="nav-item <?php if($i=='candidates' && $j =='testing'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/testing/Pending" class="nav-link ">
                                    	<i class="fa fa-question-circle"></i>
                                        <span class="title">Testing Phase</span>
                                        <span class="selected"></span>
                                        {{--<span class="arrow open"></span>--}}
                                       
                                    </a>
                                </li>
                                
                                <li class="nav-item <?php if($i=='candidates' && $j =='testEvaluation'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/testEvaluation/Pending" class="nav-link ">
                                    	<i class="fa fa-check-circle"></i>
                                        <span class="title">Test Evaluation</span>
                                        <span class="badge badge-danger pending_badge" @if($evaluation <= 0) style="display:none;" @endif>{{$evaluation}}</span>
                                    </a>
                                </li>
                                <li class="nav-item <?php if($i=='candidates' && $j =='phoneInterview'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/phoneInterview/Pending" class="nav-link ">
                                    	<i class="fa fa-phone-square "></i>
                                        <span class="title">Phone Interview</span>
                                        <span class="badge badge-danger pending_badge" @if($phone_interview <= 0) style="display:none;" @endif>{{$phone_interview}}</span>
                                    </a>
                                </li>
                                <li class="nav-item <?php if($i=='candidates' && $j =='pilotTest'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/pilotTest/Pending" class="nav-link ">
                                    	<i class="fa fa-question"></i>
                                        <span class="title">Pilot Test</span>
                                        <span class="badge badge-danger pending_badge" @if($pilot_test <= 0) style="display:none;" @endif>{{$pilot_test}}</span>
                                    </a>
                                </li>
                            </ul>
                            
                            
                        </li>
                        <li class="nav-item start <?php if($i=='volunteers'){?>active<?php ;}?>">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="icon-user"></i>
                                <span class="title">Volunteers</span>
                                <span class="selected"></span>
                                {{--<span class="arrow open"></span>--}}
                            </a>
                            
                            <ul class="sub-menu">
                                <li class="nav-item <?php if($i=='volunteers' && $j =='Approved'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/passedAll/Approved" class="nav-link ">
                                    	<i class="fa fa-check"></i>
                                        <span class="title">Approved</span>
                                       
                                    </a>
                                </li>
                                
                                <li class="nav-item <?php if($i=='volunteers' && $j =='Rejected'){?>active open<?php ;}?>">
                                    <a href="/admin/candidates/passedAll/Rejected" class="nav-link ">
                                    	<i class="fa fa-remove"></i>
                                        <span class="title">Rejected</span>
                                    </a>
                                </li>
                            </ul>
                            
                            
                        </li>
                        @endif
                        @if(Auth::user()->user_type == "Volunteer")
                        <li class="nav-item start <?php if($i=='status'){?>active<?php ;}?>">
                            <a href="/" class="nav-link nav-toggle">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <span class="title">Current Status</span>
                            </a>
                            
                        </li>
                        @if(!isset(Auth::user()->getGrades->quiz))
                       <li class="nav-item start <?php if($i=='user_test'){?>active<?php ;}?>">
                            <a href="/admin/user_test" class="nav-link nav-toggle">
                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                <span class="title">Islamic knowledge test</span>
                            </a>
                            
                        </li>
                        @endif
                        @if((Auth::user()->user_phase == "pilotTest" || Auth::user()->user_status == "Approved") && Auth::user()->user_status != "Rejected")
                        <li class="nav-item start <?php if($i=='Training'){?>active<?php ;}?>">
                            <a href="/admin/user_material/getMaterials/Training/0" class="nav-link nav-toggle">
                                <i class="fa fa-database" aria-hidden="true"></i>
                                <span class="title">Training Materials</span>
                            </a>
                            
                            
                        </li>
                        
                            <li class="nav-item start <?php if($i=='Course'){?>active<?php ;}?>">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="icon-check"></i>
                                <span class="title">Course Materials</span>
                            </a>
                            
                            <ul class="sub-menu">
                            @foreach($courses as $course)
                                <li class="nav-item <?php if($i=='Course' && $j ==$course->id){?>active open<?php ;}?>">
                                    <a href="/admin/user_material/getMaterials/Course/{{$course->id}}" class="nav-link ">
                                    	<i class="fa fa-check"></i>
                                        <span class="title">{{$course->name}}</span>
                                        
                                    </a>
                                </li>
                                @endforeach
                            </ul>
                            
                            
                        </li>
                            @if(Auth::user()->pilot_ready == 0)
                            <li class="nav-item start pilot_readyx">
                        <a href="/admin/candidates/pilotReady" class="nav-link nav-toggle pilot_ready">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <span class="title">Ready for pilot test</span>
                            </a>
                            </li>
                            @endif
                            @endif
                        @endif
                        
                        <li class="hide nav-item start <?php if($i=='tasks'){?>active<?php ;}?>">
                            <a href="#" class="nav-link nav-toggle">
                                <i class="icon-folder"></i>
                                <span class="title">Tasks</span>
                            </a>
                            @if(Auth::user()->user_type == "Allocator")
                            <ul class="sub-menu">
                                <li class="nav-item <?php if($i=='tasks' && $j =='Pending'){?>active open<?php ;}?>">
                                    <a href="/admin/tasks/getTasks/Pending" class="nav-link ">
                                    	<i class="fa fa-question-circle"></i>
                                        <span class="title">Pending</span>
                                       <span class="badge badge-danger pending_badge" @if($pending <= 0) style="display:none;" @endif>{{$pending}}</span>
                                    </a>
                                </li>
                                
                                <li class="nav-item <?php if($i=='tasks' && $j =='Rejected'){?>active open<?php ;}?>">
                                    <a href="/admin/tasks/getTasks/Rejected" class="nav-link ">
                                    	<i class="fa fa-thumbs-up"></i>
                                        <span class="title">Approved</span>
                                    </a>
                                </li>
                            </ul>
                            @endif
                            @if(Auth::user()->user_type == "User")
                            <ul class="sub-menu">
                                <li class="nav-item <?php if($i=='tasks' && $j =='Running'){?>active open<?php ;}?>">
                                    <a href="/admin/tasks/getTasks/Running" class="nav-link ">
                                    	<i class="fa fa-database"></i>
                                        <span class="title">Running </span>
                                        <span class="badge badge-danger running_badge" @if($running <= 0) style="display:none;" @endif>{{$running}}</span>
                                    </a>
                                </li>
                                <li class="nav-item <?php if($i=='tasks' && $j =='Finished'){?>active open<?php ;}?>">
                                    <a href="/admin/tasks/getTasks/Finished" class="nav-link ">
                                    	<i class="fa fa-database"></i>
                                        <span class="title">Finished</span>
                                        <span class="badge badge-danger finished_badge" @if($notification <= 0) style="display:none;" @endif>{{$notification}}</span>
                                    </a>
                                </li>
                                <li class="nav-item <?php if($i=='tasks' && $j =='calendar'){?>active open<?php ;}?>">
                                    <a href="/admin/tasks/0/calendar" class="nav-link ">
                                    	<i class="fa fa-calendar"></i>
                                        <span class="title">Calendar</span>
                                    </a>
                                </li>
                            </ul>
                            @endif
                        </li>
                        
                        
                        
                        
                        
                    </ul>
                    <!-- END SIDEBAR MENU -->
                    <!-- END SIDEBAR MENU -->
                </div>
	</div>