namespace Horizont.Claims.Service
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.Objects;
    using System.Diagnostics;
    using System.Linq;
    using System.ServiceModel;
    using System.Threading;
    using System.Text;

    using Horizont.Claims.Model;
    using Horizont.Elv.Model;
    using Horizont.Claims.Library.Entities;
    using Horizont.Claims.Service.UsersServiceReference;

    using RegionObject = Horizont.Claims.Library.Entities.RegionObject;
    using DispObject = Horizont.Claims.Library.Entities.DispObject;
    using AddressObject = Horizont.Claims.Library.Entities.AddressObject;

    [ServiceBehavior(
        Name = "Claims", 
        Namespace = "http://microsoft.com", 
        InstanceContextMode = InstanceContextMode.PerCall, 
        ConcurrencyMode=ConcurrencyMode.Multiple)]
    public class ClaimsService : IClaimsService
    {
        #region Public Claim Operations

        public int InsertCommonClaim(int jrn_id, int address_id, int number, string phone, string owner, string commonfailure, string comment)
        {
            try
            {
                if (!CanUserFlatEdit(address_id, number))
                    throw new FaultException("Access denied");

                JournalObject journal = GetJournalEx (jrn_id);
                AddressObject address = GetAddressEx(address_id);
                FlatObject flat = GetFlatEx(address, number);
                int? period = GetExecutedPeriodEx(journal, commonfailure);

                CommonClaimObject claim = new CommonClaimObject();
                claim.Disp = GetAddressDisp(address_id, jrn_id);
                claim.Journal = journal;
                claim.Address = address;
                claim.Flat = number;
                claim.Doorway = (flat != null) ? flat.Doorway : null;
                claim.Floor = (flat != null) ? flat.Floor : null;
                claim.Phone = phone;
                claim.Code = (flat != null) ? flat.Code : null;
                claim.Owner = owner;
                claim.CommonFailureStr = commonfailure;
                claim.ExecutedPeriod = (period != null) ? period : 1;
                claim.CommonFailureComment = comment;
                claim.ReceivedOperator = "";
                claim.ReceivedTime = GetCurrentTime ();
                claim.OrgName = "";
                claim.IsTeam = 0;
                claim.IsSubmission = false;
                claim.SubmissionOperator = "";
                claim.SubmissionTime = GetCurrentTime ();
                claim.IsLegate = false;
                claim.Result = 0;
                claim.Typework = "";
                claim.Executor = "";
                claim.IsCheck = false;
                claim.ExecutedOperator = "";
                claim.ExecutedTime = GetCurrentTime ();
                claim.RegNumber = GetCommonClaimRegnumber(jrn_id, claim.Disp.Region.Id, claim.Disp.Id);
                claim.SentTime = claim.DeliveredTime = GetCurrentTime();
                claim.DeliveredOperator = "";
                claim.Status = 0;

                return InsertCommonClaim(claim);

            }
            catch (Exception ex)
            {
                this.handleException(ex, "InsertCommonClaim");
                return 0;
            }
        }

        public bool ChangeCommonClaim(CommonClaimObject c)
        {
            if ((c == null) || !c.Validate())
                return false;

            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    CommonClaim claim = (from x in context.CommonClaims.Include("Address").Include("Journal").Include("Disp").Include("Disp.Region")
                                        where x.Id == c.Id
                                        select x).FirstOrDefault ();

                    if (!CanUserServerEdit(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");
                    if (claim.DispId != c.Disp.Id)
                        throw new FaultException("Cannot change claim disp");

                    EntityKey key = context.CreateEntityKey("CommonClaims", claim);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                    {
                        c.CopyTo(ref claim);
                        claim.RecordInfo.ChangeTime = GetCurrentTime ();
                        claim.RecordInfo.ChangeOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                        claim.RecordInfo.RecordTime = GetCurrentTime ();
                        context.ApplyCurrentValues(key.EntitySetName, claim);
                    }

                    UpdateTableChanges(context, "Claims");
                    UpdateClaimsChangeId(context);

                    AddCommonClaimToHistory(context, c, 2);

                    context.SaveChanges();
                    
                    return true;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "ChangeCommonClaim", c.Id);
                return false;
            }
        }
        public bool ChangeLiftClaim(LiftClaimObject c)
        {
            if ((c == null) || !c.Validate())
                return false;

            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    LiftClaim claim = (from x in context.LiftClaims.Include("Address").Include("Disp").Include("Disp.Region")
                                         where x.Id == c.Id
                                         select x).FirstOrDefault();

                    if (!CanUserServerEdit(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");
                    if (claim.DispId != c.Disp.Id)
                        throw new FaultException("Cannot change claim disp");

                    EntityKey key = context.CreateEntityKey("LiftClaims", claim);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                    {
                        c.CopyTo(ref claim);
                        claim.RecordInfo.ChangeTime = GetCurrentTime ();
                        claim.RecordInfo.ChangeOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                        claim.RecordInfo.RecordTime = GetCurrentTime ();
                        context.ApplyCurrentValues(key.EntitySetName, claim);
                    }

                    UpdateTableChanges(context, "LiftClaims");
                    UpdateClaimsChangeId(context);

                    AddLiftClaimToHistory(context, c, 2);

                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "ChangeLiftClaim", c.Id);
                return false;
            }
        }
        public bool ChangeCessationClaim(CessationClaimObject c)
        {
            if ((c == null) || !c.Validate())
                return false;

            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    CessationClaim claim = (from x in context.CessationClaims.Include("Disp").Include("Addresses").Include("Disp.Region")
                                       where x.Id == c.Id
                                       select x).FirstOrDefault();

                    if (!CanUserServerEdit(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");
                    if (claim.DispId != c.Disp.Id)
                        throw new FaultException("Cannot change claim disp");

                    EntityKey key = context.CreateEntityKey("CessationClaims", claim);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                    {
                        c.CopyTo(ref claim, context.Addresses.ToList());
                        claim.RecordInfo.ChangeTime = GetCurrentTime ();
                        claim.RecordInfo.ChangeOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                        claim.RecordInfo.RecordTime = GetCurrentTime ();
                        context.ApplyCurrentValues(key.EntitySetName, claim);
                    }

                    UpdateTableChanges(context, "CessationClaims");
                    UpdateClaimsChangeId(context);

                    AddCessationClaimToHistory(context, c, 2);

                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "ChangeCessationClaim", c.Id);
                return false;
            }
        }

        public bool DeleteCommonClaim(int id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    CommonClaim claim = (from x in context.CommonClaims.Include("Journal").Include("Address").Include("Disp").Include("Disp.Region")
                                        where x.Id == id
                                        select x).FirstOrDefault ();

                    if (!CanUserServerEdit(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");

                    EntityKey key = context.CreateEntityKey("ClaimsEntities.CommonClaims", claim);

                    object ob = null;
                    if (context.TryGetObjectByKey(key, out ob))
                    {
                        claim.RecordInfo.IsDeleted = true;
                        claim.RecordInfo.DeleteTime = GetCurrentTime ();
                        claim.RecordInfo.DeleteOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                        claim.RecordInfo.RecordTime = GetCurrentTime ();
                        context.ApplyCurrentValues(key.EntitySetName, claim);
                    }
                    
                    UpdateTableChanges(context, "Claims");
                    UpdateClaimsChangeId(context);

                    AddCommonClaimToHistory(context, new CommonClaimObject (claim), 3);

                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "DeleteCommonClaim", id);
                return false;
            }
        }
        public bool DeleteLiftClaim(int id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    LiftClaim claim = (from x in context.LiftClaims.Include("Address").Include("Disp").Include("Disp.Region")
                                         where x.Id == id
                                         select x).FirstOrDefault();

                    if (!CanUserServerEdit(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");

                    EntityKey key = context.CreateEntityKey("LiftClaims", claim);

                    object ob;
                    if (context.TryGetObjectByKey(key, out ob))
                    {
                        claim.RecordInfo.IsDeleted = true;
                        claim.RecordInfo.DeleteTime = GetCurrentTime ();
                        claim.RecordInfo.DeleteOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                        claim.RecordInfo.RecordTime = GetCurrentTime ();
                        context.ApplyCurrentValues(key.EntitySetName, claim);
                    }

                    UpdateTableChanges(context, "LiftClaims");
                    UpdateClaimsChangeId(context);

                    AddLiftClaimToHistory(context, new LiftClaimObject(claim), 3);

                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "DeleteLiftClaim", id);
                return false;
            }
        }
        public bool DeleteCessationClaim(int id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    CessationClaim claim = (from x in context.CessationClaims.Include("Disp").Include("Disp.Region")
                                         where x.Id == id
                                         select x).FirstOrDefault();

                    if (!CanUserServerEdit(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");

                    EntityKey key = context.CreateEntityKey("CessationClaims", claim);

                    object ob;
                    if (context.TryGetObjectByKey(key, out ob))
                    {
                        claim.RecordInfo.IsDeleted = true;
                        claim.RecordInfo.DeleteTime = GetCurrentTime ();
                        claim.RecordInfo.DeleteOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                        claim.RecordInfo.RecordTime = GetCurrentTime ();
                        context.ApplyCurrentValues(key.EntitySetName, claim);
                    }

                    UpdateTableChanges(context, "CessationClaims");
                    UpdateClaimsChangeId(context);

                    AddCessationClaimToHistory(context, new CessationClaimObject(claim), 3);

                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "DeleteCessationClaim", id);
                return false;
            }
        }

        public CommonClaimObject GetCommonClaim(int id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    string queryString = @"SELECT VALUE c from ClaimsEntities.CommonClaims as c WHERE c.Id=@Id";
                    ObjectQuery<CommonClaim> query = new ObjectQuery<CommonClaim>(queryString, context)
                        .Include("Address").Include("Journal").Include("Disp").Include("Disp.Region");
                    query.Parameters.Add(new ObjectParameter("Id", id));
                    query.MergeOption = MergeOption.NoTracking;

                    CommonClaim claim = query.FirstOrDefault();
                    if (claim == null)
                        return null;
                   
                    if (!CanUserServerRead(claim.Disp.Region.Id, claim.Disp.Id) && ((claim.Address == null) || (claim.Flat == null) || !CanUserFlatRead(claim.Address.Id, (int)claim.Flat)))
                        throw new FaultException("Access denied");

                    return new CommonClaimObject (claim);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCommonClaim", id);
                return null;
            }
        }
        public LiftClaimObject GetLiftClaim(int id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    string queryString = @"SELECT VALUE c from ClaimsEntities.LiftClaims as c WHERE c.Id=@Id";
                    ObjectQuery<LiftClaim> query = new ObjectQuery<LiftClaim>(queryString, context)
                        .Include("Address").Include("Disp").Include("Disp.Region");
                    query.Parameters.Add(new ObjectParameter("Id", id));
                    query.MergeOption = MergeOption.NoTracking;

                    LiftClaim claim = query.FirstOrDefault();
                    if (claim == null)
                        return null;

                    if (!CanUserServerRead(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");

                    return new LiftClaimObject(claim);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftClaim", id);
                return null;
            }
        }
        public CessationClaimObject GetCessationClaim(int id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    string queryString = @"SELECT VALUE c from ClaimsEntities.CessationClaims as c WHERE c.Id=@Id";
                    ObjectQuery<CessationClaim> query = new ObjectQuery<CessationClaim>(queryString, context)
                        .Include("Addresses").Include("Disp").Include("Disp.Region");
                    query.Parameters.Add(new ObjectParameter("Id", id));
                    query.MergeOption = MergeOption.NoTracking;

                    CessationClaim claim = query.FirstOrDefault();
                    if (claim == null)
                        return null;

                    if (!CanUserServerRead(claim.Disp.Region.Id, claim.Disp.Id))
                        throw new FaultException("Access denied");

                    return new CessationClaimObject(claim);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationClaim", id);
                return null;
            }
        }

        #endregion

        #region Public Claims Operations

        public IEnumerable<CommonClaimObject> GetUnexecutedClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCommonClaims(null, null, null, null, null, null, null, null, null, null, null,
                    null, false, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetUnexecutedClaims");
                return null;
            }
        }
        public IEnumerable<CommonClaimObject> GetOverdueClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCommonClaims(null, null, null, null, null, null, null, null, null, null, true,
                    null, false, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetOverdueClaims");
                return null;
            }
        }
        public IEnumerable<CommonClaimObject> GetLegateUnexecutedClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCommonClaims(null, null, null, null, null, null, null, null, null, null, null,
                    null, true, 1, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLegateUnexecutedClaims");
                return null;
            }
        }
        public IEnumerable<CommonClaimObject> GetCommonClaims(DateTime? ndt, DateTime? edt, JournalObject journal, AddressObject address, int? doorway, int? flat, string reg_number, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCommonClaims(ndt, edt, journal, null, reg_number, address, doorway, flat, null, null,
                    null, null, null, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCommonClaims");
                return null;
            }
        }
        public IEnumerable<CommonClaimObject> GetBrigadeClaims(DateTime? ndt, DateTime? edt, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCommonClaims(ndt, edt, null, null, null, null, null, null, 1, 3, null,
                    null, null, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetBrigadeClaims");
                return null;
            }
        }
        public IEnumerable<CommonClaimObject> GetDamageClaims(DateTime? ndt, DateTime? edt, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCommonClaims(ndt, edt, null, null, null, null, null, null, 2, null, null,
                    null, null, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetDamageClaims");
                return null;
            }
        }
        public IEnumerable<CommonClaimObject> GetFlatCommonClaims(int address_id, int flat)
        {
            try
            {
                if (!CanUserFlatRead(address_id, flat))
                    throw new FaultException("Access denied");

                return GetCommonClaims(null, null, null, null, null, GetAddressEx(address_id), null, flat, null, null,
                    null, null, null, null, false, 0, 0);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetFlatCommonClaims");
                return null;
            }
        }
        public IEnumerable<LiftClaimObject> GetLiftClaims(DateTime? ndt, DateTime? edt, AddressObject address, int? doorway, string reg_number, int? minstayminutes, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetLiftClaims(ndt, edt, null, reg_number, address, doorway, minstayminutes, null, null, null, null, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftClaims");
                return null;
            }
        }
        public IEnumerable<LiftClaimObject> GetBreakLiftClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetLiftClaims(null, null, null, null, null, null, null, null, null, null, false, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetBreakLiftClaims");
                return null;
            }
        }
        public IEnumerable<LiftClaimObject> GetJamLiftClaims(DateTime? ndt, DateTime? edt, AddressObject address, int? doorway, string reg_number, int? minstayminutes, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetLiftClaims(ndt, edt, null, reg_number, address, doorway, minstayminutes, true, null, null, null, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetJamLiftClaims");
                return null;
            }
        }
        public IEnumerable<LiftClaimObject> GetCurrentJamLiftClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetLiftClaims(null, null, null, null, null, null, null, true, null, null, false, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCurrentJamLiftClaims");
                return null;
            }
        }
        public IEnumerable<LiftClaimObject> GetUnlegateExecutedLiftClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetLiftClaims(null, null, null, null, null, null, null, null, null, null, true, 2, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetUnlegateExecutedLiftClaims");
                return null;
            }
        }
        public IEnumerable<CessationClaimObject> GetCessationClaims(DateTime? ndt, DateTime? edt, IEnumerable<AddressObject> addresses, string reg_number, int? cessationobject, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCessationClaims(addresses, ndt, edt, null, reg_number, cessationobject, null, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationClaims");
                return null;
            }
        }
        public IEnumerable<CessationClaimObject> GetCurrentCessationClaims(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                return GetCessationClaims(null, null, null, null, null, null, false, false, region_id, disp_id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationClaims");
                return null;
            }
        }

        public IEnumerable<RepeatFlatObject> GetRepeatFlats(DateTime? ndt, DateTime? edt, JournalObject journal, int minrepeatscount, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                List<RepeatFlatObject> flats = new List<RepeatFlatObject>();

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    context.ContextOptions.LazyLoadingEnabled = true;

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE f FROM ClaimsEntities.Flats AS f INNER JOIN ClaimsEntities.CommonClaims AS c ON ((f.AddressId = c.AddressId) && (f.Number = c.Flat))");
                    queryString.Append(GetRepeatFlatsQueryString(ref parameters, ndt, edt, journal, minrepeatscount, region_id, disp_id));

                    ObjectQuery<Flat> query = new ObjectQuery<Flat>(queryString.ToString(), context).Include("Address");

                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    foreach (Flat flat in query.ToList())
                    {
                        RepeatFlatObject f = new RepeatFlatObject();
                        f.CopyFrom(flat);
                        f.Journal = journal;

                        flats.Add(f);
                    }
                }

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    context.ContextOptions.LazyLoadingEnabled = true;

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c.Journal FROM ClaimsEntities.Flats AS f INNER JOIN ClaimsEntities.CommonClaims AS c ON ((f.AddressId = c.AddressId) && (f.Number = c.Flat))");
                    queryString.Append(GetRepeatFlatsQueryString(ref parameters, ndt, edt, journal, minrepeatscount, region_id, disp_id));

                    ObjectQuery<Journal> query = new ObjectQuery<Journal>(queryString.ToString(), context);

                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<Journal> journals = query.ToList();
                    for (int i = 0; i < flats.Count(); i++)
                    {
                        RepeatFlatObject f = flats[i];
                        f.Journal = new JournalObject();
                        f.Journal.CopyFrom(journals[i]);
                        f.RepeatsCount = GetCommonClaimsCount(ndt, edt, f.Journal, f.Address, f.Number, null, region_id, disp_id);
                    }
                }

                return flats;
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetRepeatFlats");
                return null;
            }
        }
        public ClaimsCountObject GetClaimsCountObject(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                ClaimsCountObject obj = new ClaimsCountObject();
                obj.UnexecutedClaimsCount = GetUnexecutedClaimsCount(region_id, disp_id);
                obj.OverdueClaimsCount = GetOverdueClaimsCount(region_id, disp_id);
                obj.LegateUnexecutedClaimsCount = GetLegateUnexecutedClaimsCount(region_id, disp_id);
                obj.BreakLiftClaimsCount = GetBreakLiftClaimsCount(region_id, disp_id);
                obj.CurrentJamLiftClaimsCount = GetCurrentJamLiftClaimsCount(region_id, disp_id);
                obj.UnlegateExecutedLiftClaimsCount = GetUnlegateExecutedLiftClaimsCount(region_id, disp_id);
                obj.CurrentCessationClaimsCount = GetCurrentCessationClaimsCount(region_id, disp_id);

                return obj;
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetClaimsCountObject");
                return null;
            }
        }

        #endregion

        #region Public Addtional Operations

        public IEnumerable<RegionObject> GetRegions()
        {
            try
            {
                if (!IsUserInRole("Administrators") && !CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.Regions as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<Region> query = new ObjectQuery<Region>(queryString.ToString(), context);
                    query.MergeOption = MergeOption.NoTracking;

                    var objs = new List<RegionObject>();
                    foreach (Region obj in query.ToList())
                        objs.Add(new RegionObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetRegions");
                return null;
            }
        }
        public IEnumerable<DispObject> GetDisps(int region_id)
        {
            try
            {
                if (!IsUserInRole("Administrators") && !CanUserServerRead(region_id))
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.Disps as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    if (region_id > 0)
                        queryString.Append(" AND c.Region.Id=@region_id");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<Disp> query = new ObjectQuery<Disp>(queryString.ToString(), context);
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    query.MergeOption = MergeOption.NoTracking;

                    var objs = new List<DispObject>();
                    foreach (Disp obj in query.ToList())
                        objs.Add(new DispObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetDisps");
                return null;
            }
        }
        public IEnumerable<JournalObject> GetJournals(string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.Journals as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.Name LIKE @str + '%'");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<Journal> query = new ObjectQuery<Journal>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;

                    List<JournalObject> objs = new List<JournalObject>();
                    foreach (Journal obj in query.ToList())
                        objs.Add(new JournalObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetJournals");
                return null;
            }
        }
        public IEnumerable<AddressObject> GetAddresses(string str, int region_id, int disp_id)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead(region_id))
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.Addresses as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.AddressStr LIKE @str + '%'");
                    if (region_id > 0)
                        queryString.Append(" AND c.Region.Id=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND (EXISTS(SELECT d FROM c.Disps AS d WHERE d.Id=@disp_id))");
                    queryString.Append(" ORDER BY c.AddressStr");

                    ObjectQuery<Address> query = new ObjectQuery<Address>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    var objs = new List<AddressObject>();
                    foreach (Address obj in query.ToList())
                        objs.Add(new AddressObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetAddresses");
                return null;
            }
        }
        public IEnumerable<CommonFailureObject> GetCommonFailures(JournalObject journal, string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CommonFailures as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    if (journal != null)
                        queryString.Append(" AND c.Journal.Id = @jrn_id");
                    queryString.Append(" AND c.Name LIKE @str + '%'");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<CommonFailure> query = new ObjectQuery<CommonFailure>(queryString.ToString(), context);
                    if (journal != null)
                        query.Parameters.Add(new ObjectParameter("jrn_id", journal.Id));
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;

                    List<CommonFailureObject> objs = new List<CommonFailureObject>();
                    foreach (CommonFailure obj in query.ToList())
                        objs.Add(new CommonFailureObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCommonFailures");
                return null;
            }
        }
        public IEnumerable<LiftFailureObject> GetLiftFailures(string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.LiftFailures as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.Name LIKE @str + '%'");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<LiftFailure> query = new ObjectQuery<LiftFailure>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;

                    List<LiftFailureObject> objs = new List<LiftFailureObject>();
                    foreach (LiftFailure obj in query.ToList())
                        objs.Add(new LiftFailureObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftFailures");
                return null;
            }
        }
        public IEnumerable<OrganizationObject> GetOrganizations(string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.Organizations as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.Name LIKE @str + '%'");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<Organization> query = new ObjectQuery<Organization>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;

                    List<OrganizationObject> objs = new List<OrganizationObject>();
                    foreach (Organization obj in query.ToList())
                        objs.Add(new OrganizationObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetOrganizations");
                return null;
            }
        }
        public IEnumerable<TypeWorkObject> GetTypeWorks(JournalObject journal, string failure, string str)
        {
            if (failure == null) failure = "";
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    List<TypeWorkObject> objs = new List<TypeWorkObject>();

                    int jrn_id = 0;
                    if (journal != null)
                        jrn_id = journal.Id;

                    int flr_id = -1;
                    if (jrn_id > 0)
                    {
                        CommonFailureObject commonfailure = GetCommonFailures(journal, failure).First();
                        if (commonfailure != null)
                            flr_id = commonfailure.Id;
                    }
                    else
                    {
                        LiftFailureObject liftfailure = GetLiftFailures(failure).First();
                        if (liftfailure != null)
                            flr_id = liftfailure.Id;
                    }
                    if (flr_id < 0)
                        return objs;

                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.TypeWorks as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.JournalId = @jrn_id");
                    queryString.Append(" AND c.FailureId = @flr_id");
                    queryString.Append(" AND c.Name LIKE @str + '%'");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<TypeWork> query = new ObjectQuery<TypeWork>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("jrn_id", jrn_id));
                    query.Parameters.Add(new ObjectParameter("flr_id", flr_id));
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;

                    foreach (TypeWork obj in query.ToList())
                        objs.Add(new TypeWorkObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetTypeWorks");
                return null;
            }
        }
        public IEnumerable<ExecutorObject> GetExecutors(JournalObject journal, string str, int region_id, int disp_id)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    int jrn_id = 0;
                    if (journal != null)
                        jrn_id = journal.Id;

                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.Executors as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.JournalId = @jrn_id");
                    if (region_id > 0)
                        queryString.Append(" AND c.Disp.Region.Id = @region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND c.Disp.Id = @disp_id");
                    queryString.Append(" AND c.Name LIKE @str + '%'");
                    queryString.Append(" ORDER BY c.Name");

                    ObjectQuery<Executor> query = new ObjectQuery<Executor>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("jrn_id", jrn_id));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;

                    List<ExecutorObject> objs = new List<ExecutorObject>();
                    foreach (Executor obj in query.ToList())
                        objs.Add(new ExecutorObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetExecutors");
                return null;
            }
        }
        public IEnumerable<CessationReasonObject> GetCessationReasons(string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CessationReasons as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.Name LIKE @str + '%'");

                    ObjectQuery<CessationReason> query = new ObjectQuery<CessationReason>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;
                    queryString.Append(" ORDER BY c.Name");

                    List<CessationReasonObject> objs = new List<CessationReasonObject>();
                    foreach (CessationReason obj in query.ToList())
                        objs.Add(new CessationReasonObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationReasons");
                return null;
            }
        }
        public IEnumerable<CessationBasisObject> GetCessationBasises(string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CessationBasises as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.Name LIKE @str + '%'");

                    ObjectQuery<CessationBasis> query = new ObjectQuery<CessationBasis>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;
                    queryString.Append(" ORDER BY c.Name");

                    List<CessationBasisObject> objs = new List<CessationBasisObject>();
                    foreach (CessationBasis obj in query.ToList())
                        objs.Add(new CessationBasisObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationBasises");
                return null;
            }
        }
        public IEnumerable<CessationApplicantObject> GetCessationApplicants(string str)
        {
            if (str == null) str = "";

            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");

                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CessationApplicants as c");
                    queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                    queryString.Append(" AND c.Name LIKE @str + '%'");

                    ObjectQuery<CessationApplicant> query = new ObjectQuery<CessationApplicant>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("str", str));
                    query.MergeOption = MergeOption.NoTracking;
                    queryString.Append(" ORDER BY c.Name");

                    List<CessationApplicantObject> objs = new List<CessationApplicantObject>();
                    foreach (CessationApplicant obj in query.ToList())
                        objs.Add(new CessationApplicantObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationApplicants");
                return null;
            }
        }

        public DispObject GetDisp(int region_id, int id)
        {
            try
            {
                if (!IsUserInRole("Administrators") && !CanUserServerRead(region_id, id))
                    throw new FaultException("Access denied");
                return GetDispEx(region_id, id);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetDisp");
                return null;
            }
        }
        public FlatObject GetFlat(AddressObject address, int number)
        {
            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");
                return GetFlatEx(address, number);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetFlat");
                return null;
            }
        }
        public LiftFailureObject GetLiftFailure(string liftfailure)
        {
            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");
                return GetLiftFailureEx(liftfailure);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftFailureJam");
                return null;
            }
        }
        public int? GetExecutedPeriod(JournalObject journal, string commonfailure)
        {
            try
            {
                if (!CanUserServerRead())
                    throw new FaultException("Access denied");
                return GetExecutedPeriodEx(journal, commonfailure);
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetExecutedPeriod");
                return null;
            }
        }

        #endregion

        #region Private Claims Operations

        private int InsertCommonClaim(CommonClaimObject c)
        {
            if ((c == null) || !c.Validate())
                return 0;

            using (ClaimsEntities context = new ClaimsEntities())
            {
                c.Id = context.CommonClaims.Max(x => x.Id) + 1;

                CommonClaim claim = new CommonClaim();
                c.CopyTo(ref claim);
                claim.RecordInfo.CreateTime = GetCurrentTime();
                claim.RecordInfo.CreateOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                claim.RecordInfo.RecordTime = GetCurrentTime();
                context.CommonClaims.AddObject(claim);

                UpdateTableChanges(context, "Claims");
                UpdateClaimsChangeId(context);

                AddCommonClaimToHistory(context, c, 1);

                context.SaveChanges();

                return claim.Id;
            }
        }
        private int InsertLiftClaim(LiftClaimObject c)
        {
            if ((c == null) || !c.Validate())
                return 0;

            using (ClaimsEntities context = new ClaimsEntities())
            {
                c.Id = context.LiftClaims.Max(x => x.Id) + 1;

                LiftClaim claim = new LiftClaim();
                c.CopyTo(ref claim);
                claim.RecordInfo.CreateTime = GetCurrentTime();
                claim.RecordInfo.CreateOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                claim.RecordInfo.RecordTime = GetCurrentTime();
                context.LiftClaims.AddObject(claim);

                UpdateTableChanges(context, "LiftClaims");
                UpdateClaimsChangeId(context);

                AddLiftClaimToHistory(context, c, 1);

                context.SaveChanges();

                return claim.Id;
            }
        }
        private int InsertCessationClaim(CessationClaimObject c)
        {
            if ((c == null) || !c.Validate())
                return 0;

            using (ClaimsEntities context = new ClaimsEntities())
            {
                c.Id = context.CessationClaims.Max(x => x.Id) + 1;

                CessationClaim claim = new CessationClaim();
                c.CopyTo(ref claim, context.Addresses.ToList());
                claim.RecordInfo.CreateTime = GetCurrentTime();
                claim.RecordInfo.CreateOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                claim.RecordInfo.RecordTime = GetCurrentTime();
                context.CessationClaims.AddObject(claim);

                UpdateTableChanges(context, "CessationClaims");
                UpdateClaimsChangeId(context);

                AddCessationClaimToHistory(context, c, 1);

                context.SaveChanges();
                return claim.Id;
            }
        }

        private IEnumerable<CommonClaimObject> GetCommonClaims(DateTime? ndt, DateTime? edt, JournalObject journal, string org_name,
            string reg_number, AddressObject address, int? doorway, int? flat, int? isteam, int? minexecutedtime, bool? overdue,
            bool? submission, bool? legate, int? result, bool? deleted, int region_id, int disp_id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {

                    context.ContextOptions.LazyLoadingEnabled = true;
                    
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CommonClaims as c");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetCommonClaimsQueryString(ref parameters, ndt, edt, journal, org_name,
                        reg_number, address, doorway, flat, isteam, minexecutedtime, overdue,
                        submission, legate, result, deleted, region_id, disp_id);
                    queryString.Append(str);
                    queryString.Append(" ORDER BY c.ReceivedTime");

                    ObjectQuery<CommonClaim> query = new ObjectQuery<CommonClaim>(queryString.ToString(), context)
                        .Include("Address").Include("Journal").Include("Disp").Include("Disp.Region");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<CommonClaimObject> claims = new List<CommonClaimObject>();
                    foreach (CommonClaim claim in query.ToList())
                        claims.Add(new CommonClaimObject(claim));
                    return claims;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCommonClaims");
                return null;
            }
        }
        private IEnumerable<LiftClaimObject> GetLiftClaims(DateTime? ndt, DateTime? edt, string org_name,
            string reg_number, AddressObject address, int? doorway, int? minstayminutes, bool? jam,
            bool? overdue, bool? submission, bool? legate, int? result, bool? deleted, int region_id, int disp_id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.LiftClaims as c");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetLiftClaimsQueryString(ref parameters, ndt, edt, org_name, reg_number, address,
                        doorway, minstayminutes, jam, overdue, submission, legate, result, deleted, region_id, disp_id);
                    queryString.Append(str);
                    queryString.Append(" ORDER BY c.ReceivedTime");

                    ObjectQuery<LiftClaim> query = new ObjectQuery<LiftClaim>(queryString.ToString(), context)
                        .Include("Address").Include("Disp").Include("Disp.Region");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<LiftClaimObject> claims = new List<LiftClaimObject>();
                    foreach (LiftClaim claim in query.ToList())
                        claims.Add(new LiftClaimObject(claim));

                    return claims;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftClaims");
                return null;
            }
        }
        private IEnumerable<CessationClaimObject> GetCessationClaims(IEnumerable<AddressObject> addresses, DateTime? ndt, DateTime? edt, 
            string org_name, string reg_number, int? cessationobject, bool? legate, bool? deleted, int region_id, int disp_id)
        {
            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CessationClaims as c");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetCessationClaimsQueryString(ref parameters, addresses, ndt, edt, org_name, 
                        reg_number, cessationobject, legate, deleted, region_id, disp_id);
                    queryString.Append(str);
                    queryString.Append(" ORDER BY c.ReceivedTime");

                    ObjectQuery<CessationClaim> query = new ObjectQuery<CessationClaim>(queryString.ToString(), context)
                        .Include("Addresses").Include("Disp").Include("Disp.Region");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<CessationClaimObject> claims = new List<CessationClaimObject>();
                    foreach (CessationClaim claim in query.ToList())
                        claims.Add(new CessationClaimObject(claim));

                    return claims;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationClaims");
                return null;
            }
        }
        private string GetRepeatFlatsQueryString(ref List<ObjectParameter> parameters, DateTime? ndt, DateTime? edt,
            JournalObject journal, int minrepeatscount, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = GetCurrentTime ();

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (f.RecordInfo.IsDeleted = false OR f.RecordInfo.IsDeleted Is NULL)");
            queryString.Append(" AND (c.RecordInfo.IsDeleted = false OR c.RecordInfo.IsDeleted Is NULL)");
            queryString.Append(" AND (c.Journal.RecordInfo.IsDeleted = false OR c.Journal.RecordInfo.IsDeleted Is NULL)");
            queryString.Append(" AND (c.Address.RecordInfo.IsDeleted = false OR c.Address.RecordInfo.IsDeleted Is NULL)");
            queryString.Append(" AND (c.Disp.RecordInfo.IsDeleted = false OR c.Disp.RecordInfo.IsDeleted Is NULL)");
            queryString.Append(" AND (f.Number > 0)");
            if (ndt != null)
            {
                queryString.Append(" AND c.ReceivedTime >= @ndt");
            }
            if (edt != null)
            {
                queryString.Append(" AND c.ReceivedTime <= @edt");
            }
            if (journal != null)
            {
                queryString.Append(" AND c.JournalId = @jrn_id");
            }
            if (region_id > 0)
            {
                queryString.Append(" AND c.Disp.RegionId = @region_id");
            }
            if (disp_id > 0)
            {
                queryString.Append(" AND c.DispId = @disp_id");
            }
            queryString.Append(" GROUP BY f, c.Journal HAVING COUNT(c.Id) > @minrepeatscount");
            queryString.Append(" ORDER BY f.Address.AddressStr, f.Number");


            if (ndt != null)
                parameters.Add(new ObjectParameter("ndt", ndt));
            if (edt != null)
                parameters.Add(new ObjectParameter("edt", edt));
            if (journal != null)
                parameters.Add(new ObjectParameter("jrn_id", journal.Id));
            parameters.Add(new ObjectParameter("minrepeatscount", minrepeatscount));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));


            return queryString.ToString();
        }

        private int GetCommonClaimsCount(DateTime? ndt, DateTime? edt, JournalObject journal, string org_name,
            string reg_number, AddressObject address, int? doorway, int? flat, int? isteam, int? minexecutedtime, bool? overdue,
            bool? submission, bool? legate, int? result, bool? deleted, int region_id, int disp_id)
        {

            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {

                    context.ContextOptions.LazyLoadingEnabled = true;

                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT c from ClaimsEntities.CommonClaims as c");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetCommonClaimsQueryString(ref parameters, ndt, edt, journal, org_name,
                        reg_number, address, doorway, flat, isteam, minexecutedtime, overdue,
                        submission, legate, result, deleted, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<CommonClaimObject> query = new ObjectQuery<CommonClaimObject>(queryString.ToString(), context);
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCommonClaimsCount");
                return 0;
            }
        }
        private int GetLiftClaimsCount(DateTime? ndt, DateTime? edt, string org_name,
            string reg_number, AddressObject address, int? doorway, int? minstayminutes, bool? jam,
            bool? overdue, bool? submission, bool? legate, int? result, bool? deleted, int region_id, int disp_id)
        {

            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.LiftClaims as c");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetLiftClaimsQueryString(ref parameters, ndt, edt, org_name, reg_number, address,
                        doorway, minstayminutes, jam, overdue, submission, legate, result, deleted, region_id, disp_id);
                    queryString.Append(str);
                    queryString.Append(" ORDER BY c.ReceivedTime");

                    ObjectQuery<LiftClaim> query = new ObjectQuery<LiftClaim>(queryString.ToString(), context);
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftClaimsCount");
                return 0;
            }
        }
        private int GetCessationClaimsCount(IEnumerable<AddressObject> addresses, DateTime? ndt, DateTime? edt,
            string org_name, string reg_number, int? cessationobject, bool? legate, bool? deleted, int region_id, int disp_id)
        {

            try
            {
                using (ClaimsEntities context = new ClaimsEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from ClaimsEntities.CessationClaims as c");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetCessationClaimsQueryString(ref parameters, addresses, ndt, edt, org_name,
                        reg_number, cessationobject, legate, deleted, region_id, disp_id);
                    queryString.Append(str);
                    queryString.Append(" ORDER BY c.ReceivedTime");

                    ObjectQuery<CessationClaim> query = new ObjectQuery<CessationClaim>(queryString.ToString(), context);
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetCessationClaimsCount");
                return 0;
            }
        }

        private string GetCommonClaimsQueryString(ref List<ObjectParameter> parameters, DateTime? ndt, DateTime? edt, JournalObject journal, string org_name,
            string reg_number, AddressObject address, int? doorway, int? flat, int? isteam, int? minexecutedtime, bool? overdue, 
            bool? submission, bool? legate, int? result, bool? deleted, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = GetCurrentTime ();

            StringBuilder queryString = new StringBuilder ();
            queryString.Append(" WHERE (c.Journal.RecordInfo.IsDeleted = false OR c.Journal.RecordInfo.IsDeleted Is NULL) AND (c.Address.RecordInfo.IsDeleted = false OR c.Address.RecordInfo.IsDeleted Is NULL) AND (c.Disp.RecordInfo.IsDeleted = false OR c.Disp.RecordInfo.IsDeleted Is NULL)");
            if (ndt != null)
            {
                queryString.Append(" AND c.ReceivedTime >= @ndt");
            }
            if (edt != null)
            {
                queryString.Append(" AND c.ReceivedTime <= @edt");
            }
            if (journal != null)
            {
                queryString.Append(" AND c.JournalId = @jrn_id");
            }
            if (!string.IsNullOrEmpty(org_name))
            {
                queryString.Append(" AND c.OrgName = @org_name");
            }
            if (!string.IsNullOrEmpty(reg_number))
            {
                queryString.Append(" AND c.RegNumber = @reg_number");
            }
            if (address != null)
            {
                queryString.Append(" AND c.AddressId = @address_id");
            }
            if (doorway != null)
            {
                queryString.Append(" AND c.Doorway = @doorway");
            }
            if (flat != null)
            {
                queryString.Append(" AND c.Flat = @flat");
            }
            if (isteam != null)
            {
                queryString.Append(" AND c.IsSubmission = true AND c.IsTeam = @isteam");
            }

            if (legate != null)
            {
                if ((bool)legate)
                    queryString.Append(" AND (c.IsLegate = true And c.ExecutedTime <= @edt)");
                else
                    queryString.Append(" AND (c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt))");
            }

            if (overdue != null)
            {
                if ((bool)overdue)
                    queryString.Append(" AND (((c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt)) AND (SqlServer.DateAdd('day', c.ExecutedPeriod, c.ReceivedTime) <= @edt)) OR ((c.IsLegate = true And c.ExecutedTime <= @edt) AND (SqlServer.DateAdd('day', c.ExecutedPeriod, c.ReceivedTime) <= c.ExecutedTime)))");
                else
                    queryString.Append(" AND (((c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt)) AND (SqlServer.DateAdd('day', c.ExecutedPeriod, c.ReceivedTime) > @edt)) OR ((c.IsLegate = true And c.ExecutedTime <= @edt) AND (SqlServer.DateAdd('day', c.ExecutedPeriod, c.ReceivedTime) > c.ExecutedTime)))");
            }
            if (submission != null)
            {
                if ((bool)submission)
                    queryString.Append(" AND (c.IsSubmission = true And c.SubmissionTime <= @edt)");
                else
                    queryString.Append(" AND (c.IsSubmission = false  Or (c.IsSubmission = true And c.SubmissionTime > @edt))");
            }

            if (minexecutedtime != null)
            {
                queryString.Append(" And (c.IsLegate = false OR (c.IsLegate=true Or SqlServer.DateDiff('day', c.ReceivedTime, c.ExecutedTime) > @minexecutedtime))");
            }
            if (result != null)
            {
                queryString.Append(" And (c.IsLegate = true And c.Result = @result)");
            }
            if (deleted != null)
            {
                if ((bool)deleted)
                    queryString.Append(" And c.RecordInfo.IsDeleted = true");
                else
                    queryString.Append(" And (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
            }

            if (region_id > 0)
            {
                queryString.Append(" AND c.Disp.RegionId = @region_id");
            }
            if (disp_id > 0)
            {
                queryString.Append(" AND c.DispId = @disp_id");
            }

            if (ndt != null)
                parameters.Add(new ObjectParameter("ndt", ndt));
            if (edt != null)
                parameters.Add(new ObjectParameter("edt", edt));
            if (journal != null)
                parameters.Add(new ObjectParameter("jrn_id", journal.Id));
            if (!string.IsNullOrEmpty(org_name))
                parameters.Add(new ObjectParameter("org_name", org_name));
            if (!string.IsNullOrEmpty(reg_number))
                parameters.Add(new ObjectParameter("reg_number", reg_number));
            if (address != null)
                parameters.Add(new ObjectParameter("address_id", address.Id));
            if (doorway != null)
                parameters.Add(new ObjectParameter("doorway", doorway));
            if (flat != null)
                parameters.Add(new ObjectParameter("flat", flat));
            if (isteam != null)
                parameters.Add(new ObjectParameter("isteam", isteam));

            if (minexecutedtime != null)
                parameters.Add(new ObjectParameter("minexecutedtime", minexecutedtime));
            if (result != null)
                parameters.Add(new ObjectParameter("result", result));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetLiftClaimsQueryString(ref List<ObjectParameter> parameters, DateTime? ndt, DateTime? edt,
            string org_name, string reg_number, AddressObject address, int? doorway, int? minstayminutes, bool? jam,
            bool? overdue, bool? submission, bool? legate, int? result, bool? deleted, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = GetCurrentTime ();

            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (c.Address.RecordInfo.IsDeleted = false OR c.Address.RecordInfo.IsDeleted Is NULL) AND (c.Disp.RecordInfo.IsDeleted = false OR c.Disp.RecordInfo.IsDeleted Is NULL)");
            if (!string.IsNullOrEmpty(org_name))
            {
                queryString.Append(" AND c.OrgName = @org_name");
            }
            if (!string.IsNullOrEmpty(reg_number))
            {
                queryString.Append(" AND c.RegNumber = @reg_number");
            }
            if (address != null)
            {
                queryString.Append(" AND c.AddressId = @address_id");
            }
            if (doorway != null)
            {
                queryString.Append(" AND c.Doorway = @doorway");
            }
            if (minstayminutes != null)
            {
                queryString.Append(" AND c.IsStay = true");
            }
            if (jam != null)
            {
                queryString.Append(" AND c.IsJam = @jam");
            }
            if (overdue != null)
            {
                if ((bool)overdue)
                    queryString.Append(" AND (((c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt)) AND (SqlServer.DateAdd('hour', 3, c.ReceivedTime) <= @edt)) OR ((c.IsLegate = true And c.ExecutedTime <= @edt) AND (SqlServer.DateAdd('hour', 3, c.ReceivedTime) <= c.ExecutedTime)))");
                else
                    queryString.Append(" AND (((c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt)) AND (SqlServer.DateAdd('hour', 3, c.ReceivedTime) > @edt)) OR ((c.IsLegate = true And c.ExecutedTime <= @edt) AND (SqlServer.DateAdd('hour', 3, c.ReceivedTime) > c.ExecutedTime)))");
            }
            if (submission != null)
            {
                if ((bool)submission)
                    queryString.Append(" AND (c.IsSubmission = true And c.SubmissionTime <= @edt)");
                else
                    queryString.Append(" AND (c.IsSubmission = false  Or (c.IsSubmission = true And c.SubmissionTime > @edt))");
            }
            if (legate != null)
            {
                if ((bool)legate)
                    queryString.Append(" AND (c.IsLegate = true And c.ExecutedTime <= @edt)");
                else
                    queryString.Append(" AND (c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt))");
            }
            if (result != null)
            {
                queryString.Append(" And (c.IsLegate = true And c.Result = @result)");
            }
            if (deleted != null)
            {
                if ((bool)deleted)
                    queryString.Append(" And c.RecordInfo.IsDeleted = true");
                else
                    queryString.Append(" And (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
            }

            queryString.Append(" And (((c.IsLegate = true) And (");
            if ((ndt != null) && (edt != null))
            {
                queryString.Append("((c.ReceivedTime > @ndt) And ((c.ExecutedTime < @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, c.ExecutedTime) > @minstayseconds)))");
                queryString.Append(" Or ((c.ReceivedTime > @ndt) And ((c.ExecutedTime >= @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, @edt) > @minstayseconds)))");
                queryString.Append(" Or ((c.ReceivedTime <= @ndt) And ((c.ExecutedTime < @edt) And (SqlServer.DateDiff ('second', @ndt, c.ExecutedTime) > @minstayseconds)))");
                queryString.Append(" Or ((c.ReceivedTime <= @ndt) And ((c.ExecutedTime >= @edt) And (SqlServer.DateDiff ('second', @ndt, @edt) > @minstayseconds)))");
            }
            else if (edt != null)
            {
                queryString.Append("((c.ExecutedTime < @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, c.ExecutedTime) > @minstayseconds))");
                queryString.Append(" Or ((c.ExecutedTime >= @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, @edt) > @minstayseconds))");
            }
            else if (ndt != null)
            {
                queryString.Append("((c.ReceivedTime > @ndt) And (SqlServer.DateDiff ('second', c.ReceivedTime, c.ExecutedTime) > @minstayseconds))");
                queryString.Append(" Or ((c.ReceivedTime <= @ndt) And (SqlServer.DateDiff ('second', @ndt, c.ExecutedTime) > @minstayseconds))");
            }
            else
            {
                queryString.Append("(SqlServer.DateDiff ('second', c.ReceivedTime, c.ExecutedTime) > @minstayseconds)");
            }

            queryString.Append(")) Or ((c.IsLegate = false) And (");
            if ((ndt != null) && (edt != null))
            {
                queryString.Append("((c.ReceivedTime > @ndt) And ((SqlServer.GetDate() < @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, SqlServer.GetDate()) > @minstayseconds)))");
                queryString.Append(" Or ((c.ReceivedTime > @ndt) And ((SqlServer.GetDate() >= @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, @edt) > @minstayseconds)))");
                queryString.Append(" Or ((c.ReceivedTime <= @ndt) And ((SqlServer.GetDate() < @edt) And (SqlServer.DateDiff ('second', @ndt, SqlServer.GetDate()) > @minstayseconds)))");
                queryString.Append(" Or ((c.ReceivedTime <= @ndt) And ((SqlServer.GetDate() >= @edt) And (SqlServer.DateDiff ('second', @ndt, @edt) > @minstayseconds)))");
            }
            else if (edt != null)
            {
                queryString.Append("((SqlServer.GetDate() < @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, SqlServer.GetDate()) > @minstayseconds))");
                queryString.Append(" Or ((SqlServer.GetDate() >= @edt) And (SqlServer.DateDiff ('second', c.ReceivedTime, @edt) > @minstayseconds))");
            }
            else if (ndt != null)
            {
                queryString.Append("((c.ReceivedTime > @ndt) And (SqlServer.DateDiff ('second', c.ReceivedTime, SqlServer.GetDate()) > @minstayseconds))");
                queryString.Append(" Or ((c.ReceivedTime <= @ndt) And (SqlServer.DateDiff ('second', @ndt, SqlServer.GetDate()) > @minstayseconds))");
            }
            else
            {
                queryString.Append("(SqlServer.DateDiff ('second', c.ReceivedTime, SqlServer.GetDate()) > @minstayseconds)");
            }
            queryString.Append(")))");

            if (region_id > 0)
            {
                queryString.Append(" AND c.Disp.RegionId = @region_id");
            }
            if (disp_id > 0)
            {
                queryString.Append(" AND c.DispId = @disp_id");
            }

            if (ndt != null)
                parameters.Add(new ObjectParameter("ndt", ndt));
            if (edt != null)
                parameters.Add(new ObjectParameter("edt", edt));
            if (!string.IsNullOrEmpty(org_name))
                parameters.Add(new ObjectParameter("org_name", org_name));
            if (!string.IsNullOrEmpty(reg_number))
                parameters.Add(new ObjectParameter("reg_number", reg_number));
            if (address != null)
                parameters.Add(new ObjectParameter("address_id", address.Id));
            if (doorway != null)
                parameters.Add(new ObjectParameter("doorway", doorway));
            if (minstayminutes != null)
                parameters.Add(new ObjectParameter("minstayseconds", 60*minstayminutes));
            else
                parameters.Add(new ObjectParameter("minstayseconds", 0));
            if (jam != null)
                parameters.Add(new ObjectParameter("jam", jam));
            if (result != null)
                parameters.Add(new ObjectParameter("result", result));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetCessationClaimsQueryString(ref List<ObjectParameter> parameters, IEnumerable<AddressObject> addresses, DateTime? ndt, 
            DateTime? edt, string org_name, string reg_number, int? cessationobject, bool? legate, bool? deleted, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = GetCurrentTime ();

            StringBuilder queryString = new StringBuilder(); 
            queryString.Append(" WHERE (c.Disp.RecordInfo.IsDeleted = false OR c.Disp.RecordInfo.IsDeleted Is NULL)");
            if ((addresses != null) && (addresses.Count() > 0))
            {
                bool first = true;
                StringBuilder str = new StringBuilder();
                foreach (AddressObject address in addresses)
                {
                    if (!first)
                        str.Append (",");
                    first = false;
                    str.Append(address.Id);
                }
                
                queryString.Append(" AND (EXISTS(SELECT a FROM c.Addresses AS a WHERE a.Id IN MultiSet (" + str.ToString () + ")))");
            }
            if (ndt != null)
            {
                queryString.Append(" AND c.ReceivedTime >= @ndt");
            }
            if (edt != null)
            {
                queryString.Append(" AND c.ReceivedTime <= @edt");
            }
            if (!string.IsNullOrEmpty(org_name))
            {
                queryString.Append(" AND c.OrgName = @org_name");
            }
            if (!string.IsNullOrEmpty(reg_number))
            {
                queryString.Append(" AND c.RegNumber = @reg_number");
            }
            if (cessationobject != null)
            {
                queryString.Append(" AND c.CessationObject = @cessationobject");
            }
            if (legate != null)
            {
                if ((bool)legate)
                    queryString.Append(" AND (c.IsLegate = true And c.ExecutedTime <= @edt)");
                else
                    queryString.Append(" AND (c.IsLegate = false  Or (c.IsLegate = true And c.ExecutedTime > @edt))");
            }
            if (deleted != null)
            {
                if ((bool)deleted)
                    queryString.Append(" And c.RecordInfo.IsDeleted = true");
                else
                    queryString.Append(" And (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
            }
            if (region_id > 0)
            {
                queryString.Append(" AND c.Disp.RegionId = @region_id");
            }
            if (disp_id > 0)
            {
                queryString.Append(" AND c.DispId = @disp_id");
            }

            if (ndt != null)
                parameters.Add(new ObjectParameter("ndt", ndt));
            if (edt != null)
                parameters.Add(new ObjectParameter("edt", edt));
            if (!string.IsNullOrEmpty(org_name))
                parameters.Add(new ObjectParameter("org_name", org_name));
            if (!string.IsNullOrEmpty(reg_number))
                parameters.Add(new ObjectParameter("reg_number", reg_number));
            if (cessationobject != null)
                parameters.Add(new ObjectParameter("cessationobject", cessationobject));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }

        private int GetUnexecutedClaimsCount(int region_id, int disp_id)
        {
            return GetCommonClaimsCount(null, null, null, null, null, null, null, null, null, null, null,
                null, false, null, false, region_id, disp_id);
        }
        private int GetOverdueClaimsCount(int region_id, int disp_id)
        {
            return GetCommonClaimsCount(null, null, null, null, null, null, null, null, null, null, true,
                null, false, null, false, region_id, disp_id);
        }
        private int GetLegateUnexecutedClaimsCount(int region_id, int disp_id)
        {
            return GetCommonClaimsCount(null, null, null, null, null, null, null, null, null, null, null,
                null, true, 1, false, region_id, disp_id);
        }
        private int GetCommonClaimsCount(DateTime? ndt, DateTime? edt, JournalObject journal, AddressObject address, int? flat, string reg_number, int region_id, int disp_id)
        {
            return GetCommonClaimsCount(ndt, edt, journal, null, reg_number, address, null, flat, null, null,
                null, null, null, null, false, region_id, disp_id);
        }
        private int GetBreakLiftClaimsCount(int region_id, int disp_id)
        {
            return GetLiftClaimsCount(null, null, null, null, null, null, null, null, null, null, false, null, false, region_id, disp_id);
        }
        private int GetCurrentJamLiftClaimsCount(int region_id, int disp_id)
        {
            return GetLiftClaimsCount(null, null, null, null, null, null, null, true, null, null, false, null, false, region_id, disp_id);
        }
        private int GetUnlegateExecutedLiftClaimsCount(int region_id, int disp_id)
        {
            return GetLiftClaimsCount(null, null, null, null, null, null, null, null, null, null, true, 2, false, region_id, disp_id);
        }
        private int GetCurrentCessationClaimsCount(int region_id, int disp_id)
        {
            return GetCessationClaimsCount(null, null, null, null, null, null, false, false, region_id, disp_id);
        }

        private DispObject GetAddressDisp(int address_id, int jrn_id)
        {
            using (ClaimsEntities context = new ClaimsEntities())
            {
                Address address = (from x in context.Addresses.Include("Disps").Include("Disps.Region") where x.Id == address_id select x).FirstOrDefault();
                if (address == null)
                    return null;
                
                if (address.Disps.Count == 1)
                    return new DispObject(address.Disps[0]);

                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE d from ClaimsEntities.Disps as d INNER JOIN ClaimsEntities.Address2Journals AS aj ON d.Id = aj.DispId");
                queryString.Append(" WHERE (d.RecordInfo.IsDeleted = false Or d.RecordInfo.IsDeleted Is Null) AND (aj.IsInclude = @isinclude)");
                queryString.Append(" AND (aj.AddressId=@address_id)");
                queryString.Append(" AND (aj.JournalId=@jrn_id)");

                ObjectQuery<Disp> query = new ObjectQuery<Disp>(queryString.ToString(), context).Include("Region");
                query.Parameters.Add(new ObjectParameter("address_id", address_id));
                query.Parameters.Add(new ObjectParameter("jrn_id", jrn_id));
                query.Parameters.Add(new ObjectParameter("isinclude", true));
                query.MergeOption = MergeOption.NoTracking;

                Disp disp = query.FirstOrDefault();
                if (disp == null)
                    return null;

                return new DispObject(disp);
            }
        }
        private DispObject GetDispEx(int region_id, int id)
        {
            if ((region_id == 0) || (id == 0))
                return null;

            using (ClaimsEntities context = new ClaimsEntities())
            {
                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE c from ClaimsEntities.Disps as c");
                queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                queryString.Append(" AND (c.Region.Id=@region_id)");
                queryString.Append(" AND (c.Id=@id)");

                ObjectQuery<Disp> query = new ObjectQuery<Disp>(queryString.ToString(), context);
                query.Parameters.Add(new ObjectParameter("region_id", region_id));
                query.Parameters.Add(new ObjectParameter("id", id));
                query.MergeOption = MergeOption.NoTracking;

                Disp disp = query.FirstOrDefault();
                if (disp == null)
                    return null;

                return new DispObject(disp);
            }
        }
        private JournalObject GetJournalEx(int jrn_id)
        {
            using (ClaimsEntities context = new ClaimsEntities())
            {
                if (jrn_id <= 0)
                    return null;

                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE c from ClaimsEntities.Journals as c");
                queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                queryString.Append(" AND c.Id = @jrn_id");

                ObjectQuery<Journal> query = new ObjectQuery<Journal>(queryString.ToString(), context);
                query.Parameters.Add(new ObjectParameter("jrn_id", jrn_id));
                query.MergeOption = MergeOption.NoTracking;

                Journal journal = query.FirstOrDefault();
                if (journal == null)
                    return null;

                return new JournalObject(journal);
            }
        }
        private AddressObject GetAddressEx(int address_id)
        {
            using (ClaimsEntities context = new ClaimsEntities())
            {
                if (address_id <= 0)
                    return null;

                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE c from ClaimsEntities.Addresses as c");
                queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                queryString.Append(" AND c.Id = @address_id");

                ObjectQuery<Address> query = new ObjectQuery<Address>(queryString.ToString(), context);
                query.Parameters.Add(new ObjectParameter("address_id", address_id));
                query.MergeOption = MergeOption.NoTracking;

                Address address = query.FirstOrDefault();
                if (address == null)
                    return null;

                return new AddressObject(address);
            }
        }
        private FlatObject GetFlatEx(AddressObject address, int number)
        {
            using (ClaimsEntities context = new ClaimsEntities())
            {
                if (address == null)
                    return null;

                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE c from ClaimsEntities.Flats as c");
                queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                if (address != null)
                    queryString.Append(" AND c.Address.Id = @address_id");
                queryString.Append(" AND c.Number = @number");

                ObjectQuery<Flat> query = new ObjectQuery<Flat>(queryString.ToString(), context).Include("Address").Include("Address.Region");
                if (address != null)
                    query.Parameters.Add(new ObjectParameter("address_id", address.Id));
                query.Parameters.Add(new ObjectParameter("number", number));
                query.MergeOption = MergeOption.NoTracking;

                Flat flat = query.FirstOrDefault();
                if (flat == null)
                    return null;

                return new FlatObject(flat);
            }
        }
        private LiftFailureObject GetLiftFailureEx(string liftfailure)
        {
            if (liftfailure == null)
                liftfailure = "";

            using (ClaimsEntities context = new ClaimsEntities())
            {
                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE c from ClaimsEntities.LiftFailures as c");
                queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                queryString.Append(" AND c.Name = @liftfailure");

                ObjectQuery<LiftFailure> query = new ObjectQuery<LiftFailure>(queryString.ToString(), context);
                query.Parameters.Add(new ObjectParameter("liftfailure", liftfailure));
                query.MergeOption = MergeOption.NoTracking;

                LiftFailure obj = query.FirstOrDefault();
                if (obj == null)
                    return null;

                return new LiftFailureObject(obj);
            }
        }
        private int? GetExecutedPeriodEx(JournalObject journal, string commonfailure)
        {
            if (commonfailure == null)
                commonfailure = "";

            using (ClaimsEntities context = new ClaimsEntities())
            {
                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE c from ClaimsEntities.CommonFailures as c");
                queryString.Append(" WHERE (c.RecordInfo.IsDeleted = false Or c.RecordInfo.IsDeleted Is Null)");
                if (journal != null)
                    queryString.Append(" AND c.Journal.Id = @jrn_id");
                queryString.Append(" AND c.Name = @commonfailure");

                ObjectQuery<CommonFailure> query = new ObjectQuery<CommonFailure>(queryString.ToString(), context);
                if (journal != null)
                    query.Parameters.Add(new ObjectParameter("jrn_id", journal.Id));
                query.Parameters.Add(new ObjectParameter("commonfailure", commonfailure));
                query.MergeOption = MergeOption.NoTracking;

                CommonFailure obj = query.FirstOrDefault();
                if (obj == null)
                    return null;
                return obj.ExecutedPeriod;
            }
        }

        private string GetCommonClaimRegnumber(int jrn_id, int region_id, int disp_id)
        {
            string template = GetProjectSetting("reg_number_template", 1, region_id, "");
            if (string.IsNullOrEmpty(template))
                return "";

            DateTime nydate = new DateTime(DateTime.Now.Year, 1, 1, 0, 0, 0);
            DateTime nmdate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1, 0, 0, 0);
            DateTime nddate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);

            string yyyy = DateTime.Now.Year.ToString();
            string yy = ((DateTime.Now.Year % 100 < 10) ? "0" : "") + (DateTime.Now.Year % 100).ToString();
            string mm = ((DateTime.Now.Month < 10) ? "0" : "") + DateTime.Now.Month.ToString();
            string dd = ((DateTime.Now.Day < 10) ? "0" : "") + DateTime.Now.Day.ToString();

            using (ClaimsEntities context = new ClaimsEntities())
            {
                int ny = (from c in context.CommonClaims
                          where (c.JournalId == jrn_id) && (c.DispId == disp_id) && (c.ReceivedTime >= nydate)
                          select c).Count() + 1;

                int nm = (from c in context.CommonClaims
                          where (c.JournalId == jrn_id) && (c.DispId == disp_id) && (c.ReceivedTime >= nmdate)
                          select c).Count() + 1;

                int nd = (from c in context.CommonClaims
                          where (c.JournalId == jrn_id) && (c.DispId == disp_id) && (c.ReceivedTime >= nddate)
                          select c).Count() + 1;

                template = template.Replace("%dd", dd);
                template = template.Replace("%mm", mm);
                template = template.Replace("%yyyy", yyyy);
                template = template.Replace("%yy", yy);
                template = template.Replace("%nd", nd.ToString());
                template = template.Replace("%nm", nm.ToString());
                template = template.Replace("%ny", ny.ToString());
            }

            return template;
        }
        private string GetLiftClaimRegnumber(int region_id, int disp_id)
        {
            string template = GetProjectSetting("reg_number_template", 1, region_id, "");
            if (string.IsNullOrEmpty(template))
                return "";

            DateTime nydate = new DateTime(DateTime.Now.Year, 1, 1, 0, 0, 0);
            DateTime nmdate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1, 0, 0, 0);
            DateTime nddate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);

            string yyyy = DateTime.Now.Year.ToString();
            string yy = ((DateTime.Now.Year % 100 < 10) ? "0" : "") + (DateTime.Now.Year % 100).ToString();
            string mm = ((DateTime.Now.Month < 10) ? "0" : "") + DateTime.Now.Month.ToString();
            string dd = ((DateTime.Now.Day < 10) ? "0" : "") + DateTime.Now.Day.ToString();

            using (ClaimsEntities context = new ClaimsEntities())
            {
                int ny = (from c in context.LiftClaims
                          where (c.DispId == disp_id) && (c.ReceivedTime >= nydate)
                          select c).Count() + 1;

                int nm = (from c in context.LiftClaims
                          where (c.DispId == disp_id) && (c.ReceivedTime >= nmdate)
                          select c).Count() + 1;

                int nd = (from c in context.LiftClaims
                          where (c.DispId == disp_id) && (c.ReceivedTime >= nddate)
                          select c).Count() + 1;

                template.Replace("%dd", dd);
                template.Replace("%mm", mm);
                template.Replace("%yyyy", yyyy);
                template.Replace("%yy", yy);
                template.Replace("%nd", nd.ToString());
                template.Replace("%nm", nm.ToString());
                template.Replace("%ny", ny.ToString());
            }

            return template;
        }
        private string GetCessationClaimRegnumber(int region_id, int disp_id)
        {
            string template = GetProjectSetting("reg_number_template", 1, region_id, "");
            if (string.IsNullOrEmpty(template))
                return "";

            DateTime nydate = new DateTime(DateTime.Now.Year, 1, 1, 0, 0, 0);
            DateTime nmdate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1, 0, 0, 0);
            DateTime nddate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);

            string yyyy = DateTime.Now.Year.ToString();
            string yy = ((DateTime.Now.Year % 100 < 10) ? "0" : "") + (DateTime.Now.Year % 100).ToString();
            string mm = ((DateTime.Now.Month < 10) ? "0" : "") + DateTime.Now.Month.ToString();
            string dd = ((DateTime.Now.Day < 10) ? "0" : "") + DateTime.Now.Day.ToString();

            using (ClaimsEntities context = new ClaimsEntities())
            {
                int ny = (from c in context.CessationClaims
                          where (c.DispId == disp_id) && (c.ReceivedTime >= nydate)
                          select c).Count() + 1;

                int nm = (from c in context.CessationClaims
                          where (c.DispId == disp_id) && (c.ReceivedTime >= nmdate)
                          select c).Count() + 1;

                int nd = (from c in context.CessationClaims
                          where (c.DispId == disp_id) && (c.ReceivedTime >= nddate)
                          select c).Count() + 1;

                template.Replace("%dd", dd);
                template.Replace("%mm", mm);
                template.Replace("%yyyy", yyyy);
                template.Replace("%yy", yy);
                template.Replace("%nd", nd.ToString());
                template.Replace("%nm", nm.ToString());
                template.Replace("%ny", ny.ToString());
            }

            return template;
        }

        private void AddCommonClaimToHistory(ClaimsEntities context, CommonClaimObject claim, int change_id)
        {
            CommonClaimHistoryItem item = new CommonClaimHistoryItem();
            item.Id = context.CommonClaimsHistory.Max(x => x.Id) + 1;
            item.ChangeTime = GetCurrentTime();
            item.ChangeOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
            item.ChangeId = change_id;
            claim.CopyToHistory(ref item);

            context.CommonClaimsHistory.AddObject(item);
        }
        private void AddLiftClaimToHistory(ClaimsEntities context, LiftClaimObject claim, int change_id)
        {
            LiftClaimHistoryItem item = new LiftClaimHistoryItem();
            item.Id = context.LiftClaimsHistory.Max(x => x.Id) + 1;
            item.ChangeTime = GetCurrentTime();
            item.ChangeOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
            item.ChangeId = change_id;
            claim.CopyToHistory(ref item);

            context.LiftClaimsHistory.AddObject(item);
        }
        private void AddCessationClaimToHistory(ClaimsEntities context, CessationClaimObject claim, int change_id)
        {
            CessationClaimHistoryItem item = new CessationClaimHistoryItem();
            item.Id = context.CessationClaimsHistory.Max(x => x.Id) + 1;
            item.ChangeTime = GetCurrentTime();
            item.ChangeOperator = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
            item.ChangeId = change_id;
            claim.CopyToHistory(ref item);

            context.CessationClaimsHistory.AddObject(item);
        }

        private void UpdateTableChanges (ClaimsEntities context, string name)
        {
            TablesChange table = (from x in context.TablesChanges
                                    where x.TableName == name
                                    select x).FirstOrDefault ();
            if (table != null) 
            {
                EntityKey key = context.CreateEntityKey("TablesChanges", table);

                object contactToModify;
                if (context.TryGetObjectByKey(key, out contactToModify))
                {
                    table.ChangeTime = GetCurrentTime ();
                    context.ApplyCurrentValues(key.EntitySetName, table);
                }
            }
            else
            {
                table = new TablesChange();
                table.TableName = name;
                table.ChangeTime = GetCurrentTime ();
                context.TablesChanges.AddObject(table);
            }
        }
        private void UpdateClaimsChangeId(ClaimsEntities context)
        {
            Change change = (from x in context.Changes select x).FirstOrDefault();

            if (change != null)
            {
                EntityKey key = context.CreateEntityKey("Changes", change);

                object contactToModify;
                if (context.TryGetObjectByKey(key, out contactToModify))
                {
                    change.ClaimsId++;
                    context.ApplyCurrentValues(key.EntitySetName, change);
                }
            }
            else
            {
                change = new Change();
                change.ClaimsId = 1;
                change.SettingsId = 1;
                context.Changes.AddObject(change);
            }
        }
        private void UpdateSettingsChangeId(ClaimsEntities context)
        {
            Change change = (from x in context.Changes select x).FirstOrDefault();

            if (change != null)
            {
                EntityKey key = context.CreateEntityKey("Changes", change);

                object contactToModify;
                if (context.TryGetObjectByKey(key, out contactToModify))
                {
                    change.SettingsId++;
                    context.ApplyCurrentValues(key.EntitySetName, change);
                }
            }
            else
            {
                change = new Change();
                change.ClaimsId = 1;
                change.SettingsId = 1;
                context.Changes.AddObject(change);
            }
        }

        private DateTime GetCurrentTime()
        {
            DateTime dt = DateTime.Now;
            return dt.AddMilliseconds(-dt.Millisecond);
        }

        #endregion

        #region Private Settings Function

        private string GetProjectSetting(string name, int scope_id, int region_id, string defval)
        {
            using (ElvEntities context = new ElvEntities())
            {
                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE s from ElvEntities.ProjectSettings as s");
                queryString.Append(" WHERE (s.Name = @name) AND (s.ScopeId = @scope_id) AND (s.RegionId = @region_id)");

                var query = new ObjectQuery<Horizont.Elv.Model.ProjectSetting>(queryString.ToString(), context);
                query.Parameters.Add(new ObjectParameter("name", name));
                query.Parameters.Add(new ObjectParameter("scope_id", scope_id));
                query.Parameters.Add(new ObjectParameter("region_id", region_id));
                query.MergeOption = MergeOption.NoTracking;

                var setting = query.FirstOrDefault();
                if (setting == null)
                    return defval;

                return setting.Value;
            }
        }

        #endregion

        #region Private UserRights Function

        private bool IsUserInRole(string role)
        {
            try
            {
                string username = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;

                UsersServiceClient service = new UsersServiceClient("BasicHttpBinding_UsersService");
                return service.IsUserInRole(username, role);
            }
            catch (Exception)
            {
                return false;
            }
        }
        private bool CanUserFlatRead(int address_id, int flat)
        {
            try
            {
                string username = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                int server_id = Convert.ToInt32(ConfigurationManager.AppSettings["ServerId"]);

                UsersServiceClient service = new UsersServiceClient("BasicHttpBinding_UsersService");
                if (!service.CanUserFlatRead(username, server_id, address_id, flat))
                    return false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private bool CanUserFlatEdit(int address_id, int flat)
        {
            try
            {
                string username = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                int server_id = Convert.ToInt32(ConfigurationManager.AppSettings["ServerId"]);

                UsersServiceClient service = new UsersServiceClient("BasicHttpBinding_UsersService");
                if (!service.CanUserFlatEdit(username, server_id, address_id, flat))
                    return false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private bool CanUserServerRead(int? region_id = null, int? disp_id = null)
        {
            try
            {
                string username = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                int server_id = Convert.ToInt32(ConfigurationManager.AppSettings["ServerId"]);

                UsersServiceClient service = new UsersServiceClient("BasicHttpBinding_UsersService");
                if (!service.CanUserServerRead(username, server_id, region_id, disp_id))
                    return false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private bool CanUserServerEdit(int? region_id = null, int? disp_id = null)
        {
            try
            {
                string username = OperationContext.Current.ServiceSecurityContext.PrimaryIdentity.Name;
                int server_id = Convert.ToInt32(ConfigurationManager.AppSettings["ServerId"]);

                UsersServiceClient service = new UsersServiceClient("BasicHttpBinding_UsersService");
                if (!service.CanUserServerEdit(username, server_id, region_id, disp_id))
                    return false;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region Private Helper Methods and Constants

        private const string eventSource = "Claims WCF Service";
        private const string eventLog = "Application";

        private void logException(Exception ex, string eventName)
        {
            if (!EventLog.SourceExists(eventSource))
            {
                EventLog.CreateEventSource(eventSource, eventLog);
            }

            string eventMessage = string.Format("{0}: {1}: {2}", eventName, ex.Message, Thread.CurrentPrincipal.Identity.Name);
            EventLog.WriteEntry(eventSource, eventMessage, EventLogEntryType.Error);
        }

        private void handleException(Exception ex, string operationName, int operationData = 0)
        {
            // Log the details of the exception
            StringBuilder eventMessageBuilder = new StringBuilder();
            eventMessageBuilder.Append(string.Format("Failure in {0}", operationName));
            if (operationData != 0)
            {
                eventMessageBuilder.Append(string.Format(" :Data {0}", operationData));
            }
            string eventMessage = eventMessageBuilder.ToString();
            logException(ex, eventMessage);

            if (ex is ApplicationException)
            {
                // If an application exception occurs, log it and return the details to the user.
                // The information the exception contains is safe and is intended to be informative for the user.
                // Create a ServiceFault object and throw a WCF FaultException
                ServiceFault sf = new ServiceFault
                {
                    ExceptionType = ex.GetType().ToString(),
                    ExceptionMessage = ex.Message
                };

                throw new FaultException<ServiceFault>(sf, eventMessageBuilder.ToString());
            }

            else
            {
                // If the exception is some other type of exception, then do not return the details to the user
                // Create a ServiceFault object and throw a WCF FaultException
                ServiceFault sf = new ServiceFault
                {
                    ExceptionType = ex.GetType().ToString(),
                    ExceptionMessage = "Exception occurred fetching data"
                };

                throw new FaultException<ServiceFault>(sf, string.Format("Failure in {0}", operationName));
            }
        }

        #endregion

    }
}
