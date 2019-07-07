//import { access } from "fs";


let fixedCommission = 0.30;
let percenComission = 0.054;
const constTosell = 0.9487666034155598;
var UpdateCoins = new Array();
$(document).ready(function (e) {
    Init();
    Initcurrencyprice(document.getElementById("valuescurrencyprice").value, document.getElementById("currencypricetbody"), document.getElementById("lastupdatelable"), document.getElementById("typemoneda"));
    InitcurrencyManagerPrice(document.getElementById("valuescurrencyprice").value, document.getElementById("managerPrice"));
});
function Init() {
    var el = document.getElementById("tosell");
    el.addEventListener('input', function (event) {
        CalculateToSell(event)
    });
    el = document.getElementById("totransfer");
    el.addEventListener('input', function (event) {
        CalculateToSell(event)
    });
    var btnsearchpackage = document.getElementById("btnsearchpackage");
    btnsearchpackage.addEventListener('click', function (event) {
        Getpackage(document.getElementById("refpackage"), document.getElementById("detailpackage"), document.getElementById("progresspackage"), document.getElementById("MostrarOcultarPackageDetail"))
    });
    var managerQuestionmensajes = document.getElementById("managerQuestionmensajes");
    if (managerQuestionmensajes != undefined)
        InitcurrencyManagerPackage(managerQuestionmensajes);

}
function CalculateToSell(valor) {
    var regex = new RegExp("[0-9]");
    let Calculando = -1;
    if (!regex.test(valor.data) && valor.data != ".") {
        if (valor.target.value.length > 0)
            valor.target.value = valor.target.value.replace(valor.data, "");
    }
    Calculando = (valor.target.value.length > 0) ? parseFloat(valor.target.value) : 0;
    if (Calculando > 0) {
        let result = 0;
        if (valor.target.id == "tosell") {
            document.getElementById("totransfer").value = (Calculando + (Calculando * percenComission) + fixedCommission).toFixed(2);
        }
        else {
            document.getElementById("tosell").value = ((Calculando - fixedCommission) * constTosell).toFixed(2);
        }
    }
    else {
        Calculando = 0;
        document.getElementById("tosell").value = 0;
        document.getElementById("totransfer").value = 0;
    }
    if (valor.data != ".")
        valor.target.value = Calculando;
}



function Initcurrencyprice(tasas, tblBody, lastupdatelable, typemoneda) {
    var fila;
    var celda;
    var textoCelda;
    var actualizacion;
    var typemonedaopcion;
    JSON.parse(tasas).forEach(function (item) {
        fila = document.createElement("tr");
        fila.id = item.prc_id;

        celda = document.createElement("th");
        celda.scope = "row";
        textoCelda = document.createTextNode("(" + item.prc_bank + ")" + item.prc_name);
        celda.appendChild(textoCelda);
        fila.appendChild(celda);

        celda = document.createElement("td");
        textoCelda = document.createTextNode(item.prc_value);
        celda.appendChild(textoCelda);
        fila.appendChild(celda);

        tblBody.appendChild(fila);
        if (actualizacion == undefined || new Date(item.prc_update) > actualizacion)
            actualizacion = new Date(item.prc_update);
        typemonedaopcion = document.createElement("option");
        typemonedaopcion.value = item.prc_value;
        typemonedaopcion.innerText = item.prc_name;
        typemoneda.appendChild(typemonedaopcion);
    });
    lastupdatelable.innerText = "Ultima Actualizacion: " + actualizacion.getDate() + "/" + (actualizacion.getMonth() + 1) + "/" + actualizacion.getFullYear() + " " + actualizacion.getHours() + ":" + actualizacion.getMinutes();
    transferirdivisas();
}

function InitcurrencyManagerPrice(tasas, managerPrice) {
    JSON.parse(tasas).forEach(function (item) {
        var row = document.createElement("div");
        row.className = "row p-2";
        row.id = "rowManagerPrice" + item.prc_id;
        /*Begin Bank */
        var bankDiv = document.createElement("div");
        bankDiv.className = "col-sm";
        var bank = document.createElement("input");
        bank.id = "bankManagerPrice" + item.prc_id;
        bank.type = "text";
        bank.className = "form-control";
        bank.value = item.prc_bank;
        bank.lastvalue = item.prc_bank;
        bank.addEventListener('change', function (event) {
            WillUpdateCurrencyPrice(item.prc_id)
        });
        bankDiv.appendChild(bank);
        /*End Bank */

        /*Begin coin */
        var coinDiv = document.createElement("div");
        coinDiv.className = "col-sm";
        var coin = document.createElement("input");
        coin.id = "coinManagerPrice" + item.prc_id;
        coin.type = "text";
        coin.className = "form-control";
        coin.value = item.prc_name;
        coin.addEventListener('change', function (event) {
            WillUpdateCurrencyPrice(item.prc_id)
        });
        coinDiv.appendChild(coin);
        /*End coin */

        /*Begin value */
        var valueDiv = document.createElement("div");
        valueDiv.className = "col-sm";
        var value = document.createElement("input");
        value.id = "valueManagerPrice" + item.prc_id;
        value.type = "text";
        value.className = "form-control";
        value.value = item.prc_value;
        value.addEventListener('change', function (event) {
            WillUpdateCurrencyPrice(item.prc_id)
        });
        valueDiv.appendChild(value);
        /*End value */


        /*Begin Disable*/
        var desactivar = document.createElement("div");
        desactivar.className = "col col-lg-2";
        var btnDesactivar = document.createElement("button");
        btnDesactivar.id = "rowManagerPrice" + item.prc_id;
        btnDesactivar.type = "button";
        btnDesactivar.className = "btn btn-danger";
        btnDesactivar.addEventListener('click', function (event) {
            Inactivate(item.prc_id)
        });
        var textDesactivar = document.createTextNode("Eliminar");
        btnDesactivar.appendChild(textDesactivar);
        desactivar.appendChild(btnDesactivar);
        /*End Disable*/

        managerPrice.appendChild(row);
        row.appendChild(bankDiv);
        row.appendChild(coinDiv);
        row.appendChild(valueDiv);
        row.appendChild(desactivar);

    });

}

function getDateGT(fecha) {
    var fechaformateada = new Date(fecha);    
    return fechaformateada.getDate() + "/" + (fechaformateada.getMonth() + 1) + "/" + fechaformateada.getFullYear() + " " + fechaformateada.getHours() + ":" + fechaformateada.getMinutes();
}

function InitcurrencyManagerPackage(managerQuestionmensajes){    
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
                nombre.innerHTML = "<strong>Nombre:</strong> "+ item.men_name;            
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

function mensajecorecto(obj,texto) {
    $('#' + obj).html("<div class='alert alert-success'>");
    $('#'+ obj +'> .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $('#' + obj + '> .alert-success')
        .append("<strong>" + texto + "</strong>");
    $('#' + obj  +'> .alert-success')
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
            mensajecorecto("mensagemanagerquestion","Mensaje atendido");
        }
    });
}

function Inactivate(prc_id) {
    $.ajax({
        type: 'POST',
        url: 'Home/InactiveCoin',
        data: {
            id: prc_id
        },
        success: function (result) {
            document.getElementById("rowManagerPrice" + prc_id).style.display = "none";
            mensajecorecto("mensagemanagerprice", "Moneda eliminada exitosamente.");
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

function AddCoin() {
    $.ajax({
        type: 'POST',
        url: 'Home/AddCoin',
        data: {
            name: document.getElementById("coinManagerPriceNew").value,
            value: document.getElementById("valueManagerPriceNew").value,
            bank: document.getElementById("bankManagerPriceNew").value
        },
        success: function (result) {
            mensajecorecto("mensagemanagerprice", "Moneda agregada exitosamente.");
            prc_id = JSON.parse(result)[0].id;
            var row = document.createElement("div");
            row.className = "row p-2";
            row.id = "rowManagerPrice" + prc_id;
            /*Begin Bank */
            var bankDiv = document.createElement("div");
            bankDiv.className = "col-sm";
            var bank = document.createElement("input");
            bank.id = "bankManagerPrice" + prc_id;
            bank.type = "text";
            bank.className = "form-control";
            bank.value = document.getElementById("bankManagerPriceNew").value;
            bankDiv.appendChild(bank);
            /*End Bank */

            /*Begin coin */
            var coinDiv = document.createElement("div");
            coinDiv.className = "col-sm";
            var coin = document.createElement("input");
            coin.id = "coinManagerPrice" + prc_id;
            coin.type = "text";
            coin.className = "form-control";
            coin.value = document.getElementById("coinManagerPriceNew").value;
            coinDiv.appendChild(coin);
            /*End coin */

            /*Begin value */
            var valueDiv = document.createElement("div");
            valueDiv.className = "col-sm";
            var value = document.createElement("input");
            value.id = "valueManagerPrice" + prc_id;
            value.type = "text";
            value.className = "form-control";
            value.value = document.getElementById("valueManagerPriceNew").value;
            valueDiv.appendChild(value);
            /*End value */


            /*Begin Disable*/
            var desactivar = document.createElement("div");
            desactivar.className = "col col-lg-2";
            var btnDesactivar = document.createElement("button");
            btnDesactivar.id = "rowManagerPrice" + prc_id;
            btnDesactivar.type = "button";
            btnDesactivar.className = "btn btn-danger";
            btnDesactivar.addEventListener('click', function (event) {
                Inactivate(prc_id)
            });
            var textDesactivar = document.createTextNode("Eliminar");
            btnDesactivar.appendChild(textDesactivar);
            desactivar.appendChild(btnDesactivar);
            /*End Disable*/

            document.getElementById("managerPrice").appendChild(row);
            row.appendChild(bankDiv);
            row.appendChild(coinDiv);
            row.appendChild(valueDiv);
            row.appendChild(desactivar);
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

function WillUpdateCurrencyPrice(row) {
    if (UpdateCoins.indexOf(row) == -1)
        UpdateCoins.push(row);
}
function UpdateCurrencyPrice() {


    UpdateCoins.forEach(function (item) {
        $.ajax({
            type: 'POST',
            url: 'Home/UpdateCoins',
            data: {
                id: item,
                name: document.getElementById("coinManagerPrice" + item).value,
                value: document.getElementById("valueManagerPrice" + item).value,
                bank: document.getElementById("bankManagerPrice" + item).value
            },
            success: function (result) {
                mensajecorecto("mensagemanagerprice", "Cambios guardados exitosamente.");
            }
        });
    });


}

function transferirdivisas() {
    var moneda = document.getElementById("typemoneda").value;
    var cantidad = document.getElementById("cantidadmoneda").value;
    var regex = new RegExp("[0-9]");
    document.getElementById("transferirdivisas").innerHTML = "Bs: " + (moneda * cantidad);
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
    var url = "Admin/Login?usr=" + _usr + "&pswd=" + _pswd;
    $.get(url, function (data) {
        $("#menu").html(data);
    });
}


//$("#btn').on("click", login);


$('#btn').click(function () {
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