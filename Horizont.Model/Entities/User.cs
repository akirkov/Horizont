namespace Horizont.Model.Entities
{
    using System;
    using System.Text.RegularExpressions;

    public class UserObject
    {
        public bool IsActivated { get; set; }    
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Fathername { get; set; }
        public string Post { get; set; }
        public AddressObject Address { get; set; }
        public int? Flat { get; set; }
        public string Phone { get; set; }
        public string[]     Roles { get; set; }

        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Username))
                return false;
            if (string.IsNullOrWhiteSpace(Email))
                return false;
            if (string.IsNullOrWhiteSpace(Password))
                return false;
            if (string.IsNullOrWhiteSpace(Surname))
                return false;
            if ((Array.IndexOf(Roles, "Residents") >= 0) && string.IsNullOrWhiteSpace(Name))
                return false;
            if ((Array.IndexOf(Roles, "Residents") >= 0) && (Address == null))
                return false;
            if ((Array.IndexOf(Roles, "Residents") >= 0) && ((Flat == null) || (Flat <= 0)))
                return false;
            if ((Array.IndexOf(Roles, "Residents") >= 0) && string.IsNullOrWhiteSpace(Phone))
                return false;
            if (!string.IsNullOrWhiteSpace (Phone) && !Regex.IsMatch (Phone, @"^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"))
                return false;
            return true;
        }
    }
}
