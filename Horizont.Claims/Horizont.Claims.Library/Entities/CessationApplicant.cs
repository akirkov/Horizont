namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class CessationApplicantObject
    {
        public CessationApplicantObject() { }
        public CessationApplicantObject(CessationApplicant obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public void CopyFrom(CessationApplicant obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
        }
        public void CopyTo(ref CessationApplicant obj)
        {
            if (obj == null)
                obj = new CessationApplicant();

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
