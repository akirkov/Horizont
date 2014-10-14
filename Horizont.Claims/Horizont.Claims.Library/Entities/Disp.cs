namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class DispObject
    {
        public DispObject() { }
        public DispObject(Disp obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public RegionObject Region { get; set; }

        public void CopyFrom (Disp obj)
        {
            if (obj == null)
                return;

            if ((Region == null) && (obj.Region != null))
                Region = new RegionObject();

            Id = obj.Id;
            Name = (obj.Name != null) ? obj.Name.Trim() : "";
            Address = (obj.Address != null) ? obj.Address.Trim() : "";
            Phone = (obj.Phone != null) ? obj.Phone.Trim() : "";

            if (obj.Region != null)
                Region.CopyFrom(obj.Region);
            else
                Region = null;
        }
        public void CopyTo (ref Disp obj)
        {
            if (obj == null)
                obj = new Disp();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.Address = Phone;

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
