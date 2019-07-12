$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function (e) {
    Init();    
    currencyprice.Init();       
});
function Init() {    
    var btnsearchpackage = document.getElementById("btnsearchpackage");
    if (btnsearchpackage != undefined) {
        btnsearchpackage.addEventListener('click', function (event) {
            Getpackage(document.getElementById("refpackage"), document.getElementById("detailpackage"), document.getElementById("progresspackage"))
        });
    }
}

function Getpackage(ref, detail, progress) {
    $.ajax({
        type: 'POST',
        url: 'Home/Getpackage',
        data: {
            reference: ref.value
        },
        success: function (result) {            
            var item = JSON.parse(result);
            if (item.length > 0) {
                detail.innerText = item[0].pck_detail;
                progress.style.width = item[0].pck_progress + "%";
                progress.innerText = item[0].pck_progress + "%";
            }
        }
    });
}

function completeRight(cadena, item, length) {
    return (cadena.length < length) ? completeRight(cadena + item, item, length) : cadena;
}

function completeLeft(cadena, item, length) {
    return (cadena.length < length) ? completeLeft(item + cadena, item, length) : cadena;
}

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