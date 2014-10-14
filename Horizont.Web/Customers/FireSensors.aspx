<%@ Page Title="Пожарные датчики" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="FireSensors.aspx.cs" Inherits="Horizont.Web.FireSensors" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initFireSensors();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПОЖАРНЫЕ ДАТЧИКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div class="elv-objects-filter">
        <input type="radio" name="elv-objects-filter" value="0"/>Все
        <input type="radio" name="elv-objects-filter" value="1" checked="checked" />Аварийные
    </div>
</asp:Content>
