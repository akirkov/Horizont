<%@ Page Title="Регистрация" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="Register.aspx.cs" Inherits="Horizont.Web.Account.Register" %>
<%@ Register Assembly="Recaptcha.Web" Namespace="Recaptcha.Web.UI.Controls" TagPrefix="rw" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/account.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="/Scripts/recaptcha.js"></script>
    <script src="/Scripts/account.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initRegisterPage();
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Создать новую учетную запись</h2>
		<div class="page-inner-box">
            <p>
                Используйте следующую форму для создания новой учетной записи.
            </p>
            <p>
                Пароль должен быть не менее <%= Membership.MinRequiredPasswordLength %> символов.
            </p>
            <asp:CreateUserWizard ID="RegisterUser" 
                DuplicateUserNameErrorMessage="Пожалуйста, введите другой логин." 
                DuplicateEmailErrorMessage="Введенный вами адрес электронной почты уже используется. Пожалуйста, введите другой адрес." 
                runat="server" EnableViewState="false" OnCreatedUser="RegisterUser_CreatedUser">
                <LayoutTemplate>
                    <asp:PlaceHolder ID="wizardStepPlaceholder" runat="server"></asp:PlaceHolder>
                    <asp:PlaceHolder ID="navigationPlaceholder" runat="server"></asp:PlaceHolder>
                </LayoutTemplate>
                <WizardSteps>
                    <asp:CreateUserWizardStep ID="RegisterUserWizardStep" runat="server">
                        <ContentTemplate>
                            <span class="page-validators">
                                <asp:Literal ID="ErrorMessage" runat="server"></asp:Literal>
                            </span>
                            <asp:ValidationSummary ID="RegisterUserValidationSummary" runat="server" CssClass="page-validators" 
                                    ValidationGroup="register_user_validators"/>
                            <div class="page-fieldset-wrap">
                                <fieldset>
                                    <legend>Сведения учетной записи</legend>
                                    <div class="page-row">
                                        <asp:Label ID="UserNameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="UserName">Логин<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="UserName" runat="server" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" 
                                             CssClass="page-validators" ErrorMessage="Поле ''Логин'' является обязательным." 
                                             ToolTip="Поле ''Логин'' является обязательным." 
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                        <span id="register_username_success" class="success" title="Логин свободен"></span>
                                        <span id="register_username_error" class="error" title="Логин занят"></span>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_surname_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_surname">Фамилия<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="register_surname" runat="server" CssClass="page-row-field"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="SurnameRequired" runat="server" ControlToValidate="register_surname" 
                                             CssClass="page-validators" ErrorMessage="Поле ''Фамилия'' является обязательным." 
                                             ToolTip="Поле ''Фамилия'' является обязательным." 
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_name_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_name">Имя<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="register_name" runat="server" CssClass="page-row-field"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="NameRequired" runat="server" ControlToValidate="register_name" 
                                             CssClass="page-validators" ErrorMessage="Поле ''Имя'' является обязательным." 
                                             ToolTip="Поле ''Имя'' является обязательным." 
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_fathername_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_fathername">Отчество:</asp:Label>
                                        <asp:TextBox ID="register_fathername" runat="server" CssClass="page-row-field"></asp:TextBox>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_city_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_city">Город<span class="required-star">*</span>:</asp:Label>
                                        <asp:DropDownList ID="register_city" runat="server" CssClass="page-row-field" ClientIDMode="Static" EnableViewState="False"></asp:DropDownList>
                                        <asp:HiddenField ID="register_city_id" runat="server" ClientIdMode="Static" Value="0" EnableViewState="true" ViewStateMode="Enabled" />
                                        <asp:CompareValidator ID="CityValidator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="AutoID" ValidationGroup="register_user_validators" ControlToValidate="register_city"
                                            ErrorMessage="Поле ''Город'' является обязательным."
                                            Operator="GreaterThan" Type="Integer" ValueToCompare="0" EnableClientScript="true">*
                                        </asp:CompareValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_region_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_region">Район<span class="required-star">*</span>:</asp:Label>
                                        <asp:DropDownList ID="register_region" runat="server" CssClass="page-row-field" ClientIDMode="Static" EnableViewState="False"></asp:DropDownList>
                                        <asp:HiddenField ID="register_region_id" runat="server" ClientIdMode="Static" Value="0" EnableViewState="true" ViewStateMode="Enabled" />
                                        <asp:CompareValidator ID="RegionValildator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="Static" ValidationGroup="register_user_validators" ControlToValidate="register_region"
                                            ErrorMessage="Поле ''Район'' является обязательным."
                                            Operator="GreaterThan" Type="Integer" ValueToCompare="0" EnableClientScript="true">*
                                        </asp:CompareValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_address_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_address">Адрес дома<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="register_address" placeholder="Не выбран" runat="server" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                                        <asp:HiddenField ID="register_address_id" runat="server" ClientIdMode="Static" Value="0" EnableViewState="true" ViewStateMode="Enabled" />
                                        <asp:RequiredFieldValidator ID="register_adddress_validator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="Static" ValidationGroup="register_user_validators" ControlToValidate="register_address" 
                                            ErrorMessage="Поле ''Адрес дома'' является обязательным." EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label id="register_flat_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_flat">Квартира<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="register_flat" runat="server" CssClass="page-row-field" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="FlatRequireValidator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="AutoID" ValidationGroup="register_user_validators" ControlToValidate="register_flat" 
                                            ErrorMessage="Поле ''Квартира'' является обязательным." EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                        <asp:CompareValidator ID="FlatCompareValidator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="AutoID" ValidationGroup="register_user_validators" ControlToValidate="register_flat"
                                            ErrorMessage="Значение ''Квартира'' должно быть положительным числом."
                                            Operator="GreaterThan" Type="Integer" ValueToCompare="0" EnableClientScript="true">*
                                        </asp:CompareValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="register_phone_label" runat="server" CssClass="page-row-label" AssociatedControlID="register_phone">Телефон<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="register_phone" runat="server" CssClass="page-row-field"  ClientIDMode="Static"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="PhoneRequiredValidator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="AutoID" ValidationGroup="register_user_validators" ControlToValidate="register_phone" 
                                            ErrorMessage="Поле ''Телефон'' является обязательным." EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                        <asp:RegularExpressionValidator ID="PhoneRegularValidator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="AutoID" ValidationGroup="register_user_validators" ControlToValidate="register_phone" 
                                            ErrorMessage="Значение ''Телефон'' имеет неверный формат." EnableClientScript="true"
                                            ValidationExpression="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$">*
                                        </asp:RegularExpressionValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="EmailLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Email">Электронная почта<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="Email" runat="server" CssClass="page-row-field"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email" 
                                             CssClass="page-validators" ErrorMessage="Поле ''Электронная почта'' является обязательным." 
                                             ToolTip="Поле ''Электронная почта'' является обязательным." 
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="PasswordLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Password">Пароль<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="Password" runat="server" CssClass="page-row-field" TextMode="Password"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" 
                                             CssClass="page-validators" ErrorMessage="Поле ''Пароль'' является обязательным." 
                                             ToolTip="Поле ''Пароль'' является обязательным." 
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                    </div>
                                    <div class="page-row">
                                        <asp:Label ID="ConfirmPasswordLabel" runat="server" CssClass="page-row-label" AssociatedControlID="ConfirmPassword">Подтверждение<span class="required-star">*</span>:</asp:Label>
                                        <asp:TextBox ID="ConfirmPassword" runat="server" CssClass="page-row-field" TextMode="Password"></asp:TextBox>
                                        <asp:RequiredFieldValidator ControlToValidate="ConfirmPassword" CssClass="page-validators" Display="Dynamic" 
                                             ErrorMessage="Поле ''Подтвердите пароль'' является обязательным." ID="ConfirmPasswordRequired" runat="server" 
                                             ToolTip="Поле ''Подтвердите пароль'' является обязательным." 
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:RequiredFieldValidator>
                                        <asp:CompareValidator ID="PasswordCompare" runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword" 
                                             CssClass="page-validators" Display="Dynamic" ErrorMessage="Значения ''Пароль'' и ''Подтвердите пароль'' должны совпадать."
                                             ValidationGroup="register_user_validators" EnableClientScript="true">*
                                        </asp:CompareValidator>
                                    </div>
                                    <div class="page-row">
                                        <div id="register_recaptcha">
                                            <rw:Recaptcha ID="RecaptchaCtrl" Theme="white" Language="ru" runat="server" ClientIDMode="Static" />
                                        </div>
                                        <asp:CustomValidator ID="RecaptchaCustomValidator" runat="server" Text="*" CssClass="page-validators" 
                                            ClientIdMode="AutoID" ValidationGroup="register_user_validators" Display="None"
                                            ErrorMessage="Проверочный текст введен неверно."  EnableClientScript="true"
                                            OnServerValidate="RecaptchaValidate" ClientValidationFunction="recaptchaValidate">
                                        </asp:CustomValidator>
                                    </div>
                                </fieldset>
                                <p class="page-submit">
                                    <asp:Button ID="CreateUserButton" runat="server" CommandName="MoveNext" Text="Создать пользователя" 
                                         ValidationGroup="register_user_validators" ClientIDMode="Static"/>
                                </p>
                            </div>
                        </ContentTemplate>
                        <CustomNavigationTemplate>
                        </CustomNavigationTemplate>
                    </asp:CreateUserWizardStep>
                </WizardSteps>
            </asp:CreateUserWizard>
        </div>
    </div>
    
</asp:Content>
