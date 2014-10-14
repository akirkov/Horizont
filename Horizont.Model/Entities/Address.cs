namespace Horizont.Model.Entities
{
    using Horizont.Model;

    public class AddressObject
    {
        public AddressObject() { }
        public AddressObject(Address obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public RegionObject Region { get; set; }
        public int LocalId { get; set; }

        public void CopyFrom(Address obj)
        {
            if (obj == null)
                return;

            if ((Region == null) && (obj.Region != null))
                Region = new RegionObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            LocalId = obj.LocalId;

            if (obj.Region != null)
                Region.CopyFrom(obj.Region);
            else
                Region = null;
        }
        public void CopyTo(ref Address obj)
        {
            if (obj == null)
                obj = new Address();

            obj.Id = Id;
            obj.Name = Name;
            obj.LocalId = LocalId;

            if (Region != null)
                obj.RegionId = Region.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (Region == null)
                return false;
            return true;
        }
    }
}
