<%@ Page Title="Неисправные лифты" Language="C#" MasterPageFile="~/MasterPages/LiftClaims.master" 
    AutoEventWireup="true" CodeBehind="BreakLiftClaims.aspx.cs" Inherits="Horizont.Web.BreakLiftClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initBreakLiftClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">НЕИСПРАВНЫЕ ЛИФТЫ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
