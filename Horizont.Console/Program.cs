namespace Horizont.Console
{
    using System;
    using System.ServiceModel;

    using Horizont.Claims.Service;
    using Horizont.Elv.Service;

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                ServiceHost claimsServiceHost = new ServiceHost(typeof(ClaimsService));
                claimsServiceHost.Open();

                ServiceHost elvServiceHost = new ServiceHost(typeof(ElvService));
                elvServiceHost.Open();
            }
            catch (Exception ex)
            {
                Console.Write ("Error!!!\n{0}",ex.Message);
            }
            Console.Read ();
        }
    }
}

