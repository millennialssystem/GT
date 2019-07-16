var utils = {
    getDateGT: function (fecha) {
        var fechaformateada = new Date(fecha);
        return fechaformateada.getDate() + "/" + (fechaformateada.getMonth() + 1) + "/" + fechaformateada.getFullYear() + " " + fechaformateada.getHours() + ":" + fechaformateada.getMinutes();
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
        return (cadena.length < length) ? completeRight(cadena + item, item, length) : cadena;
    },
    completeLeft: function (cadena, item, length) {
        return (cadena.length < length) ? completeLeft(item + cadena, item, length) : cadena;
    }
}