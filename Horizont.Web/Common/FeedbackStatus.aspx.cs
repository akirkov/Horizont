namespace Horizont.Web
{
    using System;
    using Recaptcha.Web.UI.Controls;

    public partial class FeedbackStatus : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            bool success = Convert.ToBoolean(Request.QueryString["success"]);

            SuccessStatus.Visible = success;
            ErrorStatus.Visible = !success;

        }

        protected void OnMainPageBtnClick(object sender, EventArgs e)
        {
            Response.Redirect("\\");
        }
    }
}
