namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class CessationBasisObject
    {
        public CessationBasisObject() { }
        public CessationBasisObject(CessationBasis obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom(CessationBasis obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
        }
        public void CopyTo(ref CessationBasis obj)
        {
            if (obj == null)
                obj = new CessationBasis();

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
