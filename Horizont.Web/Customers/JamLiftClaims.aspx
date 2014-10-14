<%@ Page Title="Застревания в лифтах" Language="C#" MasterPageFile="~/MasterPages/LiftClaims.master" AutoEventWireup="true" 
    CodeBehind="JamLiftClaims.aspx.cs" Inherits="Horizont.Web.JamLiftClaims" %>
<%@ Register src="~/WebControls/LiftClaimsFilter.ascx" tagname="LiftClaimsFilter" tagprefix="ccf" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initJamLiftClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПЕРЕЧЕНЬ ЗАСТРЕВАНИЙ В ЛИФТАХ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div id="lift_claims_filter_dialog" class="hz-dialog">
        <ccf:LiftClaimsFilter id="LiftClaimsFilterCtrl" runat="server" />
    </div>
</asp:Content>
