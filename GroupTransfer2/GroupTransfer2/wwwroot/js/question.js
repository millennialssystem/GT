var question = {    
    Init: function () {        
        var managerQuestionmensajes = document.getElementById("managerQuestionmensajes");
        if (managerQuestionmensajes != undefined)
            this.InitcurrencyManagerQuestionmensajes(managerQuestionmensajes);
    },
    InitcurrencyManagerQuestionmensajes: function (managerQuestionmensajes) {        
        $.ajax({
            type: 'Get',
            url: 'Admin/GetMensagges',
            success: function (result) {                
                JSON.parse(result).forEach(function (item) {
                    var questionMessage = document.createElement("div");
                    questionMessage.className = "container p-2";
                    questionMessage.id = "questionMessage" + item.men_id;
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
                    fecha.innerHTML = "<strong>Fecha:</strong> " + utils.getDateGT(item.men_date);
                    questionMessage.appendChild(row);
                    row.appendChild(divNombre);
                    divNombre.appendChild(nombre);
                    row.appendChild(divTelefono);
                    divTelefono.appendChild(Telefono);
                    row.appendChild(divEmail);
                    divEmail.appendChild(Email);
                    row.appendChild(divfecha);
                    divfecha.appendChild(fecha);

                    var rowMensaje = document.createElement("div");
                    rowMensaje.className = "row p-2";
                    rowMensaje.id = "rowManagerPackagemensaje" + item.men_id;
                    var divMensaje = document.createElement("div");
                    divMensaje.className = "col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11 border border-primary rounded";
                    divMensaje.id = "divManagerPackagemensaje" + item.men_id;
                    var Mensaje = document.createElement("label");
                    Mensaje.id = "labelManagerPackagemensaje" + item.men_id;
                    Mensaje.innerHTML = item.men_menssage;
                    //var divAtender = document.createElement("div");
                    //divAtender.className = "col col-lg-1 text-center";
                    //divAtender.id = "divatenderManagerPackagemensaje" + item.men_id;
                    //var atender = document.createElement("button");
                    //atender.className = "btn btn-success";
                    //atender.id = "atenderManagerPackagemensaje" + item.men_id;
                    //atender.title = "Atender";
                    //atender.innerHTML = '<span aria-hidden="true">&checkmark;</span>';
                    //atender.addEventListener('click', function (event) {
                    //    question.atent(item.men_id)
                    //});

                    var divAtender = document.createElement("div");
                    divAtender.className = "col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-center";

                    var listActions = document.createElement("ul");
                    listActions.className = "list-inline social-buttons";

                    var listItem = document.createElement("li");
                    listItem.className = "list-inline-item text-center";

                    listActions.appendChild(listItem);

                    var btnAtender = document.createElement("a");
                    btnAtender.id = "divatenderManagerPackagemensaje" + item.men_id;
                    btnAtender.className = "action";
                    btnAtender.setAttribute("data-toggle", "tooltip");
                    btnAtender.setAttribute("data-html", "true");
                    btnAtender.setAttribute("data-placement", "right");
                    btnAtender.setAttribute("title", "Atender");
                    btnAtender.setAttribute("href", "#");
                    //btnAtender.style = "height: 40px;width: 40px;line-height: 40px;";
                    btnAtender.addEventListener('click', function (event) {
                        question.atent(item.men_id);
                    });

                    var iconAtender = document.createElement("i");
                    iconAtender.className = "fas fa-envelope-open-text";

                    btnAtender.appendChild(iconAtender);
                    listItem.appendChild(btnAtender);
                    listActions.appendChild(listItem);
                    divAtender.appendChild(listActions);

                    questionMessage.appendChild(rowMensaje);
                    rowMensaje.appendChild(divMensaje);
                    divMensaje.appendChild(Mensaje);
                    rowMensaje.appendChild(divAtender);
                    //divAtender.appendChild(atender);

                    managerQuestionmensajes.appendChild(questionMessage);

                    var hr = document.createElement("hr");
                    managerQuestionmensajes.appendChild(hr);
                });
            }
        });
    },
    atent: function (men_id) {        
        $.ajax({
            type: 'Get',
            url: 'Admin/Attent',
            data: {
                id: men_id
            },
            success: function (result) {                
                document.getElementById("rowManagerPackagedetail" + men_id).style.display = "none";
                document.getElementById("rowManagerPackagemensaje" + men_id).style.display = "none";
                utils.mensajecorecto("mensagemanagerquestion", "Mensaje atendido");
            }
        });
}
}