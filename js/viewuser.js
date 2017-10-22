//Function for extract parameters from querystring
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
    console.log(data); 
    //document.getElementById('username').value = '';
    $('#username').val(data.username);
    $('#password').val(data.password);
    $('#fname').val(data.fname);
    $('#lname').val(data.lname);
    $('#email').val(data.email);
    $('#tel').val(data.tel);
    //If user click edit, go to edituser page
    $("#edituser").click(function () {
      window.location.href = "edituser.html?id=" + data.id;
    });
    $("#editpassword").click(function () {
      window.location.href = "editpassword.html?id=" + data.id;
    });
    $("#delete").click(function () {
      var id = 0;
      $.ajax({
          type: 'DELETE',
          url: "http://localhost:3000/data/" + data.id,
          mimeType: 'json',
          success: function (inf) {
              console.log('Delete!');
              setTimeout(window.location.href = "index.html", 30000);
          }
      });
      //setTimeout(location.reload.bind(location), 900);
  });
  });
});
