<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="User.ascx.cs" 
    Inherits="Horizont.Web.User" %>
<div id="user_control">
    <div class="user-row-wrap">
        <div class="user-field-label">Активирован :</div>
        <div class="user-field">
            <asp:CheckBox ID="user_activated" runat="server" ClientIDMode="Static"/>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Имя пользователя :</div>
        <div class="user-field">
            <asp:TextBox ID="user_username" placeholder="Не задано" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_username" 
                ErrorMessage="Имя пользователя должно быть задано" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Пароль :</div>
        <div class="user-field">
            <asp:TextBox ID="user_password"  TextMode="Password" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_password" 
                ErrorMessage="Пароль должен быть задан" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Подтверждение :</div>
        <div class="user-field">
            <asp:TextBox ID="user_password_confirm"  TextMode="Password" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="ConfirmNewPasswordRequired" runat="server" Text="*" CssClass="user-validator"
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_password_confirm" 
                ErrorMessage="Подтвердите пароль" Display="None"  SetFocusOnError="True">
            </asp:RequiredFieldValidator>
            <asp:CompareValidator ID="NewPasswordCompare" runat="server" Text="*" CssClass="user-validator"
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToCompare="user_password" ControlToValidate="user_password_confirm" 
                ErrorMessage="Пароль не совпадает с подтверждением" Display="None"  SetFocusOnError="True">
            </asp:CompareValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Фамилия :</div>
        <div class="user-field">
            <asp:TextBox ID="user_surname" placeholder="Не задана" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_surname" 
                ErrorMessage="Фамилия должна быть задана" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Имя :</div>
        <div class="user-field">
            <asp:TextBox ID="user_name" placeholder="Не задано" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Отчество :</div>
        <div class="user-field">
            <asp:TextBox ID="user_fathername" placeholder="Не задано" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Должность :</div>
        <div class="user-field">
            <asp:TextBox ID="user_post" placeholder="Не задана" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Город :</div>
        <div class="user-field">
            <asp:DropDownList ID="user_city" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Район :</div>
        <div class="user-field">
            <asp:DropDownList ID="user_region" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Адрес дома :</div>
        <div class="user-field">
            <asp:TextBox ID="user_address" placeholder="Не задан" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:CustomValidator ID="AddressCustomValidator" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators"
                ErrorMessage="Адрес должен быть задан" Display="None" 
                SetFocusOnError="True" OnServerValidate="AddressValidate" ClientValidationFunction="userAddressValidate">
            </asp:CustomValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Квартира :</div>
        <div class="user-field">
            <asp:TextBox ID="user_flat" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
            <asp:CustomValidator ID="CustomValidator2" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators"
                ErrorMessage="Квартира должна быть задана" Display="None" 
                SetFocusOnError="True" OnServerValidate="FlatValidate" ClientValidationFunction="userFlatValidate">
            </asp:CustomValidator>
            <asp:CompareValidator ID="CompareValidator1" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_flat"
                ErrorMessage="Номер квартиры должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Телефон :</div>
        <div class="user-field">
            <asp:TextBox ID="user_phone" placeholder="Не задан" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:CustomValidator ID="PhoneCustomValidator" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators"
                ErrorMessage="Телефон должен быть задан" Display="None" 
                SetFocusOnError="True" OnServerValidate="PhoneValidate" ClientValidationFunction="userPhoneValidate">
            </asp:CustomValidator>
            <asp:RegularExpressionValidator ID="PhoneRegularValidator" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_phone" 
                ErrorMessage="Неверный формат номера телефона" Display="None" 
                SetFocusOnError="True" ValidationExpression="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$">
            </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Электронная почта :</div>
        <div class="user-field">
            <asp:TextBox ID="user_email" placeholder="Не задана" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Text="*" CssClass="user-validator" 
                ClientIdMode="AutoID" ValidationGroup="user_validators" ControlToValidate="user_email" 
                ErrorMessage="Электронная почта должна быть задана" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="user-row-wrap">
        <div class="user-field-label">Группа :</div>
        <div class="user-field">
            <asp:DropDownList ID="user_groups" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
                <asp:ListItem Value="Administrators" Selected="True" >Администраторы</asp:ListItem>
                <asp:ListItem Value="Customers">Заказщики</asp:ListItem>
                <asp:ListItem Value="Residents">Жильцы</asp:ListItem>
             </asp:DropDownList>
        </div>
    </div>

    <div class="user-validators">
        <asp:ValidationSummary runat="server" CssClass="user-validator" ClientIdMode="AutoID" ValidationGroup="user_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="user_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="user_validators" ClientIdMode="Static"/>
            <asp:Button ID="user_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
