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
    using System.Web.Profile;
    using System.Web;

    using Horizont.Claims.Service;
    using Horizont.Claims.Library.Entities;

    [ServiceContract(Namespace = "Horizont.Web")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class ClaimsWebService
    {
        #region Public Claim Operations

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        public int InsertCommonClaim(int jrn_id, int address_id, int flat, string phone, string owner, string commonfailure, string comment)
        {
            try
            {
                var address = GetAddress(address_id);
                if (address == null)
                    return 0;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(address.Region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.InsertCommonClaim(jrn_id, address.LocalId, flat, phone, owner, commonfailure, comment);
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        public bool ChangeCommonClaim(CommonClaimObject claim, int region_id)
        {
            if ((claim == null) || !claim.Validate())
                return false;

            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return false;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.ChangeCommonClaim(claim);
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        public bool ChangeLiftClaim(LiftClaimObject claim, int region_id)
        {
            if ((claim == null) || !claim.Validate())
                return false;

            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return false;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.ChangeLiftClaim(claim);
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        public bool ChangeCessationClaim(CessationClaimObject claim, int region_id)
        {
            if ((claim == null) || !claim.Validate())
                return false;

            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return false;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.ChangeCessationClaim(claim);
                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool DeleteCommonClaim(int id, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return false;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.DeleteCommonClaim(id);
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool DeleteLiftClaim(int id, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return false;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.DeleteLiftClaim(id);
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public bool DeleteCessationClaim(int id, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return false;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.DeleteCessationClaim(id);
                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject GetCommonClaim(int id, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetCommonClaim(id);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftClaimObject GetLiftClaim(int id, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetLiftClaim(id);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CessationClaimObject GetCessationClaim(int id, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetCessationClaim(id);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Public Claims Operations

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetUnexecutedClaims(int region_id, int disp_id)
        {
            
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetUnexecutedClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetOverdueClaims(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetOverdueClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetLegateUnexecutedClaims(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetLegateUnexecutedClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetCommonClaims(DateTime? ndt, DateTime? edt, JournalObject journal, AddressObject address, int? doorway, int? flat, string reg_number, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetCommonClaims(ndt, edt, journal, address, doorway, flat, reg_number, (region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetBrigadeClaims(DateTime? ndt, DateTime? edt, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetBrigadeClaims(ndt, edt, (region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetDamageClaims(DateTime? ndt, DateTime? edt, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetDamageClaims(ndt, edt, (region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CommonClaimObject[] GetResidentClaims()
        {
            try
            {
                if (!HttpContext.Current.User.Identity.IsAuthenticated || !Roles.IsUserInRole("Residents"))
                    return null;

                dynamic profile = ProfileBase.Create(Membership.GetUser().UserName);
                if (profile.AddressId <= 0)
                    return null;

                var address = GetAddress(profile.AddressId);
                if (address == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(address.Region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonClaimObject> claims = service.GetFlatCommonClaims(address.LocalId, profile.Flat);
                    if (claims == null)
                        return null;
                    return claims.Reverse().ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        
        
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftClaimObject[] GetLiftClaims(DateTime? ndt, DateTime? edt, AddressObject address, int? doorway, string reg_number, int? minstayminutes, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<LiftClaimObject> claims = service.GetLiftClaims(ndt, edt, address, doorway, reg_number, minstayminutes, (region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftClaimObject[] GetBreakLiftClaims(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<LiftClaimObject> claims = service.GetBreakLiftClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftClaimObject[] GetJamLiftClaims(DateTime? ndt, DateTime? edt, AddressObject address, int? doorway, string reg_number, int? minstayminutes, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<LiftClaimObject> claims = service.GetJamLiftClaims(ndt, edt, address, doorway, reg_number, minstayminutes, (region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftClaimObject[] GetCurrentJamLiftClaims(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<LiftClaimObject> claims = service.GetCurrentJamLiftClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftClaimObject[] GetUnlegateExecutedLiftClaims(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<LiftClaimObject> claims = service.GetUnlegateExecutedLiftClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CessationClaimObject[] GetCessationClaims(DateTime? ndt, DateTime? edt, AddressObject[] addresses, string reg_number, int? cessationobject, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CessationClaimObject> claims = service.GetCessationClaims(ndt, edt, addresses, reg_number, cessationobject, (region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CessationClaimObject[] GetCurrentCessationClaims(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CessationClaimObject> claims = service.GetCurrentCessationClaims((region != null) ? region.LocalId : 0, disp_id);
                    if (claims == null)
                        return null;
                    return claims.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public RepeatFlatObject[] GetRepeatFlats(DateTime? ndt, DateTime? edt, JournalObject journal, int minrepeatscount, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<RepeatFlatObject> objs = service.GetRepeatFlats(ndt, edt, journal, minrepeatscount, (region != null) ? region.LocalId : 0, disp_id);
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

        #region Public Count Operations

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public ClaimsCountObject GetClaimsCountObject(int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetClaimsCountObject((region != null) ? region.LocalId : 0, disp_id);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Public Additional Operations

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DispObject GetDisp(int region_id, int id)
        {
            if ((region_id == 0) || (id == 0))
                return null;

            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetDisp(region.LocalId, id);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public RegionObject[] GetRegions(int server_id)
        {
            try
            {
                var server = GetServer(server_id);
                if (server == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<RegionObject> objs = service.GetRegions();
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
        public DispObject[] GetDisps(int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<DispObject> objs = service.GetDisps((region != null) ? region.LocalId : 0);
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
        public JournalObject[] GetJournals(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<JournalObject> objs = service.GetJournals(str);
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
        public AddressObject[] GetAddresses(string str, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<AddressObject> objs = service.GetAddresses(str, (region != null) ? region.LocalId : 0, disp_id);
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
        public CommonFailureObject[] GetCommonFailures(JournalObject journal, string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CommonFailureObject> objs = service.GetCommonFailures(journal, str);
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
        public LiftFailureObject[] GetLiftFailures(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<LiftFailureObject> objs = service.GetLiftFailures(str);
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
        public int? GetExecutedPeriod(JournalObject journal, string commonfailure, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetExecutedPeriod(journal, commonfailure);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public LiftFailureObject GetLiftFailure(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetLiftFailure(str);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public OrganizationObject[] GetOrganizations(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<OrganizationObject> objs = service.GetOrganizations(str);
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
        public TypeWorkObject[] GetTypeWorks(JournalObject journal, string failure, string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<TypeWorkObject> objs = service.GetTypeWorks(journal, failure, str);
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
        public ExecutorObject[] GetExecutors(JournalObject journal, string str, int region_id, int disp_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<ExecutorObject> objs = service.GetExecutors(journal, str, (region != null) ? region.LocalId : 0, disp_id);
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
        public FlatObject GetFlat(AddressObject address, int number, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    return service.GetFlat(address, number);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CessationReasonObject[] GetCessationReasons(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CessationReasonObject> objs = service.GetCessationReasons(str);
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
        public CessationBasisObject[] GetCessationBasises(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CessationBasisObject> objs = service.GetCessationBasises(str);
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
        public CessationApplicantObject[] GetCessationApplicants(string str, int region_id)
        {
            try
            {
                var region = GetRegion(region_id);
                if (region == null)
                    return null;

                using (ChannelFactory<IClaimsService> factory = GetClaimsFactoryChannel(region.Server))
                {
                    IClaimsService service = factory.CreateChannel();
                    IEnumerable<CessationApplicantObject> objs = service.GetCessationApplicants(str);
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

        #region Private Operations

        private Horizont.Model.Entities.ServerObject GetServer(int server_id)
        {
            RegionsWebService service = new RegionsWebService();
            return service.GetServer(server_id);
        }
        private Horizont.Model.Entities.RegionObject GetRegion(int region_id)
        {
            RegionsWebService service = new RegionsWebService();
            return service.GetRegion(region_id);
        }
        private Horizont.Model.Entities.AddressObject GetAddress(int address_id)
        {
            RegionsWebService service = new RegionsWebService();
            return service.GetAddress(address_id);
        }
        private ChannelFactory<IClaimsService> GetClaimsFactoryChannel(Horizont.Model.Entities.ServerObject server)
        {
            WSHttpBinding binding = new WSHttpBinding();
            binding.Security.Mode = SecurityMode.Message;
            binding.Security.Message.ClientCredentialType = MessageCredentialType.UserName;
            binding.MaxReceivedMessageSize = 2147483647;

            EndpointAddress endpoint = new EndpointAddress(new Uri(server.ClaimsService), EndpointIdentity.CreateDnsIdentity("www.horzt.ru"));

            ChannelFactory<IClaimsService> factory = new ChannelFactory<IClaimsService>(binding, endpoint);
            factory.Credentials.UserName.UserName = Membership.GetUser().UserName;
            factory.Credentials.UserName.Password = Membership.GetUser().GetPassword();
            factory.Credentials.ServiceCertificate.Authentication.CertificateValidationMode = X509CertificateValidationMode.PeerOrChainTrust;
            return factory;
        }

        #endregion
    }
}
