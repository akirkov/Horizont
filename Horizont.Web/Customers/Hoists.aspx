<%@ Page Title="Подъёмники" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Hoists.aspx.cs" Inherits="Horizont.Web.Hoists" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initHoists();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ПОДЪЁМНИКИ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div class="elv-objects-filter">
        <input type="radio" name="elv-objects-filter" value="0"/>Все
        <input type="radio" name="elv-objects-filter" value="1" checked="checked" />Неисправные
        <input type="radio" name="elv-objects-filter" value="2" />На ревизии
    </div>
</asp:Content>
