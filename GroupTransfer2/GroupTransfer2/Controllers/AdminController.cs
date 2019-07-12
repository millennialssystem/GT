using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupTransfer2.Models;
using GroupTransfer2.Services;
using System.Data;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace GroupTransfer2.Controllers
{
    public class AdminController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils();
        public IActionResult Index()
        {
            ViewBag.Versionjs = WebSetting.Versionjs;
            ViewBag.Versioncss = WebSetting.Versioncss;
            ViewBag.currencyprice = MSutil.ExecuteStopProcedureToJson("Getcurrentprice", Parameter);
            return View();
        }
    }
}