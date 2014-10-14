namespace Horizont.Web
{
    using System;
    using System.Web.UI.WebControls;

    public partial class CommonClaim : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void SubmissionValidate (object source, ServerValidateEventArgs args)
        {
            args.IsValid = !common_claim_legate.Checked || common_claim_submission.Checked;
        }

    }
}