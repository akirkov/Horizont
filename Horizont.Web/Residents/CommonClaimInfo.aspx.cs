namespace Horizont.Web
{
    using System;
    using System.Web;
    using System.Web.Security;
    using System.Web.Profile;


    public partial class CommonClaimInfo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int id = Convert.ToInt32(Request.QueryString["id"]);

            bool status = false;
            if (!string.IsNullOrEmpty (Request.QueryString["status"]))
                status = Convert.ToBoolean(Request.QueryString["status"]);

            InsertClaimStatus.Visible = status || (id <= 0);
            InsertErrorStatus.Visible = (id <= 0);
            InsertSuccessStatus.Visible = (id > 0);

            ClaimInfo.Visible = (id > 0);
            CommonClaimPrintButton.Visible = (id > 0);

            if (id <= 0)
                return;

            int region_id = GetRegionId();
            if (region_id <= 0)
                return;

            var service = new ClaimsWebService ();
            var claim = service.GetCommonClaim(id, region_id);
            if (claim == null)
                return;

            ClaimRegnumber.InnerText = claim.RegNumber;
            ClaimOwner.InnerText = claim.Owner;
            ClaimAddress.InnerText = claim.Address.AddressStr;
            if (claim.Flat != null)
                ClaimAddress.InnerText += ", кв." + claim.Flat;
            string description = "";
            if (claim.Doorway != null)
                description += "подъезд №" + claim.Doorway.ToString ();
            if (claim.Floor != null) {
                if (description != "")
                    description += ", ";
                description += "этаж №" + claim.Floor.ToString ();
            }
            if (claim.Phone != "") {
                if (description != "")
                    description += ", ";
                description += "тел. " + claim.Phone;
            }
            if (description != "")
                ClaimAddress.InnerText += " (" + description + ")";
            ClaimJournal.InnerText = claim.Journal.Name;
            ClaimFailure.InnerText = claim.CommonFailureStr;
            ClaimComment.InnerText = claim.CommonFailureComment;
            ClaimSentTime.InnerText = claim.SentTime.ToString();
            ClaimDeliveredTime.InnerText = (claim.Status >= 1) ? claim.DeliveredTime.ToString() : "";
            ClaimReceivedTime.InnerText = (claim.Status >= 2) ? claim.ReceivedTime.ToString() : "";
            ClaimReceivedOperator.InnerText = (claim.Status >= 2) ? claim.ReceivedOperator : "";
            if (claim.IsLegate)
                ClaimExecutedTime.InnerText = claim.ExecutedTime.ToString();
            else
                ClaimExecutedTime.InnerText = "не позднее " + claim.ReceivedTime.AddDays((double)claim.ExecutedPeriod).ToString();
            ClaimStatus.InnerText = claim.GetStatusStr();      

            if (claim.Disp == null)
                return;

            DispName.InnerText = "ОДС " + claim.Disp.Name + " по району \"" + claim.Disp.Region.Name + "\"";
            DispAddress.InnerText = claim.Disp.Address;
            DispPhone.InnerText = claim.Disp.Phone;
        }

        protected void OnResidentClaimsBtnClick(object sender, EventArgs e)
        {
            Response.Redirect("/Residents/ResidentClaims.aspx");

        }

        private int GetRegionId()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return 0;
            MembershipUser user = Membership.GetUser();
            if (user == null)
                return 0;
            dynamic profile = ProfileBase.Create(user.UserName);

            var service = new RegionsWebService();
            var address = (profile.AddressId > 0) ? service.GetAddress(profile.AddressId) : null;
            if ((address == null) || (address.Region == null))
                return 0;
            return address.Region.Id;
        }
    }
}
