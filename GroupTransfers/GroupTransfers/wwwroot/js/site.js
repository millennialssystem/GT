let fixedCommission = 0.30;
let percenComission = 0.054;
const constTosell = 0.9487666034155598;
$(document).ready(function (e) {
    Init();
    Initcurrencyprice(document.getElementById("valuescurrencyprice").value, document.getElementById("currencypricetbody"), document.getElementById("lastupdatelable"), document.getElementById("typemoneda"));
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
        textoCelda = document.createTextNode(item.prc_name);
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

function transferirdivisas() {
    var moneda = document.getElementById("typemoneda").value;
    var cantidad = document.getElementById("cantidadmoneda").value;
    var regex = new RegExp("[0-9]");
    document.getElementById("transferirdivisas").innerHTML ="Bs: " + ( moneda * cantidad);
}

function completeRight(cadena, item, length) {
    return (cadena.length < length) ? completeRight(cadena + item, item, length) : cadena;
}
function completeLeft(cadena, item, length) {
    return (cadena.length < length) ? completeLeft(item + cadena, item, length) : cadena;
}