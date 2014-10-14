<%@ Page Title="Просроченные заявки" Language="C#" MasterPageFile="~/MasterPages/CommonClaims.master" 
    AutoEventWireup="true" CodeBehind="OverdueClaims.aspx.cs" Inherits="Horizont.Web.OverdueClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initOverdueClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПРОСРОЧЕННЫЕ ЗАЯВКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
