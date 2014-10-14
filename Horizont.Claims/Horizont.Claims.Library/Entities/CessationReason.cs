namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class CessationReasonObject
    {
        public CessationReasonObject() { }
        public CessationReasonObject(CessationReason obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom(CessationReason obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
        }
        public void CopyTo(ref CessationReason obj)
        {
            if (obj == null)
                obj = new CessationReason();

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
