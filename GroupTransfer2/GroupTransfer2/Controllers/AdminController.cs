using GroupTransfer2.Models;
using GroupTransfer2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfer2.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils();
        private GeneralFuntions funtions = new GeneralFuntions();
        public IActionResult Index()
        {
            ViewBag.Versionjs = WebSetting.Versionjs;
            ViewBag.Versioncss = WebSetting.Versioncss;
            ViewBag.currencyprice = MSutil.ExecuteStopProcedureToJson("Getcurrentprice", Parameter);

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "Account");
        }

        

        [HttpGet]
        public IActionResult RegisterCurrency()
        {
            ViewBag.currencyprice = MSutil.ExecuteStopProcedureToJson("Getcurrentprice", Parameter);

            return PartialView("Admin/_managerPrice");
        }

        [HttpGet]
        public IActionResult UsersManagement()
        {
            DataTable users = MSutil.ExecuteStopProcedure("ps_GetUsersLists", Parameter);

            IEnumerable<Users> model = funtions.ConvertToUsersReadings(users).ToList();

            return PartialView("Admin/User/_usersManagement", model);
        }

        [HttpGet]
        public IActionResult EditUser(string id)
        {
            Users user = new Users();

            if (string.IsNullOrEmpty(id) && string.IsNullOrWhiteSpace(id))
            {
                TempData["mode"] = "Insert";
                return PartialView("Admin/User/_EditUser");
            }
            else {
                TempData["mode"] = "Update";
                DataTable UserDetails = new DataTable();

                Parameter.Clear();
                Parameter.Add(new MSParameters("usr_ID", funtions.Base64Decode(id)));

                UserDetails = MSutil.ExecuteStopProcedure("ps_GetUserById", Parameter);

                user.usr_ID = UserDetails.Rows[0][0].ToString();
                user.usr_Name = UserDetails.Rows[0][1].ToString();
                user.usr_Email = UserDetails.Rows[0][2].ToString();
                user.usr_Nameperson = UserDetails.Rows[0][3].ToString();
                user.usr_Birthday = Convert.ToDateTime(UserDetails.Rows[0][4].ToString());
                user.lan_ID = Convert.ToInt32(UserDetails.Rows[0][5].ToString());
                user.pro_id = Convert.ToInt32(UserDetails.Rows[0][6].ToString());
                user.usr_is_deleted = Convert.ToInt32(UserDetails.Rows[0][7].ToString());

                return PartialView("Admin/User/_EditUser", user);
            }
        }

        [HttpPost]
        public IActionResult EditUser(Users user)
        {

            string accion;
            ModelState.Remove("usr_usr_is_deleted");

            Parameter.Clear();
            Parameter.Add(new MSParameters("_usr_Name", user.usr_Name));
            Parameter.Add(new MSParameters("_usr_Email", user.usr_Email));
            Parameter.Add(new MSParameters("_usr_Nameperson", user.usr_Nameperson));
            Parameter.Add(new MSParameters("_usr_Birthday", user.usr_Birthday.ToString("yyyyMMdd")));
            Parameter.Add(new MSParameters("_lan_ID", user.lan_ID.ToString()));
            Parameter.Add(new MSParameters("_pro_id", user.pro_id.ToString()));

            if (string.IsNullOrEmpty(user.usr_ID) && string.IsNullOrWhiteSpace(user.usr_ID))
            {
                TempData["mode"] = "Insert";
                ModelState.Remove("usr_ID");
                accion = "pf_usr_RegisterUser";
                Parameter.Add(new MSParameters("_usr_Pswd", user.usr_Pswd));
            }
            else
            {
                TempData["mode"] = "Update";
                ModelState.Remove("usr_Pswd");
                ModelState.Remove("usr_Pswd_Confirm");
                accion = "pf_usr_UpdateUser";
                Parameter.Add(new MSParameters("_usr_ID", funtions.Base64Decode(user.usr_ID)));
            }

            if (ModelState.IsValid) {

                DataTable result = MSutil.ExecuteStopProcedure(accion, Parameter);

                TempData["result"] = result.Rows[0][0].ToString();
                TempData["message"] = result.Rows[0][1].ToString();

                return PartialView("Admin/User/_EditUser");
            }
            else
            {
                return PartialView("Admin/User/_EditUser");
            }
        }

        [HttpGet]
        public IActionResult InactivateUser(string id)
        {
            Parameter.Clear();
            Parameter.Add(new MSParameters("_usr_ID", funtions.Base64Decode(id)));

            DataTable result = MSutil.ExecuteStopProcedure("pf_usr_InactivateUser", Parameter);

            TempData["result"] = result.Rows[0][0].ToString();
            TempData["message"] = result.Rows[0][1].ToString();

            DataTable users = MSutil.ExecuteStopProcedure("ps_GetUsersLists", Parameter);

            IEnumerable<Users> model = funtions.ConvertToUsersReadings(users).ToList();

            return PartialView("Admin/User/_usersManagement", model);
        }
    }
}