namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class AddressObject
    {
        public AddressObject() { }
        public AddressObject(Address obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string AddressStr { get; set; }
        public string Abonent { get; set; }
        public RegionObject Region { get; set; }

        public void CopyFrom(Address obj)
        {
            if (obj == null)
                return;

            if ((Region == null) && (obj.Region != null))
                Region = new RegionObject();

            Id = obj.Id;
            AddressStr = obj.AddressStr.Trim();
            Abonent = obj.Abonent.Trim ();

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
            obj.AddressStr = AddressStr;
            obj.Abonent = Abonent;

            if (Region != null)
                obj.RegionId = Region.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(AddressStr))
                return false;
            if (Region == null)
                return false;
            return true;
        }
    }
}
