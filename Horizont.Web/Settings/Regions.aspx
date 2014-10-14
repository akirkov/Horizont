<%@ Page Title="Районы" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Regions.aspx.cs" Inherits="Horizont.Web.Regions" %>
<%@ Register src="~/WebControls/Region.ascx" tagname="Region" tagprefix="rc" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/settings-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/settings-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initRegionsPage();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">РАЙОНЫ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
<asp:Content ID="ControlContentId" ContentPlaceHolderID="ControlContent" runat="server">
    <div id="region_dialog" class="hz-dialog">
        <rc:Region id="RegionCtrl" runat="server" />
    </div>
</asp:Content>
