namespace Horizont.Console
{
    using System;
    using System.IdentityModel.Selectors;
    using System.ServiceModel;

    using Horizont.Console.AuthServiceReference;

    class CustomUserNameValidator : UserNamePasswordValidator
    {
        public override void Validate(string userName, string password)
        {
            AuthenticationServiceClient service = new AuthenticationServiceClient("BasicHttpBinding_AuthenticationService");
            using (new OperationContextScope(service.InnerChannel))
            {
                try {
                    if (!service.Login(userName, password, String.Empty, true))
                        throw new FaultException("Unknown Username or Incorrect Password");
                }
                catch (Exception) {
                    throw new FaultException("Cannot connect to Authentication Service");
                }
            }
        }
    }
}
