<%@ Page Title="Информация по заявке" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="CommonClaimInfo.aspx.cs" Inherits="Horizont.Web.CommonClaimInfo" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/residents.css" rel="stylesheet" type="text/css" />
    <link href="/Styles/print.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/residents.js" type="text/javascript"></script>
    <script src="/Scripts/claim-controls.js" type="text/javascript"></script>
	<script src="/jquery-plugins/jquery-print/jquery.printArea.js" type="text/javascript" charset="utf-8" ></script>
    <script src="/Scripts/print.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initCommonClaimInfoPage();
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
        <div id="InsertClaimStatus" runat="server" ClientIdMode="Static">
            <div id="InsertSuccessStatus" runat="server" ClientIdMode="Static">
		        <h2 class="page-headline-inner green">Заявка успешно внесена на ОДС</h2>
            </div>
            <div id="InsertErrorStatus" runat="server" ClientIdMode="Static">
		        <h2 class="page-headline-inner red">Произошла ошибка при внесении заявки!</h2>
		        <div class="page-inner-box">
                    <p>Скорее всего ошибка является следствием неполадок на сервере. Попробуйте внести заявку через некоторое время.</p>
                </div>
            </div>
        </div>
		<div id="ClaimInfo" class="page-inner-box" runat="server" ClientIdMode="Static">
    		<h3 class="page-headline-inner">Информация по заявке</h3>
		    <div class="page-inner-box">
                <div id="ClaimRegnumberWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Регистрационный номер:</span>
                    <span id="ClaimRegnumber" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimOwnerWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Заявитель:</span>
                    <span id="ClaimOwner" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimAddressWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Адрес заявителя:</span>
                    <span id="ClaimAddress" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimJournalWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Вид работ:</span>
                    <span id="ClaimJournal" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimFailureWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Неисправность:</span>
                    <span id="ClaimFailure" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimCommenWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Примечание:</span>
                    <span id="ClaimComment" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimSentTimeWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Отправлена:</span>
                    <span id="ClaimSentTime" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimDeliveredTimeWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Доставлена:</span>
                    <span id="ClaimDeliveredTime" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimReceivedTimeWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Принята в работу:</span>
                    <span id="ClaimReceivedTime" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimReceivedOperatorWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Диспетчер:</span>
                    <span id="ClaimReceivedOperator" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimExecutedTimeWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Дата исполнения:</span>
                    <span id="ClaimExecutedTime" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="ClaimStatusWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Статус:</span>
                    <span id="ClaimStatus" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
            </div>

    		<h3 class="page-headline-inner">Информация по ОДС</h3>
		    <div class="page-inner-box">
                <div id="DispNameWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Название:</span>
                    <span id="DispName" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="DispAddressWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Адрес:</span>
                    <span id="DispAddress" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
                <div id="DispPhoneWrap" runat="server" class="claim-info-row" ClientIdMode="Static">
                    <span class="claim-info-label">Телефон:</span>
                    <span id="DispPhone" runat="server" class="claim-info-field" ClientIdMode="Static"></span>
                </div>
            </div>
        </div>

        <p class="page-submit">
            <asp:Button ID="CommonClaimPrintButton" runat="server" Text="Печать" ClientIDMode="Static"/>
            <asp:Button ID="ResidentClaimsButton" runat="server" OnClick="OnResidentClaimsBtnClick" 
                Text="Мои заявки" ClientIDMode="Static"/>
        </p>
    </div>
</asp:Content>

