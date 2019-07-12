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
        Getpackage(document.getElementById("refpackage"), document.getElementById("detailpackage"), document.getElementById("progresspackage"), document.getElementById("MostrarOcultarPackageDetail"))
    });
    var managerQuestionmensajes = document.getElementById("managerQuestionmensajes");
    if (managerQuestionmensajes != undefined)
        InitcurrencyManagerPackage(managerQuestionmensajes);

}

function getDateGT(fecha) {
    var fechaformateada = new Date(fecha);
    return fechaformateada.getDate() + "/" + (fechaformateada.getMonth() + 1) + "/" + fechaformateada.getFullYear() + " " + fechaformateada.getHours() + ":" + fechaformateada.getMinutes();
}

function InitcurrencyManagerPackage(managerQuestionmensajes) {
    $.ajax({
        type: 'POST',
        url: 'Home/GetMensagges',
        success: function (result) {
            JSON.parse(result).forEach(function (item) {
                var row = document.createElement("div");
                row.className = "row p-2 text-center";
                row.id = "rowManagerPackagedetail" + item.men_id;
                var divNombre = document.createElement("div");
                divNombre.className = "col-sm";
                divNombre.id = "divNombreManagerPackagemensaje" + item.men_id;
                var nombre = document.createElement("label");
                nombre.id = "nombreManagerPackagemensaje" + item.men_id;
                nombre.innerHTML = "<strong>Nombre:</strong> " + item.men_name;
                var divTelefono = document.createElement("div");
                divTelefono.className = "col-sm";
                divTelefono.id = "divTelefonoManagerPackagemensaje" + item.men_id;
                var Telefono = document.createElement("label");
                Telefono.id = "TelefonoManagerPackagemensaje" + item.men_id;
                Telefono.innerHTML = "<strong>Teléfono:</strong> " + item.men_phone;
                var divEmail = document.createElement("div");
                divEmail.className = "col-sm";
                divEmail.id = "divEmailManagerPackagemensaje" + item.men_id;
                var Email = document.createElement("label");
                Email.id = "EmailManagerPackagemensaje" + item.men_id;
                Email.innerHTML = "<strong>Email:</strong> " + item.men_email;
                var divfecha = document.createElement("div");
                divfecha.className = "col-sm";
                divfecha.id = "divfechaManagerPackagemensaje" + item.men_id;
                var fecha = document.createElement("label");
                fecha.id = "fechaManagerPackagemensaje" + item.men_id;
                fecha.innerHTML = "<strong>Fecha:</strong> " + getDateGT(item.men_date);
                managerQuestionmensajes.appendChild(row);
                row.appendChild(divNombre);
                divNombre.appendChild(nombre);
                row.appendChild(divTelefono);
                divTelefono.appendChild(Telefono);
                row.appendChild(divEmail);
                divEmail.appendChild(Email);
                row.appendChild(divfecha);
                divfecha.appendChild(fecha);

                var rowMensaje = document.createElement("div");
                rowMensaje.className = "row";
                rowMensaje.id = "rowManagerPackagemensaje" + item.men_id;
                var divMensaje = document.createElement("div");
                divMensaje.className = "col-sm border border-primary rounded";
                divMensaje.id = "divManagerPackagemensaje" + item.men_id;
                var Mensaje = document.createElement("label");
                Mensaje.id = "labelManagerPackagemensaje" + item.men_id;
                Mensaje.innerHTML = item.men_menssage;
                var divAtender = document.createElement("div");
                divAtender.className = "col col-lg-1 text-center";
                divAtender.id = "divatenderManagerPackagemensaje" + item.men_id;
                var atender = document.createElement("button");
                atender.className = "btn btn-success";
                atender.id = "atenderManagerPackagemensaje" + item.men_id;
                atender.title = "Atender";
                atender.innerHTML = '<span aria-hidden="true">&checkmark;</span>';
                atender.addEventListener('click', function (event) {
                    atent(item.men_id)
                });
                managerQuestionmensajes.appendChild(rowMensaje);
                rowMensaje.appendChild(divMensaje);
                divMensaje.appendChild(Mensaje);
                rowMensaje.appendChild(divAtender);
                divAtender.appendChild(atender);

                var hr = document.createElement("hr");
                managerQuestionmensajes.appendChild(hr);
            });
        }
    });
}

function mensajecorecto(obj, texto) {
    $('#' + obj).html("<div class='alert alert-success'>");
    $('#' + obj + '> .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $('#' + obj + '> .alert-success')
        .append("<strong>" + texto + "</strong>");
    $('#' + obj + '> .alert-success')
        .append('</div>');
    }

function mensajeIncorecto(obj, texto) {
    $('#' + obj).html("<div class='alert alert-danger'>");
    $('#' + obj + '> .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $('#' + obj + '> .alert-danger')
        .append("<strong>" + texto + "</strong>");
    $('#' + obj + '> .alert-danger')
        .append('</div>');
}


function atent(men_id) {
    $.ajax({
        type: 'POST',
        url: 'Home/Attent',
        data: {
            id: men_id
        },
        success: function (result) {
            document.getElementById("rowManagerPackagedetail" + men_id).style.display = "none";
            document.getElementById("rowManagerPackagemensaje" + men_id).style.display = "none";
            mensajecorecto("mensagemanagerquestion", "Mensaje atendido");
        }
    });
}


function Getpackage(ref, detail, progress, MostrarOcultarPackageDetail) {
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
                MostrarOcultarPackageDetail.style.display = "block";
            } else {
                mensajeIncorecto("mensagepackage", "Referencia no encontrada");
            }
        }
    });
}



function AddPackage() {
    $.ajax({
        type: 'POST',
        url: 'Home/Setpackage',
        data: {
            reference: document.getElementById("refManagerPackageNew").value,
            detail: document.getElementById("detailManagerPackageNew").value,
            progress: document.getElementById("progressManagerPackageNew").value
        },
        success: function (result) {
            mensajecorecto("mensagemanagerpackage", "Informacion agregada correctamente");
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