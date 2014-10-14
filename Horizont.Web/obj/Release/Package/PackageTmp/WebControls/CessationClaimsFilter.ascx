<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CessationClaimsFilter.ascx.cs" 
    Inherits="Horizont.Web.CessationClaimsFilter" %>
<div id="cessation_claims_filter_control" >
    <div class="fc-header">
    </div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Номер</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="cessation_claims_filter_regnumber" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Дата</p>
        </div>
        <div class="fc-block-row">
            <label id="cessation_claims_filter_date_from_label">с :</label>
            <asp:CheckBox ID="cessation_claims_filter_date_from_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="cessation_claims_filter_date_from" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="cessation-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claims_filter_validators" ControlToValidate="cessation_claims_filter_date_from" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>

            <label id="cessation_claims_filter_date_to_label">по :</label>
            <asp:CheckBox ID="cessation_claims_filter_date_to_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="cessation_claims_filter_date_to" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="cessation-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claims_filter_validators" ControlToValidate="cessation_claims_filter_date_to" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Адреса</p>
        </div>
        <div class="fc-block-row">
            <asp:DropDownList id="cessation_claims_filter_addresses" multiple="multiple" runat="server" 
                CssClass="ui-corner-all"  ClientIDMode="Static">
            </asp:DropDownList>
        </div>
    </div>

        <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Что отключено</p>
        </div>
        <div class="fc-block-row">
            <label id="cessation_claims_filter_cessation_object_label"></label>
            <asp:DropDownList id="cessation_claims_filter_cessation_object" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static">
                <asp:ListItem Text="Все" Value="0" Selected="True"></asp:ListItem>
                <asp:ListItem Text="ХВ" Value="1"></asp:ListItem>
                <asp:ListItem Text="ГВ" Value="2"></asp:ListItem>
                <asp:ListItem Text="ЦО" Value="3"></asp:ListItem>
                <asp:ListItem Text="ХВ и ГВ" Value="4"></asp:ListItem>
                <asp:ListItem Text="ГВ и ЦО" Value="5"></asp:ListItem>
                <asp:ListItem Text="Электроэнергия" Value="6"></asp:ListItem>
                <asp:ListItem Text="Газ" Value="7"></asp:ListItem>
                <asp:ListItem Text="Антенна" Value="8"></asp:ListItem>
            </asp:DropDownList>
        </div>
    </div>

    <div class="fc-validators">
        <asp:ValidationSummary runat="server" CssClass="cessation-claims-filter-validator" ClientIdMode="AutoID" ValidationGroup="cessation_claims_filter_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
        <div class="hz-dialog-custom-buttons">
            <asp:Button ID="cessation_claims_filter_reset" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сбросить" ValidationGroup="cessation_claims_filter_validators" ClientIdMode="Static"/>
        </div>
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="cessation_claims_filter_ok_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="OK" ValidationGroup="cessation_claims_filter_validators" ClientIdMode="Static"/>
            <asp:Button ID="cessation_claims_filter_cancel_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Отмена"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
