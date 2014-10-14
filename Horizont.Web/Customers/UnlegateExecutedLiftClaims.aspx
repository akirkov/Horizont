<%@ Page Title="Выполненные, но неотписаные заявки по лифтам" Language="C#" MasterPageFile="~/MasterPages/LiftClaims.master" 
    AutoEventWireup="true" CodeBehind="UnlegateExecutedLiftClaims.aspx.cs" Inherits="Horizont.Web.UnlegateExecutedLiftClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initUnlegateExecutedLiftClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПЕРЕЧЕНЬ ВЫПОЛЕННЫХ, НО НЕОТПИСАННЫХ ЗАЯВОК ПО ЛИФТАМ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
