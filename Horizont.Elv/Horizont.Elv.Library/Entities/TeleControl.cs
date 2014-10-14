namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class TeleControlObject
    {
        public TeleControlObject() { }
        public TeleControlObject(TeleControl obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Idx { get; set; }
        public TermObject Term { get; set; }
        public bool IsEnable { get; set; }
        public DateTime EnableTime { get; set; }

        public void CopyFrom(TeleControl obj)
        {
            if (obj == null)
                return;

            if ((Term == null) && (obj.Term != null))
                Term = new TermObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Address = obj.Address.Trim();
            Idx = (obj.Idx >= 0) ? obj.Idx : null;
            IsEnable = (obj.State != null) ? obj.State.IsEnable : false;
            EnableTime = ((obj.State != null) && (obj.State.EnableTime != null)) ? (DateTime)obj.State.EnableTime : DateTime.Now;
            EnableTime = DateTime.SpecifyKind(EnableTime, DateTimeKind.Local);

            if (obj.Term != null)
                Term.CopyFrom(obj.Term);
            else
                Term = null;
        }
        public void CopyTo(ref TeleControl obj)
        {
            if (obj == null)
                obj = new TeleControl();
            if (obj.State == null)
                obj.State = new TeleControlState();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.Idx = (Idx != null) ? Idx : -1;
            obj.State.IsEnable = IsEnable;
            obj.State.EnableTime = EnableTime.ToLocalTime();

            if (Term != null)
                obj.TermId = Term.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (string.IsNullOrWhiteSpace(Address))
                return false;
            if ((Idx == null) || (Idx < 0) || (Idx > 2))
                return false;
            if (Term == null)
                return false;
            return true;
        }
    }
}
