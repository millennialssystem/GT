using GroupTransfer2.Services;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfer2.Models
{
    public class UsersChangePassword
    {
        //private List<MSParameters> Parameter = new List<MSParameters>();

        //private MSutils msUtils = new MSutils();

        //private GeneralFuntions funtions = new GeneralFuntions();

        //[Key]
        //public string usr_ID { get; set; }

        //[Required(ErrorMessage = "Por favor ingrese el Usuario")]
        //[Display(Name = "Usuario")]
        //[StringLength(20,ErrorMessage = "El usuario debe contener una longitud entre 5 y 20 caracteres",MinimumLength = 5)]
        //public string usr_Name { get; set; }

        //[Required(ErrorMessage = "Por favor ingrese el Correo Electrónico")]
        //[Display(Name = "Correo Electrónico")]
        //[DataType(DataType.EmailAddress,ErrorMessage = "Por favor Ingrese un Correo Electrónico válido")]
        //[StringLength(30, ErrorMessage = "El Correo Electrónico debe contener una longitud máxima de 30 caracteres")]
        //public string usr_Email { get; set; }

        //[Required(ErrorMessage = "Por favor ingrese el Nombre")]
        //[Display(Name = "Nombre")]
        //[StringLength(30, ErrorMessage = "El Nombre debe contener una longitud máxima de 30 caracteres")]
        //public string usr_Nameperson { get; set; }

        //[Required(ErrorMessage = "Por favor ingrese la Fecha de Nacimiento")]
        //[Display(Name = "Fecha de Nacimiento")]
        //[DataType(DataType.Date)]
        //public DateTime usr_Birthday { get; set; }

        ////[Required]
        //public int lan_ID { get; set; }
        [Required(ErrorMessage = "Por favor ingrese su Contraseña actual")]
        [StringLength(15, ErrorMessage = " La contraseña debe contener una longitud entre {1} y {0} caracteres", MinimumLength = 5)]
        [Display(Name = "Contraseña actual")]
        [DataType(DataType.Password)]
        public string usr_Pswd_Old { get; set; }

        [Required(ErrorMessage = "Por favor ingrese su nueva Contraseña")]
        [StringLength(15, ErrorMessage =" La contraseña debe contener una longitud entre {1} y {0} caracteres", MinimumLength = 5)]
        [Display(Name = "Contraseña nueva")]
        [DataType(DataType.Password)]
        public string usr_Pswd { get; set; }

        [Required(ErrorMessage = "Por favor confirme su nueva contraseña")]
        [StringLength(15, ErrorMessage = " La contraseña debe contener una longitud entre {1} y {0} caracteres", MinimumLength = 5)]
        [Display(Name = "Confirme su nueva contraseña")]
        [DataType(DataType.Password)]
        [Compare("usr_Pswd", ErrorMessage = "La contraseña nueva no coincide")]
        public string usr_Pswd_Confirm { get; set; }

        //public int usr_is_deleted { get; set; }

        //[Required(ErrorMessage = "Por favor seleccione el perfil")]
        //[Display(Name = "Perfil")]
        //public int pro_id { get; set; }

        //public SelectList profile { get; set; }

        //public void OnGet()
        //{
        //    Parameter.Clear();
            
        //    List<Profile> profilers = funtions.ConvertToProfileReadings(msUtils.ExecuteStopProcedure("ps_GetProfileLists", Parameter)).ToList();

        //    var profileObj = profilers;
            
        //    profile = new SelectList(profilers,nameof(Profile.pro_id),nameof(Profile.pro_name),nameof(Users.pro_id));
        //}
    }
}
