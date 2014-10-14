//----------------------------------------------------------------------------
// ОПРЕДЕЛЕНИЕ НАСТРОЕК РАЙОНА

function getCityId() {
    if (isCustomersMainPage()) {
        var city = null;
        if ($("#cities_list option:selected").val() != undefined)
            city = $("#cities_list option[value='" + $("#cities_list option:selected").val().toString() + "']").data("object");
        return (city != null) ? city.Id : 0;
    }

    if (isCustomersPage()) {
        var search = $.deparam(location.search.substring(1), true);
        return search.CityId;
    }

    return 0;
}

function getRegionId() {
    if (isCustomersMainPage()) {
        var region = null;
        if ($("#regions_list option:selected").val() != undefined)
            region = $("#regions_list option[value='" + $("#regions_list option:selected").val().toString() + "']").data("object");
        return (region != null) ? region.Id : 0;
    }
    
    if (isCustomersPage ()) {
        var search = $.deparam(location.search.substring(1), true);
        return search.RegionId;
    }

    if (isResidentsPage()) {
        return Number ($("#current_region_id").val ())
    }

    return 0;
}

function getDispId() {
    if (isCustomersMainPage()) {
        var disp = null;
        if ($("#disps_list option:selected").val() != undefined)
            disp = $("#disps_list option[value='" + $("#disps_list option:selected").val().toString() + "']").data("object");
        return (disp != null) ? disp.Id : 0;
    }

    if (isCustomersPage()) {
        var search = $.deparam(location.search.substring(1), true);
        return search.DispId;
    }

    return 0;
}

function getRegionName() {
    if (isCustomersMainPage()) {
        var region = null;
        if ($("#regions_list option:selected").val() != undefined)
            region = $("#regions_list option[value='" + $("#regions_list option:selected").val().toString() + "']").data("object");
        return (region != null) ? region.Name : "";
    }

    if (isCustomersPage()) {
        var search = $.deparam(location.search.substring(1), true);
        return search.RegionName;
    }

    return "";
}

function getDispName() {
    if (isCustomersMainPage()) {
        var disp = null;
        if ($("#disps_list option:selected").val() != undefined)
            disp = $("#disps_list option[value='" + $("#disps_list option:selected").val().toString() + "']").data("object");
        return (disp != null) ? disp.Name : "";
    }

    if (isCustomersPage()) {
        var search = $.deparam(location.search.substring(1), true);
        return search.DispName;
    }

    return "";
}

//----------------------------------------------------------------------------
// Toast Message

function successToast(msg) {
    $().toastmessage('showToast', {
        text: msg,
        stayTime: 1500,
        sticky: false,
        position: 'middle-center',
        type: 'success',
        closeText: ''
    });
}

function errorToast(msg) {
    $().toastmessage('showToast', {
        text: msg,
        stayTime: 5000,
        sticky: false,
        position: 'middle-center',
        type: 'error',
        closeText: ''
    });
}

//----------------------------------------------------------------------------
// Loading

function loading(en, delay, close_delay) {
    if (en) {
        if (delay == null) {
            $("body").addClass("loading");
            return;
        }
        setTimeout("if (window.isLoading) loading (true);", delay);
        if (close_delay != null)
            setTimeout("loading (false);", delay + close_delay);
    }
    else {
        $("body").removeClass("loading");
    }
    window.isLoading = en;
}

//----------------------------------------------------------------------------
// Services

function serviceError(err) {
    loading(false);
    if (!window.isServiceError) {
        errorToast("Ошибка доступа к данным!");
    }

    window.isServiceError = true;
    setTimeout("window.isServiceError = false;", 5000);
}

//----------------------------------------------------------------------------
// Yandex Metric

function initYandexMetric() {
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter24130216 = new Ya.Metrika({ id: 24130216,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true
                });
            } catch (e) { }
        });

        var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
}

//----------------------------------------------------------------------------
// Validation

function recaptchaValidate(sender, args) {
    var response = $('#recaptcha_response_field').val();
    var challenge = $('#recaptcha_challenge_field').val();

    var html = $.ajax({ url: "/WebServices/RecaptchaService.svc/Validate",
        data: 'challenge=' + challenge + '&response=' + response,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).responseText;

    args.IsValid = $.parseJSON(html).d;
}

