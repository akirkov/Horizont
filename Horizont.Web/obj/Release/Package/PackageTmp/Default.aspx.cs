namespace Horizont.Web
{
    using System;
    using System.Web;
    using System.Web.Security;

    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return;
            if (Roles.IsUserInRole("Administrators") || Roles.IsUserInRole("Customers"))
                Response.Redirect("/Customers/Main.aspx");
            if (Roles.IsUserInRole("Residents"))
                Response.Redirect("/Residents/ResidentClaims.aspx");
        }
    }
}