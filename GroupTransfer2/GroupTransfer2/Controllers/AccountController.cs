using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupTransfer2.Models;
using GroupTransfer2.Services;
using System.Data;

namespace GroupTransfer2.Controllers
{
    [Route("Account")]
    public class AccountController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils();
        public IActionResult Login()
        {
            return View();
        }
        [Route("Login/{usr?}/{pswd?}")]
        //[HttpPost]
        public IActionResult Login(string usr, string pswd)
        {
            MSParameters par = new MSParameters("_user", usr);
            Parameter.Add(par);
            par = new MSParameters("pswd", pswd);
            Parameter.Add(par);
            //string 
            DataTable _user = MSutil.ExecuteStopProcedure("ps_GetUserLogin", Parameter);
            //User user = new User(_user.Rows[0][0], _user.Rows[0][1], _user.Rows[0][2], _user.Rows[0][3], _user.Rows[0][4], _user.Rows[0][5], _user.Rows[0][6], _user.Rows[0][7], _user.Rows[0][8]);
            List<User> users = new List<User>();
            foreach (DataRow row in _user.Rows)
            {
                User user = new User()
                {
                    usr_Name = row[0].ToString(),
                    usr_Email = row[1].ToString(),
                    usr_Nameperson = row[2].ToString(),
                    usr_Birthday = Convert.ToDateTime(row[3].ToString()),
                    lan_ID = Convert.ToInt32(row[4].ToString()),
                    pro_id = Convert.ToInt32(row[5].ToString())//,
                    //pro_Name = row[6].ToString(),
                    //acc_id = Convert.ToInt32(row[7].ToString()),
                    //acc_key = row[8].ToString()
                };
                users.Add(user);
            }


            //List<User> users = new List<User> {


            //};
            return PartialView("Admin/_menu", users);

            //return new PartialViewResult {
            //        ViewName = "Admin/_menu",
            //    ViewData = new ViewDataDictionary<List<user>>(ViewData, user)
            //            };
            //}
        }
    }
}