var currencyprice = {
    fixedCommission: 0.30,
    percenComission: 0.054,
    constTosell: 0.9487666034155598,
    UpdateCoins: new Array(),
    Init: function () {
        var el = document.getElementById("tosell");
        if (el != undefined) {
            el.addEventListener('input', function (event) {
                currencyprice.CalculateToSell(event)
            });
        }
        el = document.getElementById("totransfer");
        if (el != undefined) {
            el.addEventListener('input', function (event) {
                currencyprice.CalculateToSell(event)
            });
        }
        if (document.getElementById("currencypricetbody") != undefined) {
            this.Initcurrencyprice(document.getElementById("valuescurrencyprice").value, document.getElementById("currencypricetbody"), document.getElementById("lastupdatelable"), document.getElementById("typemoneda"), document.getElementById("typemonedato"));
        }
        if (document.getElementById("managerPrice") != undefined) {
            this.InitcurrencyManagerPrice(document.getElementById("valuescurrencyprice").value, document.getElementById("managerPrice"));
        }
    },
    AddCoin: function () {
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
                /*Begin Disable*/
                var desactivar = document.createElement("div");
                desactivar.className = "col col-lg-2";

                var listActions = document.createElement("ul");
                listActions.className = "list-inline social-buttons";

                var listItem = document.createElement("li");
                listItem.className = "list-inline-item";

                listActions.appendChild(listItem);

                var btnDesactivar = document.createElement("a");
                btnDesactivar.id = "rowManagerPrice" + prc_id;
                btnDesactivar.className = "action";
                btnDesactivar.setAttribute("data-toggle", "tooltip");
                btnDesactivar.setAttribute("data-html", "true");
                btnDesactivar.setAttribute("data-placement", "right");
                btnDesactivar.setAttribute("title", "Eliminar");
                btnDesactivar.style = "height: 40px;width: 40px;line-height: 40px;background-color:#fed136;color:#fff;";
                btnDesactivar.addEventListener('click', function (event) {
                    Inactivate(prc_id)
                });

                var iconDesactivar = document.createElement("i");
                iconDesactivar.className = "fas fa-minus";

                btnDesactivar.appendChild(iconDesactivar);
                listItem.appendChild(btnDesactivar);
                listActions.appendChild(listItem);
                desactivar.appendChild(listActions);
                document.getElementById("managerPrice").appendChild(row);
                row.appendChild(bankDiv);
                row.appendChild(coinDiv);
                row.appendChild(valueDiv);
                row.appendChild(desactivar);
                $('[data-toggle="tooltip"]').tooltip();
            }
        });
    },
    CalculateToSell: function (valor) {
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
                document.getElementById("totransfer").value = (Calculando + (Calculando * this.percenComission) + this.fixedCommission).toFixed(2);
            }
            else {
                document.getElementById("tosell").value = ((Calculando - this.fixedCommission) * this.constTosell).toFixed(2);
            }
        }
        else {
            Calculando = 0;
            document.getElementById("tosell").value = 0;
            document.getElementById("totransfer").value = 0;
        }
        if (valor.data != ".")
            valor.target.value = Calculando;
    },
    WillUpdateCurrencyPrice: function (row) {

        if (this.UpdateCoins.indexOf(row) == -1)
            this.UpdateCoins.push(row);
    },
    UpdateCurrencyPrice: function () {       
        this.UpdateCoins.forEach(function (item) {
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

                }
            });
        });


    },
    Inactivate: function (prc_id) {
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
        return false;
    },

    transferirdivisas: function () {       
        var vender = document.getElementById("typemoneda").value;
        var recibir = document.getElementById("typemonedato").value;
        var cantidad = document.getElementById("cantidadmoneda").value;
        if (vender != "0" && recibir != "0") {            
            var calculo = cantidad / vender;
            document.getElementById("transferirdivisas").innerHTML = "<strong>Total: </strong>" + (calculo * recibir);
        }        
        //var regex = new RegExp("[0-9]");        
    },

    Initcurrencyprice: function (tasas, tblBody, lastupdatelable, typemoneda, typemonedato) {
        var fila;
        var celda;
        var textoCelda;
        var actualizacion;
        var typemonedaopcion;
        var typemonedatoopcion;
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

            typemonedatoopcion = document.createElement("option");
            typemonedatoopcion.value = item.prc_value;
            typemonedatoopcion.innerText = item.prc_name;
            typemonedato.appendChild(typemonedatoopcion);
        });
        lastupdatelable.innerText = "Ultima Actualizacion: " + actualizacion.getDate() + "/" + (actualizacion.getMonth() + 1) + "/" + actualizacion.getFullYear() + " " + actualizacion.getHours() + ":" + actualizacion.getMinutes();
        this.transferirdivisas();
    },
    InitcurrencyManagerPrice: function (tasas, managerPrice) {
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
                currencyprice.WillUpdateCurrencyPrice(item.prc_id)
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
                currencyprice.WillUpdateCurrencyPrice(item.prc_id)
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
                currencyprice.WillUpdateCurrencyPrice(item.prc_id)
            });
            valueDiv.appendChild(value);
            /*End value */


            /*Begin Disable*/
            var desactivar = document.createElement("div");
            desactivar.className = "col col-lg-2 text-center";

            var listActions = document.createElement("ul");
            listActions.className = "list-inline social-buttons";

            var listItem = document.createElement("li");
            listItem.className = "list-inline-item";

            listActions.appendChild(listItem);

            var btnDesactivar = document.createElement("a");
            btnDesactivar.id = "rowManagerPrice" + item.prc_id;
            btnDesactivar.className = "action";
            btnDesactivar.setAttribute("data-toggle", "tooltip");
            btnDesactivar.setAttribute("data-html", "true");
            btnDesactivar.setAttribute("data-placement", "right");
            btnDesactivar.setAttribute("title", "Eliminar");
            btnDesactivar.style = "height: 40px;width: 40px;line-height: 40px;background-color:#d60f22;color:#fff;";
            btnDesactivar.addEventListener('click', function (event) {
                currencyprice.Inactivate(item.prc_id)
            });

            var iconDesactivar = document.createElement("i");
            iconDesactivar.className = "fas fa-minus";

            btnDesactivar.appendChild(iconDesactivar);
            listItem.appendChild(btnDesactivar);
            listActions.appendChild(listItem);
            desactivar.appendChild(listActions);
            /*End Disable*/

            managerPrice.appendChild(row);
            row.appendChild(bankDiv);
            row.appendChild(coinDiv);
            row.appendChild(valueDiv);
            row.appendChild(desactivar);

        });
        $('[data-toggle="tooltip"]').tooltip();
    }
};
