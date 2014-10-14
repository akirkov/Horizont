namespace Horizont.Claims.Service
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Security.Permissions;

    using Horizont.Claims.Library.Entities;

    [DataContract]
    public class ServiceFault
    {
        [DataMember]
        public string ExceptionType;

        [DataMember]
        public string ExceptionMessage;
    }

    [ServiceContract(Name = "Claims", Namespace = "http://microsoft.com")]
    public interface IClaimsService
    {
        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Residents")]
        int InsertCommonClaim(int jrn_id, int address_id, int number, string phone, string owner, string commonfailure, string comment);


        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        bool ChangeCommonClaim(CommonClaimObject c);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        bool ChangeLiftClaim(LiftClaimObject c);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        bool ChangeCessationClaim(CessationClaimObject c);


        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        bool DeleteCommonClaim(int id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        bool DeleteLiftClaim(int id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        bool DeleteCessationClaim(int id);


        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Residents")]
        CommonClaimObject GetCommonClaim(int id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        LiftClaimObject GetLiftClaim(int id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        CessationClaimObject GetCessationClaim(int id);



        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CommonClaimObject> GetUnexecutedClaims(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CommonClaimObject> GetOverdueClaims(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CommonClaimObject> GetLegateUnexecutedClaims(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CommonClaimObject> GetCommonClaims(DateTime? ndt, DateTime? edt, JournalObject journal, AddressObject address, int? doorway, int? flat, string reg_number, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CommonClaimObject> GetBrigadeClaims(DateTime? ndt, DateTime? edt, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CommonClaimObject> GetDamageClaims(DateTime? ndt, DateTime? edt, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Residents")]
        IEnumerable<CommonClaimObject> GetFlatCommonClaims(int address_id, int flat);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftClaimObject> GetLiftClaims(DateTime? ndt, DateTime? edt, AddressObject address, int? doorway, string reg_number, int? minstayminutes, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftClaimObject> GetBreakLiftClaims(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftClaimObject> GetJamLiftClaims(DateTime? ndt, DateTime? edt, AddressObject address, int? doorway, string reg_number, int? minstayminutes, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftClaimObject> GetCurrentJamLiftClaims(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftClaimObject> GetUnlegateExecutedLiftClaims(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CessationClaimObject> GetCessationClaims(DateTime? ndt, DateTime? edt, IEnumerable<AddressObject> addresses, string reg_number, int? cessationobject, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CessationClaimObject> GetCurrentCessationClaims(int region_id, int disp_id);



        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<RepeatFlatObject> GetRepeatFlats(DateTime? ndt, DateTime? edt, JournalObject journal, int minrepeatscount, int region_id, int disp_id);


        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        ClaimsCountObject GetClaimsCountObject(int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<RegionObject> GetRegions();

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<DispObject> GetDisps(int region_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Residents")]
        IEnumerable<JournalObject> GetJournals(string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<AddressObject> GetAddresses(string str, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Residents")]
        IEnumerable<CommonFailureObject> GetCommonFailures(JournalObject journal, string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<LiftFailureObject> GetLiftFailures(string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<OrganizationObject> GetOrganizations(string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<TypeWorkObject> GetTypeWorks(JournalObject journal, string failure, string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<ExecutorObject> GetExecutors(JournalObject journal, string str, int region_id, int disp_id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CessationReasonObject> GetCessationReasons(string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CessationBasisObject> GetCessationBasises(string str);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        IEnumerable<CessationApplicantObject> GetCessationApplicants(string str);



        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        DispObject GetDisp(int region_id, int id);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        FlatObject GetFlat(AddressObject address, int number);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        LiftFailureObject GetLiftFailure(string liftfailure);

        [OperationContract]
        [FaultContract(typeof(ServiceFault))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Customers")]
        int? GetExecutedPeriod(JournalObject journal, string commonfailure);
    }
}
