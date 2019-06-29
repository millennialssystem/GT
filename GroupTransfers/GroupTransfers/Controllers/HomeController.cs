using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupTransfers.Models;
using GroupTransfers.Services;

namespace GroupTransfers.Controllers
{
    [Route("Home")]
    public class HomeController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils("SERVER=localhost;" + "DATABASE=gt;" + "UID=root;" + "PASSWORD=;");
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

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
