//----------------------------------------------------------------------------
// ИНИЦИАЛИЗАЦИЯ ТАБЛИЦЫ

function initDataTable() {
    $.fn.dataTableExt.oApi.fnReloadAjax = function (oSettings, sNewSource, fnCallback, bStandingRedraw) {
        if (typeof sNewSource != 'undefined' && sNewSource != null) {
            oSettings.sAjaxSource = sNewSource;
        }

        // Server-side processing should just call fnDraw
        if (oSettings.oFeatures.bServerSide) {
            this.fnDraw();
            return;
        }

        this.oApi._fnProcessingDisplay(oSettings, true);
        var that = this;
        var iStart = oSettings._iDisplayStart;
        var aData = [];

        this.oApi._fnServerParams(oSettings, aData);

        oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aData, function (json) {
            /* Clear the old information from the table */
            that.oApi._fnClearTable(oSettings);

            /* Got the data - add it to the table */
            var aData = (oSettings.sAjaxDataProp !== "") ?
                    that.oApi._fnGetObjectDataFn(oSettings.sAjaxDataProp)(json) : json;

            for (var i = 0; i < aData.length; i++) {
                that.oApi._fnAddData(oSettings, aData[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

            if (typeof bStandingRedraw != 'undefined' && bStandingRedraw === true) {
                oSettings._iDisplayStart = iStart;
                that.fnDraw(false);
            }
            else {
                that.fnDraw();
            }

            that.oApi._fnProcessingDisplay(oSettings, false);

            /* Callback user function - for event handlers etc */
            if (typeof fnCallback == 'function' && fnCallback != null) {
                fnCallback(oSettings);
            }
        }, oSettings);
    };

    $.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
    {
        return {
            "iStart":         oSettings._iDisplayStart,
            "iEnd":           oSettings.fnDisplayEnd(),
            "iLength":        oSettings._iDisplayLength,
            "iTotal":         oSettings.fnRecordsTotal(),
            "iFilteredTotal": oSettings.fnRecordsDisplay(),
            "iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
            "iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
        };
    }

    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "date-euro-pre": function (a) {
            return Date.parseDate(a, 'd.m.Y H:i');
        },

        "date-euro-asc": function (a, b) {
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        },

        "date-euro-desc": function (a, b) {
            return (b < a) ? -1 : ((b > a) ? 1 : 0);
        }
    });

    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "checkbox-pre": function (a) {
            if (a.indexOf("checked") < 0)
                return 0;
            return 1;
        },

        "checkbox-asc": function (a, b) {
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        },

        "checkbox-desc": function (a, b) {
            return (b < a) ? -1 : ((b > a) ? 1 : 0);
        }
    });

    $.fn.dataTableExt.oJUIClasses.sWrapper = "dataTables_wrapper jquery-ui-cupertino";

    $.extend($.fn.dataTable.defaults, {
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "iDisplayLength": 15,
        "aaSorting": [],
        "bStateSave": false,
        "bProcessing": true,
        "bServerSide": false
    });

    $.extend($.fn.dataTable.defaults.oLanguage, {
        "sEmptyTable": "Заявки отсутствуют",
        "sLoadingRecords" : "Загрузка...",
    ﻿	"sProcessing":   "Загрузка...",
	    "sLengthMenu":   "Показать _MENU_ заявок",
	    "sZeroRecords":  "Ничего не найдено",
	    "sInfo":         "Заявки с _START_ до _END_ из _TOTAL_ заявок",
	    "sInfoEmpty":    "Заявки с 0 до 0 из 0 заявок",
	    "sInfoFiltered": "(отфильтровано из _MAX_ заявок)",
	    "sInfoPostFix":  "",
	    "sSearch":       "Поиск:",
	    "sUrl":          "",
	    "oPaginate": {
		    "sFirst": "Начало",
		    "sPrevious": "Пред",
		    "sNext": "След",
		    "sLast": "Конец"
	    }
    });
    $("#data_table").on("page", function () {
        if (window.settingDataTablePage)
            return;
        pushHistoryState ();
    });
}

//----------------------------------------------------------------------------
// ДИАЛОГИ

function initUsersTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Users.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Имя пользователя",
                "mData": "Username",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "ФИО",
                "mData": function (user, type, val ) {
                    var value = user.Surname;
                    if (user.Name != "")
                        value += " " + user.Name;
                    if (user.Fathername != "")
                        value += " " + user.Fathername;
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Должность",
                "mData": "Post",
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (user, type, val ) {
                    if (user.Address == null)
                        return "";

                    var value = user.Address.Region.City.Name;
                    value += ", " + user.Address.Name;
                    if ((user.Flat != null) && (user.Flat > 0))
                        value += ", кв." + user.Flat.toString();
                    return value;
                }, 
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Группа",
                "mData": function (user, type, val ) {
                    return getUserGroup (user);
                }, 
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Активирован",
                "mData": "IsActivated",
                "mRender" : function (data, type, full) {
                    var str =  '<input type="checkbox" disabled="disabled"';
                    if (data)
                        str += 'checked="checked"';
                    str += '></input>';
                    return str;
                },
                "sType": "checkbox",
                "aTargets": [ "_all" ],
                "sClass" : "align-center",
                "sWidth" : "10%" 
            },
            {
                "mData": function (user, type, val ) {
                    if (canEditUser (user) && (user.Username != getCurrentUserUsername()))
                        return '<input type="image" onclick="return onUserDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : true
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onUserEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            },
            {
                "mData": function (user, type, val ) {
                    if (isUserAdministrator(user) || isUserCustomer(user))
                        return '<input type="image" onclick="return onUserRulesBtnClick(this);" src="/Images/permissions.png" title="Права пользователя">'
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : true
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Пользователи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Пользователи не найдены",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.UsersWebService();
        service.GetUsers(function (users) {
            if (users == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": users }
            fnCallback(data);
        }, serviceError);
    };
 
    $(".data-table-toolbar").html('<input type="button" id="data_table_create_button" value="Создать пользователя" title="Создать пользователя"/>');
    $("#data_table_create_button").click (function () {
         onUserCreateBtnClick();
        return false;
    });
}

function initServersTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Servers.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "№",
                "mData": "Id",
                "sWidth" : "10%", 
                "sClass": "align-center"
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Сервис заявок",
                "mData": "Horizont.Claims.Service",
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Сервис инженерного оборудования",
                "mData": "Horizont.Elv.Service",
                "sWidth" : "35%" 
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onServerDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">'
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onServerEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Сервера отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Сервера не найдены",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetServers(function (servers) {
            if (servers == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": servers }
            fnCallback(data);
        }, serviceError);
    };
 
    $(".data-table-toolbar").html('<input type="button" id="data_table_create_button" value="Создать сервер" title="Создать сервер"/>');
    $("#data_table_create_button").click (function () {
         onServerCreateBtnClick();
        return false;
    });
}

function initCitiesTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Cities.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "№",
                "mData": "Id",
                "sWidth" : "10%", 
                "sClass": "align-center"
            },
            { 
                "sTitle" : "Название города",
                "mData": "Name",
                "sWidth" : "90%" 
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCityDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">'
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCityEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Города отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Города не найдены",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetCities(function (cities) {
            if (cities == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": cities }
            fnCallback(data);
        }, serviceError);
    };
 
    $(".data-table-toolbar").html('<input type="button" id="data_table_create_button" value="Создать город" title="Создать город"/>');
    $("#data_table_create_button").click (function () {
         onCityCreateBtnClick();
        return false;
    });
}

function initRegionsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Regions.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "№",
                "mData": "Id",
                "sWidth" : "10%", 
                "sClass": "align-center"
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Город",
                "mData": "City.Name",
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Сервер",
                "mData": "Server.Name",
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Локальный номер",
                "mData": "LocalId",
                "sWidth" : "15%", 
                "sClass": "align-center"
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onRegionDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">'
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onRegionEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Районы отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Районы не найдены",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetRegions(null, function (regions) {
            if (regions == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": regions }
            fnCallback(data);
        }, serviceError);
    };
 
    $(".data-table-toolbar").html('<input type="button" id="data_table_create_button" value="Создать район" title="Создать район"/>');
    $("#data_table_create_button").click (function () {
         onRegionCreateBtnClick();
        return false;
    });
}

function initAddressesTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Addresses.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "№",
                "mData": "Id",
                "sWidth" : "10%", 
                "sClass": "align-center"
            },
            { 
                "sTitle" : "Адрес",
                "mData": "Name",
                "sWidth" : "40%" 
            },
            { 
                "sTitle" : "Город",
                "mData": "Region.City.Name",
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Район",
                "mData": "Region.Name",
                "sWidth" : "25%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Адреса отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Адреса не найдены",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetAddresses(null, "", function (addresses) {
            if (addresses == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": addresses }
            fnCallback(data);
        }, serviceError);
    };
 
    $(".data-table-toolbar").html('<input type="button" id="data-table-sync-button" value="Синхронизировать" title="Синхронизировать"/>');
    $("#data-table-sync-button").click (function () {
        loading (true, 500);
        var service = new Horizont.Web.RegionsWebService();
        service.SyncAddresses(function (ret) {
            loading (false);
            if (ret) {
                successToast("Адреса успешно синхронизированы");
                updateDataTable();
            }
            else
                serviceError();
        }, serviceError);

        return false;
    });
}

function initUnexecutedClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "UnexecutedClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Передано на исп.",
                "mData": "IsSubmission",
                "mRender" : function (data, type, full) {
                    var str =  '<input type="checkbox" disabled="disabled"';
                    if (data)
                        str += 'checked="checked"';
                    str += '></input>';
                    return str;
                },
                "sType": "checkbox",
                "aTargets": [ "_all" ],
                "sClass" : "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Дата получения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetUnexecutedClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printUnexecutedClaims ();
        return false;
    });
}

function initOverdueClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "OverdueClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Передано на исп.",
                "mData": "IsSubmission",
                "mRender" : function (data, type, full) {
                    var str =  '<input type="checkbox" disabled="disabled"';
                    if (data)
                        str += 'checked="checked"';
                    str += '></input>';
                    return str;
                },
                "sType": "checkbox",
                "aTargets": [ "_all" ],
                "sClass" : "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Дата получения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetOverdueClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printOverdueClaims ();
        return false;
    });
}

function initLegateUnexecutedClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "LegateUnexecutedClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "40%" 
            },
            { 
                "sTitle" : "Дата получения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetLegateUnexecutedClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printLegateUnexecutedClaims ();
        return false;
    });
}

function initCommonClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "CommonClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Рег.\nномер",
                "mData": "RegNumber",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "18%" 
            },
            { 
                "sTitle" : "Дата получения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "17%" 
            },
            { 
                "sTitle" : "Произведенные работы",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.Typework;
                }, 
                "sWidth" : "17%" 
            },
            { 
                "sTitle" : "Дата закрытия",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "19%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var regnumber = $("#common_claims_filter_regnumber").val();
        var ndt = null;
        if ($("#common_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#common_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#common_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#common_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var journal = $("#common_claims_filter_journal").data("object");
        var address = $("#common_claims_filter_address").data("object");
        var doorway = $("#common_claims_filter_doorway").val().trim();
        if (doorway != "")
            doorway = Number(doorway);
        else
            doorway = null;
        var flat = $("#common_claims_filter_flat").val().trim();
        if (flat != "")
            flat = Number(flat);
        else
            flat = null;

        var service = new Horizont.Web.ClaimsWebService();
        service.GetCommonClaims(ndt, edt, journal, address, doorway, flat, regnumber, getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printCommonClaims ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        commonClaimsFilterDlg();
        return false;
    });
}

function initBrigadeClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "BrigadeClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "25%" 
            },
			{ 
                "sTitle" : "Время\nвыполнения",
                "mData": function (claim, type, val ) {
                    if (claim.IsLegate)
                        return Date.dateDiff("d", claim.ReceivedTime, claim.ExecutedTime);
                    return Date.dateDiff("d", claim.ReceivedTime, new Date());
                }, 
                "sClass" : "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Организация",
                "mData": "OrgName", 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Дата\nполучения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Дата\nзакрытия",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#date_span_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#date_span_filter_date_from").val().trim() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#date_span_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#date_span_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var service = new Horizont.Web.ClaimsWebService();
        service.GetBrigadeClaims(ndt, edt, getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printBrigadeClaims ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        dateSpanFilterDlg();
        return false;
    });
}

function initDamageClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "DamageClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Дата получения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Произведенные работы",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.Typework;
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Дата закрытия",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#date_span_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#date_span_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#date_span_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#date_span_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');

        var service = new Horizont.Web.ClaimsWebService();
        service.GetDamageClaims(ndt, edt, getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printDamageClaims ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        dateSpanFilterDlg();
        return false;
    });
}

function initRepeatFlatsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "RepeatFlats.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": function (flat, type, val ) {
                    var value = flat.Address.AddressStr;
                    if ((flat.Number != null) && (flat.Number > 0))
                        value += ", кв." + flat.Number.toString();
                    return value;
                }, 
                "sWidth" : "60%" 
            },
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Кол-во повторов",
                "mData": "RepeatsCount",
                "sClass" : "align-center",
                "sType" : "numeric",
                "sWidth" : "10%" 
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onRepeatClaimsBtnClick(this);" src="/Images/edit.png" title="Показать заявки">'
            }
        ], 
        "oLanguage" :
        {
            "sEmptyTable": "Адреса отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ адресов",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Адреса с _START_ до _END_ из _TOTAL_ адресов",
	        "sInfoEmpty":    "Адреса с 0 до 0 из 0 адресов",
	        "sInfoFiltered": "(отфильтровано из _MAX_ адресов)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });
    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#repeat_flats_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#repeat_flats_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#repeat_flats_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#repeat_flats_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var journal = $("#repeat_flats_filter_journal").data("object");
		var minrepeatscount = Number ($("#repeat_flats_filter_minrepeatscount").val());

        var service = new Horizont.Web.ClaimsWebService();
        service.GetRepeatFlats(ndt, edt, journal, minrepeatscount, getRegionId (), getDispId (), function (flats) {
            if (flats == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": flats }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printRepeatFlats ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        repeatFlatsFilterDlg();
        return false;
    });
}

function initRepeatClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "RepeatClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Рег.\nномер",
                "mData": "RegNumber",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Журнал",
                "mData": "Journal.Name",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Flat != null) && (claim.Flat > 0))
                        value += ", кв." + claim.Flat.toString();
                    return value;
                }, 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "18%" 
            },
            { 
                "sTitle" : "Дата получения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "17%" 
            },
            { 
                "sTitle" : "Произведенные работы",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.Typework;
                }, 
                "sWidth" : "17%" 
            },
            { 
                "sTitle" : "Дата закрытия",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "19%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCommonClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });


    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var search = $.deparam (location.search.substring(1), true);

        if (search.DateFromEn)
            search.DateFrom = Date.parseDate(search.DateFrom + " 00:00:00", 'd.m.Y H:i:s');
		else 
			search.DateFrom = null;
        if (search.DateToEn)
            search.DateTo = Date.parseDate(search.DateTo + " 23:59:59", 'd.m.Y H:i:s');
		else
			search.DateTo = null;
		if (search.Journal == "")
			search.Journal = null;
		if (search.Address == "")
			search.Address = null;
        search.Flat = Number (search.Flat);

        var service = new Horizont.Web.ClaimsWebService();
        service.GetCommonClaims(search.DateFrom, search.DateTo, search.Journal, search.Address, null, search.Flat, "", getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printRepeatClaims ();
        return false;
    });
}

function initLiftClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "LiftClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Рег.\nномер",
                "mData": "RegNumber",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Doorway != null) && (claim.Doorway > 0))
                        value += ", п." + claim.Doorway.toString();
                    return value;
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Тип",
                "mData": function (claim, type, val ) {
                    return getLiftType (claim.LiftType);
                }, 
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "LiftFailureStr", 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Дата выключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Дата включения",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Простой",
                "mData": function (claim, type, val ) {
					var ndt = null;
					if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
						ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
					if ((ndt == null) || (Date.dateDiff("s", ndt, claim.ReceivedTime) > 0))
						ndt = claim.ReceivedTime;
					
					var edt = null;
					if ($("#lift_claims_filter_date_to_checkbox").is(':checked')) {
						edt = Date.parseDate($("#lift_claims_filter_date_to").val() + " 23:59:59", 'd.m.Y H:i:s');
                        if (Date.dateDiff ("s", new Date(), edt) > 0)
                            edt = new Date ();
                    }
					if ((edt == null) || (Date.dateDiff("s", edt, claim.IsLegate ? claim.ExecutedTime : new Date ()) < 0))
						edt = claim.IsLegate ? claim.ExecutedTime : new Date ();

					var minutes = Date.dateDiff ("n", ndt, edt);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "5%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onLiftClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onLiftClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var regnumber = $("#lift_claims_filter_regnumber").val();
        var ndt = null;
        if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#lift_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#lift_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var address = $("#lift_claims_filter_address").data("object");
        var doorway = $("#lift_claims_filter_doorway").val().trim();
        if (doorway != "")
            doorway = Number(doorway);
        else
            doorway = null;
        var minstaytime = $("#lift_claims_filter_minstaytime").val().trim();
        if (minstaytime != "")
            minstaytime = Number(minstaytime);
        else
            minstaytime = null;

        var service = new Horizont.Web.ClaimsWebService();
        service.GetLiftClaims(ndt, edt, address, doorway, regnumber, minstaytime, getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printLiftClaims ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        liftClaimsFilterDlg();
        return false;
    });
}

function initBreakLiftClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "BreakLiftClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Doorway != null) && (claim.Doorway > 0))
                        value += ", п." + claim.Doorway.toString();
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Тип",
                "mData": function (claim, type, val ) {
                    return getLiftType (claim.LiftType);
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "LiftFailureStr", 
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Дата выключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Простой",
                "mData": function (claim, type, val ) {
                    var minutes = Date.dateDiff ("n", claim.ReceivedTime, new Date());
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onLiftClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onLiftClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetBreakLiftClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printBreakLiftClaims ();
        return false;
    });
}

function initJamLiftClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "JamLiftClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Рег.\nномер",
                "mData": "RegNumber",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Doorway != null) && (claim.Doorway > 0))
                        value += ", п." + claim.Doorway.toString();
                    return value;
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Тип",
                "mData": function (claim, type, val ) {
                    return getLiftType (claim.LiftType);
                }, 
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "LiftFailureStr", 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Дата выключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Дата включения",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Простой",
                "mData": function (claim, type, val ) {
					var ndt = null;
					if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
						ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
					if ((ndt == null) || (Date.dateDiff("s", ndt, claim.ReceivedTime) > 0))
						ndt = claim.ReceivedTime;
					
					var edt = null;
					if ($("#lift_claims_filter_date_to_checkbox").is(':checked')) {
						edt = Date.parseDate($("#lift_claims_filter_date_to").val() + " 23:59:59", 'd.m.Y H:i:s');
                        if (Date.dateDiff ("s", new Date(), edt) > 0)
                            edt = new Date ();
                    }
					if ((edt == null) || (Date.dateDiff("s", edt, claim.IsLegate ? claim.ExecutedTime : new Date ()) > 0))
						edt = claim.IsLegate ? claim.ExecutedTime : new Date ();

					var minutes = Date.dateDiff ("n", ndt, edt);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "5%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onLiftClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onLiftClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var regnumber = $("#lift_claims_filter_regnumber").val();
        var ndt = null;
        if ($("#lift_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#lift_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#lift_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#lift_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var address = $("#lift_claims_filter_address").data("object");
        var doorway = $("#lift_claims_filter_doorway").val().trim();
        if (doorway != "")
            doorway = Number(doorway);
        else
            doorway = null;
        var minstaytime = $("#lift_claims_filter_minstaytime").val().trim();
        if (minstaytime != "")
            minstaytime = Number(minstaytime);
        else
            minstaytime = null;

        var service = new Horizont.Web.ClaimsWebService();
        service.GetJamLiftClaims(ndt, edt, address, doorway, regnumber, minstaytime, getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printJamLiftClaims ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        liftClaimsFilterDlg();
        return false;
    });
}

function initCurrentJamLiftClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "CurrentJamLiftClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Doorway != null) && (claim.Doorway > 0))
                        value += ", п." + claim.Doorway.toString();
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Тип",
                "mData": function (claim, type, val ) {
                    return getLiftType (claim.LiftType);
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "LiftFailureStr", 
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Дата выключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Простой",
                "mData": function (claim, type, val ) {
                    var minutes = Date.dateDiff ("n", claim.ReceivedTime, new Date());
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onLiftClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onLiftClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetCurrentJamLiftClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printCurrentJamLiftClaims ();
        return false;
    });
}

function initUnlegateExecutedLiftClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "UnlegateExecutedLiftClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": function (claim, type, val ) {
                    var value = claim.Address.AddressStr;
                    if ((claim.Doorway != null) && (claim.Doorway > 0))
                        value += ", п." + claim.Doorway.toString();
                    return value;
                }, 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Тип",
                "mData": function (claim, type, val ) {
                    return getLiftType (claim.LiftType);
                }, 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "LiftFailureStr", 
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Дата выключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Простой",
                "mData": function (claim, type, val ) {
                    var minutes = Date.dateDiff ("n", claim.ReceivedTime, new Date());
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onLiftClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onLiftClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetUnlegateExecutedLiftClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printUnlegateExecutedLiftClaims ();
        return false;
    });
}

function initCessationClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "CessationClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Рег.\nномер",
                "mData": "RegNumber",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Адреса",
                "mData": "AddressStr",
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Что отключено",
                "mData": function (claim, type, val ) {
                    return getCessationObject (claim.CessationObject);
                }, 
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Объекты",
                "mData": function (claim, type, val ) {
                    return getCessationObjectsStr (claim.ObjectType, claim.ObjectsCount);
                }, 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Кол-во\nквартир",
                "mData" : "FlatsCount",
                "mRender" : function (data, type, full) {
                    if (data == null)
						return "";
					return data;
                },
                "sClass" : "align-center",
				"sType" : "numeric",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Дата отключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Дата включения",
                "mData": function (claim, type, val ) {
                    if (!claim.IsLegate)
                        return "";
                    return claim.ExecutedTime;
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCessationClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCessationClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var regnumber = $("#cessation_claims_filter_regnumber").val();
        var ndt = null;
        if ($("#cessation_claims_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#cessation_claims_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#cessation_claims_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#cessation_claims_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
		var addresses = [];
		$("#cessation_claims_filter_addresses").multiselect("getChecked").map(function () {
			var address = $("#cessation_claims_filter_addresses option[value='" + this.value + "']").data("object");
			addresses.push(address);
		});
		var cessationobject = Number($("#cessation_claims_filter_cessation_object option:selected").val())-1;
		if (cessationobject < 0)
			cessationobject = null;
    
        var service = new Horizont.Web.ClaimsWebService();
        service.GetCessationClaims(ndt, edt, addresses, regnumber, cessationobject, getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printCessationClaims ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        cessationClaimsFilterDlg();
        return false;
    });
}

function initCurrentCessationClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "CurrentCessationClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адреса",
                "mData": "AddressStr",
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Что отключено",
                "mData": function (claim, type, val ) {
                    return getCessationObject (claim.CessationObject);
                }, 
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Причина",
                "mData": "Reason", 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Объекты",
                "mData": function (claim, type, val ) {
                    return getCessationObjectsStr (claim.ObjectType, claim.ObjectsCount);
                }, 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Кол-во\nквартир",
                "mData" : "FlatsCount",
                "mRender" : function (data, type, full) {
                    if (data == null)
						return "";
					return data;
                },
                "sClass" : "align-center",
				"sType" : "numeric",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Дата отключения",
                "mData": "ReceivedTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            {
                "mData": function (claim, type, val ) {
                    if (canEditClaim (claim))
                        return '<input type="image" onclick="return onCessationClaimDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">';
                    return "";
                }, 
                "sClass": "align-center",
                "bSortable" : false,
                "bVisible" : hasEditableClaims ()
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCessationClaimEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetCurrentCessationClaims(getRegionId (), getDispId (), function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printCurrentCessationClaims ();
        return false;
    });
}


//----------------------------------------------------------------------------
// ДИАЛОГИ ОбЪЕКТОВ ИНЖЕНЕРНОГО ОБОРУДОВАНИЯ

function initTermsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Terms.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Name",
                "sWidth" : "80%" 
            },
            { 
                "sTitle" : "Время неисправности",
                "mData": function (obj, type, val ) {
                    return obj.IsBreak ? obj.BreakTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Терминалы отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ терминалов",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Терминалы с _START_ до _END_ из _TOTAL_ терминалов",
	        "sInfoEmpty":    "Терминалы с 0 до 0 из 0 терминалов",
	        "sInfoFiltered": "(отфильтровано из _MAX_ терминалов)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetTerms(isbreak, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printTerms ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/TermEvents.aspx" + location.search;
        return false;
    });
}

function initLiftsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Lifts.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "40%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время неисправности",
                "mData": function (obj, type, val ) {
                    return obj.IsBreak ? obj.BreakTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Время постановки\nна ревизию",
                "mData": function (obj, type, val ) {
                    return obj.IsRevision ? obj.RevisionTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Лифты отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ лифтов",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Лифты с _START_ до _END_ из _TOTAL_ лифтов",
	        "sInfoEmpty":    "Лифты с 0 до 0 из 0 лифтов",
	        "sInfoFiltered": "(отфильтровано из _MAX_ лифтов)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;
        var isrevision = ($('input[name=elv-objects-filter]:checked').val() == 2) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetLifts(isbreak, isrevision, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printLifts ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/LiftEvents.aspx" + location.search;
        return false;
    });
}

function initHoistsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Hoists.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "40%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время неисправности",
                "mData": function (obj, type, val ) {
                    return obj.IsBreak ? obj.BreakTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Время постановки\nна ревизию",
                "mData": function (obj, type, val ) {
                    return obj.IsRevision ? obj.RevisionTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Подъёмники отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ подъёмников",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Подъёмники с _START_ до _END_ из _TOTAL_ подъёмников",
	        "sInfoEmpty":    "Подъёмники с 0 до 0 из 0 подъёмников",
	        "sInfoFiltered": "(отфильтровано из _MAX_ подъёмников)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;
        var isrevision = ($('input[name=elv-objects-filter]:checked').val() == 2) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetHoists(isbreak, isrevision, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printHoists ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/HoistEvents.aspx" + location.search;
        return false;
    });
}

function initDoorsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Doors.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "50%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время вскрытия",
                "mData": function (obj, type, val ) {
                    return obj.IsOpen ? obj.OpenTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Двери отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ дверей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Двери с _START_ до _END_ из _TOTAL_ дверей",
	        "sInfoEmpty":    "Двери с 0 до 0 из 0 дверей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ дверей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isopen = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetDoors(isopen, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printDoors ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/DoorEvents.aspx" + location.search;
        return false;
    });
}

function initFireSensorsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "FireSensors.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "50%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время срабатывания",
                "mData": function (obj, type, val ) {
                    return obj.IsAlarm ? obj.AlarmTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Датчики отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ датчиков",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Датчики с _START_ до _END_ из _TOTAL_ датчиков",
	        "sInfoEmpty":    "Датчики с 0 до 0 из 0 датчиков",
	        "sInfoFiltered": "(отфильтровано из _MAX_ датчиков)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isalarm = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetFireSensors(isalarm, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printFireSensors ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/FireSensorEvents.aspx" + location.search;
        return false;
    });
}

function initWaterSensorsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "WaterSensors.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "50%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время срабатывания",
                "mData": function (obj, type, val ) {
                    return obj.IsAlarm ? obj.AlarmTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Датчики отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ датчиков",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Датчики с _START_ до _END_ из _TOTAL_ датчиков",
	        "sInfoEmpty":    "Датчики с 0 до 0 из 0 датчиков",
	        "sInfoFiltered": "(отфильтровано из _MAX_ датчиков)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isalarm = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetWaterSensors(isalarm, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printWaterSensors ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/WaterSensorEvents.aspx" + location.search;
        return false;
    });
}

function initGasSensorsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "GasSensors.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "50%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время срабатывания",
                "mData": function (obj, type, val ) {
                    return obj.IsAlarm ? obj.AlarmTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Датчики отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ датчиков",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Датчики с _START_ до _END_ из _TOTAL_ датчиков",
	        "sInfoEmpty":    "Датчики с 0 до 0 из 0 датчиков",
	        "sInfoFiltered": "(отфильтровано из _MAX_ датчиков)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isalarm = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetGasSensors(isalarm, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printGasSensors ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/GasSensorEvents.aspx" + location.search;
        return false;
    });
}

function initTeleControlsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "TeleControls.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "50%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время включения",
                "mData": function (obj, type, val ) {
                    return obj.IsEnable ? obj.EnableTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Щитовые отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ щитовых",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Щитовые с _START_ до _END_ из _TOTAL_ щитовых",
	        "sInfoEmpty":    "Щитовые с 0 до 0 из 0 щитовых",
	        "sInfoFiltered": "(отфильтровано из _MAX_ щитовых)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isenable = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetTeleControls(isenable, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printTeleControls ();
        return false;
    });
}

function initChannelsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "Channels.aspx",
        "iDisplayLength": 20,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Адрес",
                "mData": "Address",
                "sWidth" : "50%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Name",
                "sWidth" : "30%" 
            },
            { 
                "sTitle" : "Время неисправности",
                "mData": function (obj, type, val ) {
                    return (obj.IsNoResponse || obj.IsErrorOn || obj.IsErrorOff || (obj.SignalLevel < obj.NormalLevel)) ? obj.CheckTime : "";
                }, 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    if ($.type(data) != "date")
                        return data;
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Каналы отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ каналов",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Каналы с _START_ до _END_ из _TOTAL_ каналов",
	        "sInfoEmpty":    "Каналы с 0 до 0 из 0 каналов",
	        "sInfoFiltered": "(отфильтровано из _MAX_ каналов)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var isbreak = ($('input[name=elv-objects-filter]:checked').val() == 1) ? true : null;

        var service = new Horizont.Web.ElvWebService();
        service.GetChannels(isbreak, getRegionId (), getDispId (), function (objs) {
            if (objs == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": objs }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_events_button" src="/Images/events.png" title="Архив"/>');
    $("#data_table_print_button").click (function () {
        printChannels ();
        return false;
    });
    $("#data_table_events_button").click (function () {
        document.location.href = "/Customers/ChannelEvents.aspx" + location.search;
        return false;
    });
}

//----------------------------------------------------------------------------
// ДИАЛОГИ СОБЫТИЙ ОбЪЕКТОВ ИНЖЕНЕРНОГО ОБОРУДОВАНИЯ

function initTermEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "TermEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "Term.Name", 
                "sWidth" : "45%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
		var objects = [];
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetTermEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printTermEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initLiftEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "LiftEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "Lift.Address", 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Lift.Name", 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Причина",
                "mData": "Reason", 
                "sWidth" : "30%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetLiftEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printLiftEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initHoistEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "HoistEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "Hoist.Address", 
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Hoist.Name", 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Причина",
                "mData": "Reason", 
                "sWidth" : "30%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetHoistEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printHoistEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initDoorEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "DoorEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "Door.Address", 
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Door.Name", 
                "sWidth" : "25%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetDoorEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printDoorEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initFireSensorEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "FireSensorEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "FireSensor.Address", 
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "FireSensor.Name", 
                "sWidth" : "25%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetFireSensorEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printFireSensorEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initWaterSensorEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "WaterSensorEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "WaterSensor.Address", 
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "WaterSensor.Name", 
                "sWidth" : "25%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetWaterSensorEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printWaterSensorEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initGasSensorEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "GasSensorEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "GasSensor.Address", 
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "GasSensor.Name", 
                "sWidth" : "25%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetGasSensorEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printGasSensorEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

function initChannelEventsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "ChannelEvents.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Начало",
                "mData": "StartDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Окончание",
                "mData": "EndDate", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Длительность",
                "mData": function (obj, type, val ) {
                    var minutes = Date.dateDiff ("n", obj.StartDate, obj.EndDate);
                    var hours = Math.floor (minutes/60);
                    minutes -= hours*60;

                    return hours + ":" + minutes;
                }, 
                "sClass": "align-center",
                "sWidth" : "5%" 
            },
            { 
                "sTitle" : "Адрес",
                "mData": "Channel.Address", 
                "sWidth" : "25%" 
            },
            { 
                "sTitle" : "Название",
                "mData": "Channel.Name", 
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Причина",
                "mData": "Reason", 
                "sWidth" : "25%" 
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Записи отсутствуют",
            "sLoadingRecords" : "Загрузка...",
        ﻿	"sProcessing":   "Загрузка...",
	        "sLengthMenu":   "Показать _MENU_ записей",
	        "sZeroRecords":  "Ничего не найдено",
	        "sInfo":         "Записи с _START_ до _END_ из _TOTAL_ записей",
	        "sInfoEmpty":    "Записи с 0 до 0 из 0 записей",
	        "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
	        "sInfoPostFix":  "",
	        "sSearch":       "Поиск:",
	        "sUrl":          "",
	        "oPaginate": {
		        "sFirst": "Начало",
		        "sPrevious": "Пред",
		        "sNext": "След",
		        "sLast": "Конец"
	        }
        }
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var ndt = null;
        if ($("#elv_object_events_filter_date_from_checkbox").is(':checked'))
            ndt = Date.parseDate($("#elv_object_events_filter_date_from").val() + " 00:00:00", 'd.m.Y H:i:s');
        var edt = null;
        if ($("#elv_object_events_filter_date_to_checkbox").is(':checked'))
            edt = Date.parseDate($("#elv_object_events_filter_date_to").val().trim() + " 23:59:59", 'd.m.Y H:i:s');
        var mineventtime = $("#elv_object_events_filter_mineventtime").val().trim();
        if (mineventtime != "")
            mineventtime = Number(mineventtime);
        else
            mineventtime = 0;
		var objects = [];
		$("#elv_object_events_filter_objects").multiselect("getChecked").map(function () {
			var obj = $("#elv_object_events_filter_objects option[value='" + this.value + "']").data("object");
			objects.push(obj);
		});
		
        var service = new Horizont.Web.ElvWebService();
        service.GetChannelEvents(ndt, edt, mineventtime, objects, getRegionId (), getDispId (), function (events) {
            if (events == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": events }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="image" id="data_table_filter_button" src="/Images/filter.png" title="Фильтр"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>');
    $("#data_table_print_button").click (function () {
        printChannelEvents ();
        return false;
    });
    $("#data_table_filter_button").click (function () {
        elvObjectEventsFilterDlg();
        return false;
    });
}

//----------------------------------------------------------------------------
// ДИАЛОГИ ЖИТЕЛЯ

function initResidentClaimsTable() {
    window.oTable = $('#data_table').dataTable({
        "sDom": '<"H"<"data-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "ResidentClaims.aspx",
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Рег.\nномер",
                "mData": "RegNumber",
                "sClass": "align-center",
                "sWidth" : "10%" 
            },
            { 
                "sTitle" : "Вид работ",
                "mData": "Journal.Name",
                "sWidth" : "20%" 
            },
            { 
                "sTitle" : "Неисправность",
                "mData": "CommonFailureStr", 
                "sWidth" : "35%" 
            },
            { 
                "sTitle" : "Отправлена",
                "mData": "SentTime", 
                "sType": "date-euro", 
                "mRender" : function (data, type, full) {
                    return data.format('dd.MM.yyyy HH:mm');
                },
                "sWidth" : "15%" 
            },
            { 
                "sTitle" : "Статус",
                "mData": function (claim, type, val ) {
                    return getClaimStatus (claim);
                }, 
                "sWidth" : "20%" 
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onCommonClaimInfoBtnClick(this);" src="/Images/info.png" title="Информация по заявке">'
            }
        ]
    });

    oSettings = oTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var service = new Horizont.Web.ClaimsWebService();
        service.GetResidentClaims(function (claims) {
            if (claims == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": claims }
            fnCallback(data);
        }, serviceError);
    };

    $(".data-table-toolbar").html('<input type="button" id="data_table_create_button" value="Новая заявка" title="Создать пользователя"/>' +
                                  '<input type="image" id="data_table_print_button" src="/Images/print.png" title="Печать"/>' +
                                  '<input type="image" id="data_table_refresh_button" src="/Images/refresh.png" title="Обновить"/>');
    $("#data_table_create_button").click (function () {
        document.location.href = "/Residents/InsertCommonClaim.aspx"
        return false;
    });
    $("#data_table_print_button").click (function () {
        printResidentClaims ();
        return false;
    });
    $("#data_table_refresh_button").click (function () {
        updateDataTable ();
        return false;
    });
}

//----------------------------------------------------------------------------
// КНОПКИ УДАЛЕНИЯ И ИЗМЕНЕНИЯ

function onUserDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var user = window.oTable.fnGetData(row);
    
    if (!canEditUser (user))
        return false;

 	$.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить пользователя?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.UsersWebService();
                    service.DeleteUser(user.Username, function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Пользователь удален");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onUserEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var user = window.oTable.fnGetData(row);

    loading (true, 500);
    userDlg (user, function () {
        loading (false);
    }, serviceError);

    return false;
}

function onUserCreateBtnClick () {
    loading (true, 500)
    createUserDlg (function () {
        loading (false);
    }, serviceError);

    return false;
}

function onUserRulesBtnClick(element){
    var row = $(element).parents('tr')[0];
    var user = window.oTable.fnGetData(row);

    loading (true, 500);
    userRulesDlg (user, function () {
        loading (false);
    }, serviceError);

    return false;
}

//----------------------------------------------------------------------------

function onServerDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var server = window.oTable.fnGetData(row);
    
    $.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить запись о сервере?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.RegionsWebService();
                    service.DeleteServer(server.Id, function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Запись о сервере удалена");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onServerEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var server = window.oTable.fnGetData(row);

    serverDlg (server);

    return false;
}

function onServerCreateBtnClick () {
    createServerDlg ();

    return false;
}

//----------------------------------------------------------------------------

function onCityDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var city = window.oTable.fnGetData(row);
    
    $.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить запись о городе?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.RegionsWebService();
                    service.DeleteCity(city.Id, function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Запись о городе удалена");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onCityEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var city = window.oTable.fnGetData(row);

    cityDlg (city);

    return false;
}

function onCityCreateBtnClick () {
    createCityDlg ();

    return false;
}

//----------------------------------------------------------------------------

function onRegionDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var region = window.oTable.fnGetData(row);
    
    $.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить запись о районе?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.RegionsWebService();
                    service.DeleteRegion(region.Id, function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Запись о районе удалена");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onRegionEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var region = window.oTable.fnGetData(row);

    loading (true, 500);
    regionDlg (region, function () {
        loading (false);
    }, serviceError);

    return false;
}

function onRegionCreateBtnClick () {
    loading (true, 500);
    createRegionDlg (function () {
        loading (false);
    }, serviceError, null);

    return false;
}

//----------------------------------------------------------------------------

function onCommonClaimDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);
    
    if (!canEditClaim (claim))
        return false;

 	$.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить заявку?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.ClaimsWebService();
                    service.DeleteCommonClaim(claim.Id, getRegionId (), function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Заявка удалена");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onCommonClaimEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);

    commonClaimDlg (claim);

    return false;
}

function onCommonClaimInfoBtnClick (element) {
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);

    document.location.href = "/Residents/CommonClaimInfo.aspx?id=" + claim.Id.toString ();

    return false;
}

//----------------------------------------------------------------------------

function onLiftClaimDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);
    
    if (!canEditClaim (claim))
        return false;
    
 	$.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить заявку?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.ClaimsWebService();
                    service.DeleteLiftClaim(claim.Id, getRegionId (), function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Заявка удалена");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onLiftClaimEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);

    liftClaimDlg (claim);

    return false;
}

//----------------------------------------------------------------------------

function onCessationClaimDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);
    
    if (!canEditClaim (claim))
        return false;
    
 	$.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить отключение?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.ClaimsWebService();
                    service.DeleteCessationClaim(claim.Id, getRegionId (), function (result) {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Отключение удалено");
                        updateDataTable();
                    }, serviceError, null);
				}
			},
			"Нет"	: {
				"class"	: "gray"
			}
		}
	});

    return false;
}

function onCessationClaimEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var claim = window.oTable.fnGetData(row);

    cessationClaimDlg (claim);

    return false;
}

//----------------------------------------------------------------------------

function onRepeatClaimsBtnClick(element){
    var row = $(element).parents('tr')[0];
    var flat = window.oTable.fnGetData(row);

    var search = new Object();
    search.CityId = getCityId ();
    search.RegionId = getRegionId ();
    search.DispId = getDispId ();
    search.RegionName = getRegionName ();
    search.DispName = getDispName ();
    search.Address= flat.Address;
    search.Flat =  flat.Number;
    search.Journal = flat.Journal;
    search.DateFromEn =  $("#repeat_flats_filter_date_from_checkbox").is(':checked');
    search.DateToEn =  $("#repeat_flats_filter_date_to_checkbox").is(':checked');
    search.DateFrom = $("#repeat_flats_filter_date_from").val();
    search.DateTo = $("#repeat_flats_filter_date_to").val();
    
    document.location.href = "/Customers/RepeatClaims.aspx?" + $.param(search);

    return false;
}

//----------------------------------------------------------------------------
// ПРОЧИЕ ФУНКЦИИ

function updateDataTable (fnCallBack)
{
    window.oTable.fnReloadAjax(null, function () {
        if ((getDataTablePage () > getDataTablePagesCount () - 1) || (getDataTablePage () < 0))
            setDataTablePage (0);

        fnCallBack ();
    }, true);
}

function clearDataTable ()
{
    window.oTable.fnClearTable();
}

function getDataTablePagesCount ()
{
    return window.oTable.fnPagingInfo().iTotalPages;
}

function getDataTablePage ()
{
    return window.oTable.fnPagingInfo().iPage;
}

function setDataTablePage (idx)
{
    window.settingDataTablePage = true;
    window.oTable.fnPageChange(idx);
    window.settingDataTablePage = false;
}

