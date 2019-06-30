using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfers.Models
{
    public class User
    {
        public string usr_Name { get; set; }
        public string usr_Email { get; set; }
        public string usr_Nameperson { get; set; }
        public DateTime usr_Birthday { get; set; }
        public int lan_ID { get; set; }
        public int pro_id { get; set; }
        public string pro_Name { get; set; }
        public int acc_id { get; set; }
        public string acc_key { get; set; }

        public User()
        {
        }

        public User(string _usr_Name, string _usr_Email, string _usr_Nameperson, DateTime _usr_Birthday, int _lan_ID, int _pro_id, string _pro_Name, int _acc_id, string _acc_key)
        {
            usr_Name = _usr_Name;
            usr_Email = _usr_Email;
            usr_Nameperson = _usr_Nameperson;
            usr_Birthday = _usr_Birthday;
            lan_ID = _lan_ID;
            pro_id = _pro_id;
            pro_Name = _pro_Name;
            acc_id = _acc_id;
            acc_key = _acc_key;
        }
    }
}
