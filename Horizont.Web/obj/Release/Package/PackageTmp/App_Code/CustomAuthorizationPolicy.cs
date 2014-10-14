namespace Horizont.Web
{
    using System;
    using System.IdentityModel.Claims;
    using System.IdentityModel.Policy;
    using System.Security.Principal;
    using System.Web.Security;
    using System.Web;

    class CustomPrincipal : IPrincipal
    {
        IIdentity identity;
        public CustomPrincipal(IIdentity identity)
        {
            this.identity = identity;
        }

        public IIdentity Identity
        {
            get { return this.identity; }
        }

        public bool IsInRole(string role)
        {
            string[] roles = Roles.GetRolesForUser(identity.Name);
            return (Array.IndexOf (roles, role) >= 0);
        }
    }

    class CustomAuthorizationPolicy : IAuthorizationPolicy
    {
        string id = Guid.NewGuid().ToString();

        public string Id
        {
            get { return this.id; }
        }

        public ClaimSet Issuer
        {
            get { return ClaimSet.System; }
        }

        public bool Evaluate(EvaluationContext context, ref object state)
        {
            IIdentity identity = HttpContext.Current.User.Identity;

            context.Properties["Principal"] = new CustomPrincipal(identity);
            return true;
        }
    }
}