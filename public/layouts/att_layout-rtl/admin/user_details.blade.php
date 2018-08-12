<div class="portlet box green">
	<div class="portlet-title">
		<div class="caption">
			<i class="fa fa-gift"></i>Advance Validation
		</div>
		<div class="tools">
			<a href="javascript:;" class="collapse" data-original-title="" title="">
			</a>
			<a href="#portlet-config" data-toggle="modal" class="config" data-original-title="" title="">
			</a>
			<a href="javascript:;" class="reload" data-original-title="" title="">
			</a>
			<a href="javascript:;" class="remove" data-original-title="" title="">
			</a>
		</div>
	</div>
	<div class="portlet-body form">



		<form action="/admin/user/save" method="post" class="j-forms" id="j-forms" novalidate>

			{!! csrf_field() !!}

			<div class="content">

				<!-- start name -->
				<div class="j-row">
					<div class="span4">
						<label class="label label-center">Name</label>
					</div>
					<div class="span8 unit">
						<div class="input">
							<label class="icon-right" for="name">
								<i class="fa fa-user"></i>
							</label>
							<input type="text" id="name" name="name" @if(isset($user)) value="{{$user->name}}@endif">
						</div>
					</div>
				</div>
				<!-- end name -->

				<!-- start email -->
				<div class="j-row">
					<div class="span4">
						<label class="label label-center">Email</label>
					</div>
					<div class="span8 unit">
						<div class="input">
							<label class="icon-right" for="email" >
								<i class="fa fa-envelope-o"></i>
							</label>
							@if(isset($user)) <input type="hidden" name="id" id="id" value="{{$user->id}}" />@endif
							<input type="email" id="email" name="email" @if(isset($user))value="{{$user->email}}"@endif>
						</div>
					</div>
				</div>
				<!-- end email -->

				<!-- start login -->
				<!-- end login -->

				<!-- start password -->
				<div class="j-row">
					<div class="span4">
						<label class="label label-center">Password</label>
					</div>
					<div class="span8 unit">
						<div class="input">
							<label class="icon-right" for="password">
								<i class="fa fa-lock"></i>
							</label>
							<input type="password" id="password" name="password">
						</div>
					</div>
				</div>
				<!-- end password -->


				<!-- start response from server -->
				<div id="response" style="display:none;"></div>
				<!-- end response from server -->

			</div>
			<!-- end /.content -->

			<div class="footer">
				<button type="submit" class="primary-btn" id="enable-button" >Register</button>
			</div>
			<!-- end /.footer -->

		</form>

	</div>
	<!-- END VALIDATION STATES-->
</div>
<div class="modal fade" id="basic" tabindex="-1" role="basic" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
				<h4 class="modal-title">Success</h4>
			</div>
			<div class="modal-body">
				Successfully registered
			</div>
			<div class="modal-footer">
				<button type="button" class="btn default" data-dismiss="modal">Close</button>

			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>