//----------------------------------------------------------------------------
// ИНИЦИАЛИЗАЦИЯ ДИАЛОГОВ

function initUserDlg() {
    $("#user_city, #user_region, #user_groups").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    });

    $("#user_address").combobox({
        classes: "ui-corner-left inset",
        source: function (request, response) {
            var region = $("#user_region option[value='" + $("#user_region option:selected").val().toString() + "']").data("object");
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
            $("#user_address").data("object", ui.item.object);
            onChangeUserAddress ();
        },
        change: function (event, ui) {
            if (ui.item)
                return true;

            $(this).val("");
            $(this).data("object", null);
            $(this).data("autocomplete").term = "";

            onChangeUserAddress ();

            return false;
        },
        close: function (event, ui) {
            onChangeUserField();
        }
    }).bind("textchange", function () {
        onChangeUserField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeUserField();
        onChangeUserAddress ();
    });

    $("#user_city").change(function () {
        loading(true, 500);
        updateUserRegions(function () {
            loading(false);
        }, serviceError);

        onChangeUserField();
    });

    $("#user_region").change(function () {
        $("#user_address").val("");
        $("#user_address").data("object", null);

        onChangeUserAddress ();
    });

    $("#user_activated").change(function () {
        onChangeUserField();
    });

    $("#user_username, #user_password, #user_password_confirm, #user_name, #user_surname, #user_fathername, #user_post, #user_flat, #user_phone, #user_email")
    .bind("textchange", function () {
        onChangeUserField();
    }).keyup(function () {
        if ($(this).val() != "")
            return;
        onChangeUserField();
    });

    $("#user_groups").change(function () {
        onChangeUserField();
    });

    $("#user_save_button").click(function () {
        if (!Page_ClientValidate("user_validators"))
            return false;
        onSaveUser();

        $("#user_dialog").dialog("close");
    });

    $("#user_dialog").dialog({
        open: function (event, ui) {
            var user = $("#user_control").data("object");
            if (user != null)
                document.title = $("body").data("title") + " - Изменение пользователя";
            else
                document.title = $("body").data("title") + " - Создание пользователя";
            pushHistoryState();
        },
        beforeClose: function (event, ui) {
            var user = $("#user_control").data("object");
            if (user == null)
                replaceHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initUserRulesDlg() {
    window.UserRulesTable = $('#user_rules_table').dataTable({
        "sDom": '<"H"<"user-rules-table-toolbar">fr>t<"F"ip>',
        "sAjaxSource": "UserRules.aspx",
        "bFilter" : false,
        "bAutoWidth" : false,
        "bInfo" : false,
        "fnServerData": function (sUrl, aoData, fnCallback, oSettings) {
            var data = { "aaData": [] }
            fnCallback(data);
        },
        "aoColumns": [
            { 
                "sTitle" : "Город",
                "mData": function (rule, type, val ) {
                    return (rule.City != null) ? rule.City.Name : "Все";
                }, 
                "sWidth" : "150px" 
            },
            { 
                "sTitle" : "Район",
                "mData": function (rule, type, val ) {
                    return (rule.Region != null) ? rule.Region.Name : "Все";
                }, 
                "sWidth" : "150px" 
            },
            { 
                "sTitle" : "ОДС",
                "mData": function (rule, type, val ) {
                    return (rule.Disp != null) ? rule.Disp.Name : "Все";
                }, 
                "sWidth" : "150px" 
            },
            { 
                "sTitle" : "Полный доступ",
                "mData": "Permission",
                "mRender" : function (data, type, full) {
                    var str =  '<input type="checkbox" disabled="disabled"';
                    if (data == 1)
                        str += 'checked="checked"';
                    str += '></input>';
                    return str;
                },
                "sType": "checkbox",
                "aTargets": [ "_all" ],
                "sClass" : "align-center",
                "sWidth" : "50px" 
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onUserRuleDeleteBtnClick(this);" src="/Images/delete.png" title="Удалить">'
            },
            {
                "mData": null,
                "sClass": "align-center",
                "bSortable" : false,
                "sDefaultContent": '<input type="image" onclick="return onUserRuleEditBtnClick(this);" src="/Images/edit.png" title="Редактировать">'
            }
        ],
        "oLanguage" :
        {
            "sEmptyTable": "Нет правил",
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

    oSettings = UserRulesTable.fnSettings();
    oSettings.fnServerData = function (sUrl, aoData, fnCallback, oSettings) {
        var user = $("#user_rules_control").data ("object");
        var service = new Horizont.Web.UsersWebService();
        service.GetUserRules(user.Username, function (rules) {
            if (rules == null) {
                serviceError ();
                return;
            }
            
            var data = { "aaData": rules }
            fnCallback(data);
        }, serviceError);
    };

    $(".user-rules-table-toolbar").html('<input type="button" id="user_rules_table_create_button" value="Создать правило" title="Создать правило"/>');
    $("#user_rules_table_create_button").click (function () {
        onUserRuleCreateBtnClick();
        return false;
    });

    $("#user_rules_dialog").dialog({
        open: function (event, ui) {
            document.title = $("body").data("title") + " - Права пользователя";
            pushHistoryState();
        },
        close: function (event, ui) {
            document.title = $("body").data("title");
            pushHistoryState();
        }
    });
}

function initUserRuleDlg() {
    $("#user_rule_city, #user_rule_region, #user_rule_disp, #user_rule_permission").wrap('<span class="jquery-ui-smoothness">').multiselect({
        multiple: false,
        header: false,
        height: "auto",
        minWidth: "auto",
        classes: "ui-combobox-select inset",
        selectedList: 1
    });

    $("#user_rule_city").change(function () {
        loading(true, 500);
        updateUserRuleRegions(function () {
            loading(false);
        }, serviceError);

        onChangeUserRuleField();
    });

    $("#user_rule_region").change(function () {
        loading(true, 500);
        updateUserRuleDisps(function () {
            loading(false);
        }, serviceError);

        onChangeUserRuleField();
    });

    $("#user_rule_disp").change(function () {
        onChangeUserRuleField();
    });

    $("#user_rule_permission").change(function () {
        onChangeUserRuleField();
    });

    $("#user_rule_save_button").click(function () {
        onSaveUserRule();

        $("#user_rule_dialog").dialog("close");
    });

    $("#user_rule_dialog").dialog({
        open: function (event, ui) {
            var rule = $("#user_rule_control").data("object");
            if (rule != null)
                document.title = $("body").data("title") + " - Изменение правила";
            else
                document.title = $("body").data("title") + " - Создание правила";
            pushHistoryState();
        },
        beforeClose: function (event, ui) {
            var rule = $("#user_rule_control").data("object");
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

function createUserDlg(fnCallBack, fnError, state) {
    $("#user_control").data("object", null);
    $(".user-validator").empty();

    restoreUserControl (state, function () {
        updateUserControls(null);

        $("#user_dialog").dialog("option", "title", "Создание пользователя");
        $("#user_dialog").dialog("open");

        fnCallBack ();
    }, fnError);
}

function createUserRuleDlg (user, fnCallBack, fnError, state) {
    $("#user_rule_control").data("object", null);

    restoreUserRuleControl (state, function () {
        updateUserRuleControls(user, null);

        $("#user_rule_dialog").dialog("option", "title", "Создание правила");
        $("#user_rule_dialog").dialog("open");

        fnCallBack ();
    }, fnError);
}

//----------------------------------------------------------------------------
// ДИАЛОГИ РЕДАКТИРОВАНИЯ

function userDlg(user, fnCallBack, fnError) {
    $("#user_control").data("object", user);
    $(".user-validator").empty();

    var state = new Object();
    state.IsActivated = user.IsActivated;
    state.Username = user.Username;
    state.Password = user.Password;
    state.Surname = user.Surname;
    state.Name = user.Name;
    state.Fathername = user.Fathername;
    state.Post = user.Post;
    state.CityId = (user.Address != null) ? user.Address.Region.City.Id : 0;
    state.RegionId = (user.Address != null) ? user.Address.Region.Id : 0;
    state.Address = user.Address;
    state.Flat = user.Flat;
    state.Phone = user.Phone;
    state.Email = user.Email;
    state.Group = getUserGroupValue(user);

    restoreUserControl (state, function () {
        updateUserControls(user);

        $("#user_dialog").dialog("option", "title", (canEditUser(user) ? "Изменение пользователя " : "Данные пользователя ") + getUserFullName (user));
        $("#user_dialog").dialog("open");

        fnCallBack ();
    }, fnError);
}

function userRulesDlg (user, fnCallBack) {
    $("#user_rules_control").data ("object", user);
    $("#user_rules_table_create_button").css("display", canEditUser(user) ? "" : "none")

    UserRulesTable.fnSetColumnVis(4, canEditUser (user));
    updateUserRulesTable(function () {
        $("#user_rules_dialog").dialog("option", "title", (canEditUser(user) ? "Редактирование прав пользователя " : "Права пользователя ") + getUserFullName (user));
        $("#user_rules_dialog").dialog("open");

        fnCallBack ();
    });

}

function userRuleDlg(user, rule, fnCallBack, fnError) {
    $("#user_rule_control").data("object", rule);

    var state = new Object ();
    state.CityId = (rule.City != null) ? rule.City.Id : 0;
    state.RegionId = (rule.Region != null) ? rule.Region.Id : 0;
    state.DispId = (rule.Disp != null) ? rule.Disp.Id : 0;
    state.Permission = rule.Permission;

    restoreUserRuleControl (state, function () {
        updateUserRuleControls(user, rule);

        $("#user_rule_dialog").dialog("option", "title", canEditUser(user) ? "Изменение правила" : "Правило пользователя");
        $("#user_rule_dialog").dialog("open");

        fnCallBack ();
    }, fnError);
}

//----------------------------------------------------------------------------
// ФУНКЦИИ СОХРАНЕНИЯ И УДАЛЕНИЯ

function onSaveUser() {
    var user = $("#user_control").data("object");

    if (user == null)
        onCreateUser();
    else
        onChangeUser();
}

function onCreateUser() {
    var user = new Object();
    user.IsActivated = $("#user_activated").is(':checked');
    user.Username = $("#user_username").val().trim();
    user.Password = $("#user_password").val();
    user.Surname = $("#user_surname").val().trim();
    user.Name = $("#user_name").val().trim();
    user.Fathername = $("#user_fathername").val().trim();
    user.Post = $("#user_post").val().trim();
    user.Address = $("#user_address").data("object");
    user.Flat = Number ($("#user_flat").val());
    user.Phone = $("#user_phone").val().trim();
    user.Email = $("#user_email").val().trim();
    user.Roles = [];
    user.Roles.push($("#user_groups option:selected").val());

    loading(true, 500);
    var service = new Horizont.Web.UsersWebService();
    service.CreateUser(user, function (ret) {
        loading(false);
        if (ret) {
            successToast("Пользователь успешно создан");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onChangeUser() {
    var user = $("#user_control").data("object");
    if (!canEditUser(user) || !isUserChanged(user))
        return;

    user.IsActivated = $("#user_activated").is(':checked');
    user.Password = $("#user_password").val();
    user.Surname = $("#user_surname").val().trim();
    user.Name = $("#user_name").val().trim();
    user.Fathername = $("#user_fathername").val().trim();
    user.Post = $("#user_post").val().trim();
    user.Address = $("#user_address").data("object");
    user.Flat = Number ($("#user_flat").val());
    user.Phone = $("#user_phone").val().trim();
    user.Email = $("#user_email").val().trim();
    user.Roles = [];
    user.Roles.push($("#user_groups option:selected").val());

    loading(true, 500);
    var service = new Horizont.Web.UsersWebService();
    service.ChangeUser(user, function (ret) {
        loading(false);
        if (ret) {
            successToast("Данные пользователя сохранены");
            updateDataTable();
        }
        else
            serviceError();
    }, serviceError);
}

//------------------------------------------------------------

function onSaveUserRule() {
    var rule = $("#user_rule_control").data("object");

    if (rule == null)
        onCreateUserRule();
    else
        onChangeUserRule();
}

function onCreateUserRule() {
    var user = $("#user_rules_control").data ("object");
    if (user == null)
        return;

    if (!canEditUser(user))
        return;

    var rule = new Object();
    rule.City = $("#user_rule_city option:selected").data("object");
    rule.Region = $("#user_rule_region option:selected").data("object");
    rule.Disp = $("#user_rule_disp option:selected").data("object");
    rule.Permission = $("#user_rule_permission option:selected").val();

    loading(true, 500);
    var service = new Horizont.Web.UsersWebService();
    service.AddUserRule(user.Username, rule, function (ret) {
        loading(false);
        if (ret) {
            successToast("Правило успешно добавлено");
            updateUserRulesTable();
        }
        else
            serviceError();
    }, serviceError);
}

function onChangeUserRule() {
    var user = $("#user_rules_control").data("object");
    var rule = $("#user_rule_control").data("object");
    if ((user == null) || (rule == null))
        return;

    if (!canEditUser(user) || !isUserRuleChanged(rule))
        return;

    rule.City = $("#user_rule_city option:selected").data("object");
    rule.Region = $("#user_rule_region option:selected").data("object");
    rule.Disp = $("#user_rule_disp option:selected").data("object");
    rule.Permission = $("#user_rule_permission option:selected").val();

    loading(true, 500);
    var service = new Horizont.Web.UsersWebService();
    service.ChangeUserRule(rule, function (ret) {
        loading(false);
        if (ret) {
            successToast("Правило успешно сохранено");
            updateUserRulesTable();
        }
        else
            serviceError();
    }, serviceError);
}

//----------------------------------------------------------------------------
// ФУКНЦИИ ПРОВЕРКИ ИЗМЕНЕНИЯ

function isUserChanged(user) {
    if (user.IsActivated != $("#user_activated").is(':checked'))
        return true;
    if (user.Username != $("#user_username").val().trim())
        return true;
    if (user.Password != $("#user_password").val())
        return true;
    if (user.Surname != $("#user_surname").val().trim())
        return true;
    if (user.Name != $("#user_name").val().trim())
        return true;
    if (user.Fathername != $("#user_fathername").val().trim())
        return true;
    if (user.Post != $("#user_post").val().trim())
        return true;
    if (((user.Address != null) ? user.Address.Name : "") != $("#user_address").val().trim())
        return true;
    if (user.Address != $("#user_address").data("object"))
        return true;
    if (((user.Flat != null) ? user.Flat.toString () : "") != $("#user_flat").val().trim ())
        return true;
    if (user.Phone != $("#user_phone").val().trim())
        return true;
    if (user.Email != $("#user_email").val().trim())
        return true;
    if (user.Roles.length != 1)
        return true;
    if (user.Roles[0] != $("#user_groups option:selected").val())
        return true;

    return false;
}

function isUserRuleChanged(rule) {
    if (rule.City != $("#user_rule_city option:selected").data("object"))
        return true;
    if (rule.Region != $("#user_rule_region option:selected").data("object"))
        return true;
    if (rule.Disp != $("#user_rule_disp option:selected").data("object"))
        return true;
    if (rule.Permission != $("#user_rule_permission option:selected").val())
        return true;

    return false;
}

//----------------------------------------------------------------------------
// ФУКНЦИИ УСТАНОВЛЕНИЯ СВОЙСТВ ОБЪЕКТОВ УПРАВЛЕНИЯ

function updateUserControls(user) {
    $("#user_activated").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_username").attr('disabled', (user != null) && canEditUser(user));
    $("#user_username").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_password").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_password_confirm").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_surname").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_name").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_fathername").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_city").multiselect((user == null) || canEditUser(user) ? "enable" : "disable")
    $("#user_region").multiselect((user == null) || canEditUser(user) ? "enable" : "disable")
    $("#user_address").attr('disabled', (user != null) && !canEditUser(user));
    $("#user_flat").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_phone").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_post").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_email").attr('readonly', (user != null) && !canEditUser(user));
    $("#user_groups").multiselect((user == null) || (canEditUser(user) && (user.Username != "Administrator")) ? "enable" : "disable")

    $("#user_save_button").css("display", (user == null) ? "" : "none");
}

function updateUserRuleControls(user, rule) {
    $("#user_rule_city").multiselect((rule == null) || canEditUser(user) ? "enable" : "disable");
    $("#user_rule_region").multiselect((rule == null) || canEditUser(user) ? "enable" : "disable");
    $("#user_rule_disp").multiselect((rule == null) || canEditUser(user) ? "enable" : "disable");
    $("#user_rule_permission").multiselect((rule == null) || canEditUser(user) ? "enable" : "disable");

    $("#user_rule_save_button").css("display", (rule == null) ? "" : "none");
}

//----------------------------------------------------------------------------
// СОБЫТИЯ НА ИЗМЕНЕНИЯ ПОЛЕЙ

function onChangeUserField() {
    if (!$("#user_dialog").dialog("isOpen"))
        return;
    var user = $("#user_control").data("object");
    if (user == null)
        return;

    $("#user_save_button").css("display", canEditUser(user) && isUserChanged(user) ? "" : "none");
}

function onChangeUserRuleField() {
    if (!$("#user_rule_dialog").dialog("isOpen"))
        return;
    var user = $("#user_rules_control").data("object");
    var rule = $("#user_rule_control").data("object");
    if ((rule == null) || (user == null))
        return;

    $("#user_rule_save_button").css("display", canEditUser(user) && isUserRuleChanged(rule) ? "" : "none");
}

//----------------------------------------------------------------------------
// СОХРАНЕНИЕ И ВОССТАНОВЛЕНИЕ ДАННЫХ ФОРМЫ

function saveUserControl() {
    var address = $("#user_address").data("object");

    var state = new Object();
    state.IsActivated = $("#user_activated").is(':checked');
    state.Username = $("#user_username").val().trim();
    state.Password = "";
    state.Surname = $("#user_surname").val().trim();
    state.Name = $("#user_name").val().trim();
    state.Fathername = $("#user_fathername").val().trim();
    state.Post = $("#user_post").val().trim();
    state.CityId = (address != null) ? address.Region.City.Id : 0;
    state.RegionId = (address != null) ? address.Region.Id : 0;
    state.Address = address;
    if (state.Address == undefined)
        state.Address = null;
    state.Flat =  Number ($("#user_flat").val().trim());
    state.Phone =  $("#user_phone").val().trim();
    state.Email = $("#user_email").val().trim();
    state.Group = $("#user_groups option:selected").val();

    return state;
}

function restoreUserControl(state, fnCallBack, fnError) {
    if ((state != null) && (state.Address == ""))
        state.Address = null;

    $("#user_activated").attr('checked', (state != null) ? state.IsActivated : true);
    $("#user_username").val((state != null) ? state.Username : "");
    $("#user_password").val((state != null) ? state.Password : "");
    $("#user_password_confirm").val((state != null) ? state.Password : "");
    $("#user_surname").val((state != null) ? state.Surname : "");
    $("#user_name").val((state != null) ? state.Name : "");
    $("#user_fathername").val((state != null) ? state.Fathername : "");
    $("#user_post").val((state != null) ? state.Post : "");
    $("#user_phone").val((state != null) ? state.Phone : "");
    $("#user_email").val((state != null) ? state.Email : "");
    if (state != null)
        $("#user_groups option[Value='" + state.Group + "']").attr("selected", "selected");
    else
        $("#user_groups option[Value='Customers']").attr("selected", "selected");
    $("#user_groups").multiselect("refresh");

    updateUserCities (function () {
        $("#user_address").data("object", (state != null) ? state.Address : null);
        $("#user_address").val(((state != null) && (state.Address != null)) ? state.Address.Name : "");
        $("#user_flat").val(((state != null) && (state.Flat != null)) ? state.Flat.toString () : "");

        onChangeUserAddress ();

        fnCallBack ();    
    }, fnError, state);
}

//----------------------------------------------------------

function saveUserRuleControl() {
    var state = new Object();
    state.CityId = $("#user_rule_city option:selected").val();
    state.RegionId = $("#user_rule_region option:selected").val();
    state.DispId = $("#user_rule_disp option:selected").val();
    state.Permission = $("#user_rule_permission option:selected").val();

    return state;
}

function restoreUserRuleControl(state, fnCallBack, fnError) {
    if (state)
        $("#user_rule_permission option[Value='" + state.Permission.toString() + "']").attr("selected", "selected");
    else
        $("#user_rule_permission option[Value='0']").attr("selected", "selected");
    $("#user_rule_permission").multiselect("refresh");

    updateUserRuleCities (fnCallBack, fnError, state);
}

//----------------------------------------------------------------------------
// КНОПКИ УДАЛЕНИЯ И ИЗМЕНЕНИЯ

function onUserRuleDeleteBtnClick(element) {
    var row = $(element).parents('tr')[0];
    var rule = window.UserRulesTable.fnGetData(row);
    var user = $("#user_rules_control").data("object");

    if ((rule == null) || (user == null))
        return false;
     if (!canEditUser (user))
        return false;

 	$.confirm({
		"title"		: "Подтверждение удаления",
		"message"	: "Вы действительно хотите удалить правило пользователя?",
		"buttons"	: {
			"Да"	: {
				"class"	: "blue",
				"action": function() {
                    var service = new Horizont.Web.UsersWebService();
                    service.DeleteUserRule(rule.Id, function () {
                        if (!result) {
                            serviceError();
                            return;
                        }

                        successToast("Правило успешно удалено");
                        updateUserRulesTable();
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

function onUserRuleEditBtnClick(element){
    var row = $(element).parents('tr')[0];
    var rule = window.UserRulesTable.fnGetData(row);
    var user = $("#user_rules_control").data("object");

    if ((rule == null) || (user == null))
        return false;

    loading (true, 500);
    userRuleDlg (user, rule, function () {
        loading (false);
    }, serviceError);

    return false;
}

function onUserRuleCreateBtnClick () {
    var user = $("#user_rules_control").data("object");
    if ((user == null) || !canEditUser (user))
        return false;

    loading (true, 500);
    createUserRuleDlg (user, function () {
        loading (false);
    }, serviceError);

    return false;
}

//----------------------------------------------------------------------------
// ПРОЧИЕ ФУКНЦИИ

function onChangeUserAddress () {
    if ($("#user_address").data("object") == null) {
        $("#user_flat").val("");
        $("#user_flat").attr("disabled", "disabled");
    }
    else {
        $("#user_flat").removeAttr("disabled");
    }
}

function userAddressValidate(sender, args) {
    args.IsValid = (($("#user_groups option:selected").val() != "Residents") || ($("#user_address").val().trim () != ""));
}

function userFlatValidate(sender, args) {
    args.IsValid = (($("#user_groups option:selected").val() != "Residents") || ($("#user_flat").val().trim () != ""));
}

function userPhoneValidate(sender, args) {
    args.IsValid = (($("#user_groups option:selected").val() != "Residents") || ($("#user_phone").val().trim () != ""));
}


function updateUserRulesTable (fnCallBack) {
    UserRulesTable.fnReloadAjax(null, fnCallBack, true);
}

function updateUserCities(fnCallBack, fnError, state) {
    $("#user_city").empty();
    $("#user_city").multiselect("refresh");

    var service = new Horizont.Web.RegionsWebService();
    service.GetCities(function (items) {
        $("#user_city").empty();

        if (items == null) {
            $("#user_city").multiselect("refresh");
            $("#user_city").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#user_city").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#user_city option[value='" + item.Id + "']").data("object", item);
        })

        if (state != null)
            $("#user_city option[Value='" + state.CityId.toString() + "']").attr("selected", "selected");
        else
            $("#user_city option[Value='0']").attr("selected", "selected");
        $("#user_city").multiselect("refresh");

        updateUserRegions(fnCallBack, fnError, state);
    },
    function () {
        $("#user_city").empty();
        $("#user_city").multiselect("refresh");
        $("#user_city").change();

        fnError();
    });
}

function updateUserRegions(fnCallBack, fnError, state) {
    $("#user_region").empty();
    $("#user_region").multiselect("refresh");

    var city = $("#user_city option[value='" + $("#user_city option:selected").val().toString() + "']").data("object");
    if (city == null) {
        $("#user_region").change();
        fnCallBack();
        return;
    }

    var service = new Horizont.Web.RegionsWebService();
    service.GetRegions(city, function (items) {
        $("#user_region").empty();

        if (items == null) {
            $("#user_region").multiselect("refresh");
            $("#user_region").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#user_region").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#user_region option[value='" + item.Id + "']").data("object", item);
        })

        if (state != null)
            $("#user_region option[Value='" + state.RegionId.toString() + "']").attr("selected", "selected");
        else
            $("#user_region option[Value='0']").attr("selected", "selected");
        $("#user_region").multiselect("refresh");
        $("#user_region").change();

        fnCallBack();
    },
    function () {
        $("#user_region").empty();
        $("#user_region").multiselect("refresh");
        $("#user_region").change();

        fnError();
    });
}

function updateUserRuleCities(fnCallBack, fnError, state) {
    $("#user_rule_city").empty();
    $("#user_rule_city").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
    $("#user_rule_city option[value='" + 0 + "']").data("object", null);
    $("#user_rule_city").multiselect("refresh");

    var service = new Horizont.Web.RegionsWebService();
    service.GetCities(function (items) {
        $("#user_rule_city").empty();
        $("#user_rule_city").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
        $("#user_rule_city option[value='" + 0 + "']").data("object", null);

        if (items == null) {
            $("#user_rule_city").multiselect("refresh");
            $("#user_rule_city").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#user_rule_city").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#user_rule_city option[value='" + item.Id + "']").data("object", item);
        })

        if (state)
            $("#user_rule_city option[Value='" + state.CityId.toString() + "']").attr("selected", "selected");
        else
            $("#user_rule_city option[Value='0']").attr("selected", "selected");
        $("#user_rule_city").multiselect("refresh");

        updateUserRuleRegions(fnCallBack, fnError, state);
    }, 
    function () {
        $("#user_rule_city").empty();
        $("#user_rule_city").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
        $("#user_rule_city option[value='" + 0 + "']").data("object", null);
        $("#user_rule_city").multiselect("refresh");
        $("#user_rule_city").change();
    
        fnError();
    });
}

function updateUserRuleRegions(fnCallBack, fnError, state) {
    $("#user_rule_region").empty();
    $("#user_rule_region").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
    $("#user_rule_region option[value='" + 0 + "']").data("object", null);
    $("#user_rule_region").multiselect("refresh");

    var city = $("#user_rule_city option[value='" + $("#user_rule_city option:selected").val().toString() + "']").data("object");
    if (city == null) {
        updateUserRuleDisps(fnCallBack, fnError, state);
        return;
    }

    var service = new Horizont.Web.RegionsWebService();
    service.GetRegions(city, function (items) {
        $("#user_rule_region").empty();
        $("#user_rule_region").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
        $("#user_rule_region option[value='" + 0 + "']").data("object", null);

        if (items == null) {
            $("#user_rule_region").multiselect("refresh");
            $("#user_rule_region").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#user_rule_region").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#user_rule_region option[value='" + item.Id + "']").data("object", item);
        })

        if (state)
            $("#user_rule_region option[Value='" + state.RegionId.toString() + "']").attr("selected", "selected");
        else
            $("#user_rule_region option[Value='0']").attr("selected", "selected");
        $("#user_rule_region").multiselect("refresh");

        updateUserRuleDisps(fnCallBack, fnError, state);
    }, 
    function () {
        $("#user_rule_region").empty();
        $("#user_rule_region").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
        $("#user_rule_region option[value='" + 0 + "']").data("object", null);
        $("#user_rule_region").multiselect("refresh");
        $("#user_rule_region").change();

        fnError();
    });
}

function updateUserRuleDisps(fnCallBack, fnError, state) {
    $("#user_rule_disp").empty();
    $("#user_rule_disp").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
    $("#user_rule_disp option[value='" + 0 + "']").data("object", null);
    $("#user_rule_disp").multiselect("refresh");

    var region = $("#user_rule_region option[value='" + $("#user_rule_region option:selected").val().toString() + "']").data("object");
    if (region == null) {
        fnCallBack ();
        return;
    }

    var service = new Horizont.Web.RegionsWebService();
    service.GetDisps(region, function (items) {
        $("#user_rule_disp").empty();
        $("#user_rule_disp").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
        $("#user_rule_disp option[value='" + 0 + "']").data("object", null);

        if (items == null) {
            $("#user_rule_disp").multiselect("refresh");
            $("#user_rule_disp").change();

            fnError();
            return;
        }

        $.map(items, function (item) {
            $("#user_rule_disp").append($('<option value="' + item.Id + '">' + item.Name + '</option>'));
            $("#user_rule_disp option[value='" + item.Id + "']").data("object", item);
        })

        if (state)
            $("#user_rule_disp option[Value='" + state.DispId.toString() + "']").attr("selected", "selected");
        else
            $("#user_rule_disp option[Value='0']").attr("selected", "selected");
        $("#user_rule_disp").multiselect("refresh");

        fnCallBack ();
    },
    function () {
        $("#user_rule_disp").empty();
        $("#user_rule_disp").append($('<option value="' + 0 + '">' + 'Все' + '</option>'));
        $("#user_rule_disp option[value='" + 0 + "']").data("object", null);
        $("#user_rule_disp").multiselect("refresh");
        $("#user_rule_disp").change();

        fnError();
    });
}




