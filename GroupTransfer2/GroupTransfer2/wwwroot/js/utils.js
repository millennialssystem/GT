var utils = {
    getDateGT: function (fecha, todate) {        
        switch (todate) {
            case "yyyy-mm-dd":
                var fechaformateada = new Date(fecha);                
                return utils.completeLeft(fechaformateada.getDate().toString(), "0", 2)+"/"+
                    utils.completeLeft((fechaformateada.getMonth() + 1).toString(), "0", 2) + "/" +
                    fechaformateada.getFullYear();
                break;
            default:
                var fechaformateada = new Date(fecha);
                return fechaformateada.getDate() + "/" + (fechaformateada.getMonth() + 1) + "/" + fechaformateada.getFullYear() + " " + fechaformateada.getHours() + ":" + fechaformateada.getMinutes();
                break;
        }       
    },
    mensajecorecto: function (obj, texto) {
        $('#' + obj).html("<div class='alert alert-success'>");
        $('#' + obj + '> .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#' + obj + '> .alert-success')
            .append("<strong>" + texto + "</strong>");
        $('#' + obj + '> .alert-success')
            .append('</div>');
    },
    mensajeIncorecto: function (obj, texto) {
        $('#' + obj).html("<div class='alert alert-danger'>");
        $('#' + obj + '> .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $('#' + obj + '> .alert-danger')
            .append("<strong>" + texto + "</strong>");
        $('#' + obj + '> .alert-danger')
            .append('</div>');
    },
    completeRight: function (cadena, item, length) {
        return (cadena.length < length) ? this.completeRight(cadena + item, item, length) : cadena;
    },
    completeLeft: function (cadena, item, length) {
        return (cadena.length < length) ? this.completeLeft(item + cadena, item, length) : cadena;
    }
}