using GroupTransfer2.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfer2.Services
{
    public struct GeneralFuntions
    {
        public string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public IEnumerable<Users> ConvertToUsersReadings(DataTable dataTable)
        {
            foreach (DataRow row in dataTable.Rows)
            {
                yield return new Users
                {
                    usr_ID = row[0].ToString(),
                    usr_Name = row[1].ToString(),
                    usr_Email = row[2].ToString(),
                    usr_Nameperson = row[3].ToString(),
                    usr_Birthday = Convert.ToDateTime(row[4].ToString()),
                    lan_ID = Convert.ToInt32(row[5].ToString()),
                    pro_id = Convert.ToInt32(row[6].ToString()),
                    usr_is_deleted = Convert.ToInt32(row[8].ToString())
                };
            }
        }
    }
}
