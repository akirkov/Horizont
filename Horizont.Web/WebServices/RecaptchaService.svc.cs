namespace Horizont.Web
{
    using System;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System.Configuration;
    using System.Web;

    [ServiceContract(Namespace = "Horizont.Web")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class RecaptchaService
    {
        // Чтобы использовать протокол HTTP GET, добавьте атрибут [WebGet]. (По умолчанию ResponseFormat имеет значение WebMessageFormat.Json.)
        // Чтобы создать операцию, возвращающую XML,
        //     добавьте [WebGet(ResponseFormat=WebMessageFormat.Xml)]
        //     и включите следующую строку в текст операции:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebGet(RequestFormat = WebMessageFormat.Json)]
        public bool Validate(string challenge, string response)
        {

            if ((HttpContext.Current.Cache[challenge] != null) && (((string)HttpContext.Current.Cache[challenge]) == response))
                return true;

            RecaptchaValidation validator = new RecaptchaValidation(
                            "horzt.ru",
                            ConfigurationManager.AppSettings["recaptchaPrivateKey"],
                            challenge,
                            response);
  
            if (validator.Validate()) {
                HttpContext.Current.Cache.Insert (challenge, response, null, DateTime.Now.AddSeconds(5), TimeSpan.Zero);
                return true;
            }

            return false;
        }
    }
}
