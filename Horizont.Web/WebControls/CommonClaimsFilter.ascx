<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CommonClaimsFilter.ascx.cs" 
    Inherits="Horizont.Web.CommonClaimsFilter" %>
<div id="common_claims_filter_control" >
    <div class="fc-header">
    </div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Номер</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="common_claims_filter_regnumber" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Дата</p>
        </div>
        <div class="fc-block-row">
            <label id="common_claims_filter_date_from_label">с :</label>
            <asp:CheckBox ID="common_claims_filter_date_from_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="common_claims_filter_date_from" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="common-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claims_filter_validators" ControlToValidate="common_claims_filter_date_from" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>

            <label id="common_claims_filter_date_to_label">по :</label>
            <asp:CheckBox ID="common_claims_filter_date_to_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="common_claims_filter_date_to" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="common-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claims_filter_validators" ControlToValidate="common_claims_filter_date_to" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Журнал</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="common_claims_filter_journal" placeholder="Все журналы" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Адрес</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="common_claims_filter_address" placeholder="Все адреса" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>

            <label id="common_claims_filter_doorway_label">под.</label>
            <asp:TextBox ID="common_claims_filter_doorway" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator1" runat="server" Text="*" CssClass="common-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claims_filter_validators" ControlToValidate="common_claims_filter_doorway"
                ErrorMessage="Номер подъезда должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>

            <label id="common_claims_filter_flat_label">кв.</label>
            <asp:TextBox ID="common_claims_filter_flat" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator2" runat="server" Text="*" CssClass="common-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claims_filter_validators" ControlToValidate="common_claims_filter_flat"
                ErrorMessage="Номер квартиры должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
        </div>
    </div>

    <div class="fc-validators">
        <asp:ValidationSummary runat="server" CssClass="common-claims-filter-validator" ClientIdMode="AutoID" ValidationGroup="common_claims_filter_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
        <div class="hz-dialog-custom-buttons">
            <asp:Button ID="common_claims_filter_reset" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сбросить" ValidationGroup="common_claims_filter_validators" ClientIdMode="Static"/>
        </div>
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="common_claims_filter_ok_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="OK" ValidationGroup="common_claims_filter_validators" ClientIdMode="Static"/>
            <asp:Button ID="common_claims_filter_cancel_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Отмена"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
