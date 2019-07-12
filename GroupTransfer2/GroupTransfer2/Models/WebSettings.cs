using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;
using System.Data;
using GroupTransfer2.Services;

namespace GroupTransfer2.Models
{
    public class WebSettings : PageModel
    {
        private MSutils MSutil;
        public int Versionjs { get; set; }
        public int Versioncss { get; set; }
        public WebSettings()
        {
            try
            {
                MSutil = new MSutils();
                List<MSParameters> parameter = new List<MSParameters>();
                DataTable datosinit = MSutil.ExecuteStopProcedure("GetWebSettings", parameter);
                foreach (DataRow row in datosinit.Rows)
                {
                    switch (row["wse_key"])
                    {
                        case "versionjs":
                            Versionjs = int.Parse(row["wse_value"].ToString());
                            break;
                        case "versioncss":
                            Versioncss = int.Parse(row["wse_value"].ToString());
                            break;
                    }
                }
            }
            catch (Exception ex)
            {                
                MSutil.ConsoleLogError("WebSettings.cs;WebSettings", ex);
                Versionjs = 1;
                Versioncss = 1;
            }
        }
    }
}
