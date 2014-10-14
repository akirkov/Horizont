namespace Horizont.Service
{
    using System;
    using System.IdentityModel.Selectors;
    using System.ServiceModel;

    using Horizont.Service.AuthServiceReference;

    class CustumUserNameValidator : UserNamePasswordValidator
    {
        public override void Validate(string userName, string password)
        {
            AuthenticationServiceClient service = new AuthenticationServiceClient("BasicHttpBinding_AuthenticationService");
            using (new OperationContextScope(service.InnerChannel))
            {
                try
                {
                    if (!service.Login(userName, password, String.Empty, false))
                        throw new FaultException("Unknown Username or Incorrect Password");
                }
                catch (Exception)
                {
                    throw new FaultException("Cannot connect to Authentication Service");
                }
            }
        }
    }
}
