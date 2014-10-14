<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Region.ascx.cs" 
    Inherits="Horizont.Web.Region" %>
<div id="region_control">
    <div class="region-row-wrap">
        <div class="region-field-label">Название :</div>
        <div class="region-field">
            <asp:TextBox ID="region_name" placeholder="Не задано" CssClass = "ui-corner-all" runat="server" ClientIDMode="Static"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*" CssClass="region-validator" 
                ClientIdMode="AutoID" ValidationGroup="region_validators" ControlToValidate="region_name" 
                ErrorMessage="Название должно быть задано" Display="None" SetFocusOnError="True">
            </asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="region-row-wrap">
        <div class="region-field-label">Город :</div>
        <div class="region-field">
            <asp:DropDownList ID="region_city" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
            <asp:CustomValidator ID="CustomValidator1" runat="server" Text="*" CssClass="region-validator" 
                ClientIdMode="AutoID" ValidationGroup="region_validators"
                ErrorMessage="Город должен быть задан" Display="None" 
                SetFocusOnError="True" OnServerValidate="CityValidate" ClientValidationFunction="regionCityValidate">
            </asp:CustomValidator>
        </div>
    </div>

    <div class="region-row-wrap">
        <div class="region-field-label">Сервер :</div>
        <div class="region-field">
            <asp:DropDownList ID="region_server" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
            <asp:CustomValidator ID="CustomValidator2" runat="server" Text="*" CssClass="region-validator" 
                ClientIdMode="AutoID" ValidationGroup="region_validators"
                ErrorMessage="Сервер должен быть задан" Display="None" 
                SetFocusOnError="True" OnServerValidate="ServerValidate" ClientValidationFunction="regionServerValidate">
            </asp:CustomValidator>
        </div>
    </div>

    <div class="region-row-wrap">
        <div class="region-field-label">Район :</div>
        <div class="region-field">
            <asp:DropDownList ID="region_local" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" EnableViewState="False">
             </asp:DropDownList>
            <asp:CustomValidator ID="CustomValidator3" runat="server" Text="*" CssClass="region-validator" 
                ClientIdMode="AutoID" ValidationGroup="region_validators"
                ErrorMessage="Район должен быть задан" Display="None" 
                SetFocusOnError="True" OnServerValidate="RegionValidate" ClientValidationFunction="regionRegionValidate">
            </asp:CustomValidator>
        </div>
    </div>

    <div class="settings-validators">
        <asp:ValidationSummary runat="server" CssClass="region-validator" ClientIdMode="AutoID" ValidationGroup="region_validators"/>
    </div>  
    <div class="hz-dialog-buttonpane">
	    <div class="hz-dialog-buttonset">
            <asp:Button ID="region_save_button" CssClass="hz-dialog-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Сохранить" ValidationGroup="region_validators" ClientIdMode="Static"/>
            <asp:Button ID="region_close_button" CssClass="hz-dialog-button hz-dialog-close-button hz-button-state-default ui-corner-all" 
                runat="server" Text="Закрыть"  ClientIdMode="Static"/>
	    </div>
    </div>
</div>
