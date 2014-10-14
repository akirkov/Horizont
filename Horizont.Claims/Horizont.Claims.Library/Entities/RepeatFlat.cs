namespace Horizont.Claims.Library.Entities
{
    public class RepeatFlatObject : FlatObject
    {
        public JournalObject Journal { get; set; }
        public int RepeatsCount { get; set; }

        public override bool Validate()
        {
            if (!base.Validate ())
                return false;
            if (Journal == null)
                return false;
            if (RepeatsCount <= 0)
                return false;
            return true;
        }
    }
}
