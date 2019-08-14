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

                    user.OnGetProfileAccess();

                    ClaimsIdentity identity = new ClaimsIdentity(new[] {
                        new Claim(ClaimTypes.Name, user.usr_Nameperson),
                        new Claim(ClaimTypes.Email, user.usr_Email),
                        new Claim(ClaimTypes.NameIdentifier, user.usr_ID),
                        new Claim(ClaimTypes.DateOfBirth, user.usr_Birthday.ToString()),
                        new Claim(ClaimTypes.Surname, user.usr_Name)//,
                        //new Claim("abc", "abc", ClaimValueTypes.String)
                    }, CookieAuthenticationDefaults.AuthenticationScheme);


                    foreach (var item in user.userAccess)
                    {
                        identity.AddClaim(new Claim(item.acc_key, item.acc_key, ClaimValueTypes.String));
                    }

                    //identity.AddClaim

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

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "Account");
        }

        [HttpGet]
        public IActionResult ChangePassword()
        {
            return PartialView("Admin/User/_ChangePassword");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ChangePassword(UsersChangePassword usersChangePassword)
        {

            MSParameters par = new MSParameters("LoginUser", User.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname").Select(c => c.Value).DefaultIfEmpty("Failed").First());
            Parameter.Add(par);
            par = new MSParameters("LoginPassword", usersChangePassword.usr_Pswd_Old);
            Parameter.Add(par);

            GeneralFuntions functions;

            DataTable LoginUser = MSutil.ExecuteStopProcedure("ps_ValidateUserLogin", Parameter);

            if (LoginUser.Rows[0]["authentication"].ToString() == "Success")
            {

                Parameter.Clear();

                Parameter.Add(new MSParameters("_usr_ID", functions.Base64Decode(LoginUser.Rows[0]["usr_ID"].ToString())));
                Parameter.Add(new MSParameters("_usr_Pswd", usersChangePassword.usr_Pswd));

                DataTable result = MSutil.ExecuteStopProcedure("pf_usr_change_password", Parameter);
                TempData["result"] = result.Rows[0][0].ToString();
                TempData["message"] = result.Rows[0][1].ToString();
            }
            else
            {
                TempData["changePasswordFailed"] = "Error al intentar cambiar la contraseña. Por favor ingrese las credenciales correctas...";
                //return PartialView("Admin/_login");
            }

            return PartialView("Admin/User/_ChangePassword");
        }
    }
}