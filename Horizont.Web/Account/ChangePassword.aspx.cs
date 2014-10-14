namespace Horizont.Web.Account
{
    using System;
    using System.Web;
    using System.Web.Security;
    using System.Web.UI;

    public partial class ChangePassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack)
                return;

            StatusSuccess.Visible = StatusError.Visible = false;
        }

        protected void UpdatePassword(object sender, EventArgs e)
        {
            try
            {
                if (!HttpContext.Current.User.Identity.IsAuthenticated)
                    return;
                MembershipUser user = Membership.GetUser();
                if (user == null)
                    return;

                if (!user.ChangePassword(OldPassword.Text, Password.Text))
                {
                    StatusError.Visible = true;
                    return;
                }
                    
                StatusSuccess.Visible = true;
            }
            catch (Exception)
            {
                StatusError.Visible = true;
            }
        }
    }
}
