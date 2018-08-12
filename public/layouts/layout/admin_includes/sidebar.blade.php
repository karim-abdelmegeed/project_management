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
			<ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
				<!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
				<li class="sidebar-toggler-wrapper">
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<div class="sidebar-toggler">
					</div>
					<!-- END SIDEBAR TOGGLER BUTTON -->
				</li>
				<!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
				<li class="sidebar-search-wrapper">
					<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
					<!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
					<!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
					<form class="sidebar-search " action="extra_search.html" method="POST" style="display:none;">
						<a href="javascript:;" class="remove">
						<i class="icon-close"></i>
						</a>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search...">
							<span class="input-group-btn">
							<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
							</span>
						</div>
					</form>
					<!-- END RESPONSIVE QUICK SEARCH FORM -->
				</li>
                <li class="heading">
					<h3 class="uppercase">{{$company->name}}</h3>
				</li>
				<li class="<?php if($i==1){?>active open<?php ;}?>">
					@if($current_user->user_type == "Owner" || $current_user->user_type == "Super User" || $current_user->user_type == 'Admin')
					<a href="javascript:;">
					<i class="icon-home"></i>
					<span class="title">Company</span>
					<span <?php if($i==1){?>class="selected"<?php ;}?>></span>
					<span class="arrow <?php if($i==1){?>open<?php ;}?>"></span>
					</a>
						<ul class="sub-menu">
                    	@if($current_user->user_type == "Super User")
                            <li <?php if($i==1 && $j==1){?>class="active"<?php ;}?>>
                                <a href="/admin/companies">
                                Companies</a>
                            </li>
                        @endif
                    	@if($current_user->user_type == "Owner" || $current_user->user_type == "Super User")
                            <li <?php if($i==1 && $j==2){?>class="active"<?php ;}?>>
                                <a href="/admin/users">
                                Users</a>
                            </li>
                        @endif
                    	@if($current_user->user_type == "Owner" || $current_user->user_type == "Super User")
                            <li <?php if($i==1 && $j==3){?>class="active"<?php ;}?>>
                                <a href="/admin/clients">
                                Clients</a>
                            </li>
                        @endif
								<li <?php if($i==1 && $j==4){?>class="active"<?php ;}?>>
									<a href="/admin/holidays">
										Holidays</a>
								</li>
					</ul>
					@endif

				</li>
				<li <?php if($i==2){?>class="active open"<?php ;}?>>
					<a href="javascript:;">
					<i class="icon-folder"></i>
					<span class="title">Projects</span>
					<span <?php if($i==2){?>class="selected"<?php ;}?>></span>
					<span class="arrow <?php if($i==2){?>open<?php ;}?>"></span>
					</a>
					<ul class="sub-menu">

							<li <?php if($i==2 && $j==1){?>class="active"<?php ;}?>>
								<a href="/admin/projects">
									Projects</a>
							</li>

						<li <?php if($i==2 && $j==2){?>class="active"<?php ;}?>>
							<a href="/admin/tasks">
							Tasks</a>
						</li>

					</ul>
				</li>
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>