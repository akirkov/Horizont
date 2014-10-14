namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class FailuresGroupObject
    {
        public FailuresGroupObject() { }
        public FailuresGroupObject(FailuresGroup obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public JournalObject Journal { get; set; }

        public void CopyFrom(FailuresGroup obj)
        {
            if (obj == null)
                return;

            if ((Journal == null) && (obj.Journal != null))
                Journal = new JournalObject();

            Id = obj.Id;
            Name = obj.Name.Trim();

            if (obj.Journal != null)
                Journal.CopyFrom(obj.Journal);
            else
                Journal = null;
        }
        public void CopyTo(ref FailuresGroup obj)
        {
            if (obj == null)
                obj = new FailuresGroup();

            obj.Id = Id;
            obj.Name = Name;

            if (Journal != null)
                obj.JournalId = Journal.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (Journal == null)
                return false;
            return true;
        }
    }
}
