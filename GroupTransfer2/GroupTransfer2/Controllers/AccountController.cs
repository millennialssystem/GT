using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupTransfer2.Models;
using GroupTransfer2.Services;
using System.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace GroupTransfer2.Controllers
{
    //[Route("Account")]
    public class AccountController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils();

        [HttpGet]
        public IActionResult Login()
        {
            return PartialView("Admin/_login");
        }

        [HttpPost]
        public async Task<IActionResult> Login(Users user)
        {
            ModelState.Remove("usr_ID");
            ModelState.Remove("usr_Email");
            ModelState.Remove("usr_Nameperson");
            ModelState.Remove("usr_Birthday");
            ModelState.Remove("lan_ID");
            ModelState.Remove("pro_id");
            ModelState.Remove("usr_is_deleted");
            ModelState.Remove("usr_Pswd_Confirm");

            //List<Users> users = new List<Users>();

            if (ModelState.IsValid)
            {
                MSParameters par = new MSParameters("LoginUser", user.usr_Name);
                Parameter.Add(par);
                par = new MSParameters("LoginPassword", user.usr_Pswd);
                Parameter.Add(par);

                GeneralFuntions functions;

                DataTable LoginUser = MSutil.ExecuteStopProcedure("ps_ValidateUserLogin", Parameter);

                if (LoginUser.Rows[0]["authentication"].ToString() == "Success")
                {

                    Parameter.Clear();

                    par = new MSParameters("usr_id", functions.Base64Decode(LoginUser.Rows[0]["usr_ID"].ToString()));

                    Parameter.Add(par);

                    DataTable UserDetails = MSutil.ExecuteStopProcedure("ps_GetUserById", Parameter);
                    user.usr_ID = UserDetails.Rows[0][0].ToString();
                    user.usr_Name = UserDetails.Rows[0][1].ToString();
                    user.usr_Email = UserDetails.Rows[0][2].ToString();
                    user.usr_Nameperson = UserDetails.Rows[0][3].ToString();
                    user.usr_Birthday = Convert.ToDateTime(UserDetails.Rows[0][4].ToString());
                    user.lan_ID = Convert.ToInt32(UserDetails.Rows[0][5].ToString());
                    user.pro_id = Convert.ToInt32(UserDetails.Rows[0][6].ToString());

                    ClaimsIdentity identity = new ClaimsIdentity(new[] {
                        new Claim(ClaimTypes.Name, user.usr_Nameperson)
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                    return RedirectToAction("Index", "Admin");
                }
                else
                {
                    TempData["UserLoginFailed"] = "Error de inicio de sesion. Por favor ingrese las credenciales correctas...";
                    return PartialView("Admin/_login");
                }
            }
            else
            {
                return PartialView("Admin/_login");
            }
        }
    }
}