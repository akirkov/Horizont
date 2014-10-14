namespace Horizont.Service
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Data;
    using System.Diagnostics;
    using System.Linq;
    using System.ServiceProcess;
    using System.Text;

    using System.ServiceModel;
    using Horizont.Claims.Service;
    using Horizont.Elv.Service;

    public partial class Service : ServiceBase
    {
        public ServiceHost claimsServiceHost = null;
        public ServiceHost elvServiceHost = null;
        
        public Service()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            if (claimsServiceHost != null)
                claimsServiceHost.Close();
            claimsServiceHost = new ServiceHost(typeof(ClaimsService));
            claimsServiceHost.Open();

            if (elvServiceHost != null)
                elvServiceHost.Close();
            elvServiceHost = new ServiceHost(typeof(ElvService));
            elvServiceHost.Open();
        }

        protected override void OnStop()
        {
            if (claimsServiceHost != null)
            {
                claimsServiceHost.Close();
                claimsServiceHost = null;
            }

            if (elvServiceHost != null)
            {
                elvServiceHost.Close();
                elvServiceHost = null;
            }
        }
    }
}
