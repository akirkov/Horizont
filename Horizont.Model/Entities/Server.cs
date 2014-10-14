namespace Horizont.Model.Entities
{
    using Horizont.Model;

    public class ServerObject
    {
        public ServerObject() { }
        public ServerObject(Server obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ClaimsService { get; set; }
        public string ElvService { get; set; }

        public void CopyFrom(Server obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
            ClaimsService = obj.ClaimsService.Trim();
            ElvService = obj.ElvService.Trim();
        }
        public void CopyTo(ref Server obj)
        {
            if (obj == null)
                obj = new Server();

            obj.Id = Id;
            obj.Name = Name;
            obj.ClaimsService = ClaimsService;
            obj.ElvService = ElvService;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (string.IsNullOrWhiteSpace(ClaimsService))
                return false;
            if (string.IsNullOrWhiteSpace(ElvService))
                return false;
            return true;
        }
    }
}
