using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace GroupTransfers.Services
{
    public struct MSutils
    {
        private MySqlConnection ConnectionString;
        public MSutils(string connectionString)
        {
            try
            {            
            //connectionString = "SERVER=localhost;" + "DATABASE=gt;" + "UID=root;" + "PASSWORD=;";

            ConnectionString = new MySqlConnection(connectionString);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public string ExecuteStopProcedureToJson(string NameSP, List<MSParameters> parameters)
        {
            DataTable dt = new DataTable("Result");
            try
            {
                ConnectionString.Open();
                string rtn = NameSP;
                MySqlCommand cmd = new MySqlCommand(rtn, ConnectionString);
                cmd.CommandType = CommandType.StoredProcedure;
                parameters.ForEach(item =>
                {
                    cmd.Parameters.AddWithValue(item.Name, item.Value);
                });
                MySqlDataReader rdr = cmd.ExecuteReader();
                //Beginmomentaneo
                switch (NameSP)
                {
                    case "GetWebSettings":
                        dt.Columns.Add("wse_id");
                        dt.Columns.Add("wse_key");
                        dt.Columns.Add("wse_value");
                        break;
                    case "Getcurrentprice":
                        dt.Columns.Add("prc_id");
                        dt.Columns.Add("prc_bank");
                        dt.Columns.Add("prc_name");
                        dt.Columns.Add("prc_value");
                        dt.Columns.Add("prc_update");
                        break;
                    case "AddCurrenPrice":
                        dt.Columns.Add("id");
                        break;
                }
                //Endmomentaneo
                DataRow row;
                while (rdr.Read())
                {
                    row = dt.NewRow();
                    for (int i = 0; i < rdr.FieldCount; i++)
                    {
                        if(rdr[i].GetType() == DateTime.Now.GetType())
                            row[i] = String.Format("{0:u}", rdr[i]);
                        else
                        row[i] = rdr[i];
                    }
                    dt.Rows.Add(row);
                }
                rdr.Close();
                ConnectionString.Close();                
            }
            catch (Exception ex)
            {
                dt = null;
                ConsoleLogError("MSUtils.cs;ExecuteStopProcedureSelect", ex);
            }
            return JsonConvert.SerializeObject(dt);
        }

        public void ExecuteStopProcedureNotResult(string NameSP, List<MSParameters> parameters)
        {           
            try
            {
                ConnectionString.Open();
                string rtn = NameSP;
                MySqlCommand cmd = new MySqlCommand(rtn, ConnectionString);
                cmd.CommandType = CommandType.StoredProcedure;
                parameters.ForEach(item =>
                {
                    cmd.Parameters.AddWithValue(item.Name, item.Value);
                });
                MySqlDataReader rdr = cmd.ExecuteReader();               
                rdr.Close();
                ConnectionString.Close();
            }
            catch (Exception ex)
            {               
                ConsoleLogError("MSUtils.cs;ExecuteStopProcedureSelect", ex);
            }          
        }

        public DataTable ExecuteStopProcedure(string NameSP, List<MSParameters> parameters)
        {
            DataTable dt = new DataTable("Result");
            try
            {                
                ConnectionString.Open();
                string rtn = NameSP;
                MySqlCommand cmd = new MySqlCommand(rtn, ConnectionString);
                cmd.CommandType = CommandType.StoredProcedure;
                parameters.ForEach(item =>
                {
                    cmd.Parameters.AddWithValue(item.Name, item.Value);
                });
                MySqlDataReader rdr = cmd.ExecuteReader();                
                //Beginmomentaneo
                switch (NameSP)
                {
                    case "GetWebSettings":
                        dt.Columns.Add("wse_id");
                        dt.Columns.Add("wse_key");
                        dt.Columns.Add("wse_value");
                        break;
                }
                //Endmomentaneo
                DataRow row;
                while (rdr.Read())
                {                    
                    row = dt.NewRow();
                    for (int i = 0; i < rdr.FieldCount; i++)
                    {                       
                        row[i] = rdr[i];
                    }
                    dt.Rows.Add(row);
                }
                rdr.Close();
                ConnectionString.Close();
            }
            catch (Exception ex)
            {
                dt = null;
                ConsoleLogError("MSUtils.cs;ExecuteStopProcedureSelect", ex);
            }
            return dt;
        }
        /// <summary>
        /// It allows to locate errors
        /// </summary>
        /// <param name="Metod">Method that causes the exception and its location</param>
        /// <param name="Error">exception generated</param>
        public void ConsoleLogError(string Metod, Exception Error)
        {
            try
            {
                Console.WriteLine(Metod + Error.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }    
    }
}
