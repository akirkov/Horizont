namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class JournalObject
    {
        public JournalObject() { }
        public JournalObject(Journal obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom(Journal obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim ();
        }
        public void CopyTo(ref Journal obj)
        {
            if (obj == null)
                obj = new Journal();

            obj.Id = Id;
            obj.Name = Name;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            return true;
        }
    }
}
