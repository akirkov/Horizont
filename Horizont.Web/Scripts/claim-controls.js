//----------------------------------------------------------------------------
// ИНИЦИАЛИЗАЦИЯ ДИАЛОГОВ

function initCommonClaimDlg() {
    $("#common_claim_print_button").click(function () {
        printCommonClaim($("#common_claim_control").data("object"));
    });

    $("#common_claim_address").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            var claim = $("#common_claim_control").data("object");
            service.GetAddresses(request.term, getRegionId(), (claim != null) ? claim.Disp.Id : getDispId(), function (addresses) {
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
            $("#common_claim_address").data("object", ui.item.object);
            onChangeCommonClaimFlat();
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            return false;
        },
        close: function (event, ui) {
            onChangeCommonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    });

    $("#common_claim_flat").bind("textchange", function () {
        onChangeCommonClaimFlat();
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimFlat();
        onChangeCommonClaimField();
    });

    $("#common_claim_failure").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetCommonFailures($("#common_claim_journal").data("object"), request.term, getRegionId(), function (commonfailures) {
                response($.map(commonfailures, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            var commonfailure = ui.item.object;
            $("#common_claim_executed_period").val(commonfailure.ExecutedPeriod);
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            var service = new Horizont.Web.ClaimsWebService();
            service.GetExecutedPeriod($("#common_claim_journal").data("object"), $("#common_claim_failure").val(), getRegionId(), function (period) {
                if (period) {
                    $("#common_claim_executed_period").val(period);
                    return true;
                }
                var val = $("#common_claim_executed_period").val();
                if (val > 0)
                    return true;
                $("#common_claim_executed_period").val("");
            });
        },
        close: function (event, ui) {
            onChangeCommonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    });

    $("#common_claim_executed_period").bind ("textchange", function () {
        $("#common_claim_period_dimension").text(getClaimPeriodDimension($(this).val()));
        onChangeCommonClaimField();
    });

    $("#common_claim_orgname").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetOrganizations(request.term, getRegionId (), function (orgs) {
                response($.map(orgs, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCommonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    });

    $("#common_claim_typework").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetTypeWorks($("#common_claim_journal").data("object"), $("#common_claim_failure").val (), request.term, getRegionId (), function (typeworks) {
                response($.map(typeworks, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCommonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    });

    $("#common_claim_executor").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetExecutors($("#common_claim_journal").data("object"), request.term, getRegionId (), getDispId (), function (executors) {
                response($.map(executors, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCommonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    });

    $("#common_claim_status, #common_claim_type").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    });

    $("#common_claim_submission").change(function () {
        $("#common_claim_orgname").attr('disabled', !this.checked);
        $("#common_claim_type").multiselect(!this.checked ? "disable" : "enable")
        $("#common_claim_submission_time").attr('disabled', !this.checked);
        $("#common_claim_submission_date").attr('disabled', !this.checked);

        if (this.checked && !$("#common_claim_control").data("object").IsSubmission) {
            var dt = new Date();
            $("#common_claim_submission_time").val(dt.format('HH:mm'));
            $("#common_claim_submission_date").val(dt.format('dd.MM.yyyy'));
            $("#common_claim_submission_operator").text(getCurrentUserInitials());
        }

        onChangeCommonClaimField();
    });

    $("#common_claim_legate").change(function () {
        $("#common_claim_status").multiselect(!this.checked ? "disable" : "enable")
        $("#common_claim_typework").attr('disabled', !this.checked);
        $("#common_claim_executor").attr('disabled', !this.checked);
        $("#common_claim_check").attr('disabled', !this.checked);
        $("#common_claim_executed_time").attr('disabled', !this.checked);
        $("#common_claim_executed_date").attr('disabled', !this.checked);

        if (this.checked && !$("#common_claim_control").data("object").IsLegate) {
            var dt = new Date();
            $("#common_claim_executed_time").val(dt.format('HH:mm'));
            $("#common_claim_executed_date").val(dt.format('dd.MM.yyyy'));
            $("#common_claim_executed_operator").text(getCurrentUserInitials());
        }

        onChangeCommonClaimField();
    });

    $("#common_claim_regnumber, #common_claim_doorway, #common_claim_floor, #common_claim_phone, #common_claim_code, #common_claim_owner, #common_claim_comment")
    .bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    });
    
    $("#common_claim_check").change(function () {
        onChangeCommonClaimField();
    });
    
    $("#common_claim_type, #common_claim_status").change(function () {
        onChangeCommonClaimField();
    });

    $("#common_claim_received_time, #common_claim_submission_time, #common_claim_executed_time").bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    }).timepicker("option", "onSelect", function () {
        onChangeCommonClaimField();
    });

    $("#common_claim_received_date, #common_claim_submission_date, #common_claim_executed_date").bind("textchange", function () {
        onChangeCommonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCommonClaimField();
    }).datepicker("option", "onSelect", function () {
        onChangeCommonClaimField();
    });

    $("#common_claim_save_button").click(function () {
        if (!Page_ClientValidate("common_claim_validators"))
            return false;

        onSaveCommonClaim();

        $("#common_claim_save_button").data("save", true);
        $("#common_claim_dialog").dialog("close");
    });

    $("#common_claim_dialog").dialog({
        open: function (event, ui) {
            var claim = $("#common_claim_control").data("object");
            if ((claim == null) || !canEditClaim (claim))
                document.title = $("body").data("title") + " - Просмотр заявки";
            else
                document.title = $("body").data("title") + " - Редактирование заявки";

            pushHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initLiftClaimDlg() {
    $("#lift_claim_print_button").click(function () {
        printLiftClaim($("#lift_claim_control").data("object"));
    });

    $("#lift_claim_address").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            var claim = $("#lift_claim_control").data("object");
            service.GetAddresses(request.term, getRegionId(), (claim != null) ? claim.Disp.Id : getDispId(), function (addresses) {
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
            $("#lift_claim_address").data("object", ui.item.object);
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            return false;
        },
        close: function (event, ui) {
            onChangeLiftClaimField();
        }
    }).bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    var liftTypes = getLiftTypes();
    $("#lift_claim_lift_type").combobox({
        classes: "ui-corner-left inset",
        source: liftTypes,
        select: function (event, ui) {
            $("#lift_claim_lift_type").data("id", ui.item.id);
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("autocomplete").term = "";

            $("#lift_claim_lift_type").data("id", 0);

            return false;
        },
        close: function (event, ui) {
            onChangeLiftClaimField();
        }
    }).bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    $("#lift_claim_failure").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetLiftFailures(request.term, getRegionId (), function (liftfailures) {
                response($.map(liftfailures, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        select: function (event, ui) {
            var liftfailure = ui.item.object;
            $("#lift_claim_jam").attr("checked", liftfailure.IsJam);
            $("#lift_claim_stay").attr("checked", liftfailure.IsStay);
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            var service = new Horizont.Web.ClaimsWebService();
            service.GetLiftFailure($("#lift_claim_failure").val(), getRegionId (), function (liftfailure) {
                if (liftfailure) {
                    $("#lift_claim_jam").attr("checked", liftfailure.IsJam);
                    $("#lift_claim_stay").attr("checked", liftfailure.IsStay);
                }
            });
        },
        close: function (event, ui) {
            onChangeLiftClaimField();
        }
    }).bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    $("#lift_claim_orgname").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetOrganizations(request.term, getRegionId (), function (orgs) {
                response($.map(orgs, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeLiftClaimField();
        }
    }).bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    $("#lift_claim_typework").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetTypeWorks(null, $("#lift_claim_failure").val(), request.term, getRegionId (), function (typeworks) {
                response($.map(typeworks, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeLiftClaimField();
        }
    }).bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    $("#lift_claim_executor").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetExecutors(null, request.term, getRegionId (), getDispId (), function (executors) {
                response($.map(executors, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeLiftClaimField();
        }
    }).bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    $("#lift_claim_status").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    });

    $("#lift_claim_submission").change(function () {
        $("#lift_claim_orgname").attr('disabled', !this.checked);
        $("#lift_claim_submission_time").attr('disabled', !this.checked);
        $("#lift_claim_submission_date").attr('disabled', !this.checked);

        if (this.checked && !$("#lift_claim_control").data("object").IsSubmission) {
            var dt = new Date();
            $("#lift_claim_submission_time").val(dt.format('HH:mm'));
            $("#lift_claim_submission_date").val(dt.format('dd.MM.yyyy'));
            $("#lift_claim_submission_operator").text(getCurrentUserInitials());
        }
        onChangeLiftClaimField();
    });

    $("#lift_claim_legate").change(function () {
        $("#lift_claim_status").multiselect(!this.checked ? "disable" : "enable")
        $("#lift_claim_reason").attr('disabled', !this.checked);
        $("#lift_claim_typework").attr('disabled', !this.checked);
        $("#lift_claim_executor").attr('disabled', !this.checked);
        $("#lift_claim_check").attr('disabled', !this.checked);
        $("#lift_claim_executed_time").attr('disabled', !this.checked);
        $("#lift_claim_executed_date").attr('disabled', !this.checked);

        if (this.checked && !$("#lift_claim_control").data("object").IsLegate) {
            var dt = new Date();
            $("#lift_claim_executed_time").val(dt.format('HH:mm'));
            $("#lift_claim_executed_date").val(dt.format('dd.MM.yyyy'));
            $("#lift_claim_executed_operator").text(getCurrentUserInitials());
        }

        onChangeLiftClaimField();
    });

    $("#lift_claim_regnumber, #lift_claim_doorway, #lift_claim_code, #lift_claim_floor, #lift_claim_comment, #lift_claim_reason")
    .bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    });

    $("#lift_claim_jam, #lift_claim_stay, #lift_claim_check").change(function () {
        onChangeLiftClaimField();
    });

    $("#lift_claim_status").change(function () {
        onChangeLiftClaimField();
    });

    $("#lift_claim_received_time, #lift_claim_submission_time, #lift_claim_executed_time").bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    }).timepicker("option", "onSelect", function () {
        onChangeLiftClaimField();
    });

    $("#lift_claim_received_date, #lift_claim_submission_date, #lift_claim_executed_date").bind("textchange", function () {
        onChangeLiftClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeLiftClaimField();
    }).datepicker("option", "onSelect", function () {
        onChangeLiftClaimField();
    });

    $("#lift_claim_save_button").click(function () {
        if (!Page_ClientValidate("lift_claim_validators"))
            return false;

        onSaveLiftClaim();

        $("#lift_claim_save_button").data("save", true);
        $("#lift_claim_dialog").dialog("close");
    });

    $("#lift_claim_dialog").dialog({
        open: function (event, ui) {
            var claim = $("#lift_claim_control").data("object");
            if ((claim == null) || !canEditClaim(claim))
                document.title = $("body").data("title") + " - Просмотр заявки";
            else
                document.title = $("body").data("title") + " - Редактирование заявки";
            pushHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initCessationClaimDlg() {
    $("#cessation_claim_print_button").click(function () {
        printCessationClaim($("#cessation_claim_control").data("object"));
    });

    $("#cessation_claim_addresses").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: true,
        height: 300,
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        header: false,
        noneSelectedText: "Не выбраны",
        selectedList: 15
    }).multiselectfilter({
        label: "Фильтр",
        placeholder : "Ключевые слова"
    }).bind("multiselectclick", function (event, ui) {
        onChangeCessationClaimField();
    });

    $("#cessation_claim_cessation_object, #cessation_claim_object_type").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    });

    var service = new Horizont.Web.ClaimsWebService();
    service.GetAddresses("", getRegionId(), getDispId(), function (addresses) {
        $.map(addresses, function (item) {
            $("#cessation_claim_addresses").append($('<option value="' + item.Id + '">' + item.AddressStr + '</option>'));
            $("#cessation_claim_addresses option[value='" + item.Id  + "']").data ("object", item);
        })
        $("#cessation_claim_addresses").multiselect("refresh");
    });

    $("#cessation_claim_reason").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetCessationReasons(request.term, getRegionId (), function (reasons) {
                response($.map(reasons, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCessatonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCessatonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessatonClaimField();
    });

    $("#cessation_claim_basis").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetCessationBasises(request.term, getRegionId (), function (basises) {
                response($.map(basises, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCessatonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCessatonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessatonClaimField();
    });

    $("#cessation_claim_applicant").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetCessationApplicants(request.term, getRegionId (), function (applicants) {
                response($.map(applicants, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCessatonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCessatonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessatonClaimField();
    });

    $("#cessation_claim_orgname").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var service = new Horizont.Web.ClaimsWebService();
            service.GetOrganizations(request.term, getRegionId(), function (orgs) {
                response($.map(orgs, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name
                    }
                }))
            });
        },
        close: function (event, ui) {
            onChangeCessatonClaimField();
        }
    }).bind("textchange", function () {
        onChangeCessatonClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessatonClaimField();
    });

    $("#cessation_claim_legate").change(function () {
        $("#cessation_claim_executed_time").attr('disabled', !this.checked);
        $("#cessation_claim_executed_date").attr('disabled', !this.checked);

        if (this.checked && !$("#cessation_claim_control").data("object").IsLegate) {
            var dt = new Date();
            $("#cessation_claim_executed_time").val(dt.format('HH:mm'));
            $("#cessation_claim_executed_date").val(dt.format('dd.MM.yyyy'));
            $("#cessation_claim_executed_operator").text(getCurrentUserInitials());
        }
        onChangeCessationClaimField();
    });

    $("#cessation_claim_regnumber, #cessation_claim_abonent, #cessation_claim_objects_count, #cessation_claim_flats_count, #cessation_claim_basis_comment, #cessation_claim_comment")
    .bind("textchange", function () {
        onChangeCessationClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessationClaimField();
    });

    $("#cessation_claim_cessation_object, #cessation_claim_object_type").change(function () {
        onChangeCessationClaimField();
    });

    $("#cessation_claim_received_time, #cessation_claim_executed_time").bind("textchange", function () {
        onChangeCessationClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessationClaimField();
    }).timepicker("option", "onSelect", function () {
        onChangeCessationClaimField();
    });

    $("#cessation_claim_received_date, #cessation_claim_executed_date").bind("textchange", function () {
        onChangeCessationClaimField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeCessationClaimField();
    }).datepicker("option", "onSelect", function () {
        onChangeCessationClaimField();
    });

    $("#cessation_claim_save_button").click(function () {
        if (!Page_ClientValidate("cessation_claim_validators"))
            return false;

        onSaveCessationClaim();

        $("#cessation_claim_save_button").data("save", true);
        $("#cessation_claim_dialog").dialog("close");
    });

    $("#cessation_claim_dialog").dialog({
        open: function (event, ui) {
            var claim = $("#cessation_claim_control").data("object");
            if ((claim == null) || !canEditClaim(claim))
                document.title = $("body").data("title") + " - Просмотр отключения";
            else
                document.title = $("body").data("title") + " - Редактирование отключения";

            pushHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

//----------------------------------------------------------------------------
// ФУНКЦИИ ОТКРЫТИЯ ЗАЯВОК

function commonClaimDlg(claim) {
    $("#common_claim_control").data("object", claim);
    $("#common_claim_journal").text(claim.Journal.Name);
    $("#common_claim_journal").data("object", claim.Journal);
    $("#common_claim_regnumber").val(claim.RegNumber);
    $("#common_claim_address").val(claim.Address.AddressStr);
    $("#common_claim_address").data("object", claim.Address);
    $("#common_claim_flat").val(claim.Flat);
    $("#common_claim_doorway").val(claim.Doorway);
    $("#common_claim_floor").val(claim.Floor);
    $("#common_claim_phone").val(claim.Phone);
    $("#common_claim_code").val(claim.Code);
    $("#common_claim_owner").val(claim.Owner);
    $("#common_claim_failure").val(claim.CommonFailureStr);
    $("#common_claim_executed_period").val(claim.ExecutedPeriod);
    $("#common_claim_comment").val(claim.CommonFailureComment);
    $("#common_claim_received_operator").text(claim.ReceivedOperator);
    $("#common_claim_received_time").val(claim.ReceivedTime.format('HH:mm'));
    $("#common_claim_received_date").val(claim.ReceivedTime.format('dd.MM.yyyy'));
    $("#common_claim_submission").attr('checked', claim.IsSubmission);
    $("#common_claim_orgname").val(claim.OrgName);
    $("#common_claim_type option[Value='" + claim.IsTeam.toString() + "']").attr("selected", "selected");
    $("#common_claim_submission_operator").text(claim.SubmissionOperator);
    $("#common_claim_submission_time").val(claim.SubmissionTime.format('HH:mm'));
    $("#common_claim_submission_date").val(claim.SubmissionTime.format('dd.MM.yyyy'));
    $("#common_claim_legate").attr('checked', claim.IsLegate);
    $("#common_claim_status option[Value='" + claim.Result.toString() + "']").attr("selected", "selected");
    $("#common_claim_typework").val(claim.Typework);
    $("#common_claim_executor").val(claim.Executor);
    $("#common_claim_check").attr('checked', claim.IsCheck);
    $("#common_claim_executed_operator").text(claim.ExecutedOperator);
    $("#common_claim_executed_time").val(claim.ExecutedTime.format('HH:mm'));
    $("#common_claim_executed_date").val(claim.ExecutedTime.format('dd.MM.yyyy'));

    $("#common_claim_executed_period").trigger("textchange");
    $("#common_claim_submission").change();
    $("#common_claim_legate").change();
    $("#common_claim_type").multiselect("refresh");
    $("#common_claim_status").multiselect("refresh");

    $(".common-claim-validator").empty();

    updateCommonClaimControls(claim);

    $("#common_claim_save_button").data("save", false);
    $("#common_claim_dialog").dialog("open");
}

function liftClaimDlg(claim) {
    $("#lift_claim_control").data("object", claim);
    $("#lift_claim_regnumber").val(claim.RegNumber);
    $("#lift_claim_address").val(claim.Address.AddressStr);
    $("#lift_claim_address").data("object", claim.Address);
    $("#lift_claim_doorway").val(claim.Doorway);
    $("#lift_claim_lift_type").val(getLiftType(claim.LiftType));
    $("#lift_claim_lift_type").data("id", claim.LiftType);
    $("#lift_claim_code").val(claim.Code);
    $("#lift_claim_failure").val(claim.LiftFailureStr);
    $("#lift_claim_floor").val(claim.Floor);
    $("#lift_claim_jam").attr('checked', claim.IsJam);
    $("#lift_claim_stay").attr('checked', claim.IsStay);
    $("#lift_claim_comment").val(claim.LiftFailureComment);
    $("#lift_claim_received_operator").text(claim.ReceivedOperator);
    $("#lift_claim_received_time").val(claim.ReceivedTime.format('HH:mm'));
    $("#lift_claim_received_date").val(claim.ReceivedTime.format('dd.MM.yyyy'));
    $("#lift_claim_submission").attr('checked', claim.IsSubmission);
    $("#lift_claim_orgname").val(claim.OrgName);
    $("#lift_claim_submission_operator").text(claim.SubmissionOperator);
    $("#lift_claim_submission_time").val(claim.SubmissionTime.format('HH:mm'));
    $("#lift_claim_submission_date").val(claim.SubmissionTime.format('dd.MM.yyyy'));
    $("#lift_claim_legate").attr('checked', claim.IsLegate);
    $("#lift_claim_status option[Value='" + claim.Result.toString() + "']").attr("selected", "selected");
    $("#lift_claim_reason").val(claim.Reason);
    $("#lift_claim_typework").val(claim.Typework);
    $("#lift_claim_executor").val(claim.Executor);
    $("#lift_claim_check").attr('checked', claim.IsCheck);
    $("#lift_claim_executed_operator").text(claim.ExecutedOperator);
    $("#lift_claim_executed_time").val(claim.ExecutedTime.format('HH:mm'));
    $("#lift_claim_executed_date").val(claim.ExecutedTime.format('dd.MM.yyyy'));

    $("#lift_claim_submission").change();
    $("#lift_claim_legate").change();
    $("#lift_claim_status").multiselect("refresh");

    $(".lift-claim-validator").empty();

    updateLiftClaimControls(claim);

    $("#lift_claim_save_button").data("save", false);
    $("#lift_claim_dialog").dialog("open");
}

function cessationClaimDlg(claim) {
    $("#cessation_claim_control").data("object", claim);
    $("#cessation_claim_regnumber").val(claim.RegNumber);
    $("#cessation_claim_addresses option").removeAttr('selected');
    $("#cessation_claim_addresses option").removeAttr("selected");
    for (var key in claim.Addresses)
        $("#cessation_claim_addresses option[value='" + claim.Addresses[key].Id + "']").attr('selected', 'selected');
    $("#cessation_claim_abonent").val(claim.Abonent);
    $("#cessation_claim_cessation_object option[Value='" + (claim.CessationObject-1).toString() + "']").attr("selected", "selected");
    $("#cessation_claim_reason").val(claim.Reason);
    $("#cessation_claim_object_type option[Value='" + (claim.ObjectType-1).toString() + "']").attr("selected", "selected");
    $("#cessation_claim_objects_count").val(claim.ObjectsCount);
    $("#cessation_claim_flats_count").val(claim.FlatsCount);
    $("#cessation_claim_basis").val(claim.Basis);
    $("#cessation_claim_basis_comment").val(claim.BasisComment);
    $("#cessation_claim_applicant").val(claim.Applicant);
    $("#cessation_claim_orgname").val(claim.OrgName);
    $("#cessation_claim_comment").val(claim.Comment);
    $("#cessation_claim_received_operator").text(claim.ReceivedOperator);
    $("#cessation_claim_received_time").val(claim.ReceivedTime.format('HH:mm'));
    $("#cessation_claim_received_date").val(claim.ReceivedTime.format('dd.MM.yyyy'));
    $("#cessation_claim_legate").attr('checked', claim.IsLegate);
    $("#cessation_claim_executed_operator").text(claim.ExecutedOperator);
    $("#cessation_claim_executed_time").val(claim.ExecutedTime.format('HH:mm'));
    $("#cessation_claim_executed_date").val(claim.ExecutedTime.format('dd.MM.yyyy'));

    $("#cessation_claim_legate").change();
    $("#cessation_claim_addresses").multiselect("refresh");
    $("#cessation_claim_cessation_object").multiselect("refresh");
    $("#cessation_claim_object_type").multiselect("refresh");

    $(".cessation-claim-validator").empty();

    updateCessationClaimControls(claim);

    $("#cessation_claim_save_button").data("save", false);
    $("#cessation_claim_dialog").dialog("open");
}

//----------------------------------------------------------------------------
// ФУНКЦИИ СОХРАНЕНИЯ ЗАЯВОК

function onSaveCommonClaim() {
    var claim = $("#common_claim_control").data("object");
    if (!canEditClaim (claim) || !isCommonClaimChanged(claim))
        return;

    claim.RegNumber = $("#common_claim_regnumber").val();
    claim.Address = $("#common_claim_address").data("object");
    claim.Flat = Number($("#common_claim_flat").val());
    claim.Doorway = Number($("#common_claim_doorway").val());
    claim.Floor = Number($("#common_claim_floor").val());
    claim.Phone = $("#common_claim_phone").val();
    claim.Code = $("#common_claim_code").val();
    claim.Owner = $("#common_claim_owner").val();
    claim.CommonFailureStr = $("#common_claim_failure").val();
    claim.ExecutedPeriod = $("#common_claim_executed_period").val();
    claim.CommonFailureComment = $("#common_claim_comment").val();
    claim.ReceivedOperator = $("#common_claim_received_operator").text();
    claim.ReceivedTime = Date.parseDate($("#common_claim_received_date").val() + " " + $("#common_claim_received_time").val(), 'd.m.Y H:i');
    claim.IsSubmission = $("#common_claim_submission").is(':checked');
    claim.OrgName = $("#common_claim_orgname").val();
    claim.IsTeam = $("#common_claim_type option:selected").val()
    claim.SubmissionOperator = $("#common_claim_submission_operator").text();
    claim.SubmissionTime = Date.parseDate($("#common_claim_submission_date").val() + " " + $("#common_claim_submission_time").val(), 'd.m.Y H:i');
    claim.IsLegate = $("#common_claim_legate").is(':checked');
    claim.Result = $("#common_claim_status option:selected").val()
    claim.Typework = $("#common_claim_typework").val();
    claim.Executor = $("#common_claim_executor").val();
    claim.IsCheck = $("#common_claim_check").is(':checked');
    claim.ExecutedOperator = $("#common_claim_executed_operator").text();
    claim.ExecutedTime = Date.parseDate($("#common_claim_executed_date").val() + " " + $("#common_claim_executed_time").val(), 'd.m.Y H:i');

    loading(true, 500);
    var service = new Horizont.Web.ClaimsWebService();
    service.ChangeCommonClaim(claim, getRegionId (), function (ret) {
        loading (false);
        if (ret) {
            successToast("Заявка сохранена");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onSaveLiftClaim() {
    var claim = $("#lift_claim_control").data("object");
    if (!canEditClaim(claim) || !isLiftClaimChanged(claim))
        return;

    claim.RegNumber = $("#lift_claim_regnumber").val();
    claim.Address = $("#lift_claim_address").data("object");
    claim.Doorway = Number($("#lift_claim_doorway").val());
    claim.LiftType = $("#lift_claim_lift_type").data("id");
    claim.Code = $("#lift_claim_code").val();
    claim.LiftFailureStr = $("#lift_claim_failure").val();
    claim.Floor = Number($("#lift_claim_floor").val());
    claim.IsJam = $("#lift_claim_jam").is(':checked');
    claim.IsStay = $("#lift_claim_stay").is(':checked');
    claim.LiftFailureComment = $("#lift_claim_comment").val();
    claim.ReceivedOperator = $("#lift_claim_received_operator").text();
    claim.ReceivedTime = Date.parseDate($("#lift_claim_received_date").val() + " " + $("#lift_claim_received_time").val(), 'd.m.Y H:i');
    claim.IsSubmission = $("#lift_claim_submission").is(':checked');
    claim.OrgName = $("#lift_claim_orgname").val();
    claim.SubmissionOperator = $("#lift_claim_submission_operator").text();
    claim.SubmissionTime = Date.parseDate($("#lift_claim_submission_date").val() + " " + $("#lift_claim_submission_time").val(), 'd.m.Y H:i');
    claim.IsLegate = $("#lift_claim_legate").is(':checked');
    claim.Result = $("#lift_claim_status option:selected").val()
    claim.Typework = $("#lift_claim_typework").val();
    claim.Reason = $("#lift_claim_reason").val();
    claim.Executor = $("#lift_claim_executor").val();
    claim.IsCheck = $("#lift_claim_check").is(':checked');
    claim.ExecutedOperator = $("#lift_claim_executed_operator").text();
    claim.ExecutedTime = Date.parseDate($("#lift_claim_executed_date").val() + " " + $("#lift_claim_executed_time").val(), 'd.m.Y H:i');

    loading(true, 500);
    var service = new Horizont.Web.ClaimsWebService();
    service.ChangeLiftClaim(claim, getRegionId (), function (ret) {
        loading (false);
        if (ret) {
            successToast("Заявка сохранена");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onSaveCessationClaim() {
    var claim = $("#cessation_claim_control").data("object");
    if (!canEditClaim(claim) || !isCessationClaimChanged(claim))
        return;

    claim.RegNumber = $("#cessation_claim_regnumber").val();
    claim.Addresses = [];
    $("#cessation_claim_addresses").multiselect("getChecked").map(function () {
        var address = $("#cessation_claim_addresses option[value='" + this.value + "']").data("object");
        claim.Addresses.push(address);
    });
    claim.AddressStr = $("#cessation_claim_addresses").multiselect("getButton").children("span").text();
    claim.Abonent = $("#cessation_claim_abonent").val();
    claim.CessationObject = Number($("#cessation_claim_cessation_object option:selected").val()) + 1;
    claim.Reason = $("#cessation_claim_reason").val();
    claim.ObjectType = Number ($("#cessation_claim_object_type option:selected").val()) + 1;
    claim.ObjectsCount = Number($("#cessation_claim_objects_count").val());
    claim.FlatsCount = Number($("#cessation_claim_flats_count").val());
    claim.Basis = $("#cessation_claim_basis").val();
    claim.BasisComment = $("#cessation_claim_basis_comment").val();
    claim.Applicant = $("#cessation_claim_applicant").val();
    claim.OrgName = $("#cessation_claim_orgname").val();
    claim.Comment = $("#cessation_claim_comment").val();
    claim.ReceivedOperator = $("#cessation_claim_received_operator").text();
    claim.ReceivedTime = Date.parseDate($("#cessation_claim_received_date").val() + " " + $("#cessation_claim_received_time").val(), 'd.m.Y H:i');
    claim.IsLegate = $("#cessation_claim_legate").is(':checked');
    claim.ExecutedOperator = $("#cessation_claim_executed_operator").text();
    claim.ExecutedTime = Date.parseDate($("#cessation_claim_executed_date").val() + " " + $("#cessation_claim_executed_time").val(), 'd.m.Y H:i');

    loading(true, 500);
    var service = new Horizont.Web.ClaimsWebService();
    service.ChangeCessationClaim(claim, getRegionId (), function (ret) {
        loading (false);
        if (ret) {
            successToast("Отключение сохранено");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

//----------------------------------------------------------------------------
// ФУКНЦИИ ПРОВЕРКИ ИЗМЕНЕНИЯ ЗАЯВКИ

function isCommonClaimChanged(claim) {
    if (claim.RegNumber != $("#common_claim_regnumber").val())
        return true;
    if (claim.Address.AddressStr != $("#common_claim_address").val().trim())
        return true;
    if (claim.Address != $("#common_claim_address").data("object"))
        return true;
    if (((claim.Flat != null) ? claim.Flat.toString () : "") != $("#common_claim_flat").val().trim ())
        return true;
    if (((claim.Doorway != null) ? claim.Doorway.toString() : "") != $("#common_claim_doorway").val().trim ())
        return true;
    if (((claim.Floor != null) ? claim.Floor.toString() : "") != $("#common_claim_floor").val().trim ())
        return true;
    if (claim.Phone != $("#common_claim_phone").val())
        return true;
    if (claim.Code != $("#common_claim_code").val())
        return true;
    if (claim.Owner != $("#common_claim_owner").val())
        return true;
    if (claim.CommonFailureStr != $("#common_claim_failure").val())
        return true;
    if (claim.ExecutedPeriod != $("#common_claim_executed_period").val())
        return true;
    if (claim.CommonFailureComment != $("#common_claim_comment").val())
        return true;
    if (claim.ReceivedOperator != $("#common_claim_received_operator").text())
        return true;
    if (claim.ReceivedTime.format('dd.MM.yyyy') != $("#common_claim_received_date").val().trim())
        return true;
    if (claim.ReceivedTime.format('HH:mm') != $("#common_claim_received_time").val().trim())
        return true;
    if (claim.IsSubmission != $("#common_claim_submission").is(':checked'))
        return true;
    if (claim.OrgName != $("#common_claim_orgname").val())
        return true;
    if (claim.IsTeam != $("#common_claim_type option:selected").val())
        return true;
    if (claim.SubmissionOperator != $("#common_claim_submission_operator").text())
        return true;
    if (claim.SubmissionTime.format('dd.MM.yyyy') != $("#common_claim_submission_date").val().trim())
        return true;
    if (claim.SubmissionTime.format('HH:mm') != $("#common_claim_submission_time").val().trim())
        return true;
    if (claim.IsLegate != $("#common_claim_legate").is(':checked'))
        return true;
    if (claim.Result != $("#common_claim_status option:selected").val())
        return true;
    if (claim.Typework != $("#common_claim_typework").val())
        return true;
    if (claim.Executor != $("#common_claim_executor").val())
        return true;
    if (claim.IsCheck != $("#common_claim_check").is(':checked'))
        return true;
    if (claim.ExecutedOperator != $("#common_claim_executed_operator").text())
        return true;
    if (claim.ExecutedTime.format('dd.MM.yyyy') != $("#common_claim_executed_date").val().trim())
        return true;
    if (claim.ExecutedTime.format('HH:mm') != $("#common_claim_executed_time").val().trim())
        return true;

    return false;
}

function isLiftClaimChanged(claim) {
    if (claim.RegNumber != $("#lift_claim_regnumber").val())
        return true;
    if (claim.Address.AddressStr != $("#lift_claim_address").val().trim())
        return true;
    if (claim.Address != $("#lift_claim_address").data("object"))
        return true;
    if (((claim.Doorway != null) ? claim.Doorway.toString() : "") != $("#lift_claim_doorway").val().trim ())
        return true;
    if (claim.LiftType != $("#lift_claim_lift_type").data("id"))
        return true;
    if (claim.Code != $("#lift_claim_code").val())
        return true;
    if (claim.LiftFailureStr != $("#lift_claim_failure").val())
        return true;
    if (((claim.Floor != null) ? claim.Floor.toString() : "") != $("#lift_claim_floor").val().trim ())
        return true;
    if (claim.IsJam != $("#lift_claim_jam").is(':checked'))
        return true;
    if (claim.IsStay != $("#lift_claim_stay").is(':checked'))
        return true;
    if (claim.LiftFailureComment != $("#lift_claim_comment").val())
        return true;
    if (claim.ReceivedOperator != $("#lift_claim_received_operator").text())
        return true;
    if (claim.ReceivedTime.format('dd.MM.yyyy') != $("#lift_claim_received_date").val().trim())
        return true;
    if (claim.ReceivedTime.format('HH:mm') != $("#lift_claim_received_time").val().trim())
        return true;
    if (claim.IsSubmission != $("#lift_claim_submission").is(':checked'))
        return true;
    if (claim.OrgName != $("#lift_claim_orgname").val())
        return true;
    if (claim.SubmissionOperator != $("#lift_claim_submission_operator").text())
        return true;
    if (claim.SubmissionTime.format('dd.MM.yyyy') != $("#lift_claim_submission_date").val().trim())
        return true;
    if (claim.SubmissionTime.format('HH:mm') != $("#lift_claim_submission_time").val().trim())
        return true;
    if (claim.IsLegate != $("#lift_claim_legate").is(':checked'))
        return true;
    if (claim.Result != $("#lift_claim_status option:selected").val())
        return true;
    if (claim.Typework != $("#lift_claim_typework").val())
        return true;
    if (claim.Reason != $("#lift_claim_reason").val())
        return true;
    if (claim.Executor != $("#lift_claim_executor").val())
        return true;
    if (claim.IsCheck != $("#lift_claim_check").is(':checked'))
        return true;
    if (claim.ExecutedOperator != $("#lift_claim_executed_operator").text())
        return true;
    if (claim.ExecutedTime.format('dd.MM.yyyy') != $("#lift_claim_executed_date").val().trim())
        return true;
    if (claim.ExecutedTime.format('HH:mm') != $("#lift_claim_executed_time").val().trim())
        return true;
    
    return false;
}

function isCessationClaimChanged(claim) {
    if (claim.RegNumber != $("#cessation_claim_regnumber").val())
        return true;
    
    var addresses = [];
    $("#cessation_claim_addresses").multiselect("getChecked").map(function () {
        var address = $("#cessation_claim_addresses option[value='" + this.value + "']").data("object");
        addresses.push(address);
    });
    if (claim.Addresses.length != addresses.length) 
        return true;
    var on = 0;
    for (var i = 0; i < addresses.length; i++) {
        for (var j = 0; j < claim.Addresses.length; j++) {
            if (addresses[i].Id === claim.Addresses[j].Id) {
                on++
                break
            }
        }
    }
    if (on != addresses.length)
        return true;

    if (claim.Abonent != $("#cessation_claim_abonent").val())
        return true;
    if (claim.CessationObject != Number($("#cessation_claim_cessation_object option:selected").val()) + 1)
        return true;
    if (claim.Reason != $("#cessation_claim_reason").val())
        return true;
    if (claim.ObjectType != Number($("#cessation_claim_object_type option:selected").val()) + 1)
        return true;
    if (((claim.ObjectsCount != null) ? claim.ObjectsCount.toString() : "") != $("#cessation_claim_objects_count").val().trim())
        return true;
    if (((claim.FlatsCount != null) ? claim.FlatsCount.toString() : "") != $("#cessation_claim_flats_count").val().trim())
        return true;
    if (claim.Basis != $("#cessation_claim_basis").val())
        return true;
    if (claim.BasisComment != $("#cessation_claim_basis_comment").val())
        return true;
    if (claim.Applicant != $("#cessation_claim_applicant").val())
        return true;
    if (claim.OrgName != $("#cessation_claim_orgname").val())
        return true;
    if (claim.Comment != $("#cessation_claim_comment").val())
        return true;
    if (claim.ReceivedOperator != $("#cessation_claim_received_operator").text())
        return true;
    if (claim.ReceivedTime.format('dd.MM.yyyy') != $("#cessation_claim_received_date").val().trim())
        return true;
    if (claim.ReceivedTime.format('HH:mm') != $("#cessation_claim_received_time").val().trim())
        return true;
    if (claim.IsLegate != $("#cessation_claim_legate").is(':checked'))
        return true;
    if (claim.ExecutedOperator != $("#cessation_claim_executed_operator").text())
        return true;
    if (claim.ExecutedTime.format('dd.MM.yyyy') != $("#cessation_claim_executed_date").val().trim())
        return true;
    if (claim.ExecutedTime.format('HH:mm') != $("#cessation_claim_executed_time").val().trim())
        return true;

    return false;
}

//----------------------------------------------------------------------------
// ФУКНЦИИ УСТАНОВЛЕНИЯ СВОЙСТВ ОБЪЕКТОВ УПРАВЛЕНИЯ

function updateCommonClaimControls(claim) {
    $("#common_claim_regnumber").attr('readonly', !canEditClaim(claim));

    $("#common_claim_address").attr('disabled', !canEditClaim(claim));
    $("#common_claim_flat").attr('readonly', !canEditClaim(claim));
    $("#common_claim_doorway").attr('readonly', !canEditClaim(claim));
    $("#common_claim_floor").attr('readonly', !canEditClaim(claim));
    $("#common_claim_phone").attr('readonly', !canEditClaim(claim));
    $("#common_claim_code").attr('readonly', !canEditClaim(claim));
    $("#common_claim_owner").attr('readonly', !canEditClaim(claim));
    $("#common_claim_failure").attr('disabled', !canEditClaim(claim));
    $("#common_claim_executed_period").attr('readonly', !canEditClaim(claim));
    $("#common_claim_comment").attr('readonly', !canEditClaim(claim));
    $("#common_claim_received_time").attr('disabled', !canEditClaim(claim));
    $("#common_claim_received_date").attr('disabled', !canEditClaim(claim));

    $("#common_claim_submission").attr('disabled', !canEditClaim(claim));
    $("#common_claim_orgname").attr('disabled', !canEditClaim(claim) || !claim.IsSubmission);
    $("#common_claim_type").multiselect(canEditClaim(claim) && claim.IsSubmission ? "enable" : "disable")
    $("#common_claim_submission_time").attr('disabled', !canEditClaim(claim) || !claim.IsSubmission);
    $("#common_claim_submission_date").attr('disabled', !canEditClaim(claim) || !claim.IsSubmission);

    $("#common_claim_legate").attr('disabled', !canEditClaim(claim));
    $("#common_claim_status").multiselect(canEditClaim(claim) && claim.IsLegate ? "enable" : "disable")
    $("#common_claim_typework").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);
    $("#common_claim_executor").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);
    $("#common_claim_check").attr('disabled', !canEditClaim(claim));
    $("#common_claim_executed_time").attr('disabled', !canEditClaim(claim) || !claim.Islegate);
    $("#common_claim_executed_date").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);

    $("#common_claim_save_button").css("display", "none");
}

function updateLiftClaimControls(claim) {
    $("#lift_claim_regnumber").attr('readonly', !canEditClaim(claim));

    $("#lift_claim_address").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_doorway").attr('readonly', !canEditClaim(claim));
    $("#lift_claim_lift_type").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_code").attr('readonly', !canEditClaim(claim));
    $("#lift_claim_failure").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_floor").attr('readonly', !canEditClaim(claim));
    $("#lift_claim_jam").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_stay").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_comment").attr('readonly', !canEditClaim(claim));
    $("#lift_claim_received_time").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_received_date").attr('disabled', !canEditClaim(claim));

    $("#lift_claim_submission").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_orgname").attr('disabled', !canEditClaim(claim) || !claim.IsSubmission);
    $("#lift_claim_submission_time").attr('disabled', !canEditClaim(claim) || !claim.IsSubmission);
    $("#lift_claim_submission_date").attr('disabled', !canEditClaim(claim) || !claim.IsSubmission);

    $("#lift_claim_legate").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_status").multiselect(canEditClaim(claim) && claim.IsLegate ? "enable" : "disable")
    $("#lift_claim_reason").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);
    $("#lift_claim_typework").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);
    $("#lift_claim_executor").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);
    $("#lift_claim_check").attr('disabled', !canEditClaim(claim));
    $("#lift_claim_executed_time").attr('disabled', !canEditClaim(claim) || !claim.Islegate);
    $("#lift_claim_executed_date").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);

    $("#lift_claim_save_button").css("display", "none");
}

function updateCessationClaimControls(claim) {
    $("#cessation_claim_regnumber").attr('readonly', !canEditClaim(claim));

    $("#cessation_claim_addresses").multiselect(canEditClaim(claim) ? "enable" : "disable")
    $("#cessation_claim_abonent").attr('readonly', !canEditClaim(claim));
    $("#cessation_claim_cessation_object").multiselect(canEditClaim(claim) ? "enable" : "disable")
    $("#cessation_claim_reason").attr('disabled', !canEditClaim(claim));
    $("#cessation_claim_object_type").multiselect(canEditClaim(claim) ? "enable" : "disable")
    $("#cessation_claim_objects_count").attr('readonly', !canEditClaim(claim));
    $("#cessation_claim_flats_count").attr('readonly', !canEditClaim(claim));
    $("#cessation_claim_basis").attr('disabled', !canEditClaim(claim));
    $("#cessation_claim_basis_comment").attr('readonly', !canEditClaim(claim));
    $("#cessation_claim_applicant").attr('disabled', !canEditClaim(claim));
    $("#cessation_claim_orgname").attr('disabled', !canEditClaim(claim));
    $("#cessation_claim_comment").attr('readonly', !canEditClaim(claim));
    $("#cessation_claim_received_time").attr('disabled', !canEditClaim(claim));
    $("#cessation_claim_received_date").attr('disabled', !canEditClaim(claim));

    $("#cessation_claim_legate").attr('disabled', !canEditClaim(claim));
    $("#cessation_claim_executed_time").attr('disabled', !canEditClaim(claim) || !claim.Islegate);
    $("#cessation_claim_executed_date").attr('disabled', !canEditClaim(claim) || !claim.IsLegate);

    $("#cessation_claim_save_button").css("display", "none");
}

//----------------------------------------------------------------------------
// СОБЫТИЯ НА ИЗМЕНЕНИЯ ПОЛЕЙ ЗАЯВКИ

function onChangeCommonClaimField() {
    if (!$("#common_claim_dialog").dialog("isOpen"))
        return;
    var claim = $("#common_claim_control").data("object");

    $("#common_claim_save_button").css("display", canEditClaim(claim) && isCommonClaimChanged(claim) ? "" : "none");
}

function onChangeLiftClaimField() {
    if (!$("#lift_claim_dialog").dialog("isOpen"))
        return;
    var claim = $("#lift_claim_control").data("object");

    $("#lift_claim_save_button").css("display", canEditClaim(claim) && isLiftClaimChanged(claim) ? "" : "none");
}

function onChangeCessationClaimField() {
    if (!$("#cessation_claim_dialog").dialog("isOpen"))
        return;
    var claim = $("#cessation_claim_control").data("object");

    $("#cessation_claim_save_button").css("display", canEditClaim(claim) && isCessationClaimChanged(claim) ? "" : "none");
}

function onChangeCommonClaimFlat() {
    $("#common_claim_doorway").val("")
    $("#common_claim_floor").val("")
    $("#common_claim_phone").val("")
    $("#common_claim_code").val("")
    $("#common_claim_owner").val("")

    var address = $("#common_claim_address").data("object");
    var num = Number($("#common_claim_flat").val());

    if ((address == null) || (num < 0))
        return;

    var service = new Horizont.Web.ClaimsWebService();
    service.GetFlat(address, num, getRegionId(), function (flat) {
        if (!flat)
            return;
        $("#common_claim_doorway").val(flat.Doorway)
        $("#common_claim_floor").val(flat.Floor)
        $("#common_claim_phone").val(flat.Phone)
        $("#common_claim_code").val(flat.Code)
        $("#common_claim_owner").val(flat.Owner)
    });
}

//----------------------------------------------------------------------------
// ВАЛИДАЦИЯ

function commonSubmissionValidate(sender, args) {
    args.IsValid = !$("#common_claim_legate").attr('checked') || $("#common_claim_submission").attr('checked');
}

function liftSubmissionValidate(sender, args) {
    args.IsValid = !$("#lift_claim_legate").attr('checked') || $("#lift_claim_submission").attr('checked');
}

function cessationAddressesValidate(sender, args) {
    args.IsValid = ($("#cessation_claim_addresses").multiselect("getChecked").length != 0);
}

//----------------------------------------------------------------------------
// ПРОЧИЕ ФУНКЦИИ

function getClaimStatus(claim) {
    if (claim.IsDeleted)
        return "Удалена";
    if (claim.Status == 1)
        return "Доставлена";
    if (claim.Status == 2) {
        if (claim.IsLegate && (claim.Result == 0))
            return "Выполенена";
        if (claim.IsLegate && (claim.Result == 1))
            return "Отписана, но невыполнена";
        if (claim.IsSubmission)
            return "Передана на исполнение";
        return "Принята в работу";
    }
    return "Отправлена";
}

function getClaimPeriodDimension(days) {
    if (days == 1)
        return "смена";
    else if ((days == 2) || (days == 3) || (days == 4))
        return "смены";
    return "смен";
}

function getLiftTypes() {
    return [
		{ label: "Левый", value: "Левый", id: 1 },
		{ label: "Правый", value: "Правый", id: 2 },
		{ label: "Левый пассажирский", value: "Левый пассажирский", id: 3 },
		{ label: "Правый пассажирский", value: "Правый пассажирский", id: 4 },
		{ label: "Левый грузовой", value: "Левый грузовой", id: 5 },
		{ label: "Правый грузовой", value: "Правый грузовой", id: 6 },
		{ label: "Пассажирский", value: "Пассажирский", id: 7 },
		{ label: "Грузовой", value: "Грузовой", id: 8 },
		{ label: "Верхний", value: "Верхний", id: 9 },
		{ label: "Нижний", value: "Нижний", id: 10 }
	];
}

function getLiftType(id) {
    var liftTypes = getLiftTypes();
    for (var key in liftTypes) {
        if (liftTypes[key].id == id)
            return liftTypes[key].value;
    }
    return "";
}

function getCessationObjects() {
    return [
		{ label: "ХВ", value: "ХВ", id: 1 },
		{ label: "ГВ", value: "ГВ", id: 2 },
		{ label: "ЦО", value: "ЦО", id: 3 },
		{ label: "ХВ и ГВ", value: "ХВ и ГВ", id: 4 },
		{ label: "ГВ и ЦО", value: "ГВ и ЦО", id: 5 },
		{ label: "Электроэнергия", value: "Электроэнергия", id: 6 },
		{ label: "Газ", value: "Газ", id: 7 },
		{ label: "Антенна", value: "Антенна", id: 8 }
	];
}

function getCessationObject(id) {
    var cessationObjects = getCessationObjects();
    for (var key in cessationObjects) {
        if (cessationObjects[key].id == id)
            return cessationObjects[key].value;
    }
    return "";
}

function getCessationObjectTypes() {
    return [
		{ label: "Дом", value: "Дом", id: 1 },
		{ label: "Подъезд", value: "Подъезд", id: 2 },
		{ label: "Стояк", value: "Стояк", id: 3 },
		{ label: "Квартира", value: "Квартира", id: 4 },
		{ label: "Группа домов", value: "Группа домов", id: 5 },
	];
}

function getCessationObjectType(id) {
    var objectTypes = getCessationObjectTypes();
    for (var key in objectTypes) {
        if (objectTypes[key].id == id)
            return objectTypes[key].value;
    }
    if (objectTypes.length > 0)
        return objectTypes[0].value
    return "";
}

function getCessationObjectsStr(type, count) {
    if (count == null)
        return "";

    var objectType = getCessationObjectType(type).toLowerCase();
    if (objectType == "дом") {
        if ((count == 2) || (count == 3) || (count == 4))
            objectType = "дома";
        else if (count >= 5)
            objectType = "домов";
    }
    else if (objectType == "подъезд") {
        if ((count == 2) || (count == 3) || (count == 4))
            objectType = "подъезда";
        else if (count >= 5)
            objectType = "подъездов";
    }
    else if (objectType == "стояк") {
        if ((count == 2) || (count == 3) || (count == 4))
            objectType = "стояка";
        else if (count >= 5)
            objectType = "стояков";
    }
    else if (objectType == "квартира") {
        if ((count == 2) || (count == 3) || (count == 4))
            objectType = "квартиры";
        else if (count >= 5)
            objectType = "квартир";
    }
    else if (objectType == "группа домов") {
        if ((count == 2) || (count == 3) || (count == 4))
            objectType = "группы домов";
        else if (count >= 5)
            objectType = "групп домов";
    }

    return count + " " + objectType;
}

