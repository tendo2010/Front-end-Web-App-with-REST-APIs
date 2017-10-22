$.validator.setDefaults({
  submitHandler: function () {
    $("#suc").show();
  }
});
$.validator.methods.equal = function (value, element, param) {
  return value == param;
};
$().ready(function () {
  var validator = $("#signupForm").bind("invalid-form.validate", function () {
    $("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
  }).validate({
    debug: true,
    errorElement: "em",
    errorContainer: $("#warning, #summary"),
    errorPlacement: function (error, element) {
      error.appendTo(element.parent("div").next("span"));
    },
    success: function (label) {
      //label.text("").addClass("success");
      $("#err").hide();
    },
    rules: {
      fname: "required",
      lname: "required",
      username: {
        required: true,
        minlength: 3
      },
      password: {
        required: true,
        minlength: 4
      },
      confirmpassword: {
        required: true,
        minlength: 4,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        minlength: 10,
        maxlength: 10,
      }
    },
    messages: {
      fname: "Please enter your first name.",
      lname: "Please enter your last name.",
      username: {
        required: "Please input your username.",
        minlength: "Username must be at least 3 characters."
      },
      password: {
        required: "Please provide a password.",
        minlength: "Your password must be at least 4 characters."
      },
      confirmpassword: {
        required: "Please provide a password.",
        minlength: "Your password must be at least 4 characters.",
        equalTo: "Please enter the same password as above."
      },
      email: "Please input your email address.",
      tel: "Please input your telephone."
    },
    highlight: function (element) {
      $(element).closest('.form-group').addClass('has-error');
      $("#err").show();
    },
    unhighlight: function (element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
  });
});

function validatePhone(tel) {
  var a = document.getElementById(tel).value;
  var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  if (filter.test(a)) {
    return true;
  } else {
    return false;
  }
};

$("#signup").click(function () {
  
  var newuser = {};
  var id = null;
  $.get("http://localhost:3000/data", function (data) {   
      id = data[data.size - 1].id + 1; //last id+1
  });
  newuser.id = null;
  newuser.username = $("#username").val();
  newuser.password = $("#password").val();
  newuser.confirmpassword = $("#confirmpassword").val();
  newuser.fname = $("#fname").val();
  newuser.lname = $("#lname").val();
  newuser.email = $("#email").val();
  newuser.tel = $("#tel").val();
  newuser.status = $("#status").val();
  console.log(newuser);
  var url = "http://localhost:3000/data";
  $.post(url, newuser, function (data, status) {
    alert('Created successfully');
    console.log("Inserted " + data);
    setTimeout(window.location.href = "signin.html", 1000);
});

//   if(password == confirmpassword){
//   var id;
//   $.get("http://localhost:3000/data", function (data) {   
//     id = data[data.size() - 1].id + 1; //last id+1
//   });

  // $.ajax({
  //   type: 'POST',
  //   contentType: 'application/json',
  //   url: "http://localhost:3000/data",
  //   dataType: "json",
  //   data: JSON.stringify({
  //     "id": id,
  //     "username": newuser.username,
  //     "password": newuser.password,
  //     "fname": newuser.firstname,
  //     "lname": newuser.lastname,
  //     "email": newuser.email,
  //     "tel": newuser.tel
  //   }),
  //   success: function (data, textStatus, jqXHR) {
  //     alert('Created successfully');
  //   },
  //   error: function (jqXHR, textStatus, errorThrown) {
  //     alert(textStatus);
  //   }
  // });
});
