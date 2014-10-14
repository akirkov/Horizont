namespace Horizont.Web
{
    using System;
    using System.Web.UI.WebControls;

    public partial class CessationClaim : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void AddressesValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = cessation_claim_addresses.SelectedItem != null;
        }
    }
}