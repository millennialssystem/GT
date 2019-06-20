using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;
using GroupTransfers.Services;
namespace GroupTransfers.Models
{
    public class WebSettings: PageModel
    {
        private MSutils MSutil;
        public int Versionjs { get; set; }
        public int Versioncss { get; set; }
        public WebSettings()
        {
            MSutil = new MSutils("");
            Versionjs = MSutil.GetversionJs();
            Versioncss = MSutil.GetversionCss();
        }
    }
}
