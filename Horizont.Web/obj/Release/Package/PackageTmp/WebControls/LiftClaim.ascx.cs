namespace Horizont.Web
{
    using System;
    using System.Web.UI.WebControls;

    public partial class LiftClaim : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void SubmissionValidate (object source, ServerValidateEventArgs args)
        {
            args.IsValid = !lift_claim_legate.Checked || lift_claim_submission.Checked;
        }

    }
}