<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RepeatFlatsFilter.ascx.cs" 
    Inherits="Horizont.Web.RepeatFlatsFilter" %>
<div id="repeat_flats_filter_control" >
    <div class="fc-header">
    </div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Журнал</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="repeat_flats_filter_journal" placeholder="Все журналы" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Диапазон дат</p>
        </div>
        <div class="fc-block-row">
            <label id="repeat_flats_filter_date_from_label">с :</label>
            <asp:CheckBox ID="repeat_flats_filter_date_from_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="repeat_flats_filter_date_from" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="repeat-flats-filters-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="repeat_flats_filter_validators" ControlToValidate="repeat_flats_filter_date_from" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>

            <label id="repeat_flats_filter_date_to_label">по :</label>
            <asp:CheckBox ID="repeat_flats_filter_date_to_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="repeat_flats_filter_date_to" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="repeat-flats-filters-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="repeat_flats_filter_validators" ControlToValidate="repeat_flats_filter_date_to" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Кол-во повторов</p>
        </div>
        <div class="fc-block-row">
            <asp:TextBox ID="repeat_flats_filter_minrepeatscount" CssClass = "ui-corner-all" runat="server" 
                ClientIDMode="Static" TextMode="Number">2</asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*" CssClass="repeat-flats-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="repeat_flats_filter_validators" ControlToValidate="repeat_flats_filter_minrepeatscount" 
                ErrorMessage="Кол-во повторов должно быть задано." Display="None"></asp:RequiredFieldValidator>
            <asp:CompareValidator ID="CompareValidator7" runat="server" Text="*" CssClass="repeat-flats-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="repeat_flats_filter_validators" ControlToValidate="repeat_flats_filter_minrepeatscount"
                ErrorMessage="Кол-во повторов должно быть положительным числом." Display="None" SetFocusOnError="True" Operator="GreaterThan" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
        </div>
    </div>

    <div class="fc-validators">
        <asp:ValidationSummary runat="server" CssClass="repeat-flats-filter-validator" ClientIdMode="AutoID" ValidationGroup="repeat_flats_filter_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
        <div class="hz-dialog-custom-buttons">
            <asp:Button ID="repeat_flats_filter_reset" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сбросить" ValidationGroup="repeat_flats_filter_validators" ClientIdMode="Static"/>
        </div>
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="repeat_flats_filter_ok_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="OK" ValidationGroup="repeat_flats_filter_validators" ClientIdMode="Static"/>
            <asp:Button ID="repeat_flats_filter_cancel_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Отмена"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
