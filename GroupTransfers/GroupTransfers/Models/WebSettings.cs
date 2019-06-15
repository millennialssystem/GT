using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;

namespace GroupTransfers.Models
{
    public class WebSettings: PageModel
    {
        public int Versionjs { get; set; }
        public int Versioncss { get; set; }
        public WebSettings()
        {
            Versionjs = (int)DateTime.Now.Ticks;
            Versioncss = 5;

        }
    }
}
