namespace Horizont.Elv.Library.Entities
{
    using System;

    using Horizont.Elv.Model;

    public class ChannelObject
    {
        public ChannelObject() { }
        public ChannelObject(Channel obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int NormalLevel { get; set; }
        public int? Idx { get; set; }
        public TermObject Term { get; set; }
        public bool? IsErrorOn { get; set; }
        public bool? IsErrorOff { get; set; }
        public int? SignalLevel { get; set; }
        public bool? IsNoResponse { get; set; }
        public DateTime CheckTime { get; set; }
        
        public void CopyFrom(Channel obj)
        {
            if (obj == null)
                return;

            if ((Term == null) && (obj.Term != null))
                Term = new TermObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Address = obj.Address.Trim();
            NormalLevel = (obj.NormalLevel != null) ? (int)obj.NormalLevel : 10;
            Idx = (obj.Idx >= 0) ? obj.Idx : null;
            IsErrorOn = (obj.State != null) ? obj.State.IsErrorOn : false;
            IsErrorOff = (obj.State != null) ? obj.State.IsErrorOff : false;
            SignalLevel = (obj.State != null) ? obj.State.SignalLevel : 0;
            IsNoResponse = (obj.State != null) ? obj.State.IsNoResponse : false;
            CheckTime = ((obj.State != null) && (obj.State.CheckTime != null)) ? (DateTime)obj.State.CheckTime : DateTime.Now;
            CheckTime = DateTime.SpecifyKind(CheckTime, DateTimeKind.Local);

            if (obj.Term != null)
                Term.CopyFrom(obj.Term);
            else
                Term = null;
        }
        public void CopyTo(ref Channel obj)
        {
            if (obj == null)
                obj = new Channel();
            if (obj.State == null)
                obj.State = new ChannelState();

            obj.Id = Id;
            obj.Name = Name;
            obj.Address = Address;
            obj.NormalLevel = NormalLevel;
            obj.Idx = (Idx != null) ? Idx : -1;
            obj.State.IsErrorOn = (IsErrorOn != null) ? IsErrorOn : false;
            obj.State.IsErrorOff = (IsErrorOff != null) ? IsErrorOff : false;
            obj.State.SignalLevel = (SignalLevel != null) ? SignalLevel : 0;
            obj.State.IsNoResponse = (IsNoResponse != null) ? IsNoResponse : false;
            obj.State.CheckTime = CheckTime.ToLocalTime();

            if (Term != null)
                obj.TermId = Term.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (string.IsNullOrWhiteSpace(Address))
                return false;
            if (NormalLevel < 0)
                return false;
            if ((Idx == null) || (Idx < 0) || (Idx > 5))
                return false;
            if (Term == null)
                return false;
            if ((SignalLevel != null) && (SignalLevel < 0))
                return false;
            return true;
        }
    }
}
