<%@ Page Title="Внесение заявки" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="InsertCommonClaim.aspx.cs" Inherits="Horizont.Web.InsertCommonClaim" %>
<%@ Register Assembly="Recaptcha.Web" Namespace="Recaptcha.Web.UI.Controls" TagPrefix="rw" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/residents.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="/Scripts/recaptcha.js"></script>
    <script src="/Scripts/residents.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initInsertCommonClaimPage();
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Внесение новой заявки</h2>
		<div class="page-inner-box">
            <p>
                Используйте следующую форму для внесения новой заявки.
            </p>
            <p>
                Контактный телефон указывается в случае его отличия от указанного при регистрации.
            </p>
            <asp:ValidationSummary ID="RegisterUserValidationSummary" runat="server" CssClass="page-validators" 
                    ValidationGroup="insert_common_claim_validators"/>
            <div id="InsertClaimInfo" class="page-fieldset-wrap">
                <fieldset>
                    <legend>Информация по заявке</legend>
                    <div class="page-row">
                        <asp:Label ID="JournalLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Journal">Вид работ<span class="required-star">*</span>:</asp:Label>
                        <asp:DropDownList ID="Journal" runat="server" CssClass="page-row-field" ClientIDMode="Static" EnableViewState="False"></asp:DropDownList>
                        <asp:HiddenField ID="JournalId" runat="server" ClientIdMode="Static" Value="0" EnableViewState="true" ViewStateMode="Enabled" />
                        <asp:CompareValidator ID="JournalValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="Static" ValidationGroup="insert_common_claim_validators" ControlToValidate="Journal"
                            ErrorMessage="Поле ''Журнал'' является обязательным."
                            Operator="GreaterThan" Type="Integer" ValueToCompare="0" EnableClientScript="true">*
                        </asp:CompareValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="FailureLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Failure">Неисправность<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Failure" placeholder="Не задана" runat="server" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="FailureValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="Static" ValidationGroup="insert_common_claim_validators" ControlToValidate="Failure" 
                            ErrorMessage="Поле ''Неисправность'' является обязательным." EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label id="CommentLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Comment">Примечание:</asp:Label>
                        <asp:TextBox ID="Comment" runat="server" CssClass="page-row-field" ClientIDMode="Static" TextMode="MultiLine"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="PhoneLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Phone">Контактный телефон:</asp:Label>
                        <asp:TextBox ID="Phone" runat="server" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                        <asp:RegularExpressionValidator ID="PhoneRegularValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="AutoID" ValidationGroup="insert_common_claim_validators" ControlToValidate="Phone" 
                            ErrorMessage="Значение ''Контактный телефон'' имеет неверный формат." EnableClientScript="true"
                            ValidationExpression="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$">*
                        </asp:RegularExpressionValidator>
                    </div>
                    <div class="page-row">
                        <div id="Recaptcha">
                            <rw:Recaptcha ID="RecaptchaCtrl" Theme="white" Language="ru" runat="server" ClientIDMode="Static" />
                        </div>
                        <asp:CustomValidator ID="RecaptchaCustomValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="AutoID" ValidationGroup="insert_common_claim_validators" Display="None"
                            ErrorMessage="Проверочный текст введен неверно."  EnableClientScript="true"
                            OnServerValidate="RecaptchaValidate" ClientValidationFunction="recaptchaValidate">
                        </asp:CustomValidator>
                    </div>
                </fieldset>
                <p class="page-submit">
                    <asp:Button ID="InsertButton" runat="server" OnClick="OnInsertBtnClick" Text="Внести заявку" 
                            ValidationGroup="insert_common_claim_validators" ClientIDMode="Static"/>
                </p>
            </div>
        </div>
    </div>
    
</asp:Content>
