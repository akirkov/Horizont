<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CommonClaim.ascx.cs" 
    Inherits="Horizont.Web.CommonClaim" %>
<div id="common_claim_control">
    <div class="cc-header">
        <label class="cc-regnumber-label">№</label>
        <asp:TextBox ID="common_claim_regnumber" CssClass="cc-regnumber ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        <asp:Label ID="common_claim_journal" CssClass="cc-journal" runat="server" Text="Журнал" ClientIDMode="Static"></asp:Label>
        <div class="cc-toolbar">
            <input type="image" id="common_claim_print_button" src="../Images/print.png" title="Печать"/>
        </div>
    </div>
    <div class="cc-block">
        <div class="cc-block-header">
            <p>Приём заявки</p>
        </div>
        <div class="cc-block-row">
            <label id="common_claim_address_label">Адрес</label>
            <asp:TextBox ID="common_claim_address" placeholder="Не выбран" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_address" 
                ErrorMessage="Адрес должен быть задан." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>

            <label id="common_claim_flat_label">Кв.</label>
            <asp:TextBox ID="common_claim_flat" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" CausesValidation="False"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator1" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_flat"
                ErrorMessage="Номер квартиры должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>

            <label id="common_claim_doorway_label">Подъезд</label>
            <asp:TextBox ID="common_claim_doorway" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator3" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_doorway"
                ErrorMessage="Номер подъезда должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>

            <label id="common_claim_floor_label">Этаж</label>
            <asp:TextBox ID="common_claim_floor" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
            <asp:CompareValidator ID="CompareValidator5" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_floor"
                ErrorMessage="Номер этажа должен быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>

            <label id="common_claim_phone_label">Телефон</label>
            <asp:TextBox ID="common_claim_phone" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>

            <label id="common_claim_code_label">Код</label>
            <asp:TextBox ID="common_claim_code" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        </div>

        <div class="cc-block-row">
            <label id="common_claim_owner_label">ФИО</label>
            <asp:TextBox ID="common_claim_owner" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        </div>

        <div class="cc-block-row">
            <label id="common_claim_failure_label">Неисправность</label>
            <asp:TextBox ID="common_claim_failure" runat="server"  CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_failure" 
                ErrorMessage="Неисправность должна быть задана." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>

            <label id="common_claim_executed_period_label">Время на выполнение</label>
            <asp:TextBox ID="common_claim_executed_period" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" TextMode="Number"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_executed_period" 
                ErrorMessage="Время на выполнение должно быть задано." Display="None"></asp:RequiredFieldValidator>
            <asp:CompareValidator ID="CompareValidator7" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_executed_period"
                ErrorMessage="Время на выполнение должно быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
            <label id="common_claim_period_dimension">смена</label>
        </div>

        <div class="cc-block-row">
            <label id="common_claim_comment_label">Примечание</label>
            <asp:TextBox ID="common_claim_comment" runat="server" CssClass="ui-corner-all" ClientIDMode="Static" TextMode="MultiLine"></asp:TextBox>
        </div>

        <div class="cc-block-row cc-signature">
            <label class="cc-operator-label">Диспетчер</label>
            <asp:Label ID="common_claim_received_operator" runat="server" Text="Администратор" ClientIDMode="Static"
                CssClass="cc-operator" ></asp:Label>

            <label class="cc-time-label">Время</label>
            <asp:TextBox ID="common_claim_received_time" runat="server" ClientIDMode="Static" 
                CssClass="hz-time cc-time ui-corner-all">00:00</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_received_time" 
                ErrorMessage="Время получения заявки должно быть указано." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RequiredFieldValidator2" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_received_time" 
                ErrorMessage="Неверный формат времени получения заявки. Формат должен быть hh:mm." Display="None" 
                SetFocusOnError="True" ValidationExpression="^([0-1][0-9]|[2][0-3]):([0-5][0-9])$">
                </asp:RegularExpressionValidator>

            <label class="cc-date-label">Дата</label>
            <asp:TextBox ID="common_claim_received_date" runat="server" ClientIDMode="Static" 
                CssClass="hz-date cc-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_received_date" 
                ErrorMessage="Дата получения заявки должна быть указана." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_received_date" 
                ErrorMessage="Неверный формат даты получения заявки. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="cc-between-blocks"></div>

    <div class="cc-block">
        <div class="cc-block-header">
            <asp:CheckBox ID="common_claim_submission" runat="server" ClientIDMode="Static" CausesValidation="False" />
            <p>Передача на исполнение</p>
        </div>

        <div class="cc-block-row">
            <label id="common_claim_orgname_label">Организация</label>
            <asp:TextBox ID="common_claim_orgname" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>

            <label id="common_claim_type_label">Тип заявки</label>
            <asp:DropDownList ID="common_claim_type" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static">
                <asp:ListItem Text="Обычная" Value="0" Selected="True"></asp:ListItem>
                <asp:ListItem Text="Бригадная" Value="1"></asp:ListItem>
                <asp:ListItem Text="Аварийная" Value="2"></asp:ListItem>
            </asp:DropDownList>
        </div>

        <div class="cc-block-row cc-signature">
            <label class="cc-operator-label">Диспетчер</label>
            <asp:Label ID="common_claim_submission_operator" runat="server" Text="Администратор" ClientIDMode="Static"
                CssClass="cc-operator" ></asp:Label>

            <label class="cc-time-label">Время</label>
            <asp:TextBox ID="common_claim_submission_time" runat="server" ClientIDMode="Static" 
                CssClass="hz-time cc-time ui-corner-all">00:00</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_submission_time" 
                ErrorMessage="Время передачи на исполнение заявки должно быть указано." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_submission_time" 
                ErrorMessage="Неверный формат времени передачи заявки на иполнение. Формат должен быть hh:mm." Display="None" 
                SetFocusOnError="True" ValidationExpression="^([0-1][0-9]|[2][0-3]):([0-5][0-9])$">
                </asp:RegularExpressionValidator>

            <label class="cc-date-label">Дата</label>
            <asp:TextBox ID="common_claim_submission_date" runat="server" ClientIDMode="Static" 
                CssClass="hz-date cc-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_submission_date" 
                ErrorMessage="Дата передачи на исполнение заявки должна быть указана." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator4" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_submission_date" 
                ErrorMessage="Неверный формат даты передачи заявки на исполнение. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="cc-between-blocks"></div>

    <div class="cc-block">
        <div class="cc-block-header">
            <asp:CheckBox ID="common_claim_legate" runat="server" ClientIDMode="Static" />
            <p>Отметка о выполнении</p>
        </div>

        <div class="cc-block-row">
            <label id="common_claim_status_label">Статус</label>
            <asp:DropDownList ID="common_claim_status" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static">
                <asp:ListItem Text="Выполнено" Value="0" Selected="True"></asp:ListItem>
                <asp:ListItem Text="Не выполнено" Value="1"></asp:ListItem>
            </asp:DropDownList>
        </div>

        <div class="cc-block-row">
            <label id="common_claim_typework_label">Что сделано</label>
            <asp:TextBox ID="common_claim_typework" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>
        </div>
        <div class="cc-block-row">
            <label id="common_claim_executor_label">Исполнитель</label>
            <asp:TextBox ID="common_claim_executor" runat="server" CssClass="ui-corner-all" ClientIDMode="Static"></asp:TextBox>

            <asp:CheckBox ID="common_claim_check" runat="server" Text="Проверено"  ClientIDMode="Static"/>
        </div>

        <div class="cc-block-row cc-signature">
            <label class="cc-operator-label">Диспетчер</label>
            <asp:Label ID="common_claim_executed_operator" runat="server" Text="Администратор" ClientIDMode="Static"
                CssClass="cc-operator" ></asp:Label>

            <label class="cc-time-label">Время</label>
            <asp:TextBox ID="common_claim_executed_time" runat="server" ClientIDMode="Static" 
                CssClass="hz-time cc-time ui-corner-all">00:00</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_executed_time" 
                ErrorMessage="Время закрытия заявки должно быть указано." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_executed_time" 
                ErrorMessage="Неверный формат времени закрытия заявки. Формат должен быть hh:mm." Display="None" 
                SetFocusOnError="True" ValidationExpression="^([0-1][0-9]|[2][0-3]):([0-5][0-9])$">
                </asp:RegularExpressionValidator>

            <label class="cc-date-label">Дата</label>
            <asp:TextBox ID="common_claim_executed_date" runat="server" ClientIDMode="Static" 
                CssClass="hz-date cc-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_executed_date" 
                ErrorMessage="Дата закрытия заявки должна быть указана." Display="None" SetFocusOnError="True"></asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator5" runat="server" Text="*" CssClass="common-claim-validator" 
                ClientIdMode="AutoID" ValidationGroup="common_claim_validators" ControlToValidate="common_claim_executed_date" 
                ErrorMessage="Неверный формат даты закрытия заявки. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>
    <div class="cc-validators">
        <asp:CustomValidator ID="CustomValidator1" runat="server" Text="*" CssClass="common-claim-validator" 
            ClientIdMode="AutoID" ValidationGroup="common_claim_validators"
            ErrorMessage="Заявка должна быть передана на исполнение." Display="None" 
            SetFocusOnError="True" OnServerValidate="SubmissionValidate" ClientValidationFunction="commonSubmissionValidate">
            </asp:CustomValidator>
  
        <asp:ValidationSummary runat="server" CssClass="common-claim-validator" ClientIdMode="AutoID" ValidationGroup="common_claim_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="common_claim_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="common_claim_validators" ClientIdMode="Static"/>
            <asp:Button ID="common_claim_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
