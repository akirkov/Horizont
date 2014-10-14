//----------------------------------------------------------------------------
// ИНИЦИАЛИЗАЦИЯ ДИАЛОГОВ

function initServerDlg() {
    $("#server_name, #server_claims_service, #server_elv_service").bind("textchange", function () {
        onChangeServerField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeServerField();
    });

    $("#server_save_button").click(function () {
        if (!Page_ClientValidate("server_validators"))
            return false;

        onSaveServer();
        $("#server_dialog").dialog("close");
    });

    $("#server_dialog").dialog({
        open: function (event, ui) {
            var server = $("#server_control").data("object");
            if (server != null)
                document.title = $("body").data("title") + " - Изменение записи о сервере";
            else
                document.title = $("body").data("title") + " - Создание записи о сервере";
            pushHistoryState();
        },
        beforeClose: function (event, ui) {
            var server = $("#server_control").data("object");
            if (server == null)
                replaceHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initCityDlg() {
    $("#city_name").bind("textchange", function () {
        onChangeCityField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCityField();
    });

    $("#city_save_button").click(function () {
        if (!Page_ClientValidate("city_validators"))
            return false;

        onSaveCity();
        $("#city_dialog").dialog("close");
    });

    $("#city_dialog").dialog({
        open: function (event, ui) {
            var city = $("#city_control").data("object");
            if (city != null)
                document.title = $("body").data("title") + " - Изменение записи о городе";
            else
                document.title = $("body").data("title") + " - Создание записи о городе";
            pushHistoryState();
        },
        beforeClose: function (event, ui) {
            var city = $("#city_control").data("object");
            if (city == null)
                replaceHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initRegionDlg() {
    $("#region_city, #region_server, #region_local").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    });

    $("#region_name").bind("textchange", function () {
        onChangeRegionField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeRegionField();
    });

    $("#region_city").change(function () {
        onChangeRegionField();
    });

    $("#region_server").change(function () {
        loading(true, 500);
        updateLocalRegions(function () {
            loading(false);
        }, serviceError);

        onChangeRegionField();
    });

    $("#region_local").change(function () {
        onChangeRegionField();
    });

    $("#region_save_button").click(function () {
        onSaveRegion();

        $("#region_dialog").dialog("close");
    });

    $("#region_dialog").dialog({
        open: function (event, ui) {
            var rule = $("#region_control").data("object");
            if (rule != null)
                document.title = $("body").data("title") + " - Изменение записи о районе";
            else
                document.title = $("body").data("title") + " - Создание записи о районе";
            pushHistoryState();
        },
        beforeClose: function (event, ui) {
            var rule = $("#region_control").data("object");
            if (rule == null)
                replaceHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

//----------------------------------------------------------------------------
// ДИАЛОГИ СОЗДАНИЯ

function createServerDlg(state) {
    $("#server_control").data("object", null);
    $(".server-validator").empty();

    restoreServerControl(state);
    updateServerControls(null);

    $("#server_dialog").dialog("option", "title", "Создание записи о сервере");
    $("#server_dialog").dialog("open");
}

function createCityDlg(state) {
    $("#city_control").data("object", null);
    $(".city-validator").empty();

    restoreCityControl(state);
    updateCityControls(null);

    $("#city_dialog").dialog("option", "title", "Создание записи о городе");
    $("#city_dialog").dialog("open");
}

function createRegionDlg(fnCallBack, fnError, state) {
    $("#region_control").data("object", null);
    $(".region-validator").empty();

    restoreRegionControl(state, function () {
        updateRegionControls(null);

        $("#region_dialog").dialog("option", "title", "Создание записи о районе");
        $("#region_dialog").dialog("open");

        fnCallBack();
    }, fnError);
}

//----------------------------------------------------------------------------
// ДИАЛОГИ РЕДАКТИРОВАНИЯ

function serverDlg(server) {
    $("#server_control").data("object", server);
    $(".server-validator").empty();

    var state = new Object();
    state.Name = server.Name;
    state.Horizont.Claims.Service = server.Horizont.Claims.Service;
    state.Horizont.Elv.Service = server.Horizont.Elv.Service;

    restoreServerControl(state);
    updateServerControls(server);

    $("#server_dialog").dialog("option", "title", "Изменение записи о сервере");
    $("#server_dialog").dialog("open");
}

function cityDlg(city) {
    $("#city_control").data("object", city);
    $(".city-validator").empty();

    var state = new Object();
    state.Name = city.Name;

    restoreCityControl(state);
    updateCityControls(city);

    $("#city_dialog").dialog("option", "title", "Изменение записи о городе");
    $("#city_dialog").dialog("open");
}

function regionDlg(region, fnCallBack, fnError) {
    $("#region_control").data("object", region);
    $(".region-validator").empty();

    var state = new Object();
    state.Name = region.Name;
    state.CityId = (region.City != null) ? region.City.Id : 0;
    state.ServerId = (region.Server != null) ? region.Server.Id : 0;
    state.LocalId = region.LocalId;

    restoreRegionControl(state, function () {
        updateRegionControls(region);

        $("#region_dialog").dialog("option", "title", "Изменение записи о районе");
        $("#region_dialog").dialog("open");

        fnCallBack();
    }, fnError);
}

//----------------------------------------------------------------------------
// ФУНКЦИИ СОХРАНЕНИЯ И УДАЛЕНИЯ

function onSaveServer() {
    var server = $("#server_control").data("object");

    if (server == null)
        onCreateServer();
    else
        onChangeServer();
}

function onCreateServer() {
    var server = new Object();
    server.Name = $("#server_name").val().trim();
    server.Horizont.Claims.Service = $("#server_claims_service").val().trim();
    server.Horizont.Elv.Service = $("#server_elv_service").val().trim();

    loading(true, 500);
    var service = new Horizont.Web.RegionsWebService();
    service.CreateServer(server, function (ret) {
        loading(false);
        if (ret) {
            successToast("Запись о сервере успешно создана");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onChangeServer() {
    var server = $("#server_control").data("object");
    if (!isServerChanged(server))
        return;

    server.Name = $("#server_name").val().trim();
    server.Horizont.Claims.Service = $("#server_claims_service").val().trim();
    server.Horizont.Elv.Service = $("#server_elv_service").val().trim();

    loading(true, 500);
    var service = new Horizont.Web.RegionsWebService();
    service.ChangeServer(server, function (ret) {
        loading(false);
        if (ret) {
            successToast("Данные сервера сохранены");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

//---------------------------------------------------------------

function onSaveCity() {
    var city = $("#city_control").data("object");

    if (city == null)
        onCreateCity();
    else
        onChangeCity();
}

function onCreateCity() {
    var city = new Object();
    city.Name = $("#city_name").val().trim();

    loading(true, 500);
    var service = new Horizont.Web.RegionsWebService();
    service.CreateCity(city, function (ret) {
        loading(false);
        if (ret) {
            successToast("Запись о городе успешно создана");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onChangeCity() {
    var city = $("#city_control").data("object");
    if (!isCityChanged(city))
        return;

    city.Name = $("#city_name").val().trim();

    loading(true, 500);
    var service = new Horizont.Web.RegionsWebService();
    service.ChangeCity(city, function (ret) {
        loading(false);
        if (ret) {
            successToast("Данные города сохранены");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

//---------------------------------------------------------------

function onSaveRegion() {
    var region = $("#region_control").data("object");

    if (region == null)
        onCreateRegion();
    else
        onChangeRegion();
}

function onCreateRegion() {
    var region = new Object();
    region.Name = $("#region_name").val().trim();
    region.City = $("#region_city option:selected").data("object");
    region.Server = $("#region_server option:selected").data("object");
    region.LocalId = $("#region_local option:selected").val();

    loading(true, 500);
    var service = new Horizont.Web.RegionsWebService();
    service.CreateRegion(region, function (ret) {
        loading(false);
        if (ret) {
            successToast("Запись о районе успешно создана");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onChangeRegion() {
    var region = $("#region_control").data("object");
    if (!isRegionChanged(region))
        return;

    region.Name = $("#region_name").val().trim();
    region.City = $("#region_city option:selected").data("object");
    region.Server = $("#region_server option:selected").data("object");
    region.LocalId = $("#region_local option:selected").val();

    loading(true, 500);
    var service = new Horizont.Web.RegionsWebService();
    service.ChangeRegion(region, function (ret) {
        loading(false);
        if (ret) {
            successToast("Данные района сохранены");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

//----------------------------------------------------------------------------
// ФУКНЦИИ ПРОВЕРКИ ИЗМЕНЕНИЯ

function isServerChanged(server) {
    if (server.Name != $("#server_name").val().trim())
        return true;
    if (server.Horizont.Claims.Service != $("#server_claims_service").val().trim())
        return true;
    if (server.Horizont.Elv.Service != $("#server_elv_service").val().trim())
        return true;
    return false;
}

function isCityChanged(city) {
    if (city.Name != $("#city_name").val().trim())
        return true;
    return false;
}

function isRegionChanged(region) {
    if (region.Name != $("#region_name").val().trim())
        return true;
    if (region.City != $("#region_city option:selected").data("object"))
        return true;
    if (region.Server != $("#region_server option:selected").data("object"))
        return true;
    if (region.LocalId != $("#region_local option:selected").val())
        return true;
    return false;
}

//----------------------------------------------------------------------------
// ФУКНЦИИ УСТАНОВЛЕНИЯ СВОЙСТВ ОБЪЕКТОВ УПРАВЛЕНИЯ

function updateServerControls(server) {
    $("#server_name").attr('disabled', false);
    $("#server_claims_service").attr('disabled', false);
    $("#server_elv_service").attr('disabled', false);

    $("#server_save_button").css("display", (server == null) ? "" : "none");
}

function updateCityControls(city) {
    $("#city_name").attr('disabled', false);

    $("#city_save_button").css("display", (city == null) ? "" : "none");
}

function updateRegionControls(region) {
    $("#region_name").attr('disabled', false);
    $("#region_city").multiselect("enable");
    $("#region_server").multiselect("enable");
    $("#region_local").multiselect("enable");

    $("#region_save_button").css("display", (region == null) ? "" : "none");
}

//----------------------------------------------------------------------------
// СОБЫТИЯ НА ИЗМЕНЕНИЯ ПОЛЕЙ

function onChangeServerField() {
    if (!$("#server_dialog").dialog("isOpen"))
        return;
    var server = $("#server_control").data("object");
    if (server == null)
        return;

    $("#server_save_button").css("display", isServerChanged(server) ? "" : "none");
}

function onChangeCityField() {
    if (!$("#city_dialog").dialog("isOpen"))
        return;
    var city = $("#city_control").data("object");
    if (city == null)
        return;

    $("#city_save_button").css("display", isCityChanged(city) ? "" : "none");
}

function onChangeRegionField() {
    if (!$("#region_dialog").dialog("isOpen"))
        return;
    var region = $("#region_control").data("object");
    if (region == null)
        return;

    $("#region_save_button").css("display", isRegionChanged(region) ? "" : "none");
}

//----------------------------------------------------------------------------
// СОХРАНЕНИЕ И ВОССТАНОВЛЕНИЕ ДАННЫХ ФОРМЫ

function saveServerControl() {
    var state = new Object();
    state.Name = $("#server_name").val().trim();
    state.Horizont.Claims.Service = $("#server_claims_service").val().trim();
    state.Horizont.Elv.Service = $("#server_elv_service").val().trim();

    return state;
}

function restoreServerControl(state) {
    $("#server_name").val((state != null) ? state.Name : "");
    $("#server_claims_service").val((state != null) ? state.Horizont.Claims.Service : "");
    $("#server_elv_service").val((state != null) ? state.Horizont.Elv.Service : "");
}

//-------------------------------------------------------------

function saveCityControl() {
    var state = new Object();
    state.Name = $("#city_name").val().trim();

    return state;
}

function restoreCityControl(state) {
    $("#city_name").val((state != null) ? state.Name : "");
}

//-------------------------------------------------------------

function saveRegionControl() {
    var state = new Object();
    state.Name = $("#region_name").val().trim();
    state.CityId = $("#region_city option:selected").val();
    state.ServerId = $("#region_server option:selected").val();
    state.LocalId = $("#region_local option:selected").val();

    return state;
}

function restoreRegionControl(state, fnCallBack, fnError) {
    $("#region_name").val((state != null) ? state.Name : "");
    var firstUpdated = true;
    updateRegionCities(function () {
        if (firstUpdated) {
            firstUpdated = false;
            return;
        }
        fnCallBack();
    }, fnError, state);

    updateRegionServers(function () {
        if (firstUpdated) {
            firstUpdated = false;
            return;
        }
        fnCallBack();
    }, fnError, state);
}

//----------------------------------------------------------------------------
// ПРОЧИЕ ФУНКЦИИ

function regionCityValidate(sender, args) {
    args.IsValid = ($("#region_city option:selected").val() != undefined);
}

function regionServerValidate(sender, args) {
    args.IsValid = ($("#region_server option:selected").val() != undefined);
}

function regionRegionValidate(sender, args) {
    args.IsValid = ($("#region_local option:selected").val() != undefined);
}

function updateRegionCities(fnCallBack, fnError, state) {
    $("#region_city").empty();
    $("#region_city").multiselect("refresh");

    var service = new Horizont.Web.RegionsWebService();
    service.GetCities(function (items) {
        $("#region_city").empty();

        if (items == null) {
            $("#region_city").multiselect("refresh");
            $("#region_city").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#region_city").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#region_city option[value='" + item.Id + "']").data("object", item);
        })

        if (state)
            $("#region_city option[Value='" + state.CityId.toString() + "']").attr("selected", "selected");
        else
            $("#region_city option[Value='0']").attr("selected", "selected");
        $("#region_city").multiselect("refresh");

        fnCallBack();
    },
    function () {
        $("#region_city").empty();
        $("#region_city").multiselect("refresh");
        $("#region_city").change();

        fnError();
    });
}

function updateRegionServers(fnCallBack, fnError, state) {
    $("#region_server").empty();
    $("#region_server").multiselect("refresh");

    var service = new Horizont.Web.RegionsWebService();
    service.GetServers(function (items) {
        $("#region_server").empty();

        if (items == null) {
            $("#region_server").multiselect("refresh");
            $("#region_server").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#region_server").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#region_server option[value='" + item.Id + "']").data("object", item);
        })

        if (state)
            $("#region_server option[Value='" + state.ServerId.toString() + "']").attr("selected", "selected");
        else
            $("#region_server option[Value='0']").attr("selected", "selected");
        $("#region_server").multiselect("refresh");

        updateLocalRegions(fnCallBack, fnError, state);
    },
    function () {
        $("#region_server").empty();
        $("#region_server").multiselect("refresh");
        $("#region_server").change();

        fnError();
    });
}

function updateLocalRegions(fnCallBack, fnError, state) {
    $("#region_local").empty();
    $("#region_local").multiselect("refresh");

    if ($("#region_server option:selected").val() == undefined) {
        fnCallBack();
        return;
    }

    var server = $("#region_server option[value='" + $("#region_server option:selected").val().toString() + "']").data("object");
    var service = new Horizont.Web.ClaimsWebService();
    service.GetRegions(server.Id, function (items) {
        $("#region_local").empty();

        if (items == null) {
            $("#region_local").multiselect("refresh");
            $("#region_local").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#region_local").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#region_local option[value='" + item.Id + "']").data("object", item);
        })

        if (state)
            $("#region_local option[Value='" + state.LocalId.toString() + "']").attr("selected", "selected");
        else
            $("#region_local option[Value='0']").attr("selected", "selected");
        $("#region_local").multiselect("refresh");

        fnCallBack();
    },
    function () {
        $("#region_local").empty();
        $("#region_local").multiselect("refresh");
        $("#region_local").change();

        fnError();
    });
}
