namespace Horizont.Web
{
    using System;
    using System.Web;
    using System.Web.Security;
    using System.Web.UI.WebControls;
    using System.Web.Profile;

    using Recaptcha.Web.UI.Controls;

    public partial class InsertCommonClaim : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void OnInsertBtnClick(object sender, EventArgs e)
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return;
            MembershipUser user = Membership.GetUser();
            if (user == null)
                return;
            dynamic profile = ProfileBase.Create(user.UserName);
            string owner = profile.Surname + " " + profile.Name;
            if (!string.IsNullOrEmpty(profile.Fathername))
                owner += " " + profile.Fathername;

            string phone = profile.Phone;
            if (!string.IsNullOrEmpty(Phone.Text))
                phone = Phone.Text;

            ClaimsWebService service = new ClaimsWebService();
            int id = service.InsertCommonClaim(Convert.ToInt32 (JournalId.Value), profile.AddressId, profile.Flat, phone, owner, Failure.Text, Comment.Text);
            
            Response.Redirect("/Residents/CommonClaimInfo.aspx?id=" + id.ToString () + "&status=true");

        }

        protected void RecaptchaValidate(object source, ServerValidateEventArgs args)
        {
            string challenge = Request.Form["recaptcha_challenge_field"];
            string response = Request.Form["recaptcha_response_field"];

            RecaptchaService service = new RecaptchaService();
            args.IsValid = service.Validate (challenge, response);
        }
    }
}
