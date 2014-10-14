//----------------------------------------------------------------------------
// ОСНОВНЫЕ ФУНКЦИИ 

function initPageHistory() {
    if ($.type(window.onpopstate) == "undefined")
        return;
    window.onpopstate = function (event) {
        loading(true, 500);
        if (!restorePageState(event.state, function () { loading(false); }, serviceError))
            loading(false);
    };
}

function pushHistoryState() {
    if ($.type(history.pushState) == "undefined")
        return;
    if (!needToChangeHistoryState())
        return;
    var state = savePageState();
    if (state == null)
        return;
    history.pushState(state, document.title, location.pathname + location.search + "#" + $.param(state));
}

function replaceHistoryState() {
    if ($.type(history.replaceState) == "undefined")
        return;
    if (!needToChangeHistoryState())
        return;
    var state = savePageState();
    if (state == null)
        return;
    history.replaceState(state, document.title, location.pathname + location.search + "#" + $.param(state));
}

function restorePageFromHash(fnCallBack, fnError) {
    var state = null;
    if (location.hash != "") 
        state = $.deparam(location.hash.substring(1), true);
    return restorePageState(state, fnCallBack, fnError);
}

function needToChangeHistoryState() {
    return (!window.isInitialization
        && !window.restoringDataTableState
        && !window.restoringCommonClaimState
        && !window.restoringLiftClaimState
        && !window.restoringCessationClaimState
        && !window.restoringCommonClaimsFilterState
        && !window.restoringLiftClaimsFilterState
        && !window.restoringCessationClaimsFilterState
        && !window.restoringRepeatFlatsFilterState
        && !window.restoringDateSpanFilterState
        && !window.restoringElvObjectsFilterState
        && !window.restoringElvObjectEventsFilterState
        && !window.restoringUserControlState
        && !window.restoringUserRulesState
        && !window.restoringUserRuleState
        && !window.restoringServerControlState
        && !window.restoringCityControlState
        && !window.restoringRegionControlState
        && !window.restoringCustomersMainPageState);
}

//----------------------------------------------------------------------------
// ФУНКЦИИ СОХРАНЕНИЯ И ВОССТАНОВЛЕНИЯ СОСТОЯНИЯ СТРАНИЦ

function savePageState() {
    if (isUsersPage())
        return saveUsersPageState();
    if (isServersPage())
        return saveServersPageState();
    if (isCitiesPage())
        return saveCitiesPageState();
    if (isRegionsPage())
        return saveRegionsPageState();
    if (isAddressesPage())
        return saveAddressesPageState();
    if (isCustomersMainPage())
        return saveCustomersMainPageState();
    if (isUnexecutedClaimsPage())
        return saveUnexecutedClaimsState();
    if (isOverdueClaimsPage())
        return saveOverdueClaimsState();
    if (isLegateUnexecutedClaimsPage())
        return saveLegateUnexecutedClaimsState();
    if (isCommonClaimsPage())
        return saveCommonClaimsState();
    if (isBrigadeClaimsPage())
        return saveBrigadeClaimsState();
    if (isDamageClaimsPage())
        return saveDamageClaimsState();
    if (isRepeatFlatsPage())
        return saveRepeatFlatsState();
    if (isRepeatClaimsPage())
        return saveRepeatClaimsState();
    if (isLiftClaimsPage())
        return saveLiftClaimsState();
    if (isBreakLiftClaimsPage())
        return saveBreakLiftClaimsState();
    if (isJamLiftClaimsPage())
        return saveJamLiftClaimsState();
    if (isCurrentJamLiftClaimsPage())
        return saveCurrentJamLiftClaimsState();
    if (isUnlegateExecutedLiftClaimsPage())
        return saveUnlegateExecutedLiftClaimsState();
    if (isCessationClaimsPage())
        return saveCessationClaimsState();
    if (isCurrentCessationClaimsPage())
        return saveCurrentCessationClaimsState();
    if (isTermsPage() || isLiftsPage() || isHoistsPage() || isDoorsPage() || isFireSensorsPage() || isWaterSensorsPage() || isGasSensorsPage() || isTeleControlsPage() || isChannelsPage())
        return saveElvObjectsState();
    if (isTermEventsPage() || isLiftEventsPage() || isHoistEventsPage() || isDoorEventsPage() || isFireSensorEventsPage() || isWaterSensorEventsPage() || isGasSensorEventsPage() || isChannelEventsPage())
        return saveElvObjectEventsState();
    if (isResidentClaimsPage())
        return saveResidentClaimsState();
    return null;
}

function restorePageState(state, fnCallBack, fnError) {
    if ((state == null) && window.isInitialization)
        return false;

    if (isUsersPage())
        return restoreUsersPageState(state, fnCallBack, fnError);
    if (isServersPage())
        return restoreServersPageState(state, fnCallBack, fnError);
    if (isCitiesPage())
        return restoreCitiesPageState(state, fnCallBack, fnError);
    if (isRegionsPage())
        return restoreRegionsPageState(state, fnCallBack, fnError);
    if (isAddressesPage())
        return restoreAddressesPageState(state, fnCallBack, fnError);
    if (isCustomersMainPage())
        return restoreCustomersMainPageState(state, fnCallBack, fnError);
    if (isUnexecutedClaimsPage())
        return restoreUnexecutedClaimsState(state, fnCallBack, fnError);
    if (isOverdueClaimsPage())
        return restoreOverdueClaimsState(state, fnCallBack, fnError);
    if (isLegateUnexecutedClaimsPage())
        return restoreLegateUnexecutedClaimsState(state, fnCallBack, fnError);
    if (isCommonClaimsPage())
        return restoreCommonClaimsState(state, fnCallBack, fnError);
    if (isBrigadeClaimsPage())
        return restoreBrigadeClaimsState(state, fnCallBack, fnError);
    if (isDamageClaimsPage())
        return restoreDamageClaimsState(state, fnCallBack, fnError);
    if (isRepeatFlatsPage())
        return restoreRepeatFlatsState(state, fnCallBack, fnError);
    if (isRepeatClaimsPage())
        return restoreRepeatClaimsState(state, fnCallBack, fnError);
    if (isLiftClaimsPage())
        return restoreLiftClaimsState(state, fnCallBack, fnError);
    if (isBreakLiftClaimsPage())
        return restoreBreakLiftClaimsState(state, fnCallBack, fnError);
    if (isJamLiftClaimsPage())
        return restoreJamLiftClaimsState(state, fnCallBack, fnError);
    if (isCurrentJamLiftClaimsPage())
        return restoreCurrentJamLiftClaimsState(state, fnCallBack, fnError);
    if (isUnlegateExecutedLiftClaimsPage())
        return restoreUnlegateExecutedLiftClaimsState(state, fnCallBack, fnError);
    if (isCessationClaimsPage())
        return restoreCessationClaimsState(state, fnCallBack, fnError);
    if (isCurrentCessationClaimsPage())
        return restoreCurrentCessationClaimsState(state, fnCallBack, fnError);
    if (isTermsPage() || isLiftsPage() || isHoistsPage() || isDoorsPage() || isFireSensorsPage() || isWaterSensorsPage() || isGasSensorsPage() || isTeleControlsPage() || isChannelsPage())
        restoreElvObjectsState(state, fnCallBack, fnError);
    if (isTermEventsPage() || isLiftEventsPage() || isHoistEventsPage() || isDoorEventsPage() || isFireSensorEventsPage() || isWaterSensorEventsPage() || isGasSensorEventsPage() || isChannelEventsPage())
        return restoreElvObjectEventsState(state, fnCallBack, fnError);
    if (isResidentClaimsPage())
        return restoreResidentClaimsState(state, fnCallBack, fnError);

    fnCallBack();
    return false;
}

//----------------------------------------------------------------------------
// Users Page

function saveUsersPageState() {
    var state = new Object();
    state = saveDataTableState(state);
    state = saveUserControlState(state);
    state = saveUserRulesState(state);
    state = saveUserRuleState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreUsersPageState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreUserControlState(state, function () {
        restoreUserRulesState(state, function () {
            restoreUserRuleState(state, fnCallBack, fnError);
        }, fnError);
    }, fnError);

    return true;
}

//----------------------------------------------------------------------------
// Servers Page

function saveServersPageState() {
    var state = new Object();
    state = saveDataTableState(state);
    state = saveServerControlState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreServersPageState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreServerControlState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// Cities Page

function saveCitiesPageState() {
    var state = new Object();
    state = saveDataTableState(state);
    state = saveCityControlState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreCitiesPageState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCityControlState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// Regions Page

function saveRegionsPageState() {
    var state = new Object();
    state = saveDataTableState(state);
    state = saveRegionControlState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreRegionsPageState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreRegionControlState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// Addresses Page

function saveAddressesPageState() {
    var state = new Object();
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreAddressesPageState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);

    fnCallBack();
    return true;
}

//----------------------------------------------------------------------------
// CustomersMain Page

function saveCustomersMainPageState() {
    var state = new Object();
    state.CityId = getCityId();
    state.RegionId = getRegionId();
    state.DispId = getDispId();
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreCustomersMainPageState(state, fnCallBack, fnError) {
    if (window.restoringCustomersMainPageState) {
        fnCallBack();
        return;
    }

    window.restoringCustomersMainPageState = true;
    updateCitiesList(function () {
        window.restoringCustomersMainPageState = false;
        fnCallBack();
    },
    function () {
        setClaimsCountObject(null);
        setElvCountObject(null);
        fnError();
    }, state);

    return true;
}

//----------------------------------------------------------------------------

function saveUnexecutedClaimsState() {
    var state = new Object();
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreUnexecutedClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// OverdueClaims Page

function saveOverdueClaimsState() {
    var state = new Object();
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreOverdueClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
} 

//----------------------------------------------------------------------------
// LegateUnexecutedClaims

function saveLegateUnexecutedClaimsState() {
    var state = new Object();
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreLegateUnexecutedClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// CommonClaims Page

function saveCommonClaimsState() {
    var state = new Object();
    state = saveCommonClaimsFilterState(state);
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreCommonClaimsState(state, fnCallBack, fnError) {
    var changed = restoreCommonClaimsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// BrigadeClaims Page

function saveBrigadeClaimsState() {
    var state = new Object();
    state = saveDateSpanFilterState(state);
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreBrigadeClaimsState(state, fnCallBack, fnError) {
    var changed = restoreDateSpanFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// DamageClaims Page

function saveDamageClaimsState() {
    var state = new Object();
    state = saveDateSpanFilterState(state);
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreDamageClaimsState(state, fnCallBack, fnError) {
    var changed = restoreDateSpanFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// RepeatFlats Page

function saveRepeatFlatsState() {
    var state = new Object();
    state = saveRepeatFlatsFilterState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreRepeatFlatsState(state, fnCallBack, fnError) {
    var changed = restoreRepeatFlatsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);

    fnCallBack();
    return true;
}

//----------------------------------------------------------------------------
// RepeatClaims Page

function saveRepeatClaimsState() {
    var state = new Object();
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreRepeatClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// LiftClaims Page

function saveLiftClaimsState() {
    var state = new Object();
    state = saveLiftClaimsFilterState(state);
    state = saveLiftClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreLiftClaimsState(state, fnCallBack, fnError) {
    var changed = restoreLiftClaimsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);
    restoreLiftClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// BreakLiftClaims Page

function saveBreakLiftClaimsState() {
    var state = new Object();
    state = saveLiftClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreBreakLiftClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreLiftClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// JamLiftClaims Page

function saveJamLiftClaimsState() {
    var state = new Object();
    state = saveLiftClaimsFilterState(state);
    state = saveLiftClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreJamLiftClaimsState(state, fnCallBack, fnError) {
    var changed = restoreLiftClaimsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);
    restoreLiftClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// CurrentJamLiftClaims Page

function saveCurrentJamLiftClaimsState() {
    var state = new Object();
    state = saveLiftClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreCurrentJamLiftClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreLiftClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// UnlegateExecutedLiftClaims Page

function saveUnlegateExecutedLiftClaimsState() {
    var state = new Object();
    state = saveLiftClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreUnlegateExecutedLiftClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreLiftClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// CessationClaims Page

function saveCessationClaimsState() {
    var state = new Object();
    state = saveCessationClaimsFilterState(state);
    state = saveCessationClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreCessationClaimsState(state, fnCallBack, fnError) {
    var changed = restoreCessationClaimsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);
    restoreCessationClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// CurrentCessationClaims Page

function saveCurrentCessationClaimsState() {
    var state = new Object();
    state = saveCessationClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreCurrentCessationClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCessationClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// ElvObjects Page

function saveElvObjectsState() {
    var state = new Object();
    state = saveElvObjectsFilterState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreElvObjectsState(state, fnCallBack, fnError) {
    var changed = restoreElvObjectsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);

    fnCallBack();
    return true;
}

//----------------------------------------------------------------------------
// ElvObjectEvents Page

function saveElvObjectEventsState() {
    var state = new Object();
    state = saveElvObjectEventsFilterState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreElvObjectEventsState(state, fnCallBack, fnError) {
    var changed = restoreElvObjectEventsFilterState(state);
    restoreDataTableState(state, window.isInitialization || changed);

    fnCallBack();
    return true;
}

//----------------------------------------------------------------------------
// ResidentClaims Page

function saveResidentClaimsState() {
    var state = new Object();
    state = saveCommonClaimState(state);
    state = saveDataTableState(state);
    state.PageStateId = Math.floor(Math.random() * 10000);

    return state;
}

function restoreResidentClaimsState(state, fnCallBack, fnError) {
    restoreDataTableState(state, window.isInitialization);
    restoreCommonClaimState(state, fnCallBack, fnError);

    return true;
}

//----------------------------------------------------------------------------
// Data Table

function saveDataTableState(state) {
    state.DataTablePage = getDataTablePage();
    return state;
}

function restoreDataTableState(state, refresh) {
    if ((state != null) && ((state.DataTablePage > getDataTablePagesCount() - 1) || (state.DataTablePage < 0)))
        state.DataTablePage = 0;

    window.restoringDataTableState = true;

    if ((state != null) && (state.Filter != null) && state.Filter.IsInitState) {
        clearDataTable();
        window.restoringDataTableState = false;
        return;
    }

    if (!refresh) {
        setDataTablePage((state != null) ? state.DataTablePage : 0);
        window.restoringDataTableState = false;
        return;
    }

    updateDataTable(function (oSettings) {
        setDataTablePage((state != null) ? state.DataTablePage : 0);
        window.restoringDataTableState = false;
    });

    return true;
}

//----------------------------------------------------------------------------
// CommonClaim Control

function saveCommonClaimState(state) {
    state.ShowClaim = $("#common_claim_dialog").dialog("isOpen");

    if (state.ShowClaim) {
        var claim = $("#common_claim_control").data("object");
        state.ClaimId = claim.Id;
    }

    return state;
}

function restoreCommonClaimState(state, fnCallBack, fnError) {
    window.restoringCommonClaimState = true;
    if ($("#common_claim_dialog").dialog("isOpen"))
        $("#common_claim_dialog").dialog("close");
    window.restoringCommonClaimState = false;

    if ((state == null) || !state.ShowClaim) {
        fnCallBack();
        return true;
    }

    if (state.ShowClaim) {
        window.restoringCommonClaimState = true;

        var service = new Horizont.Web.ClaimsWebService();
        service.GetCommonClaim(state.ClaimId, getRegionId (), function (claim) {
            if (claim == null) {
                fnError();
                return;
            }

            commonClaimDlg(claim);

            fnCallBack();
            window.restoringCommonClaimState = false;
        }, fnError, null);
    }
}

//----------------------------------------------------------------------------
// LiftClaim Control

function saveLiftClaimState(state) {
    state.ShowClaim = $("#lift_claim_dialog").dialog("isOpen");

    if (state.ShowClaim) {
        var claim = $("#lift_claim_control").data("object");
        state.ClaimId = claim.Id;
    }

    return state;
}

function restoreLiftClaimState(state, fnCallBack, fnError) {
    window.restoringLiftClaimState = true;
    if ($("#lift_claim_dialog").dialog("isOpen"))
        $("#lift_claim_dialog").dialog("close");
    window.restoringLiftClaimState = false;

    if ((state == null) || !state.ShowClaim) {
        fnCallBack();
        return true;
    }

    if (state.ShowClaim) {
        window.restoringLiftClaimState = true;

        var service = new Horizont.Web.ClaimsWebService();
        service.GetLiftClaim(state.ClaimId, getRegionId (), function (claim) {
            if (claim == null) {
                fnError();
                return;
            }

            liftClaimDlg(claim);

            fnCallBack();
            window.restoringLiftClaimState = false;
        }, fnError, null);
    }
}

//----------------------------------------------------------------------------
// CessationClaim Control

function saveCessationClaimState(state) {
    state.ShowClaim = $("#cessation_claim_dialog").dialog("isOpen");

    if (state.ShowClaim) {
        var claim = $("#cessation_claim_control").data("object");
        state.ClaimId = claim.Id;
    }

    return state;
}

function restoreCessationClaimState(state, fnCallBack, fnError) {
    window.restoringCessationClaimState = true;
    if ($("#cessation_claim_dialog").dialog("isOpen"))
        $("#cessation_claim_dialog").dialog("close");
    window.restoringCessationClaimState = false;

    if ((state == null) || !state.ShowClaim) {
        fnCallBack();
        return true;
    }

    if (state.ShowClaim) {
        window.restoringCessationClaimState = true;

        var service = new Horizont.Web.ClaimsWebService();
        service.GetCessationClaim(state.ClaimId, getRegionId (), function (claim) {
            if (claim == null) {
                fnError();
                return;
            }

            cessationClaimDlg(claim);

            fnCallBack();
            window.restoringCessationClaimState = false;
        }, fnError, null);
    }
}

//----------------------------------------------------------------------------
// CommonClaimsFilter Control

function saveCommonClaimsFilterState(state) {
    state.ShowFilter = $("#common_claims_filter_dialog").dialog("isOpen");
    state.Filter = saveCommonClaimsFilter();

    return state;
}

function restoreCommonClaimsFilterState(state) {
    if (state != null) {
        if (state.Filter == "")
            state.Filter = null;
        if (state.Filter != null) {
            if (state.Filter.JournalObject == "")
                state.Filter.JournalObject = null;
            if (state.Filter.AddressObject == "")
                state.Filter.AddressObject = null;
        }
    }
    var changed = (state != null) && isCommonClaimsFilterChanged(state.Filter);

    window.restoringCommonClaimsFilterState = true;

    $("#common_claims_filter_dialog").dialog("close");
    if (state != null)
        restoreCommonClaimsFilter(state.Filter);
    if ((state == null) || (state.ShowFilter))
        commonClaimsFilterDlg();

    window.restoringCommonClaimsFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// LiftClaimsFilter Control

function saveLiftClaimsFilterState(state) {
    state.ShowFilter = $("#lift_claims_filter_dialog").dialog("isOpen");
    state.Filter = saveLiftClaimsFilter();

    return state;
}

function restoreLiftClaimsFilterState(state) {
    if (state != null) {
        if (state.Filter == "")
            state.Filter = null;
        if (state.Filter != null) {
            if (state.Filter.AddressObject == "")
                state.Filter.AddressObject = null;
        }
    }
    var changed = (state != null) && isLiftClaimsFilterChanged(state.Filter);

    window.restoringLiftClaimsFilterState = true;

    $("#lift_claims_filter_dialog").dialog("close");
    if (state != null)
        restoreLiftClaimsFilter(state.Filter);
    if ((state == null) || (state.ShowFilter))
        liftClaimsFilterDlg();

    window.restoringLiftClaimsFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// CessationClaimsFilter Control

function saveCessationClaimsFilterState(state) {
    state.ShowFilter = $("#cessation_claims_filter_dialog").dialog("isOpen");
    state.Filter = saveCessationClaimsFilter();
    
    return state;
}

function restoreCessationClaimsFilterState(state) {
    if ((state != null) && (state.Filter == ""))
        state.Filter = null;

    var changed = (state != null) && isCessationClaimsFilterChanged(state.Filter);

    window.restoringCessationClaimsFilterState = true;

    $("#cessation_claims_filter_dialog").dialog("close");
    if (state != null)
        restoreCessationClaimsFilter(state.Filter);
    if ((state == null) || (state.ShowFilter))
        cessationClaimsFilterDlg();

    window.restoringCessationClaimsFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// RepeatFlatsFilter Control

function saveRepeatFlatsFilterState(state) {
    state.ShowFilter = $("#repeat_flats_filter_dialog").dialog("isOpen");
    state.Filter = saveRepeatFlatsFilter();

    return state;
}

function restoreRepeatFlatsFilterState(state) {
    if (state != null) {
        if (state.Filter == "")
            state.Filter = null;
        if (state.Filter != null) {
            if (state.Filter.JournalObject == "")
                state.Filter.JournalObject = null;
        }
    }

    var changed = (state != null) && isRepeatFlatsFilterChanged(state.Filter);

    window.restoringRepeatFlatsFilterState = true;

    $("#repeat_flats_filter_dialog").dialog("close");
    if (state != null)
        restoreRepeatFlatsFilter(state.Filter);
    if ((state == null) || (state.ShowFilter))
        repeatFlatsFilterDlg();

    window.restoringRepeatFlatsFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// DateSpanFilter Control

function saveDateSpanFilterState(state) {
    state.ShowFilter = $("#date_span_filter_dialog").dialog("isOpen");
    state.Filter = saveDateSpanFilter();

    return state;
}

function restoreDateSpanFilterState(state) {
    if ((state != null) && (state.Filter == ""))
        state.Filter = null;

    var changed = (state != null) && isDateSpanFilterChanged(state.Filter);

    window.restoringDateSpanFilterState = true;

    $("#date_span_filter_dialog").dialog("close");
    if (state != null)
        restoreDateSpanFilter(state.Filter);
    if ((state == null) || (state.ShowFilter))
        dateSpanFilterDlg();

    window.restoringDateSpanFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// ElvObjectsFilter Control

function saveElvObjectsFilterState(state) {
    state.Filter = saveElvObjectsFilter();

    return state;
}

function restoreElvObjectsFilterState(state) {
    var changed = isElvObjectsFilterChanged((state == null) ? null : ((state.Filter != "") ? state.Filter : null));

    window.restoringElvObjectsFilterState = true;
    restoreElvObjectsFilter((state == null) ? null : ((state.Filter != "") ? state.Filter : null));
    window.restoringElvObjectsFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// ElvObjectEventsFilter Control

function saveElvObjectEventsFilterState(state) {
    state.ShowFilter = $("#elv_object_events_filter_dialog").dialog("isOpen");
    state.Filter = saveElvObjectEventsFilter();

    return state;
}

function restoreElvObjectEventsFilterState(state) {
    if ((state != null) && (state.Filter == ""))
        state.Filter = null;

    var changed = (state != null) && isElvObjectEventsFilterChanged(state.Filter);

    window.restoringElvObjectEventsFilterState = true;

    $("#elv_object_events_filter_dialog").dialog("close");
    if (state != null)
        restoreElvObjectEventsFilter(state.Filter);
    if ((state == null) || (state.ShowFilter))
        elvObjectEventsFilterDlg();

    window.restoringElvObjectEventsFilterState = false;

    return changed;
}

//----------------------------------------------------------------------------
// User Control

function saveUserControlState(state) {
    var isopen = $("#user_dialog").dialog("isOpen");
    var user = $("#user_control").data("object");

    state.UserControlStatus = isopen ? ((user != null) ? 1 : 2) : 0

    if (state.UserControlStatus == 1)
        state.Username = user.Username;
    if (state.UserControlStatus == 2)
        state.UserControlState = saveUserControl();

    return state;
}

function restoreUserControlState(state, fnCallBack, fnError) {
    window.restoringUserControlState = true;
    if ($("#user_dialog").dialog("isOpen"))
        $("#user_dialog").dialog("close");
    window.restoringUserControlState = false;

    if ((state == null) || (state.UserControlStatus == 0)) {
        fnCallBack();
        return true;
    }

    if (state.UserControlStatus == 1) {
        window.restoringUserControlState = true;

        var service = new Horizont.Web.UsersWebService();
        service.GetUser(state.Username, function (user) {
            if (user == null) {
                fnError();
                window.restoringUserControlState = false;
                return;
            }

            userDlg(user, function () {
                fnCallBack();
                window.restoringUserControlState = false;
            }, function () {
                fnError();
                window.restoringUserControlState = false;
            });

        }, function () {
            fnError();
            window.restoringUserControlState = false;
        }, null);
    }

    if (state.UserControlStatus == 2) {
        window.restoringUserControlState = true;
        createUserDlg(function () {
            fnCallBack();
            window.restoringUserControlState = false;
        }, function () {
            fnError();
            window.restoringUserControlState = false;
        }, state.UserControlState);
    }
}

//----------------------------------------------------------------------------
// UserRules Control

function saveUserRulesState(state) {
    var isopen = $("#user_rules_dialog").dialog("isOpen");
    var user = $("#user_rules_control").data("object");

    state.UserRulesStatus = isopen ? 1 : 0

    if (state.UserRulesStatus == 1)
        state.Username = user.Username;

    return state;
}

function restoreUserRulesState(state, fnCallBack, fnError) {
    window.restoringUserRulesState = true;

    if ((state == null) || (state.UserRulesStatus == 0)) {
        $("#user_rules_dialog").dialog("close");

        fnCallBack();
        window.restoringUserRulesState = false;
        return;
    }

    if (state.UserRulesStatus == 1) {
        var service = new Horizont.Web.UsersWebService();
        service.GetUser(state.Username, function (user) {
            if (user == null) {
                fnError();
                window.restoringUserRulesState = false;
                return;
            }

            userRulesDlg(user, function () {
                fnCallBack();
                window.restoringUserRulesState = false;
            });

        }, function () {
            fnError();
            window.restoringUserRulesState = false;
        }, null);
    }
}

//----------------------------------------------------------------------------
// UserRule Control

function saveUserRuleState(state) {
    var isopen = $("#user_rule_dialog").dialog("isOpen");
    var rule = $("#user_rule_control").data("object");

    state.UserRuleStatus = isopen ? ((rule != null) ? 1 : 2) : 0

    if (state.UserRuleStatus == 1)
        state.UserRuleId = rule.Id;
    if (state.UserRuleStatus == 2)
        state.UserRuleState = saveUserRuleControl();

    return state;
}

function restoreUserRuleState(state, fnCallBack, fnError) {
    window.restoringUserRuleState = true;

    var user = $("#user_rules_control").data("object");
    if ((state == null) || (state.UserRuleStatus == 0) || (user == null)) {
        $("#user_rule_dialog").dialog("close");

        fnCallBack();
        window.restoringUserRuleState = false;
        return true;
    }

    if (state.UserRuleStatus == 1) {
        var service = new Horizont.Web.UsersWebService();
        service.GetUserRule(state.UserRuleId, function (rule) {
            if (rule == null) {
                fnError();
                window.restoringUserRuleState = false;
                return;
            }

            userRuleDlg(user, rule, function () {
                fnCallBack();
                window.restoringUserRuleState = false;
            }, fnError);

        }, function () {
            fnError();
            window.restoringUserRuleState = false;
        }, null);
    }

    if (state.UserRuleStatus == 2) {
        window.restoringUserRuleState = true;
        createUserRuleDlg(user, function () {
            fnCallBack();
            window.restoringUserRuleState = false;
        }, fnError, state.UserRuleState)
    }
}

//----------------------------------------------------------------------------
// Server Control

function saveServerControlState(state) {
    var isopen = $("#server_dialog").dialog("isOpen");
    var server = $("#server_control").data("object");

    state.ServerControlStatus = isopen ? ((server != null) ? 1 : 2) : 0

    if (state.ServerControlStatus == 1)
        state.ServerId = server.Id;
    if (state.ServerControlStatus == 2)
        state.ServerControlState = saveServerControl();

    return state;
}

function restoreServerControlState(state, fnCallBack, fnError) {
    window.restoringServerControlState = true;

    if ((state == null) || (state.ServerControlStatus == 0)) {
        $("#server_dialog").dialog("close");

        fnCallBack();
        window.restoringServerControlState = false;
        return true;
    }

    if (state.ServerControlStatus == 1) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetServer(state.ServerId, function (server) {
            if (server == null) {
                fnError();
                window.restoringServerControlState = false;
                return;
            }

            serverDlg(server);

            fnCallBack();
            window.restoringServerControlState = false;
        }, function () {
            fnError();
            window.restoringServerControlState = false;
        }, null);
    }

    if (state.ServerControlStatus == 2) {
        createServerDlg(state.ServerControlState);

        fnCallBack();
        window.restoringServerControlState = false;
    }
}

//----------------------------------------------------------------------------
// City Control

function saveCityControlState(state) {
    var isopen = $("#city_dialog").dialog("isOpen");
    var city = $("#city_control").data("object");

    state.CityControlStatus = isopen ? ((city != null) ? 1 : 2) : 0

    if (state.CityControlStatus == 1)
        state.CityId = city.Id;
    if (state.CityControlStatus == 2)
        state.CityControlState = saveCityControl();

    return state;
}

function restoreCityControlState(state, fnCallBack, fnError) {
    window.restoringCityControlState = true;

    if ((state == null) || (state.CityControlStatus == 0)) {
        $("#city_dialog").dialog("close");

        fnCallBack();
        window.restoringCityControlState = false;
        return true;
    }

    if (state.CityControlStatus == 1) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetCity(state.CityId, function (city) {
            if (city == null) {
                fnError();
                window.restoringCityControlState = false;
                return;
            }

            cityDlg(city);

            fnCallBack();
            window.restoringCityControlState = false;
        }, function () {
            fnError();
            window.restoringCityControlState = false;
        }, null);
    }

    if (state.CityControlStatus == 2) {
        createCityDlg(state.CityControlState);

        fnCallBack();
        window.restoringCityControlState = false;
    }
}

//----------------------------------------------------------------------------
// Region Control

function saveRegionControlState(state) {
    var isopen = $("#region_dialog").dialog("isOpen");
    var region = $("#region_control").data("object");

    state.RegionControlStatus = isopen ? ((region != null) ? 1 : 2) : 0

    if (state.RegionControlStatus == 1)
        state.RegionId = region.Id;
    if (state.RegionControlStatus == 2)
        state.RegionControlState = saveRegionControl();

    return state;
}

function restoreRegionControlState(state, fnCallBack, fnError) {
    window.restoringRegionControlState = true;

    if ((state == null) || (state.RegionControlStatus == 0)) {
        $("#region_dialog").dialog("close");

        fnCallBack();
        window.restoringRegionControlState = false;
        return true;
    }

    if (state.RegionControlStatus == 1) {
        var service = new Horizont.Web.RegionsWebService();
        service.GetRegion(state.RegionId, function (region) {
            if (region == null) {
                fnError();
                window.restoringRegionControlState = false;
                return;
            }

            regionDlg(region, function () {
                fnCallBack();
                window.restoringRegionControlState = false;
            }, fnError);
        }, function () {
            fnError();
            window.restoringRegionControlState = false;
        }, null);
    }

    if (state.RegionControlStatus == 2) {
        createRegionDlg(function () {
            fnCallBack();
            window.restoringRegionControlState = false;
        }, fnError, state.RegionControlState);
    }
}
