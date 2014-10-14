<%@ Page Title="Повторные заявки" Language="C#" MasterPageFile="~/MasterPages/CommonClaims.master" 
    AutoEventWireup="true" CodeBehind="RepeatClaims.aspx.cs" Inherits="Horizont.Web.CommonClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initRepeatClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПОВТОРНЫЕ ЗАЯВКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
