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
        public IActionResult RegisterCurrency()
        {
            //GeneralFuntions funtions = new GeneralFuntions();

            //DataTable users = MSutil.ExecuteStopProcedure("ps_GetUsersLists", Parameter);

            //IEnumerable<Users> model = funtions.ConvertToUsersReadings(users).ToList();
            ViewBag.currencyprice = MSutil.ExecuteStopProcedureToJson("Getcurrentprice", Parameter);

            return PartialView("Admin/_managerPrice");
            //IEnumerable<Users> users =; //= IEnumerable<Users>();
            //return PartialView("_usersManagement", model);
        }

        [HttpGet]
        public IActionResult UsersManagement()
        {
            DataTable users = MSutil.ExecuteStopProcedure("ps_GetUsersLists", Parameter);

            IEnumerable<Users> model = funtions.ConvertToUsersReadings(users).ToList();

            return PartialView("Admin/_usersManagement", model);
            //IEnumerable<Users> users =; //= IEnumerable<Users>();
            //return PartialView("_usersManagement", model);
        }

        //[Route("RegisterUser")]
        //[HttpPost]
        //public IActionResult RegisterUser(Users user)
        //{
        //    DataTable result;

        //    ModelState.Remove("usr_ID");

        //    if (ModelState.IsValid)
        //    {
        //        Parameter.Clear();
        //        Parameter.Add(new MSParameters("usr_Name", user.usr_Name));
        //        Parameter.Add(new MSParameters("usr_Email", user.usr_Email));
        //        Parameter.Add(new MSParameters("usr_Nameperson", user.usr_Nameperson));
        //        Parameter.Add(new MSParameters("usr_Birthday", user.usr_Birthday.ToString()));
        //        Parameter.Add(new MSParameters("lan_ID", user.lan_ID.ToString()));
        //        Parameter.Add(new MSParameters("pro_id", user.pro_id.ToString()));
        //        Parameter.Add(new MSParameters("usr_Pswd", user.usr_Pswd));

        //        result = MSutil.ExecuteStopProcedure("ps_GetUserById", Parameter);

        //        if (result.Rows[0]["result"].ToString() == "Success")
        //        {
        //            return PartialView("Admin/_usersManagement");
        //        }
        //        else
        //        {
        //            TempData["UserRegisterFailed"] = result.Rows[0]["result"].ToString();
        //            return PartialView("Admin/_userManager");
        //        }

        //    }
        //    else
        //    {
        //        return PartialView("Admin/_userManager");
        //    }
        //}

        //[Route("RegisterUser")]
        [HttpGet]
        public IActionResult EditUser(string id)
        {

            //if (string.IsNullOrEmpty(id))
            //{
            //    //ModelState.Remove("usr_ID");
            //}

            //if (ModelState.IsValid)
            //{

            Users user = new Users();

            if (string.IsNullOrEmpty(id) && string.IsNullOrWhiteSpace(id))
            {
                return PartialView("Admin/User/_EditUser");
            }
            else {
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


                //if (result.Rows[0]["result"].ToString() == "Success")
                //{
                    return PartialView("Admin/User/_EditUser", user);
                //}
                //else
                //{
                //    TempData["UserRegisterFailed"] = result.Rows[0]["result"].ToString();
                //    return PartialView("Admin/_userManager");
                //}
            }
            //}
            //else
            //{
            //    return PartialView("Admin/_userManager");
            //}
        }

        [HttpPost]
        public IActionResult EditUser(Users user)
        {

            //if (string.IsNullOrEmpty(id))
            //{
            //    //ModelState.Remove("usr_ID");
            //}

            //if (ModelState.IsValid)
            //{

            //Users user = new Users();
            string accion;
            if (string.IsNullOrEmpty(user.usr_ID) && string.IsNullOrWhiteSpace(user.usr_ID))
            {
                ModelState.Remove("usr_ID");
                accion = "pf_usr_RegisterUser";
                Parameter.Clear();
                Parameter.Add(new MSParameters("_usr_Name", user.usr_Name));
                Parameter.Add(new MSParameters("_usr_Email", user.usr_Email));
                Parameter.Add(new MSParameters("_usr_Nameperson", user.usr_Nameperson));
                Parameter.Add(new MSParameters("_usr_Birthday", user.usr_Birthday.ToString("yyyyMMdd")));
                Parameter.Add(new MSParameters("_lan_ID", user.lan_ID.ToString()));
                Parameter.Add(new MSParameters("_pro_id", user.pro_id.ToString()));
                Parameter.Add(new MSParameters("_usr_Pswd", user.usr_Pswd));
            }
            else
            {
                ModelState.Remove("usr_Pswd");
                accion = "pf_usr_UpdateUser";
                Parameter.Clear();
                Parameter.Add(new MSParameters("_usr_ID", funtions.Base64Decode(user.usr_ID)));
                Parameter.Add(new MSParameters("_usr_Name", user.usr_Name));
                Parameter.Add(new MSParameters("_usr_Email", user.usr_Email));
                Parameter.Add(new MSParameters("_usr_Nameperson", user.usr_Nameperson));
                Parameter.Add(new MSParameters("_usr_Birthday", user.usr_Birthday.ToString("yyyyMMdd")));
                Parameter.Add(new MSParameters("_lan_ID", user.lan_ID.ToString()));
                Parameter.Add(new MSParameters("_pro_id", user.pro_id.ToString()));
            }

            if (ModelState.IsValid) {

                DataTable result = MSutil.ExecuteStopProcedure(accion, Parameter);

                if (result.Rows[0][0].ToString() == "Success")
                {
                    TempData["success"] = result.Rows[0][0].ToString();
                    return PartialView("Admin/User/_EditUser");
                }
                else
                {
                    TempData["alert"] = result.Rows[0][0].ToString();
                    return PartialView("Admin/User/_EditUser");
                }

            }
            else
            {
                return PartialView("Admin/User/_EditUser");
                //DataTable UserDetails = new DataTable();

                //Parameter.Clear();
                //Parameter.Add(new MSParameters("usr_ID", funtions.Base64Decode(id)));

                //UserDetails = MSutil.ExecuteStopProcedure("ps_GetUserById", Parameter);

                //user.usr_ID = UserDetails.Rows[0][0].ToString();
                //user.usr_Name = UserDetails.Rows[0][1].ToString();
                //user.usr_Email = UserDetails.Rows[0][2].ToString();
                //user.usr_Nameperson = UserDetails.Rows[0][3].ToString();
                //user.usr_Birthday = Convert.ToDateTime(UserDetails.Rows[0][4].ToString());
                //user.lan_ID = Convert.ToInt32(UserDetails.Rows[0][5].ToString());
                //user.pro_id = Convert.ToInt32(UserDetails.Rows[0][6].ToString());


                ////if (result.Rows[0]["result"].ToString() == "Success")
                ////{
                //return PartialView("Admin/User/_EditUser", user);
                //}
                //else
                //{
                //    TempData["UserRegisterFailed"] = result.Rows[0]["result"].ToString();
                //    return PartialView("Admin/_userManager");
                //}
            }
            //}
            //else
            //{
            //    return PartialView("Admin/_userManager");
            //}
        }
    }
}