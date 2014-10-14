<%@ Page Title="Терминалы" Language="C#" MasterPageFile="~/MasterPages/DataPage.master" AutoEventWireup="true" 
    CodeBehind="Terms.aspx.cs" Inherits="Horizont.Web.Terms" %>

<asp:Content ID="HeadContentId" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="/Styles/filter-controls.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/filter-controls.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initTerms();
        });
    </script>
</asp:Content>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <h1 ID="data_table_title">ТЕРМИНАЛЫ</h1>
</asp:Content>
<asp:Content ID="FilterContent" ContentPlaceHolderID="FilterContent" runat="server">
    <div class="elv-objects-filter">
        <input type="radio" name="elv-objects-filter" value="0"/>Все
        <input type="radio" name="elv-objects-filter" value="1" checked="checked" />Неисправные
    </div>
</asp:Content>
