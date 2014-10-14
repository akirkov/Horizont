<%@ Page Title="Сервера" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Servers.aspx.cs" Inherits="Horizont.Web.Servers" %>
<%@ Register src="~/WebControls/Server.ascx" tagname="Server" tagprefix="sc" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/settings-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/settings-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initServersPage();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">СЕРВЕРА</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
<asp:Content ID="ControlContentId" ContentPlaceHolderID="ControlContent" runat="server">
    <div id="server_dialog" class="hz-dialog">
        <sc:Server id="ServerCtrl" runat="server" />
    </div>
</asp:Content>
