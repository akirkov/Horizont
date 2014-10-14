namespace Horizont.Web
{
    using System;
    using System.Web.UI.WebControls;

    public partial class Region : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ServerValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = true;
        }

        protected void CityValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = true;
        }

        protected void RegionValidate(object source, ServerValidateEventArgs args)
        {
            args.IsValid = true;
        }

    }
}