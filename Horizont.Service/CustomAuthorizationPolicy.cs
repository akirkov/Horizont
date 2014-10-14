namespace Horizont.Service
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Claims;
    using System.IdentityModel.Policy;
    using System.Security.Principal;
    using System.ServiceModel;

    using Horizont.Service.UsersServiceReference;

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
            UsersServiceClient service = new UsersServiceClient("BasicHttpBinding_UsersService");
            using (new OperationContextScope(service.InnerChannel))
            {
                try
                {
                    return service.IsUserInRole(Identity.Name, role);
                }
                catch (Exception)
                {
                    throw new FaultException("Cannot connect to Authentication Service");
                }
            }
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
            object obj;
            if (!context.Properties.TryGetValue("Identities", out obj))
                return false;

            IList<IIdentity> identities = obj as IList<IIdentity>;
            if (obj == null || identities.Count <= 0)
                return false;

            context.Properties["Principal"] = new CustomPrincipal(identities[0]);
            return true;
        }
    }
}