namespace Horizont.Model.Entities
{
    using Horizont.Model;

    public class RegionObject
    {
        public RegionObject() { }
        public RegionObject(int id, string name, ServerObject server, int local_id, CityObject city)
        {
            Id = id;
            Name = name;
            Server = server;
            LocalId = local_id;
            City = city;
        }
        public RegionObject(Region obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public ServerObject Server { get; set; }
        public int LocalId { get; set; }
        public CityObject City { get; set; }

        public void CopyFrom(Region obj)
        {
            if (obj == null)
                return;

            if ((Server == null) && (obj.Server != null))
                Server = new ServerObject();
            if ((City == null) && (obj.City != null))
                City = new CityObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            LocalId = obj.LocalId;

            if (obj.Server != null)
                Server.CopyFrom(obj.Server);
            else
                Server = null;

            if (obj.City != null)
                City.CopyFrom(obj.City);
            else
                City = null;
        }
        public void CopyTo(ref Region obj)
        {
            if (obj == null)
                obj = new Region();

            obj.Id = Id;
            obj.Name = Name;
            obj.LocalId = LocalId;

            if (Server != null)
                obj.ServerId = Server.Id;
            if (City != null)
                obj.CityId = City.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (Server == null)
                return false;
            if (City == null)
                return false;
            return true;
        }
    }
}
