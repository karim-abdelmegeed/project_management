<div class="page-sidebar-wrapper">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar navbar-collapse collapse">
          <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 1100px;">
              <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">

                  @if(LoggedAccount::get()->isSuperAdmin())
                      <li class="nav-item start <?php if($i=='users'){?>active<?php ;}?>">
                          <a href="/admin/backend_user" class="nav-link nav-toggle">
                              <i class="icon-user"></i>
                              <span class="title">Users</span>
                          </a>
                      </li>
                  @endif
                  @if(LoggedAccount::get()->isSuperAdmin())
                      <li class="heading">
                          <h3 class="uppercase">Courses</h3>
                      </li>

                      <li class="nav-item  <?php if($i=='one-on-one'){?>active open<?php ;}?>">
                          <a href="javascript:;" class="nav-link nav-toggle">
                              <i class="icon-folder"></i>
                              <span class="title">One on one</span>
                              <span class="arrow"></span>
                          </a>
                          <ul class="sub-menu">
                              <li class="nav-item  <?php if($i=='one-on-one' && $j =='courses'){?>active open<?php ;}?>">
                                  <a href="/admin/one_on_one" class="nav-link ">
                                      <i class="fa fa-database"></i>
                                      <span class="title">Courses</span>
                                  </a>
                              </li>
                              <li class="nav-item  <?php if($i=='one-on-one' && $j =='schedules'){?>active open<?php ;}?>">
                                  <a href="/admin/one_schedule" class="nav-link ">
                                      <i class="icon-calendar"></i>
                                      <span class="title">Schedules</span>
                                  </a>
                              </li>
                          </ul>
                      </li>
                  @endif
                  @if(LoggedAccount::get()->isSuperAdmin())
                      <li class="nav-item  <?php if($i=='blended'){?>active open<?php ;}?>">
                          <a href="javascript:;" class="nav-link nav-toggle">
                              <i class="icon-folder"></i>
                              <span class="title">Blended</span>
                              <span class="arrow"></span>
                          </a>
                          <ul class="sub-menu">
                              <li class="nav-item <?php if($i=='blended' && $j =='courses'){?>active open<?php ;}?>">
                                  <a href="/admin/blended" class="nav-link ">
                                      <i class="fa fa-database"></i>
                                      <span class="title">Courses</span>
                                  </a>
                              </li>
                              <li class="nav-item <?php if($i=='blended' && $j =='templates'){?>active open<?php ;}?>">
                                  <a href="/admin/blended_template" class="nav-link ">
                                      <i class="fa fa-cubes"></i>
                                      <span class="title">Templates</span>
                                  </a>
                              </li>
                              <li class="nav-item <?php if($i=='blended' && $j =='schedules'){?>active open<?php ;}?>">
                                  <a href="/admin/blended_schedule" class="nav-link ">
                                      <i class="icon-calendar"></i>
                                      <span class="title">Schedules</span>
                                  </a>
                              </li>
                          </ul>
                      </li>
                  @endif
                      @if(LoggedAccount::get()->isSuperAdmin())
                          <li class="nav-item  <?php if($i=='elearning'){?>active open<?php ;}?>">
                              <a href="javascript:;" class="nav-link nav-toggle">
                                  <i class="icon-folder"></i>
                                  <span class="title">E-Learning</span>
                                  <span class="arrow"></span>
                              </a>
                              <ul class="sub-menu">
                                  <li class="nav-item <?php if($i=='elearning' && $j =='courses'){?>active open<?php ;}?>">
                                      <a href="/admin/elearning" class="nav-link ">
                                          <i class="fa fa-database"></i>
                                          <span class="title">Courses</span>
                                      </a>
                                  </li>
                              </ul>
                          </li>
                      @endif
                  @if(LoggedAccount::get()->isSuperAdmin())
                      <li class="nav-item start <?php if($i=='quizzes'){?>active<?php ;}?>">
                          <a href="/admin/quizzes" class="nav-link nav-toggle">
                              <i class="fa fa-question-circle"></i>
                              <span class="title">Quizzes</span>
                          </a>
                      </li>
                  @endif
                  <li class="heading">
                      <h3 class="uppercase">Others</h3>
                  </li>
                  <li class="nav-item  <?php if($i=='faqs'){?>active open<?php ;}?>">
                      <a href="javascript:;" class="nav-link nav-toggle">
                          <i class="fa fa-question-circle"></i>
                          <span class="title">FAQs</span>
                          <span class="arrow"></span>
                      </a>
                      <ul class="sub-menu">
                          @if(LoggedAccount::get()->isSuperAdmin())
                              <li class="nav-item <?php if($i=='faqs' && $j =='categories'){?>active open<?php ;}?>">
                                  <a href="{{route('admin.faq_category.index')}}" class="nav-link ">
                                      <i class="fa fa-database"></i>
                                      <span class="title">Categories</span>
                                  </a>
                              </li>
                          @endif
                          <li class="nav-item <?php if($i=='faqs' && $j =='index'){?>active open<?php ;}?>">
                              <a href="{{route('admin.faq.index',['status'=>'saved'])}}" class="nav-link ">
                                  <i class="fa fa-question"></i>
                                  <span class="title">FAQs</span>
                              </a>
                          </li>
                          <li class="nav-item <?php if($i=='faqs' && $j =='questions'){?>active open<?php ;}?>">
                              <a href="{{route('admin.user_question.index',['status'=>'new'])}}" class="nav-link ">
                                  <i class="fa fa-user"></i>
                                  <span class="title">User Questions</span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  @if(LoggedAccount::get()->isSuperAdmin())
                      <li class="nav-item  <?php if($i=='shifts'){?>active <?php ;}?>">
                          <a href="{{route('admin.shift.index')}}" class="nav-link">
                              <i class="fa fa-clock-o"></i>
                              <span class="title">Shifts</span>
                          </a>
                      </li>
                  @endif
              </ul>

              <div class="slimScrollBar" style="background: rgb(187, 187, 187); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 1100px;"></div>
          </div>
            <!-- BEGIN SIDEBAR MENU -->
                    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
                    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
                    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
                    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                   <!-- END SIDEBAR MENU -->


        </div>
</div>