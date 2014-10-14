namespace Horizont.Claims.Library.Entities
{
    using System;

    using Horizont.Claims.Model;

    public class CommonClaimObject
    {
        public CommonClaimObject() { }
        public CommonClaimObject(CommonClaim claim)
        {
            CopyFrom(claim);
        }

        public int Id { get; set; }
        public JournalObject Journal { get; set; }
        public AddressObject Address { get; set; }
        public int? Flat { get; set; }
        public int? Doorway { get; set; }
        public int? Floor { get; set; }
        public string Phone { get; set; }
        public string Code { get; set; }
        public string Owner { get; set; }
        public string CommonFailureStr { get; set; }
        public int? ExecutedPeriod { get; set; }
        public string CommonFailureComment { get; set; }
        public string ReceivedOperator { get; set; }
        public DateTime ReceivedTime { get; set; }
        public string OrgName { get; set; }
        public int? IsTeam { get; set; }
        public bool IsSubmission { get; set; }
        public string SubmissionOperator { get; set; }
        public DateTime SubmissionTime { get; set; }
        public bool IsLegate { get; set; }
        public int? Result { get; set; }
        public string Typework { get; set; }
        public string Executor { get; set; }
        public bool IsCheck { get; set; }
        public string ExecutedOperator { get; set; }
        public DateTime ExecutedTime { get; set; }
        public DispObject Disp { get; set; }
        public string RegNumber { get; set; }
        public DateTime SentTime { get; set; }
        public DateTime DeliveredTime { get; set; }
        public string DeliveredOperator { get; set; }
        public int? Status { get; set; }
        public bool IsDeleted { get; set; }
        public CommonFailureObject CommonFailure { get; set; }

        public void CopyFrom (CommonClaim claim)
        {
            if (claim == null)
                return;

            if ((Journal == null) && (claim.Journal != null))
                Journal = new JournalObject();
            if ((Address == null) && (claim.Address != null))
                Address = new AddressObject();
            if ((Disp == null) && (claim.Disp != null))
                Disp = new DispObject();
            if ((CommonFailure == null) && (claim.CommonFailure != null))
                CommonFailure = new CommonFailureObject();

            Id = claim.Id;
            Flat = (claim.Flat > 0) ? claim.Flat : null;
            Doorway = (claim.Doorway > 0) ? claim.Doorway : null;
            Floor = (claim.Floor > 0) ? claim.Floor : null;
            Phone = claim.Phone.Trim();
            Code = claim.Code.Trim ();
            Owner = claim.Owner.Trim ();
            CommonFailureStr = claim.CommonFailureStr.Trim ();
            ExecutedPeriod = claim.ExecutedPeriod;
            CommonFailureComment = claim.CommonFailureComment.Trim ();
            ReceivedOperator = claim.ReceivedOperator.Trim ();
            ReceivedTime = (claim.ReceivedTime != null) ? (DateTime)claim.ReceivedTime : DateTime.Now;
            ReceivedTime = DateTime.SpecifyKind(ReceivedTime, DateTimeKind.Local);
            OrgName = claim.OrgName.Trim();
            IsTeam = claim.IsTeam;
            IsSubmission = claim.IsSubmission;
            SubmissionOperator = claim.SubmissionOperator.Trim ();
            SubmissionTime = (claim.SubmissionTime != null) ? (DateTime)claim.SubmissionTime : DateTime.Now;
            SubmissionTime = DateTime.SpecifyKind((DateTime)SubmissionTime, DateTimeKind.Local);
            IsLegate = claim.IsLegate;
            Result = claim.Result;
            Typework = claim.Typework.Trim ();
            Executor = claim.Executor.Trim ();
            IsCheck = claim.IsCheck;
            ExecutedOperator = claim.ExecutedOperator.Trim ();
            ExecutedTime = (claim.ExecutedTime != null) ? (DateTime)claim.ExecutedTime : DateTime.Now;
            ExecutedTime = DateTime.SpecifyKind((DateTime)ExecutedTime, DateTimeKind.Local);
            RegNumber = (claim.RegNumber != null) ? claim.RegNumber.Trim() : "";
            SentTime = (claim.SentTime != null) ? (DateTime)claim.SentTime : DateTime.Now;
            SentTime = DateTime.SpecifyKind((DateTime)SentTime, DateTimeKind.Local);
            DeliveredTime = (claim.DeliveredTime != null) ? (DateTime)claim.DeliveredTime : DateTime.Now;
            DeliveredTime = DateTime.SpecifyKind((DateTime)DeliveredTime, DateTimeKind.Local);
            DeliveredOperator = claim.DeliveredOperator.Trim();
            Status = claim.Status;
            IsDeleted = (claim.RecordInfo.IsDeleted != null) ? (bool)claim.RecordInfo.IsDeleted : false;

            if (claim.Journal != null)
                Journal.CopyFrom(claim.Journal);
            else
                Journal = null;

            if (claim.Address != null)
                Address.CopyFrom(claim.Address);
            else
                Address = null;

            if (claim.Disp != null)
                Disp.CopyFrom(claim.Disp);
            else
                Disp = null;

            if (claim.CommonFailure != null)
                CommonFailure.CopyFrom(claim.CommonFailure);
            else
                CommonFailure = null;
        }
        public void CopyTo(ref CommonClaim claim)
        {
            if (claim == null)
                claim = new CommonClaim();

            claim.Id = Id;
            claim.Flat = (Flat != null) ? Flat : -1;
            claim.Doorway = (Doorway != null) ? Doorway : -1;
            claim.Floor = (Floor != null) ? Floor : -1;
            claim.Phone = Phone;
            claim.Code = Code;
            claim.Owner = Owner;
            claim.CommonFailureStr = CommonFailureStr;
            claim.ExecutedPeriod = ExecutedPeriod;
            claim.CommonFailureComment = CommonFailureComment;
            claim.ReceivedOperator = ReceivedOperator;
            claim.ReceivedTime = ReceivedTime.ToLocalTime ();
            claim.OrgName = OrgName;
            claim.IsTeam = IsTeam;
            claim.IsSubmission = IsSubmission;
            claim.SubmissionOperator = SubmissionOperator;
            claim.SubmissionTime = SubmissionTime.ToLocalTime ();
            claim.IsLegate = IsLegate;
            claim.Result = Result;
            claim.Typework = Typework;
            claim.Executor = Executor;
            claim.IsCheck = IsCheck;
            claim.ExecutedOperator = ExecutedOperator;
            claim.ExecutedTime = ExecutedTime.ToLocalTime ();
            claim.RegNumber = RegNumber;
            claim.SentTime = SentTime.ToLocalTime();
            claim.DeliveredTime = DeliveredTime.ToLocalTime();
            claim.DeliveredOperator = DeliveredOperator;
            claim.Status = Status;

            if (Journal != null)
                claim.JournalId = Journal.Id;
            if (Address != null)
                claim.AddressId = Address.Id;
            if (Disp != null)
                claim.DispId = Disp.Id;
            if (CommonFailure != null)
                claim.CommonFailureId = CommonFailure.Id;
        }

        public void CopyToHistory(ref CommonClaimHistoryItem item)
        {
            if (item == null)
                item = new CommonClaimHistoryItem();

            item.ClaimId = Id;
            item.Flat = (Flat != null) ? Flat : -1;
            item.Doorway = (Doorway != null) ? Doorway : -1;
            item.Floor = (Floor != null) ? Floor : -1;
            item.Phone = Phone;
            item.Code = Code;
            item.Owner = Owner;
            item.CommonFailureStr = CommonFailureStr;
            item.ExecutedPeriod = ExecutedPeriod;
            item.CommonFailureComment = CommonFailureComment;
            item.ReceivedOperator = ReceivedOperator;
            item.ReceivedTime = ReceivedTime.ToLocalTime();
            item.OrgName = OrgName;
            item.IsTeam = IsTeam;
            item.IsSubmission = IsSubmission;
            item.SubmissionOperator = SubmissionOperator;
            item.SubmissionTime = SubmissionTime.ToLocalTime();
            item.IsLegate = IsLegate;
            item.Result = Result;
            item.Typework = Typework;
            item.Executor = Executor;
            item.IsCheck = IsCheck;
            item.ExecutedOperator = ExecutedOperator;
            item.ExecutedTime = ExecutedTime.ToLocalTime();
            item.RegNumber = RegNumber;

            if (Journal != null)
                item.JournalId = Journal.Id;
            if (Address != null)
                item.AddressId = Address.Id;
            if (Disp != null)
                item.DispId = Disp.Id;
            if (CommonFailure != null)
                item.CommonFailureId = CommonFailure.Id;
        }

        public string GetStatusStr()
        {
            if (IsDeleted)
                return "Удалена";
            if (Status == 1)
                return "Доставлена";
            if (Status == 2)
            {
                if (IsLegate && (Result == 0))
                    return "Выполенена";
                if (IsLegate && (Result == 1))
                    return "Отписана, но невыполнена";
                if (IsSubmission)
                    return "Передана на исполнение";
                return "Принята в работу";
            }
            return "Отправлена";
        }

        public bool Validate()
        {
            if (Status == null)
                return false;
            if (SentTime == null)
                return false;
            if ((Status == 1) && (DeliveredTime == null))
                return false;
            if ((Status == 2) && (ReceivedTime == null))
                return false;
            if (Disp == null)
                return false;
            if (Journal == null)
                return false;
            if (Address == null)
                return false;
            if (string.IsNullOrWhiteSpace(CommonFailureStr))
                return false;
            if ((ExecutedPeriod == null) || (ExecutedPeriod <= 0))
                return false;
            if (IsSubmission && (SubmissionTime == null))
                return false;
            if (IsLegate && (ExecutedTime == null))
                return false;
            if (IsSubmission && (IsTeam == null))
                return false;
            if (IsLegate && (Result == null))
                return false;
            if (IsLegate && !IsSubmission)
                return false;
            return true;
        }
    }
}
