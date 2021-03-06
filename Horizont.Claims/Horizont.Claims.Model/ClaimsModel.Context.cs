﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, внесенные в этот файл, могут привести к неверному выполнению кода и будут потеряны
//     в случае его повторного формирования.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Common;
using System.Data.EntityClient;
using System.Data.Metadata.Edm;
using System.Data.Objects.DataClasses;
using System.Data.Objects;
using System.Data;
using System.Diagnostics;
using System.Globalization;
using System.Linq;

namespace Horizont.Claims.Model
{
    public partial class ClaimsEntities : ObjectContext
    {
        public const string ConnectionString = "name=ClaimsEntities";
        public const string ContainerName = "ClaimsEntities";
    
        #region Constructors
    
        public ClaimsEntities()
            : base(ConnectionString, ContainerName)
        {
            Initialize();
        }
    
        public ClaimsEntities(string connectionString)
            : base(connectionString, ContainerName)
        {
            Initialize();
        }
    
        public ClaimsEntities(EntityConnection connection)
            : base(connection, ContainerName)
        {
            Initialize();
        }
    
        private void Initialize()
        {
            // Для создания прокси необходимо использовать ProxyDataContractResolver и
            // может допускать отложенную загрузку, что может привести к увеличению загруженного графа в ходе сериализации.
            ContextOptions.ProxyCreationEnabled = false;
            ObjectMaterialized += new ObjectMaterializedEventHandler(HandleObjectMaterialized);
        }
    
        private void HandleObjectMaterialized(object sender, ObjectMaterializedEventArgs e)
        {
            var entity = e.Entity as IObjectWithChangeTracker;
            if (entity != null)
            {
                bool changeTrackingEnabled = entity.ChangeTracker.ChangeTrackingEnabled;
                try
                {
                    entity.MarkAsUnchanged();
                }
                finally
                {
                    entity.ChangeTracker.ChangeTrackingEnabled = changeTrackingEnabled;
                }
                this.StoreReferenceKeyValues(entity);
            }
        }
    
        #endregion
    
        #region свойства ObjectSet
    
        public ObjectSet<Address> Addresses
        {
            get { return _addresses  ?? (_addresses = CreateObjectSet<Address>("Addresses")); }
        }
        private ObjectSet<Address> _addresses;
    
        public ObjectSet<CessationApplicant> CessationApplicants
        {
            get { return _cessationApplicants  ?? (_cessationApplicants = CreateObjectSet<CessationApplicant>("CessationApplicants")); }
        }
        private ObjectSet<CessationApplicant> _cessationApplicants;
    
        public ObjectSet<CessationBasis> CessationBasises
        {
            get { return _cessationBasises  ?? (_cessationBasises = CreateObjectSet<CessationBasis>("CessationBasises")); }
        }
        private ObjectSet<CessationBasis> _cessationBasises;
    
        public ObjectSet<CessationClaim> CessationClaims
        {
            get { return _cessationClaims  ?? (_cessationClaims = CreateObjectSet<CessationClaim>("CessationClaims")); }
        }
        private ObjectSet<CessationClaim> _cessationClaims;
    
        public ObjectSet<CessationClaimHistoryItem> CessationClaimsHistory
        {
            get { return _cessationClaimsHistory  ?? (_cessationClaimsHistory = CreateObjectSet<CessationClaimHistoryItem>("CessationClaimsHistory")); }
        }
        private ObjectSet<CessationClaimHistoryItem> _cessationClaimsHistory;
    
        public ObjectSet<CessationReason> CessationReasons
        {
            get { return _cessationReasons  ?? (_cessationReasons = CreateObjectSet<CessationReason>("CessationReasons")); }
        }
        private ObjectSet<CessationReason> _cessationReasons;
    
        public ObjectSet<CommonClaim> CommonClaims
        {
            get { return _commonClaims  ?? (_commonClaims = CreateObjectSet<CommonClaim>("CommonClaims")); }
        }
        private ObjectSet<CommonClaim> _commonClaims;
    
        public ObjectSet<CommonClaimHistoryItem> CommonClaimsHistory
        {
            get { return _commonClaimsHistory  ?? (_commonClaimsHistory = CreateObjectSet<CommonClaimHistoryItem>("CommonClaimsHistory")); }
        }
        private ObjectSet<CommonClaimHistoryItem> _commonClaimsHistory;
    
        public ObjectSet<CommonFailure> CommonFailures
        {
            get { return _commonFailures  ?? (_commonFailures = CreateObjectSet<CommonFailure>("CommonFailures")); }
        }
        private ObjectSet<CommonFailure> _commonFailures;
    
        public ObjectSet<DefaultSettingsObject> DefaultSettingsObjects
        {
            get { return _defaultSettingsObjects  ?? (_defaultSettingsObjects = CreateObjectSet<DefaultSettingsObject>("DefaultSettingsObjects")); }
        }
        private ObjectSet<DefaultSettingsObject> _defaultSettingsObjects;
    
        public ObjectSet<Disp> Disps
        {
            get { return _disps  ?? (_disps = CreateObjectSet<Disp>("Disps")); }
        }
        private ObjectSet<Disp> _disps;
    
        public ObjectSet<Executor> Executors
        {
            get { return _executors  ?? (_executors = CreateObjectSet<Executor>("Executors")); }
        }
        private ObjectSet<Executor> _executors;
    
        public ObjectSet<FailuresGroup> FailuresGroups
        {
            get { return _failuresGroups  ?? (_failuresGroups = CreateObjectSet<FailuresGroup>("FailuresGroups")); }
        }
        private ObjectSet<FailuresGroup> _failuresGroups;
    
        public ObjectSet<EmployeeInfo> Infoes
        {
            get { return _infoes  ?? (_infoes = CreateObjectSet<EmployeeInfo>("Infoes")); }
        }
        private ObjectSet<EmployeeInfo> _infoes;
    
        public ObjectSet<Journal> Journals
        {
            get { return _journals  ?? (_journals = CreateObjectSet<Journal>("Journals")); }
        }
        private ObjectSet<Journal> _journals;
    
        public ObjectSet<LiftClaim> LiftClaims
        {
            get { return _liftClaims  ?? (_liftClaims = CreateObjectSet<LiftClaim>("LiftClaims")); }
        }
        private ObjectSet<LiftClaim> _liftClaims;
    
        public ObjectSet<LiftClaimHistoryItem> LiftClaimsHistory
        {
            get { return _liftClaimsHistory  ?? (_liftClaimsHistory = CreateObjectSet<LiftClaimHistoryItem>("LiftClaimsHistory")); }
        }
        private ObjectSet<LiftClaimHistoryItem> _liftClaimsHistory;
    
        public ObjectSet<LiftFailure> LiftFailures
        {
            get { return _liftFailures  ?? (_liftFailures = CreateObjectSet<LiftFailure>("LiftFailures")); }
        }
        private ObjectSet<LiftFailure> _liftFailures;
    
        public ObjectSet<Organization> Organizations
        {
            get { return _organizations  ?? (_organizations = CreateObjectSet<Organization>("Organizations")); }
        }
        private ObjectSet<Organization> _organizations;
    
        public ObjectSet<TypeWork> TypeWorks
        {
            get { return _typeWorks  ?? (_typeWorks = CreateObjectSet<TypeWork>("TypeWorks")); }
        }
        private ObjectSet<TypeWork> _typeWorks;
    
        public ObjectSet<Flat> Flats
        {
            get { return _flats  ?? (_flats = CreateObjectSet<Flat>("Flats")); }
        }
        private ObjectSet<Flat> _flats;
    
        public ObjectSet<Change> Changes
        {
            get { return _changes  ?? (_changes = CreateObjectSet<Change>("Changes")); }
        }
        private ObjectSet<Change> _changes;
    
        public ObjectSet<TablesChange> TablesChanges
        {
            get { return _tablesChanges  ?? (_tablesChanges = CreateObjectSet<TablesChange>("TablesChanges")); }
        }
        private ObjectSet<TablesChange> _tablesChanges;
    
        public ObjectSet<Region> Regions
        {
            get { return _regions  ?? (_regions = CreateObjectSet<Region>("Regions")); }
        }
        private ObjectSet<Region> _regions;
    
        public ObjectSet<Address2Journals> Address2Journals
        {
            get { return _address2Journals  ?? (_address2Journals = CreateObjectSet<Address2Journals>("Address2Journals")); }
        }
        private ObjectSet<Address2Journals> _address2Journals;
    
        public ObjectSet<DataBaseSetting> DataBaseSettings
        {
            get { return _dataBaseSettings  ?? (_dataBaseSettings = CreateObjectSet<DataBaseSetting>("DataBaseSettings")); }
        }
        private ObjectSet<DataBaseSetting> _dataBaseSettings;

        #endregion

    }
}
