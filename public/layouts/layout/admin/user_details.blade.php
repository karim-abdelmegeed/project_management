<div class="portlet box green">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-globe"></i></div>
							<div class="tools">
								<a href="javascript:;" class="collapse" data-original-title="" title="">
								</a>
							
							</div>
						</div>
						<div class="portlet-body form">
							
							

		<form action="/admin/user/save" method="post" class="j-forms" id="j-forms" novalidate>
<input type="hidden" name="company_id" id="company_id" value="{{$current_user->company_id}}"/>
 @if(isset($user)) <input type="hidden" name="id" id="id" value="{{$user->id}}" />@endif
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
							<input type="text" id="name" name="name" @if(isset($user)) value="{{$user->name}}@endif" >
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
                          
							<input type="email" id="email" name="email" @if(isset($user))value="{{$user->email}}"@endif>
						</div>
					</div>
				</div>
				<!-- end email -->

				<div class="j-row">
					<div class="span4">
						<label class="label label-center">Type</label>
					</div>
					<div class="span8 unit">
						<label class="input select">
							<select name="user_type">
								<option {{$user && $user->user_type? '':'selected'}} value=""></option>
								@foreach($types as $type)
									<option @if($user && $user->user_type == $type) selected @endif value="{{$type}}" >{{$type}}</option>
								@endforeach
							</select>
							<i></i>
						</label>
					</div>
				</div>
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
				<!-- start Color -->
			  <div class="j-row">
              		<div class="span4">
						<label class="label label-center">Color</label>
					</div>
					<div class="span8 unit">
						
						<label class="color-group" for="hex">
							<input type="text" id="hex" class="hex" name="user_color" @if(isset($user))value="{{$user->user_color}}"@endif>
						</label>
					</div>
				</div>
				<!-- end Color -->


				<!-- start response from server -->
				<div id="response" style="display:none;"></div>
				<!-- end response from server -->

			</div>
			<!-- end /.content -->

			<div class="footer">
				<button type="submit" class="primary-btn" id="enable-button" >Submit</button>
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