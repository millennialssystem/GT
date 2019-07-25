$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function (e) {    
    currencyprice.Init();
    package.Init();
    question.Init();
});

var site = {
    hideAlerts: function () {
        setTimeout(function () { $(".alert").alert('close'); }, 3000);
    }
};