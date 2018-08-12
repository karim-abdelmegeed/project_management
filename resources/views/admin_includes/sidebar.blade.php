@if(Auth::user() && !session()->has('external_agency_quiz_token'))


    {{--@@START@@--}}

    @if(\Illuminate\Support\Facades\Auth::user()->roles[0]->name=="admin")

        <li class="m-menu__item <?php if(isset($i) && isset($_GET['i']) && $_GET['i'] == '1'){?>m-menu__item--active <?php ;}?>"
            aria-haspopup="true">
            <a href="/groups/?i=1" class="m-menu__link">
                <i class="m-menu__link-icon fa fa-group"></i>
                <span class="m-menu__link-title">
				<span class="m-menu__link-wrap">
					<span class="m-menu__link-text">
						Groups
					</span>
					<span class="hide m-menu__link-badge">
						<span class="m-badge m-badge--danger">
							2
						</span>
					</span>
				</span>
			</span>
            </a>
        </li>
    @endif

    @if(\Illuminate\Support\Facades\Auth::user()->roles[0]->name=="admin")
        <li class="m-menu__item <?php if(isset($i) && isset($_GET['i']) && $_GET['i'] == '2' ){?>m-menu__item--active <?php ;}?>"
            aria-haspopup="true">

            <a href="/privilege/?i=2" class="m-menu__link">
                <i class="m-menu__link-icon fa fa-database"></i>
                <span class="m-menu__link-title">
				<span class="m-menu__link-wrap">
					<span class="m-menu__link-text">
						Privileges
					</span>
					<span class="hide m-menu__link-badge">
						<span class="m-badge m-badge--danger">
							2
						</span>
					</span>
				</span>
			</span>
            </a>
        </li>
    @endif
    @if(\Illuminate\Support\Facades\Auth::user()->roles[0]->name=="admin")
        <li class="m-menu__item <?php if(isset($i) && isset($_GET['i']) && $_GET['i'] == '3' ){?>m-menu__item--active <?php ;}?>"
            aria-haspopup="true">
            <a href="/user/?i=3" class="m-menu__link">
                <i class="m-menu__link-icon fa fa-user"></i>
                <span class="m-menu__link-title">
				<span class="m-menu__link-wrap">
					<span class="m-menu__link-text">
						Users
					</span>
					<span class="hide m-menu__link-badge">
						<span class="m-badge m-badge--danger">
							2
						</span>
					</span>
				</span>
			</span>
            </a>
        </li>
    @endif

		<li class="m-menu__item <?php if(isset($i) && isset($_GET['i']) && $_GET['i'] == '7' ){?>m-menu__item--active <?php ;}?>"
			aria-haspopup="true">
			<a href="/task/view_rated_tasks/?i=7" class="m-menu__link">
				<i class="m-menu__link-icon fa fa-bookmark"></i>
				<span class="m-menu__link-title">
				<span class="m-menu__link-wrap">
					<span class="m-menu__link-text">
						 Dashboard
					</span>
					<span class="hide m-menu__link-badge">
						<span class="m-badge m-badge--danger">
							2
						</span>
					</span>
				</span>
			</span>
			</a>
		</li>
		<li class="m-menu__item <?php if(isset($i) && isset($_GET['i']) && $_GET['i'] == '4' ){?>m-menu__item--active <?php ;}?>"
        aria-haspopup="true">
        <a href="/workflowyee/?i=4" class="m-menu__link">
            <i class="m-menu__link-icon fa fa-binoculars"></i>
            <span class="m-menu__link-title">
				<span class="m-menu__link-wrap">
					<span class="m-menu__link-text">
						Workflowy
					</span>
					<span class="hide m-menu__link-badge">
						<span class="m-badge m-badge--danger">
							2
						</span>
					</span>
				</span>
			</span>
        </a>
    </li>


    {{--@@END@@--}}

@endif