namespace Horizont.Model.Entities
{
    public class RuleObject
    {
        public int Id { get; set; }
        public CityObject City { get; set; }
        public RegionObject Region { get; set; }
        public DispObject Disp { get; set; }
        public int Permission { get; set; }
    }
}
