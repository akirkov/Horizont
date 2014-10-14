namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class ElvObjectEvent
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual bool Validate()
        {
            if (StartDate == null)
                return false;
            if (EndDate == null)
                return false;
            return true;
        }
    }

    public class TermObjectEvent : ElvObjectEvent
    {
        public TermObjectEvent() { }
        public TermObjectEvent(TermEvent startevent, TermEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public TermObject Term { get; set; }

        public void CopyFrom(TermEvent startevent, TermEvent endevent)
        {
            StartDate = (DateTime)startevent.BreakTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.BreakTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            if (Term == null)
                Term = new TermObject();
            Term.CopyFrom(startevent.Term);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (Term == null)
                return false;
            return true;
        }
    }

    public class LiftObjectEvent : ElvObjectEvent
    {
        public LiftObjectEvent() { }
        public LiftObjectEvent(LiftEvent startevent, LiftEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public LiftObject Lift { get; set; }
        public string Reason { get; set; }

        public void CopyFrom(LiftEvent startevent, LiftEvent endevent)
        {
            StartDate = (DateTime)startevent.BreakTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.BreakTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            Reason = startevent.Reason;
            if (Lift == null)
                Lift = new LiftObject();
            Lift.CopyFrom(startevent.Lift);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (Lift == null)
                return false;
            return true;
        }
    }

    public class HoistObjectEvent : ElvObjectEvent
    {
        public HoistObjectEvent() { }
        public HoistObjectEvent(HoistEvent startevent, HoistEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public HoistObject Hoist { get; set; }
        public string Reason { get; set; }

        public void CopyFrom(HoistEvent startevent, HoistEvent endevent)
        {
            StartDate = (DateTime)startevent.BreakTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.BreakTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            Reason = startevent.Reason;
            if (Hoist == null)
                Hoist = new HoistObject();
            Hoist.CopyFrom(startevent.Hoist);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (Hoist == null)
                return false;
            return true;
        }
    }

    public class DoorObjectEvent : ElvObjectEvent
    {
        public DoorObjectEvent() { }
        public DoorObjectEvent(DoorEvent startevent, DoorEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public DoorObject Door { get; set; }

        public void CopyFrom(DoorEvent startevent, DoorEvent endevent)
        {
            StartDate = (DateTime)startevent.OpenTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.OpenTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            if (Door == null)
                Door = new DoorObject();
            Door.CopyFrom(startevent.Door);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (Door == null)
                return false;
            return true;
        }
    }

    public class FireSensorObjectEvent : ElvObjectEvent
    {
        public FireSensorObjectEvent() { }
        public FireSensorObjectEvent(FireSensorEvent startevent, FireSensorEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public FireSensorObject FireSensor { get; set; }

        public void CopyFrom(FireSensorEvent startevent, FireSensorEvent endevent)
        {
            StartDate = (DateTime)startevent.AlarmTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.AlarmTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            if (FireSensor == null)
                FireSensor = new FireSensorObject();
            FireSensor.CopyFrom(startevent.FireSensor);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (FireSensor == null)
                return false;
            return true;
        }
    }

    public class WaterSensorObjectEvent : ElvObjectEvent
    {
        public WaterSensorObjectEvent() { }
        public WaterSensorObjectEvent(WaterSensorEvent startevent, WaterSensorEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public WaterSensorObject WaterSensor { get; set; }

        public void CopyFrom(WaterSensorEvent startevent, WaterSensorEvent endevent)
        {
            StartDate = (DateTime)startevent.AlarmTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.AlarmTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            if (WaterSensor == null)
                WaterSensor = new WaterSensorObject();
            WaterSensor.CopyFrom(startevent.WaterSensor);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (WaterSensor == null)
                return false;
            return true;
        }
    }

    public class GasSensorObjectEvent : ElvObjectEvent
    {
        public GasSensorObjectEvent() { }
        public GasSensorObjectEvent(GasSensorEvent startevent, GasSensorEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public GasSensorObject GasSensor { get; set; }

        public void CopyFrom(GasSensorEvent startevent, GasSensorEvent endevent)
        {
            StartDate = (DateTime)startevent.AlarmTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.AlarmTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            if (GasSensor == null)
                GasSensor = new GasSensorObject();
            GasSensor.CopyFrom(startevent.GasSensor);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (GasSensor == null)
                return false;
            return true;
        }
    }

    public class ChannelObjectEvent : ElvObjectEvent
    {
        public ChannelObjectEvent() { }
        public ChannelObjectEvent(ChannelEvent startevent, ChannelEvent endevent)
        {
            CopyFrom(startevent, endevent);
        }

        public ChannelObject Channel { get; set; }
        public string Reason { get; set; }

        public void CopyFrom(ChannelEvent startevent, ChannelEvent endevent)
        {
            StartDate = (DateTime)startevent.BreakTime;
            StartDate = DateTime.SpecifyKind((DateTime)StartDate, DateTimeKind.Local);
            EndDate = (endevent != null) ? (DateTime)endevent.BreakTime : DateTime.Now;
            EndDate = DateTime.SpecifyKind((DateTime)EndDate, DateTimeKind.Local);
            Reason = startevent.Reason;
            if (Channel == null)
                Channel = new ChannelObject();
            Channel.CopyFrom(startevent.Channel);
        }
        public override bool Validate()
        {
            if (!base.Validate())
                return false;
            if (Channel == null)
                return false;
            return true;
        }
    }
}
