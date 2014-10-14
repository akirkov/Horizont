namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class DoorObject
    {
        public DoorObject() { }
        public DoorObject(Door obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int? Idx { get; set; }
        public TermObject Term { get; set; }
        public bool IsOpen { get; set; }
        public DateTime OpenTime { get; set; }

        public void CopyFrom(Door obj)
        {
            if (obj == null)
                return;

            if ((Term == null) && (obj.Term != null))
                Term = new TermObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Address = obj.Address.Trim();
            Idx = (obj.Idx >= 0) ? obj.Idx : null;
            IsOpen = (obj.State != null) ? obj.State.IsOpen : false;
            OpenTime = ((obj.State != null) && (obj.State.OpenTime != null)) ? (DateTime)obj.State.OpenTime : DateTime.Now;
            OpenTime = DateTime.SpecifyKind(OpenTime, DateTimeKind.Local);

            if (obj.Term != null)
                Term.CopyFrom(obj.Term);
            else
                Term = null;
        }
        public void CopyTo(ref Door obj)
        {
            if (obj == null)
                obj = new Door();
            if (obj.State == null)
                obj.State = new DoorState();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.Idx = (Idx != null) ? Idx : -1;
            obj.State.IsOpen = IsOpen;
            obj.State.OpenTime = OpenTime.ToLocalTime();

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
