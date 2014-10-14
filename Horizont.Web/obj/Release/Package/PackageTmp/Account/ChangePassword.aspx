<%@ Page Title="Изменение пароля" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="ChangePassword.aspx.cs" Inherits="Horizont.Web.Account.ChangePassword" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/account.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Изменение пароля</h2>
		<div class="page-inner-box">
            <p>
                Используйте следующую форму для изменения пароля своей учетной записи.
            </p>
            <p>
                Пароль должен быть не менее <%= Membership.MinRequiredPasswordLength %> символов.
            </p>
            <asp:ValidationSummary ID="change_password_validation_summary" runat="server" CssClass="page-validators" 
                    ValidationGroup="change_password_validators"/>
            <div class="page-fieldset-wrap">
                <fieldset>
                    <legend>Сведения учетной записи</legend>
                    <div class="page-row">
                        <asp:Label ID="OldPasswordLabel" runat="server" CssClass="page-row-label" AssociatedControlID="OldPassword">Старый пароль<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="OldPassword" runat="server" CssClass="page-row-field" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="OldPassword" 
                                CssClass="page-validators" ErrorMessage="Поле ''Старый пароль'' является обязательным." 
                                ToolTip="Поле ''Пароль'' является обязательным." 
                                ValidationGroup="change_password_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="PasswordLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Password">Новый пароль<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Password" runat="server" CssClass="page-row-field" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" 
                                CssClass="page-validators" ErrorMessage="Поле ''Новый пароль'' является обязательным." 
                                ToolTip="Поле ''Пароль'' является обязательным." 
                                ValidationGroup="change_password_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="PasswordConfirmLabel" runat="server" CssClass="page-row-label" AssociatedControlID="PasswordConfirm">Подтверждение<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="PasswordConfirm" runat="server" CssClass="page-row-field" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ControlToValidate="PasswordConfirm" CssClass="page-validators" Display="Dynamic" 
                                ErrorMessage="Поле ''Подтвердите пароль'' является обязательным." ID="PasswordConfirmRequired" runat="server" 
                                ToolTip="Поле ''Подтвердите пароль'' является обязательным." 
                                ValidationGroup="change_password_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                        <asp:CompareValidator ID="PasswordCompare" runat="server" ControlToCompare="Password" ControlToValidate="PasswordConfirm" 
                                CssClass="page-validators" Display="Dynamic" ErrorMessage="Значения ''Пароль'' и ''Подтвердите пароль'' должны совпадать."
                                ValidationGroup="change_password_validators" EnableClientScript="true">*
                        </asp:CompareValidator>
                    </div>
                </fieldset>
                <p id="StatusSuccess" class="page-status green" runat="server">
                    Пароль успешно изменен.
                </p>
                <p id="StatusError" class="page-status red" runat="server">
                    Произошла ошибка при изменении пароля.
                </p>
                <p class="page-submit">
                    <asp:Button ID="UpdatePasswordButton" runat="server" OnClick="UpdatePassword" Text="Изменить пароль" 
                            ValidationGroup="change_password_validators" ClientIDMode="Static"/>
                </p>
            </div>
        </div>
    </div>
    
</asp:Content>
