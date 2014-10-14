namespace Horizont.Elv.Service
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Security.Permissions;

    using Horizont.Elv.Library.Entities;

    [DataContract]
    public class ServiceFault
    {
        [DataMember]
        public string ExceptionType;

        [DataMember]
        public string ExceptionMessage;
    }

    [ServiceContract(Name = "Elv", Namespace = "http://microsoft.com")]
    public interface IElvService
    {
        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        ElvCountObject GetElvCountObject(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<TermObject> GetTerms(bool? isbreak, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftObject> GetLifts(bool? isbreak, bool? isrevision, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<HoistObject> GetHoists(bool? isbreak, bool? isrevision, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<DoorObject> GetDoors(bool? isopen, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<FireSensorObject> GetFireSensors(bool? isalarm, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<WaterSensorObject> GetWaterSensors(bool? isalarm, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<GasSensorObject> GetGasSensors(bool? isalarm, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<TeleControlObject> GetTeleControls(bool? isenable, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<ChannelObject> GetChannels(bool? isbreak, int region_id, int disp_id);



        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<TermObjectEvent> GetTermEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<TermObject> terms, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftObjectEvent> GetLiftEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<LiftObject> lifts, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<HoistObjectEvent> GetHoistEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<HoistObject> hoists, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<DoorObjectEvent> GetDoorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<DoorObject> doors, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<FireSensorObjectEvent> GetFireSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<FireSensorObject> firesensors, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<WaterSensorObjectEvent> GetWaterSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<WaterSensorObject> watersensors, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<GasSensorObjectEvent> GetGasSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<GasSensorObject> gassensors, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<ChannelObjectEvent> GetChannelEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<ChannelObject> channels, int region_id, int disp_id);
    }
}
