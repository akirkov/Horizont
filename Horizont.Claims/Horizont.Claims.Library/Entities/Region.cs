namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class RegionObject
    {
        public RegionObject() { }
        public RegionObject(Region obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom (Region obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim ();
        }
        public void CopyTo (ref Region obj)
        {
            if (obj == null)
                obj = new Region();

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
