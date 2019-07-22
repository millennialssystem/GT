var package = {
    Init: function () {
        var btnsearchpackage = document.getElementById("btnsearchpackage");
        if (btnsearchpackage != undefined) {
            btnsearchpackage.addEventListener('click', function (event) {
                package.Getpackage(document.getElementById("refpackage"), document.getElementById("detailpackage"), document.getElementById("progresspackage"), document.getElementById("MostrarOcultarPackageDetail"))
            });
        }

        
        var managerpackage = document.getElementById("managerpackage");
        if (managerpackage != undefined) {
            document.getElementById("btnphonecustomer").addEventListener('click', function (event) {
                package.addphonesdiv("customerphone", document.getElementById("inputphonecustomer").value);
            });

            document.getElementById("btnphonebeneficiary").addEventListener('click', function (event) {
                package.addphonesdiv("beneficiaryphone", document.getElementById("inputphonebeneficiary").value);
            });

            
            $("#formmanagerpackage input,#formmanagerpackage textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function ($form, event, errors) {
                    debugger;
                    // additional error messages or events
                },
                submitSuccess: function ($form, event) {
                    debugger;
                },
                filter: function () {                    
                    return $(this).is(":visible");
                },
            });

            //document.getElementById("btnsavepackage").addEventListener('click', function (event) {
                
            //    package.AddPackage(
            //        document.getElementById("codegtackinput")
            //    );
            //});

            document.getElementById("addcontainerpackage").addEventListener('click', function (event) {
                package.containerpackagechange(event);
            });

            document.getElementById("editcontainerpackage").addEventListener('click', function (event) {
                package.containerpackagechange(event);
            });
        }
    },
    Getpackage: function (ref, detail, progress, MostrarOcultarPackageDetail) {
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
                    utils.mensajeIncorecto("mensagepackage", "Referencia no encontrada");
                }
            }
        });
    },
    AddPackage: function (codegtackinput) {
        debugger;        
        var params = {
            Pck_id: 1,
            Pck_ref: 2,
            Pck_detailSend: "por ahi",
            Pck_progress: 200,

            Pck_IdCustomer:12346,
            Pck_NameCustomer: "Jose Miguel",
            Pck_LastNameCustomer: "Manrrique Daboin",
            Pck_PhoneCustomer:["123","345"],
            Pck_AddressCustomer:"aqui",
            Pck_EmailCustomer:"jmanrrique",

            Pck_NameLastnamebeneficiary:"primo",
            Pck_Phonebeneficiary:["321","789"],
            Pck_Addressbeneficiary:"alla",

            Pck_NameCollector:"Angel",
            Pck_IdCollector:65454,
            Pck_PriceByKg:12,
            Pck_KgInSuitCase:24,
            Pck_Coin:"Bolvares",
            Pck_TypeChange:"alguno",
            Pck_TotalPrice: 1234,
            Pck_Date: new Date(),
            Pck_detailArticles: "lorem imsup"

        };
        $.ajax({
            type: 'POST',
            url: 'Home/Setpackage',
            data: {
                package: params
                //reference: document.getElementById("refManagerPackageNew").value,
                //detail: document.getElementById("detailManagerPackageNew").value,
                //progress: document.getElementById("progressManagerPackageNew").value
            },
            success: function (result) {
                utils.mensajecorecto("mensagemanagerpackage", "Informacion agregada correctamente");
            }
        });
    },
    addphonesdiv: function (tophone, valuephone) {
        if (valuephone.length == 0)
            return;
        var obj;
        var h;
        const limit = 4;
        for (h = 1; h < limit; h++) {            
            obj = tophone + h;
            if (document.getElementById(obj).children.length == 0) {
                $('#' + obj).html("<div class='alert alert-dark'>");
                $('#' + obj + '> .alert-dark').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#' + obj + '> .alert-dark')
                    .append("<strong>" + valuephone + "</strong>");
                $('#' + obj + '> .alert-dark')
                    .append('</div>');
                h = limit;
            }
        }
        //document.getElementById("esg").children /// saber los hijos de un elemento para saber si el telefono esta activo
    },
    containerpackagechange: function (item) {        
        var obj = document.getElementById("codegtackinput");
        switch (item.currentTarget.id) {
            case "addcontainerpackage":
                obj.disabled = true;
                break;  
            case "editcontainerpackage":
                obj.disabled = false;
                break;  
        }
    }
}