//----------------------------------------------------------------------------
// ИНИЦИАЛИЗАЦИЯ ДИАЛОГОВ

function initCommonClaimsFilterDlg() {
    $("#common_claims_filter_ok_button").data("initstate", true);

    $("#common_claims_filter_address").clearableTextField(function () {
        $("#common_claims_filter_address").data("object", null);
        onChangeCommonClaimsFilter();
    });
    $("#common_claims_filter_journal").clearableTextField(function () {
        $("#common_claims_filter_journal").data("object", null);
        onChangeCommonClaimsFilter();
    });

    $("#common_claims_filter_address").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetAddresses(request.term, getRegionId (), getDispId(), function (addresses) {
                response($.map(addresses, function (item) {
                    return {
                        label: item.AddressStr,
                        value: item.AddressStr,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            $("#common_claims_filter_address").data("object", ui.item.object);
            onChangeCommonClaimsFilter();
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            $("#common_claims_filter_address").data("object", null);

            onChangeCommonClaimsFilter();

            return false;
        }
    });

    $("#common_claims_filter_journal").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetJournals(request.term, getRegionId (), function (journals) {
                response($.map(journals, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            $("#common_claims_filter_journal").data("object", ui.item.object);

            onChangeCommonClaimsFilter();
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            $("#common_claims_filter_journal").data("object", null);

            onChangeCommonClaimsFilter();

            return false;
        }
    });

    $("#common_claims_filter_regnumber").bind("textchange", onChangeCommonClaimsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimsFilter();
    });

    $("#common_claims_filter_date_from_checkbox").change(function () {
        $("#common_claims_filter_date_from").attr('disabled', !this.checked);

        if (this.checked && !$("#common_claims_filter_control").data("object").DateFromEn) {
            var dt = new Date();
            $("#common_claims_filter_date_from").val(dt.format('dd.MM.yyyy'));
        }

        onChangeCommonClaimsFilter();
    });

    $("#common_claims_filter_date_to_checkbox").change(function () {
        $("#common_claims_filter_date_to").attr('disabled', !this.checked);

        if (this.checked && !$("#common_claims_filter_control").data("object").DateToEn) {
            var dt = new Date();
            $("#common_claims_filter_date_to").val(dt.format('dd.MM.yyyy'));
        }

        onChangeCommonClaimsFilter();
    });

    $("#common_claims_filter_doorway, #common_claims_filter_flat").bind("textchange", onChangeCommonClaimsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimsFilter();
    });

    $("#common_claims_filter_reset").click(function () {
        $("#common_claims_filter_regnumber").val("");
        $("#common_claims_filter_date_from_checkbox").attr('checked', false);
        $("#common_claims_filter_date_to_checkbox").attr('checked', false);
        $("#common_claims_filter_journal").val("");
        $("#common_claims_filter_address").val("");
        $("#common_claims_filter_doorway").val("");
        $("#common_claims_filter_flat").val("");

        $("#common_claims_filter_journal").data("object", null);
        $("#common_claims_filter_address").data("object", null);

        $("#common_claims_filter_date_from_checkbox").change();
        $("#common_claims_filter_date_to_checkbox").change();
    });

    $("#common_claims_filter_ok_button").click(function () {
        if (!Page_ClientValidate("common_claims_filter_validators"))
            return false;

        $("#common_claims_filter_ok_button").data("initstate", false);

        replaceHistoryState();
        updateDataTable();

        $("#common_claims_filter_ok_button").data("save", true);
        $("#common_claims_filter_dialog").dialog("close");
    });

    $("#common_claims_filter_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Фильтр";
            pushHistoryState();
        },
        close: function (event, ui) {
            var ret = $("#common_claims_filter_ok_button").data("save");
            if (!ret)
                restoreCommonClaimsFilter();

            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initLiftClaimsFilterDlg() {
    $("#lift_claims_filter_ok_button").data("initstate", true);

    $("#lift_claims_filter_address").clearableTextField(function () {
        $("#lift_claims_filter_address").data("object", null);
        onChangeLiftClaimsFilter();
    });

    $("#lift_claims_filter_address").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetAddresses(request.term, getRegionId (), getDispId(), function (addresses) {
                response($.map(addresses, function (item) {
                    return {
                        label: item.AddressStr,
                        value: item.AddressStr,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            $("#lift_claims_filter_address").data("object", ui.item.object);
            onChangeLiftClaimsFilter();
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            $("#lift_claims_filter_address").data("object", null);

            onChangeLiftClaimsFilter();

            return false;
        }
    });

    $("#lift_claims_filter_regnumber").bind("textchange", onChangeLiftClaimsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimsFilter();
    });

    $("#lift_claims_filter_date_from_checkbox").change(function () {
        $("#lift_claims_filter_date_from").attr('disabled', !this.checked);

        if (this.checked && !$("#lift_claims_filter_control").data("object").DateFromEn) {
            var dt = new Date();
            $("#lift_claims_filter_date_from").val(dt.format('dd.MM.yyyy'));
        }

        onChangeLiftClaimsFilter();
    });

    $("#lift_claims_filter_date_to_checkbox").change(function () {
        $("#lift_claims_filter_date_to").attr('disabled', !this.checked);

        if (this.checked && !$("#lift_claims_filter_control").data("object").DateToEn) {
            var dt = new Date();
            $("#lift_claims_filter_date_to").val(dt.format('dd.MM.yyyy'));
        }

        onChangeLiftClaimsFilter();
    });

    $("#lift_claims_filter_doorway").bind("textchange", onChangeLiftClaimsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimsFilter();
    });

    $("#lift_claims_filter_minstaytime").bind("textchange", onChangeLiftClaimsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimsFilter();
    });

    $("#lift_claims_filter_reset").click(function () {
        $("#lift_claims_filter_regnumber").val("");
        $("#lift_claims_filter_date_from_checkbox").attr('checked', false);
        $("#lift_claims_filter_date_to_checkbox").attr('checked', false);
        $("#lift_claims_filter_address").val("");
        $("#lift_claims_filter_doorway").val("");
        $("#lift_claims_filter_minstaytime").val(isJamLiftClaimsPage () ? "30" : "180");

        $("#lift_claims_filter_address").data("object", null);

        $("#lift_claims_filter_date_from_checkbox").change();
        $("#lift_claims_filter_date_to_checkbox").change();
    });

    $("#lift_claims_filter_ok_button").click(function () {
        if (!Page_ClientValidate("lift_claims_filter_validators"))
            return false;

        $("#lift_claims_filter_ok_button").data("initstate", false);

        replaceHistoryState();
        updateDataTable();

        $("#lift_claims_filter_ok_button").data("save", true);
        $("#lift_claims_filter_dialog").dialog("close");
    });

    $("#lift_claims_filter_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Фильтр";
            pushHistoryState();
        },
        close: function (event, ui) {
            var ret = $("#lift_claims_filter_ok_button").data("save");
            if (!ret)
                restoreLiftClaimsFilter();

            document.title = $("body").data("title");
            pushHistoryState();
        }
    });

    $("#lift_claims_filter_reset").trigger("click");
}

function initCessationClaimsFilterDlg(fnCallBack, fnError) {
    $("#cessation_claims_filter_ok_button").data("initstate", true);

    $("#cessation_claims_filter_regnumber").bind("textchange", onChangeCessationClaimsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessationClaimsFilter();
    });

    $("#cessation_claims_filter_date_from_checkbox").change(function () {
        $("#cessation_claims_filter_date_from").attr('disabled', !this.checked);

        if (this.checked && !$("#cessation_claims_filter_control").data("object").DateFromEn) {
            var dt = new Date();
            $("#cessation_claims_filter_date_from").val(dt.format('dd.MM.yyyy'));
        }

        onChangeCessationClaimsFilter();
    });

    $("#cessation_claims_filter_date_to_checkbox").change(function () {
        $("#cessation_claims_filter_date_to").attr('disabled', !this.checked);

        if (this.checked && !$("#cessation_claims_filter_control").data("object").DateToEn) {
            var dt = new Date();
            $("#cessation_claims_filter_date_to").val(dt.format('dd.MM.yyyy'));
        }

        onChangeCessationClaimsFilter();
    });

    $("#cessation_claims_filter_addresses").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: true,
        height: 300,
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        header: false,
        noneSelectedText: "Все адреса",
        selectedList: 15
    }).multiselectfilter({
        label: "Фильтр",
        placeholder: "Ключевые слова"
    }).bind("multiselectclick", function (event, ui) {
        onChangeCessationClaimsFilter();
    });

    $("#cessation_claims_filter_cessation_object").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    }).bind("change", function () {
        onChangeCessationClaimsFilter();
    });

    var service = new Horizont.Web.ClaimsWebService();
    service.GetAddresses("", getRegionId (), getDispId(), function (addresses) {
        $("#cessation_claims_filter_addresses").empty();
        if (addresses == null) {
            $("#cessation_claims_filter_addresses").multiselect("refresh");
            fnError();
            return;
        }

        $.map(addresses, function (item) {
            $("#cessation_claims_filter_addresses").append($('<option value="' + item.Id + '">' + item.AddressStr + '</option>'));
            $("#cessation_claims_filter_addresses option[value='" + item.Id + "']").data("object", item);
        })
        $("#cessation_claims_filter_addresses").multiselect("refresh");
        fnCallBack();
    }, fnError);

    $("#cessation_claims_filter_reset").click(function () {
        $("#cessation_claims_filter_regnumber").val("");
        $("#cessation_claims_filter_date_from_checkbox").attr('checked', false);
        $("#cessation_claims_filter_date_to_checkbox").attr('checked', false);
        $("#cessation_claims_filter_cessation_object option[Value='0']").attr("selected", "selected");
        $("#cessation_claims_filter_cessation_object").multiselect("refresh");
        $("#cessation_claims_filter_addresses option").removeAttr("selected");
        $("#cessation_claims_filter_addresses").multiselect("refresh");

        $("#cessation_claims_filter_date_from_checkbox").change();
        $("#cessation_claims_filter_date_to_checkbox").change();
    });

    $("#cessation_claims_filter_ok_button").click(function () {
        if (!Page_ClientValidate("cessation_claims_filter_validators"))
            return false;

        $("#cessation_claims_filter_ok_button").data("initstate", false);

        replaceHistoryState();
        updateDataTable();

        $("#cessation_claims_filter_ok_button").data("save", true);
        $("#cessation_claims_filter_dialog").dialog("close");
    });

    $("#cessation_claims_filter_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Фильтр";
            pushHistoryState();
        },
        close: function (event, ui) {
            var ret = $("#cessation_claims_filter_ok_button").data("save");
            if (!ret)
                restoreCessationClaimsFilter();

            document.title = $("body").data("title");
            pushHistoryState();
        }
    });

    $("#cessation_claims_filter_reset").trigger("click");
}

function initRepeatFlatsFilterDlg() {
    $("#repeat_flats_filter_ok_button").data("initstate", true);

    $("#repeat_flats_filter_journal").clearableTextField(function () {
        $("#repeat_flats_filter_journal").data("object", null);
        onChangeRepeatFlatsFilter();
    });

    $("#repeat_flats_filter_journal").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetJournals(request.term, getRegionId (), function (journals) {
                response($.map(journals, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            $("#repeat_flats_filter_journal").data("object", ui.item.object);

            onChangeRepeatFlatsFilter();
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            $("#repeat_flats_filter_journal").data("object", null);

            onChangeRepeatFlatsFilter();

            return false;
        }
    });

    $("#repeat_flats_filter_date_from_checkbox").change(function () {
        $("#repeat_flats_filter_date_from").attr('disabled', !this.checked);

        if (this.checked && !$("#repeat_flats_filter_control").data("object").DateFromEn) {
            var dt = new Date();
            $("#repeat_flats_filter_date_from").val(dt.format('dd.MM.yyyy'));
        }

        onChangeRepeatFlatsFilter();
    });

    $("#repeat_flats_filter_date_to_checkbox").change(function () {
        $("#repeat_flats_filter_date_to").attr('disabled', !this.checked);

        if (this.checked && !$("#repeat_flats_filter_control").data("object").DateToEn) {
            var dt = new Date();
            $("#repeat_flats_filter_date_to").val(dt.format('dd.MM.yyyy'));
        }

        onChangeRepeatFlatsFilter();
    });

    $("#repeat_flats_filter_minrepeatscount").bind("textchange", onChangeRepeatFlatsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeRepeatFlatsFilter();
    });

    $("#repeat_flats_filter_reset").click(function () {
        $("#repeat_flats_filter_journal").val("");
        $("#repeat_flats_filter_date_from_checkbox").attr('checked', false);
        $("#repeat_flats_filter_date_to_checkbox").attr('checked', false);
        $("#repeat_flats_filter_minrepeatscount").val("2");

        $("#repeat_flats_filter_journal").data("object", null);

        $("#repeat_flats_filter_date_from_checkbox").change();
        $("#repeat_flats_filter_date_to_checkbox").change();
    });

    $("#repeat_flats_filter_ok_button").click(function () {
        if (!Page_ClientValidate("repeat_flats_filter_validators"))
            return false;

        $("#repeat_flats_filter_ok_button").data("initstate", false);

        replaceHistoryState();
        updateDataTable();

        $("#repeat_flats_filter_ok_button").data("save", true);
        $("#repeat_flats_filter_dialog").dialog("close");
    });

    $("#repeat_flats_filter_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Фильтр";
            pushHistoryState();
        },
        close: function (event, ui) {
            var ret = $("#repeat_flats_filter_ok_button").data("save");
            if (!ret)
                restoreRepeatFlatsFilter();

            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initDateSpanFilterDlg() {
    $("#date_span_filter_ok_button").data("initstate", true);

    $("#date_span_filter_date_from_checkbox").change(function () {
        $("#date_span_filter_date_from").attr('disabled', !this.checked);

        if (this.checked && !$("#date_span_filter_control").data("object").DateFromEn) {
            var dt = new Date();
            $("#date_span_filter_date_from").val(dt.format('dd.MM.yyyy'));
        }
    });

    $("#date_span_filter_date_to_checkbox").change(function () {
        $("#date_span_filter_date_to").attr('disabled', !this.checked);

        if (this.checked && !$("#date_span_filter_control").data("object").DateToEn) {
            var dt = new Date();
            $("#date_span_filter_date_to").val(dt.format('dd.MM.yyyy'));
        }
    });

    $("#date_span_filter_ok_button").click(function () {
        if (!Page_ClientValidate("date_span_filter_validators"))
            return false;

        $("#date_span_filter_ok_button").data("initstate", false);

        replaceHistoryState();
        updateDataTable();

        $("#date_span_filter_ok_button").data("save", true);
        $("#date_span_filter_dialog").dialog("close");
    });

    $("#date_span_filter_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Фильтр";
            pushHistoryState();
        },
        close: function (event, ui) {
            var ret = $("#date_span_filter_ok_button").data("save");
            if (!ret)
                restoreDateSpanFilter();

            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initElvObjectsFilter () {
    $("input[name=elv-objects-filter]").change(function () {
        pushHistoryState();
        updateDataTable();
    });
}

function initElvObjectEventsFilterDlg() {
    $("#elv_object_events_filter_ok_button").data("initstate", true);

    $("#elv_object_events_filter_date_from_checkbox").change(function () {
        $("#elv_object_events_filter_date_from").attr('disabled', !this.checked);

        if (this.checked && !$("#elv_object_events_filter_control").data("object").DateFromEn) {
            var dt = new Date();
            $("#elv_object_events_filter_date_from").val(dt.format('dd.MM.yyyy'));
        }

        onChangeElvObjectEventsFilter();
    });

    $("#elv_object_events_filter_date_to_checkbox").change(function () {
        $("#elv_object_events_filter_date_to").attr('disabled', !this.checked);

        if (this.checked && !$("#elv_object_events_filter_control").data("object").DateToEn) {
            var dt = new Date();
            $("#elv_object_events_filter_date_to").val(dt.format('dd.MM.yyyy'));
        }

        onChangeElvObjectEventsFilter();
    });

    $("#elv_object_events_filter_mineventtime").bind("textchange", onChangeElvObjectEventsFilter).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeElvObjectEventsFilter();
    });

    $("#elv_object_events_filter_objects").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: true,
        height: 300,
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        header: false,
        noneSelectedText: "Все объекты",
        selectedList: 15
    }).multiselectfilter({
        label: "Фильтр",
        placeholder: "Ключевые слова"
    }).bind("multiselectclick", function (event, ui) {
        onChangeElvObjectEventsFilter();
    });

    $("#elv_object_events_filter_reset").click(function () {
        $("#elv_object_events_filter_date_from_checkbox").attr('checked', false);
        $("#elv_object_events_filter_date_to_checkbox").attr('checked', false);
        $("#elv_object_events_filter_mineventtime").val((isLiftEventsPage() || isHoistEventsPage()) ? "180" : "0");
        $("#elv_object_events_filter_objects option").removeAttr("selected");
        $("#elv_object_events_filter_objects").multiselect("refresh");

        $("#elv_object_events_filter_date_from_checkbox").change();
        $("#elv_object_events_filter_date_to_checkbox").change();
    });

    $("#elv_object_events_filter_ok_button").click(function () {
        if (!Page_ClientValidate("elv_object_events_filter_validators"))
            return false;

        $("#elv_object_events_filter_ok_button").data("initstate", false);

        replaceHistoryState();
        updateDataTable();

        $("#elv_object_events_filter_ok_button").data("save", true);
        $("#elv_object_events_filter_dialog").dialog("close");
    });

    $("#elv_object_events_filter_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Фильтр";
            pushHistoryState();
        },
        close: function (event, ui) {
            var ret = $("#elv_object_events_filter_ok_button").data("save");
            if (!ret)
                restoreElvObjectEventsFilter();

            document.title = $("body").data("title");
            pushHistoryState();
        }
    });

    $("#elv_object_events_filter_reset").trigger("click");
}

function initTermEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetTerms(null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initLiftEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetLifts(null, null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initHoistEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetHoists(null, null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initDoorEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetDoors(null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initFireSensorEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetFireSensors(null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initWaterSensorEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetWaterSensors(null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initGasSensorEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetGasSensors(null, getRegionId(), getDispId(), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

function initChannelEventsFilterDlg(fnCallBack, fnError) {
    initElvObjectEventsFilterDlg();

    var service = new Horizont.Web.ElvWebService();
    service.GetChannels(null, getRegionId (), getDispId (), function (items) {
        $("#elv_object_events_filter_objects").empty();
        $.map(items, function (item) {
            $("#elv_object_events_filter_objects").append($('<option value="' + item.Id + '">' + item.Address + ' ' + item.Name + '</option>'));
            $("#elv_object_events_filter_objects option[value='" + item.Id + "']").data("object", item);
        })
        $("#elv_object_events_filter_objects").multiselect("refresh");
        fnCallBack();
    }, fnError);
}

//----------------------------------------------------------------------------
// ФУНКЦИИ ОТКРЫТИЯ ДИАЛОГОВ

function commonClaimsFilterDlg() {
    saveCommonClaimsFilter();

    $("#common_claims_filter_date_from_checkbox").change();
    $("#common_claims_filter_date_to_checkbox").change();

    $(".common-claims-filter-validator").empty();

    $("#common_claims_filter_ok_button").data("save", false);
    $("#common_claims_filter_dialog").dialog("open");

    onChangeCommonClaimsFilter();
}

function liftClaimsFilterDlg() {
    saveLiftClaimsFilter();

    $("#lift_claims_filter_date_from_checkbox").change();
    $("#lift_claims_filter_date_to_checkbox").change();

    $(".lift-claims-filter-validator").empty();

    $("#lift_claims_filter_ok_button").data("save", false);
    $("#lift_claims_filter_dialog").dialog("open");

    onChangeLiftClaimsFilter();
}

function cessationClaimsFilterDlg() {
    saveCessationClaimsFilter();

    $("#cessation_claims_filter_date_from_checkbox").change();
    $("#cessation_claims_filter_date_to_checkbox").change();

    $(".cessation-claims-filter-validator").empty();

    $("#cessation_claims_filter_ok_button").data("save", false);
    $("#cessation_claims_filter_dialog").dialog("open");

    onChangeCessationClaimsFilter();
}

function repeatFlatsFilterDlg() {
    saveRepeatFlatsFilter();

    $("#repeat_flats_filter_date_from_checkbox").change();
    $("#repeat_flats_filter_date_to_checkbox").change();

    $(".repeat-flats-filter-validator").empty();

    $("#repeat_flats_filter_ok_button").data("save", false);
    $("#repeat_flats_filter_dialog").dialog("open");

    onChangeRepeatFlatsFilter();
}

function dateSpanFilterDlg() {
    saveDateSpanFilter();

    $("#date_span_filter_date_from_checkbox").change();
    $("#date_span_filter_date_to_checkbox").change();

    $(".date-span-filter-validator").empty();

    $("#date_span_filter_ok_button").data("save", false);
    $("#date_span_filter_dialog").dialog("open");
}

function elvObjectEventsFilterDlg() {
    saveElvObjectEventsFilter();

    $("#elv_object_events_filter_date_from_checkbox").change();
    $("#elv_object_events_filter_date_to_checkbox").change();

    $(".elv-object-events-filter-validator").empty();

    $("#elv_object_events_filter_ok_button").data("save", false);
    $("#elv_object_events_filter_dialog").dialog("open");

    onChangeElvObjectEventsFilter();
}

//----------------------------------------------------------------------------
// ФУНКЦИИ ИЗМЕНЕНИЯ СОСТОЯНИЯ ДИАЛОГОВ

function onChangeCommonClaimsFilter() {
    if ($("#common_claims_filter_address").data("object") == null) {
        $("#common_claims_filter_doorway, #common_claims_filter_flat").val("");
        $("#common_claims_filter_doorway, #common_claims_filter_flat").attr("disabled", "disabled");
    }
    else {
        $("#common_claims_filter_doorway, #common_claims_filter_flat").removeAttr("disabled");
    }

    var en = ($("#common_claims_filter_regnumber").val().trim() != '');
    en = $("#common_claims_filter_date_from_checkbox").is(':checked') || en;
    en = $("#common_claims_filter_date_to_checkbox").is(':checked') || en;
    en = ($("#common_claims_filter_journal").data("object") != null) || en;
    en = ($("#common_claims_filter_address").data("object") != null) || en;

    if (!en)
        $("#common_claims_filter_reset").attr("disabled", "disabled");
    else
        $("#common_claims_filter_reset").removeAttr("disabled");

    if ($("#common_claims_filter_dialog").dialog("isOpen")) {
        if ($("#common_claims_filter_journal").data("object") == null) {
            $("#common_claims_filter_journal").fnTriggerClearButton();
        }
        else
            $("#common_claims_filter_journal").fnAddClearButton();

        if ($("#common_claims_filter_address").data("object") == null)
            $("#common_claims_filter_address").fnTriggerClearButton();
        else
            $("#common_claims_filter_address").fnAddClearButton();
    }

    $("#common_claims_filter_reset").removeClass("hz-button-state-hover");
    $("#common_claims_filter_reset").removeClass("hz-button-state-active");
}

function onChangeLiftClaimsFilter() {
    if ($("#lift_claims_filter_address").data("object") == null) {
        $("#lift_claims_filter_doorway").val("");
        $("#lift_claims_filter_doorway").attr("disabled", "disabled");
    }
    else {
        $("#lift_claims_filter_doorway").removeAttr("disabled");
    }

    var en = ($("#lift_claims_filter_regnumber").val().trim() != '');
    en = $("#lift_claims_filter_date_from_checkbox").is(':checked') || en;
    en = $("#lift_claims_filter_date_to_checkbox").is(':checked') || en;
    en = ($("#lift_claims_filter_address").data("object") != null) || en;
    en = ($("#lift_claims_filter_minstaytime").val().trim() != (isJamLiftClaimsPage() ? '30' : '180')) || en;

    if (!en)
        $("#lift_claims_filter_reset").attr("disabled", "disabled");
    else
        $("#lift_claims_filter_reset").removeAttr("disabled");

    if ($("#lift_claims_filter_dialog").dialog("isOpen")) {
        if ($("#lift_claims_filter_address").data("object") == null)
            $("#lift_claims_filter_address").fnTriggerClearButton();
        else
            $("#lift_claims_filter_address").fnAddClearButton();
    }

    $("#lift_claims_filter_reset").removeClass("hz-button-state-hover");
    $("#lift_claims_filter_reset").removeClass("hz-button-state-active");
}

function onChangeCessationClaimsFilter() {
    var en = ($("#cessation_claims_filter_regnumber").val().trim() != '');
    en = $("#cessation_claims_filter_date_from_checkbox").is(':checked') || en;
    en = $("#cessation_claims_filter_date_to_checkbox").is(':checked') || en;
    en = ($("#cessation_claims_filter_addresses").multiselect("getChecked").length != 0) || en;
    en = ($("#cessation_claims_filter_cessation_object option:selected").val().trim() != "0") || en;

    if (!en)
        $("#cessation_claims_filter_reset").attr("disabled", "disabled");
    else
        $("#cessation_claims_filter_reset").removeAttr("disabled");

    $("#cessation_claims_filter_reset").removeClass("hz-button-state-hover");
    $("#cessation_claims_filter_reset").removeClass("hz-button-state-active");
}

function onChangeRepeatFlatsFilter() {
    var en = ($("#repeat_flats_filter_journal").data("object") != null);
    en = $("#repeat_flats_filter_date_from_checkbox").is(':checked') || en;
    en = $("#repeat_flats_filter_date_to_checkbox").is(':checked') || en;
    en = ($("#repeat_flats_filter_minrepeatscount").val().trim() != '2') || en;

    if (!en)
        $("#repeat_flats_filter_reset").attr("disabled", "disabled");
    else
        $("#repeat_flats_filter_reset").removeAttr("disabled");

    if ($("#repeat_flats_filter_dialog").dialog("isOpen")) {
        if ($("#repeat_flats_filter_journal").data("object") == null) {
            $("#repeat_flats_filter_journal").fnTriggerClearButton();
        }
        else
            $("#repeat_flats_filter_journal").fnAddClearButton();
    }

    $("#repeat_flats_filter_reset").removeClass("hz-button-state-hover");
    $("#repeat_flats_filter_reset").removeClass("hz-button-state-active");
}

function onChangeElvObjectEventsFilter() {
    var en = $("#elv_object_events_filter_date_from_checkbox").is(':checked') || en;
    en = $("#elv_object_events_filter_date_to_checkbox").is(':checked') || en;
    en = ($("#elv_object_events_filter_mineventtime").val().trim() != ((isLiftEventsPage() || isHoistEventsPage()) ? '180' : '0')) || en;
    en = ($("#elv_object_events_filter_objects").multiselect("getChecked").length != 0) || en;

    if (!en)
        $("#elv_object_events_filter_reset").attr("disabled", "disabled");
    else
        $("#elv_object_events_filter_reset").removeAttr("disabled");

    $("#elv_object_events_filter_reset").removeClass("hz-button-state-hover");
    $("#elv_object_events_filter_reset").removeClass("hz-button-state-active");
}

//----------------------------------------------------------------------------
// ФУКНЦИИ ПРОВЕРКИ ИЗМЕНЕНИЯ ФИЛЬТРА

function isCommonClaimsFilterChanged(filter) {
    if (filter.IsInitState != $("#common_claims_filter_ok_button").data("initstate"))
        return true;
    if (filter.RegNumber != $("#common_claims_filter_regnumber").val())
        return true;
    if (filter.DateFromEn != $("#common_claims_filter_date_from_checkbox").is(':checked'))
        return true;
    if (filter.DateFrom != $("#common_claims_filter_date_from").val())
        return true;
    if (filter.DateToEn != $("#common_claims_filter_date_to_checkbox").is(':checked'))
        return true;
    if (filter.DateTo != $("#common_claims_filter_date_to").val())
        return true;
    if ((filter.JournalObject == null) && ($("#common_claims_filter_journal").data("object") != null))
        return true;
    if (($("#common_claims_filter_journal").data("object") == null) && (filter.JournalObject != null))
        return true;
    if (($("#common_claims_filter_journal").data("object") != null) && (filter.JournalObject != null) && ($("#common_claims_filter_journal").data("object").Id != filter.JournalObject.Id))
        return true;
    if ((filter.AddressObject == null) && ($("#common_claims_filter_address").data("object") != null))
        return true;
    if (($("#common_claims_filter_address").data("object") == null) && (filter.AddressObject != null))
        return true;
    if (($("#common_claims_filter_address").data("object") != null) && (filter.AddressObject != null) && ($("#common_claims_filter_address").data("object").Id != filter.AddressObject.Id))
        return true;
    if (((filter.Doorway != null) ? filter.Doorway.toString() : "") != $("#common_claims_filter_doorway").val().trim())
        return true;
    if (((filter.Flat != null) ? filter.Flat.toString() : "") != $("#common_claims_filter_flat").val().trim())
        return true;

    return false;
}

function isLiftClaimsFilterChanged(filter) {
    if (filter.IsInitState != $("#lift_claims_filter_ok_button").data("initstate"))
        return true;
    if (filter.RegNumber != $("#lift_claims_filter_regnumber").val())
        return true;
    if (filter.DateFromEn != $("#lift_claims_filter_date_from_checkbox").is(':checked'))
        return true;
    if (filter.DateFrom != $("#lift_claims_filter_date_from").val())
        return true;
    if (filter.DateToEn != $("#lift_claims_filter_date_to_checkbox").is(':checked'))
        return true;
    if (filter.DateTo != $("#lift_claims_filter_date_to").val())
        return true;
    if ((filter.AddressObject == null) && ($("#lift_claims_filter_address").data("object") != null))
        return true;
    if (($("#lift_claims_filter_address").data("object") == null) && (filter.AddressObject != null))
        return true;
    if (($("#lift_claims_filter_address").data("object") != null) && (filter.AddressObject != null) && ($("#lift_claims_filter_address").data("object").Id != filter.AddressObject.Id))
        return true;
    if (((filter.Doorway != null) ? filter.Doorway.toString() : "") != $("#lift_claims_filter_doorway").val().trim())
        return true;
    if (((filter.MinStayTime != null) ? filter.MinStayTime.toString() : "") != $("#lift_claims_filter_minstaytime").val().trim())
        return true;

    return false;
}

function isCessationClaimsFilterChanged(filter) {
    if (filter.IsInitState != $("#cessation_claims_filter_ok_button").data("initstate"))
        return true;
    if (filter.RegNumber != $("#cessation_claims_filter_regnumber").val())
        return true;
    if (filter.DateFromEn != $("#cessation_claims_filter_date_from_checkbox").is(':checked'))
        return true;
    if (filter.DateFrom != $("#cessation_claims_filter_date_from").val())
        return true;
    if (filter.DateToEn != $("#cessation_claims_filter_date_to_checkbox").is(':checked'))
        return true;
    if (filter.DateTo != $("#cessation_claims_filter_date_to").val())
        return true;
    if (filter.CessationObject != $("#cessation_claims_filter_cessation_object option:selected").val())
        return true;

    var addresses = [];
    $("#cessation_claims_filter_addresses").multiselect("getChecked").map(function () {
        var address = $("#cessation_claims_filter_addresses option[value='" + this.value + "']").data("object");
        addresses.push(address);
    });
    if (filter.Addresses.length != addresses.length)
        return true;
    var on = 0;
    for (var i = 0; i < addresses.length; i++) {
        for (var j = 0; j < filter.Addresses.length; j++) {
            if (addresses[i].Id === filter.Addresses[j].Id) {
                on++
                break
            }
        }
    }
    if (on != addresses.length)
        return true;

    return false;
}

function isRepeatFlatsFilterChanged(filter) {
    if (filter.IsInitState != $("#repeat_flats_filter_ok_button").data("initstate"))
        return true;
    if (filter.DateFromEn != $("#repeat_flats_filter_date_from_checkbox").is(':checked'))
        return true;
    if (filter.DateFrom != $("#repeat_flats_filter_date_from").val())
        return true;
    if (filter.DateToEn != $("#repeat_flats_filter_date_to_checkbox").is(':checked'))
        return true;
    if (filter.DateTo != $("#repeat_flats_filter_date_to").val())
        return true;
    if ((filter.JournalObject == null) && ($("#repeat_flats_filter_journal").data("object") != null))
        return true;
    if (($("#repeat_flats_filter_journal").data("object") == null) && (filter.JournalObject != null))
        return true;
    if (($("#repeat_flats_filter_journal").data("object") != null) && (filter.JournalObject != null) && ($("#repeat_flats_filter_journal").data("object").Id != filter.JournalObject.Id))
        return true;
    if (((filter.MinRepeatsCount != null) ? filter.MinRepeatsCount.toString() : "") != $("#repeat_flats_filter_minrepeatscount").val().trim())
        return true;

    return false;
}

function isDateSpanFilterChanged(filter) {
    if (filter.IsInitState != $("#date_span_filter_ok_button").data("initstate"))
        return true;
    if (filter.DateFromEn != $("#date_span_filter_date_from_checkbox").is(':checked'))
        return true;
    if (filter.DateFrom != $("#date_span_filter_date_from").val())
        return true;
    if (filter.DateToEn != $("#date_span_filter_date_to_checkbox").is(':checked'))
        return true;
    if (filter.DateTo != $("#date_span_filter_date_to").val())
        return true;

    return false;
}

function isElvObjectsFilterChanged(filter) {
    if (((filter != null) ? filter.State : 1) != $("input[name=elv-objects-filter]:checked").val())
        return true;
    return false;
}

function isElvObjectEventsFilterChanged(filter) {
    if (filter.IsInitState != $("#elv_object_events_filter_ok_button").data("initstate"))
        return true;
    if (filter.RegNumber != $("#elv_object_events_filter_regnumber").val())
        return true;
    if (filter.DateFromEn != $("#elv_object_events_filter_date_from_checkbox").is(':checked'))
        return true;
    if (filter.DateFrom != $("#elv_object_events_filter_date_from").val())
        return true;
    if (filter.DateToEn != $("#elv_object_events_filter_date_to_checkbox").is(':checked'))
        return true;
    if (filter.DateTo != $("#elv_object_events_filter_date_to").val())
        return true;
    if (((filter.MinEventTime != null) ? filter.MinEventTime.toString() : "") != $("#elv_object_events_filter_mineventtime").val().trim())
        return true;

    var objs = [];
    $("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
        var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
        objs.push(obj);
    });
    if (filter.Objects.length != objs.length)
        return true;
    var on = 0;
    for (var i = 0; i < objs.length; i++) {
        for (var j = 0; j < filter.Objects.length; j++) {
            if (objs[i].Id === filter.Objects[j].Id) {
                on++
                break
            }
        }
    }
    if (on != objs.length)
        return true;

    return false;
}

//----------------------------------------------------------------------------
// СОХРАНЕНИЕ И ВОССТАНОВЛЕНИЕ ДАННЫХ ФИЛЬТРА

function saveCommonClaimsFilter() {
    var filter = new Object();
    filter.IsInitState = $("#common_claims_filter_ok_button").data("initstate");
    filter.RegNumber = $("#common_claims_filter_regnumber").val();
    filter.DateFromEn = $("#common_claims_filter_date_from_checkbox").is(':checked');
    filter.DateFrom = $("#common_claims_filter_date_from").val();
    filter.DateToEn = $("#common_claims_filter_date_to_checkbox").is(':checked');
    filter.DateTo = $("#common_claims_filter_date_to").val();
    filter.Journal = $("#common_claims_filter_journal").val();
    filter.Address = $("#common_claims_filter_address").val();
    filter.Doorway = $("#common_claims_filter_doorway").val();
    filter.Flat = $("#common_claims_filter_flat").val();
    filter.JournalObject = $("#common_claims_filter_journal").data("object");
    if ($("#common_claims_filter_journal").data("object") == undefined)
        filter.JournalObject = null;
    filter.AddressObject = $("#common_claims_filter_address").data("object");
    if ($("#common_claims_filter_address").data("object") == undefined)
        filter.AddressObject = null;

    $("#common_claims_filter_control").data("object", filter);

    return filter;
}

function restoreCommonClaimsFilter(filter) {
    if (filter == null)
        filter = $("#common_claims_filter_control").data("object");

    $("#common_claims_filter_ok_button").data("initstate", filter.IsInitState);
    $("#common_claims_filter_regnumber").val(filter.RegNumber);
    $("#common_claims_filter_date_from_checkbox").attr('checked', filter.DateFromEn);
    $("#common_claims_filter_date_from").val(filter.DateFrom);
    $("#common_claims_filter_date_to_checkbox").attr('checked', filter.DateToEn);
    $("#common_claims_filter_date_to").val(filter.DateTo);
    $("#common_claims_filter_journal").val(filter.Journal);
    $("#common_claims_filter_address").val(filter.Address);
    $("#common_claims_filter_doorway").val(filter.Doorway);
    $("#common_claims_filter_flat").val(filter.Flat);
    $("#common_claims_filter_journal").data("object", filter.JournalObject);
    $("#common_claims_filter_address").data("object", filter.AddressObject);
}

//------------------------------------------------------------------

function saveLiftClaimsFilter() {
    var filter = new Object();
    filter.IsInitState = $("#lift_claims_filter_ok_button").data("initstate");
    filter.RegNumber = $("#lift_claims_filter_regnumber").val();
    filter.DateFromEn = $("#lift_claims_filter_date_from_checkbox").is(':checked');
    filter.DateFrom = $("#lift_claims_filter_date_from").val();
    filter.DateToEn = $("#lift_claims_filter_date_to_checkbox").is(':checked');
    filter.DateTo = $("#lift_claims_filter_date_to").val();
    filter.Address = $("#lift_claims_filter_address").val();
    filter.Doorway = $("#lift_claims_filter_doorway").val();
    filter.MinStayTime = $("#lift_claims_filter_minstaytime").val();
    filter.AddressObject = $("#lift_claims_filter_address").data("object");
    if ($("#lift_claims_filter_address").data("object") == undefined)
        filter.AddressObject = null;

    $("#lift_claims_filter_control").data("object", filter);

    return filter;
}

function restoreLiftClaimsFilter(filter) {
    if (filter == null)
        filter = $("#lift_claims_filter_control").data("object");

    $("#lift_claims_filter_ok_button").data("initstate", filter.IsInitState);
    $("#lift_claims_filter_regnumber").val(filter.RegNumber);
    $("#lift_claims_filter_date_from_checkbox").attr('checked', filter.DateFromEn);
    $("#lift_claims_filter_date_from").val(filter.DateFrom);
    $("#lift_claims_filter_date_to_checkbox").attr('checked', filter.DateToEn);
    $("#lift_claims_filter_date_to").val(filter.DateTo);
    $("#lift_claims_filter_address").val(filter.Address);
    $("#lift_claims_filter_doorway").val(filter.Doorway);
    $("#lift_claims_filter_minstaytime").val(filter.MinStayTime);
    $("#lift_claims_filter_address").data("object", filter.AddressObject);
}

//------------------------------------------------------------------

function saveCessationClaimsFilter() {
    var filter = new Object();
    filter.IsInitState = $("#cessation_claims_filter_ok_button").data("initstate");
    filter.RegNumber = $("#cessation_claims_filter_regnumber").val();
    filter.DateFromEn = $("#cessation_claims_filter_date_from_checkbox").is(':checked');
    filter.DateFrom = $("#cessation_claims_filter_date_from").val();
    filter.DateToEn = $("#cessation_claims_filter_date_to_checkbox").is(':checked');
    filter.DateTo = $("#cessation_claims_filter_date_to").val();
    filter.Addresses = [];
    $("#cessation_claims_filter_addresses").multiselect("getChecked").map(function () {
        var address = $("#cessation_claims_filter_addresses option[value='" + this.value + "']").data("object");
        filter.Addresses.push(address);
    });
    filter.CessationObject = $("#cessation_claims_filter_cessation_object option:selected").val();
    $("#cessation_claims_filter_control").data("object", filter);

    return filter;
}

function restoreCessationClaimsFilter(filter) {
    if (filter == null)
        filter = $("#cessation_claims_filter_control").data("object");

    $("#cessation_claims_filter_ok_button").data("initstate", filter.IsInitState);
    $("#cessation_claims_filter_regnumber").val(filter.RegNumber);
    $("#cessation_claims_filter_date_from_checkbox").attr('checked', filter.DateFromEn);
    $("#cessation_claims_filter_date_from").val(filter.DateFrom);
    $("#cessation_claims_filter_date_to_checkbox").attr('checked', filter.DateToEn);
    $("#cessation_claims_filter_date_to").val(filter.DateTo);
    $("#cessation_claims_filter_addresses option").removeAttr("selected");
    for (var key in filter.Addresses) {
        $("#cessation_claims_filter_addresses option[value='" + filter.Addresses[key].Id + "']").attr('selected', 'selected');
    }
    $("#cessation_claims_filter_addresses").multiselect("refresh");
    $("#cessation_claims_filter_cessation_object option[Value='" + filter.CessationObject.toString() + "']").attr("selected", "selected");
    $("#cessation_claims_filter_cessation_object").multiselect("refresh");
}

//------------------------------------------------------------------

function saveRepeatFlatsFilter() {
    var filter = new Object();
    filter.IsInitState = $("#repeat_flats_filter_ok_button").data("initstate");
    filter.Journal = $("#repeat_flats_filter_journal").val();
    filter.DateFromEn = $("#repeat_flats_filter_date_from_checkbox").is(':checked');
    filter.DateFrom = $("#repeat_flats_filter_date_from").val();
    filter.DateToEn = $("#repeat_flats_filter_date_to_checkbox").is(':checked');
    filter.DateTo = $("#repeat_flats_filter_date_to").val();
    filter.MinRepeatsCount = $("#repeat_flats_filter_minrepeatscount").val();
    filter.JournalObject = $("#repeat_flats_filter_journal").data("object");
    if ($("#repeat_flats_filter_journal").data("object") == undefined)
        filter.JournalObject = null;

    $("#repeat_flats_filter_control").data("object", filter);

    return filter;
}

function restoreRepeatFlatsFilter(filter) {
    if (filter == null)
        filter = $("#repeat_flats_filter_control").data("object");

    $("#repeat_flats_filter_ok_button").data("initstate", filter.IsInitState);
    $("#repeat_flats_filter_journal").val(filter.Journal);
    $("#repeat_flats_filter_date_from_checkbox").attr('checked', filter.DateFromEn);
    $("#repeat_flats_filter_date_from").val(filter.DateFrom);
    $("#repeat_flats_filter_date_to_checkbox").attr('checked', filter.DateToEn);
    $("#repeat_flats_filter_date_to").val(filter.DateTo);
    $("#repeat_flats_filter_minrepeatscount").val(filter.MinRepeatsCount);
    $("#repeat_flats_filter_journal").data("object", filter.JournalObject);
}

//------------------------------------------------------------------

function saveDateSpanFilter() {
    var filter = new Object();
    filter.IsInitState = $("#date_span_filter_ok_button").data("initstate");
    filter.DateFromEn = $("#date_span_filter_date_from_checkbox").is(':checked');
    filter.DateFrom = $("#date_span_filter_date_from").val();
    filter.DateToEn = $("#date_span_filter_date_to_checkbox").is(':checked');
    filter.DateTo = $("#date_span_filter_date_to").val();

    $("#date_span_filter_control").data("object", filter);

    return filter;
}

function restoreDateSpanFilter(filter) {
    if (filter == null)
        filter = $("#date_span_filter_control").data("object");

    $("#date_span_filter_ok_button").data("initstate", filter.IsInitState);
    $("#date_span_filter_date_from_checkbox").attr('checked', filter.DateFromEn);
    $("#date_span_filter_date_from").val(filter.DateFrom);
    $("#date_span_filter_date_to_checkbox").attr('checked', filter.DateToEn);
    $("#date_span_filter_date_to").val(filter.DateTo);
}

//------------------------------------------------------------------

function saveElvObjectsFilter() {
    var filter = new Object();
    filter.IsInitState = false;
    filter.State = $("input[name=elv-objects-filter]:checked").val();

    return filter;
}

function restoreElvObjectsFilter(filter) {
    var state = 1;
    if (filter != null)
        state = filter.State;
    $("input[name=elv-objects-filter][value='" + state + "']").attr('checked', 'checked');
}

//------------------------------------------------------------------

function saveElvObjectEventsFilter() {
    var filter = new Object();
    filter.IsInitState = $("#elv_object_events_filter_ok_button").data("initstate");
    filter.DateFromEn = $("#elv_object_events_filter_date_from_checkbox").is(':checked');
    filter.DateFrom = $("#elv_object_events_filter_date_from").val();
    filter.DateToEn = $("#elv_object_events_filter_date_to_checkbox").is(':checked');
    filter.DateTo = $("#elv_object_events_filter_date_to").val();
    filter.MinEventTime = $("#elv_object_events_filter_mineventtime").val();
    filter.Objects = [];
    $("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
        var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
        filter.Objects.push(obj);
    });
    $("#elv_object_events_filter_control").data("object", filter);

    return filter;
}

function restoreElvObjectEventsFilter(filter) {
    if (filter == null)
        filter = $("#elv_object_events_filter_control").data("object");

    $("#elv_object_events_filter_ok_button").data("initstate", filter.IsInitState);
    $("#elv_object_events_filter_date_from_checkbox").attr('checked', filter.DateFromEn);
    $("#elv_object_events_filter_date_from").val(filter.DateFrom);
    $("#elv_object_events_filter_date_to_checkbox").attr('checked', filter.DateToEn);
    $("#elv_object_events_filter_date_to").val(filter.DateTo);
    $("#elv_object_events_filter_mineventtime").val(filter.MinEventTime);
    $("#elv_object_events_filter_objects option").removeAttr("selected");
    for (var key in filter.Objects) {
        $("#elv_object_events_filter_objects option[value='" + filter.Objects[key].Id + "']").attr('selected', 'selected');
    }
    $("#elv_object_events_filter_objects").multiselect("refresh");
}

