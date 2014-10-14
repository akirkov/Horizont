namespace Horizont.Web
{
    using System;
    using System.Web.UI.WebControls;

    public partial class User : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void AddressValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = true;
        }

        protected void FlatValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = true;
        }

        protected void PhoneValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = true;
        }
    }
}