namespace Horizont.Web
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System.Web.Security;
    using System.ServiceModel.Security;

    using Horizont.Elv.Service;
    using Horizont.Elv.Library.Entities;

    [ServiceContract(Namespace = "Horizont.Web")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class ElvWebService
    {
        #region Public ElvObjects Count Operations

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public ElvCountObject GetElvCountObject(int region_id, int disp_id)
        {
            try
            {
                 var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    return service.GetElvCountObject((region != null) ? region.LocalId : 0, disp_id);
                }
            }
            catch (Exception)
            {
               return null;
            }
        }

        #endregion

        #region Public ElvObjects Operations

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        TermObject[] GetTerms(bool? isbreak, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<TermObject> objs = service.GetTerms(isbreak, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        LiftObject[] GetLifts(bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<LiftObject> objs = service.GetLifts(isbreak, isrevision, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        HoistObject[] GetHoists(bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<HoistObject> objs = service.GetHoists(isbreak, isrevision, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        DoorObject[] GetDoors(bool? isopen, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<DoorObject> objs = service.GetDoors(isopen, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        FireSensorObject[] GetFireSensors(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<FireSensorObject> objs = service.GetFireSensors(isalarm, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        WaterSensorObject[] GetWaterSensors(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<WaterSensorObject> objs = service.GetWaterSensors(isalarm, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        GasSensorObject[] GetGasSensors(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<GasSensorObject> objs = service.GetGasSensors(isalarm, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        TeleControlObject[] GetTeleControls(bool? isenable, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<TeleControlObject> objs = service.GetTeleControls(isenable, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        ChannelObject[] GetChannels(bool? isbreak, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<ChannelObject> objs = service.GetChannels(isbreak, (region != null) ? region.LocalId : 0, disp_id);
                    if (objs == null)
                        return null;
                    return objs.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Public ElvObjects Events Operations

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        TermObjectEvent[] GetTermEvents(DateTime? ndt, DateTime? edt, int minEventTime, TermObject[] terms, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<TermObjectEvent> events = service.GetTermEvents(ndt, edt, minEventTime, terms, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        LiftObjectEvent[] GetLiftEvents(DateTime? ndt, DateTime? edt, int minEventTime, LiftObject[] lifts, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<LiftObjectEvent> events = service.GetLiftEvents(ndt, edt, minEventTime, lifts, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        HoistObjectEvent[] GetHoistEvents(DateTime? ndt, DateTime? edt, int minEventTime, HoistObject[] hoists, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<HoistObjectEvent> events = service.GetHoistEvents(ndt, edt, minEventTime, hoists, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        DoorObjectEvent[] GetDoorEvents(DateTime? ndt, DateTime? edt, int minEventTime, DoorObject[] doors, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<DoorObjectEvent> events = service.GetDoorEvents(ndt, edt, minEventTime, doors, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        FireSensorObjectEvent[] GetFireSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, FireSensorObject[] firesensors, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<FireSensorObjectEvent> events = service.GetFireSensorEvents(ndt, edt, minEventTime, firesensors, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        WaterSensorObjectEvent[] GetWaterSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, WaterSensorObject[] watersensors, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<WaterSensorObjectEvent> events = service.GetWaterSensorEvents(ndt, edt, minEventTime, watersensors, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        GasSensorObjectEvent[] GetGasSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, GasSensorObject[] gassensors, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<GasSensorObjectEvent> events = service.GetGasSensorEvents(ndt, edt, minEventTime, gassensors, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        ChannelObjectEvent[] GetChannelEvents(DateTime? ndt, DateTime? edt, int minEventTime, ChannelObject[] channels, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IElvService> factory = GetElvFactoryChannel(region.Server))
                {
                    IElvService service = factory.CreateChannel();
                    IEnumerable<ChannelObjectEvent> events = service.GetChannelEvents(ndt, edt, minEventTime, channels, (region != null) ? region.LocalId : 0, disp_id);
                    if (events == null)
                        return null;
                    return events.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Private Operations

        private Horizont.Model.Entities.RegionObject GetRegion(int region_id)
        {
            RegionsWebService service = new RegionsWebService();
            return service.GetRegion(region_id);
        }

        private ChannelFactory<IElvService> GetElvFactoryChannel(Horizont.Model.Entities.ServerObject server)
        {
            WSHttpBinding binding = new WSHttpBinding();
            binding.Security.Mode = SecurityMode.Message;
            binding.Security.Message.ClientCredentialType = MessageCredentialType.UserName;
            binding.MaxReceivedMessageSize = 2147483647;

            EndpointAddress endpoint = new EndpointAddress(new Uri(server.ElvService), EndpointIdentity.CreateDnsIdentity("www.horzt.ru"));

            ChannelFactory<IElvService> factory = new ChannelFactory<IElvService>(binding, endpoint);
            factory.Credentials.UserName.UserName = Membership.GetUser().UserName;
            factory.Credentials.UserName.Password = Membership.GetUser().GetPassword();
            factory.Credentials.ServiceCertificate.Authentication.CertificateValidationMode = X509CertificateValidationMode.PeerOrChainTrust;
            return factory;
        }

        #endregion
    }
}
