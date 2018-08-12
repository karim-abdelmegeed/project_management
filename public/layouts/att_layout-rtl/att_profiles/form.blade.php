<form action="{{route('admin.att_profiles.save')}}" method="post" class="ajax_form j-forms larajsval form" id="main-form" novalidate>
    <div class="header">
        <p>
            <i class="fa fa-folder"></i> @if(empty($att_profile->name))New Attendance Profile @else {{$att_profile->name}} @endif
        </p>
    </div>
    <input type="hidden" name="_token" value="{{ csrf_token() }}">

    <div class="content">
        @if(Auth::user()->role_id == 1)
            <div class="unit">
                <label class="label">Office</label>
                <label class="input select">
                    <select name="office_id" data-validation="required" data-name="Office" class="form-control">
                        <option value="" @if(empty($att_profile->office_id)) selected @endif >Select Office</option>
                        @foreach($offices as $office)
                            <option value="{{$office->id}}" <?php if($office->id == $att_profile->office_id){?>selected<?php ;}?>>{{$office->name}}</option>
                        @endforeach
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        @endif
        @if(Auth::user()->role_id == 2)
            <input type="hidden" name="office_id" id="office_id" value="{{Auth::user()->office_id}}"  data-validation="" data-name="office_id"  />
        @endif
        <div class="unit">
            <label class="label">Profile Type</label>
            <label class="input select">
                <select name="profile_type" data-validation="required" data-name="Profile Type" class="form-control">
                    <option value="">Select Option</option>
                    <option value="Normal" <?php if("Normal" == $att_profile->profile_type){?>selected<?php ;}?>>Normal</option>
                    <option value="Holiday" <?php if("Holiday" == $att_profile->profile_type){?>selected<?php ;}?>>Work On Weekend/Holiday</option>
                    <option value="1st_half" <?php if("1st_half" == $att_profile->profile_type){?>selected<?php ;}?>>Half Day(First Half)</option>
                    <option value="2nd_half" <?php if("2nd_half" == $att_profile->profile_type){?>selected<?php ;}?>>Half Day(Second Half)</option>
                </select>
                <span class="error_message"></span>
                <i></i>
            </label>
        </div>
        <input type="hidden" name="company_id"  data-validation="" data-name="company_id" value="{{Auth::user()->company_id}}"/>
        <div class="unit">
            <label class="label">Name</label>
            <div class="input">
                <label class="icon-right">
                    <i class="fa fa-anchor"></i>
                </label>
                <input name="name" type="text" class="form-control" data-validation="required" data-name="Name" value="{{$att_profile->name}}" >
                <span class="error_message"></span>
            </div>
        </div>
        <input type="hidden" name="id" id="hiddenField" value="{{$att_profile->id}}" data-validation="" data-name="id" />
        <div class="unit">
            <label class="label">Sign In Required?</label>
            <label class="input select">
                <select name="sign_in_req" data-validation="required" data-name="Manager" class="form-control">
                    <option value="">Select Option</option>
                    <option value="1" <?php if(1 == $att_profile->sign_in_req){?>selected<?php ;}?>>Yes</option>
                    <option value="0" <?php if(0 == $att_profile->sign_in_req){?>selected<?php ;}?>>No</option>
                </select>
                <span class="error_message"></span>
                <i></i>
            </label>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="divider-text gap-top-20 gap-bottom-45">
                <span>Sign In Time Range</span>
            </div>
            <div class="j-row">
                <div class="span6 unit">
                    <label class="label">From</label>
                    <div class="input">
                        <label class="icon-right">
                            <i class="fa fa-clock-o"></i>
                        </label>
                        <input name="sign_in_start_time" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="From" value="{{$att_profile->sign_in_start_time}}" >
                        <span class="error_message"></span>
                    </div>
                </div>
                <div class="span6 unit">
                    <label class="label">To</label>
                    <div class="input">
                        <label class="icon-right">
                            <i class="fa fa-clock-o"></i>
                        </label>
                        <input name="sign_in_end_time" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="To" value="{{$att_profile->sign_in_end_time}}" >
                        <span class="error_message"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Employees are Allowed To Sign In Before Sign In Start Time By The Following Time Interval </label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="time_allowed_before_sign_in" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->time_allowed_before_sign_in}}" >
                    <span class="error_message"></span>
                </div>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Workday Hours</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="work_hours" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="Work Hours" value="{{$att_profile->work_hours}}" >
                    <span class="error_message"></span>
                </div>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Employee must sign out by</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="end_of_day" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="End of day" value="{{$att_profile->end_of_day}}" >
                    <span class="error_message"></span>
                </div>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Consider Employee Absent If Signed Out Before Calculated Sign Out Time By The Following Time Interval </label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="sign_out_cuttoff_time" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->sign_out_cuttoff_time}}" >
                    <span class="error_message"></span>
                </div>
            </div>
        </div>
        <div  class="form-group dependent" data-depending-on= "profile_type" data-depending-value= "Normal">
            <div class="unit">
                <label class="label">Weekends</label>
                <label class="input select">
                    <select id="weekends" name="weekends[]" data-validation="required" data-name="Weekends" class="form-control select2-multiple select2" multiple>
                        <optgroup label="Weekends">
                            <option value="Saturday" <?php  if (strpos($att_profile->weekends, 'Saturday') !== false) {?>selected="selected"<?php ;}?>>Saturday</option>
                            <option value="Sunday" <?php  if (strpos($att_profile->weekends, 'Sunday') !== false) {?>selected="selected"<?php ;}?>>Sunday</option>
                            <option value="Monday" <?php  if (strpos($att_profile->weekends, 'Monday') !== false) {?>selected="selected"<?php ;}?>>Monday</option>
                            <option value="Tuesday" <?php  if (strpos($att_profile->weekends, 'Tuesday') !== false) {?>selected="selected"<?php ;}?>>Tuesday</option>
                            <option value="Wednesday" <?php  if (strpos($att_profile->weekends, 'Wednesday') !== false) {?>selected="selected"<?php ;}?>>Wednesday</option>
                            <option value="Thursday" <?php  if (strpos($att_profile->weekends, 'Thursday') !== false) {?>selected="selected"<?php ;}?>>Thursday</option>
                            <option value="Friday" <?php  if (strpos($att_profile->weekends, 'Friday') !== false) {?>selected="selected"<?php ;}?>>Friday</option>
                        </optgroup>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div  class="form-group  dependent" data-depending-on= "profile_type" data-depending-value= "Normal">
            <div class="unit">
                <label class="label">Holiday Profile</label>
                <label class="input select">
                    <select name="holiday_profile_id" data-validation="required" data-name="Holiday Profile" class="form-control options_dependent" data-depending-on="office_id">
                        <option value="" @if(empty($att_profile->holiday_profile_id)) selected @endif>Select Option</option>
                        @foreach($holiday_profiles as $holiday_profile)
                            <option data-depending-value="{{$holiday_profile->office_id}}" value="{{$holiday_profile->id}}" <?php if($holiday_profile->id == $att_profile->holiday_profile_id){?>selected<?php ;}?>>{{$holiday_profile->name}}</option>
                        @endforeach
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div class="form-group  dependent" data-depending-on= "profile_type" data-depending-value= "Normal">
            <div class="unit">
                <label class="label">Week Start Day</label>
                <label class="input select">
                    <select id="week_start_day" name="week_start_day" data-validation="required" data-name="Week Start Day" class="form-control" >
                        <option value="1" <?php  if ($att_profile->week_start_day == 1)  {?>selected="selected"<?php ;}?>>Saturday</option>
                        <option value="2" <?php  if ($att_profile->week_start_day == 2)  {?>selected="selected"<?php ;}?>>Sunday</option>
                        <option value="3" <?php  if ($att_profile->week_start_day == 3)  {?>selected="selected"<?php ;}?>>Monday</option>
                        <option value="4" <?php  if ($att_profile->week_start_day == 4)  {?>selected="selected"<?php ;}?>>Tuesday</option>
                        <option value="5" <?php  if ($att_profile->week_start_day == 5)  {?>selected="selected"<?php ;}?>>Wednesday</option>
                        <option value="6" <?php  if ($att_profile->week_start_day == 6)  {?>selected="selected"<?php ;}?>>Thursday</option>
                        <option value="7" <?php  if ($att_profile->week_start_day == 7)  {?>selected="selected"<?php ;}?>>Friday</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Early Sign Out Action</label>
                <label class="input select">
                    <select id="early_signout_action" name="early_signout_action" data-validation="required" data-name="This field" class="form-control" >
                        <option value="Notify Managers" <?php  if ($att_profile->early_signout_action == "Notify Managers")  {?>selected="selected"<?php ;}?>>Notify Managers</option>
                        <option value="No Notification" <?php  if ($att_profile->early_signout_action == "No Notification")  {?>selected="selected"<?php ;}?>>No Notification</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Early Sign Out Deduction (In Days)</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-minus-square-o"></i>
                    </label>
                    <input name="early_signout_deduction_days" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->early_signout_deduction_days}}" >
                    <span class="error_message"></span>
                </div>
            </div>
        </div>
        <div class="form-group dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="unit">
                <label class="label">Early Sign Out Deducted From</label>
                <label class="input select">
                    <select name="early_signout_deduction_type" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="Leaves" <?php if("Leaves" == $att_profile->early_signout_deduction_type){?>selected<?php ;}?>>Normal Leaves</option>
                        <option value="Salary" <?php if("Salary" == $att_profile->early_signout_deduction_type){?>selected<?php ;}?>>Salary</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div class="divider-text gap-top-20 gap-bottom-45">
            <span>Leaves</span>
        </div>
        <div class="dependent" data-depending-on= "profile_type" data-depending-value= "Normal">
            <div class="unit">
                <label class="label">Number Of Normal Leaves Per Year</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-tasks"></i>
                    </label>
                    <input name="allowed_normal_leaves" type="text" class="form-control" data-validation="required,number" data-name="Normal Leave Per Year" value="{{$att_profile->allowed_normal_leaves}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Normal Leave Cutt-Off Time</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-minus-square-o"></i>
                    </label>
                    <input name="normal_leave_cuttoff" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="Cuttoff Time" value="{{$att_profile->normal_leave_cuttoff}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Allow Half Day?</label>
                <label class="input select">
                    <select name="allow_half_day" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="1" <?php if(1 == $att_profile->allow_half_day){?>selected<?php ;}?>>Yes</option>
                        <option value="0" <?php if(0 == $att_profile->allow_half_day){?>selected<?php ;}?>>No</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
            <div class="form-group dependent" data-depending-on="allow_half_day" data-depending-value="1">
                <div class="unit">
                    <label class="label">First Half Profile</label>
                    <label class="input select">
                        <select name="first_half_day_profile_id" data-validation="required" data-name="This field" class="form-control options_dependent" data-depending-on="office_id">
                            <option value="">Select Option</option>
                            @foreach($half_profiles as $profile)
                                <option  data-depending-value="{{$profile->office_id}}" value="{{$profile->id}}" <?php if($profile->id == $att_profile->first_half_day_profile_id){?>selected<?php ;}?>>{{$profile->name}}</option>
                            @endforeach
                        </select>
                        <span class="error_message"></span>
                        <i></i>
                    </label>
                </div>
            </div>
            <div class="form-group dependent" data-depending-on="allow_half_day" data-depending-value="1">
                <div class="unit">
                    <label class="label">Second Half Profile</label>
                    <label class="input select">
                        <select name="second_half_day_profile_id" data-validation="required" data-name="This field" class="form-control options_dependent" data-depending-on="office_id">
                            <option value="">Select Option</option>
                            @foreach($half_profiles as $profile)
                                <option data-depending-value="{{$profile->office_id}}" value="{{$profile->id}}" <?php if($profile->id == $att_profile->second_half_day_profile_id){?>selected<?php ;}?>>{{$profile->name}}</option>
                            @endforeach
                        </select>
                        <span class="error_message"></span>
                        <i></i>
                    </label>
                </div>
            </div>
            <div class="unit">
                <label class="label">Number Of Emergency Leaves Per Year</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-tasks"></i>
                    </label>
                    <input name="allowed_emergency_leaves" type="text" class="form-control" data-validation="required,number" data-name="Emergency Leave Per Year" value="{{$att_profile->allowed_emergency_leaves}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Allow Emergency Leaves Without Manager Permission?</label>
                <label class="input select">
                    <select name="emergency_leave_without_permission" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="1" <?php if(1 == $att_profile->emergency_leave_without_permission){?>selected<?php ;}?>>Yes</option>
                        <option value="0" <?php if(0 == $att_profile->emergency_leave_without_permission){?>selected<?php ;}?>>No</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div class="unit">
            <label class="label">No Show Absence Deduction/Deduction After Exhausting Emergency Leaves (In Days)</label>
            <div class="input">
                <label class="icon-right">
                    <i class="fa fa-eye"></i>
                </label>
                <input name="emergency_penalty" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->emergency_penalty}}" >
                <span class="error_message"></span>
            </div>
        </div>
        <div class="unit">
            <label class="label">Extra Absence Deducted From</label>
            <label class="input select">
                <select name="emergency_penalty_type" data-validation="required" data-name="This field" class="form-control">
                    <option value="">Select Option</option>
                    <option value="Leaves" <?php if("Leaves" == $att_profile->emergency_penalty_type){?>selected<?php ;}?>>Normal Leaves</option>
                    <option value="Salary" <?php if("Salary" == $att_profile->emergency_penalty_type){?>selected<?php ;}?>>Salary</option>
                </select>
                <span class="error_message"></span>
                <i></i>
            </label>
        </div>
        <div class="dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="divider-text gap-top-20 gap-bottom-45">
                <span>Overtime Work Policy</span>
            </div>
            <div class="unit">
                <label class="label">Allow Overtime</label>
                <label class="input select">
                    <select name="overtime_permissible" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="1" <?php if(1 == $att_profile->overtime_permissible){?>selected<?php ;}?>>Yes</option>
                        <option value="0" <?php if(0 == $att_profile->overtime_permissible){?>selected<?php ;}?>>No</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
            <div  class="dependent" data-depending-on="overtime_permissible" data-depending-value="1">
                <div class="unit">
                    <label class="label">Do Not Consider Overtime Unless After The Calculated Sign Out Time By The Following Time Interval </label>
                    <div class="input">
                        <label class="icon-right">
                            <i class="fa fa-clock-o"></i>
                        </label>
                        <input name="min_overtime_cuttoff" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->min_overtime_cuttoff}}" >
                        <span class="error_message"></span>
                    </div>
                </div>
                <div class="unit">
                    <label class="label">Apply Overtime Limit</label>
                    <label class="input select">
                        <select name="overtime_limit" data-validation="required" data-name="This field" class="form-control">
                            <option value="">Select Option</option>
                            <option value="1" <?php if(1 == $att_profile->overtime_limit){?>selected<?php ;}?>>Yes</option>
                            <option value="0" <?php if(0 == $att_profile->overtime_limit){?>selected<?php ;}?>>No</option>
                        </select>
                        <span class="error_message"></span>
                        <i></i>
                    </label>
                </div>
                <div class="dependent" data-depending-on="overtime_limit" data-depending-value="1">
                    <div class="form-group dependent" data-depending-on="profile_type" data-depending-value="Normal">
                        <div class="unit">
                            <label class="label">Overtime Hours Per Month Limit</label>
                            <div class="input">
                                <label class="icon-right">
                                    <i class="fa fa-clock-o"></i>
                                </label>
                                <input name="max_overtime_per_month" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This field" value="{{$att_profile->max_overtime_per_month}}" >
                                <span class="error_message"></span>
                            </div>
                        </div>
                    </div>
                    <div class="unit">
                        <label class="label">Overtime Hours Per Day Limit</label>
                        <div class="input">
                            <label class="icon-right">
                                <i class="fa fa-clock-o"></i>
                            </label>
                            <input name="max_overtime_per_day" type="text" class="form-control" data-validation="required" data-name="This field" value="{{$att_profile->max_overtime_per_day}}" >
                            <span class="error_message"></span>
                        </div>
                    </div>
                </div>
                <div class="unit">
                    <label class="label">Overtime Hour Factor</label>
                    <div class="input">
                        <label class="icon-right">
                            <i class="fa fa-key"></i>
                        </label>
                        <input name="overtime_payment_factor" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->overtime_payment_factor}}" >
                        <span class="error_message"></span>
                    </div>
                </div>

            </div>

        </div>

        <div class="dependent" data-depending-on="sign_in_req" data-depending-value="1">
            <div class="divider-text gap-top-20 gap-bottom-45">
                <span>Tardiness Policy</span>
            </div>
            <div class="unit">
                <label class="label">Do not consider late unless signed in after max sign in time by the following interval </label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="max_lateness_permissibility" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->max_lateness_permissibility}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Consider employee as tardy (minor) if signed in later than the maximum sign in time by up to :</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="minor_tardiness_range" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->minor_tardiness_range}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Tardiness (minor) deduction (In Days)</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-minus-square-o"></i>
                    </label>
                    <input name="minor_tardiness_penalty" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->minor_tardiness_penalty}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Tardiness (minor)e Deducted From</label>
                <label class="input select">
                    <select name="minor_tardiness_penalty_type" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="Leaves" <?php if("Leaves" == $att_profile->minor_tardiness_penalty_type){?>selected<?php ;}?>>Normal Leaves</option>
                        <option value="Salary" <?php if("Salary" == $att_profile->minor_tardiness_penalty_type){?>selected<?php ;}?>>Salary</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
            <div class="unit">
                <label class="label">Consider employee as tardy (major) if signed in later than the maximum sign in time by up to :</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="major_tardiness_range" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->major_tardiness_range}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Tardiness (major) deduction (In Days)</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-minus-square-o"></i>
                    </label>
                    <input name="major_tardiness_penalty" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->major_tardiness_penalty}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Tardiness (major)e Deducted From</label>
                <label class="input select">
                    <select name="major_tardiness_penalty_type" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="Leaves" <?php if("Leaves" == $att_profile->major_tardiness_penalty_type){?>selected<?php ;}?>>Normal Leaves</option>
                        <option value="Salary" <?php if("Salary" == $att_profile->major_tardiness_penalty_type){?>selected<?php ;}?>>Salary</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
        </div>
        <div class="dependent" data-depending-on="profile_type" data-depending-value="Normal">
            <div class="divider-text gap-top-20 gap-bottom-45">
                <span>Holiday/Weekend</span>
            </div>
            <div class="unit">
                <label class="label">Can Be Assigned Work On Holidays/Weekends</label>
                <label class="input select">
                    <select name="can_work_holiday" data-validation="required" data-name="This field" class="form-control">
                        <option value="">Select Option</option>
                        <option value="1" <?php if(1 == $att_profile->can_work_holiday){?>selected<?php ;}?>>Yes</option>
                        <option value="0" <?php if(0 == $att_profile->can_work_holiday){?>selected<?php ;}?>>No</option>
                    </select>
                    <span class="error_message"></span>
                    <i></i>
                </label>
            </div>
            <div class="dependent" data-depending-on="can_work_holiday" data-depending-value="1">
                <div class="unit">
                    <label class="label">Work On Holiday Profile</label>
                    <label class="input select">
                        <select name="work_on_holiday_profile_id" data-validation="required" data-name="This field" class="form-control">
                            <option value="">Select Option</option>
                            @foreach($work_on_holiday_profiles as $profile)
                                <option  value="{{$profile->id}}" <?php if($profile->id == $att_profile->work_on_holiday_profile_id){?>selected<?php ;}?>>{{$profile->name}}</option>
                            @endforeach
                        </select>
                        <span class="error_message"></span>
                        <i></i>
                    </label>
                </div>
                <div class="unit">
                    <label class="label">Holiday/Weekend Day Factor</label>
                    <div class="input">
                        <label class="icon-right">
                            <i class="fa fa-key"></i>
                        </label>
                        <input name="holiday_factor" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->holiday_factor}}" >
                        <span class="error_message"></span>
                    </div>
                </div>
                <div class="unit">
                    <label class="label">Holiday/Weekend Extra Hour Factor</label>
                    <div class="input">
                        <label class="icon-right">
                            <i class="fa fa-key"></i>
                        </label>
                        <input name="extra_holiday_hour_factor" type="text" class="form-control" data-validation="required,number" data-name="This field" value="{{$att_profile->extra_holiday_hour_factor}}" >
                        <span class="error_message"></span>
                    </div>
                </div>
            </div>
            <div class="divider-text gap-top-20 gap-bottom-45">
                <span>Permissions</span>
            </div>
            <div class="unit">
                <label class="label">Minimum Permission Unit</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-clock-o"></i>
                    </label>
                    <input name="min_permission_unit" type="text" class="form-control timepicker timepicker-24" data-validation="required" data-name="This Field" value="{{$att_profile->min_permission_unit}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Maximum Permissions Units Per Day</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-plus-square-o"></i>
                    </label>
                    <input name="max_units_per_day" type="text" class="form-control" data-validation="required,number" data-name="This Field" value="{{$att_profile->max_units_per_day}}" >
                    <span class="error_message"></span>
                </div>
            </div>
            <div class="unit">
                <label class="label">Maximum Permissions Units Per month</label>
                <div class="input">
                    <label class="icon-right">
                        <i class="fa fa-plus-square-o"></i>
                    </label>
                    <input name="max_units_per_month" type="text" class="form-control" data-validation="required,number" data-name="This Field" value="{{$att_profile->max_units_per_month}}" >
                    <span class="error_message"></span>
                </div>
            </div>

        </div>


    </div>

    <div id="response"></div>
    <div class="footer">
        <input type="submit" name="update" class="<?php if(isset($_GET['clone'])){?>hide<?php ;}?> btn btn-lg btn-edit do_save" value="Save"  >
        <input type="submit" name="new" class="<?php if(!isset($_GET['clone'])){?>hide<?php ;}?> btn btn-lg color do_clone" value="Save as new"  >
    </div>
    <input type="reset" class="hide resetForm" >

</form>