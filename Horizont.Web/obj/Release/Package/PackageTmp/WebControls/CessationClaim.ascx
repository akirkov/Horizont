<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CessationClaim.ascx.cs" 
    Inherits="Horizont.Web.CessationClaim" %>
<div id="cessation_claim_control">
    <div class="cc-header">
        <label class="cc-regnumber-label">№</label>
        <asp:TextBox ID="cessation_claim_regnumber" CssClass="cc-regnumber ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        <asp:Label ID="cessation_claim_journal" CssClass="cc-journal" runat="server" Text="Отключения" ClientIDMode="Static"></asp:Label>
        <div class="cc-toolbar">
            <input type="image" id="cessation_claim_print_button" src="../Images/print.png" title="Печать"/>
        </div>
    </div>
    <div class="cc-block">
        <div class="cc-block-header">
            <p>Приём заявки</p>
        </div>
        <div class="cc-block-row">
            <label id="cessation_claim_addresses_label">Адреса</label>
            <asp:DropDownList id="cessation_claim_addresses" multiple="multiple" runat="server" 
                CssClass="ui-corner-all"  ClientIDMode="Static">
            </asp:DropDownList>
            <asp:CustomValidator ID="CustomValidator1" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators"
                ErrorMessage="Должен быть задан хотя бы один адрес." Display="None" 
                SetFocusOnError="True" OnServerValidate="AddressesValidate" ClientValidationFunction="cessationAddressesValidate">
            </asp:CustomValidator>

            <label id="cessation_claim_abonent_label">Абонент</label>
            <asp:TextBox ID="cessation_claim_abonent" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        </div>

        <div class="cc-block-row">
            <label id="cessation_claim_cessation_object_label">Объект откл.</label>
            <asp:DropDownList id="cessation_claim_cessation_object" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static">
                <asp:ListItem Text="ХВ" Value="0" Selected="True"></asp:ListItem>
                <asp:ListItem Text="ГВ" Value="1"></asp:ListItem>
                <asp:ListItem Text="ЦО" Value="2"></asp:ListItem>
                <asp:ListItem Text="ХВ и ГВ" Value="3"></asp:ListItem>
                <asp:ListItem Text="ГВ и ЦО" Value="4"></asp:ListItem>
                <asp:ListItem Text="Электроэнергия" Value="5"></asp:ListItem>
                <asp:ListItem Text="Газ" Value="6"></asp:ListItem>
                <asp:ListItem Text="Антенна" Value="7"></asp:ListItem>
            </asp:DropDownList>

            <label id="cessation_claim_reason_label">Причина откл.</label>
            <asp:TextBox ID="cessation_claim_reason" runat="server"  CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        </div>

        <div class="cc-block-row">
            <label id="cessation_claim_object_type_label">Объект</label>
            <asp:DropDownList id="cessation_claim_object_type" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static">
                <asp:ListItem Text="Дом" Value="0" Selected="True"></asp:ListItem>
                <asp:ListItem Text="Подъезд" Value="1"></asp:ListItem>
                <asp:ListItem Text="Стояк" Value="2"></asp:ListItem>
                <asp:ListItem Text="Квартира" Value="3"></asp:ListItem>
                <asp:ListItem Text="Группа домов" Value="4"></asp:ListItem>
            </asp:DropDownList>

            <label id="cessation_claim_objects_count_label">Кол-во объектов</label>
            <asp:TextBox ID="cessation_claim_objects_count" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator3" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_objects_count"
                ErrorMessage="Кол-во объектов должно быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>

            <label id="cessation_claim_flats_count_label">Кол-во квартир</label>
            <asp:TextBox ID="cessation_claim_flats_count" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator1" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_flats_count"
                ErrorMessage="Кол-во квартир должно быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
        </div>

        <div class="cc-block-row">
            <label id="cessation_claim_basis_label">Основание</label>
            <asp:TextBox ID="cessation_claim_basis" runat="server"  CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>

            <asp:TextBox ID="cessation_claim_basis_comment" runat="server"  CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>

            <label id="cessation_claim_applicant_label">От кого</label>
            <asp:TextBox ID="cessation_claim_applicant" runat="server"  CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        <</div>

        <div class="cc-block-row">
            <label id="cessation_claim_orgname_label">Организация</label>
            <asp:TextBox ID="cessation_claim_orgname" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        </div>

        <div class="cc-block-row">
            <label id="cessation_claim_comment_label">Примечание</label>
            <asp:TextBox ID="cessation_claim_comment" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" TextMode="MultiLine"></asp:TextBox>
        </div>

        <div class="cc-block-row cc-signature">
            <label class="cc-operator-label">Диспетчер</label>
            <asp:Label ID="cessation_claim_received_operator" runat="server" Text="Администратор" ClientIDMode="Static"
                CssClass="cc-operator" ></asp:Label>

            <label class="cc-time-label">Время</label>
            <asp:TextBox ID="cessation_claim_received_time" runat="server" ClientIDMode="Static" 
                CssClass="hz-time cc-time ui-corner-all">00:00</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_received_time" 
                ErrorMessage="Время получения заявки должно быть указано." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RequiredFieldValidator2" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_received_time" 
                ErrorMessage="Неверный формат времени получения заявки. Формат должен быть hh:mm." Display="None" 
                SetFocusOnError="True" ValidationExpression="^([0-1][0-9]|[2][0-3]):([0-5][0-9])$">
                </asp:RegularExpressionValidator>

            <label class="cc-date-label">Дата</label>
            <asp:TextBox ID="cessation_claim_received_date" runat="server" ClientIDMode="Static" 
                CssClass="hz-date cc-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_received_date" 
                ErrorMessage="Дата получения заявки должна быть указана." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_received_date" 
                ErrorMessage="Неверный формат даты получения заявки. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="cc-between-blocks"></div>

    <div class="cc-block">
        <div class="cc-block-header">
            <asp:CheckBox ID="cessation_claim_legate" runat="server" ClientIDMode="Static" />
            <p>Отметка о выполнении</p>
        </div>

        <div class="cc-block-row cc-signature">
            <label class="cc-operator-label">Диспетчер</label>
            <asp:Label ID="cessation_claim_executed_operator" runat="server" Text="Администратор" ClientIDMode="Static"
                CssClass="cc-operator" ></asp:Label>

            <label class="cc-time-label">Время</label>
            <asp:TextBox ID="cessation_claim_executed_time" runat="server" ClientIDMode="Static" 
                CssClass="hz-time cc-time ui-corner-all">00:00</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_executed_time" 
                ErrorMessage="Время закрытия заявки должно быть указано." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_executed_time" 
                ErrorMessage="Неверный формат времени закрытия заявки. Формат должен быть hh:mm." Display="None" 
                SetFocusOnError="True" ValidationExpression="^([0-1][0-9]|[2][0-3]):([0-5][0-9])$">
                </asp:RegularExpressionValidator>

            <label class="cc-date-label">Дата</label>
            <asp:TextBox ID="cessation_claim_executed_date" runat="server" ClientIDMode="Static" 
                CssClass="hz-date cc-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_executed_date" 
                ErrorMessage="Дата закрытия заявки должна быть указана." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator5" runat="server" Text="*" CssClass="cessation-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators" ControlToValidate="cessation_claim_executed_date" 
                ErrorMessage="Неверный формат даты закрытия заявки. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>
    <div class="cc-validators">
        <asp:ValidationSummary runat="server" CssClass="cessation-claim-validator" ClientIdMode="AutoID" ValidationGroup="cessation_claim_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="cessation_claim_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="cessation_claim_validators" ClientIdMode="Static"/>
            <asp:Button ID="cessation_claim_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
