//----------------------------------------------------------------------------
// ПЕЧАТЬ ИНФОРМАЦИИ ПО ЗАЯВКЕ

function printCommonClaimInfo(id) {
    var service = new Horizont.Web.ClaimsWebService();
    service.GetCommonClaim(id, getRegionId(), function (claim) {
        if (claim == null) {
            serviceError();
            return;
        }

        var html = getHeaderHtml(function () {
            return 'Информация по заявке';
        });
        html += getCommonClaimInfoHtml(claim);

        html += getHeaderHtml(function () {
            return 'Информация по ОДС';
        });
        html += getDispInfoHtml(claim.Disp);


        $(html).printArea();
    }, serviceError);
}


//----------------------------------------------------------------------------
// ПЕЧАТЬ ЗАЯВОК

function printCommonClaim(claim) {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Выписка из электронного журнала';
        hdr += '<br />"' + claim.Journal.Name + '"';

        return hdr;
    });

    html += getCommonClaimHtml(claim);
    html += getSignatureHtml();

    $(html).printArea();
}

function printLiftClaim(claim) {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Выписка из электронного журнала';
        hdr += '<br />"Лифты"';

        return hdr;
    });

    html += getLiftClaimHtml(claim);
    html += getSignatureHtml();

    $(html).printArea();
}

function printCessationClaim(claim) {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Выписка из электронного журнала';
        hdr += '<br />"Отключения"';

        return hdr;
    });

    html += getCessationClaimHtml(claim);
    html += getSignatureHtml();

    $(html).printArea();
}

//----------------------------------------------------------------------------
// ОТЧЕТЫ ПО ОБЫЧНЫМ ЗАЯВКАМ

function printUnexecutedClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень невыполненных заявок';
        if (getDispId () > 0)
            hdr += ',<br />поступивших на ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 30%">Адрес</th>';
        str += '<th style="width : 50%">Содержание заявки</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 30%">' + claim.Address.AddressStr + (claim.Flat ? ',кв.' + claim.Flat : '') + '</td>';
        str += '<td style="width : 50%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printOverdueClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень просроченных заявок';
        if (getDispId () > 0)
            hdr += ',<br />поступивших на ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 30%">Адрес</th>';
        str += '<th style="width : 50%">Содержание заявки</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 30%">' + claim.Address.AddressStr + (claim.Flat ? ',кв.' + claim.Flat : '') + '</td>';
        str += '<td style="width : 50%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printLegateUnexecutedClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень отписанных, но невыполненных заявок';
        if (getDispId () > 0)
            hdr += ',<br />поступивших на ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 25%">Адрес</th>';
        str += '<th style="width : 20%">Содержание заявки</th>';
        str += '<th style="width : 20%">Проведенные работы</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';
        str += '<th style="width : 15%">Дата и время отписки</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 25%">' + claim.Address.AddressStr + (claim.Flat ? ',кв.' + claim.Flat : '') + '</td>';
        str += '<td style="width : 20%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 20%">' + claim.Typework + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + claim.ExecutedTime.format("dd.MM.yyyy HH:mm") + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printCommonClaims() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#common_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#common_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#common_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#common_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var journal = $("#common_claims_filter_journal").data("object");
        var address = $("#common_claims_filter_address").data("object");
        var doorway = $("#common_claims_filter_doorway").val().trim();
        if (doorway != "")
            doorway = Number(doorway);
        else
            flat = null;
        var flat = $("#common_claims_filter_flat").val().trim();
        if (flat != "")
            flat = Number(flat);
        else
            flat = null;

        var hdr = 'Перечень заявок';
        if (journal != null)
            hdr += ' по журналу ' + journal.Name;
        if (address == null) {
            if (getDispId () > 0)
                hdr += ',<br />поступивших на ОДС' + getDispName () + ' района ' + getRegionName ();
            else
                hdr += '<br />по району ' + getRegionName ();
        }
        if (address) {
            hdr += '<br /> от жильцов по адресу ' + address.AddressStr;
            if (flat != null)
                hdr += ',кв.' + flat;
            else if (doorway != null)
                hdr += ',п.' + doorway;
        }
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy")
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy")

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 25%">Адрес</th>';
        str += '<th style="width : 20%">Содержание заявки</th>';
        str += '<th style="width : 20%">Проведенные работы</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';
        str += '<th style="width : 15%">Дата и время закрытия</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 25%">' + claim.Address.AddressStr + (claim.Flat ? ',кв.' + claim.Flat : '') + '</td>';
        str += '<td style="width : 20%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 20%">' + claim.Typework + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + claim.ExecutedTime.format("dd.MM.yyyy HH:mm") + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printBrigadeClaims() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#date_span_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#date_span_filter_date_from").val().trim() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#date_span_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#date_span_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Перечень невыполненых и выполененных более, чем за трое суток бригадных заявок';
        if (getDispId () > 0)
            hdr += ',<br />поступивших на ОДС' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy")
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy")

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 20%">Содержание заявки</th>';
        str += '<th style="width : 15%">Организация</th>';
        str += '<th style="width : 10%">Время выполнения</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';
        str += '<th style="width : 15%">Дата и время закрытия</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 20%">' + claim.Address.AddressStr + (claim.Flat ? ',кв.' + claim.Flat : '') + '</td>';
        str += '<td style="width : 20%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 15%">' + claim.OrgName + '</td>';
        str += '<td style="width : 10%">' + Date.dateDiff("D", claim.ReceivedTime, claim.IsLegate ? claim.ExecutedTime : new Date()) + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + (claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printDamageClaims() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#date_span_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#date_span_filter_date_from").val().trim() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#date_span_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#date_span_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Перечень аварийных заявок';
        if (getDispId () > 0)
            hdr += ',<br />поступивших на ОДС' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy")
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy")

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 25%">Содержание заявки</th>';
        str += '<th style="width : 20%">Произведенные работы</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';
        str += '<th style="width : 15%">Дата и время закрытия</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 20%">' + claim.Address.AddressStr + (claim.Flat ? ',кв.' + claim.Flat : '') + '</td>';
        str += '<td style="width : 25%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 20%">' + claim.Typework + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + (claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printRepeatClaims() {
    var html = getHeaderHtml(function () {
        var search = $.deparam(location.search.substring(1), true);

        var ndt = null;
        if (search.DateFromEn)
            ndt = Date.parseDate(search.DateFrom + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if (search.DateToEn)
            edt = Date.parseDate(search.DateTo + " 23:59:59", 'd.m.Y H:i:s');
        var journal = null;
        if (search.Journal != "")
            journal = search.Journal;
        var address = search.Address;
        var flat = Number(search.Flat);

        var hdr = 'Перечень повторных заявок';
        if (journal != null)
            hdr += ' по журналу ' + journal.Name;
        hdr += '<br /> от жильцов по адресу ' + address.AddressStr;
        if (flat != null)
            hdr += ',кв.' + flat;
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy")
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy")

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 35%">Содержание заявки</th>';
        str += '<th style="width : 30%">Произведенные работы</th>';
        str += '<th style="width : 15%">Дата и время поступления</th>';
        str += '<th style="width : 15%">Дата и время закрытия</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 35%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 30%">' + (claim.IsLegate ? claim.Typework : '') + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + (claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printResidentClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень заявок';
        hdr += '<br />от жильцов по адресу ' + getCurrentUserAddress();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getCommonClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 10%">Рег. номер</th>';
        str += '<th style="width : 50%">Содержание заявки</th>';
        str += '<th style="width : 20%">Дата и время поступления</th>';
        str += '<th style="width : 20%">Статус</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 10%">' + claim.RegNumber + '</td>';
        str += '<td style="width : 50%">' + claim.CommonFailureStr + '</td>';
        str += '<td style="width : 20%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 20%">' + (claim.IsLegate ? 'Выполнена' : (claim.IsSubmission ? 'Передана на исп.' : 'Принята')) + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

//----------------------------------------------------------------------------
// ОТЧЕТЫ ПО ЛИФТОВЫМ ЗАЯВКАМ

function printBreakLiftClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень отключенных лифтов';
        if (getDispId () > 0)
            hdr += ',<br />по ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getLiftClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 25%">Адрес</th>';
        str += '<th style="width : 10%">Подъезд</th>';
        str += '<th style="width : 10%">Тип</th>';
        str += '<th style="width : 25%">Неисправность</th>';
        str += '<th style="width : 15%">Дата отключения</th>';
        str += '<th style="width : 10%">Часы простоя</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 25%">' + claim.Address.AddressStr + '</td>';
        str += '<td style="width : 10%">' + ((claim.Doorway != null) && (claim.Doorway > 0) ? claim.Doorway : '') + '</td>';
        str += '<td style="width : 10%">' + getLiftType(claim.LiftType) + '</td>';
        str += '<td style="width : 25%">' + claim.LiftFailureStr + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 10%">' + Date.dateDiff("h", claim.ReceivedTime, claim.IsLegate ? claim.ExecutedTime : new Date()) + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printLiftClaims() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#lift_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#lift_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var address = $("#lift_claims_filter_address").data("object");
        var doorway = $("#lift_claims_filter_doorway").val().trim();
        if (doorway != "")
            doorway = Number(doorway);
        else
            doorway = null;

        var hdr = 'Перечень отключенных лифтов';
        if (address == null) {
            if (getDispId () > 0)
                hdr += ',<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
            else
                hdr += '<br />по району ' + getRegionName ();
        }
        if (address) {
            hdr += '<br /> по адресу ' + address.AddressStr;
            if (doorway != null)
                hdr += ',п.' + doorway;
        }
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");

        return hdr;
    });

    var startDate = null;
    if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
        startDate = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');

    var endDate = null;
    if ($("#lift_claims_filter_date_to_checkbox").is(':checked')) {
        endDate = Date.parseDate($("#lift_claims_filter_date_to").val() + " 23:59:59", 'd.m.Y H:i:s');
        if (Date.dateDiff("s", new Date(), endDate) > 0)
            endDate = new Date();
    }

    html += getLiftClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Адрес</th>';
        str += '<th style="width : 5%">Подъезд</th>';
        str += '<th style="width : 10%">Тип</th>';
        str += '<th style="width : 20%">Неисправность</th>';
        str += '<th style="width : 10%">Дата отключения</th>';
        str += '<th style="width : 10%">Дата включения</th>';
        str += '<th style="width : 15%">Причина</th>';
        str += '<th style="width : 15%">Произведенные работы</th>';
        str += '<th style="width : 5%">Часы простоя</th>';

        return str;

    }, function (r, claim) {
        var ndt = null;
        if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        if ((ndt == null) || (Date.dateDiff("s", ndt, claim.ReceivedTime) > 0))
            ndt = claim.ReceivedTime;

        var edt = null;
        if ($("#lift_claims_filter_date_to_checkbox").is(':checked')) {
            edt = Date.parseDate($("#lift_claims_filter_date_to").val() + " 23:59:59", 'd.m.Y H:i:s');
            if (Date.dateDiff("s", new Date(), edt) > 0)
                edt = new Date();
        }
        if ((edt == null) || (Date.dateDiff("s", edt, claim.IsLegate ? claim.ExecutedTime : new Date()) < 0))
            edt = claim.IsLegate ? claim.ExecutedTime : new Date();

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + claim.Address.AddressStr + '</td>';
        str += '<td style="width : 5%">' + ((claim.Doorway != null) && (claim.Doorway > 0) ? claim.Doorway : '') + '</td>';
        str += '<td style="width : 10%">' + getLiftType(claim.LiftType) + '</td>';
        str += '<td style="width : 20%">' + claim.LiftFailureStr + '</td>';
        str += '<td style="width : 10%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 10%">' + (claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 15%">' + (claim.IsLegate ? claim.Reason : '') + '</td>';
        str += '<td style="width : 15%">' + (claim.IsLegate ? claim.Typework : '') + '</td>';
        str += '<td style="width : 5%">' + (claim.IsStay ? Date.dateDiff("h", ndt, edt) : 0) + '</td>';

        return str;
    }, startDate, endDate);

    html += getSignatureHtml();

    $(html).printArea();
}

function printCurrentJamLiftClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень застреваний в лифтах';
        if (getDispId () > 0)
            hdr += ',<br />по ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getLiftClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 50%">Адрес</th>';
        str += '<th style="width : 10%">Подъезд</th>';
        str += '<th style="width : 10%">Тип</th>';
        str += '<th style="width : 15%">Дата застревания</th>';
        str += '<th style="width : 10%">Часы простоя</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 50%">' + claim.Address.AddressStr + '</td>';
        str += '<td style="width : 10%">' + ((claim.Doorway != null) && (claim.Doorway > 0) ? claim.Doorway : '') + '</td>';
        str += '<td style="width : 10%">' + getLiftType(claim.LiftType) + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 10%">' + Date.dateDiff("h", claim.ReceivedTime, claim.IsLegate ? claim.ExecutedTime : new Date()) + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printJamLiftClaims() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#lift_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#lift_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var address = $("#lift_claims_filter_address").data("object");
        var doorway = $("#lift_claims_filter_doorway").val().trim();
        if (doorway != "")
            doorway = Number(doorway);
        else
            doorway = null;

        var hdr = 'Перечень застреваний в лифтах';
        if (address == null) {
            if (getDispId () > 0)
                hdr += ',<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
            else
                hdr += '<br />по району ' + getRegionName ();
        }
        if (address) {
            hdr += '<br /> по адресу ' + address.AddressStr;
            if (doorway != null)
                hdr += ',п.' + doorway;
        }
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");

        return hdr;
    });

    var startDate = null;
    if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
        startDate = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');

    var endDate = null;
    if ($("#lift_claims_filter_date_to_checkbox").is(':checked')) {
        endDate = Date.parseDate($("#lift_claims_filter_date_to").val() + " 23:59:59", 'd.m.Y H:i:s');
        if (Date.dateDiff("s", new Date(), endDate) > 0)
            endDate = new Date();
    }

    html += getLiftClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 35%">Адрес</th>';
        str += '<th style="width : 10%">Подъезд</th>';
        str += '<th style="width : 10%">Тип</th>';
        str += '<th style="width : 15%">Дата застревания</th>';
        str += '<th style="width : 15%">Дата извлечения</th>';
        str += '<th style="width : 10%">Часы простоя</th>';

        return str;

    }, function (r, claim) {
        var ndt = null;
        if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        if ((ndt == null) || (Date.dateDiff("s", ndt, claim.ReceivedTime) > 0))
            ndt = claim.ReceivedTime;

        var edt = null;
        if ($("#lift_claims_filter_date_to_checkbox").is(':checked')) {
            edt = Date.parseDate($("#lift_claims_filter_date_to").val() + " 23:59:59", 'd.m.Y H:i:s');
            if (Date.dateDiff("s", new Date(), edt) > 0)
                edt = new Date();
        }
        if ((edt == null) || (Date.dateDiff("s", edt, claim.IsLegate ? claim.ExecutedTime : new Date()) < 0))
            edt = claim.IsLegate ? claim.ExecutedTime : new Date();

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 35%">' + claim.Address.AddressStr + '</td>';
        str += '<td style="width : 10%">' + ((claim.Doorway != null) && (claim.Doorway > 0) ? claim.Doorway : '') + '</td>';
        str += '<td style="width : 10%">' + getLiftType(claim.LiftType) + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + (claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + (claim.isStay ? Date.dateDiff("h", ndt, edt) : 0) + '</td>';

        return str;
    }, startDate, endDate);

    html += getSignatureHtml();

    $(html).printArea();
}

function printUnlegateExecutedLiftClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень выполненных, но не отписанных заявок по лифтам';
        if (getDispId () > 0)
            hdr += ',<br />по ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getLiftClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 50%">Адрес</th>';
        str += '<th style="width : 10%">Подъезд</th>';
        str += '<th style="width : 10%">Тип</th>';
        str += '<th style="width : 15%">Дата отключения</th>';
        str += '<th style="width : 10%">Часы простоя</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 50%">' + claim.Address.AddressStr + '</td>';
        str += '<td style="width : 10%">' + ((claim.Doorway != null) && (claim.Doorway > 0) ? claim.Doorway : '') + '</td>';
        str += '<td style="width : 10%">' + getLiftType(claim.LiftType) + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 10%">' + Date.dateDiff("h", claim.ReceivedTime, claim.IsLegate ? claim.ExecutedTime : new Date()) + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

//----------------------------------------------------------------------------
// ОТЧЕТЫ ПО ОТКЛЮЧЕНИЯМ

function printCurrentCessationClaims() {
    var html = getHeaderHtml(function () {
        var dt = new Date();

        var hdr = 'Перечень действующих отключений';
        if (getDispId () > 0)
            hdr += ',<br />по ОДС' + getDispName () + ' района ' + getRegionName () + ',';
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getCessationClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 10%">Что отключено</th>';
        str += '<th style="width : 15%">Причина отключения</th>';
        str += '<th style="width : 15%">Объекты</th>';
        str += '<th style="width : 10%">Кол-во квартир</th>';
        str += '<th style="width : 15%">Организация</th>';
        str += '<th style="width : 15%">Время отключения</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 20%">' + claim.AddressStr + '</td>';
        str += '<td style="width : 10%">' + getCessationObject(claim.CessationObject) + '</td>';
        str += '<td style="width : 15%">' + claim.Reason + '</td>';
        str += '<td style="width : 15%">' + getCessationObjectsStr(claim.ObjectType, claim.ObjectsCount) + '</td>';
        str += '<td style="width : 10%">' + ((claim.FlatsCount != null) ? claim.FlatsCount : '') + '</td>';
        str += '<td style="width : 15%">' + claim.OrgName + '</td>';
        str += '<td style="width : 15%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printCessationClaims() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#cessation_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#cessation_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date ();
        if ($("#cessation_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#cessation_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Перечень отключений';
        if (getDispId () > 0)
            hdr += ',<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");

        return hdr;
    });

    html += getCessationClaimsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 10%">Что отключено</th>';
        str += '<th style="width : 15%">Причина отключения</th>';
        str += '<th style="width : 10%">Объекты</th>';
        str += '<th style="width : 10%">Кол-во квартир</th>';
        str += '<th style="width : 15%">Организация</th>';
        str += '<th style="width : 10%">Время отключения</th>';
        str += '<th style="width : 10%">Время включения</th>';

        return str;

    }, function (r, claim) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 20%">' + claim.AddressStr + '</td>';
        str += '<td style="width : 10%">' + getCessationObject(claim.CessationObject) + '</td>';
        str += '<td style="width : 15%">' + claim.Reason + '</td>';
        str += '<td style="width : 10%">' + getCessationObjectsStr(claim.ObjectType, claim.ObjectsCount) + '</td>';
        str += '<td style="width : 10%">' + ((claim.FlatsCount != null) ? claim.FlatsCount : '') + '</td>';
        str += '<td style="width : 15%">' + claim.OrgName + '</td>';
        str += '<td style="width : 10%">' + claim.ReceivedTime.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 10%">' + claim.ExecutedTime.format("dd.MM.yyyy HH:mm") + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

//----------------------------------------------------------------------------
// ОТЧЕТЫ ПО ПОВТОРНЫМ АДРЕСАМ

function printRepeatFlats() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#repeat_flats_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#repeat_flats_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#repeat_flats_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#repeat_flats_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Перечень адресов с повторными заявками';
        if ((ndt != null) || (edt != null))
            hdr += ',<br />поступившими за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />на ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getRepeatFlatsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 50%">Адрес</th>';
        str += '<th style="width : 30%">Журнал</th>';
        str += '<th style="width : 15%">Кол-во повторов</th>';

        return str;

    }, function (r, flat) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 50%">' + flat.Address.AddressStr + (((flat.Number != null) && (flat.Number > 0)) ? ',кв.' + flat.Number : '') + '</td>';
        str += '<td style="width : 30%">' + flat.Journal.Name + '</td>';
        str += '<td style="width : 15%">' + flat.RepeatsCount + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

//----------------------------------------------------------------------------
// ОТЧЕТЫ ПО ОБЪЕКТАМ ИНЖЕНЕРНОГО ОБОРУДОВАНИЯ

function printTerms() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень терминалов';
        if (isbreak)
            hdr = 'Перечень неисправных терминалов';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 70%">Адрес</th>';
        str += '<th style="width : 25%">Время неисправности</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 70%">' + obj.Name + '</td>';
        str += '<td style="width : 25%">' + (obj.IsBreak ? obj.BreakTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printLifts() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;
        var isrevision = ($('input[name=elv-objects-filter]:checked').val() == 2) ? true : null;

        var hdr = 'Перечень лифтов';
        if (isbreak)
            hdr = 'Перечень неисправных лифтов';
        if (isrevision)
            hdr = 'Перечень лифтов на ревизии';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 50%">Адрес</th>';
        str += '<th style="width : 15%">Название</th>';
        str += '<th style="width : 15%">Время неисправности</th>';
        str += '<th style="width : 15%">Время постановки на ревизию</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 50%">' + obj.Address + '</td>';
        str += '<td style="width : 15%">' + obj.Name + '</td>';
        str += '<td style="width : 15%">' + (obj.IsBreak ? obj.BreakTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 15%">' + (obj.IsRevision ? obj.RevisionTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printHoists() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;
        var isrevision = ($('input[name=elv-objects-filter]:checked').val() == 2) ? true : null;

        var hdr = 'Перечень подъёмников';
        if (isbreak)
            hdr = 'Перечень неисправных подъёмников';
        if (isrevision)
            hdr = 'Перечень подъёмников на ревизии';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 50%">Адрес</th>';
        str += '<th style="width : 15%">Название</th>';
        str += '<th style="width : 15%">Время неисправности</th>';
        str += '<th style="width : 15%">Время постановки на ревизию</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 50%">' + obj.Address + '</td>';
        str += '<td style="width : 15%">' + obj.Name + '</td>';
        str += '<td style="width : 15%">' + (obj.IsBreak ? obj.BreakTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 15%">' + (obj.IsRevision ? obj.RevisionTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printDoors() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isopen = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень дверей';
        if (isopen)
            hdr = 'Перечень открытых дверей';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 45%">Адрес</th>';
        str += '<th style="width : 30%">Название</th>';
        str += '<th style="width : 20%">Время открытия</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 45%">' + obj.Address + '</td>';
        str += '<td style="width : 30%">' + obj.Name + '</td>';
        str += '<td style="width : 20%">' + (obj.IsOpen ? obj.OpenTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printFireSensors() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isalarm = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень пожарных датчиков';
        if (isalarm)
            hdr = 'Перечень активных тревог от пожарных датчиков';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 45%">Адрес</th>';
        str += '<th style="width : 30%">Название</th>';
        str += '<th style="width : 20%">Время срабатывания</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 45%">' + obj.Address + '</td>';
        str += '<td style="width : 30%">' + obj.Name + '</td>';
        str += '<td style="width : 20%">' + (obj.IsAlarm ? obj.AlarmTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printWaterSensors() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isalarm = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень датчиков затопления';
        if (isalarm)
            hdr = 'Перечень активных тревог от датчиков затопления';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 45%">Адрес</th>';
        str += '<th style="width : 30%">Название</th>';
        str += '<th style="width : 20%">Время срабатывания</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 45%">' + obj.Address + '</td>';
        str += '<td style="width : 30%">' + obj.Name + '</td>';
        str += '<td style="width : 20%">' + (obj.IsAlarm ? obj.AlarmTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printGasSensors() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isalarm = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень датчиков загазованности';
        if (isalarm)
            hdr = 'Перечень активных тревог от датчиков загазованности';
        if (getDispId() > 0)
            hdr += '<br />по ОДС ' + getDispName() + ' района ' + getRegionName();
        else
            hdr += '<br />по району ' + getRegionName();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 45%">Адрес</th>';
        str += '<th style="width : 30%">Название</th>';
        str += '<th style="width : 20%">Время срабатывания</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 45%">' + obj.Address + '</td>';
        str += '<td style="width : 30%">' + obj.Name + '</td>';
        str += '<td style="width : 20%">' + (obj.IsAlarm ? obj.AlarmTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printTeleControls() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isenable = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень щитовых';
        if (isenable)
            hdr = 'Перечень включенных щитовых';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 45%">Адрес</th>';
        str += '<th style="width : 30%">Название</th>';
        str += '<th style="width : 20%">Время включения</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 45%">' + obj.Address + '</td>';
        str += '<td style="width : 30%">' + obj.Name + '</td>';
        str += '<td style="width : 20%">' + (obj.IsEnable ? obj.EnableTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printChannels() {
    var html = getHeaderHtml(function () {
        var dt = new Date();
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var hdr = 'Перечень каналов ГГС';
        if (isbreak)
            hdr = 'Перечень неисправных каналов ГГС';
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();
        hdr += '<br />по состоянию на ' + dt.format("dd.MM.yyyy HH:mm");

        return hdr;
    });

    html += getElvObjectsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 45%">Адрес</th>';
        str += '<th style="width : 30%">Название</th>';
        str += '<th style="width : 20%">Время проверки</th>';

        return str;

    }, function (r, obj) {
        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 45%">' + obj.Address + '</td>';
        str += '<td style="width : 30%">' + obj.Name + '</td>';
        str += '<td style="width : 20%">' + ((obj.IsNoResponse || obj.IsErrorOn || obj.IsErrorOff || (obj.SignalLevel < obj.NormalLevel)) ? obj.CheckTime.format("dd.MM.yyyy HH:mm") : '') + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

//----------------------------------------------------------------------------
// ОТЧЕТЫ ПО СОБЫТИЯМ ИНЖЕНЕРНОГО ОБОРУДОВАНИЯ

function printTermEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date ();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о сбоях терминалов';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 15%">Длительность</th>';
        str += '<th style="width : 50%">Адрес</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 15%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 50%">' + event.Term.Name + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printLiftEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о простоях лифтов';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 10%">Название</th>';
        str += '<th style="width : 25%">Причина</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 20%">' + event.Lift.Address + '</td>';
        str += '<td style="width : 10%">' + event.Lift.Name + '</td>';
        str += '<td style="width : 25%">' + event.Reason + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printHoistEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о простоях подъемников';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 10%">Название</th>';
        str += '<th style="width : 25%">Причина</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 20%">' + event.Hoist.Address + '</td>';
        str += '<td style="width : 10%">' + event.Hoist.Name + '</td>';
        str += '<td style="width : 25%">' + event.Reason + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printDoorEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о вскрытиях дверей';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 35%">Адрес</th>';
        str += '<th style="width : 20%">Название</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 35%">' + event.Door.Address + '</td>';
        str += '<td style="width : 20%">' + event.Door.Name + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printFireSensorEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о срабатывании пожарных датчиков';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 35%">Адрес</th>';
        str += '<th style="width : 20%">Название</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 35%">' + event.FireSensor.Address + '</td>';
        str += '<td style="width : 20%">' + event.FireSensor.Name + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printWaterSensorEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о срабатывании датчиков затопления';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 35%">Адрес</th>';
        str += '<th style="width : 20%">Название</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 35%">' + event.WaterSensor.Address + '</td>';
        str += '<td style="width : 20%">' + event.WaterSensor.Name + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printGasSensorEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о срабатывании датчиков загазованности';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId() > 0)
            hdr += '<br />по ОДС ' + getDispName() + ' района ' + getRegionName();
        else
            hdr += '<br />по району ' + getRegionName();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 35%">Адрес</th>';
        str += '<th style="width : 20%">Название</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 35%">' + event.GasSensor.Address + '</td>';
        str += '<td style="width : 20%">' + event.GasSensor.Name + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}

function printChannelEvents() {
    var html = getHeaderHtml(function () {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = new Date();
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var hdr = 'Отчет о сбоях каналов ГГС';
        if ((ndt != null) || (edt != null))
            hdr += '<br />за период';
        if (ndt != null)
            hdr += ' с ' + ndt.format("dd.MM.yyyy");
        if (edt != null)
            hdr += ' по ' + edt.format("dd.MM.yyyy");
        if (getDispId () > 0)
            hdr += '<br />по ОДС ' + getDispName () + ' района ' + getRegionName ();
        else
            hdr += '<br />по району ' + getRegionName ();

        return hdr;
    });

    html += getElvEventsTableHtml(window.oTable.fnGetData(), function () {
        var str = '<th style="width : 5%">№</th>';
        str += '<th style="width : 15%">Начало</th>';
        str += '<th style="width : 15%">Окончание</th>';
        str += '<th style="width : 10%">Длительность</th>';
        str += '<th style="width : 20%">Адрес</th>';
        str += '<th style="width : 10%">Название</th>';
        str += '<th style="width : 25%">Причина</th>';

        return str;

    }, function (r, event) {
        var minutes = Date.dateDiff("n", event.StartDate, event.EndDate);
        var hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        var str = '<td style="width : 5%">' + r + '</td>';
        str += '<td style="width : 15%">' + event.StartDate.format("dd.MM.yyyy HH:mm") + '</td>';
        str += '<td style="width : 15%">' + ((event.EndDate != null) ? event.EndDate.format("dd.MM.yyyy HH:mm") : '') + '</td>';
        str += '<td style="width : 10%">' + hours + ' : ' + minutes + '</td>';
        str += '<td style="width : 20%">' + event.Channel.Address + '</td>';
        str += '<td style="width : 10%">' + event.Channel.Name + '</td>';
        str += '<td style="width : 25%">' + event.Reason + '</td>';

        return str;
    });

    html += getSignatureHtml();

    $(html).printArea();
}


//----------------------------------------------------------------------------
// ТАБЛИЦЫ ОТЧЕТА

function getCommonClaimsTableHtml(claims, fnTableHeader, fnTableRow) {
    var html = '<div class="print-table">';
    html += '<table class="print-table-header">';
    html += '<thead>';
    html += fnTableHeader();
    html += '</thead>';
    html += '</table>';
    html += '<hr size="2" color="Black"/>';

    claims.sort(function (c1, c2) {
        if (c1.Disp.Name < c2.Disp.Name)
            return -1;
        if (c1.Disp.Name > c2.Disp.Name)
            return 1;

        if (c1.Journal.Name < c2.Journal.Name)
            return -1;
        if (c1.Journal.Name > c2.Journal.Name)
            return 1;

        if (c1.ReceivedTime < c2.ReceivedTime)
            return -1;
        if (c1.ReceivedTime > c2.ReceivedTime)
            return 1;

        return 0;
    });

    var dispChanged = (getDispId () <= 0), journalChanged = true;
    var dispCount = 0, journalCount = 0;


    for (var i = 0; i < claims.length; i++) {
        if (dispChanged) {
            dispCount = 0;

            html += '<div class="print-table-disp-header">';
            html += '<span>ОДС ' + claims[i].Disp.Name + '</span>';
            html += '<hr size="1" color="Black"/>';
            html += '</div>';
        }

        if (journalChanged) {
            journalCount = 0;

            html += '<div class="print-table-journal-header">';
            html += '<span>' + claims[i].Journal.Name + '</span>';
            html += '</div>';

            html += '<table class="print-table-data">';
        }

        dispCount++;
        journalCount++;

        html += '<tr>';
        html += fnTableRow(journalCount, claims[i]);
        html += '</tr>';

        dispChanged = (getDispId () <= 0) && ((i == claims.length - 1) || (claims[i].Disp.Name != claims[i + 1].Disp.Name));
        journalChanged = dispChanged || ((i == claims.length - 1) || (claims[i].Journal.Name != claims[i + 1].Journal.Name));

        if (journalChanged) {
            html += '</table>';
        }

        if (dispChanged) {
            html += '<div class="print-table-disp-total">';
            html += '<span>Всего по ОДС ' + claims[i].Disp.Name + ' заявок - ' + dispCount + '</span>';
            html += '<hr size="1" color="Black"/>';
            html += '</div>';
        }

    }

    html += '<div class="print-table-total">';
    html += '<span>Всего заявок - ' + claims.length + '</span>';
    html += '</div>';
    html += '<hr size="2" color="Black"/>';
    html += '</div>';

    return html;
}

function getLiftClaimsTableHtml(claims, fnTableHeader, fnTableRow, startDate, endDate) {
    var html = '<div class="print-table">';
    html += '<table class="print-table-header">';
    html += '<thead>';
    html += fnTableHeader();
    html += '</thead>';
    html += '</table>';
    html += '<hr size="2" color="Black"/>';

    claims.sort(function (c1, c2) {
        if (c1.Disp.Name < c2.Disp.Name)
            return -1;
        if (c1.Disp.Name > c2.Disp.Name)
            return 1;

        if (c1.ReceivedTime < c2.ReceivedTime)
            return -1;
        if (c1.ReceivedTime > c2.ReceivedTime)
            return 1;

        return 0;
    });

    var dispChanged = (getDispId () <= 0);
    var dispCount = 0, dispHours = 0, commonHours = 0;

    if (!dispChanged)
        html += '<table class="print-table-data">';
    for (var i = 0; i < claims.length; i++) {
        if (dispChanged) {
            dispCount = dispHours = 0;
            
            html += '<div class="print-table-disp-header">';
            html += '<span>ОДС ' + claims[i].Disp.Name + '</span>';
            html += '<hr size="1" color="Black"/>';
            html += '</div>';

            html += '<table class="print-table-data">';
        }

        var ndt = startDate;
        if ((ndt == null) || (Date.dateDiff("s", ndt, claims[i].ReceivedTime) > 0))
            ndt = claims[i].ReceivedTime;

        var edt = endDate;
        if ((edt == null) || (Date.dateDiff("s", edt, claims[i].IsLegate ? claims[i].ExecutedTime : new Date()) < 0))
            edt = claims[i].IsLegate ? claims[i].ExecutedTime : new Date();

        dispCount++;
        dispHours += claims[i].IsStay ? Date.dateDiff("h", ndt, edt) : 0;
        commonHours += claims[i].IsStay ? Date.dateDiff("h", ndt, edt) : 0;

        html += '<tr>';
        html += fnTableRow(dispCount, claims[i]);
        html += '</tr>';

        dispChanged = (getDispId () <= 0) && ((i == claims.length - 1) || (claims[i].Disp.Name != claims[i + 1].Disp.Name));

        if (dispChanged) {
            html += '</table>';

            html += '<div class="print-table-disp-total">';
            html += '<span>Всего по ОДС ' + claims[i].Disp.Name + ' часов простоя - ' + dispHours + '</span>';
            html += '<hr size="1" color="Black"/>';
            html += '</div>';
        }
    }
    if (!dispChanged)
        html += '</table>';

    html += '<div class="print-table-total">';
    html += '<span>Всего часов простоя - ' + commonHours + '</span>';
    html += '</div>';
    html += '<hr size="2" color="Black"/>';
    html += '</div>';

    return html;
}

function getCessationClaimsTableHtml(claims, fnTableHeader, fnTableRow) {
    var html = '<div class="print-table">';
    html += '<table class="print-table-header">';
    html += '<thead>';
    html += fnTableHeader();
    html += '</thead>';
    html += '</table>';
    html += '<hr size="2" color="Black"/>';


    claims.sort(function (c1, c2) {
        if (c1.Disp.Name < c2.Disp.Name)
            return -1;
        if (c1.Disp.Name > c2.Disp.Name)
            return 1;

        if (c1.ReceivedTime < c2.ReceivedTime)
            return -1;
        if (c1.ReceivedTime > c2.ReceivedTime)
            return 1;

        return 0;
    });

    var dispChanged = (getDispId () <= 0);
    var dispCount = 0, dispFlats = 0, commonFlats = 0;

    if (!dispChanged)
        html += '<table class="print-table-data">';
    for (var i = 0; i < claims.length; i++) {
        if (dispChanged) {
            dispCount = dispFlats = 0;

            html += '<div class="print-table-disp-header">';
            html += '<span>ОДС ' + claims[i].Disp.Name + '</span>';
            html += '<hr size="1" color="Black"/>';
            html += '</div>';

            html += '<table class="print-table-data">';
        }

        dispCount++;
        dispFlats += (claims[i].FlatsCount != null) ? claims[i].FlatsCount : 0;
        commonFlats += (claims[i].FlatsCount != null) ? claims[i].FlatsCount : 0;

        html += '<tr>';
        html += fnTableRow(dispCount, claims[i]);
        html += '</tr>';

        dispChanged = (getDispId () <= 0) && ((i == claims.length - 1) || (claims[i].Disp.Name != claims[i + 1].Disp.Name));

        if (dispChanged) {
            html += '</table>';

            html += '<div class="print-table-disp-total">';
            html += '<span>Всего по ОДС ' + claims[i].Disp.Name + ' отключено квартир - ' + dispFlats + '</span>';
            html += '<hr size="1" color="Black"/>';
            html += '</div>';
        }
    }
    if (!dispChanged)
        html += '</table>';

    html += '<div class="print-table-total">';
    html += '<span>Всего отключено квартир - ' + commonFlats + '</span>';
    html += '</div>';
    html += '<hr size="2" color="Black"/>';
    html += '</div>';

    return html;
}

function getRepeatFlatsTableHtml(flats, fnTableHeader, fnTableRow) {
    var html = '<div class="print-table">';
    html += '<table class="print-table-header">';
    html += '<thead>';
    html += fnTableHeader();
    html += '</thead>';
    html += '</table>';
    html += '<hr size="2" color="Black"/>';

    html += '<table class="print-table-data">';
    for (var i = 0; i < flats.length; i++) {
        html += '<tr>';
        html += fnTableRow(i + 1, flats[i]);
        html += '</tr>';
    }
    html += '</table>';

    html += '<div class="print-table-total">';
    html += '<span>Всего адресов - ' + flats.length + '</span>';
    html += '</div>';
    html += '<hr size="2" color="Black"/>';
    html += '</div>';

    return html;
}

function getElvObjectsTableHtml(objects, fnTableHeader, fnTableRow) {
    var html = '<div class="print-table">';
    html += '<table class="print-table-header">';
    html += '<thead>';
    html += fnTableHeader();
    html += '</thead>';
    html += '</table>';
    html += '<hr size="2" color="Black"/>';

    html += '<table class="print-table-data">';
    for (var i = 0; i < objects.length; i++) {
        html += '<tr>';
        html += fnTableRow(i + 1, objects[i]);
        html += '</tr>';
    }
    html += '</table>';

    html += '<div class="print-table-total">';
    html += '<span>Всего объектов - ' + objects.length + '</span>';
    html += '</div>';
    html += '<hr size="2" color="Black"/>';
    html += '</div>';

    return html;
}

function getElvEventsTableHtml(events, fnTableHeader, fnTableRow) {
    var html = '<div class="print-table">';
    html += '<table class="print-table-header">';
    html += '<thead>';
    html += fnTableHeader();
    html += '</thead>';
    html += '</table>';
    html += '<hr size="2" color="Black"/>';

    var commonMinutes = 0;

    html += '<table class="print-table-data">';
    for (var i = 0; i < events.length; i++) {
        html += '<tr>';
        html += fnTableRow(i + 1, events[i]);
        html += '</tr>';

        commonMinutes += Date.dateDiff("n", events[i].StartDate, events[i].EndDate);
    }
    html += '</table>';

    var hours = Math.floor(commonMinutes / 60);
    var minutes = commonMinutes - hours * 60;

    html += '<div class="print-table-total">';
    html += '<span>Общая длительность - ' + hours + ' : ' + minutes + '</span>';
    html += '</div>';
    html += '<hr size="2" color="Black"/>';
    html += '</div>';

    return html;
}

//----------------------------------------------------------------------------
// ЗАГОЛОВОК И ПОДПИСЬ ОТЧЕТА

function getHeaderHtml(fnHeader) {
    var html = '<div class="print-header"><p>';
    html += fnHeader();
    html += '</p></div>'

    return html;
}

function getSignatureHtml() {
    var html = '<div class="print-signature">';
    html += '<div class="print-signature-left">'
    html += '</div>'
    html += '<div class="print-signature-right">'
    html += '<span>' + getCurrentUserPost () + '_________________/' + getCurrentUserInitials() + '</span>';
    html += '</div>'
    html += '</div>'

    return html;
}


//----------------------------------------------------------------------------
// ИНФОРМАЦИЯ ПО ЗАЯВКЕ

function getCommonClaimInfoHtml(claim) {
    var address = claim.Address.AddressStr;
    if (claim.Flat != null)
        address += ", кв." + claim.Flat;

    var description = '';
    if (claim.Doorway != null)
        description += "подъезд №" + claim.Doorway;
    if (claim.Floor != null) {
        if (description != '')
            description += ", ";
        description += "этаж №" + claim.Floor;
    }
    if (claim.Phone != "") {
        if (description != '')
            description += ", ";
        description += "тел. " + claim.Phone;
    }
    if (description != "")
        address += " (" + description + ")";

    var html = '<div class="print-claim-control" >';
    html += getClaimPropertyHtml("Регистрационный номер", claim.RegNumber);
    html += getClaimPropertyHtml("Заявитель", claim.Owner);
    html += getClaimPropertyHtml("Адрес", address);
    html += getClaimPropertyHtml("Вид работ", claim.Journal.Name);
    html += getClaimPropertyHtml("Неисправность", claim.CommonFailureStr);
    html += getClaimPropertyHtml("Примечание", claim.CommonFailureComment);
    html += getClaimPropertyHtml("Отправлена", claim.SentTime.format("dd.MM.yyyy HH:mm"));
    html += getClaimPropertyHtml("Доставлена", (claim.Status >= 1) ? claim.DeliveredTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Принята в работу", (claim.Status >= 2) ? claim.ReceivedTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Диспетчер", (claim.Status >= 2) ? claim.ReceivedOperator : "");
    if (claim.IsLegate)
        html += getClaimPropertyHtml("Дата исполнения", claim.ExecutedTime.format("dd.MM.yyyy HH:mm"));
    else
        html += getClaimPropertyHtml("Дата исполнения", claim.ReceivedTime.addDays(claim.ExecutedPeriod).format("dd.MM.yyyy HH:mm"));
    html += getClaimPropertyHtml("Статус", getClaimStatus (claim));

    html += '<hr width="100%" size="1" color="Black"/>';

    html += '</div>';

    return html;
}

function getDispInfoHtml(disp) {
    var html = '<div class="print-claim-control" >';

    html += getClaimPropertyHtml("Название", "ОДС " + disp.Name + " по району \"" + disp.Region.Name + "\"");
    html += getClaimPropertyHtml("Адрес", disp.Address);
    html += getClaimPropertyHtml("Телефон", disp.Phone);

    html += '<hr width="100%" size="1" color="Black"/>';

    html += '</div>';

    return html;
}

//----------------------------------------------------------------------------
// ТЕЛО ОТЧЕТА ПО ЗАЯВКЕ

function getCommonClaimHtml(claim) {
    var address = claim.Address.AddressStr;
    if (claim.Flat != null)
        address += ", кв." + claim.Flat;

    var description = '';
    if (claim.Doorway != null)
        description += "подъезд №" + claim.Doorway;
    if (claim.Floor != null) {
        if (description != '')
            description += ", ";
        description += "этаж №" + claim.Floor;
    }
    if (claim.Phone != "") {
        if (description != '')
            description += ", ";
        description += "тел. " + claim.Phone;
    }
    if (description != "")
        address += " (" + description + ")";

    var isteam = "обычная";
    if (claim.IsTeam == 1)
        isteam = "бригадная";
    if (claim.IsTeam == 2)
        isteam = "аварийная";

    var result = "выполнена";
    if (!claim.IsLegate || claim.Result > 0)
        result = "не выполнена";

    var html = '<div class="print-claim-control" >';
    html += getClaimPropertyHtml("Регистрационный номер", claim.RegNumber);
    html += getClaimPropertyHtml("Адрес", address);
    if (claim.Owner != null)
        html += getClaimPropertyHtml("ФИО", claim.Owner);
    html += getClaimPropertyHtml("Неисправность", claim.CommonFailureStr + " (время выполнения " + claim.ExecutedPeriod + " " + getClaimPeriodDimension(claim.ExecutedPeriod) + ")");
    html += getClaimPropertyHtml("Примечание", claim.CommonFailureComment);
    html += getClaimPropertyHtml("Дата принятия", claim.ReceivedTime.format("dd.MM.yyyy HH:mm"));
    html += getClaimPropertyHtml("Диспетчер", claim.ReceivedOperator);

    html += '<hr width="100%" size="1" color="Black"/>';

    html += getClaimPropertyHtml("Передача на исполнение", claim.IsSubmission ? "передана" : "не передана");
    html += getClaimPropertyHtml("Организация", claim.IsSubmission ? claim.OrgName : "");
    html += getClaimPropertyHtml("Тип", claim.IsSubmission ? isteam : "");
    html += getClaimPropertyHtml("Дата", claim.IsSubmission ? claim.SubmissionTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Диспетчер", claim.IsSubmission ? claim.SubmissionOperator : "");

    html += '<hr size="1" color="Black"/>';

    html += getClaimPropertyHtml("Отметка о выполнении", result);
    html += getClaimPropertyHtml("Произведенные работы", claim.IsLegate ? claim.Typework : "");
    html += getClaimPropertyHtml("Исполнитель", claim.IsLegate ? claim.Executor : "");
    html += getClaimPropertyHtml("Дата", claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Диспетчер", claim.IsLegate ? claim.ExecutedOperator : "");

    html += '<hr size="1" color="Black"/>';
    html += '</div>';

    return html;
}

function getLiftClaimHtml(claim) {
    var address = claim.Address.AddressStr;
    if (claim.Doorway != null)
        address += ", п." + claim.Doorway;

    var result = "выполнена";
    if (!claim.IsLegate || claim.Result > 0)
        result = "не выполнена";

    var html = '<div class="print-claim-control" >';
    html += getClaimPropertyHtml("Регистрационный номер", claim.RegNumber);
    html += getClaimPropertyHtml("Адрес", address);
    html += getClaimPropertyHtml("Тип", getLiftType(claim.LiftType));
    html += getClaimPropertyHtml("Этаж", (claim.Floor != null) ? claim.Floor : '');
    html += getClaimPropertyHtml("Неисправность", claim.LiftFailureStr);
    html += getClaimPropertyHtml("Примечание", claim.LiftFailureComment);
    html += getClaimPropertyHtml("Дата принятия", claim.ReceivedTime.format("dd.MM.yyyy HH:mm"));
    html += getClaimPropertyHtml("Диспетчер", claim.ReceivedOperator);

    html += '<hr width="100%" size="1" color="Black"/>';

    html += getClaimPropertyHtml("Передача на исполнение", claim.IsSubmission ? "передана" : "не передана");
    html += getClaimPropertyHtml("Организация", claim.IsSubmission ? claim.OrgName : "");
    html += getClaimPropertyHtml("Дата", claim.IsSubmission ? claim.SubmissionTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Диспетчер", claim.IsSubmission ? claim.SubmissionOperator : "");

    html += '<hr size="1" color="Black"/>';

    html += getClaimPropertyHtml("Отметка о выполнении", result);
    html += getClaimPropertyHtml("Причина", claim.IsLegate ? claim.Reason : "");
    html += getClaimPropertyHtml("Произведенные работы", claim.IsLegate ? claim.Typework : "");
    html += getClaimPropertyHtml("Исполнитель", claim.IsLegate ? claim.Executor : "");
    html += getClaimPropertyHtml("Дата", claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Диспетчер", claim.IsLegate ? claim.ExecutedOperator : "");

    html += '<hr size="1" color="Black"/>';
    html += '</div>';

    return html;
}

function getCessationClaimHtml(claim) {
    var address = claim.AddressStr;
    if (claim.Abonent != "")
        address += " (" + claim.Abonent + ")";

    var html = '<div class="print-claim-control" >';
    html += getClaimPropertyHtml("Регистрационный номер", claim.RegNumber);
    html += getClaimPropertyHtml("Адрес", address);
    html += getClaimPropertyHtml("Объект отключения", getCessationObject(claim.CessationObject));
    html += getClaimPropertyHtml("Причина", claim.Reason);
    html += getClaimPropertyHtml("Объекты", getCessationObjectsStr(claim.ObjectType, claim.ObjectsCount));
    html += getClaimPropertyHtml("Кол-во квартир", (claim.FlatsCount != null) ? claim.FlatsCount : '');
    html += getClaimPropertyHtml("Инициатор", claim.Applicant);
    html += getClaimPropertyHtml("Основание", claim.Basis);
    html += getClaimPropertyHtml("Организация", claim.OrgName);
    html += getClaimPropertyHtml("Дата выключения", claim.ReceivedTime.format("dd.MM.yyyy HH:mm"));
    html += getClaimPropertyHtml("Диспетчер", claim.ReceivedOperator);

    html += '<hr size="1" color="Black"/>';

    html += getClaimPropertyHtml("Отметка о выполнении", claim.IsLegate ? "включено" : "не включено");
    html += getClaimPropertyHtml("Дата включения", claim.IsLegate ? claim.ExecutedTime.format("dd.MM.yyyy HH:mm") : "");
    html += getClaimPropertyHtml("Диспетчер", claim.IsLegate ? claim.ExecutedOperator : "");

    html += '<hr size="1" color="Black"/>';
    html += '</div>';

    return html;
}

function getClaimPropertyHtml(name, value) {
    var html = '<div class="print-claim-property">';
    html += '<span class="print-claim-property-name" >' + name + ': ' + '</span>';
    html += '<span class="print-claim-property-value">' + value + '</span>';
    html += '</div>';

    return html;
}