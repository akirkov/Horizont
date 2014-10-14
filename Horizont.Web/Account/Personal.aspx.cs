namespace Horizont.Web.Account
{
    using System;
    using System.Web;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.Profile;
    using Horizont.Model.Entities;

    public partial class Personal : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack)
                return;

            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return;
            MembershipUser user = Membership.GetUser();
            if (user == null)
                return;

            Username.Text = user.UserName;
            Email.Text = user.Email;

            dynamic profile = ProfileBase.Create(user.UserName);
            Surname.Text = profile.Surname;
            Name.Text = profile.Name;
            Fathername.Text = profile.Fathername;
            Flat.Text = (profile.Flat > 0) ? profile.Flat.ToString () : "";
            Phone.Text = profile.Phone;

            RegionsWebService service = new RegionsWebService();
            AddressObject address = (profile.AddressId > 0) ? service.GetAddress(profile.AddressId) : null;
            if (address != null)
            {
                City.Text = address.Region.City.Name;
                Region.Text = address.Region.Name;
                Address.Text = address.Name;
            }

            StatusSuccess.Visible = StatusError.Visible = false;
        }

        protected void UpdateUser(object sender, EventArgs e)
        {
            try
            {
                if (!HttpContext.Current.User.Identity.IsAuthenticated)
                    return;
                MembershipUser user = Membership.GetUser();
                if (user == null)
                    return;

                user.Email = Email.Text;
                Membership.UpdateUser(user);

                dynamic profile = ProfileBase.Create(user.UserName);
                profile.Surname = Surname.Text;
                profile.Name = Name.Text;
                profile.Fathername = Fathername.Text;
                profile.Phone = Phone.Text;
                profile.Save();

                StatusSuccess.Visible = true;
            }
            catch (Exception)
            {
                StatusError.Visible = true;
            }
        }
    }
}
