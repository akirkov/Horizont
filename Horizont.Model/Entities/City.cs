namespace Horizont.Model.Entities
{
    using Horizont.Model;

    public class CityObject
    {
        public CityObject() { }
        public CityObject(int id, string name)
        {
            Id = id;
            Name = name;
        }
        public CityObject(City obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom(City obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
        }
        public void CopyTo(ref City obj)
        {
            if (obj == null)
                obj = new City();

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
