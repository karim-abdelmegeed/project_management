
<div class="portlet box grey-cascade">
	<div class="portlet-title">
		<div class="caption">
			<i class="fa fa-globe"></i>Managed Table
		</div>
		<div class="tools">
			<a href="javascript:;" class="collapse">
			</a>
			
			
			
		</div>
	</div>
	<div class="portlet-body">
		<div class="table-toolbar">
			<div class="row">
				<div class="col-md-6">
					<div class="btn-group">
						<a href="javascript: taps.loadajaxpage('user/add')" >
						<button id="sample_editable_1_new" class="btn green">
						Add New <i class="fa fa-plus"></i>
						</button>
					</a>
					</div>
			  </div>
				<div class="col-md-6"></div>
			</div>
		</div>
		<table class="table table-striped table-bordered table-hover" id="sample_1">
		<thead>
		<tr class="tr-head">
			<th class="table-checkbox">
				<input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes"/>
			</th>
			<th>
				 Username
			</th>
			<th>
				 Email
			</th>
			<th>
				 User Roles
			</th>
			<th>
				 Actions
			</th>
		</tr>
		</thead>
		<tbody>
        @foreach($users as $user)
		<tr class="odd gradeX">
			<td valign="middle">
				<input type="checkbox" class="checkboxes" value="1"/>
			</td>
			<td valign="middle">
				 {{$user->name}}
		  </td>
			<td valign="middle">
				<a href="mailto:shuxer@gmail.com">
				{{$user->email}} </a>
		  </td>
			<td valign="middle">
				 {{$user->user_type}}
		  </td>
			<td valign="middle"><a href="javascript: taps.loadajaxpage('user/{{$user->id}}')"><button type="button" class="btn green"><i class="fa fa-edit"></i> Edit</button></a>
                                <button type="button" class="btn red"><i class="fa fa-remove"></i> Delete</button></td>
		</tr>
        @endforeach
		</tbody>
		</table>
	</div>
</div>