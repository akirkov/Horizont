namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class FlatObject
    {
        public FlatObject() { }
        public FlatObject(Flat obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public AddressObject Address { get; set; }
        public int Number { get; set; }
        public int? Doorway { get; set; }
        public int? Floor { get; set; }
        public string Phone { get; set; }
        public string OtherPhones { get; set; }
        public string Code { get; set; }
        public int? Square { get; set; }
        public int? RoomsCount { get; set; }
        public string Owner { get; set; }
        public int? UpFlat { get; set; }
        public int? DownFlat { get; set; }

        public void CopyFrom(Flat obj)
        {
            if (obj == null)
                return;

            if ((Address == null) && (obj.Address != null))
                Address = new AddressObject();

            Id = obj.Id;
            Number = (obj.Number > 0) ? (int)obj.Number : 0;
            Doorway = (obj.Doorway > 0) ? obj.Doorway : null;
            Floor = (obj.Floor > 0) ? obj.Floor : null;
            Phone = obj.Phone.Trim();
            OtherPhones = obj.OtherPhones.Trim();
            Code = obj.Code.Trim();
            Square = (obj.Square > 0) ? obj.Square : null;
            RoomsCount = (obj.RoomsCount > 0) ? obj.RoomsCount : null;
            Owner = obj.Owner.Trim();
            UpFlat = (obj.UpFlat > 0) ? obj.UpFlat : null;
            DownFlat = (obj.DownFlat > 0) ? obj.DownFlat : null;
            
            if (obj.Address != null)
                Address.CopyFrom(obj.Address);
            else
                Address = null;
        }
        public void CopyTo(ref Flat obj)
        {
            if (obj == null)
                obj = new Flat();

            obj.Id = Id;
            obj.Number = (Number > 0) ? Number : -1;
            obj.Doorway = (Doorway != null) ? Doorway : -1;
            obj.Floor = (Floor != null) ? Floor : -1;
            obj.Phone = Phone;
            obj.OtherPhones = OtherPhones;
            obj.Code = Code;
            obj.Square = (Square != null) ? Square : -1;
            obj.RoomsCount = (RoomsCount != null) ? RoomsCount : -1;
            obj.Owner = Owner;
            obj.UpFlat = (UpFlat != null) ? UpFlat : -1;
            obj.DownFlat = (DownFlat != null) ? DownFlat : -1;

            if (Address != null)
                obj.AddressId = Address.Id;
        }

        public virtual bool Validate()
        {
            if (Address == null)
                return false;
            if (Number <= 0)
                return false;

            return true;
        }
    }
}
