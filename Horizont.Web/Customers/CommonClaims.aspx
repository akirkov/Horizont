<%@ Page Title="Все заявки" Language="C#" MasterPageFile="~/MasterPages/CommonClaims.master" AutoEventWireup="true" 
    CodeBehind="CommonClaims.aspx.cs" Inherits="Horizont.Web.CommonClaims" %>
<%@ Register src="~/WebControls/CommonClaimsFilter.ascx" tagname="CommonClaimsFilter" tagprefix="ccf" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initCommonClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПЕРЕЧЕНЬ ЗАЯВОК</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div id="common_claims_filter_dialog" class="hz-dialog">
        <ccf:CommonClaimsFilter id="CommonClaimsFilterCtrl" runat="server" />
    </div>
</asp:Content>
