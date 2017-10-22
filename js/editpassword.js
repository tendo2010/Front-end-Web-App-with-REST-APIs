$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}
$(function(){
  //Get user Id from querystring parameters
  var id = $.urlParam('id');
  //Create a Web Api url for getting a member info
  var url = "http://localhost:3000/data/" + id;
  console.log(url);
  $.get(url, function(data, status) {
    // console.log(data);
    //Set data to form elements
    $('.username').append(data.username);

    $("#cancel").click(function () {
      window.location.href = "viewuser.html?id=" + data.id;
    });
    $("#save").click(function(){
      // console.log(data.Password);
      var datapassword = data.password;
      var oldpassword = $("#oldpassword").val();
      var newpassword = $("#newpassword").val();
      var renewpassword = $("#renewpassword").val();
      if(oldpassword == datapassword){
        if (newpassword == renewpassword) {
          var newuser = { };
          newuser.id = data.id;
          newuser.username = data.username;
          newuser.password = $("#newpassword").val();
          newuser.fname = data.fname;
          newuser.lname = data.lname;
          newuser.email = data.email;
          newuser.tel = data.tel;
          // console.log(JSON.stringify(newuser));
          var updateUrl = "http://localhost:3000/data/" + data.id;
          $.ajax({
            url: updateUrl,
            type: 'PUT',
            data: newuser,
            success: function(result) {
              alert('Updated Complete!');
              window.location.href = "signin.html?id=" + data.id;
            }
          });
        }else{
          alert('New Password not match !');
        }
      }else{
        alert('Old Password Wrong !');
      }
    });
  });
});
