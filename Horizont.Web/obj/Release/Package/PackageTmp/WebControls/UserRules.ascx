<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UserRules.ascx.cs" 
    Inherits="Horizont.Web.UserRules" %>
<div id="user_rules_control">
    <div>
        <table cellpadding="0" cellspacing="0" border="1" class="display" id="user_rules_table" rules="cols" style="border-color: #AED0EA; border-collapse:collapse;">
	        <thead>
	        </thead>
	        <tbody>
	        </tbody>
        </table>
    </div>
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="user_rules_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
