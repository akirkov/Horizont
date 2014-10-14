namespace Horizont.Web
{
    using System;
    using System.Web;
    using System.Web.Profile;
    using System.Web.Security;

    public partial class SiteMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ServersRef.Visible = HttpContext.Current.User.Identity.IsAuthenticated && Roles.IsUserInRole("Administrators");
            CitiesRef.Visible = HttpContext.Current.User.Identity.IsAuthenticated && Roles.IsUserInRole("Administrators");
            RegionsRef.Visible = HttpContext.Current.User.Identity.IsAuthenticated && Roles.IsUserInRole("Administrators");
            AddressesRef.Visible = HttpContext.Current.User.Identity.IsAuthenticated && Roles.IsUserInRole("Administrators");
            UsersRef.Visible = HttpContext.Current.User.Identity.IsAuthenticated && Roles.IsUserInRole("Administrators");
            PersonalRef.Visible = HttpContext.Current.User.Identity.IsAuthenticated && Roles.IsUserInRole("Residents") && !IsPersonalPage ();
            RegisterRef.Visible = !HttpContext.Current.User.Identity.IsAuthenticated && !IsRegisterPage ();
            HeadLoginStatus.Visible = HttpContext.Current.User.Identity.IsAuthenticated;
            YandexMetric.Visible = HttpContext.Current.User.Identity.IsAuthenticated;
            
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                dynamic profile = ProfileBase.Create(Membership.GetUser().UserName);

                current_user_username.Value = Membership.GetUser().UserName;
                current_user_surname.Value = profile.Surname;
                current_user_name.Value = profile.Name;
                current_user_fathername.Value = profile.Fathername;
                current_user_post.Value = profile.Post;

                if (profile.AddressId > 0)
                {
                    RegionsWebService service = new RegionsWebService();
                    var address = service.GetAddress(profile.AddressId);
                    if (address != null)
                    {
                        current_region_id.Value = address.Region.Id.ToString ();
                        current_user_address.Value = address.Name;
                        if (profile.Flat > 0)
                            current_user_address.Value += ", кв." + profile.Flat.ToString();
                    }
                }

                string folder = Request.Url.AbsolutePath.Split('/')[1].ToLower ();
                if (!profile.IsActivated && (folder != "common") && (folder != "account"))
                    Response.Redirect("/Common/NonActivatedUser.aspx");

            }
        }

        private bool IsRegisterPage()
        {
            return (Request.Url.AbsolutePath.ToLower() == "/account/register.aspx");
        }

        private bool IsPersonalPage()
        {
            return (Request.Url.AbsolutePath.ToLower() == "/account/personal.aspx");
        }
    }
}
