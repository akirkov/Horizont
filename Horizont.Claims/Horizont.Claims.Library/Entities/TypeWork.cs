namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class TypeWorkObject
    {
        public TypeWorkObject() { }
        public TypeWorkObject(TypeWork obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int FailureId { get; set; }
        public int JournalId { get; set; }

        public void CopyFrom(TypeWork obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
            FailureId = (int)obj.FailureId;
            JournalId = (int)obj.JournalId;
        }
        public void CopyTo(ref TypeWork obj)
        {
            if (obj == null)
                obj = new TypeWork();

            obj.Id = Id;
            obj.Name = Name;
            obj.FailureId = FailureId;
            obj.JournalId = JournalId;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            return true;
        }
    }
}
