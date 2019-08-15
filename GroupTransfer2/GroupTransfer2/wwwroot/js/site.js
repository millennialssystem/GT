$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.anyClass').perfectScrollbar();
});

$(document).ready(function (e) {    
    currencyprice.Init();
    package.Init();
    question.Init();
});

var site = {
    hideAlerts: function () {
        setTimeout(function () { $(".alert").alert('close'); }, 1500);
    },
    hideModals: function (myModal) {
        $(myModal).modal('hide');
    },
    toolTips: function (element) {
        $('[data-toggle="tooltip"]').tooltip();
    },
    disabledElement: function (element) {
        $(element).addClass('disabled');
        $(element).attr('disabled')

    },
    showModal: function (myModal) {
        $(myModal).modal('show');
    }
};