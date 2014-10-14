namespace Horizont.Elv.Service
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data.Objects;
    using System.Diagnostics;
    using System.Linq;
    using System.ServiceModel;
    using System.Text;
    using System.Threading;

    using Horizont.Elv.Library.Entities;
    using Horizont.Elv.Model;
    using Horizont.Elv.Service.UsersServiceReference;

    [ServiceBehavior(
        Name = "Elv",
        Namespace = "http://microsoft.com", 
        InstanceContextMode = InstanceContextMode.PerCall, 
        ConcurrencyMode=ConcurrencyMode.Multiple)]
    public class ElvService : IElvService
    {
        #region Public ElvObjects Operations

        public IEnumerable<TermObject> GetTerms(bool? isbreak, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {

                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Terms as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetTermsQueryString(ref parameters, isbreak, region_id, disp_id);
                    queryString.Append(str);

                    if (isbreak != null)
                        queryString.Append(" ORDER BY o.State.BreakTime desc");
                    else
                        queryString.Append(" ORDER BY o.Name");

                    ObjectQuery<Term> query = new ObjectQuery<Term>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<TermObject> objs = new List<TermObject>();
                    foreach (Term obj in query.ToList())
                        objs.Add(new TermObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetTerms");
                return null;
            }
        }
        public IEnumerable<LiftObject> GetLifts(bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Lifts as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetLiftsQueryString(ref parameters, isbreak, isrevision, region_id, disp_id);
                    queryString.Append(str);
                    
                    if (isbreak != null)
                        queryString.Append(" ORDER BY o.State.BreakTime desc");
                    else if (isrevision != null)
                        queryString.Append(" ORDER BY o.State.RevisionTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<Lift> query = new ObjectQuery<Lift>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<LiftObject> objs = new List<LiftObject>();
                    foreach (Lift obj in query.ToList())
                        objs.Add(new LiftObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLifts");
                return null;
            }
        }
        public IEnumerable<HoistObject> GetHoists(bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Hoists as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetHoistsQueryString(ref parameters, isbreak, isrevision, region_id, disp_id);
                    queryString.Append(str);

                    if (isbreak != null)
                        queryString.Append(" ORDER BY o.State.BreakTime desc");
                    else if (isrevision != null)
                        queryString.Append(" ORDER BY o.State.RevisionTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<Hoist> query = new ObjectQuery<Hoist>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<HoistObject> objs = new List<HoistObject>();
                    foreach (Hoist obj in query.ToList())
                        objs.Add(new HoistObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetHoists");
                return null;
            }
        }
        public IEnumerable<DoorObject> GetDoors(bool? isopen, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Doors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetDoorsQueryString(ref parameters, isopen, region_id, disp_id);
                    queryString.Append(str);

                    if (isopen != null)
                        queryString.Append(" ORDER BY o.State.OpenTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<Door> query = new ObjectQuery<Door>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<DoorObject> objs = new List<DoorObject>();
                    foreach (Door obj in query.ToList())
                        objs.Add(new DoorObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetDoors");
                return null;
            }
        }
        public IEnumerable<FireSensorObject> GetFireSensors(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.FireSensors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetFireSensorsQueryString(ref parameters, isalarm, region_id, disp_id);
                    queryString.Append(str);

                    if (isalarm != null)
                        queryString.Append(" ORDER BY o.State.AlarmTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<FireSensor> query = new ObjectQuery<FireSensor>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<FireSensorObject> objs = new List<FireSensorObject>();
                    foreach (FireSensor obj in query.ToList())
                        objs.Add(new FireSensorObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetFireSensors");
                return null;
            }
        }
        public IEnumerable<WaterSensorObject> GetWaterSensors(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.WaterSensors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetWaterSensorsQueryString(ref parameters, isalarm, region_id, disp_id);
                    queryString.Append(str);

                    if (isalarm != null)
                        queryString.Append(" ORDER BY o.State.AlarmTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<WaterSensor> query = new ObjectQuery<WaterSensor>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<WaterSensorObject> objs = new List<WaterSensorObject>();
                    foreach (WaterSensor obj in query.ToList())
                        objs.Add(new WaterSensorObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetWaterSensors");
                return null;
            }
        }
        public IEnumerable<GasSensorObject> GetGasSensors(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.GasSensors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetGasSensorsQueryString(ref parameters, isalarm, region_id, disp_id);
                    queryString.Append(str);

                    if (isalarm != null)
                        queryString.Append(" ORDER BY o.State.AlarmTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<GasSensor> query = new ObjectQuery<GasSensor>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<GasSensorObject> objs = new List<GasSensorObject>();
                    foreach (GasSensor obj in query.ToList())
                        objs.Add(new GasSensorObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetGasSensors");
                return null;
            }
        }
        public IEnumerable<TeleControlObject> GetTeleControls(bool? isenable, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.TeleControls as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetTeleControlsQueryString(ref parameters, isenable, region_id, disp_id);
                    queryString.Append(str);

                    if (isenable != null)
                        queryString.Append(" ORDER BY o.State.EnableTime desc");
                    else
                        queryString.Append(" ORDER BY o.Name");

                    ObjectQuery<TeleControl> query = new ObjectQuery<TeleControl>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<TeleControlObject> objs = new List<TeleControlObject>();
                    foreach (TeleControl obj in query.ToList())
                        objs.Add(new TeleControlObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetTeleControls");
                return null;
            }
        }
        public IEnumerable<ChannelObject> GetChannels(bool? isbreak, int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Channels as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetChannelsQueryString(ref parameters, isbreak, region_id, disp_id);
                    queryString.Append(str);
                    
                    if (isbreak != null)
                        queryString.Append(" ORDER BY o.State.CheckTime desc");
                    else
                        queryString.Append(" ORDER BY o.Address, o.Name");

                    ObjectQuery<Channel> query = new ObjectQuery<Channel>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;

                    List<ChannelObject> objs = new List<ChannelObject>();
                    foreach (Channel obj in query.ToList())
                        objs.Add(new ChannelObject(obj));

                    return objs;
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetChannels");
                return null;
            }
        }

        public ElvCountObject GetElvCountObject(int region_id, int disp_id)
        {
            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                ElvCountObject obj = new ElvCountObject();

                obj.TermsCount = GetTermsCount(null, region_id, disp_id);
                obj.LiftsCount = GetLiftsCount(null, null, region_id, disp_id);
                obj.HoistsCount = GetHoistsCount(null, null, region_id, disp_id);
                obj.DoorsCount = GetDoorsCount(null, region_id, disp_id);
                obj.FireSensorsCount = GetFireSensorsCount(null, region_id, disp_id);
                obj.WaterSensorsCount = GetWaterSensorsCount(null, region_id, disp_id);
                obj.GasSensorsCount = GetGasSensorsCount(null, region_id, disp_id);
                obj.TeleControlsCount = GetTeleControlsCount(null, region_id, disp_id);
                obj.ChannelsCount = GetChannelsCount(null, region_id, disp_id);

                obj.BreakTermsCount = GetTermsCount(true, region_id, disp_id);
                obj.BreakLiftsCount = GetLiftsCount(true, null, region_id, disp_id);
                obj.BreakHoistsCount = GetHoistsCount(true, null, region_id, disp_id);
                obj.OpenDoorsCount = GetDoorsCount(true, region_id, disp_id);
                obj.AlarmFireSensorsCount = GetFireSensorsCount(true, region_id, disp_id);
                obj.AlarmWaterSensorsCount = GetWaterSensorsCount(true, region_id, disp_id);
                obj.AlarmGasSensorsCount = GetGasSensorsCount(true, region_id, disp_id);
                obj.EnabledTeleControlsCount = GetTeleControlsCount(true, region_id, disp_id);
                obj.BreakChannelsCount = GetChannelsCount(true, region_id, disp_id);

                return obj;
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetElvCountObject");
                return null;
            }
        }

        #endregion

        #region Public ElvObjects Events Operations

        public IEnumerable<TermObjectEvent> GetTermEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<TermObject> terms, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.TermEvents as e");
                    queryString.Append(" WHERE NOT (e.Term Is Null) AND NOT (e.Term.Cnt Is Null) AND NOT (e.BreakTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.BreakTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.BreakTime <= @edt AND e.IsBreak = true) OR e.IsBreak = false)");
                    if ((terms != null) && (terms.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (TermObject term in terms)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(term.Id);
                        }
                        queryString.Append(" AND e.TermId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.TermId, e.BreakTime, e.IsBreak");

                    ObjectQuery<TermEvent> query = new ObjectQuery<TermEvent>(queryString.ToString(), context).Include("Term");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    TermEvent startEvent = null;
                    TermObjectEvent e = null;
                    List<TermObjectEvent> events = new List<TermObjectEvent>();
                    foreach (TermEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.TermId != evt.TermId)
                        {
                            e = new TermObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsBreak)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsBreak)
                            continue;

                        e = new TermObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new TermObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy (x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetTermEvents");
                return null;
            }
        }
        public IEnumerable<LiftObjectEvent> GetLiftEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<LiftObject> lifts, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.LiftEvents as e");
                    queryString.Append(" WHERE NOT (e.Lift Is Null) AND NOT (e.Lift.Term Is Null) AND NOT (e.Lift.Term.Cnt Is Null) AND NOT (e.BreakTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.BreakTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.BreakTime <= @edt AND e.IsBreak = true) OR e.IsBreak = false)");
                    if ((lifts != null) && (lifts.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (LiftObject lift in lifts)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(lift.Id);
                        }
                        queryString.Append(" AND e.LiftId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.Lift.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.Lift.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.LiftId, e.BreakTime, e.IsBreak");

                    ObjectQuery<LiftEvent> query = new ObjectQuery<LiftEvent>(queryString.ToString(), context).Include("Lift");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    LiftEvent startEvent = null;
                    LiftObjectEvent e = null; 
                    List<LiftObjectEvent> events = new List<LiftObjectEvent>();
                    foreach (LiftEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.LiftId != evt.LiftId)
                        {
                            e = new LiftObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsBreak)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsBreak)
                            continue;

                        e = new LiftObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new LiftObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftEvents");
                return null;
            }
        }
        public IEnumerable<HoistObjectEvent> GetHoistEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<HoistObject> hoists, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.HoistEvents as e");
                    queryString.Append(" WHERE NOT (e.Hoist Is Null) AND NOT (e.Hoist.Term Is Null) AND NOT (e.Hoist.Term.Cnt Is Null) AND NOT (e.BreakTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.BreakTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.BreakTime <= @edt AND e.IsBreak = true) OR e.IsBreak = false)");
                    if ((hoists != null) && (hoists.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (HoistObject hoist in hoists)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(hoist.Id);
                        }
                        queryString.Append(" AND e.HoistId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.Hoist.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.Hoist.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.HoistId, e.BreakTime, e.IsBreak");

                    ObjectQuery<HoistEvent> query = new ObjectQuery<HoistEvent>(queryString.ToString(), context).Include("Hoist");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    HoistEvent startEvent = null;
                    HoistObjectEvent e = null;
                    List<HoistObjectEvent> events = new List<HoistObjectEvent>();
                    foreach (HoistEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.HoistId != evt.HoistId)
                        {
                            e = new HoistObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsBreak)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsBreak)
                            continue;

                        e = new HoistObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new HoistObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetHoistEvents");
                return null;
            }
        }
        public IEnumerable<DoorObjectEvent> GetDoorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<DoorObject> doors, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.DoorEvents as e");
                    queryString.Append(" WHERE NOT (e.Door Is Null) AND NOT (e.Door.Term Is Null) AND NOT (e.Door.Term.Cnt Is Null) AND NOT (e.OpenTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.OpenTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.OpenTime <= @edt AND e.IsOpen = true) OR e.IsOpen = false)");
                    if ((doors != null) && (doors.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (DoorObject door in doors)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(door.Id);
                        }
                        queryString.Append(" AND e.DoorId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.Door.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.Door.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.DoorId, e.OpenTime, e.IsOpen");

                    ObjectQuery<DoorEvent> query = new ObjectQuery<DoorEvent>(queryString.ToString(), context).Include("Door");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    DoorEvent startEvent = null;
                    DoorObjectEvent e = null;
                    List<DoorObjectEvent> events = new List<DoorObjectEvent>();
                    foreach (DoorEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.DoorId != evt.DoorId)
                        {
                            e = new DoorObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsOpen)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsOpen)
                            continue;

                        e = new DoorObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new DoorObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetDoorEvents");
                return null;
            }
        }
        public IEnumerable<FireSensorObjectEvent> GetFireSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<FireSensorObject> firesensors, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.FireSensorEvents as e");
                    queryString.Append(" WHERE NOT (e.FireSensor Is Null) AND NOT (e.FireSensor.Term Is Null) AND NOT (e.FireSensor.Term.Cnt Is Null) AND NOT (e.AlarmTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.AlarmTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.AlarmTime <= @edt AND e.IsAlarm = true) OR e.IsAlarm = false)");
                    if ((firesensors != null) && (firesensors.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (FireSensorObject firesensor in firesensors)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(firesensor.Id);
                        }
                        queryString.Append(" AND e.FireSensorId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.FireSensor.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.FireSensor.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.FireSensorId, e.AlarmTime, e.IsAlarm");

                    ObjectQuery<FireSensorEvent> query = new ObjectQuery<FireSensorEvent>(queryString.ToString(), context).Include("FireSensor");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    FireSensorEvent startEvent = null;
                    FireSensorObjectEvent e = null;
                    List<FireSensorObjectEvent> events = new List<FireSensorObjectEvent>();
                    foreach (FireSensorEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.FireSensorId != evt.FireSensorId)
                        {
                            e = new FireSensorObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsAlarm)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsAlarm)
                            continue;

                        e = new FireSensorObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new FireSensorObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetFireSensorEvents");
                return null;
            }
        }
        public IEnumerable<WaterSensorObjectEvent> GetWaterSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<WaterSensorObject> watersensors, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.WaterSensorEvents as e");
                    queryString.Append(" WHERE NOT (e.WaterSensor Is Null) AND NOT (e.WaterSensor.Term Is Null) AND NOT (e.WaterSensor.Term.Cnt Is Null) AND NOT (e.AlarmTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.AlarmTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.AlarmTime <= @edt AND e.IsAlarm = true) OR e.IsAlarm = false)");
                    if ((watersensors != null) && (watersensors.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (WaterSensorObject watersensor in watersensors)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(watersensor.Id);
                        }
                        queryString.Append(" AND e.WaterSensorId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.WaterSensor.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.WaterSensor.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.WaterSensorId, e.AlarmTime, e.IsAlarm");

                    ObjectQuery<WaterSensorEvent> query = new ObjectQuery<WaterSensorEvent>(queryString.ToString(), context).Include("WaterSensor");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    WaterSensorEvent startEvent = null;
                    WaterSensorObjectEvent e = null;
                    List<WaterSensorObjectEvent> events = new List<WaterSensorObjectEvent>();
                    foreach (WaterSensorEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.WaterSensorId != evt.WaterSensorId)
                        {
                            e = new WaterSensorObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsAlarm)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsAlarm)
                            continue;

                        e = new WaterSensorObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new WaterSensorObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetWaterSensorEvents");
                return null;
            }
        }
        public IEnumerable<GasSensorObjectEvent> GetGasSensorEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<GasSensorObject> gassensors, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.GasSensorEvents as e");
                    queryString.Append(" WHERE NOT (e.GasSensor Is Null) AND NOT (e.GasSensor.Term Is Null) AND NOT (e.GasSensor.Term.Cnt Is Null) AND NOT (e.AlarmTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.AlarmTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.AlarmTime <= @edt AND e.IsAlarm = true) OR e.IsAlarm = false)");
                    if ((gassensors != null) && (gassensors.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (GasSensorObject gassensor in gassensors)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(gassensor.Id);
                        }
                        queryString.Append(" AND e.GasSensorId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.GasSensor.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.GasSensor.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.GasSensorId, e.AlarmTime, e.IsAlarm");

                    ObjectQuery<GasSensorEvent> query = new ObjectQuery<GasSensorEvent>(queryString.ToString(), context).Include("GasSensor");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    GasSensorEvent startEvent = null;
                    GasSensorObjectEvent e = null;
                    List<GasSensorObjectEvent> events = new List<GasSensorObjectEvent>();
                    foreach (GasSensorEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.GasSensorId != evt.GasSensorId)
                        {
                            e = new GasSensorObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsAlarm)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsAlarm)
                            continue;

                        e = new GasSensorObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new GasSensorObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetGasSensorEvents");
                return null;
            }
        }
        public IEnumerable<ChannelObjectEvent> GetChannelEvents(DateTime? ndt, DateTime? edt, int minEventTime, IEnumerable<ChannelObject> channels, int region_id, int disp_id)
        {
            if (ndt != null) ndt = ((DateTime)ndt).ToLocalTime();
            if (edt != null) edt = ((DateTime)edt).ToLocalTime(); else edt = DateTime.Now;

            try
            {
                if (!CanUserServerRead(region_id, disp_id))
                    throw new FaultException("Access denied");

                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE e from ElvEntities.ChannelEvents as e");
                    queryString.Append(" WHERE NOT (e.Channel Is Null) AND NOT (e.Channel.Term Is Null) AND NOT (e.Channel.Term.Cnt Is Null) AND NOT (e.BreakTime Is Null)");
                    if (ndt != null)
                        queryString.Append(" AND e.BreakTime >= @ndt");
                    if (edt != null)
                        queryString.Append(" AND ((e.BreakTime <= @edt AND e.IsBreak = true) OR e.IsBreak = false)");
                    if ((channels != null) && (channels.Count() > 0))
                    {
                        bool first = true;
                        StringBuilder str = new StringBuilder();
                        foreach (ChannelObject channel in channels)
                        {
                            if (!first)
                                str.Append(",");
                            first = false;
                            str.Append(channel.Id);
                        }
                        queryString.Append(" AND e.ChannelId IN MultiSet (" + str.ToString() + ")");
                    }
                    if (region_id > 0)
                        queryString.Append(" AND e.Channel.Term.Cnt.RegionId=@region_id");
                    if (disp_id > 0)
                        queryString.Append(" AND e.Channel.Term.Cnt.DispId=@disp_id");
                    queryString.Append(" ORDER BY e.ChannelId, e.BreakTime, e.IsBreak");

                    ObjectQuery<ChannelEvent> query = new ObjectQuery<ChannelEvent>(queryString.ToString(), context).Include("Channel");
                    if (ndt != null)
                        query.Parameters.Add(new ObjectParameter("ndt", ndt));
                    if (edt != null)
                        query.Parameters.Add(new ObjectParameter("edt", edt));
                    if (region_id > 0)
                        query.Parameters.Add(new ObjectParameter("region_id", region_id));
                    if (disp_id > 0)
                        query.Parameters.Add(new ObjectParameter("disp_id", disp_id));
                    query.MergeOption = MergeOption.NoTracking;

                    ChannelEvent startEvent = null;
                    ChannelObjectEvent e = null;
                    List<ChannelObjectEvent> events = new List<ChannelObjectEvent>();
                    foreach (ChannelEvent evt in query.ToList())
                    {
                        if ((startEvent != null) && startEvent.ChannelId != evt.ChannelId)
                        {
                            e = new ChannelObjectEvent(startEvent, null);
                            if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                                events.Add(e);

                            startEvent = null;
                        }
                        if (evt.IsBreak)
                            startEvent = evt;
                        if (startEvent == null)
                            continue;
                        if (evt.IsBreak)
                            continue;

                        e = new ChannelObjectEvent(startEvent, evt);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);

                        startEvent = null;
                    }
                    if (startEvent != null)
                    {
                        e = new ChannelObjectEvent(startEvent, null);
                        if ((e.EndDate - e.StartDate).TotalMinutes >= minEventTime)
                            events.Add(e);
                    }

                    return events.OrderBy(x => x.StartDate);
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetChannelEvents");
                return null;
            }
        }

        #endregion

        #region Private ElvObjects Operations

        private string GetTermsQueryString(ref List<ObjectParameter> parameters, bool? isbreak, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Cnt Is Null)");
            if (isbreak != null)
                queryString.Append(" AND o.State.IsBreak=@isbreak");
            if (region_id > 0)
                queryString.Append(" AND o.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Cnt.DispId=@disp_id");

            if (isbreak != null)
                parameters.Add(new ObjectParameter("isbreak", isbreak));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetLiftsQueryString(ref List<ObjectParameter> parameters, bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isbreak != null)
                queryString.Append(" AND o.State.IsBreak=@isbreak");
            if (isrevision != null)
                queryString.Append(" AND o.State.IsRevision=@isrevision");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isbreak != null)
                parameters.Add(new ObjectParameter("isbreak", isbreak));
            if (isrevision != null)
                parameters.Add(new ObjectParameter("isrevision", isrevision));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetHoistsQueryString(ref List<ObjectParameter> parameters, bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isbreak != null)
                queryString.Append(" AND o.State.IsBreak=@isbreak");
            if (isrevision != null)
                queryString.Append(" AND o.State.IsRevision=@isrevision");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isbreak != null)
                parameters.Add(new ObjectParameter("isbreak", isbreak));
            if (isrevision != null)
                parameters.Add(new ObjectParameter("isrevision", isrevision));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetDoorsQueryString(ref List<ObjectParameter> parameters, bool? isopen, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isopen != null)
                queryString.Append(" AND o.State.IsOpen=@isopen");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isopen != null)
                parameters.Add(new ObjectParameter("isopen", isopen));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetFireSensorsQueryString(ref List<ObjectParameter> parameters, bool? isalarm, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isalarm != null)
                queryString.Append(" AND o.State.IsAlarm=@isalarm");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isalarm != null)
                parameters.Add(new ObjectParameter("isalarm", isalarm));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetWaterSensorsQueryString(ref List<ObjectParameter> parameters, bool? isalarm, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isalarm != null)
                queryString.Append(" AND o.State.IsAlarm=@isalarm");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isalarm != null)
                parameters.Add(new ObjectParameter("isalarm", isalarm));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetGasSensorsQueryString(ref List<ObjectParameter> parameters, bool? isalarm, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isalarm != null)
                queryString.Append(" AND o.State.IsAlarm=@isalarm");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isalarm != null)
                parameters.Add(new ObjectParameter("isalarm", isalarm));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetTeleControlsQueryString(ref List<ObjectParameter> parameters, bool? isenable, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isenable != null)
                queryString.Append(" AND o.State.IsEnable=@isenable");
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isenable != null)
                parameters.Add(new ObjectParameter("isenable", isenable));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }
        private string GetChannelsQueryString(ref List<ObjectParameter> parameters, bool? isbreak, int region_id, int disp_id)
        {
            StringBuilder queryString = new StringBuilder();
            queryString.Append(" WHERE (o.RecordInfo.IsDeleted = false Or o.RecordInfo.IsDeleted Is Null)");
            queryString.Append(" AND NOT (o.Term Is Null) AND NOT (o.Term.Cnt Is Null)");
            if (isbreak != null)
            {
                queryString.Append(" AND (o.State.IsErrorOn=@isbreak");
                queryString.Append(" OR o.State.IsErrorOff=@isbreak");
                queryString.Append(" OR o.State.IsNoResponse=@isbreak");
                queryString.Append(" OR ((o.State.SignalLevel < o.NormalLevel) = @isbreak))");
            }
            if (region_id > 0)
                queryString.Append(" AND o.Term.Cnt.RegionId=@region_id");
            if (disp_id > 0)
                queryString.Append(" AND o.Term.Cnt.DispId=@disp_id");

            if (isbreak != null)
                parameters.Add(new ObjectParameter("isbreak", isbreak));
            if (region_id > 0)
                parameters.Add(new ObjectParameter("region_id", region_id));
            if (disp_id > 0)
                parameters.Add(new ObjectParameter("disp_id", disp_id));

            return queryString.ToString();
        }

        private int GetTermsCount(bool? isbreak, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Terms as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetTermsQueryString(ref parameters, isbreak, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<Term> query = new ObjectQuery<Term>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetTermsCount");
                return 0;
            }
        }
        private int GetLiftsCount(bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Lifts as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetLiftsQueryString(ref parameters, isbreak, isrevision, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<Lift> query = new ObjectQuery<Lift>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetLiftsCount");
                return 0;
            }
        }
        private int GetHoistsCount(bool? isbreak, bool? isrevision, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Hoists as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetHoistsQueryString(ref parameters, isbreak, isrevision, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<Hoist> query = new ObjectQuery<Hoist>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetHoistsCount");
                return 0;
            }
        }
        private int GetDoorsCount(bool? isopen, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Doors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetDoorsQueryString(ref parameters, isopen, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<Door> query = new ObjectQuery<Door>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetDoorsCount");
                return 0;
            }
        }
        private int GetFireSensorsCount(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.FireSensors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetFireSensorsQueryString(ref parameters, isalarm, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<FireSensor> query = new ObjectQuery<FireSensor>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetFireSensorsCount");
                return 0;
            }
        }
        private int GetWaterSensorsCount(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.WaterSensors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetWaterSensorsQueryString(ref parameters, isalarm, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<WaterSensor> query = new ObjectQuery<WaterSensor>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetWaterSensorsCount");
                return 0;
            }
        }
        private int GetGasSensorsCount(bool? isalarm, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.GasSensors as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetGasSensorsQueryString(ref parameters, isalarm, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<GasSensor> query = new ObjectQuery<GasSensor>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetGasSensorsCount");
                return 0;
            }
        }
        private int GetTeleControlsCount(bool? isenable, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.TeleControls as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetTeleControlsQueryString(ref parameters, isenable, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<TeleControl> query = new ObjectQuery<TeleControl>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetTeleControlsCount");
                return 0;
            }
        }
        private int GetChannelsCount(bool? isbreak, int region_id, int disp_id)
        {
            try
            {
                using (ElvEntities context = new ElvEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE o from ElvEntities.Channels as o");

                    List<ObjectParameter> parameters = new List<ObjectParameter>();
                    string str = GetChannelsQueryString(ref parameters, isbreak, region_id, disp_id);
                    queryString.Append(str);

                    ObjectQuery<Channel> query = new ObjectQuery<Channel>(queryString.ToString(), context).Include("State");
                    foreach (ObjectParameter p in parameters)
                        query.Parameters.Add(p);
                    query.MergeOption = MergeOption.NoTracking;
                    return query.Count();
                }
            }
            catch (Exception ex)
            {
                this.handleException(ex, "GetChannelsCount");
                return 0;
            }
        }
        
        #endregion

        #region Private UserRights Function

        private bool CanUserServerRead(int? region_id, int? disp_id)
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
        private bool CanUserServerEdit(int? region_id, int? disp_id)
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

        private const string eventSource = "Elv WCF Service";
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
