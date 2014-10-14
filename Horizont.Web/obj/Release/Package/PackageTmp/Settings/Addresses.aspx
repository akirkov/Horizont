<%@ Page Title="Адреса" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Addresses.aspx.cs" Inherits="Horizont.Web.Addresses" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/settings-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/settings-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initAddressesPage();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">АДРЕСА</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
<asp:Content ID="ControlContentId" ContentPlaceHolderID="ControlContent" runat="server">
</asp:Content>
