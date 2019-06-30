
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

function Inactivate(prc_id) {
    $.ajax({
        type: 'POST',
        url: 'Home/InactiveCoin',
        data: {
            id: prc_id
        },
        success: function (result) {
            document.getElementById("rowManagerPrice" + prc_id).style.display = "none";
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
                id:item,
                name: document.getElementById("coinManagerPrice"+item).value,
                value: document.getElementById("valueManagerPrice" + item).value,
                bank: document.getElementById("bankManagerPrice" + item).value
            },
            success: function (result) {
               
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