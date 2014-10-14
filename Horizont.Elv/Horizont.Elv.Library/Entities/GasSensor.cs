namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class GasSensorObject
    {
        public GasSensorObject() { }
        public GasSensorObject(GasSensor obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Idx { get; set; }
        public TermObject Term { get; set; }
        public bool IsAlarm { get; set; }
        public DateTime AlarmTime { get; set; }

        public void CopyFrom(GasSensor obj)
        {
            if (obj == null)
                return;

            if ((Term == null) && (obj.Term != null))
                Term = new TermObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Address = obj.Address.Trim();
            Idx = (obj.Idx >= 0) ? (int?)obj.Idx : null;
            IsAlarm = (obj.State != null) ? obj.State.IsAlarm : false;
            AlarmTime = ((obj.State != null) && (obj.State.AlarmTime != null)) ? (DateTime)obj.State.AlarmTime : DateTime.Now;
            AlarmTime = DateTime.SpecifyKind(AlarmTime, DateTimeKind.Local);

            if (obj.Term != null)
                Term.CopyFrom(obj.Term);
            else
                Term = null;
        }
        public void CopyTo(ref GasSensor obj)
        {
            if (obj == null)
                obj = new GasSensor();
            if (obj.State == null)
                obj.State = new GasSensorState();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.Idx = (Idx != null) ? Idx.Value : -1;
            obj.State.IsAlarm = IsAlarm;
            obj.State.AlarmTime = AlarmTime.ToLocalTime();

            if (Term != null)
                obj.TermId = Term.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (string.IsNullOrWhiteSpace(Address))
                return false;
            if ((Idx == null) || (Idx < 0) || (Idx > 23))
                return false;
            if (Term == null)
                return false;
            return true;
        }
    }
}
