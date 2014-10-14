namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class EmployeeInfoObject
    {
        public EmployeeInfoObject() { }
        public EmployeeInfoObject(EmployeeInfo obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Post { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public RegionObject Region { get; set; }

        public void CopyFrom(EmployeeInfo obj)
        {
            if (obj == null)
                return;

            if ((Region == null) && (obj.Region != null))
                Region = new RegionObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Post = obj.Post.Trim();
            Phone = obj.Phone.Trim();
            Address = obj.Address.Trim();

            if (obj.Region != null)
                Region.CopyFrom(obj.Region);
            else
                Region = null;
        }
        public void CopyTo(ref EmployeeInfo obj)
        {
            if (obj == null)
                obj = new EmployeeInfo();

            obj.Id = Id;
            obj.Name = Name;
            obj.Post = Post;
            obj.Phone = Phone;
            obj.Address = Address;

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
