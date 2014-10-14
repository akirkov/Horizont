//----------------------------------------------------------------------------
// InsertCommonClaim Page

function initInsertCommonClaimControls(fnCallBack, fnError) {
    $("#Journal").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select page-row-field",
        noneSelectedText: "Не задан",
        selectedList : 1
    });

    $("#Journal").multiselect("getButton").addClass("ui-combobox-nonselected");

    $("#Journal").change(function () {
        $("#JournalId").val($("#Journal option:selected").val());

        var journal = $("#Journal option[value='" + $("#Journal option:selected").val().toString() + "']").data("object");
        if (journal == null)
            $("#Journal").multiselect("getButton").addClass("ui-combobox-nonselected");
        else
            $("#Journal").multiselect("getButton").removeClass("ui-combobox-nonselected");

        if (window.isInitialization)
            return;

        $("#Failure").val("");
        $("#Failure").data("autocomplete").term = "";
    });

    $("#Failure").combobox({
        source: function (request, response) {
            var journal = $("#Journal option[value='" + $("#Journal option:selected").val().toString() + "']").data("object");
            if (journal == null) {
                response();
                return;
            }

            var service = new Horizont.Web.ClaimsWebService();
            service.GetCommonFailures(journal, request.term, getRegionId(), function (failures) {
                response($.map(failures, function (item) {
                    return {
                        label: item.Name,
                        value: item.Name,
                        object: item
                    }
                }))
            });
        }
    });


    $("#InsertButton").click(function () {
        if (!Page_ClientValidate("insert_common_claim_validators")) {
            Recaptcha.reload();
            return false;
        }
    });

    updateInsertCommonClaimJournals(function () {
        $("#JournalValidator").css("visibility", "hidden");

        fnCallBack();
    }, fnError);
}

function updateInsertCommonClaimJournals(fnCallBack, fnError) {
    $("#Journal").empty();
    $("#Journal").multiselect("refresh");

    var service = new Horizont.Web.ClaimsWebService();
    service.GetJournals("", getRegionId(), function (items) {
        $("#Journal").empty();

        if (items == null) {
            $("#Journal").multiselect("refresh");
            $("#Journal").change();

            fnError();
            return;
        }

        $("#Journal").append($('<option value="0">Не задан</option>'));
        $("#Journal option[value='0']").data("object", null);

        $.map(items, function (item) {
            $("#Journal").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#Journal option[value='" + item.Id + "']").data("object", item);
        })

        if (window.isInitialization) {
            var journal_id = Number($("#JournalId").val());
            if (journal_id > 0)
                $("#Journal option[Value='" + journal_id.toString() + "']").attr("selected", "selected");
        }

        $("#Journal").multiselect("refresh");
        $("#Journal").change();

        fnCallBack();
    },
    function () {
        $("#Journal").empty();
        $("#Journal").multiselect("refresh");
        $("#Journal").change();

        fnError();
    });
}

function initCommonClaimInfoControls() {
    $("#CommonClaimPrintButton").click(function () {
        var search = $.deparam(location.search.substring(1), true);
        printCommonClaimInfo(Number (search.id));

        return false;
    });
}
