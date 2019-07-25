using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfer2.Models
{
    public class Users
    {
        [Key]
        public string usr_ID { get; set; }
        [Required(ErrorMessage = "Por favor ingrese el Usuario")]
        [Display(Name = "Usuario")]
        [MaxLength(20)]
        public string usr_Name { get; set; }
        [Required]
        [Display(Name = "Correo Electrónico")]
        [DataType(DataType.EmailAddress)]
        [MaxLength(30)]
        public string usr_Email { get; set; }
        [Required]
        [Display(Name = "Nombre")]
        [MaxLength(30)]
        public string usr_Nameperson { get; set; }
        [Required]
        [Display(Name = "Fecha de Nacimiento")]
        [DataType(DataType.Date)]
        public DateTime usr_Birthday { get; set; }
        [Required]
        public int lan_ID { get; set; }
        [Required]
        public int pro_id { get; set; }
        [Required(ErrorMessage = "Por favor ingrese su contraseña")]
        [Display(Name = "Contraseña")]
        [DataType(DataType.Password)]
        public string usr_Pswd { get; set; }
        [Required(ErrorMessage = "Por favor confirme su contraseña")]
        [Display(Name = "Confirme su contraseña")]
        [DataType(DataType.Password)]
        [Compare("usr_Pswd", ErrorMessage = "La contraseña no coincide")]
        public string usr_Pswd_Confirm { get; set; }
        public int usr_is_deleted { get; set; }
    }
}
