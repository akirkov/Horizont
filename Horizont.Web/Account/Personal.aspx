<%@ Page Title="Личный кабинет" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="Personal.aspx.cs" Inherits="Horizont.Web.Account.Personal" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/account.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
		<h2 class="page-headline-inner">Личный кабинет</h2>
		<div class="page-inner-box">
            <p>
                Используйте следующую форму для изменения своей учетной записи.
            </p>
            <asp:ValidationSummary ID="personal_validation_summary" runat="server" CssClass="page-validators" 
                    ValidationGroup="personal_user_validators"/>
            <div class="page-fieldset-wrap">
                <fieldset>
                    <legend>Сведения учетной записи</legend>
                    <div class="page-row">
                        <asp:Label ID="UsernameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Username">Логин<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Username" runat="server" Enabled="false" ReadOnly="true" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="SurnameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Surname">Фамилия<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Surname" runat="server" CssClass="page-row-field"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="SurnameRequired" runat="server" ControlToValidate="Surname" 
                                CssClass="page-validators" ErrorMessage="Поле ''Фамилия'' является обязательным." 
                                ToolTip="Поле ''Фамилия'' является обязательным." 
                                ValidationGroup="personal_user_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="NameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Name">Имя<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Name" runat="server" CssClass="page-row-field"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="NameRequired" runat="server" ControlToValidate="Name" 
                                CssClass="page-validators" ErrorMessage="Поле ''Имя'' является обязательным." 
                                ToolTip="Поле ''Имя'' является обязательным." 
                                ValidationGroup="personal_user_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="FathernameLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Fathername">Отчество:</asp:Label>
                        <asp:TextBox ID="Fathername" runat="server" CssClass="page-row-field"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="CityLabel" runat="server" CssClass="page-row-label" AssociatedControlID="City">Город:</asp:Label>
                        <asp:TextBox ID="City" runat="server" Enabled="false" ReadOnly="true" CssClass="page-row-field"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="RegionLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Region">Район:</asp:Label>
                        <asp:TextBox ID="Region" runat="server" Enabled="false" ReadOnly="true" CssClass="page-row-field"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="AddressLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Address">Адрес дома<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Address" runat="server" Enabled="false" ReadOnly="true" CssClass="page-row-field" ClientIDMode="Static"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label id="FlatLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Flat">Квартира<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Flat" runat="server" Enabled="false" ReadOnly="true" CssClass="page-row-field" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="PhoneLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Phone">Телефон<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Phone" runat="server" CssClass="page-row-field"  ClientIDMode="Static"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="PhoneRequiredValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="AutoID" ValidationGroup="personal_user_validators" ControlToValidate="Phone" 
                            ErrorMessage="Поле ''Телефон'' является обязательным." EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="PhoneRegularValidator" runat="server" Text="*" CssClass="page-validators" 
                            ClientIdMode="AutoID" ValidationGroup="personal_user_validators" ControlToValidate="Phone" 
                            ErrorMessage="Значение ''Телефон'' имеет неверный формат." EnableClientScript="true"
                            ValidationExpression="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$">*
                        </asp:RegularExpressionValidator>
                    </div>
                    <div class="page-row">
                        <asp:Label ID="EmailLabel" runat="server" CssClass="page-row-label" AssociatedControlID="Email">Электронная почта<span class="required-star">*</span>:</asp:Label>
                        <asp:TextBox ID="Email" runat="server" CssClass="page-row-field" ></asp:TextBox>
                        <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email" 
                                CssClass="page-validators" ErrorMessage="Поле ''Электронная почта'' является обязательным." 
                                ToolTip="Поле ''Электронная почта'' является обязательным." 
                                ValidationGroup="personal_user_validators" EnableClientScript="true">*
                        </asp:RequiredFieldValidator>
                    </div>
                    <div class="page-row">
                        <asp:HyperLink  NavigateUrl="/Account/ChangePassword.aspx" ID="personal_change_password" runat="server" ClientIDMode="Static">Изменение пароля</asp:HyperLink>
                    </div>
                </fieldset>
                <p id="StatusSuccess" class="page-status green" runat="server">
                    Данные успешно изменены.
                </p>
                <p id="StatusError" class="page-status red" runat="server">
                    Произошла ошибка при сохранении данных.
                </p>
                <p class="page-submit">
                    <asp:Button ID="UpdateUserButton" runat="server" OnClick="UpdateUser" Text="Сохранить" 
                            ValidationGroup="personal_user_validators" ClientIDMode="Static"/>
                </p>
            </div>
        </div>
    </div>
    
</asp:Content>
