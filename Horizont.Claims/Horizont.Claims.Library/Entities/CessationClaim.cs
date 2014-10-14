namespace Horizont.Claims.Library.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Horizont.Claims.Model;

    public class CessationClaimObject
    {
        public CessationClaimObject() { }
        public CessationClaimObject(CessationClaim claim)
        {
            CopyFrom(claim);
        }

        public int Id { get; set; }
        public List<AddressObject> Addresses { get; set; }
        public string AddressStr { get; set; }
        public string Abonent { get; set; }
        public int? CessationObject { get; set; }
        public string Reason { get; set; }
        public int? ObjectType { get; set; }
        public int? ObjectsCount { get; set; }
        public int? FlatsCount { get; set; }
        public string Applicant { get; set; }
        public string Basis { get; set; }
        public string BasisComment { get; set; }
        public string OrgName { get; set; }
        public string Comment { get; set; }
        public string ReceivedOperator { get; set; }
        public DateTime ReceivedTime { get; set; }
        public bool IsLegate { get; set; }
        public string ExecutedOperator { get; set; }
        public DateTime ExecutedTime { get; set; }
        public string RegNumber { get; set; }
        public DispObject Disp { get; set; }
        public bool IsDeleted { get; set; }

        public void CopyFrom (CessationClaim claim)
        {
            if (claim == null)
                return;

            if ((Addresses == null) && (claim.Addresses != null))
                Addresses = new List<AddressObject>();
            if ((Disp == null) && (claim.Disp != null))
                Disp = new DispObject();

            Id = claim.Id;
            AddressStr = claim.AddressStr.Trim ();
            Abonent = claim.Abonent.Trim ();
            CessationObject = claim.CessationObject;
            Reason = claim.Reason.Trim ();
            ObjectType = claim.ObjectType;
            ObjectsCount = (claim.ObjectsCount > 0) ? claim.ObjectsCount : null;
            FlatsCount = (claim.FlatsCount > 0) ? claim.FlatsCount : null;
            Applicant = claim.Applicant.Trim ();
            Basis = claim.Basis.Trim ();
            BasisComment = claim.BasisComment.Trim ();
            OrgName = claim.OrgName.Trim ();
            Comment = claim.Comment.Trim ();
            ReceivedOperator = claim.ReceivedOperator.Trim ();
            ReceivedTime = (claim.ReceivedTime != null) ? (DateTime)claim.ReceivedTime : DateTime.Now;
            ReceivedTime = DateTime.SpecifyKind(ReceivedTime, DateTimeKind.Local);
            IsLegate = claim.IsLegate;
            ExecutedOperator = claim.ExecutedOperator.Trim ();
            ExecutedTime = (claim.ExecutedTime != null) ? (DateTime)claim.ExecutedTime : DateTime.Now;
            ExecutedTime = DateTime.SpecifyKind(ExecutedTime, DateTimeKind.Local);
            RegNumber = claim.RegNumber.Trim();
            IsDeleted = (claim.RecordInfo.IsDeleted != null) ? (bool)claim.RecordInfo.IsDeleted : false;

            Addresses.Clear();
            foreach (Address obj in claim.Addresses)
            {
                AddressObject o = new AddressObject();
                o.CopyFrom(obj);
                Addresses.Add(o);
            }

            if (claim.Disp != null)
                Disp.CopyFrom(claim.Disp);
            else
                Disp = null;
        }
        public void CopyTo(ref CessationClaim claim, List<Address> all_addresses)
        {
            if (claim == null)
                claim = new CessationClaim();

            claim.Id = Id;
            claim.AddressStr = AddressStr;
            claim.Abonent = Abonent;
            claim.CessationObject = CessationObject;
            claim.Reason = Reason;
            claim.ObjectType = ObjectType;
            claim.ObjectsCount = (ObjectsCount != null) ? ObjectsCount : -1;
            claim.FlatsCount = (FlatsCount != null) ? FlatsCount : -1;
            claim.Applicant = Applicant;
            claim.Basis = Basis;
            claim.BasisComment = BasisComment;
            claim.OrgName = OrgName;
            claim.Comment = Comment;
            claim.ReceivedOperator = ReceivedOperator;
            claim.ReceivedTime = ReceivedTime.ToLocalTime();
            claim.IsLegate = IsLegate;
            claim.ExecutedOperator = ExecutedOperator;
            claim.ExecutedTime = ExecutedTime.ToLocalTime();
            claim.RegNumber = RegNumber;

            List<Address> addresses = (from a in all_addresses
                                       where Addresses.Count(item => item.Id == a.Id) > 0
                                       select a).ToList();
            claim.Addresses.Clear();
            foreach (Address address in addresses)
                claim.Addresses.Add(address);

            if (Disp != null)
                claim.DispId = Disp.Id;
        }

        public void CopyToHistory(ref CessationClaimHistoryItem item)
        {
            if (item == null)
                item = new CessationClaimHistoryItem();

            item.ClaimId = Id;
            item.AddressStr = AddressStr;
            item.Abonent = Abonent;
            item.CessationObject = CessationObject;
            item.Reason = Reason;
            item.ObjectType = ObjectType;
            item.ObjectsCount = (ObjectsCount != null) ? ObjectsCount : -1;
            item.FlatsCount = (FlatsCount != null) ? FlatsCount : -1;
            item.Applicant = Applicant;
            item.Basis = Basis;
            item.BasisComment = BasisComment;
            item.OrgName = OrgName;
            item.Comment = Comment;
            item.ReceivedOperator = ReceivedOperator;
            item.ReceivedTime = ReceivedTime.ToLocalTime();
            item.IsLegate = IsLegate;
            item.ExecutedOperator = ExecutedOperator;
            item.ExecutedTime = ExecutedTime.ToLocalTime();
            item.RegNumber = RegNumber;

            if (Disp != null)
                item.DispId = Disp.Id;
        }

        public bool Validate()
        {
            if (ReceivedTime == null)
                return false;
            if (Disp == null)
                return false;
            if ((Addresses == null) || (Addresses.Count == 0))
                return false;
            if (CessationObject == null)
                return false;
            if (ObjectType == null)
                return false;
            if (IsLegate && (ExecutedTime == null))
                return false;
            return true;
        }
    }
}
