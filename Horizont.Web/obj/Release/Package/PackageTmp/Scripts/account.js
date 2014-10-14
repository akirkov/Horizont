//----------------------------------------------------------------------------
// Register Page

function initRegisterControls(fnCallBack, fnError) {
    $("#UserName").bind("textchange", function () {
        onChangeRegisterUsername();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeRegisterUsername();
    });

    $("#register_city, #register_region").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select page-row-field",
        noneSelectedText: "Не задан",
        selectedList: 1
    });

    $("#register_city").multiselect("getButton").addClass("ui-combobox-nonselected");
    $("#register_region").multiselect("getButton").addClass("ui-combobox-nonselected");

    $("#register_city").change(function () {
        $("#register_city_id").val($("#register_city option:selected").val());

        var city = $("#register_city option[value='" + $("#register_city option:selected").val().toString() + "']").data("object");
        if (city == null)
            $("#register_city").multiselect("getButton").addClass("ui-combobox-nonselected");
        else
            $("#register_city").multiselect("getButton").removeClass("ui-combobox-nonselected");

        loading(true, 500);
        updateRegisterRegions(function () {
            loading(false);
        }, serviceError);
    });

    $("#register_region").change(function () {
        $("#register_region_id").val($("#register_region option:selected").val());

        var region = $("#register_region option[value='" + $("#register_region option:selected").val().toString() + "']").data("object");
        if (region == null)
            $("#register_region").multiselect("getButton").addClass("ui-combobox-nonselected");
        else
            $("#register_region").multiselect("getButton").removeClass("ui-combobox-nonselected");

        if (window.isInitialization)
            return;

        $("#register_address").val("");
        $("#register_address").data("autocomplete").term = "";
        $("#register_address").data("object", null);
        $("#register_address_id").val(0);
    });

    $("#register_address").combobox({
        source: function (request, response) {
            var region = $("#register_region option[value='" + $("#register_region option:selected").val().toString() + "']").data("object");
            if (region == null) {
                response();
                return;
            }

            var service = new Horizont.Web.RegionsWebService();
            service.GetAddresses(region, request.term, function (addresses) {
                response($.map(addresses, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            $("#register_address").data("object", ui.item.object);
            $("#register_address_id").val(ui.item.object.Id);
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            return false;
        }
    });


    $("#CreateUserButton").click(function () {
        if (!Page_ClientValidate("register_user_validators")) {
            Recaptcha.reload();
            return false;
        }
    });

    updateRegisterCities(function () {
        $("#RegionValildator").css("visibility", "hidden");

        fnCallBack();
    }, fnError);
}

//----------------------------------------------------------------------------

function updateRegisterCities(fnCallBack, fnError) {
    $("#register_city").empty();
    $("#register_city").append($('<option value="0">Не задан</option>'));
    $("#register_city option[value='0']").data("object", null);
    $("#register_city").multiselect("refresh");

    var service = new Horizont.Web.RegionsWebService();
    service.GetCities(function (items) {
        $("#register_city").empty();
        $("#register_city").append($('<option value="0">Не задан</option>'));
        $("#register_city option[value='0']").data("object", null);

        if (items == null) {
            $("#register_city").multiselect("refresh");
            $("#register_city").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#register_city").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#register_city option[value='" + item.Id + "']").data("object", item);
        })

        if (window.isInitialization) {
            var city_id = Number($("#register_city_id").val());
            if (city_id > 0)
                $("#register_city option[Value='" + city_id.toString() + "']").attr("selected", "selected");
        }

        $("#register_city").multiselect("refresh");

        updateRegisterRegions(fnCallBack, fnError);
    },
    function () {
        $("#register_city").empty();
        $("#register_city").append($('<option value="0">Не задан</option>'));
        $("#register_city option[value='0']").data("object", null);

        $("#register_city").multiselect("refresh");
        $("#register_city").change();

        fnError();
    });
}

function updateRegisterRegions(fnCallBack, fnError) {
    $("#register_region").empty();
    $("#register_region").append($('<option value="0">Не задан</option>'));
    $("#register_region option[value='0']").data("object", null);
    $("#register_region").multiselect("refresh");

    var city = $("#register_city option[value='" + $("#register_city option:selected").val().toString() + "']").data("object");
    if (city == null) {
        $("#register_region").change();
        fnCallBack();
        return;
    }

    var service = new Horizont.Web.RegionsWebService();
    service.GetRegions(city, function (items) {
        $("#register_region").empty();
        $("#register_region").append($('<option value="0">Не задан</option>'));
        $("#register_region option[value='0']").data("object", null);

        if (items == null) {
            $("#register_region").multiselect("refresh");
            $("#register_region").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#register_region").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#register_region option[value='" + item.Id + "']").data("object", item);
        })

        if (window.isInitialization) {
            var region_id = Number($("#register_region_id").val());
            if (region_id > 0)
                $("#register_region option[Value='" + region_id.toString() + "']").attr("selected", "selected");
        }

        $("#register_region").multiselect("refresh");
        $("#register_region").change();

        fnCallBack();
    },
    function () {
        $("#register_region").empty();
        $("#register_region").append($('<option value="0">Не задан</option>'));
        $("#register_region option[value='0']").data("object", null);

        $("#register_region").multiselect("refresh");
        $("#register_region").change();

        fnError();
    });
}

function onChangeRegisterUsername() {
    var username = $("#UserName").val().trim();
    if (username == "") {
        $("#register_username_success").css("display", "none");
        $("#register_username_error").css("display", "none");

        return;
    }

    var service = new Horizont.Web.UsersWebService ();
    service.IsUserExist (username, function (result) {
        $("#register_username_success").css("display", result ? "none" : "inline-block");
        $("#register_username_error").css("display", !result ? "none" : "inline-block");
    });
}