//----------------------------------------------------------------------------
// ДАННЫЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ

function getCurrentUserUsername() {
    return $("#current_user_username").val();
}

function getCurrentUserSurname() {
    return $("#current_user_surname").val();
}

function getCurrentUserName() {
    return $("#current_user_name").val();
}

function getCurrentUserFathername() {
    return $("#current_user_fathername").val();
}

function getCurrentUserPost() {
    return $("#current_user_post").val();
}

function getCurrentUserAddress() {
    return $("#current_user_address").val();
}

function getCurrentUserFullName() {
    var fullname = getCurrentUserSurname() + " " + getCurrentUserName();
    if (getCurrentUserFathername() != "")
        fullname += " " + getCurrentUserFathername();

    return fullname;
}

function getCurrentUserInitials() {
    var surname = $("#user_surname").val();

    var name = "";
    if (getCurrentUserName() != "")
        name = getCurrentUserName().substring(0, 1) + ".";

    var fathername = "";
    if (getCurrentUserFathername() != "")
        fathername = getCurrentUserFathername().substring(0, 1) + ".";
    else fathername = "";

    var fullname = getCurrentUserSurname();
    if (name != "") {
        fullname += " " + name;
        if (fathername != "")
            fullname += fathername;
    }

    return fullname;
}

//----------------------------------------------------------------------------
// ПРАВА ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ

function updateUserRules(fnCallBack, fnError) {
    var service = new Horizont.Web.UsersWebService();
    service.GetCurrentUserRulesEx(function (rules) {
        window.UserRules = rules;
        fnCallBack();
    }, fnError);
}

function canCityRead(city) {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.CityId == 0) || (rule.CityId == city.Id)) {
            return true;
        }
    }
    return false;
}

function canRegionRead(region) {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.CityId == 0) || ((rule.CityId == region.City.Id) && ((rule.RegionId == 0) || (rule.RegionId == region.Id))))
            return true;
    }
    return false;
}

function canAllDispsRead(region) {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.CityId == 0) || ((rule.CityId == region.City.Id) && ((rule.RegionId == 0) || ((rule.RegionId == region.Id) && (rule.DispId == 0)))))
            return true;
    }
    return false;
}

function canDispRead(disp) {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.CityId == 0) || ((rule.CityId == disp.Region.City.Id) && ((rule.RegionId == 0) || ((rule.RegionId == disp.Region.Id) && ((rule.DispId == 0) || (rule.DispId == disp.Id))))))
            return true;
    }
    return false;
}

function canReadClaim(claim) {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.CityId == 0) || ((rule.CityId == getCityId ()) && ((rule.RegionId == 0) || ((rule.RegionId == getRegionId ()) && ((rule.DispId == 0) || (rule.DispId == claim.Disp.Id))))))
            return true;
    }
    return false;
}

function canEditClaim(claim) {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.Permission == 1) && ((rule.CityId == 0) || ((rule.CityId == getCityId()) && ((rule.RegionId == 0) || ((rule.RegionId == getRegionId()) && ((rule.DispId == 0) || (rule.DispId == claim.Disp.Id)))))))
            return true;
    }
    return false;
}

function hasEditableClaims() {
    var rules = window.UserRules;
    for (var key in rules) {
        var rule = rules[key];
        if ((rule.Permission == 1) && ((rule.CityId == 0) || ((rule.CityId == getCityId()) && ((rule.RegionId == 0) || ((rule.RegionId == getRegionId()) && ((getDispId() == 0) || (rule.DispId == 0) || (rule.DispId == getDispId())))))))
            return true;
    }
    return false;
}

function canEditUser(user) {
    return (getCurrentUserUsername () == "Administrator") || ((user.Username != "Administrator") && (!isUserAdministrator(user) || (user.Username == getCurrentUserUsername())));
}

//----------------------------------------------------------------------------
// ФУКНЦИИ ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ

function isUserAdministrator(user) {
    if (user == null)
        return false;

    var roles = user.Roles;
    if ($.inArray("Administrators", roles) >= 0)
        return true;
    return false;
}

function isUserCustomer(user) {
    if (user == null)
        return false;

    var roles = user.Roles;
    if ($.inArray("Customers", roles) >= 0)
        return true;
    return false;
}

function isUserResedent(user) {
    if (user == null)
        return false;

    var roles = user.Roles;
    if ($.inArray("Residents", roles) >= 0)
        return true;
    return false;
}

function getUserGroupValue(user) {
    if (isUserAdministrator(user))
        return "Administrators";
    if (isUserCustomer(user))
        return "Customers";
    if (isUserResedent(user))
        return "Residents";
    return "";
}

function getUserGroup(user) {
    if (isUserAdministrator(user))
        return "Администраторы";
    if (isUserCustomer(user))
        return "Заказщики";
    if (isUserResedent(user))
        return "Жильцы";
    return "";
}

function getUserFullName(user) {
    if (user == null)
        return "";

    var fullname = user.Surname + " " + user.Name;
    if (user.Fathername != "")
        fullname += " " + user.Fathername;

    return fullname;
}