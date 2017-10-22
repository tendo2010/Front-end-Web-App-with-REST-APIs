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
  $.getJSON(url, function(data, status) {
    console.log(data);
    //Set data to form elements
    $('#username').val(data.username);
    $('#password').val(data.password);
    $('#fname').val(data.fname);
    $('#lname').val(data.lname);
    $('#email').val(data.email);
    $('#tel').val(data.tel);
    //If user click cancel, go to userinfo page
    $("#cancel").click(function () {
      window.location.href = "viewuser.html?id=" + data.id;
    });
    //Save updated data
    $("#save").click(function () {
      //Set update data to newuser object
      var newuser = { };
      newuser.id = data.id;
      newuser.username = $("#username").val();
      newuser.password =  $('#password').val();
      newuser.fname = $("#fname").val();
      newuser.lname = $("#lname").val();
      newuser.email = $("#email").val();
      newuser.tel = $("#tel").val();
      // console.log(JSON.stringify(newuser));
      //Creat a url for update member data
      var updateUrl = "http://localhost:3000/data/" + data.id;
      //Call Web Api with method PUT for updating
      $.ajax({
        url: updateUrl,
        type: 'PUT',
        data: newuser,
        success: function(result) {
          alert('Updated Complete!');
          window.location.href = "viewuser.html?id=" + data.id;
        }
      });
    });
  });
});
