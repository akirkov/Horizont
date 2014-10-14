namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class OrganizationObject
    {
        public OrganizationObject() { }
        public OrganizationObject(Organization obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom(Organization obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
        }
        public void CopyTo(ref Organization obj)
        {
            if (obj == null)
                obj = new Organization();

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