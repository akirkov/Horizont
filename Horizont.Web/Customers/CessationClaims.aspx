<%@ Page Title="Отключения" Language="C#" MasterPageFile="~/MasterPages/CessationClaims.master" AutoEventWireup="true" 
    CodeBehind="CessationClaims.aspx.cs" Inherits="Horizont.Web.CessationClaims" %>
<%@ Register src="~/WebControls/CessationClaimsFilter.ascx" tagname="CessationClaimsFilter" tagprefix="csf" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initCessationClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПЕРЕЧЕНЬ ОТКЛЮЧЕНИЙ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div id="cessation_claims_filter_dialog" class="hz-dialog">
        <csf:CessationClaimsFilter id="CessationClaimsFilterCtrl" runat="server" />
    </div>
</asp:Content>
