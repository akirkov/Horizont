<%@ Page Title="Ожидание активации" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true"
    CodeBehind="NonActivatedUser.aspx.cs" Inherits="Horizont.Web.NonActivatedUser" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Уважаемый пользователь!</h2>
		<div class="page-inner-box">
            <p>
                Ваша учетная запись <span class="green bold">создана</span>, но еще <span class="red bold">не активирована</span>. В случае, если указанные Вами при регистрации данные верны, администратор сайта активирует Вашу учетную запись в ближайшее время. Попробуйте попытку входа через некоторое время.
            </p>
        </div>
    </div>
</asp:Content>
