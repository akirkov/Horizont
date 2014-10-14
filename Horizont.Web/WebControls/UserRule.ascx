<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UserRule.ascx.cs" 
    Inherits="Horizont.Web.UserRule" %>
<div id="user_rule_control">
    <div class="user-rule-row-wrap">
        <div class="user-rule-field-label">Город :</div>
        <div class="user-rule-field">
            <asp:DropDownList ID="user_rule_city" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
        </div>
    </div>

    <div class="user-rule-row-wrap">
        <div class="user-rule-field-label">Район :</div>
        <div class="user-rule-field">
            <asp:DropDownList ID="user_rule_region" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
        </div>
    </div>

    <div class="user-rule-row-wrap">
        <div class="user-rule-field-label">ОДС :</div>
        <div class="user-rule-field">
            <asp:DropDownList ID="user_rule_disp" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
        </div>
    </div>

    <div class="user-rule-row-wrap">
        <div class="user-rule-field-label">Разрешение :</div>
        <div class="user-rule-field">
            <asp:DropDownList ID="user_rule_permission" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
                <asp:ListItem Value="0" Selected="True" >Просмотр</asp:ListItem>
                <asp:ListItem Value="1">Полный доступ</asp:ListItem>
             </asp:DropDownList>
        </div>
    </div>

    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="user_rule_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="user_rule_validators" ClientIdMode="Static"/>
            <asp:Button ID="user_rule_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
