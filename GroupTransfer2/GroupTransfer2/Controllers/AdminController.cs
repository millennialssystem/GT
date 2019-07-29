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
using System.Threading;
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
        [HttpGet]
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
        #region Coin
        [HttpGet]
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
        [HttpGet]
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

        [HttpGet]
        public IActionResult InactiveCoin(int id)
        {
            MSParameters par = new MSParameters("id", id.ToString());
            Parameter.Add(par);
            MSutil.ExecuteStopProcedureNotResult("SetInactivateCurrenPrice", Parameter);

            return new JsonResult("true");
        }
        #endregion

        #region Package
        [HttpGet]
        public IActionResult Getpackage(string reference)
        {
            MSParameters par = new MSParameters("ref", reference);
            Parameter.Add(par);
            return new JsonResult(MSutil.ExecuteStopProcedureToJson("Getpackage", Parameter));
        }

        [HttpPost]
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
        #endregion

        #region Question
        [HttpGet]
        public IActionResult Attent(int id)
        {
            MSParameters par = new MSParameters("id", id.ToString());
            Parameter.Add(par);
            MSutil.ExecuteStopProcedureNotResult("Attent", Parameter);

            return new JsonResult("true");
        }

        [HttpGet]
        public IActionResult GetMensagges()
        {
            return new JsonResult(MSutil.ExecuteStopProcedureToJson("GetMensagges", Parameter));
        }
        #endregion

        [HttpGet]
        public IActionResult EditUser(string id)
        {
            Users user = new Users();
            
            if (string.IsNullOrEmpty(id) && string.IsNullOrWhiteSpace(id))
            {
                TempData["mode"] = "Insert";
                user.OnGet();
                return PartialView("Admin/User/_EditUser", user);
            }
            else
            {
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
                user.OnGet();

                return PartialView("Admin/User/_EditUser", user);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditUser(Users user)
        {
            ModelState.Remove("usr_usr_is_deleted");

            string accion;

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

            user.OnGet();

            if (ModelState.IsValid) {

                DataTable result = MSutil.ExecuteStopProcedure(accion, Parameter);

                TempData["result"] = result.Rows[0][0].ToString();
                TempData["message"] = result.Rows[0][1].ToString();
                if (TempData["mode"].ToString() == "Insert")
                {
                    if (TempData["result"].ToString() == "Success")
                    {
                        TempData["mode"] = "Update";
                        user.usr_ID = result.Rows[0][2].ToString();
                    }
                }

                return PartialView("Admin/User/_EditUser", user);
            }
            else
            {
                return PartialView("Admin/User/_EditUser", user);
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