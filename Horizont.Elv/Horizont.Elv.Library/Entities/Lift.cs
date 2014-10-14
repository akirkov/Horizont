namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class LiftObject
    {
        public LiftObject() { }
        public LiftObject(Lift obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Idx { get; set; }
        public TermObject Term { get; set; }
        public bool IsBreak { get; set; }
        public DateTime BreakTime { get; set; }
        public bool IsRevision { get; set; }
        public DateTime RevisionTime { get; set; }

        public void CopyFrom(Lift obj)
        {
            if (obj == null)
                return;

            if ((Term == null) && (obj.Term != null))
                Term = new TermObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Address = obj.Address.Trim();
            Idx = (obj.Idx >= 0) ? obj.Idx : null;
            IsBreak = (obj.State != null) ? obj.State.IsBreak : false;
            BreakTime = ((obj.State != null) && (obj.State.BreakTime != null)) ? (DateTime)obj.State.BreakTime : DateTime.Now;
            BreakTime = DateTime.SpecifyKind(BreakTime, DateTimeKind.Local);
            IsRevision = (obj.State != null) ? obj.State.IsRevision : false;
            RevisionTime = ((obj.State != null) && (obj.State.RevisionTime != null)) ? (DateTime)obj.State.RevisionTime : DateTime.Now;
            RevisionTime = DateTime.SpecifyKind(RevisionTime, DateTimeKind.Local);

            if (obj.Term != null)
                Term.CopyFrom(obj.Term);
            else
                Term = null;
        }
        public void CopyTo(ref Lift obj)
        {
            if (obj == null)
                obj = new Lift();
            if (obj.State == null)
                obj.State = new LiftState();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.Idx = (Idx != null) ? Idx : -1;
            obj.State.IsBreak = IsBreak;
            obj.State.BreakTime = BreakTime.ToLocalTime();
            obj.State.IsRevision = IsRevision;
            obj.State.RevisionTime = RevisionTime.ToLocalTime();

            if (Term != null)
                obj.TermId = Term.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (string.IsNullOrWhiteSpace(Address))
                return false;
            if ((Idx == null) || (Idx < 0) || (Idx > 3))
                return false;
            if (Term == null)
                return false;
            return true;
        }
    }
}
