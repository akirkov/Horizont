<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="City.ascx.cs" 
    Inherits="Horizont.Web.City" %>
<div id="city_control">
    <div class="city-row-wrap">
        <div class="city-field-label">Название :</div>
        <div class="city-field">
            <asp:TextBox ID="city_name" placeholder="Не задано" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*" CssClass="city-validator" 
                ClientIdMode="AutoID" ValidationGroup="city_validators" ControlToValidate="city_name" 
                ErrorMessage="Название должно быть задано" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="settings-validators">
        <asp:ValidationSummary runat="server" CssClass="city-validator" ClientIdMode="AutoID" ValidationGroup="city_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="city_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="city_validators" ClientIdMode="Static"/>
            <asp:Button ID="city_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
