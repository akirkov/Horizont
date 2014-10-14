<%@ Page Title="Обратная связь" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true"
    CodeBehind="Feedback.aspx.cs" Inherits="Horizont.Web.FeedBack" %>
<%@ Register Assembly="Recaptcha.Web" Namespace="Recaptcha.Web.UI.Controls" TagPrefix="rw" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/feedback.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="/Scripts/recaptcha.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initFeedbackPage();
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Обратная связь</h2>
		<div class="page-inner-box">
            <p>
                Используйте следующую форму для отправки сообщения.
            </p>
            <asp:ValidationSummary ID="FeedbackValidationSummary" runat="server" CssClass="page-validators" 
                    ValidationGroup="feedback_validators"/>
            <div id="MessageInfo" class="page-fieldset-wrap">
                <fieldset>
                    <legend>Сообщение</legend>
                    <div class="page-row">
                        <asp:Label ID="NameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Name">Ваше имя<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Name" runat="server" Enabled="true" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="NameRequired" runat="server" ControlToValidate="Name" 
                                CssClass="page-validators" ErrorMessage="Поле ''Ваше имя'' является обязательным." 
                                ToolTip="Поле ''Ваше имя'' является обязательным." 
                                ValidationGroup="feedback_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="EmailLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Email">Электронная почта<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Email" runat="server" Enabled="true" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Name" 
                                CssClass="page-validators" ErrorMessage="Поле ''Электронная почта'' является обязательным." 
                                ToolTip="Поле ''Электронная почта'' является обязательным." 
                                ValidationGroup="feedback_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="SubjectLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Subject">Тема<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Subject" runat="server" Enabled="true" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="SubjectRequired" runat="server" ControlToValidate="Subject" 
                                CssClass="page-validators" ErrorMessage="Поле ''Тема'' является обязательным." 
                                ToolTip="Поле ''Тема'' является обязательным." 
                                ValidationGroup="feedback_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label id="MessageLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Message">Сообщение<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Message" runat="server" CssClass="page-row-field" ClientIDMode="Static" TextMode="MultiLine"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="MessageValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="Static" ValidationGroup="feedback_validators" ControlToValidate="Message" 
                            ErrorMessage="Поле ''Сообщение'' является обязательным." EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <div id="Recaptcha">
                            <rw:Recaptcha ID="RecaptchaCtrl" Theme="white" Language="ru" runat="server" ClientIDMode="Static" />
                        </div>
                        <asp:CustomValidator ID="RecaptchaCustomValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="AutoID" ValidationGroup="feedback_validators" Display="None"
                            ErrorMessage="Проверочный текст введен неверно."  EnableClientScript="true"
                            OnServerValidate="RecaptchaValidate" ClientValidationFunction="recaptchaValidate">
                        </asp:CustomValidator>
                    </div>
                </fieldset>
                <p class="page-submit">
                    <asp:Button ID="SendButton" runat="server" OnClick="OnSendBtnClick" Text="Отправить" 
                            ValidationGroup="feedback_validators" ClientIDMode="Static"/>
                </p>
            </div>
        </div>
    </div>
</asp:Content>
