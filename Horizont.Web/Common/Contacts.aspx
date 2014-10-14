<%@ Page Title="Контакты" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true"
    CodeBehind="Contacts.aspx.cs" Inherits="Horizont.Web.Contacts" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script src="https://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initContactsPage();
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">ООО "Монтаж инженерных систем"</h2>
		<div class="page-inner-box">
    		<div class="page-inner-box">
                <p><span class="bold">Адрес :</span> 125124, г. Москва, 3-я ул. Ямского поля, д. 2, к. 26</p>
                <p><span class="bold">Телефон :</span> +74995570432</p>
                <p><span class="bold">Электронная почта :</span> ingsystem@umail.ru</p>
            </div>
            <div id="map" class="map"></div>
        </div>
    </div>
</asp:Content>
