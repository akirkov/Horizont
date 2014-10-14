<%@ Page Title="Адреса с повторными заявками" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" 
    AutoEventWireup="true" CodeBehind="RepeatFlats.aspx.cs" Inherits="Horizont.Web.RepeatFlats" %>
<%@ Register src="~/WebControls/RepeatFlatsFilter.ascx" tagname="RepeatFlatsFilter" tagprefix="rff" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initRepeatFlats();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">АДРЕСА С ПОВТОРНЫМИ ЗАЯВКАМИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div id="repeat_flats_filter_dialog" class="hz-dialog">
        <rff:RepeatFlatsFilter id="RepeatFlatsFilterCtrl" runat="server" />
    </div>
</asp:Content>
<asp:Content ID="ControlContentId" ContentPlaceHolderID="ControlContent" runat="server">
</asp:Content>
