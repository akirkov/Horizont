<%@ Page Title="Информация по заявке" Language="C#" MasterPageFile="~/MasterPages/Site.master" AutoEventWireup="true" EnableEventValidation="false"
    CodeBehind="FeedbackStatus.aspx.cs" Inherits="Horizont.Web.FeedbackStatus" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script type="text/javascript">
        $(document).ready(function () {
        });
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div class="page-box">
        <div id="Status" runat="server" ClientIdMode="Static">
            <div id="SuccessStatus" runat="server" ClientIdMode="Static">
		        <h2 class="page-headline-inner green">Сообщение успешно отправлено!</h2>
		        <div class="page-inner-box">
                    <p>В ближайшее время оно будет обработано администрацией сайта и Вам будет отправлен ответ.</p>
                </div>
            </div>
            <div id="ErrorStatus" runat="server" ClientIdMode="Static">
		        <h2 class="page-headline-inner red">Произошла ошибка при отправке сообщения!</h2>
		        <div class="page-inner-box">
                    <p>Скорее всего ошибка является следствием неполадок на сервере. Попробуйте отправить сообщение через некоторое время.</p>
                </div>
            </div>
        </div>

        <p class="page-submit">
            <asp:Button ID="MainPageButton" runat="server" OnClick="OnMainPageBtnClick" 
                Text="Главная страница" ClientIDMode="Static"/>
        </p>
    </div>
</asp:Content>

