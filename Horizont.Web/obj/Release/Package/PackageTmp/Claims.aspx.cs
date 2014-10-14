using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.ServiceModel;
using ClaimsDAL;
using HorizontSite.ClaimsServiceReference;

namespace HorizontSite
{
    public partial class Claims : System.Web.UI.Page
    {
        GlobalVariables vars = new GlobalVariables();
        ClaimsClient proxy = null;

        protected void Page_Load(object sender, EventArgs e)
        {
            string type = Request.QueryString["Claims"];
            if (type == "UnexucutedClaims")
                ClaimsTitle.InnerText = "Невыполненные заявки";

            UpdateGridViewCtrl();
        }

        protected void GridViewCtrl_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            using (proxy = new ClaimsClient(GlobalVariables.BindingConfiguration))
            {
                int id = (int)e.Keys[0];
                proxy.DeleteCommonClaim(id);

                UpdateGridViewCtrl();
            }
        }

        protected void UpdateGridViewCtrl()
        {
            using (proxy = new ClaimsClient(GlobalVariables.BindingConfiguration))
            {
                List<CommonClaim> claims = proxy.GetCommonClaims(null, null, null, null, null, null, null, null,
                    null, null, null, null, false, null, false);

                GridViewCtrl.DataSource = claims;
                GridViewCtrl.DataBind();
            }
        }

        protected void GridViewCtrl_RowEditing(object sender, GridViewEditEventArgs e)
        {

        }

    }
}