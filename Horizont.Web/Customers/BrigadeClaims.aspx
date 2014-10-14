<%@ Page Title="Бригадные заявки" Language="C#" MasterPageFile="~/MasterPages/CommonClaims.master" 
    AutoEventWireup="true" CodeBehind="BrigadeClaims.aspx.cs" Inherits="Horizont.Web.BrigadeClaims" %>
<%@ Register src="~/WebControls/DateSpanFilter.ascx" tagname="DateSpanFilter" tagprefix="dsf" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initBrigadeClaims();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">БРИГАДНЫЕ ЗАЯВКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div id="date_span_filter_dialog" class="hz-dialog">
        <dsf:DateSpanFilter id="DateSpanFilterCtrl" runat="server" />
    </div>
</asp:Content>
