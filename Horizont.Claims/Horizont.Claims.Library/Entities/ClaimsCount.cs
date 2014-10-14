namespace Horizont.Claims.Library.Entities
{
    public class ClaimsCountObject
    {
        public int UnexecutedClaimsCount { get; set; }
        public int OverdueClaimsCount { get; set; }
        public int LegateUnexecutedClaimsCount { get; set; }
        public int BreakLiftClaimsCount { get; set; }
        public int CurrentJamLiftClaimsCount { get; set; }
        public int UnlegateExecutedLiftClaimsCount { get; set; }
        public int CurrentCessationClaimsCount { get; set; }
    }
}
