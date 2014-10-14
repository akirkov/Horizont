namespace Horizont.Model.Entities
{
    public class DispObject
    {
        public DispObject(int id, string name, RegionObject region)
        {
            Id = id;
            Name = name;
            Region = region;
        }
        public DispObject() : this (-1, "", null)
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public RegionObject Region { get; set; }

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
