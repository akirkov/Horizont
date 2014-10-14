<%@ Page Title="Пользователи" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Users.aspx.cs" Inherits="Horizont.Web.Users" %>
<%@ Register src="~/WebControls/User.ascx" tagname="User" tagprefix="uc" %>
<%@ Register src="~/WebControls/UserRules.ascx" tagname="UserRules" tagprefix="urs" %>
<%@ Register src="~/WebControls/UserRule.ascx" tagname="UserRule" tagprefix="ur" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/user-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/user-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initUsersPage();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПОЛЬЗОВАТЕЛИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
<asp:Content ID="ControlContentId" ContentPlaceHolderID="ControlContent" runat="server">
    <div id="user_dialog" class="hz-dialog">
        <uc:User id="UserCtrl" runat="server" />
    </div>
    <div id="user_rules_dialog" class="hz-dialog">
        <urs:UserRules id="UserRulesCtrl" runat="server" />
    </div>
    <div id="user_rule_dialog" class="hz-dialog">
        <ur:UserRule id="UserRuleCtrl" runat="server" />
    </div>
</asp:Content>
