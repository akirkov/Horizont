<%@ Page Title="Сбои терминалов" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="TermEvents.aspx.cs" Inherits="Horizont.Web.TermEvents" %>
<%@ Register src="~/WebControls/ElvObjectEventsFilter.ascx" tagname="ElvObjectEventsFilter" tagprefix="eoef" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initTermEvents();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ОТЧЕТ О СБОЯХ ТЕРМИНАЛОВ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div id="elv_object_events_filter_dialog" class="hz-dialog">
        <eoef:ElvObjectEventsFilter id="ElvObjectEventsFilterCtrl" runat="server" />
    </div>
</asp:Content>
