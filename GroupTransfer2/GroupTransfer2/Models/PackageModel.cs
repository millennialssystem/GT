using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfer2.Models
{
    public class PackageModel
    {
        [Key]
        public int Pck_id { get; set; }
        #region detail send
        [Required]
        [Display(Name = "CODIGO G-TRACK")]
        public int Pck_ref { get; set; }

        [Required]
        [Display(Name = "Detalles de envio")]
        [MaxLength(50)]
        public string Pck_detailSend { get; set; }

        [Required]
        [Display(Name = "Progreso")]
        [Range(1, 100)]
        public int Pck_progress { get; set; }
        #endregion

        #region customers
        [Required]
        [Display(Name = "IDENTIFICACION")]
        public int Pck_IdCustomer { get; set; }

        [Required]
        [Display(Name = "NOMBRES")]
        [MaxLength(50)]
        public string Pck_NameCustomer { get; set; }

        [Required]
        [Display(Name = "APELLIDOS")]
        [MaxLength(50)]
        public string Pck_LastNameCustomer { get; set; }

        [Required]
        [Display(Name = "EDAD")]
        public int Pck_AgeCustomer { get; set; }

        [Display(Name = "TELEFONOS")]
        public List<string> Pck_PhoneCustomer { get; set; }

        [Required]
        [Display(Name = "DIRECCION DE PROCEDENCIA")]
        [MaxLength(200)]
        public string Pck_AddressCustomer { get; set; }

        [Required]
        [Display(Name = "CORREO ELECTRONICO")]
        [MaxLength(70)]
        public string Pck_EmailCustomer { get; set; }
        #endregion


        #region beneficiary
        [Required]
        [Display(Name = "NOMBRES Y APELLIDOS")]
        [MaxLength(80)]
        public string Pck_NameLastnamebeneficiary { get; set; }

        [Display(Name = "TELEFONOS")]
        public List<string> Pck_Phonebeneficiary { get; set; }

        [Required]
        [Display(Name = "DIRECCION DE ENTREGA")]
        [MaxLength(200)]
        public string Pck_Addressbeneficiary { get; set; }
        #endregion

        #region detailPackage
        [Required]
        [Display(Name = "NOMBRES RECAUDADOR")]
        [MaxLength(80)]
        public string Pck_NameCollector { get; set; }

        [Required]
        [Display(Name = "ID RECAUDADOR")]        
        public int Pck_IdCollector { get; set; }

        [Required]
        [Display(Name = "PRECIO POR KG")]
        public decimal Pck_PriceByKg { get; set; }

        [Required]
        [Display(Name = "TOTAL KG EN VALIJA")]
        public decimal Pck_KgInSuitCase { get; set; }

        [Required]
        [Display(Name = "MONEDA")]
        [MaxLength(20)]
        public string Pck_Coin { get; set; }

        [Required]
        [Display(Name = "TIPO DE CAMBIO")]
        [MaxLength(50)]
        public string Pck_TypeChange { get; set; }

        [Required]
        [Display(Name = "TOTAL A CANCELAR")]        
        public decimal Pck_TotalPrice { get; set; }

        [Required]
        [Display(Name = "FECHA")]
        public DateTime Pck_Date { get; set; }

        [Required]
        [Display(Name = "detallar artículos")]
        [MaxLength(3000)]
        public string Pck_detailArticles { get; set; }
        #endregion
    }
}
