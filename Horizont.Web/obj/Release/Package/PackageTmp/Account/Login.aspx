<%@ Page Title="Выполнить вход" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true"
    CodeBehind="Login.aspx.cs" Inherits="Horizont.Web.Account.Login" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/account.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Выполнить вход</h2>
		<div class="page-inner-box">
            <p>
                Введите имя пользователя и пароль.
            </p>
            <asp:Login ID="LoginUser" FailureText="Неправильный логин и/или пароль." 
                 UserNameRequiredErrorMessage="Поле ''Имя пользователя'' является обязательным." 
                 PasswordRequiredErrorMessage="Поле ''Пароль'' является обязательным." 
                 runat="server" EnableViewState="false" RenderOuterTable="false">
                <LayoutTemplate>
                    <span class="page-validators">
                        <asp:Literal ID="FailureText" runat="server"></asp:Literal>
                    </span>
                    <asp:ValidationSummary ID="LoginUserValidationSummary" runat="server" CssClass="page-validators" 
                         ValidationGroup="login_user_validators"/>
                    <div class="page-fieldset-wrap">
                        <fieldset>
                            <legend>Сведения учетной записи</legend>
                            <div class="page-row">
                                <asp:Label ID="UserNameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="UserName">
                                    Имя пользователя<span class="required-star">*</span>:
                                </asp:Label>
                                <asp:TextBox ID="UserName" runat="server" CssClass="page-row-field"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" 
                                     CssClass="page-validators" ErrorMessage="Поле ''Имя пользователя'' является обязательным." ToolTip="Поле ''Имя пользователя'' является обязательным." 
                                     ValidationGroup="login_user_validators" EnableClientScript="true">*</asp:RequiredFieldValidator>
                            </div>
                            <div class="page-row">
                                <asp:Label ID="PasswordLabel" runat="server"  CssClass="page-row-label" AssociatedControlID="Password">
                                    Пароль<span class="required-star">*</span>:
                                </asp:Label>
                                <asp:TextBox ID="Password" runat="server" CssClass="page-row-field" TextMode="Password"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" 
                                     CssClass="page-validators" ErrorMessage="Поле ''Пароль'' является обязательным." ToolTip="Поле ''Пароль'' является обязательным." 
                                     ValidationGroup="login_user_validators" EnableClientScript="true">*</asp:RequiredFieldValidator>
                            </div>
                            <div class="page-row">
                                <asp:CheckBox ID="RememberMe" runat="server" ClientIDMode="Static"/>
                                <asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" CssClass="inline">Сохранять состояние входа</asp:Label>
                            </div>
                        </fieldset>
                        <div class="page-submit">
                            <asp:Button ID="LoginButton" runat="server" CommandName="Login" Text="Выполнить вход" ValidationGroup="login_user_validators"/>
                        </div>
                    </div>
                </LayoutTemplate>
            </asp:Login>
        </div>
    </div>
</asp:Content>
