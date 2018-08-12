<!--[if lt IE 9]>
<script src="/assets/global/plugins/respond.min.js"></script>
<script src="/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="{{asset('assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/pjax.js')}}" type="text/javascript"></script>
<script>
$(document).on('ready', function () {
    new Pjax({
        elements: "a.pjax-link",
        selectors: ["#pjax-container", "title", ".page-title"]
    })
});
$(document).on('pjax:complete', function (response) {
    appUnBlockUI();
	
	
});
$(document).on('pjax:send', function () {
    appBlockUI();
});
</script>
<script src="{{asset('assets/global/plugins/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/js.cookie.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/global/plugins/jquery.blockui.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/uniform/jquery.uniform.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/global/plugins/magnific-popup/jquery.magnific-popup.min.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/admin/pages/scripts/popups.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="{{asset('assets/admin/pages/scripts/jquery.form.js')}}" type="text/javascript"  charset="UTF-8"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="{{asset('assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/pages/scripts/components-bootstrap-select.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/js/jquery-editable-select.min.js')}}"></script>
<script src="{{asset('assets/js/jquery.blockUI.js')}}" type="text/javascript"></script>


<!-- Amcharts -->
<script src="{{asset('js/amcharts/amcharts.js')}}"></script>
<script src="{{asset('js/amcharts/serial.js')}}"></script>
<script src="{{asset('js/amcharts/pie.js')}}"></script>
<script src="{{asset('js/amcharts/themes/light.js')}}"></script>
<!-- END CORE PLUGINS -->
<!-- BENGIN PAGE LEVEL PLUGINS !-->
@yield('plugins_js')
<!-- END PAGE LEVEL PLUGINS !-->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="{{asset('assets/global/scripts/app.js')}}" type="text/javascript"></script>
@yield('theme_js')
<!-- END THEME GLOBAL SCRIPTS -->
@yield('page_js')
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="{{asset('assets/admin/layout/scripts/layout.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/admin/layout/scripts/demo.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/admin/global/scripts/quick-sidebar.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/Connection.js')}}"></script>
@include('admin_includes.socket_connection')
@include("browsernotifications.browsernotifications")
<script type="text/javascript" src="{{asset('assets/global/plugins/datatables/datatables.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/global/plugins/datetimepicker/bootstrap-datetimepicker.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/global/plugins/jsvalidation.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/global/plugins/bootstrap-toastr/toastr.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/sweetalert2.min.js')}}"></script>
<script src="{{asset('assets/global/plugins/select2/js/select2.full.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/pages/scripts/components-select2.min.js')}}" type="text/javascript"></script>
<script type="text/javascript" src="{{asset('assets/scripts.js')}}"></script>
<script src="{{asset('assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js')}}" type="text/javascript"></script>
<script type="text/javascript" src="{{asset('assets/ajaxForms.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/week-picker.js')}}"></script>

<script type="text/javascript" src="{{asset('assets/fine-uploader/fine-uploader.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/fine-uploader/fine-uploader.map.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/steps.js')}}"></script>
@include('vendor.fine-uploader.templates.simple-thumbnails')





<script type="text/javascript">
var serverClock = jQuery("#serverClock");
 
if (serverClock.length > 0) {
 
    showServerTime(serverClock, serverClock.text());
 
}
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
function showServerTime(obj, time) {
refreshSignInOut();
d = new Date(time);	

setInterval(function(){
	
		  d.setSeconds(d.getSeconds() + 1);
		  var dayNumber = d.getDate();
		  var month = d.getMonth() + 1; //Months are zero based
		  var year = d.getFullYear();
		  var dayName = d.getDay(); 
		  var hours = d.getHours();
		  var mins = d.getMinutes();
		  var secs = d.getSeconds();
		  
		  if(divisibleBy(mins,5) && secs == 0){
			  refreshSignInOut();
		  }
		  if(hours > 12){
			  
			meridian = "PM";
			hours = hours-12;		  
		  }else{
			  if(hours==0){
				hours = 12;  
			  }
			meridian = "AM";  
		  }
		  newTime = weekday[dayName]+ ", "+pad(dayNumber,2)+" "+monthNames[month-1]+ " "+pad(hours,2)+":"+pad(mins,2)+":"+pad(secs,2)+" "+meridian;
		  $("#serverClock").html(newTime);
		  $(".clockContainer").css("display","inline");
		  
	}, 1000);
}


function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function divisibleBy(numerator,denominator){
	var result = 	parseInt(numerator)/ parseInt(denominator);
	if(Number.isInteger(result)){
		
		return true;
	}else{
		
		return false;
	}
}
</script>
<!-- END THEME LAYOUT SCRIPTS -->
@yield('layout_js')
