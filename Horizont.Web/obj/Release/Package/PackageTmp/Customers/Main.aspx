<%@ Page Title="СДКУ Горизонт" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true"
    CodeBehind="Main.aspx.cs" Inherits="Horizont.Web.Main" EnableEventValidation="False"%>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link href="/Styles/customers.css" rel="stylesheet" type="text/css" />
    <script src="/Scripts/customers.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            initCustomersMainPage();
        });
    </script>
</asp:Content>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="left-main-content">
        <div class="page-box main-content regions-main-content">
            <p>Выберите объект</p>

            <div>
                <label for="cities_list">Город :</label>
                <asp:DropDownList ID="cities_list" 
                    runat="server" CssClass="ui-corner-all"  ClientIDMode="Static" 
                    EnableViewState="False">
                </asp:DropDownList>
            </div>
            <div>
                <label for="regions_list">Район :</label>
                <asp:DropDownList ID="regions_list" runat="server" CssClass="ui-corner-all"  ClientIDMode="Static">
                </asp:DropDownList>
            </div>
            <div>
                <label for="disps_list">ОДС : </label>&nbsp;
                <asp:DropDownList ID="disps_list" runat="server" CssClass="ui-corner-all"  
                    ClientIDMode="Static" EnableViewState="False">
                </asp:DropDownList>
            </div>
        </div>
    </div>
    <div class="right-main-content">
        <div class="page-box main-content claims-main-content">
            <div class="main-border-style claims-border-style">
                <asp:Button ID="unexecuted_claims_button" cssClass="claims-button" runat="server" 
                    Text="Невыполенные &#10;заявки" ClientIdMode="Static" />
                <asp:TextBox ID="unexecuted_claims_count" runat="server" ClientIdMode="Static" 
                    ReadOnly="True">0</asp:TextBox>
                <p class="unexecuted_claims"> Всего<br />невыполненных</p>
            </div>
            <div class="main-border-style claims-border-style">
                <asp:Button ID="overdue_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Просроченные &#10;заявки" />
                <asp:TextBox ID="overdue_claims_count" runat="server" ClientIdMode="Static" 
                    ReadOnly="True">0</asp:TextBox>
                <p class="overdue_claims"> Всего<br />просроченных</p>
            </div>
            <div class="main-border-style claims-border-style">
                <asp:Button ID="legate_unexecuted_claim_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Отписанные, &#10;но невыполенные" />
                <asp:TextBox ID="legate_unexecuted_claims_count" runat="server" ClientIdMode="Static" 
                    ReadOnly="True">0</asp:TextBox>
                <p class="legate_unexecuted_claims"> Всего отписанных,<br />но невыполненных</p>
            </div>
            <div id="common_claims_border" class="main-border-style claims-border-style">
                <asp:Button ID="common_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Все заявки" />
                <asp:Button ID="repeat_flats_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Повторные &#10;заявки" />
                <asp:Button ID="brigade_claims_button" cssClass="clear claims-button" runat="server" ClientIdMode="Static" 
                    Text="Бригадные &#10;заявки" />
                <asp:Button ID="damage_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Аварийные &#10;заявки" />
            </div>
            <div id="lift_claims_border" class="main-border-style claims-border-style">
                <asp:Button ID="lift_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Заявки &#10;по лифтам" />
                <asp:Button ID="break_lift_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Неисправные &#10;лифты"/>
                <asp:TextBox ID="break_lift_claims_count" runat="server" ClientIdMode="Static" 
                    ReadOnly="True">0</asp:TextBox>
                <asp:Button ID="jam_lift_claims_button" cssClass="clear claims-button" runat="server" ClientIdMode="Static" 
                    Text="Застревания" />
                <asp:Button ID="current_jam_lift_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Текущие &#10;застревания" />
                <asp:TextBox ID="current_jam_lift_claims_count" runat="server" ClientIdMode="Static" 
                    ReadOnly="True">0</asp:TextBox>
            </div>
            <div class="main-border-style claims-border-style">
                <asp:Button ID="unlegate_executed_lift_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Выполненные, но &#10;не отписанные заявки" />
                <asp:TextBox ID="unlegate_executed_lift_claims_count" runat="server" ClientIdMode="Static"  
                    ReadOnly="True">0</asp:TextBox>
                <p> Всего выполненных,<br />но не отписанных</p>
            </div>
            <div class="main-border-style claims-border-style">
                <asp:Button ID="cessation_claims_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Отключения" />
                <asp:Button ID="current_cessation_claim_button" cssClass="claims-button" runat="server" ClientIdMode="Static" 
                    Text="Действующие &#10;отключения" />
                <asp:TextBox ID="current_cessation_claims_count" runat="server" ClientIdMode="Static" 
                    ReadOnly="True">0</asp:TextBox>
            </div>
        </div>
        <div class="page-box main-content elv-main-content">
            <div id="terms_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Терминалы</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="terms_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Неисправно:</p>
                        <asp:TextBox ID="break_terms_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="lifts_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Лифты</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="lifts_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Неисправно:</p>
                        <asp:TextBox ID="break_lifts_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="hoists_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Подъёмники</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="hoists_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Неисправно:</p>
                        <asp:TextBox ID="break_hoists_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="doors_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Двери</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="doors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Вскрыто:</p>
                        <asp:TextBox ID="open_doors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="firesensors_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Пожарные датчики</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="firesensors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Аварийных:</p>
                        <asp:TextBox ID="alarm_firesensors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="watersensors_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Датчики затопления</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="watersensors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Аварийных:</p>
                        <asp:TextBox ID="alarm_watersensors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="gassensors_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Датчики загазованности</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="gassensors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Аварийных:</p>
                        <asp:TextBox ID="alarm_gassensors_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="telecontrols_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Щитовые</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="telecontrols_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Включено:</p>
                        <asp:TextBox ID="enabled_telecontrols_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="channels_border" class="main-border-style elv-border-style">
                <div class="elv-objects-header">
                    <p>Каналы ГГС</p>
                </div>
                <div>
                    <div class="elv-objects-data all-elv-objects-data">
                        <p>Всего:</p>
                        <asp:TextBox ID="channels_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                    <div class="elv-objects-data break-elv-objects-data">
                        <p>Неисправно:</p>
                        <asp:TextBox ID="break_channels_count" runat="server" ClientIdMode="Static" 
                            ReadOnly="True">0</asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
