<%@ Page Title="Текущие отключения" Language="C#" MasterPageFile="~/MasterPages/CessationClaims.master" 
    AutoEventWireup="true" CodeBehind="CurrentCessationClaims.aspx.cs" Inherits="Horizont.Web.CurrentCessationClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initCurrentCessationClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ТЕКУЩИЕ ОТКЛЮЧЕНИЯ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
