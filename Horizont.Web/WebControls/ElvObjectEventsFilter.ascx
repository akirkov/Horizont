<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ElvObjectEventsFilter.ascx.cs" 
    Inherits="Horizont.Web.ElvObjectEventsFilter" %>
<div id="elv_object_events_filter_control" >
    <div class="fc-header">
    </div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Дата</p>
        </div>
        <div class="fc-block-row">
            <label id="elv_object_events_filter_date_from_label">с :</label>
            <asp:CheckBox ID="elv_object_events_filter_date_from_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="elv_object_events_filter_date_from" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Text="*" CssClass="elv-object-events-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="elv_object_events_filter_validators" ControlToValidate="elv_object_events_filter_date_from" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>

            <label id="elv_object_events_filter_date_to_label">по :</label>
            <asp:CheckBox ID="elv_object_events_filter_date_to_checkbox" ClientIDMode="Static" runat="server" />
            <asp:TextBox ID="elv_object_events_filter_date_to" runat="server" ClientIDMode="Static" 
                CssClass="hz-date ui-corner-all">12.12.2012</asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" Text="*" CssClass="elv-object-events-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="elv_object_events_filter_validators" ControlToValidate="elv_object_events_filter_date_to" 
                ErrorMessage="Неверный формат даты. Формат должен быть dd.mm.yyyy." Display="None" 
                SetFocusOnError="True" ValidationExpression="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$">
                </asp:RegularExpressionValidator>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Длительность</p>
        </div>
        <div class="fc-block-row">
            <label id="elv_object_events_filter_mineventtime_label">от</label>
            <asp:TextBox ID="elv_object_events_filter_mineventtime" CssClass = "ui-corner-all" runat="server" 
                ClientIDMode="Static">180</asp:TextBox>
            <asp:CompareValidator ID="CompareValidator7" runat="server" Text="*" CssClass="lift-claims-filter-validator" 
                ClientIdMode="AutoID" ValidationGroup="elv_object_events_filter_validators" ControlToValidate="elv_object_events_filter_mineventtime"
                ErrorMessage="Длительность события не должна быть отрицательным числом." Display="None" SetFocusOnError="True" Operator="GreaterThanEqual" Type="Integer" ValueToCompare="0"></asp:CompareValidator>
            <label id="elv_object_events_filter_mineventtime_dimension">мин.</label>
        </div>
    </div>

    <div class="fc-between-blocks"></div>

    <div class="fc-block">
        <div class="fc-block-header">
            <p>Объекты</p>
        </div>
        <div class="fc-block-row">
            <asp:DropDownList id="elv_object_events_filter_objects" multiple="multiple" runat="server" 
                CssClass="ui-corner-all"  ClientIDMode="Static">
            </asp:DropDownList>
        </div>
    </div>

    <div class="fc-validators">
        <asp:ValidationSummary runat="server" CssClass="elv-object-events-filter-validator" ClientIdMode="AutoID" ValidationGroup="elv_object_events_filter_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
        <div class="hz-dialog-custom-buttons">
            <asp:Button ID="elv_object_events_filter_reset" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сбросить" ValidationGroup="elv_object_events_filter_validators" ClientIdMode="Static"/>
        </div>
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="elv_object_events_filter_ok_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="OK" ValidationGroup="elv_object_events_filter_validators" ClientIdMode="Static"/>
            <asp:Button ID="elv_object_events_filter_cancel_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Отмена"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
