<%@ Page Title="Отписанные, но невыполненные заявки" Language="C#" MasterPageFile="~/MasterPages/CommonClaims.master" 
    AutoEventWireup="true" CodeBehind="LegateUnexecutedClaims.aspx.cs" Inherits="Horizont.Web.LegateUnexecutedClaims" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            initLegateUnexecutedClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ОТПИСАННЫЕ, НО НЕВЫПОЛНЕННЫЕ ЗАЯВКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
</asp:Content>
