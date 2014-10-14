<%@ Page Title="Текущие застревания" Language="C#" MasterPageFile="~/MasterPages/LiftClaims.master" AutoEventWireup="true" 
    CodeBehind="CurrentJamLiftClaims.aspx.cs" Inherits="Horizont.Web.CurrentJamLiftClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initCurrentJamLiftClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПЕРЕЧЕНЬ ТЕКУЩИХ ЗАСТРЕВАНИЙ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
