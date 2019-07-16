$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function (e) {    
    currencyprice.Init();
    package.Init();
    question.Init();
});


function login() {
    //'@Url.Action("Login")';
    var _usr = $('#inputUser').val();
    var _pswd = $('#inputPassword').val();
    var url = "Account/Login?usr=" + _usr + "&pswd=" + _pswd;
    $.get(url, function (data) {
        $("#menu").html(data);
    });
}


//$("#btn').on("click", login);


$('#btnLogin').click(function () {
    login();

    //    var _usr = $('#inputUser').val();
    //    var _pswd = $('#inputPassword').val;

    //    $.ajax({

    //        url: '@Url.Action("Login", "Admin")',
    //        type: "Post",
    //        dataType: "html",
    //        data: { usr: _usr, pswd: _pswd },//this is as per your requirement
    //        success: function (data) {
    //            $('#menu').html(data);
    //        },
    //    });
});