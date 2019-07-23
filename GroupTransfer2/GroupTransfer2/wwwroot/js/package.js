﻿var package = {
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
                    event.preventDefault(); // prevent default submit behaviour
                    package.AddPackage($form, event);
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

            document.getElementById("codegtackinput").addEventListener('input', function (event) {
                package.Editpackage($("input#codegtackinput").val());
            });
        }
    },
    clearManager: function () {       
        $("textarea#insendpackagedetal").val("");
        $("input#insendprogress").val("");

        $("input#inidentificationcustomer").val("");
        $("input#innamecustomer").val("");
        $("input#inlastnamecustomer").val("");
        $("input#inagecustomer").val("");
        document.getElementById("customerphone1").innerHTML = "";
        document.getElementById("customerphone2").innerHTML = "";
        document.getElementById("customerphone3").innerHTML = "";
        $("input#indirectioncustomer").val("");
        $("input#inemailcustomer").val("");

        $("input#innamelastnamebeneficiary").val("");
        document.getElementById("beneficiaryphone1").innerHTML = "";
        document.getElementById("beneficiaryphone2").innerHTML = "";
        document.getElementById("beneficiaryphone3").innerHTML = "";
        $("input#indeliverybeneficiary").val("");

        $("input#innamecollector").val("");
        $("input#inidcollector").val("");
        $("input#inpricebykg").val("");
        $("input#inkginsuitcase").val("");
        $("input#indetailpackagecoin").val("");
        $("input#indetailexchangerate").val("");
        $("input#indetailpaytotal").val("");
        $("textarea#detailarticlessend").val("");
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
    Editpackage: function (ref) {
        $.ajax({
            type: 'POST',
            url: 'Home/Getpackage',
            data: {
                reference: ref
            },
            success: function (result) {                
                var paquete = JSON.parse(result)[0];
                if (paquete != undefined) {
                    $("textarea#insendpackagedetal").val(paquete.Pck_detailSend);
                    $("input#insendprogress").val(paquete.pck_progress);

                    $("input#inidentificationcustomer").val(paquete.Pck_IdCustomer);
                    $("input#innamecustomer").val(paquete.Pck_NameCustomer);
                    $("input#inlastnamecustomer").val(paquete.Pck_LastNameCustomer);
                    $("input#inagecustomer").val(paquete.Pck_AgeCustomer);
                    var PhoneCustomer = paquete.Pck_PhoneCustomer.split(";");
                    package.addphonesdiv("customerphone", PhoneCustomer[0]);
                    package.addphonesdiv("customerphone", PhoneCustomer[1]);
                    package.addphonesdiv("customerphone", PhoneCustomer[2]);
                    $("input#indirectioncustomer").val(paquete.Pck_AddressCustomer);
                    $("input#inemailcustomer").val(paquete.Pck_EmailCustomer);

                    $("input#innamelastnamebeneficiary").val(paquete.Pck_NameLastnamebeneficiary);
                    var Phonebeneficiary = paquete.Pck_Phonebeneficiary.split(";");
                    package.addphonesdiv("beneficiaryphone", Phonebeneficiary[0]);
                    package.addphonesdiv("beneficiaryphone", Phonebeneficiary[1]);
                    package.addphonesdiv("beneficiaryphone", Phonebeneficiary[2]);
                    $("input#indeliverybeneficiary").val(paquete.Pck_Addressbeneficiary);

                    $("input#innamecollector").val(paquete.Pck_NameCollector);
                    $("input#inidcollector").val(paquete.Pck_IdCollector);
                    $("input#inpricebykg").val(paquete.Pck_PriceByKg);
                    $("input#inkginsuitcase").val(paquete.Pck_KgInSuitCase);
                    $("input#indetailpackagecoin").val(paquete.Pck_Coin);
                    $("input#indetailexchangerate").val(paquete.Pck_TypeChange);
                    $("input#indetailpaytotal").val(paquete.Pck_TotalPrice);
                    $("textarea#detailarticlessend").val(paquete.Pck_detailArticles);
                }
                else {
                    package.clearManager();
                }
            }
        });
    },
    AddPackage: function ($form, event) {
        var params = {
            Pck_id: 1,
            Pck_ref: $("input#codegtackinput").val(),
            Pck_detailSend: $("textarea#insendpackagedetal").val(),
            Pck_progress: $("input#insendprogress").val(),

            Pck_IdCustomer: $("input#inidentificationcustomer").val(),
            Pck_NameCustomer: $("input#innamecustomer").val(),
            Pck_LastNameCustomer: $("input#inlastnamecustomer").val(),
            Pck_AgeCustomer: $("input#inagecustomer").val(),
            Pck_PhoneCustomer: ["", "", ""],
            Pck_AddressCustomer: $("input#indirectioncustomer").val(),
            Pck_EmailCustomer: $("input#inemailcustomer").val(),

            Pck_NameLastnamebeneficiary: $("input#innamelastnamebeneficiary").val(),
            Pck_Phonebeneficiary: ["", "", ""],
            Pck_Addressbeneficiary: $("input#indeliverybeneficiary").val(),

            Pck_NameCollector: $("input#innamecollector").val(),
            Pck_IdCollector: $("input#inidcollector").val(),
            Pck_PriceByKg: $("input#inpricebykg").val(),
            Pck_KgInSuitCase: $("input#inkginsuitcase").val(),
            Pck_Coin: $("input#indetailpackagecoin").val(),
            Pck_TypeChange: $("input#indetailexchangerate").val(),
            Pck_TotalPrice: $("input#indetailpaytotal").val(),
            Pck_Date: new Date(),
            Pck_detailArticles: $("textarea#detailarticlessend").val(),

        };
        for (var i = 1; i < 4; i++) {
            if (document.getElementById("customerphone" + i).children.length > 0) {
                params.Pck_PhoneCustomer[i - 1] = document.getElementById("customerphone" + i).children[0].children[1].innerText;
            }
        }
        for (var i = 1; i < 4; i++) {
            if (document.getElementById("beneficiaryphone" + i).children.length > 0) {
                params.Pck_Phonebeneficiary[i - 1] = document.getElementById("beneficiaryphone" + i).children[0].children[1].innerText;
            }
        }
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
                debugger;
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