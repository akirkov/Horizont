namespace Horizont.Web
{
    using System;
    using System.Configuration;
    using System.Net.Mail;
    using System.Web.UI.WebControls;

    public partial class FeedBack : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void OnSendBtnClick(object sender, EventArgs e)
        {
            try
            {
                MailAddress from = new MailAddress (Email.Text, Name.Text);
                MailAddress to = new MailAddress(ConfigurationManager.AppSettings["FeedbackReceiver"]);
                MailMessage message = new MailMessage (from, to);
                message.ReplyToList.Add (from);
                message.Subject = Subject.Text;
                message.Body = Message.Text;
                
                SmtpClient client = new SmtpClient();
                client.Send(message);

                Response.Redirect("/Common/FeedbackStatus.aspx?success=True", false);
                return;
            }
            catch (Exception)
            {
                Response.Redirect("/Common/FeedbackStatus.aspx?success=False", false);
            }
        }
        
        protected void RecaptchaValidate(object source, ServerValidateEventArgs args)
        {
            string challenge = Request.Form["recaptcha_challenge_field"];
            string response = Request.Form["recaptcha_response_field"];

            RecaptchaService service = new RecaptchaService();
            args.IsValid = service.Validate(challenge, response);
        }
    }
}
