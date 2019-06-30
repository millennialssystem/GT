using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupTransfers.Models;
using GroupTransfers.Services;
using System.Data;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace GroupTransfers.Controllers
{
    public class AdminController : Controller
    {
        private WebSettings WebSetting = new WebSettings();
        private List<MSParameters> Parameter = new List<MSParameters>();
        MSutils MSutil = new MSutils("SERVER=localhost;" + "DATABASE=gt;" + "UID=root;" + "PASSWORD=;");
        public IActionResult Index()
        {
            ViewBag.Versionjs = WebSetting.Versionjs;
            ViewBag.Versioncss = WebSetting.Versioncss;
            ViewBag.currencyprice = MSutil.ExecuteStopProcedureToJson("Getcurrentprice", Parameter);
            return View();
        }

        //public class IndexModel: PageModel
        //{
        //    private WebSettings WebSetting = new WebSettings();
        //    private List<MSParameters> Parameter = new List<MSParameters>();
        //    MSutils MSutil = new MSutils("SERVER=localhost;" + "DATABASE=gt;" + "UID=root;" + "PASSWORD=;");
            public IActionResult Login(string usr, string pswd)
            {
            MSParameters par = new MSParameters("_user", usr);
            Parameter.Add(par);
            par = new MSParameters("pswd", pswd);
            Parameter.Add(par);
            DataTable _user = MSutil.ExecuteStopProcedure("ps_GetUserLogin", Parameter);
            //User user = new User(_user.Rows[0][0], _user.Rows[0][1], _user.Rows[0][2], _user.Rows[0][3], _user.Rows[0][4], _user.Rows[0][5], _user.Rows[0][6], _user.Rows[0][7], _user.Rows[0][8]);
            List<User> users = new List<User>();
            foreach (DataRow row in _user.Rows)
            {
                User user = new User() { usr_Name = row[0].ToString(),
                    usr_Email = row[1].ToString(),
                    usr_Nameperson = row[2].ToString(),
                    usr_Birthday = Convert.ToDateTime(row[3].ToString()),
                    lan_ID = Convert.ToInt32(row[4].ToString()),
                    pro_id = Convert.ToInt32(row[5].ToString()),
                    pro_Name = row[6].ToString(),
                    acc_id = Convert.ToInt32(row[7].ToString()),
                    acc_key = row[8].ToString()
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