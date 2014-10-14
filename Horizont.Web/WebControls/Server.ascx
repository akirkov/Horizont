<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Server.ascx.cs" 
    Inherits="Horizont.Web.Server" %>
<div id="server_control">
    <div class="server-row-wrap">
        <div class="server-field-label">Название :</div>
        <div class="server-field">
            <asp:TextBox ID="server_name" placeholder="Не задано" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*" CssClass="server-validator" 
                ClientIdMode="AutoID" ValidationGroup="server_validators" ControlToValidate="server_name" 
                ErrorMessage="Название должно быть задано" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="server-row-wrap">
        <div class="server-field-label">Сервис заявок :</div>
        <div class="server-field">
            <asp:TextBox ID="server_claims_service" placeholder="Не задан" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Text="*" CssClass="server-validator" 
                ClientIdMode="AutoID" ValidationGroup="server_validators" ControlToValidate="server_claims_service" 
                ErrorMessage="Сервис заявок должен быть задан" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="server-row-wrap">
        <div class="server-field-label">Сервис инж. обор. :</div>
        <div class="server-field">
            <asp:TextBox ID="server_elv_service" placeholder="Не задан" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Text="*" CssClass="server-validator" 
                ClientIdMode="AutoID" ValidationGroup="server_validators" ControlToValidate="server_elv_service" 
                ErrorMessage="Сервис инж. обор. должен быть задан" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="settings-validators">
        <asp:ValidationSummary runat="server" CssClass="server-validator" ClientIdMode="AutoID" ValidationGroup="server_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="server_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="server_validators" ClientIdMode="Static"/>
            <asp:Button ID="server_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
