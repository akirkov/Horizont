//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, внесенные в этот файл, могут привести к неверному выполнению кода и будут потеряны
//     в случае его повторного формирования.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Globalization;
using System.Runtime.Serialization;

namespace Horizont.Elv.Model
{
    [DataContract(IsReference = true)]
    [KnownType(typeof(FireSensor))]
    public partial class FireSensorEvent: IObjectWithChangeTracker, INotifyPropertyChanged
    {
        #region Свойства-примитивы
    
        [DataMember]
        public Nullable<System.DateTime> AlarmTime
        {
            get { return _alarmTime; }
            set
            {
                if (_alarmTime != value)
                {
                    _alarmTime = value;
                    OnPropertyChanged("AlarmTime");
                }
            }
        }
        private Nullable<System.DateTime> _alarmTime;
    
        [DataMember]
        public Nullable<int> FireSensorId
        {
            get { return _fireSensorId; }
            set
            {
                if (_fireSensorId != value)
                {
                    ChangeTracker.RecordOriginalValue("FireSensorId", _fireSensorId);
                    if (!IsDeserializing)
                    {
                        if (FireSensor != null && FireSensor.Id != value)
                        {
                            FireSensor = null;
                        }
                    }
                    _fireSensorId = value;
                    OnPropertyChanged("FireSensorId");
                }
            }
        }
        private Nullable<int> _fireSensorId;
    
        [DataMember]
        public bool IsAlarm
        {
            get { return _isAlarm; }
            set
            {
                if (_isAlarm != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство IsAlarm является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    _isAlarm = value;
                    OnPropertyChanged("IsAlarm");
                }
            }
        }
        private bool _isAlarm;

        #endregion

        #region Свойства навигации
    
        [DataMember]
        public FireSensor FireSensor
        {
            get { return _fireSensor; }
            set
            {
                if (!ReferenceEquals(_fireSensor, value))
                {
                    var previousValue = _fireSensor;
                    _fireSensor = value;
                    FixupFireSensor(previousValue);
                    OnNavigationPropertyChanged("FireSensor");
                }
            }
        }
        private FireSensor _fireSensor;

        #endregion

        #region ChangeTracking
    
        protected virtual void OnPropertyChanged(String propertyName)
        {
            if (ChangeTracker.State != ObjectState.Added && ChangeTracker.State != ObjectState.Deleted)
            {
                ChangeTracker.State = ObjectState.Modified;
            }
            if (_propertyChanged != null)
            {
                _propertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    
        protected virtual void OnNavigationPropertyChanged(String propertyName)
        {
            if (_propertyChanged != null)
            {
                _propertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    
        event PropertyChangedEventHandler INotifyPropertyChanged.PropertyChanged{ add { _propertyChanged += value; } remove { _propertyChanged -= value; } }
        private event PropertyChangedEventHandler _propertyChanged;
        private ObjectChangeTracker _changeTracker;
    
        [DataMember]
        public ObjectChangeTracker ChangeTracker
        {
            get
            {
                if (_changeTracker == null)
                {
                    _changeTracker = new ObjectChangeTracker();
                    _changeTracker.ObjectStateChanging += HandleObjectStateChanging;
                }
                return _changeTracker;
            }
            set
            {
                if(_changeTracker != null)
                {
                    _changeTracker.ObjectStateChanging -= HandleObjectStateChanging;
                }
                _changeTracker = value;
                if(_changeTracker != null)
                {
                    _changeTracker.ObjectStateChanging += HandleObjectStateChanging;
                }
            }
        }
    
        private void HandleObjectStateChanging(object sender, ObjectStateChangingEventArgs e)
        {
            if (e.NewState == ObjectState.Deleted)
            {
                ClearNavigationProperties();
            }
        }
    
        protected bool IsDeserializing { get; private set; }
    
        [OnDeserializing]
        public void OnDeserializingMethod(StreamingContext context)
        {
            IsDeserializing = true;
        }
    
        [OnDeserialized]
        public void OnDeserializedMethod(StreamingContext context)
        {
            IsDeserializing = false;
            ChangeTracker.ChangeTrackingEnabled = true;
        }
    
        protected virtual void ClearNavigationProperties()
        {
            FireSensor = null;
        }

        #endregion

        #region Исправление ассоциаций
    
        private void FixupFireSensor(FireSensor previousValue, bool skipKeys = false)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (previousValue != null && previousValue.Events.Contains(this))
            {
                previousValue.Events.Remove(this);
            }
    
            if (FireSensor != null)
            {
                if (!FireSensor.Events.Contains(this))
                {
                    FireSensor.Events.Add(this);
                }
    
                FireSensorId = FireSensor.Id;
            }
            else if (!skipKeys)
            {
                FireSensorId = null;
            }
    
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("FireSensor")
                    && (ChangeTracker.OriginalValues["FireSensor"] == FireSensor))
                {
                    ChangeTracker.OriginalValues.Remove("FireSensor");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("FireSensor", previousValue);
                }
                if (FireSensor != null && !FireSensor.ChangeTracker.ChangeTrackingEnabled)
                {
                    FireSensor.StartTracking();
                }
            }
        }

        #endregion

    }
}
