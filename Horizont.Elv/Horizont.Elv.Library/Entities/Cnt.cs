namespace Horizont.Elv.Library.Entities
{
    using Horizont.Elv.Model;

    public class CntObject
    {
        public CntObject() { }
        public CntObject(Cnt obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? RegionId { get; set; }
        public int? DispId { get; set; }
        public int? OrgId { get; set; }

        public void CopyFrom(Cnt obj)
        {
            if (obj == null)
                return;


            Id = obj.Id;
            Name = obj.Name.Trim();
            RegionId = (obj.RegionId > 0) ? obj.RegionId : null;
            DispId = (obj.DispId > 0) ? obj.DispId : null;
            OrgId = (obj.OrgId > 0) ? obj.OrgId : null;
        }
        public void CopyTo(ref Cnt obj)
        {
            if (obj == null)
                obj = new Cnt();

            obj.Id = Id;
            obj.Name = Name;
            obj.RegionId = (RegionId != null) ? RegionId : 0;
            obj.DispId = (DispId != null) ? DispId : 0;
            obj.OrgId = (OrgId != null) ? OrgId : 0;

        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            return true;
        }
    }
}
