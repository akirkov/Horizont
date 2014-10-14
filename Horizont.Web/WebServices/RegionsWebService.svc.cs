namespace Horizont.Web
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System.Text;
    using System.Data.Objects;
    using System.Data;
    using System.Security.Permissions;
    using System.Web.Security;

    using Horizont.Model.Entities;
    using Horizont.Model;

    [ServiceContract(Namespace = "Horizont.Web")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class RegionsWebService
    {
        // Чтобы использовать протокол HTTP GET, добавьте атрибут [WebGet]. (По умолчанию ResponseFormat имеет значение WebMessageFormat.Json.)
        // Чтобы создать операцию, возвращающую XML,
        //     добавьте [WebGet(ResponseFormat=WebMessageFormat.Xml)]
        //     и включите следующую строку в текст операции:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        
        [OperationContract]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public ServerObject[] GetServers()
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    string queryString = @"SELECT VALUE c from HorizontEntities.Servers as c ORDER BY c.Id";
                    var query = new ObjectQuery<Horizont.Model.Server>(queryString, context);
                    query.MergeOption = MergeOption.NoTracking;

                    var servers = new List<ServerObject>();
                    foreach (var server in query.ToList())
                        servers.Add(new ServerObject(server));

                    return servers.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CityObject[] GetCities()
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    string queryString = @"SELECT VALUE c from HorizontEntities.Cities as c ORDER BY c.Id";
                    var query = new ObjectQuery<Horizont.Model.City>(queryString, context);
                    query.MergeOption = MergeOption.NoTracking;

                    var cities = new List<CityObject>();
                    foreach (var city in query.ToList())
                        cities.Add(new CityObject(city));

                    return cities.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public RegionObject[] GetRegions(CityObject city)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE c from HorizontEntities.Regions as c");
                    if (city != null)
                        queryString.Append(" WHERE c.City.Id=@city_id");
                    queryString.Append(" ORDER BY c.Id");
                    ObjectQuery<Horizont.Model.Region> query = new ObjectQuery<Horizont.Model.Region>(queryString.ToString(), context).Include("City");
                    if (Roles.IsUserInRole("Administrators"))
                        query = query.Include("Server");

                    if (city != null)
                        query.Parameters.Add(new ObjectParameter("city_id", city.Id));
                    query.MergeOption = MergeOption.NoTracking;

                    var regions = new List<RegionObject>();
                    foreach (var region in query.ToList())
                        regions.Add(new RegionObject(region));

                    return regions.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DispObject[] GetDisps(RegionObject region)
        {
            var disps = new List<DispObject>();
            if (region == null)
                return disps.ToArray();

            try
            {
                ClaimsWebService service = new ClaimsWebService();
                var objs = service.GetDisps(region.Id);
                if (objs == null)
                    return null;
                foreach (var d in objs)
                {
                    var disp = new Horizont.Model.Entities.DispObject(d.Id, d.Name, region);
                    disps.Add(disp);
                }

                return disps.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public AddressObject[] GetAddresses(RegionObject region, string str)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    var disps = new List<DispObject> ();
 
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE a from HorizontEntities.Addresses as a");
                    queryString.Append(" WHERE a.Name LIKE @str + '%'");
                    if (region != null)
                        queryString.Append(" AND a.RegionId=@region_id");
                    queryString.Append(" ORDER BY a.Name");
                    ObjectQuery<Horizont.Model.Address> query = new ObjectQuery<Horizont.Model.Address>(queryString.ToString(), context).Include("Region").Include("Region.City");
                    query.Parameters.Add(new ObjectParameter("str", str));
                    if (region != null)
                        query.Parameters.Add(new ObjectParameter("region_id", region.Id));
                    query.MergeOption = MergeOption.NoTracking;

                    var addresses = new List<AddressObject>();
                    foreach (var address in query.ToList())
                        addresses.Add(new AddressObject(address));

                    return addresses.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }


        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        bool SyncAddresses()
        {
            try
            {
                ClaimsWebService service = new ClaimsWebService();

                using (var context = new HorizontEntities())
                {
                    int id = ((from x in context.Addresses select x).FirstOrDefault() != null) ? context.Addresses.Max(x => x.Id) + 1 : 1;

                    var regions = GetRegions(null);
                    if (regions == null)
                        return false;
                    foreach (var region in regions)
                    {
                        var addresses = service.GetAddresses("", region.Id, 0);
                        if (addresses == null)
                            return false;
                        foreach (var address in addresses)
                        {
                            var obj = (from x in context.Addresses where (x.RegionId == region.Id) && (x.LocalId == address.Id) select x).FirstOrDefault();
                            if (obj == null)
                            {
                                obj = new Horizont.Model.Address();
                                obj.Id = id++;
                                obj.Name = address.AddressStr;
                                obj.RegionId = region.Id;
                                obj.LocalId = address.Id;

                                context.Addresses.AddObject(obj);
                            }
                            else
                            {
                                if (obj.Name == address.AddressStr)
                                    continue;

                                obj.Name = address.AddressStr;
                                obj.RegionId = region.Id;
                                obj.LocalId = address.Id;
                            }
                        }
                    }

                    context.SaveChanges();
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        
        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool CreateServer(ServerObject server)
        {
            if ((server == null) || !server.Validate())
                return false;

            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = new Horizont.Model.Server();
                    server.CopyTo(ref obj);
                    obj.Id = context.Servers.Max(x => x.Id) + 1;

                    context.Servers.AddObject(obj);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool ChangeServer(ServerObject server)
        {
            if ((server == null) || !server.Validate())
                return false;

            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = (from x in context.Servers where x.Id == server.Id select x).FirstOrDefault();

                    EntityKey key = context.CreateEntityKey("Servers", obj);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                        server.CopyTo(ref obj);

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool DeleteServer(int id)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = (from x in context.Servers where x.Id == id select x).FirstOrDefault();
                    if (obj == null)
                        return false;

                    context.DeleteObject(obj);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool CreateCity(CityObject city)
        {
            if ((city == null) || !city.Validate())
                return false;

            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = new Horizont.Model.City();
                    city.CopyTo(ref obj);
                    obj.Id = context.Cities.Max(x => x.Id) + 1;

                    context.Cities.AddObject(obj);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool ChangeCity(CityObject city)
        {
            if ((city == null) || !city.Validate())
                return false;

            try
            {
                using (var context = new HorizontEntities())
                {
                    Horizont.Model.City obj = (from x in context.Cities where x.Id == city.Id select x).FirstOrDefault();

                    EntityKey key = context.CreateEntityKey("Cities", obj);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                        city.CopyTo(ref obj);

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool DeleteCity(int id)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = (from x in context.Cities where x.Id == id select x).FirstOrDefault();
                    if (obj == null)
                        return false;

                    context.DeleteObject(obj);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool CreateRegion(RegionObject region)
        {
            if ((region == null) || !region.Validate())
                return false;

            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = new Horizont.Model.Region();
                    region.CopyTo(ref obj);
                    obj.Id = context.Regions.Max(x => x.Id) + 1;

                    context.Regions.AddObject(obj);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool ChangeRegion(RegionObject region)
        {
            if ((region == null) || !region.Validate())
                return false;

            try
            {
                using (var context = new HorizontEntities())
                {
                    Horizont.Model.Region obj = (from x in context.Regions where x.Id == region.Id select x).FirstOrDefault();

                    EntityKey key = context.CreateEntityKey("Regions", obj);

                    object contactToModify;
                    if (context.TryGetObjectByKey(key, out contactToModify))
                        region.CopyTo(ref obj);

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [OperationContract]
        [WebInvoke(RequestFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public bool DeleteRegion(int id)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    var obj = (from x in context.Regions where x.Id == id select x).FirstOrDefault();
                    if (obj == null)
                        return false;

                    context.DeleteObject(obj);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        [PrincipalPermission(SecurityAction.Demand, Role = "Administrators")]
        public ServerObject GetServer(int id)
        {
            if (id == 0)
                return null;

            using (var context = new HorizontEntities())
            {
                string queryString = @"SELECT VALUE c from HorizontEntities.Servers as c WHERE c.Id=@Id";
                var query = new ObjectQuery<Horizont.Model.Server>(queryString, context);
                query.Parameters.Add(new ObjectParameter("Id", id));
                query.MergeOption = MergeOption.NoTracking;

                Horizont.Model.Server server = query.FirstOrDefault();
                if (server == null)
                    return null;

                return new ServerObject(server);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public CityObject GetCity(int id)
        {
            if (id == 0)
                return null;

            using (var context = new HorizontEntities())
            {
                string queryString = @"SELECT VALUE c from HorizontEntities.Cities as c WHERE c.Id=@Id";
                var query = new ObjectQuery<Horizont.Model.City>(queryString, context);
                query.Parameters.Add(new ObjectParameter("Id", id));
                query.MergeOption = MergeOption.NoTracking;

                Horizont.Model.City city = query.FirstOrDefault();
                if (city == null)
                    return null;

                return new CityObject(city);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public RegionObject GetRegion(int id)
        {
            if (id == 0)
                return null;

            using (var context = new HorizontEntities())
            {
                string queryString = @"SELECT VALUE r from HorizontEntities.Regions as r WHERE r.Id=@Id";
                var query = new ObjectQuery<Horizont.Model.Region>(queryString, context).Include("Server").Include("City");
                query.Parameters.Add(new ObjectParameter("Id", id));
                query.MergeOption = MergeOption.NoTracking;

                Horizont.Model.Region region = query.FirstOrDefault();
                if (region == null)
                    return null;

                return new RegionObject(region);
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public DispObject GetDisp(int region_id, int id)
        {
            try
            {
                ClaimsWebService service = new ClaimsWebService();
                var disp = service.GetDisp(region_id, id);
                if (disp == null)
                    return null;

                return new DispObject(disp.Id, disp.Name, GetRegion(region_id));
            }
            catch (Exception)
            {
                return null;
            }
        }

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        public AddressObject GetAddress(int id)
        {
            if (id <= 0)
                return null;

            using (var context = new HorizontEntities())
            {
                string queryString = @"SELECT VALUE r from HorizontEntities.Addresses as r WHERE r.Id=@Id";
                var query = new ObjectQuery<Horizont.Model.Address>(queryString, context).Include("Region").Include("Region.City").Include("Region.Server");
                query.Parameters.Add(new ObjectParameter("Id", id));
                query.MergeOption = MergeOption.NoTracking;

                var address = query.FirstOrDefault();
                if (address == null)
                    return null;

                return new AddressObject(address);
            }
        }

        public AddressObject GetServerAddress(int server_id, int local_id)
        {
            using (var context = new HorizontEntities())
            {
                string queryString = @"SELECT VALUE a FROM HorizontEntities.Addresses AS a INNER JOIN HorizontEntities.Regions AS r ON a.RegionId == r.Id WHERE r.Server.Id=@server_id AND a.LocalId=@local_id";
                var query = new ObjectQuery<Horizont.Model.Address>(queryString, context).Include("Region");
                query.Parameters.Add(new ObjectParameter("server_id", server_id));
                query.Parameters.Add(new ObjectParameter("local_id", local_id));
                query.MergeOption = MergeOption.NoTracking;

                var address = query.FirstOrDefault();
                if (address == null)
                    return null;

                return new AddressObject(address);
            }
        }
        public RegionObject GetServerRegion(int server_id, int local_id)
        {
            using (var context = new HorizontEntities())
            {
                string queryString = @"SELECT VALUE r from HorizontEntities.Regions as r WHERE r.Server.Id=@server_id AND r.LocalId=@local_id";
                var query = new ObjectQuery<Horizont.Model.Region>(queryString, context).Include("Server").Include("City");
                query.Parameters.Add(new ObjectParameter("server_id", server_id));
                query.Parameters.Add(new ObjectParameter("local_id", local_id));
                query.MergeOption = MergeOption.NoTracking;

                var region = query.FirstOrDefault();
                if (region == null)
                    return null;

                return new RegionObject(region);
            }
        }
        public RegionObject[] GetServerRegions(int server_id)
        {
            try
            {
                using (var context = new HorizontEntities())
                {
                    StringBuilder queryString = new StringBuilder();
                    queryString.Append("SELECT VALUE r from HorizontEntities.Regions as r");
                    queryString.Append(" WHERE r.Server.Id=@server_id");
                    queryString.Append(" ORDER BY r.Id");
                    var query = new ObjectQuery<Horizont.Model.Region>(queryString.ToString(), context).Include("City");
                    query.Parameters.Add(new ObjectParameter("server_id", server_id));
                    query.MergeOption = MergeOption.NoTracking;

                    var regions = new List<RegionObject>();
                    foreach (Horizont.Model.Region region in query.ToList())
                        regions.Add(new RegionObject(region));

                    return regions.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
