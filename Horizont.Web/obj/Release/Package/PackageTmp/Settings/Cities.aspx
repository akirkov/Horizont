<%@ Page Title="Города" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Cities.aspx.cs" Inherits="Horizont.Web.Cities" %>
<%@ Register src="~/WebControls/City.ascx" tagname="City" tagprefix="cc" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/settings-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/settings-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initCitiesPage();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ГОРОДА</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
<asp:Content ID="ControlContentId" ContentPlaceHolderID="ControlContent" runat="server">
    <div id="city_dialog" class="hz-dialog">
        <cc:City id="CityCtrl" runat="server" />
    </div>
</asp:Content>
