namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class CommonFailureObject
    {
        public CommonFailureObject() { }
        public CommonFailureObject(CommonFailure obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? ExecutedPeriod { get; set; }
        public JournalObject Journal { get; set; }
        public int? Spec { get; set; }

        public void CopyFrom(CommonFailure obj)
        {
            if (obj == null)
                return;

            if ((Journal == null) && (obj.Journal != null))
                Journal = new JournalObject();

            Id = obj.Id;
            Name = obj.Name.Trim ();
            ExecutedPeriod = (obj.ExecutedPeriod > 0) ? obj.ExecutedPeriod : null;
            Spec = obj.Spec;

            if (obj.Journal != null)
                Journal.CopyFrom(obj.Journal);
            else
                Journal = null;
        }
        public void CopyTo(ref CommonFailure obj)
        {
            if (obj == null)
                obj = new CommonFailure();

            obj.Id = Id;
            obj.Name = Name;
            obj.ExecutedPeriod = (ExecutedPeriod != null) ? ExecutedPeriod : -1;
            obj.Spec = Spec;

            if (Journal != null)
                obj.JournalId = Journal.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if ((ExecutedPeriod == null) || (ExecutedPeriod <= 0))
                return false;
            if (Journal == null)
                return false;
            if (Spec == null)
                return false;
            return true;
        }
    }
}
