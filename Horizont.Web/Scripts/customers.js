//----------------------------------------------------------------------------
// CustomersMain Page

function initCustomersMainControls() {
    $("#cities_list, #regions_list, #disps_list").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        noneSelectedText: "Не задан",
        selectedList: 1
    });

    $("#cities_list").change(function () {
        loading(true, 1000);
        updateRegionsList(function () {
            loading(false);
        },
        function () {
            setClaimsCountObject(null);
            setElvCountObject(null);
            serviceError();
        });

        pushHistoryState();
    });
    $("#regions_list").change(function () {
        loading(true, 1000);
        updateDispsList(function () {
            loading(false);
        },
        function () {
            setClaimsCountObject(null);
            setElvCountObject(null);
            serviceError();
        });

        pushHistoryState();
    });
    $("#disps_list").change(function () {
        document.title = getCustomersMainPageTitle();

        setClaimsCountObject(null);
        setElvCountObject(null);

        loading(true, 1000);
        updateObjectsCount(function () {
            loading(false);
        }, serviceError);

        pushHistoryState();
    });

    $("#unexecuted_claims_button").click(function () {
        document.location.href = "/Customers/UnexecutedClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#overdue_claims_button").click(function () {
        document.location.href = "/Customers/OverdueClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#legate_unexecuted_claim_button").click(function () {
        document.location.href = "/Customers/LegateUnexecutedClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#common_claims_button").click(function () {
        document.location.href = "/Customers/CommonClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#repeat_flats_button").click(function () {
        document.location.href = "/Customers/RepeatFlats.aspx?" + getCustomersSearch();
        return false;
    });
    $("#brigade_claims_button").click(function () {
        document.location.href = "/Customers/BrigadeClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#damage_claims_button").click(function () {
        document.location.href = "/Customers/DamageClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#lift_claims_button").click(function () {
        document.location.href = "/Customers/LiftClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#break_lift_claims_button").click(function () {
        document.location.href = "/Customers/BreakLiftClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#jam_lift_claims_button").click(function () {
        document.location.href = "/Customers/JamLiftClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#current_jam_lift_claims_button").click(function () {
        document.location.href = "/Customers/CurrentJamLiftClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#unlegate_executed_lift_claims_button").click(function () {
        document.location.href = "/Customers/UnlegateExecutedLiftClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#cessation_claims_button").click(function () {
        document.location.href = "/Customers/CessationClaims.aspx?" + getCustomersSearch();
        return false;
    });
    $("#current_cessation_claim_button").click(function () {
        document.location.href = "/Customers/CurrentCessationClaims.aspx?" + getCustomersSearch();
        return false;
    });


    $("#terms_border").click(function () {
        document.location.href = "/Customers/Terms.aspx?" + getCustomersSearch();
        return false;
    });
    $("#lifts_border").click(function () {
        document.location.href = "/Customers/Lifts.aspx?" + getCustomersSearch();
        return false;
    });
    $("#hoists_border").click(function () {
        document.location.href = "/Customers/Hoists.aspx?" + getCustomersSearch();
        return false;
    });
    $("#doors_border").click(function () {
        document.location.href = "/Customers/Doors.aspx?" + getCustomersSearch();
        return false;
    });
    $("#firesensors_border").click(function () {
        document.location.href = "/Customers/FireSensors.aspx?" + getCustomersSearch();
        return false;
    });
    $("#watersensors_border").click(function () {
        document.location.href = "/Customers/WaterSensors.aspx?" + getCustomersSearch();
        return false;
    });
    $("#gassensors_border").click(function () {
        document.location.href = "/Customers/GasSensors.aspx?" + getCustomersSearch();
        return false;
    });
    $("#telecontrols_border").click(function () {
        document.location.href = "/Customers/TeleControls.aspx?" + getCustomersSearch();
        return false;
    });
    $("#channels_border").click(function () {
        document.location.href = "/Customers/Channels.aspx?" + getCustomersSearch();
        return false;
    });

    setInterval(updateObjectsCount, 10000);
}

//----------------------------------------------------------------------------

function updateCitiesList(fnCallBack, fnError, state) {
    $("#cities_list").empty();

    var service = new Horizont.Web.RegionsWebService();
    service.GetCities(function (items) {
        $("#cities_list").empty();

        if (items == null) {
            fnError();
            $("#cities_list").multiselect("refresh");
            $("#cities_list").change();
            return;
        }

        $.map(items, function (item) {
            if (canCityRead(item)) {
                $("#cities_list").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
                $("#cities_list option[value='" + item.Id + "']").data("object", item);
            }
        })

        if (state)
            $("#cities_list option[Value='" + state.CityId.toString() + "']").attr("selected", "selected");
        else
            $("#cities_list option[Value='0']").attr("selected", "selected");
        $("#cities_list").multiselect("refresh");

        updateRegionsList(fnCallBack, fnError, state);
    }, fnError);
}

function updateRegionsList(fnCallBack, fnError, state) {
    $("#regions_list").empty();

    if ($("#cities_list option:selected").val() == undefined) {
        $("#regions_list").multiselect("refresh");
        updateDispsList(fnCallBack);
        return;
    }

    var city = $("#cities_list option[value='" + $("#cities_list option:selected").val().toString() + "']").data("object");
    var service = new Horizont.Web.RegionsWebService();
    service.GetRegions(city, function (items) {
        $("#regions_list").empty();

        if (items == null) {
            fnError();
            $("#regions_list").multiselect("refresh");
            $("#regions_list").change();
            return;
        }

        $.map(items, function (item) {
            if (canRegionRead(item)) {
                $("#regions_list").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
                $("#regions_list option[value='" + item.Id + "']").data("object", item);
            }
        })

        if (state)
            $("#regions_list option[Value='" + state.RegionId.toString() + "']").attr("selected", "selected");
        else
            $("#regions_list option[Value='0']").attr("selected", "selected");
        $("#regions_list").multiselect("refresh");

        updateDispsList(fnCallBack, fnError, state);

    }, function () {
        fnError();
        $("#regions_list").multiselect("refresh");
        $("#regions_list").change();
    });
}

function updateDispsList(fnCallBack, fnError, state) {
    $("#disps_list").empty();
    if ($("#regions_list option:selected").val() == undefined) {
        $("#disps_list").multiselect("refresh");
        fnCallBack();
        return;
    }

    var region = $("#regions_list option[value='" + $("#regions_list option:selected").val().toString() + "']").data("object");
    var service = new Horizont.Web.RegionsWebService();
    service.GetDisps(region, function (items) {
        $("#disps_list").empty();

        if (items == null) {
            fnError();
            $("#disps_list").multiselect("refresh");
            $("#disps_list").change();
            return;
        }

        if (canAllDispsRead(region)) {
            $("#disps_list").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
            $("#disps_list option[value='" + 0 + "']").data("object", null);
        }
        $.map(items, function (item) {
            if (canDispRead(item)) {
                $("#disps_list").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
                $("#disps_list option[value='" + item.Id + "']").data("object", item);
            }
        })

        if (state)
            $("#disps_list option[Value='" + state.DispId.toString() + "']").attr("selected", "selected");
        else
            $("#disps_list option[Value='0']").attr("selected", "selected");
        $("#disps_list").multiselect("refresh");

        updateObjectsCount(fnCallBack, fnError);
    },
    function () {
        $("#disps_list").multiselect("refresh");
        $("#disps_list").change();
        fnError();
    });
}

//----------------------------------------------------------------------------

function updateObjectsCount(fnCallBack, fnError) {
    var firstUpdated = true;
    updateClaimsCount(function () {
        if (firstUpdated) {
            firstUpdated = false;
            return;
        }
        fnCallBack();
    }, fnError);

    updateElvCount(function () {
        if (firstUpdated) {
            firstUpdated = false;
            return;
        }
        fnCallBack();
    }, fnError);
}

function updateClaimsCount(fnCallBack, fnError) {
    var service = new Horizont.Web.ClaimsWebService();

    var region = $("#regions_list option[value='" + $("#regions_list option:selected").val().toString() + "']").data("object");
    var disp = $("#disps_list option[value='" + $("#disps_list option:selected").val().toString() + "']").data("object");

    var region_id = (region != null) ? region.Id : 0;
    var disp_id = (disp != null) ? disp.Id : 0;

    service.GetClaimsCountObject(region_id, disp_id, function (obj) {
        if (obj == null) {
            fnError();
            return;
        }

        setClaimsCountObject(obj);
        fnCallBack();
    }, fnError);
}

function updateElvCount(fnCallBack, fnError) {
    var service = new Horizont.Web.ElvWebService();

    var region = $("#regions_list option[value='" + $("#regions_list option:selected").val().toString() + "']").data("object");
    var disp = $("#disps_list option[value='" + $("#disps_list option:selected").val().toString() + "']").data("object");

    var region_id = (region != null) ? region.Id : 0;
    var disp_id = (disp != null) ? disp.Id : 0;

    service.GetElvCountObject(region_id, disp_id, function (obj) {
        if (obj == null) {
            fnError();
            return;
        }
        setElvCountObject (obj);
        fnCallBack();
    }, fnError);
}

function setClaimsCountObject(obj) {
    $("#unexecuted_claims_count").val((obj != null) ? obj.UnexecutedClaimsCount : 0);
    $("#overdue_claims_count").val((obj != null) ? obj.OverdueClaimsCount : 0);
    $("#legate_unexecuted_claims_count").val((obj != null) ? obj.LegateUnexecutedClaimsCount : 0);
    $("#break_lift_claims_count").val((obj != null) ? obj.BreakLiftClaimsCount : 0);
    $("#current_jam_lift_claims_count").val((obj != null) ? obj.CurrentJamLiftClaimsCount : 0);
    $("#unlegate_executed_lift_claims_count").val((obj != null) ? obj.UnlegateExecutedLiftClaimsCount : 0);
    $("#current_cessation_claims_count").val((obj != null) ? obj.CurrentCessationClaimsCount : 0);

    $("#unexecuted_claims_count").css("color", ((obj != null) && (obj.UnexecutedClaimsCount > 0)) ? "Red" : "Black");
    $("#overdue_claims_count").css("color", ((obj != null) && (obj.OverdueClaimsCount > 0)) ? "Red" : "Black");
    $("#legate_unexecuted_claims_count").css("color", ((obj != null) && (obj.LegateUnexecutedClaimsCount > 0)) ? "Red" : "Black");
    $("#break_lift_claims_count").css("color", ((obj != null) && (obj.BreakLiftClaimsCount > 0)) ? "Red" : "Black");
    $("#current_jam_lift_claims_count").css("color", ((obj != null) && (obj.CurrentJamLiftClaimsCount > 0)) ? "Red" : "Black");
    $("#unlegate_executed_lift_claims_count").css("color", ((obj != null) && (obj.UnlegateExecutedLiftClaimsCount > 0)) ? "Red" : "Black");
    $("#current_cessation_claims_count").css("color", ((obj != null) && (obj.CurrentCessationClaimsCount > 0)) ? "Red" : "Black");

}

function setElvCountObject(obj) {
    $("#terms_count").val((obj != null) ? obj.TermsCount : 0);
    $("#lifts_count").val((obj != null) ? obj.LiftsCount : 0);
    $("#hoists_count").val((obj != null) ? obj.HoistsCount : 0);
    $("#doors_count").val((obj != null) ? obj.DoorsCount : 0);
    $("#firesensors_count").val((obj != null) ? obj.FireSensorsCount : 0);
    $("#watersensors_count").val((obj != null) ? obj.WaterSensorsCount : 0);
    $("#gassensors_count").val((obj != null) ? obj.GasSensorsCount : 0);
    $("#telecontrols_count").val((obj != null) ? obj.TeleControlsCount : 0);
    $("#channels_count").val((obj != null) ? obj.ChannelsCount : 0);

    $("#break_terms_count").val((obj != null) ? obj.BreakTermsCount : 0);
    $("#break_lifts_count").val((obj != null) ? obj.BreakLiftsCount : 0);
    $("#break_hoists_count").val((obj != null) ? obj.BreakHoistsCount : 0);
    $("#open_doors_count").val((obj != null) ? obj.OpenDoorsCount : 0);
    $("#alarm_firesensors_count").val((obj != null) ? obj.AlarmFireSensorsCount : 0);
    $("#alarm_watersensors_count").val((obj != null) ? obj.AlarmWaterSensorsCount : 0);
    $("#alarm_gassensors_count").val((obj != null) ? obj.AlarmGasSensorsCount : 0);
    $("#enabled_telecontrols_count").val((obj != null) ? obj.EnabledTeleControlsCount : 0);
    $("#break_channels_count").val((obj != null) ? obj.BreakChannelsCount : 0);

    $("#break_terms_count").css("color", ((obj != null) && (obj.BreakTermsCount > 0)) ? "Red" : "Black");
    $("#break_lifts_count").css("color", ((obj != null) && (obj.BreakLiftsCount > 0)) ? "Red" : "Black");
    $("#break_hoists_count").css("color", ((obj != null) && (obj.BreakHoistsCount > 0)) ? "Red" : "Black");
    $("#open_doors_count").css("color", ((obj != null) && (obj.OpenDoorsCount > 0)) ? "Red" : "Black");
    $("#alarm_firesensors_count").css("color", ((obj != null) && (obj.AlarmFireSensorsCount > 0)) ? "Red" : "Black");
    $("#alarm_watersensors_count").css("color", ((obj != null) && (obj.AlarmWaterSensorsCount > 0)) ? "Red" : "Black");
    $("#alarm_gassensors_count").css("color", ((obj != null) && (obj.AlarmGasSensorsCount > 0)) ? "Red" : "Black");
    $("#enabled_telecontrols_count").css("color", ((obj != null) && (obj.EnabledTeleControlsCount > 0)) ? "Red" : "Black");
    $("#break_channels_count").css("color", ((obj != null) && (obj.BreakChannelsCount > 0)) ? "Red" : "Black");
}

//----------------------------------------------------------------------------

function getCustomersMainPageTitle() {
    var city = $("#cities_list option[value='" + $("#cities_list option:selected").val().toString() + "']").data("object");
    var region = $("#regions_list option[value='" + $("#regions_list option:selected").val().toString() + "']").data("object");
    var disp = $("#disps_list option[value='" + $("#disps_list option:selected").val().toString() + "']").data("object");

    var title = $("body").data("title");

    if (city == null)
        return title;
    title += " - " + city.Name;

    if (region == null)
        return title;
    title += "/Район " + region.Name;

    if (disp == null)
        return title;
    title += "/ОДС " + disp.Name;

    return title;
}

function getCustomersSearch() {
    var search = new Object();
    search.CityId = getCityId();
    search.RegionId = getRegionId();
    search.DispId = getDispId ();
    search.RegionName = getRegionName ();
    search.DispName = getDispName ();

    return $.param(search);
}

