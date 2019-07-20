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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace GroupTransfer2.Controllers
{
    [Authorize]
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
            //int var1 = 0;
            //int var2 = 1;
            //if (var1 == var2) {
                return View(); //}
            //else { return RedirectToAction("Login", "Account"); }
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {

            //var login = HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }

        

        [HttpGet]
        public IActionResult RegisterUser()
        {
            return PartialView("Admin/_userManager");
        }

        //[Route("RegisterUser")]
        [HttpPost]
        public IActionResult RegisterUser(Users user)
        {
            DataTable result;

            ModelState.Remove("usr_ID");

            if (ModelState.IsValid)
            {
                Parameter.Clear();
                Parameter.Add(new MSParameters("usr_Name", user.usr_Name));
                Parameter.Add(new MSParameters("usr_Email", user.usr_Email));
                Parameter.Add(new MSParameters("usr_Nameperson", user.usr_Nameperson));
                Parameter.Add(new MSParameters("usr_Birthday", user.usr_Birthday.ToString()));
                Parameter.Add(new MSParameters("lan_ID", user.lan_ID.ToString()));
                Parameter.Add(new MSParameters("pro_id", user.pro_id.ToString()));
                Parameter.Add(new MSParameters("usr_Pswd", user.usr_Pswd));

                result = MSutil.ExecuteStopProcedure("ps_GetUserById", Parameter);

                if (result.Rows[0]["result"].ToString() == "Success")
                {
                    return PartialView("Admin/_usersManagement");
                }
                else
                {
                    TempData["UserRegisterFailed"] = result.Rows[0]["result"].ToString();
                    return PartialView("Admin/_userManager");
                }

            }
            else
            {
                return PartialView("Admin/_userManager");
            }
        }
    }
}