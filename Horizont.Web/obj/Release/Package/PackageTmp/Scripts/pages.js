//----------------------------------------------------------------------------
// ИНИЦИАЛИЗАЦИЯ СТРАНИЦ

function initPage(fnInitDataControls) {
    window.isInitialization = true;

    loading(true, 1000);
    updateUserRules(function () {
        initPageParams();
        initPageHistory();

        fnInitDataControls(function () {
            window.isInitialization = false;
            loading(false);
        }, function () {
            window.isInitialization = false;
            serviceError();
        });
    }, serviceError);

}

function initUsersPage() {
    initPage(function (fnCallBack, fnError) {
        initUserDlg();
        initUsersTable();
        initUserRulesDlg();
        initUserRuleDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initRegisterPage() {
    initPage(function (fnCallBack, fnError) {
        initRegisterControls(fnCallBack, fnError);
    });
}

function initServersPage() {
    initPage(function (fnCallBack, fnError) {
        initServerDlg();
        initServersTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initCitiesPage() {
    initPage(function (fnCallBack, fnError) {
        initCityDlg();
        initCitiesTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initRegionsPage() {
    initPage(function (fnCallBack, fnError) {
        initRegionDlg();
        initRegionsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initAddressesPage() {
    initPage(function (fnCallBack, fnError) {
        initAddressesTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initCustomersMainPage() {
    initPage(function (fnCallBack, fnError) {
        initCustomersMainControls();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateCitiesList(fnCallBack, fnError);
        }
    });
}

function initUnexecutedClaims() {
    initPage(function (fnCallBack, fnError) {
        initUnexecutedClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initOverdueClaims() {
    initPage(function (fnCallBack, fnError) {
        initOverdueClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initLegateUnexecutedClaims() {
    initPage(function (fnCallBack, fnError) {
        initLegateUnexecutedClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initCommonClaims() {
    initPage(function (fnCallBack, fnError) {
        initCommonClaimsTable();
        initCommonClaimsFilterDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            commonClaimsFilterDlg();
            fnCallBack();
        }
    });
}

function initBrigadeClaims() {
    initPage(function (fnCallBack, fnError) {
        initBrigadeClaimsTable();
        initDateSpanFilterDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            dateSpanFilterDlg();
            fnCallBack();
        }
    });
}

function initDamageClaims() {
    initPage(function (fnCallBack, fnError) {
        initDamageClaimsTable();
        initDateSpanFilterDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            dateSpanFilterDlg();
            fnCallBack();
        }
    });
}

function initRepeatFlats() {
    initPage(function (fnCallBack, fnError) {
        initRepeatFlatsTable();
        initRepeatFlatsFilterDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            repeatFlatsFilterDlg();
            fnCallBack();
        }
    });
}

function initRepeatClaims() {
    initPage(function (fnCallBack, fnError) {
        initRepeatClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initLiftClaims() {
    initPage(function (fnCallBack, fnError) {
        initLiftClaimsTable();
        initLiftClaimsFilterDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            liftClaimsFilterDlg();
            fnCallBack();
        }
    });
}

function initBreakLiftClaims() {
    initPage(function (fnCallBack, fnError) {
        initBreakLiftClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initJamLiftClaims() {
    initPage(function (fnCallBack, fnError) {
        initJamLiftClaimsTable();
        initLiftClaimsFilterDlg();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            liftClaimsFilterDlg();
            fnCallBack();
        }
    });
}

function initCurrentJamLiftClaims() {
    initPage(function (fnCallBack, fnError) {
        initCurrentJamLiftClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initUnlegateExecutedLiftClaims() {
    initPage(function (fnCallBack, fnError) {
        initUnlegateExecutedLiftClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initCessationClaims() {
    initPage(function (fnCallBack, fnError) {
        initCessationClaimsTable();
        initCessationClaimsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                cessationClaimsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initCurrentCessationClaims() {
    initPage(function (fnCallBack, fnError) {
        initCurrentCessationClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}


function initTerms() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initTermsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initLifts() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initLiftsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initHoists() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initHoistsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initDoors() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initDoorsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initFireSensors() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initFireSensorsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initWaterSensors() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initWaterSensorsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initGasSensors() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initGasSensorsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initTeleControls() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initTeleControlsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initChannels() {
    initPage(function (fnCallBack, fnError) {
        initElvObjectsFilter();
        initChannelsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}


function initTermEvents() {
    initPage(function (fnCallBack, fnError) {
        initTermEventsTable();
        initTermEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initLiftEvents() {
    initPage(function (fnCallBack, fnError) {
        initLiftEventsTable();
        initLiftEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initHoistEvents() {
    initPage(function (fnCallBack, fnError) {
        initHoistEventsTable();
        initHoistEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initDoorEvents() {
    initPage(function (fnCallBack, fnError) {
        initDoorEventsTable();
        initDoorEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initFireSensorEvents() {
    initPage(function (fnCallBack, fnError) {
        initFireSensorEventsTable();
        initFireSensorEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initWaterSensorEvents() {
    initPage(function (fnCallBack, fnError) {
        initWaterSensorEventsTable();
        initWaterSensorEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initGasSensorEvents() {
    initPage(function (fnCallBack, fnError) {
        initGasSensorEventsTable();
        initGasSensorEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initChannelEvents() {
    initPage(function (fnCallBack, fnError) {
        initChannelEventsTable();
        initChannelEventsFilterDlg(function () {
            if (!restorePageFromHash(fnCallBack, fnError)) {
                elvObjectEventsFilterDlg();
                fnCallBack();
            }
        }, fnError);
    });
}

function initResidentClaims() {
    initPage(function (fnCallBack, fnError) {
        initResidentClaimsTable();
        if (!restorePageFromHash(fnCallBack, fnError)) {
            updateDataTable();
            fnCallBack();
        }
    });
}

function initInsertCommonClaimPage() {
    initPage(function (fnCallBack, fnError) {
        initInsertCommonClaimControls(fnCallBack, fnError);
    });
}

function initCommonClaimInfoPage() {
    initCommonClaimInfoControls();
}

function initContactsPage() {
    ymaps.ready(function () {
        var map = new ymaps.Map('map', {
            center: [55.782112, 37.582601],
            zoom: 16
        });
        map.controls
        .add('zoomControl', { left: 5, top: 5 })
        .add('mapTools', { left: 35, top: 5 });
        var placemark = new ymaps.Placemark([55.782112, 37.582601]);
        map.geoObjects.add(placemark);
    });
}

function initFeedbackPage() {
    $("#SendButton").click(function () {
        if (!Page_ClientValidate("feedback_validators")) {
            Recaptcha.reload();
            return false;
        }
    });
}

//----------------------------------------------------------------------------
// PAGE DEFINITION

function isSettingsPage() {
    return (location.pathname.split("/")[1].toLowerCase() == "settings");
}

function isCustomersPage() {
    return (location.pathname.split("/")[1].toLowerCase() == "customers");
}

function isResidentsPage() {
    return (location.pathname.split("/")[1].toLowerCase() == "residents");
}


function isRegisterPage() {
    return location.pathname.toLowerCase() == "/Account/Register.aspx".toLowerCase()
}

function isUsersPage() {
    return location.pathname.toLowerCase() == "/Settings/Users.aspx".toLowerCase()
}

function isServersPage() {
    return location.pathname.toLowerCase() == "/Settings/Servers.aspx".toLowerCase()
}

function isCitiesPage() {
    return location.pathname.toLowerCase() == "/Settings/Cities.aspx".toLowerCase()
}

function isRegionsPage() {
    return location.pathname.toLowerCase() == "/Settings/Regions.aspx".toLowerCase()
}

function isAddressesPage() {
    return location.pathname.toLowerCase() == "/Settings/Addresses.aspx".toLowerCase()
}

function isCustomersMainPage() {
    return (location.pathname.toLowerCase() == "/Customers/Main.aspx".toLowerCase());
}

function isUnexecutedClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/UnexecutedClaims.aspx".toLowerCase()
}

function isOverdueClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/OverdueClaims.aspx".toLowerCase()
}

function isLegateUnexecutedClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/LegateUnexecutedClaims.aspx".toLowerCase()
}

function isCommonClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/CommonClaims.aspx".toLowerCase()
}

function isBrigadeClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/BrigadeClaims.aspx".toLowerCase()
}

function isDamageClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/DamageClaims.aspx".toLowerCase()
}

function isRepeatFlatsPage() {
    return location.pathname.toLowerCase() == "/Customers/RepeatFlats.aspx".toLowerCase()
}

function isRepeatClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/RepeatClaims.aspx".toLowerCase()
}

function isLiftClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/LiftClaims.aspx".toLowerCase()
}

function isBreakLiftClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/BreakLiftClaims.aspx".toLowerCase()
}

function isJamLiftClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/JamLiftClaims.aspx".toLowerCase()
}

function isCurrentJamLiftClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/CurrentJamLiftClaims.aspx".toLowerCase()
}

function isUnlegateExecutedLiftClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/UnlegateExecutedLiftClaims.aspx".toLowerCase()
}

function isCessationClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/CessationClaims.aspx".toLowerCase()
}

function isCurrentCessationClaimsPage() {
    return location.pathname.toLowerCase() == "/Customers/CurrentCessationClaims.aspx".toLowerCase()
}


function isTermsPage() {
    return location.pathname.toLowerCase() == "/Customers/Terms.aspx".toLowerCase()
}

function isLiftsPage() {
    return location.pathname.toLowerCase() == "/Customers/Lifts.aspx".toLowerCase()
}

function isHoistsPage() {
    return location.pathname.toLowerCase() == "/Customers/Hoists.aspx".toLowerCase()
}

function isDoorsPage() {
    return location.pathname.toLowerCase() == "/Customers/Doors.aspx".toLowerCase()
}

function isFireSensorsPage() {
    return location.pathname.toLowerCase() == "/Customers/FireSensors.aspx".toLowerCase()
}

function isWaterSensorsPage() {
    return location.pathname.toLowerCase() == "/Customers/WaterSensors.aspx".toLowerCase()
}

function isGasSensorsPage() {
    return location.pathname.toLowerCase() == "/Customers/GasSensors.aspx".toLowerCase()
}

function isTeleControlsPage() {
    return location.pathname.toLowerCase() == "/Customers/TeleControls.aspx".toLowerCase()
}

function isChannelsPage() {
    return location.pathname.toLowerCase() == "/Customers/Channels.aspx".toLowerCase()
}


function isTermEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/TermEvents.aspx".toLowerCase()
}

function isLiftEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/LiftEvents.aspx".toLowerCase()
}

function isHoistEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/HoistEvents.aspx".toLowerCase()
}

function isDoorEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/DoorEvents.aspx".toLowerCase()
}

function isFireSensorEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/FireSensorEvents.aspx".toLowerCase()
}

function isWaterSensorEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/WaterSensorEvents.aspx".toLowerCase()
}

function isGasSensorEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/GasSensorEvents.aspx".toLowerCase()
}

function isChannelEventsPage() {
    return location.pathname.toLowerCase() == "/Customers/ChannelEvents.aspx".toLowerCase()
}


function isResidentClaimsPage() {
    return location.pathname.toLowerCase() == "/Residents/ResidentClaims.aspx".toLowerCase()
}

function isInsertCommonClaimPage() {
    return location.pathname.toLowerCase() == "/Residents/InsertCommonClaim.aspx".toLowerCase()
}

//----------------------------------------------------------------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

function initPageParams() {
    $("body").data("title", document.title);
    window.isServiceError = false;

    $(".logo a").click(function () {
        if (!isCustomersPage())
            return true;

        if (isCustomersMainPage()) {
            location.reload();
            return false;
        }

        var hash = new Object();
        hash.CityId = getCityId();
        hash.RegionId = getRegionId();
        hash.DispId = getDispId();

        document.location.href = "/Customers/Main.aspx#" + $.param(hash);

        return false;
    });
}
