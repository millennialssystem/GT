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
        
        [Route("Getpackage")]
        public IActionResult Getpackage(string reference)
        {
            MSParameters par = new MSParameters("ref", reference);
            Parameter.Add(par);
            return new JsonResult(MSutil.ExecuteStopProcedureToJson("Getpackage", Parameter));
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
