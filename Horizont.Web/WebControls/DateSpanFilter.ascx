<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateSpanFilter.ascx.cs" 
    Inherits="Horizont.Web.DateSpanFilter" %>
<div id="date_span_filter_control" >
    <div class="fc-header">
    </div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Диапазон дат</p>
        </div>
        <div class="fc-block-row">
            <div class="date-span-filter-date-wrap">
                <label>с :</label>
                <asp:CheckBox ID="date_span_filter_date_from_checkbox" ClientIDMode="Static" runat="server" />
                <asp:TextBox ID="date_span_filter_date_from" runat="server" ClientIDMode="Static" 
                    CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="date-span-filter-validator" 
                    ClientIdMode="AutoID" ValidationGroup="date_span_filter_validators" ControlToValidate="date_span_filter_date_from" 
                    ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                    SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                    </asp:RegularExpressionValidator>
            </div>

            <div class="date-span-filter-date-wrap">
                <label>по :</label>
                <asp:CheckBox ID="date_span_filter_date_to_checkbox" ClientIDMode="Static" runat="server" />
                <asp:TextBox ID="date_span_filter_date_to" runat="server" ClientIDMode="Static" 
                    CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="date-span-filter-validator" 
                    ClientIdMode="AutoID" ValidationGroup="date_span_filter_validators" ControlToValidate="date_span_filter_date_to" 
                    ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                    SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                    </asp:RegularExpressionValidator>
            </div>
        </div>
    </div>

    <div class="fc-validators">
        <asp:ValidationSummary runat="server" CssClass="date-span-filter-validator" ClientIdMode="AutoID" ValidationGroup="date_span_filter_validators"/>
    </div>  

    <div class="hz-dialog-buttonpane">
        <div class="hz-dialog-custom-buttons">
        </div>
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="date_span_filter_ok_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="OK" ValidationGroup="date_span_filter_validators" ClientIdMode="Static"/>
            <asp:Button ID="date_span_filter_cancel_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Отмена"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
