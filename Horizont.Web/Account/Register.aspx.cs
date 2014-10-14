namespace Horizont.Web.Account
{
    using System;
    using System.Web.Security;
    using System.Web.UI.WebControls;
    using System.Web.Profile;

    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RegisterUser.ContinueDestinationPageUrl = Request.QueryString["ReturnUrl"];
        }

        protected void RegisterUser_CreatedUser(object sender, EventArgs e)
        {
            FormsAuthentication.SetAuthCookie(RegisterUser.UserName, false /* createPersistentCookie */);

            dynamic profile = ProfileBase.Create(RegisterUser.UserName);
            profile.IsActivated = false;
            profile.Surname = ((TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("register_surname")).Text;
            profile.Name = ((TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("register_name")).Text;
            profile.Fathername = ((TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("register_fathername")).Text;
            profile.Post = "";
            profile.AddressId = Convert.ToInt32(((HiddenField)RegisterUserWizardStep.ContentTemplateContainer.FindControl("register_address_id")).Value);
            profile.Flat = Convert.ToInt32(((TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("register_flat")).Text);
            profile.Phone = ((TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("register_phone")).Text;
            profile.Save();

            Roles.AddUserToRole(RegisterUser.UserName, "Residents");

            string continueUrl = RegisterUser.ContinueDestinationPageUrl;
            if (String.IsNullOrEmpty(continueUrl))
            {
                continueUrl = "~/";
            }
            Response.Redirect(continueUrl);
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
