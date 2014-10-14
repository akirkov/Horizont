namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class LiftFailureObject
    {
        public LiftFailureObject() { }
        public LiftFailureObject(LiftFailure obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsStay { get; set; }
        public bool IsJam { get; set; }

        public void CopyFrom(LiftFailure obj)
        {
            if (obj == null)
                return;

            Id = obj.Id;
            Name = obj.Name.Trim();
            IsStay = obj.IsStay;
            IsJam = obj.IsJam;
        }
        public void CopyTo(ref LiftFailure obj)
        {
            if (obj == null)
                obj = new LiftFailure();

            obj.Id = Id;
            obj.Name = Name;
            obj.IsStay = IsStay;
            obj.IsJam = IsJam;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            return true;
        }
    }
}
