let fixedCommission = 0.30;
let percenComission = 0.054;
const constTosell = 0.9487666034155598;
$(document).ready(function (e) {
    Init();    
});
function Init() {
    var el = document.getElementById("tosell");
    el.addEventListener('input', function (event) {
        //debugger;
        //event.target.value = event.target.valueAsNumber.toFixed(2)
        CalculateToSell(event)
    });
    el = document.getElementById("totransfer");
    el.addEventListener('input', function (event) {
        //debugger;
        //event.target.value = event.target.valueAsNumber.toFixed(2)
        CalculateToSell(event)
    });
}
function CalculateToSell(valor) {
    var regex = new RegExp("[0-9]");
    //var regextwo = new RegExp("[1-9]");
    //valor.target.value = valor.target.value.replace(".","");
    let Calculando = -1; debugger;
    if (!regex.test(valor.data) && valor.data != ".")
        /*{
            if(valor.target.value.substr(0,4) == "0000")
            {
                valor.target.value = valor.target.value.replace("0","")  
            }else if(valor.target.value.substr(0,3) == "000")
            {
                valor.target.value = valor.target.value.replace("0","")  
            }else if(valor.target.value.substr(0,2) == "00")
            {
                valor.target.value = valor.target.value.replace("0","")  
            }else if(valor.target.value.substr(0,1) == "0")
            {
                valor.target.value = valor.target.value.replace("0","")  
            }          
            Calculando = parseInt( valor.target.value);
        }
        else*/ {
        if (valor.target.value.length > 0)
            valor.target.value = valor.target.value.replace(valor.data, "");
    }
    Calculando = (valor.target.value.length > 0) ? parseFloat(valor.target.value) : 0;
    if (Calculando > 0) {
        let result = 0;
        if (valor.target.id == "tosell") {
            document.getElementById("totransfer").value = (Calculando + (Calculando * percenComission) + fixedCommission).toFixed(2);
            Calculando = Calculando;
            //document.getElementById("totransfer").value= (parseInt(valor.target.value) + (valor.target.value * percenComission)+fixedCommission).toFixed(2);
        }
        else {            
            document.getElementById("tosell").value = (Calculando - fixedCommission) * constTosell;
            //document.getElementById("tosell").value = ((valor.target.value * percenComission)+fixedCommission).toFixed(2);
        }
    }
    else {
        Calculando = 0;
        document.getElementById("tosell").value = 0;
        document.getElementById("totransfer").value = 0;
    }
    //valor.target.value = completeRight(Calculando.toString(),"0",3); 
    //valor.target.value = valor.target.value.substr(0,valor.target.value.length -2) + "." + valor.target.value.substr(valor.target.value.length -2,2);    
}






function completeRight(cadena, item, length) {    
    return (cadena.length < length) ? completeRight(cadena + item, item, length) : cadena;
}
