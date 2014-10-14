namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class TermObject
    {   
        public TermObject() { }
        public TermObject(Term obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Idx { get; set; }
        public int? TransIdx { get; set; }
        public CntObject Cnt { get; set; }
        public bool IsBreak { get; set; }
        public DateTime BreakTime { get; set; }

        public void CopyFrom(Term obj)
        {
            if (obj == null)
                return;

            if ((Cnt == null) && (obj.Cnt != null))
                Cnt = new CntObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Address = obj.Address.Trim();
            Idx = (obj.Idx >= 0) ? obj.Idx : null;
            TransIdx = (obj.TransIdx >= 0) ? obj.TransIdx : null;
            IsBreak = (obj.State != null) ? obj.State.IsBreak : false;
            BreakTime = ((obj.State != null) && (obj.State.BreakTime != null)) ? (DateTime)obj.State.BreakTime : DateTime.Now;
            BreakTime = DateTime.SpecifyKind(BreakTime, DateTimeKind.Local);

            if (obj.Cnt != null)
                Cnt.CopyFrom(obj.Cnt);
            else
                Cnt = null;
        }
        public void CopyTo(ref Term obj)
        {
            if (obj == null)
                obj = new Term();
            if (obj.State == null)
                obj.State = new TermState();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.Idx = (Idx != null) ? Idx : -1;
            obj.TransIdx = (TransIdx != null) ? TransIdx : -1;
            obj.State.IsBreak = IsBreak;
            obj.State.BreakTime = BreakTime.ToLocalTime();

            if (Cnt != null)
                obj.CntId = Cnt.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (string.IsNullOrWhiteSpace(Address))
                return false;
            if ((Idx == null) || (Idx < 0) || (Idx > 63))
                return false;
            if ((TransIdx == null) || (TransIdx < 0) || (TransIdx > 3))
                return false;
            if (Cnt == null)
                return false;
            return true;
        }
    }
}
