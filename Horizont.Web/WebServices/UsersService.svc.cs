namespace Horizont.Web
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System.Text;
    using System.Web;
    using System.Data;
    using System.Data.Objects;
    using System.Security.Permissions;
    using System.Web.Security;
    using System.Web.Profile;

    using Horizont.Model.Entities;
    using Horizont.Model;

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class UsersService : IUsersWebService, IUsersService
    {
        #region Public UsersWebService

        public bool CreateUser(UserObject user)
        {
            if ((user == null) || !user.Validate())
                return false;

            try
            {
                MembershipUser u = Membership.CreateUser(user.Username, user.Password, user.Email);
                if (u == null)
                    return false;
                
                if (user.Roles.Length > 0)
                    Roles.AddUserToRoles(user.Username, user.Roles);

                dynamic profile = ProfileBase.Create(user.Username);
                profile.IsActivated = user.IsActivated;
                profile.Surname = user.Surname;
                profile.Name = user.Name;
                profile.Fathername = user.Fathername;
                profile.Post = user.Post;
                profile.AddressId = (user.Address != null) ? user.Address.Id : 0;
                profile.Flat = (user.Flat != null) ? (int)user.Flat : 0;
                profile.Phone = user.Phone;
                profile.Save();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool ChangeUser(UserObject user)
        {
            if ((user == null) || !user.Validate())
                return false;

            try
            {
                if (!CanUserEdit(user.Username))
                    throw new FaultException("Access denied");
                
                if ((user.Username == "Administrator") && (user.Roles.Length != 1) && (user.Roles[0] != "Administrators"))
                    return false;

                MembershipUser u = Membership.GetUser(user.Username);
                if (u == null)
                    return false;

                u.ChangePassword(u.GetPassword(), user.Password);
                u.Email = user.Email;
                Membership.UpdateUser(u);

                string[] roles = Roles.GetRolesForUser(user.Username);
                if (roles.Length > 0)
                    Roles.RemoveUserFromRoles(user.Username, roles);
                Roles.AddUserToRoles(user.Username, user.Roles);

                dynamic profile = ProfileBase.Create(user.Username);
                profile.IsActivated = user.IsActivated;
                profile.Surname = user.Surname;
                profile.Name = user.Name;
                profile.Fathername = user.Fathername;
                profile.Post = user.Post;
                profile.AddressId = (user.Address != null) ? user.Address.Id : 0;
                profile.Flat = (user.Flat != null) ? (int)user.Flat : 0;
                profile.Phone = user.Phone;
                profile.Save();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool DeleteUser(string username)
        {
            try
            {
                if (!CanUserEdit(username))
                    throw new FaultException("Access denied");
                if (username == Membership.GetUser().UserName)
                    return false;
                return Membership.DeleteUser(username);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool AddUserRule(string username, RuleObject rule)
        {
            try
            {
                if (!CanUserEdit(username))
                    throw new FaultException("Access denied");

                using (var context = new HorizontEntities())
                {
                    Horizont.Model.Rule r = new Horizont.Model.Rule();
                    r.Id = context.Rules.Max(x => x.Id) + 1;
                    r.UserId = GetUserId(username);
                    r.CityId = (rule.City != null) ? rule.City.Id : 0;
                    r.RegionId = (rule.Region != null) ? rule.Region.Id : 0;
                    r.DispId = (rule.Disp != null) ? rule.Disp.Id : 0;
                    r.Permission = rule.Permission;

                    context.Rules.AddObject(r);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool ChangeUserRule(RuleObject rule)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    Horizont.Model.Rule r = (from x in context.Rules.Include("User") where x.Id == rule.Id select x).FirstOrDefault();

                    if (!CanUserEdit(r.User.UserName))
                        throw new FaultException("Access denied");

                    EntityKey key = context.CreateEntityKey("Rules", r);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                    {
                        r.Id = rule.Id;
                        r.CityId = (rule.City != null) ? rule.City.Id : 0;
                        r.RegionId = (rule.Region != null) ? rule.Region.Id : 0;
                        r.DispId = (rule.Disp != null) ? rule.Disp.Id : 0;
                        r.Permission = rule.Permission;
                    }

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool DeleteUserRule(int id)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    Horizont.Model.Rule rule = (from x in context.Rules.Include("User") where x.Id == id select x).FirstOrDefault();
                    if (rule == null)
                        return false;

                    if (!CanUserEdit(rule.User.UserName))
                        throw new FaultException("Access denied");

                    context.DeleteObject(rule);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public UserObject GetUser (string username) {
            MembershipUser user = Membership.GetUser (username);
            if (user == null)
                return null;

            return GetUserObject(user);
        }
        public UserObject[] GetUsers()
        {
            try
            {
                List<UserObject> users = new List<UserObject>();
                foreach (MembershipUser u in Membership.GetAllUsers())
                {
                    UserObject user = GetUserObject(u);
                    users.Add(user);
                }

                return users.ToArray();
            }
            catch (Exception)
            {
                return null;
            }

        }
        public RuleObject GetUserRule(int id)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE r from HorizontEntities.Rules as r");
                    queryString.Append(" WHERE r.Id=@id");
                    var query = new ObjectQuery<Horizont.Model.Rule>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("id", id));
                    query.MergeOption = MergeOption.NoTracking;

                    Horizont.Model.Rule r = query.FirstOrDefault();
                    if (r == null)
                        return null;

                    RuleObject rule = new RuleObject();

                    RegionsWebService service = new RegionsWebService();
                    rule.City = service.GetCity(r.CityId);
                    rule.Region = service.GetRegion(r.RegionId);
                    rule.Disp = service.GetDisp(r.RegionId, r.DispId);
                    rule.Permission = r.Permission;
                    rule.Id = r.Id;

                    if ((r.CityId > 0) && (rule.City == null))
                        rule.City = new CityObject(r.CityId, "");
                    if ((r.RegionId > 0) && (rule.Region == null))
                        rule.Region = new RegionObject(r.CityId, "", null, 0, rule.City);
                    if ((r.DispId > 0) && (rule.Disp == null))
                        rule.Disp = new DispObject(r.DispId, "", rule.Region);

                    return rule;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public RuleObject[] GetUserRules(string username)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE r from HorizontEntities.Rules as r INNER JOIN HorizontEntities.Users AS u ON (r.UserId = u.UserId)");
                    queryString.Append(" WHERE u.UserName=@user_name");
                    queryString.Append(" ORDER BY r.CityId, r.RegionId, r.DispId");
                    ObjectQuery<Horizont.Model.Rule> query = new ObjectQuery<Horizont.Model.Rule>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("user_name", username));
                    query.MergeOption = MergeOption.NoTracking;

                    List<RuleObject> rules = new List<RuleObject>();
                    foreach (Horizont.Model.Rule r in query.ToList())
                    {
                        RuleObject rule = new RuleObject();

                        RegionsWebService service = new RegionsWebService();
                        rule.City = service.GetCity(r.CityId);
                        rule.Region = service.GetRegion(r.RegionId);
                        rule.Disp = service.GetDisp(r.RegionId, r.DispId);
                        rule.Permission = r.Permission;
                        rule.Id = r.Id;

                        if ((r.CityId > 0) && (rule.City == null))
                            rule.City = new CityObject(r.CityId, "");
                        if ((r.RegionId > 0) && (rule.Region == null))
                            rule.Region = new RegionObject(r.CityId, "", null, 0, rule.City);
                        if ((r.DispId > 0) && (rule.Disp == null))
                            rule.Disp = new DispObject (r.DispId, "", rule.Region);

                        rules.Add(rule);
                    }

                    return rules.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public RuleObjectEx[] GetUserRulesEx(string username)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE r from HorizontEntities.Rules as r INNER JOIN HorizontEntities.Users AS u ON (r.UserId = u.UserId)");
                    queryString.Append(" WHERE u.UserName=@user_name");
                    queryString.Append(" ORDER BY r.CityId, r.RegionId, r.DispId");
                    ObjectQuery<Horizont.Model.Rule> query = new ObjectQuery<Horizont.Model.Rule>(queryString.ToString(), context);
                    query.Parameters.Add(new ObjectParameter("user_name", username));
                    query.MergeOption = MergeOption.NoTracking;

                    List<RuleObjectEx> rules = new List<RuleObjectEx>();
                    foreach (Horizont.Model.Rule r in query.ToList())
                    {
                        RuleObjectEx rule = new RuleObjectEx();

                        RegionsWebService service = new RegionsWebService();
                        rule.CityId = r.CityId;
                        rule.RegionId = r.RegionId;
                        rule.DispId = r.DispId;
                        rule.Permission = r.Permission;
                        rule.Id = r.Id;

                        rules.Add(rule);
                    }

                    return rules.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public RuleObjectEx[] GetCurrentUserRulesEx()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return null;

            return GetUserRulesEx(Membership.GetUser().UserName);
        }

        public bool IsUserExist(string username)
        {
            return (Membership.GetUser(username) != null);
        }

        #endregion

        #region Public UsersService

        public bool IsUserInRole(string username, string role)
        {
            string[] roles = Roles.GetRolesForUser(username);
            return (Array.IndexOf(roles, role) >= 0);

        }
        public string[] GetUserRoles(string username)
        {
            try
            {
                return Roles.GetRolesForUser(username);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool CanUserServerRead(string username, int server_id, int? region_id, int? disp_id)
        {
            if (!IsUserActivated (username) || (server_id <= 0))
                return false;

            try
            {
                RegionsWebService service = new RegionsWebService();
                
                if (region_id != null)
                {
                    var region = service.GetServerRegion(server_id, (int)region_id);
                    return CanUserRegionRead(username, region, disp_id);
                }

                foreach (var region in service.GetServerRegions(server_id))
                {
                    if (CanUserRegionRead(username, region, null))
                        return true;
                }

                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool CanUserServerEdit(string username, int server_id, int? region_id, int? disp_id)
        {
            if (!IsUserActivated(username) || (server_id <= 0))
                return false;

            try
            {
                RegionsWebService service = new RegionsWebService();

                if (region_id != null)
                {
                    var region = service.GetServerRegion(server_id, (int)region_id);
                    return CanUserRegionEdit(username, region, disp_id);
                }

                foreach (var region in service.GetServerRegions(server_id))
                {
                    if (CanUserRegionEdit(username, region, null))
                        return true;
                }

                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CanUserFlatRead(string username, int server_id, int address_id, int flat)
        {
            if (!IsUserActivated(username) || !Roles.IsUserInRole(username, "Residents") || (server_id <= 0) || (flat <= 0))
                return false;
            
            try
            {
                RegionsWebService service = new RegionsWebService();
                var address = service.GetServerAddress(server_id, address_id);
                if (address == null)
                    return false;

                dynamic profile = ProfileBase.Create(username);
                if (profile == null)
                    return false;

                return (profile.AddressId == address.Id) && (profile.Flat == flat);    
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool CanUserFlatEdit(string username, int server_id, int address_id, int flat)
        {
            return CanUserFlatRead(username, server_id, address_id, flat);
        }

        #endregion

        #region Private Functions

        private bool IsUserActivated(string username)
        {
            dynamic profile = ProfileBase.Create(username);
            return profile.IsActivated;
        }

        private UserObject GetUserObject(MembershipUser u)
        {
            UserObject user = new UserObject();
            user.Username = u.UserName;
            user.Password = u.GetPassword();
            user.Email = u.Email;
            user.Roles = Roles.GetRolesForUser(u.UserName);

            dynamic profile = ProfileBase.Create(u.UserName);
            user.IsActivated = profile.IsActivated;
            user.Surname = profile.Surname;
            user.Name = profile.Name;
            user.Fathername = profile.Fathername;
            user.Post = profile.Post;
            user.Flat = (profile.Flat > 0) ? profile.Flat : null;
            user.Phone = profile.Phone;

            RegionsWebService service = new RegionsWebService();
            user.Address = (profile.AddressId > 0) ? service.GetAddress(profile.AddressId) : null;

            return user;
        }
        private Guid GetUserId(string username)
        {
            using (var context = new HorizontEntities())
            {
                StringBuilder queryString = new StringBuilder();
                queryString.Append("SELECT VALUE u from HorizontEntities.Users AS u");
                queryString.Append(" WHERE u.UserName=@user_name");
                ObjectQuery<Horizont.Model.User> query = new ObjectQuery<Horizont.Model.User>(queryString.ToString(), context);
                query.Parameters.Add(new ObjectParameter("user_name", username));
                query.MergeOption = MergeOption.NoTracking;

                Horizont.Model.User user = query.FirstOrDefault();
                if (user == null)
                    return Guid.Empty;

                return user.UserId;
            }
        }

        // disp_id = 0 - for all disps, disp_id = null - exist disp, disp_id > 0 - for specific disp
        private bool CanUserRegionRead(string username, RegionObject region, int? disp_id)
        {
            if (region == null)
                return false;
            try
            {
                if ((disp_id == null) && (Roles.IsUserInRole (username, "Residents")))
                {
                    dynamic profile = ProfileBase.Create(username);
                    if (profile == null)
                        return false;

                    var service = new RegionsWebService();
                    var address = service.GetAddress(profile.AddressId);
                    if (address == null)
                        return false;
                    
                    return (address.Region.Id == region.Id);
                }

                RuleObjectEx[] rules = GetUserRulesEx(username);
                foreach (RuleObjectEx rule in rules)
                {
                    if ((rule.CityId == 0) || ((rule.CityId == region.City.Id) && ((rule.RegionId == 0) || ((rule.RegionId == region.Id) && ((rule.DispId == 0) || (disp_id == null) || (rule.DispId == disp_id))))))
                        return true;
                }

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private bool CanUserRegionEdit(string username, RegionObject region, int? disp_id)
        {
            if (region == null)
                return false;
            try
            {
                RuleObjectEx[] rules = GetUserRulesEx(username);
                foreach (RuleObjectEx rule in rules)
                {
                    if ((rule.Permission == 1) && ((rule.CityId == 0) || ((rule.CityId == region.City.Id) && ((rule.RegionId == 0) || ((rule.RegionId == region.Id) && ((rule.DispId == 0) || (disp_id == null) || (rule.DispId == disp_id)))))))
                        return true;
                }

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private bool CanUserEdit(string username)
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return false;

            return (Membership.GetUser().UserName == "Administrator") || ((username != "Administrator") && (!IsUserInRole(username, "Administrators") || (username == Membership.GetUser().UserName)));
        }

        #endregion
    }

    [ServiceContract(Name = "UsersWebService", Namespace = "Horizont.Web")]
    public interface IUsersWebService
    {
        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool CreateUser(UserObject user);

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool ChangeUser(UserObject user);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool DeleteUser(string userName);

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool AddUserRule(string username, RuleObject rule);

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool ChangeUserRule(RuleObject rule);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool DeleteUserRule(int id);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        UserObject GetUser(string username);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        UserObject[] GetUsers();

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        RuleObject GetUserRule(int id);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        RuleObject[] GetUserRules(string username);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        RuleObjectEx[] GetUserRulesEx(string username);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        RuleObjectEx[] GetCurrentUserRulesEx();

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        bool IsUserExist(string username);
    }

    [ServiceContract(Name = "UsersService", Namespace = "http://horzt.ru")]
    public interface IUsersService
    {
        [OperationContract]
        bool IsUserInRole(string username, string role);
        
        [OperationContract]
        string[] GetUserRoles(string username);

        [OperationContract]
        bool CanUserServerRead(string username, int server_id, int? region_id, int? disp_id);

        [OperationContract]
        bool CanUserServerEdit(string username, int server_id, int? region_id, int? disp_id);

        [OperationContract]
        bool CanUserFlatRead(string username, int server_id, int address_id, int flat);

        [OperationContract]
        bool CanUserFlatEdit(string username, int server_id, int address_id, int flat);
    }
}
