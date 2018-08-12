<header class="page-header">
	<nav class="navbar mega-menu" role="navigation">
		<div class="container-fluid">
			<div class="clearfix navbar-fixed-top">
				<!-- Brand and toggle get grouped for better mobile display -->
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="toggle-icon">
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </span>
				</button>
				<!-- End Toggle Button -->
				<!-- BEGIN LOGO -->

		<div class="page-logo">

			<img src="/images/logo.png" alt="logo" height='20'  class="logo-default"/>

			<div class="menu-toggler sidebar-toggler hide">
				<!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
			</div>
		</div>
				<!--End page logo -->
				<!-- BEGIN SEARCH -->
				<form class="search" action="extra_search.html" method="GET">
					<input type="name" class="form-control" name="query" placeholder="Search...">
					<a href="javascript:;" class="btn submit md-skip">
						<i class="fa fa-search"></i>
					</a>
				</form>
				<!-- END SEARCH -->
				<div class="topbar-actions">
					<!-- BEGIN GROUP NOTIFICATION -->
					<div class="btn-group-notification btn-group" id="header_notification_bar">
						<button type="button" class="btn btn-sm md-skip dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<i class="icon-bell"></i>
							<span class="badge">7</span>
						</button>
						<ul class="dropdown-menu-v2">
							<li class="external">
								<h3>
									<span class="bold">12 pending</span> notifications</h3>
								<a href="#">view all</a>
							</li>
							<li>
								<ul class="dropdown-menu-list scroller" style="height: 250px; padding: 0;" data-handle-color="#637283">
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-success md-skip">
                                                                <i class="fa fa-plus"></i>
                                                            </span> New user registered. </span>
											<span class="time">just now</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-danger md-skip">
                                                                <i class="fa fa-bolt"></i>
                                                            </span> Server #12 overloaded. </span>
											<span class="time">3 mins</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-warning md-skip">
                                                                <i class="fa fa-bell-o"></i>
                                                            </span> Server #2 not responding. </span>
											<span class="time">10 mins</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-info md-skip">
                                                                <i class="fa fa-bullhorn"></i>
                                                            </span> Application error. </span>
											<span class="time">14 hrs</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-danger md-skip">
                                                                <i class="fa fa-bolt"></i>
                                                            </span> Database overloaded 68%. </span>
											<span class="time">2 days</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-danger md-skip">
                                                                <i class="fa fa-bolt"></i>
                                                            </span> A user IP blocked. </span>
											<span class="time">3 days</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-warning md-skip">
                                                                <i class="fa fa-bell-o"></i>
                                                            </span> Storage Server #4 not responding dfdfdfd. </span>
											<span class="time">4 days</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-info md-skip">
                                                                <i class="fa fa-bullhorn"></i>
                                                            </span> System Error. </span>
											<span class="time">5 days</span>
										</a>
									</li>
									<li>
										<a href="javascript:;">
                                                        <span class="details">
                                                            <span class="label label-sm label-icon label-danger md-skip">
                                                                <i class="fa fa-bolt"></i>
                                                            </span> Storage server failed. </span>
											<span class="time">9 days</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<!-- END GROUP NOTIFICATION -->
					<!-- BEGIN GROUP INFORMATION -->
					<div class="btn-group-red btn-group">
						<button type="button" class="btn btn-sm md-skip dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<i class="fa fa-plus"></i>
						</button>
						<ul class="dropdown-menu-v2" role="menu">
							<li class="active">
								<a href="#">New Post</a>
							</li>
							<li>
								<a href="#">New Comment</a>
							</li>
							<li>
								<a href="#">Share</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="#">Comments
									<span class="badge badge-success">4</span>
								</a>
							</li>
							<li>
								<a href="#">Feedbacks
									<span class="badge badge-danger">2</span>
								</a>
							</li>
						</ul>
					</div>
					<!-- END GROUP INFORMATION -->
					<!-- BEGIN USER PROFILE -->
					<div class="btn-group-img btn-group">
						<button type="button" class="btn btn-sm md-skip dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<span>Hi, {{Auth::user()->name}}</span>
						</button>
						<ul class="dropdown-menu-v2" role="menu">
							<li>
								<a href="page_user_profile_1.html">
									<i class="icon-user"></i> My Profile
									<span class="badge badge-danger">1</span>
								</a>
							</li>
							<li>
								<a href="app_calendar.html">
									<i class="icon-calendar"></i> My Calendar </a>
							</li>
							<li>
								<a href="app_inbox.html">
									<i class="icon-envelope-open"></i> My Inbox
									<span class="badge badge-danger"> 3 </span>
								</a>
							</li>
							<li>
								<a href="app_todo_2.html">
									<i class="icon-rocket"></i> My Tasks
									<span class="badge badge-success"> 7 </span>
								</a>
							</li>
							<li class="divider"> </li>
							<li>
								<a href="page_user_lock_1.html">
									<i class="icon-lock"></i> Lock Screen </a>
							</li>
							<li>
								<a href="/logout">
									<i class="icon-key"></i> Log Out </a>
							</li>
						</ul>
					</div>
					<!-- END USER PROFILE -->
					<!-- BEGIN QUICK SIDEBAR TOGGLER -->
					<button type="button" class="quick-sidebar-toggler md-skip" data-toggle="collapse">
						<span class="sr-only">Toggle Quick Sidebar</span>
						<i class="icon-logout"></i>
					</button>
					<!-- END QUICK SIDEBAR TOGGLER -->
				</div>
				<!-- END TOPBAR ACTIONS -->
			</div>
			<!-- BEGIN HEADER MENU -->

			<div class="nav-collapse collapse navbar-collapse navbar-responsive-collapse">
			  <ul class="nav navbar-nav">
				  @if(Auth::user()->user_type == "Allocator")
				  <li class="dropdown dropdown-fw  active open selected">
					  <a href="javascript:;"  class="text-uppercase">
						  <i class="icon-user"></i>
						  <span class="title">Users</span>
					  </a>
					  <ul class="dropdown-menu dropdown-menu-fw">
						  <li>
							  <a href="/admin/users/0">
								  <i class="fa fa-thumbs-up"></i>
								  <span class="title">Active</span>
							  </a>
						  </li>
						  <li>
							  <a href="/admin/users/1">
								  <i class="fa fa-remove"></i>
								  <span class="title">Decommissioned</span>
							  </a>
						  </li>
					  </ul>
				  </li>
				  @endif
					  <li class="dropdown dropdown-fw ">
						  <a href="javascript:;" class="text-uppercase">
							  <i class="icon-folder"></i>
							  <span class="title">Tasks</span>
						  </a>
						  @if(Auth::user()->user_type == "Allocator")
							  <ul class="dropdown-menu dropdown-menu-fw">
								  <li>
									  <a href="/admin/tasks/getTasks/Pending">
										  <i class="fa fa-question-circle"></i>
										  <span class="title">Pending</span>
										  <span class="badge badge-danger pending_badge" @if($pending <= 0) style="display:none;" @endif>{{$pending}}</span>
									  </a>
								  </li>

								  <li>
									  <a href="/admin/tasks/getTasks/Rejected">
										  <i class="fa fa-thumbs-up"></i>
										  <span class="title">Approved</span>
									  </a>
								  </li>
							  </ul>
						  @endif
						  @if(Auth::user()->user_type == "User")
							  <ul class="dropdown-menu dropdown-menu-fw">
								  <li>
									  <a href="/admin/tasks/getTasks/Running">
										  <i class="fa fa-database"></i>
										  <span class="title">Running </span>
										  <span class="badge badge-danger running_badge" @if($running <= 0) style="display:none;" @endif>{{$running}}</span>
									  </a>
								  </li>
								  <li>
									  <a href="/admin/tasks/getTasks/Finished">
										  <i class="fa fa-database"></i>
										  <span class="title">Finished</span>
										  <span class="badge badge-danger finished_badge" @if($notification <= 0) style="display:none;" @endif>{{$notification}}</span>
									  </a>
								  </li>
								  <li>
									  <a href="/admin/tasks/0/calendar">
										  <i class="fa fa-calendar"></i>
										  <span class="title">Calendar</span>
									  </a>
								  </li>
							  </ul>
						  @endif
								  </li>
							  </ul>

		   </div>
	</div>
	</nav>
</header>
