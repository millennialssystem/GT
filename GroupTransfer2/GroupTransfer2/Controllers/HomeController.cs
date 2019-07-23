using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupTransfer2.Models;
using GroupTransfer2.Services;

namespace GroupTransfer2.Controllers
{
    [Route("Home")]
    public class HomeController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils();
        [Route("Index")]
        [Route("")]
        [Route("~/")]
        public IActionResult Index()
        {
            ViewBag.Versionjs = WebSetting.Versionjs;
            ViewBag.Versioncss = WebSetting.Versioncss;
            ViewBag.currencyprice = MSutil.ExecuteStopProcedureToJson("Getcurrentprice", Parameter);
            return View();
        }

        [Route("InactiveCoin")]
        public IActionResult InactiveCoin(int id)
        {
            MSParameters par = new MSParameters("id", id.ToString());
            Parameter.Add(par);
            MSutil.ExecuteStopProcedureNotResult("SetInactivateCurrenPrice", Parameter);

            return new JsonResult("true");
        }

        [Route("Attent")]
        public IActionResult Attent(int id)
        {
            MSParameters par = new MSParameters("id", id.ToString());
            Parameter.Add(par);
            MSutil.ExecuteStopProcedureNotResult("Attent", Parameter);

            return new JsonResult("true");
        }

        [Route("AddCoin")]
        public IActionResult AddCoin(string name, string value, string bank)
        {
            MSParameters par = new MSParameters("name", name);
            Parameter.Add(par);
            par = new MSParameters("valor", value);
            Parameter.Add(par);
            par = new MSParameters("bank", bank);
            Parameter.Add(par);
            return new JsonResult(MSutil.ExecuteStopProcedureToJson("AddCurrenPrice", Parameter));
        }

        [Route("UpdateCoins")]
        public IActionResult UpdateCoins(string id, string name, string value, string bank)
        {
            MSParameters par = new MSParameters("name", name);
            Parameter.Add(par);
            par = new MSParameters("valor", value);
            Parameter.Add(par);
            par = new MSParameters("bank", bank);
            Parameter.Add(par);
            par = new MSParameters("id", id);
            Parameter.Add(par);
            MSutil.ExecuteStopProcedureNotResult("UpdateCurrenPrice", Parameter);

            return new JsonResult("true");
        }

        [Route("Setpackage")]
        public IActionResult Setpackage(PackageModel package)
        {            

            MSParameters par = new MSParameters("ref", package.Pck_ref);
            Parameter.Add(par);

            par = new MSParameters("detailSend", package.Pck_detailSend);
            Parameter.Add(par);
            par = new MSParameters("progress", package.Pck_progress);
            Parameter.Add(par);
            par = new MSParameters("IdCustomer", package.Pck_IdCustomer);
            Parameter.Add(par);
            par = new MSParameters("NameCustomer", package.Pck_NameCustomer);
            Parameter.Add(par);
            par = new MSParameters("LastNameCustomer", package.Pck_LastNameCustomer);
            Parameter.Add(par);
            par = new MSParameters("AgeCustomer", package.Pck_AgeCustomer);
            Parameter.Add(par);
            par = new MSParameters("PhoneCustomer", package.Pck_PhoneCustomer[0] + ";" + package.Pck_PhoneCustomer[1] + ";" + package.Pck_PhoneCustomer[2]);
            Parameter.Add(par);
            par = new MSParameters("AddressCustomer", package.Pck_AddressCustomer);
            Parameter.Add(par);
            par = new MSParameters("EmailCustomer", package.Pck_EmailCustomer);
            Parameter.Add(par);
            par = new MSParameters("NameLastnamebeneficiary", package.Pck_NameLastnamebeneficiary);
            Parameter.Add(par);
            par = new MSParameters("Phonebeneficiary", package.Pck_Phonebeneficiary[0] + ";" + package.Pck_Phonebeneficiary[1] + ";" + package.Pck_Phonebeneficiary[2]);
            Parameter.Add(par);
            par = new MSParameters("Addressbeneficiary", package.Pck_Addressbeneficiary);
            Parameter.Add(par);
            par = new MSParameters("NameCollector", package.Pck_NameCollector);
            Parameter.Add(par);
            par = new MSParameters("IdCollector", package.Pck_IdCollector);
            Parameter.Add(par);
            par = new MSParameters("PriceByKg", package.Pck_PriceByKg);
            Parameter.Add(par);
            par = new MSParameters("KgInSuitCase", package.Pck_KgInSuitCase);
            Parameter.Add(par);
            par = new MSParameters("Coin", package.Pck_Coin);
            Parameter.Add(par);
            par = new MSParameters("TypeChange", package.Pck_TypeChange);
            Parameter.Add(par);
            par = new MSParameters("TotalPrice", package.Pck_TotalPrice);
            Parameter.Add(par);
            par = new MSParameters("Date", package.Pck_Date);
            Parameter.Add(par);
            par = new MSParameters("detailArticles", package.Pck_detailArticles);
            Parameter.Add(par);

            return new JsonResult(MSutil.ExecuteStopProcedureToJson("Setpackage", Parameter));
        }

        [Route("Getpackage")]
        public IActionResult Getpackage(string reference)
        {
            MSParameters par = new MSParameters("ref", reference);
            Parameter.Add(par);
            return new JsonResult(MSutil.ExecuteStopProcedureToJson("Getpackage", Parameter));
        }

        [Route("GetMensagges")]
        public IActionResult GetMensagges()
        {
            return new JsonResult(MSutil.ExecuteStopProcedureToJson("GetMensagges", Parameter));
        }        

        [Route("SendRecomendation")]
        public IActionResult SendRecomendation(string name, string phone, string email, string message)
        {
            MSParameters par = new MSParameters("name", name);
            Parameter.Add(par);
            par = new MSParameters("phone", phone);
            Parameter.Add(par);
            par = new MSParameters("email", email);
            Parameter.Add(par);
            par = new MSParameters("message", message);
            Parameter.Add(par);
            MSutil.ExecuteStopProcedureNotResult("SendRecomendation", Parameter);

            return new JsonResult("true");
        }
        [Route("Privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
