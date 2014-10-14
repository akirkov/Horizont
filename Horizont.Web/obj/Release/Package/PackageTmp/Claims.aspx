<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Claims.aspx.cs" Inherits="HorizontSite.Claims" %>
<%@ Register src="CommonClaimControl.ascx" tagname="CommonClaimControl" tagprefix="claims_uc" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="Scripts/claims.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initClaimsDialogs();
            initClaimsEvents();
        });
    </script>
</asp:Content>

<asp:Content ID="MainContentId" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager" runat="server">
        <Services>
            <asp:ServiceReference Path="ClaimsWebService.svc" />
        </Services>
    </asp:ScriptManager>

    <div class="claims_main_content">
        <h1 ID="ClaimsTitle" runat="server">Заявки</h1>

        <asp:GridView ID="GridViewCtrl" runat="server" AutoGenerateColumns="False" 
            DataKeyNames="id" Width="907px" EmptyDataText="Нет заявок" 
            onrowdeleting="GridViewCtrl_RowDeleting" onrowediting="GridViewCtrl_RowEditing" 
            PageSize="20" ShowHeaderWhenEmpty="True" EnableModelValidation="False">
            <AlternatingRowStyle BackColor="#F2F2F2" />
            <Columns>
                <asp:BoundField DataField="Journal.name" HeaderText="Журнал" ReadOnly="True" />
                <asp:BoundField DataField="Address.address" HeaderText="Адрес" ReadOnly="True">
                </asp:BoundField>
                <asp:BoundField DataField="commonfailure" HeaderText="Неисправность" 
                    ReadOnly="True" />
                <asp:CheckBoxField DataField="submission" HeaderText="Передана на исп." 
                    ReadOnly="True">
                <ItemStyle HorizontalAlign="Center" Width="100px" />
                </asp:CheckBoxField>
                <asp:BoundField DataField="received_time" HeaderText="Дата внесения" 
                    ReadOnly="True">
                <ItemStyle Width="150px" />
                </asp:BoundField>

                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:ImageButton id="DeleteBtn" runat="server" CausesValidation="false" 
                            CommandName="" ImageUrl="~/Images/delete.png" Text=""/>
                    </ItemTemplate>
                    <ControlStyle CssClass="claims_delete_button" />
                    <ItemStyle HorizontalAlign="Center" Width="40px" />
                </asp:TemplateField>

                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:ImageButton id="EditBtn" runat="server" CausesValidation="false" 
                            CommandName="" ImageUrl="~/Images/edit.png" Text=""/>
                    </ItemTemplate>
                    <ControlStyle CssClass="claims_edit_button" />
                    <ItemStyle HorizontalAlign="Center" Width="40px" />
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
    <div id="CommonClaimDlg">
        <claims_uc:CommonClaimControl id="CommonClaimCtrl" runat="server" />
    </div>
</asp:Content>
