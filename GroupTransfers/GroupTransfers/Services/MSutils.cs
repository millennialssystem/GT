using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace GroupTransfers.Services
{
    public struct MSutils
    {
        private MySqlConnection ConnectionString;
        public MSutils(string connectionString)
        {           
            connectionString = "SERVER=localhost;" + "DATABASE=gt;" + "UID=root;" + "PASSWORD=;";

            ConnectionString = new MySqlConnection(connectionString);
            ConnectionString.Open();
        }
        public int GetversionJs()
        {
            try
            {
                return 5;
            }
            catch (Exception)
            {
                return 0;
            }
        }
        public int GetversionCss()
        {
            try
            {
                return 5;
            }
            catch (Exception)
            {
                return 0;
            }
        }

    }
}
