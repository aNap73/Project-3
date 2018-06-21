console.log('RUNNING ANT JS');
var antJs = {
  alive: 'yes',  
  loginOnClick: function(event) {
    console.log('click!', event);
    antJs.login();
  },
  loginOnKeyUp: function(event){    
    if(event.key==='Enter'){
      console.log('Enter!', event);
      antJs.login();
    }
  },
  agree: function(){
   
  },
  validateEmail: function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  register: function(){
    var pw1 = $('#password').val();
    var pw2 = $('#password2').val();
    var eml = $('#email').val();
    $('#regErr').hide();
    if(!antJs.validateEmail(eml)){
      $('#regErr').text('Invalid Email Address');
      $('#regErr').show();
      return;
    }
    if(pw1.length<5){
      $('#regErr').text('Passwords must be at least 5 characters');
      $('#regErr').show();
      return;
    }
    
    
    
    if (pw1 !== pw2){
      $('#regErr').text('Passwords do not match');
      $('#regErr').show();
      return;
    }
    
    

    var newRegistration = {
      email: $('#email').val(),
      password: $('#password').val()     
    };
    $.ajax("/api/register/", {
      type: "POST",
      data: newRegistration
    }).then(
      
      function(data, status) {
        
        window.location.replace(data.route);
       
       
      }
    );
  },
  login: function()
  {
     
    var newLogin = {
      email: $('#email').val(),
      password: $('#password').val()
    };
   console.log(newLogin);
    // Send the POST request.
    $.ajax("/api/login", {
      type: "POST",
      data: newLogin
    }).then(
      function(data, status) {
        console.log(data);
        window.location.replace(data.route);
       
      }
    );
      
  }

}

