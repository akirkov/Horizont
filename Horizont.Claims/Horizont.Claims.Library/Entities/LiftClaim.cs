namespace Horizont.Claims.Library.Entities
{
    using System;

    using Horizont.Claims.Model;

    public class LiftClaimObject
    {
        public LiftClaimObject() { }
        public LiftClaimObject(LiftClaim claim)
        {
            CopyFrom(claim);
        }

        public int Id { get; set; }
        public AddressObject Address { get; set; }
        public int? Doorway { get; set; }
        public int? LiftType { get; set; }
        public string Code { get; set; }
        public string LiftFailureStr { get; set; }
        public string LiftFailureComment { get; set; }
        public int? Floor { get; set; }
        public bool IsJam { get; set; }
        public bool IsStay { get; set; }
        public string ReceivedOperator { get; set; }
        public DateTime ReceivedTime { get; set; }
        public bool IsLegate { get; set; }
        public int? Result { get; set; }
        public string Reason { get; set; }
        public string Typework { get; set; }
        public string Executor { get; set; }
        public bool IsCheck { get; set; }
        public DateTime ExecutedTime { get; set; }
        public string ExecutedOperator { get; set; }
        public DispObject Disp { get; set; }
        public string RegNumber { get; set; }
        public bool? IsSubmission { get; set; }
        public string OrgName { get; set; }
        public string SubmissionOperator { get; set; }
        public DateTime SubmissionTime { get; set; }
        public int? OtisId { get; set; }
        public int? StatusId { get; set; }
        public int? ChangeId { get; set; }
        public bool IsDeleted { get; set; }

        public void CopyFrom(LiftClaim claim)
        {
            if (claim == null)
                return;

            if ((Address == null) && (claim.Address != null))
                Address = new AddressObject();
            if ((Disp == null) && (claim.Disp != null))
                Disp = new DispObject();

            Id = claim.Id;
            Doorway = (claim.Doorway > 0) ? claim.Doorway : null;
            LiftType = claim.LiftType;
            Code = claim.Code.Trim ();
            LiftFailureStr = claim.LiftFailureStr.Trim ();
            LiftFailureComment = claim.LiftFailureComment.Trim ();
            Floor = (claim.Floor > 0) ? claim.Floor : null;
            IsJam = claim.IsJam;
            IsStay = claim.IsStay;
            ReceivedOperator = claim.ReceivedOperator.Trim ();
            ReceivedTime = (claim.ReceivedTime != null) ? (DateTime)claim.ReceivedTime : DateTime.Now;
            ReceivedTime = DateTime.SpecifyKind(ReceivedTime, DateTimeKind.Local);
            IsLegate = claim.IsLegate;
            Result = claim.Result;
            Reason = claim.Reason.Trim ();
            Typework = claim.Typework.Trim ();
            Executor = claim.Executor.Trim ();
            IsCheck = claim.IsCheck;
            ExecutedTime = (claim.ExecutedTime != null) ? (DateTime)claim.ExecutedTime : DateTime.Now;
            ExecutedTime = DateTime.SpecifyKind(ExecutedTime, DateTimeKind.Local);
            ExecutedOperator = claim.ExecutedOperator.Trim();
            RegNumber = claim.RegNumber.Trim ();
            IsSubmission = claim.IsSubmission;
            OrgName = claim.OrgName.Trim ();
            SubmissionOperator = claim.SubmissionOperator.Trim ();
            SubmissionTime = (claim.SubmissionTime != null) ? (DateTime)claim.SubmissionTime : DateTime.Now;
            SubmissionTime = DateTime.SpecifyKind(SubmissionTime, DateTimeKind.Local);
            OtisId = claim.OtisId;
            StatusId = claim.StatusId;
            ChangeId = claim.ChangeId;
            IsDeleted = (claim.RecordInfo.IsDeleted != null) ? (bool)claim.RecordInfo.IsDeleted : false;

            if (claim.Address != null)
                Address.CopyFrom(claim.Address);
            else
                Address = null;

            if (claim.Disp != null)
                Disp.CopyFrom(claim.Disp);
            else
                Disp = null;
        }
        public void CopyTo(ref LiftClaim claim)
        {
            if (claim == null)
                claim = new LiftClaim ();

            claim.Id = Id;
            claim.Doorway = (Doorway != null) ? Doorway : -1;
            claim.LiftType = LiftType;
            claim.Code = Code;
            claim.LiftFailureStr = LiftFailureStr;
            claim.LiftFailureComment = LiftFailureComment;
            claim.Floor = (Floor != null) ? Floor : -1;
            claim.IsJam = IsJam;
            claim.IsStay = IsStay;
            claim.ReceivedOperator = ReceivedOperator;
            claim.ReceivedTime = ReceivedTime.ToLocalTime();
            claim.IsLegate = IsLegate;
            claim.Result = Result;
            claim.Reason = Reason;
            claim.Typework = Typework;
            claim.Executor = Executor;
            claim.IsCheck = IsCheck;
            claim.ExecutedTime = ExecutedTime.ToLocalTime();
            claim.ExecutedOperator = ExecutedOperator;
            claim.RegNumber = RegNumber;
            claim.IsSubmission = IsSubmission;
            claim.OrgName = OrgName;
            claim.SubmissionOperator = SubmissionOperator;
            claim.SubmissionTime = SubmissionTime.ToLocalTime ();
            claim.OtisId = OtisId;
            claim.StatusId = StatusId;
            claim.ChangeId = ChangeId;

            if (Address != null)
                claim.AddressId = Address.Id;
            if (Disp != null)
                claim.DispId = Disp.Id;
        }

        public void CopyToHistory(ref LiftClaimHistoryItem item)
        {
            if (item == null)
                item = new LiftClaimHistoryItem();

            item.ClaimId = Id;
            item.Doorway = Doorway;
            item.LiftType = LiftType;
            item.Code = Code;
            item.LiftFailureStr = LiftFailureStr;
            item.LiftFailureComment = LiftFailureComment;
            item.Floor = (Floor != null) ? Floor : -1;
            item.IsJam = IsJam;
            item.IsStay = IsStay;
            item.ReceivedOperator = ReceivedOperator;
            item.ReceivedTime = ReceivedTime.ToLocalTime();
            item.IsLegate = IsLegate;
            item.Result = Result;
            item.Reason = Reason;
            item.Typework = Typework;
            item.Executor = Executor;
            item.IsCheck = IsCheck;
            item.ExecutedTime = ExecutedTime.ToLocalTime();
            item.ExecutedOperator = ExecutedOperator;
            item.RegNumber = RegNumber;
            item.IsSubmission = IsSubmission;
            item.OrgName = OrgName;
            item.SubmissionOperator = SubmissionOperator;
            item.SubmissionTime = SubmissionTime.ToLocalTime();

            if (Address != null)
                item.AddressId = Address.Id;
            if (Disp != null)
                item.DispId = Disp.Id;
        }

        public bool Validate()
        {
            if (ReceivedTime == null)
                return false;
            if (Disp == null)
                return false;
            if (Address == null)
                return false;
            if (LiftType == null)
                return false;
            if (string.IsNullOrWhiteSpace(LiftFailureStr))
                return false;
            if (IsSubmission == null)
                return false;
            if ((bool)IsSubmission && (SubmissionTime == null))
                return false;
            if (IsLegate && (ExecutedTime == null))
                return false;
            if (IsLegate && (Result == null))
                return false;
            if (IsLegate && !(bool)IsSubmission)
                return false;
            return true;
        }
    }
}
