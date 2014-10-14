namespace Horizont.Claims.Library.Entities
{
    using Horizont.Claims.Model;

    public class ExecutorObject
    {
        public ExecutorObject() { }
        public ExecutorObject(Executor obj)
        {
            CopyFrom(obj);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Post { get; set; }
        public string OrgName { get; set; }
        public JournalObject Journal { get; set; }
        public DispObject Disp { get; set; }

        public void CopyFrom(Executor obj)
        {
            if (obj == null)
                return;

            if ((Journal == null) && (obj.Journal != null))
                Journal = new JournalObject();
            if ((Disp == null) && (obj.Disp != null))
                Disp = new DispObject();

            Id = obj.Id;
            Name = obj.Name.Trim();
            Post = obj.Post.Trim();
            OrgName = obj.OrgName.Trim();

            if (obj.Journal != null)
                Journal.CopyFrom(obj.Journal);
            else
                Journal = null;

            if (obj.Disp != null)
                Disp.CopyFrom(obj.Disp);
            else
                Disp = null;
        }
        public void CopyTo(ref Executor obj)
        {
            if (obj == null)
                obj = new Executor();

            obj.Id = Id;
            obj.Name = Name;
            obj.Post = Post;
            obj.OrgName = OrgName;

            if (Journal != null)
                obj.JournalId = Journal.Id;
            if (Disp != null)
                obj.DispId = Disp.Id;
        }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;
            if (Disp == null)
                return false;
            return true;
        }
    }
}
