var package = {
    printpackagevalues: null,
    Init: function () {
        var btnsearchpackage = document.getElementById("btnsearchpackage");
        if (btnsearchpackage != undefined) {
            btnsearchpackage.addEventListener('click', function (event) {
                package.Getpackage(document.getElementById("refpackage"), document.getElementById("detailpackage"), document.getElementById("progresspackage"), document.getElementById("MostrarOcultarPackageDetail"))
            });
            document.getElementById("btnprintpackage").addEventListener('click', function (event) {
                package.printpackage($("#refpackageprint").text(), package.printpackagevalues);
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
    printpackage: function(ref,item){
        var frame = document.getElementById('el_iframe').contentWindow.document;       

        frame.getElementById("datepackageprint").innerText = utils.getDateGT(item.Pck_Date, "yyyy-mm-dd");        
        frame.getElementById("refpackageprint").innerText = ref;

        frame.getElementById("namecustomerprint").innerText = item.Pck_NameCustomer;   
        frame.getElementById("identificationcustomerprint").innerText = item.Pck_IdCustomer;   
        frame.getElementById("lastnamecustomerprint").innerText = item.Pck_LastNameCustomer;   
        frame.getElementById("agecustomerprint").innerText = item.Pck_AgeCustomer;   
        var customerphoneprint = item.Pck_PhoneCustomer.split(";");
        frame.getElementById("customerphone1print").innerText = customerphoneprint[0];  
        frame.getElementById("customerphone2print").innerText = customerphoneprint[1];  
        frame.getElementById("customerphone3print").innerText = customerphoneprint[2];  
        frame.getElementById("directioncustomerprint").innerText = item.Pck_AddressCustomer;
        frame.getElementById("emailcustomerprint").innerText = item.Pck_EmailCustomer;

        frame.getElementById("namelastnamebeneficiaryprint").innerText = item.Pck_NameLastnamebeneficiary;        
        var beneficiaryphoneprint = item.Pck_Phonebeneficiary.split(";");
        frame.getElementById("beneficiaryphone1print").innerText = beneficiaryphoneprint[0]; 
        frame.getElementById("beneficiaryphone2print").innerText = beneficiaryphoneprint[1]; 
        frame.getElementById("beneficiaryphone3print").innerText = beneficiaryphoneprint[2]; 
        frame.getElementById("deliverybeneficiaryprint").innerText = item.Pck_Addressbeneficiary;        

        frame.getElementById("nemaecollectorprint").innerText = item.Pck_NameCollector; 
        frame.getElementById("idcollectorprint").innerText = item.Pck_IdCollector;         
        frame.getElementById("detailarticlesprint").innerText = item.Pck_detailArticles;         
        frame.getElementById("pricebykgprint").innerText = item.Pck_PriceByKg;  
        frame.getElementById("kginsuitcaseprint").innerText = item.Pck_KgInSuitCase;  
        frame.getElementById("detailpackagecoinprint").innerText = item.Pck_Coin;         
        frame.getElementById("detailexchangerateprint").innerText = item.Pck_TypeChange;
        frame.getElementById("detailpaytotalprint").innerText = item.Pck_TotalPrice;
        frame.getElementById("detailpackagedateprint").innerText = utils.getDateGT(item.Pck_Date, "yyyy-mm-dd");
        frame.getElementById("namelastnamecustomerprint").innerText = item.Pck_NameCustomer + " " + item.Pck_LastNameCustomer; 
        frame.getElementById("identificationcustomerdeclareprint").innerText = item.Pck_IdCustomer; 

        document.getElementById('el_iframe').contentWindow.print();
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
                var item = JSON.parse(result)[0];
                if (item != undefined) {
                    package.printpackagevalues = item;
                    detail.innerText = item.Pck_detailSend;
                    progress.style.width = item.pck_progress + "%";
                    progress.innerText = item.pck_progress + "%";                    
                    $('#datepackageprint').text(utils.getDateGT(item.Pck_Date, "yyyy-mm-dd"));
                    $('#refpackageprint').text(ref.value);

                    $('#namecustomerprint').text(item.Pck_NameCustomer);
                    $('#identificationcustomerprint').text(item.Pck_IdCustomer);
                    $('#lastnamecustomerprint').text(item.Pck_LastNameCustomer);
                    $('#agecustomerprint').text(item.Pck_AgeCustomer);
                    var customerphoneprint = item.Pck_PhoneCustomer.split(";");
                    $('#customerphone1print').text(customerphoneprint[0]);
                    $('#customerphone2print').text(customerphoneprint[1]);
                    $('#customerphone3print').text(customerphoneprint[2]);
                    $('#directioncustomerprint').text(item.Pck_AddressCustomer);
                    $('#emailcustomerprint').text(item.Pck_EmailCustomer);

                    $('#namelastnamebeneficiaryprint').text(item.Pck_NameLastnamebeneficiary);
                    var beneficiaryphoneprint = item.Pck_Phonebeneficiary.split(";");
                    $('#beneficiaryphone1print').text(beneficiaryphoneprint[0]);
                    $('#beneficiaryphone2print').text(beneficiaryphoneprint[1]);
                    $('#beneficiaryphone3print').text(beneficiaryphoneprint[2]);
                    $('#deliverybeneficiaryprint').text(item.Pck_Addressbeneficiary);

                    $('#nemaecollectorprint').text(item.Pck_NameCollector);
                    $('#idcollectorprint').text(item.Pck_IdCollector);
                    $('#detailarticlesprint').text(item.Pck_detailArticles);
                    $('#pricebykgprint').text(item.Pck_PriceByKg);
                    $('#kginsuitcaseprint').text(item.Pck_KgInSuitCase);
                    $('#detailpackagecoinprint').text(item.Pck_Coin);
                    $('#detailexchangerateprint').text(item.Pck_TypeChange);
                    $('#detailpaytotalprint').text(item.Pck_TotalPrice);
                    $('#detailpackagedateprint').text(utils.getDateGT(item.Pck_Date, "yyyy-mm-dd"));
                    $('#namelastnamecustomerprint').text(item.Pck_NameCustomer + " " + item.Pck_LastNameCustomer);                 
                    $('#identificationcustomerdeclareprint').text(item.Pck_IdCustomer);

                    $("#Getpackagessend").addClass("show");
                    $("#Getpackagesdeclaration").addClass("show");
                    $("#mensagepackage").removeClass("show");
                } else {
                    $("#Getpackagessend").removeClass("show");
                    $("#Getpackagesdeclaration").removeClass("show");
                    utils.mensajeIncorecto("mensagepackage", "Referencia no encontrada");
                    $("#mensagepackage").addClass("show");
                }
            }
        });
    },
    Editpackage: function (ref) {       
        $.ajax({
            type: 'Get',
            url: 'Admin/Getpackage',
            data: {
                reference: ref
            },
            success: function (result) {    
                package.clearManager();
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
            type: 'Post',
            url: 'Admin/Setpackage',
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
                obj.value = "";
                package.clearManager();
                obj.disabled = true;
                break;
            case "editcontainerpackage":
                obj.disabled = false;
                break;
        }
    }
}