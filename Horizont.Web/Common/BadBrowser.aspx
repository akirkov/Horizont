<%@ Page Title="Вы используете устаревший браузер" Language="C#" AutoEventWireup="true" CodeBehind="BadBrowser.aspx.cs" 
    Inherits="Horizont.Web.BadBrowser" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="/Images/favicon.ico">
    <link href="/Styles/common.css" rel="stylesheet" type="text/css" />
    <link href="/Styles/bad-browser.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div id="bad_browser">
        <div id="head"></div>
        <div id="wrap">
            <div id="content">
            Для работы с сайтом необходима поддержка Javascript и Cookies.
            <div>
                Чтобы использовать все возможности сайта, загрузите и установите один из этих браузеров:
                <div id="browsers" style="width: 360px;">
                    <a href="http://www.google.com/chrome/" target="_blank" style="background: url(/images/chrome.png) no-repeat 50% 17px;">Chrome</a>
                    <a href="http://www.mozilla-europe.org/" target="_blank" style="background: url(/images/firefox.png) no-repeat 50% 17px;">Firefox</a>
                    <a href="http://www.opera.com/" target="_blank" style="background: url(/images/opera.png) no-repeat 50% 15px;">Opera</a>
                </div>
            </div>
            </div>
        </div>
    </div>
</body>
</html>
