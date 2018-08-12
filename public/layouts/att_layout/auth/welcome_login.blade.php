<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">


<link href='/css/login.css' rel="stylesheet" type="text/css">
<link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"/>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
   

<title>Login</title>
</head>

<body class="welcome-background">

    	<div class="row welcome-header"><img class="logo" src="/images/logo 2.png" /></div>
	
            <div class="row body-content">
                <div class="col-xl-8 col-md-12  welcome-content-8">
                        <div class="img ">
                        
                              <div class="col-lg-6 welcome-text">
                                <span class="welcome-title">WELCOME</span>
                                <span class="welcome-msg">to the Linguistix Tank Management System <br />
                                    Please enter your email and password to login</span>
                              </div>
                              
                              <div class="col-lg-6 col-md-12 login">
                              
                                <div class="black-bk">
                                
                                	<div class="first">
                                        <img class="small-logo" src="/images/logoicon.png" />
                                        <div class="login-msg">Login below</div>
                                    </div>
@yield('login_body')
                                   


                                
                                </div>
                    
                             </div>
                      </div>
                </div> 
                
                <div class="col-md-4 welcome-content-4"></div>
                
            </div>
            <div class="row footer">
            <span class="footer-font">LinguistixTank mangement system<br /> Development by Arabic Localizer</span>
            </div>
            <div class="hidden" id="hidden">
            @include('auth.passwords.email')
            </div>
   <?php if(isset($_GET['reset'])){?>
    <script>
  $( document ).ready(function() {
  $('.for-pass').click();
});
    </script>
    <?php } ?>
 <script type="text/javascript">
$(document).on('click','#login_button', function () {
    $(this).attr('disabled','disabled');
    $(".login-form").submit();
});



	setTimeout(function(){ location.reload(); }, 7200000);
	$(document).on('click','.for-pass',function(e){
     e.preventDefault();
	 $(".help-block").hide();
    $('#form').remove();
    var clone = $('#hidden').find('.reset').clone();
    $('.form').append(clone);
    $('.third').remove();
    $("#login_button").remove();
    $('.login-msg').html('Enter Your Email');
    if(window.location.href.indexOf("?reset") > -1){
    }
    else{
      window.history.replaceState(null, null, window.location+"?reset");
    }
    })
	</script>
</body>
</html>











