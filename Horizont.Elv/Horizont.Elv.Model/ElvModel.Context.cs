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

namespace Horizont.Elv.Model
{
    public partial class ElvEntities : ObjectContext
    {
        public const string ConnectionString = "name=ElvEntities";
        public const string ContainerName = "ElvEntities";
    
        #region Constructors
    
        public ElvEntities()
            : base(ConnectionString, ContainerName)
        {
            Initialize();
        }
    
        public ElvEntities(string connectionString)
            : base(connectionString, ContainerName)
        {
            Initialize();
        }
    
        public ElvEntities(EntityConnection connection)
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
    
        public ObjectSet<TermEvent> TermEvents
        {
            get { return _termEvents  ?? (_termEvents = CreateObjectSet<TermEvent>("TermEvents")); }
        }
        private ObjectSet<TermEvent> _termEvents;
    
        public ObjectSet<Term> Terms
        {
            get { return _terms  ?? (_terms = CreateObjectSet<Term>("Terms")); }
        }
        private ObjectSet<Term> _terms;
    
        public ObjectSet<TermState> TermsState
        {
            get { return _termsState  ?? (_termsState = CreateObjectSet<TermState>("TermsState")); }
        }
        private ObjectSet<TermState> _termsState;
    
        public ObjectSet<Cnt> Cnts
        {
            get { return _cnts  ?? (_cnts = CreateObjectSet<Cnt>("Cnts")); }
        }
        private ObjectSet<Cnt> _cnts;
    
        public ObjectSet<DoorEvent> DoorEvents
        {
            get { return _doorEvents  ?? (_doorEvents = CreateObjectSet<DoorEvent>("DoorEvents")); }
        }
        private ObjectSet<DoorEvent> _doorEvents;
    
        public ObjectSet<Door> Doors
        {
            get { return _doors  ?? (_doors = CreateObjectSet<Door>("Doors")); }
        }
        private ObjectSet<Door> _doors;
    
        public ObjectSet<DoorState> DoorsState
        {
            get { return _doorsState  ?? (_doorsState = CreateObjectSet<DoorState>("DoorsState")); }
        }
        private ObjectSet<DoorState> _doorsState;
    
        public ObjectSet<FireSensorEvent> FireSensorEvents
        {
            get { return _fireSensorEvents  ?? (_fireSensorEvents = CreateObjectSet<FireSensorEvent>("FireSensorEvents")); }
        }
        private ObjectSet<FireSensorEvent> _fireSensorEvents;
    
        public ObjectSet<FireSensor> FireSensors
        {
            get { return _fireSensors  ?? (_fireSensors = CreateObjectSet<FireSensor>("FireSensors")); }
        }
        private ObjectSet<FireSensor> _fireSensors;
    
        public ObjectSet<FireSensorState> FireSensorStates
        {
            get { return _fireSensorStates  ?? (_fireSensorStates = CreateObjectSet<FireSensorState>("FireSensorStates")); }
        }
        private ObjectSet<FireSensorState> _fireSensorStates;
    
        public ObjectSet<Hoist> Hoists
        {
            get { return _hoists  ?? (_hoists = CreateObjectSet<Hoist>("Hoists")); }
        }
        private ObjectSet<Hoist> _hoists;
    
        public ObjectSet<HoistState> HoistStates
        {
            get { return _hoistStates  ?? (_hoistStates = CreateObjectSet<HoistState>("HoistStates")); }
        }
        private ObjectSet<HoistState> _hoistStates;
    
        public ObjectSet<LiftEvent> LiftEvents
        {
            get { return _liftEvents  ?? (_liftEvents = CreateObjectSet<LiftEvent>("LiftEvents")); }
        }
        private ObjectSet<LiftEvent> _liftEvents;
    
        public ObjectSet<Lift> Lifts
        {
            get { return _lifts  ?? (_lifts = CreateObjectSet<Lift>("Lifts")); }
        }
        private ObjectSet<Lift> _lifts;
    
        public ObjectSet<LiftState> LiftStates
        {
            get { return _liftStates  ?? (_liftStates = CreateObjectSet<LiftState>("LiftStates")); }
        }
        private ObjectSet<LiftState> _liftStates;
    
        public ObjectSet<ChannelEvent> ChannelEvents
        {
            get { return _channelEvents  ?? (_channelEvents = CreateObjectSet<ChannelEvent>("ChannelEvents")); }
        }
        private ObjectSet<ChannelEvent> _channelEvents;
    
        public ObjectSet<Channel> Channels
        {
            get { return _channels  ?? (_channels = CreateObjectSet<Channel>("Channels")); }
        }
        private ObjectSet<Channel> _channels;
    
        public ObjectSet<ChannelState> ChannelStates
        {
            get { return _channelStates  ?? (_channelStates = CreateObjectSet<ChannelState>("ChannelStates")); }
        }
        private ObjectSet<ChannelState> _channelStates;
    
        public ObjectSet<TeleControl> TeleControls
        {
            get { return _teleControls  ?? (_teleControls = CreateObjectSet<TeleControl>("TeleControls")); }
        }
        private ObjectSet<TeleControl> _teleControls;
    
        public ObjectSet<TeleControlState> TeleControlStates
        {
            get { return _teleControlStates  ?? (_teleControlStates = CreateObjectSet<TeleControlState>("TeleControlStates")); }
        }
        private ObjectSet<TeleControlState> _teleControlStates;
    
        public ObjectSet<WaterSensorEvent> WaterSensorEvents
        {
            get { return _waterSensorEvents  ?? (_waterSensorEvents = CreateObjectSet<WaterSensorEvent>("WaterSensorEvents")); }
        }
        private ObjectSet<WaterSensorEvent> _waterSensorEvents;
    
        public ObjectSet<WaterSensor> WaterSensors
        {
            get { return _waterSensors  ?? (_waterSensors = CreateObjectSet<WaterSensor>("WaterSensors")); }
        }
        private ObjectSet<WaterSensor> _waterSensors;
    
        public ObjectSet<WaterSensorState> WaterSensorStates
        {
            get { return _waterSensorStates  ?? (_waterSensorStates = CreateObjectSet<WaterSensorState>("WaterSensorStates")); }
        }
        private ObjectSet<WaterSensorState> _waterSensorStates;
    
        public ObjectSet<GasSensorEvent> GasSensorEvents
        {
            get { return _gasSensorEvents  ?? (_gasSensorEvents = CreateObjectSet<GasSensorEvent>("GasSensorEvents")); }
        }
        private ObjectSet<GasSensorEvent> _gasSensorEvents;
    
        public ObjectSet<GasSensor> GasSensors
        {
            get { return _gasSensors  ?? (_gasSensors = CreateObjectSet<GasSensor>("GasSensors")); }
        }
        private ObjectSet<GasSensor> _gasSensors;
    
        public ObjectSet<GasSensorState> GasSensorStates
        {
            get { return _gasSensorStates  ?? (_gasSensorStates = CreateObjectSet<GasSensorState>("GasSensorStates")); }
        }
        private ObjectSet<GasSensorState> _gasSensorStates;
    
        public ObjectSet<HoistEvent> HoistEvents
        {
            get { return _hoistEvents  ?? (_hoistEvents = CreateObjectSet<HoistEvent>("HoistEvents")); }
        }
        private ObjectSet<HoistEvent> _hoistEvents;
    
        public ObjectSet<ProjectSetting> ProjectSettings
        {
            get { return _projectSettings  ?? (_projectSettings = CreateObjectSet<ProjectSetting>("ProjectSettings")); }
        }
        private ObjectSet<ProjectSetting> _projectSettings;

        #endregion

    }
}
