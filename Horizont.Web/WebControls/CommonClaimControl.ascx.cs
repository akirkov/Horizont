using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HorizontSite
{
    public partial class CommonClaimControl : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void SubmissionCheck (object source, ServerValidateEventArgs args)
        {
            args.IsValid = !common_claim_legate.Checked || common_claim_submission.Checked;
        }

    }
}