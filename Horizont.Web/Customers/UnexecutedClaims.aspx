<%@ Page Title="Невыполненные заявки" Language="C#" MasterPageFile="~/MasterPages/CommonClaims.master" AutoEventWireup="true" 
    CodeBehind="UnexecutedClaims.aspx.cs" Inherits="Horizont.Web.UnexecutedClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initUnexecutedClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">НЕВЫПОЛНЕННЫЕ ЗАЯВКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
