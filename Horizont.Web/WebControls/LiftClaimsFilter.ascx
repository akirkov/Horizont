<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LiftClaimsFilter.ascx.cs" 
    Inherits="Horizont.Web.LiftClaimsFilter" %>
<div id="lift_claims_filter_control" >
    <div class="fc-header">
    </div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Номер</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="lift_claims_filter_regnumber" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Дата</p>
        </div>
        <div class="fc-block-row">
            <label id="lift_claims_filter_date_from_label">с :</label>
            <asp:CheckBox ID="lift_claims_filter_date_from_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="lift_claims_filter_date_from" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="lift-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="lift_claims_filter_validators" ControlToValidate="lift_claims_filter_date_from" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>

            <label id="lift_claims_filter_date_to_label">по :</label>
            <asp:CheckBox ID="lift_claims_filter_date_to_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="lift_claims_filter_date_to" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="lift-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="lift_claims_filter_validators" ControlToValidate="lift_claims_filter_date_to" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Адрес</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="lift_claims_filter_address" placeholder="Все адреса" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>

            <label id="lift_claims_filter_doorway_label">Подъезд</label>
            <asp:TextBox ID="lift_claims_filter_doorway" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator2" runat="server" Text="*" CssClass="lift-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="lift_claims_filter_validators" ControlToValidate="lift_claims_filter_doorway"
                ErrorMessage="Подъезд должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Время простоя</p>
        </div>
        <div class="fc-block-row">
            <label id="lift_claims_filter_minstaytime_label">от</label>
            <asp:TextBox ID="lift_claims_filter_minstaytime" CssClass = "ui-corner-all" runat="server" 
                ClientIDMode="Static">180</asp:TextBox>
            <asp:CompareValidator ID="CompareValidator7" runat="server" Text="*" CssClass="lift-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="lift_claims_filter_validators" ControlToValidate="lift_claims_filter_minstaytime"
                ErrorMessage="Время простоя должно быть неотрицательным числом." Display="None" SetFocusOnError="True" Operator="GreaterThanEqual" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
            <label id="lift_claims_filter_minstaytime_dimension">мин.</label>
        </div>
    </div>

    <div class="fc-validators">
        <asp:ValidationSummary runat="server" CssClass="lift-claims-filter-validator" ClientIdMode="AutoID" ValidationGroup="lift_claims_filter_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
        <div class="hz-dialog-custom-buttons">
            <asp:Button ID="lift_claims_filter_reset" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сбросить" ValidationGroup="lift_claims_filter_validators" ClientIdMode="Static"/>
        </div>
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="lift_claims_filter_ok_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="OK" ValidationGroup="lift_claims_filter_validators" ClientIdMode="Static"/>
            <asp:Button ID="lift_claims_filter_cancel_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Отмена"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
