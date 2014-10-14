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
    [KnownType(typeof(Door))]
    public partial class DoorEvent: IObjectWithChangeTracker, INotifyPropertyChanged
    {
        #region Свойства-примитивы
    
        [DataMember]
        public Nullable<System.DateTime> OpenTime
        {
            get { return _openTime; }
            set
            {
                if (_openTime != value)
                {
                    _openTime = value;
                    OnPropertyChanged("OpenTime");
                }
            }
        }
        private Nullable<System.DateTime> _openTime;
    
        [DataMember]
        public bool IsOpen
        {
            get { return _isOpen; }
            set
            {
                if (_isOpen != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство IsOpen является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    _isOpen = value;
                    OnPropertyChanged("IsOpen");
                }
            }
        }
        private bool _isOpen;
    
        [DataMember]
        public Nullable<int> DoorId
        {
            get { return _doorId; }
            set
            {
                if (_doorId != value)
                {
                    ChangeTracker.RecordOriginalValue("DoorId", _doorId);
                    if (!IsDeserializing)
                    {
                        if (Door != null && Door.Id != value)
                        {
                            Door = null;
                        }
                    }
                    _doorId = value;
                    OnPropertyChanged("DoorId");
                }
            }
        }
        private Nullable<int> _doorId;

        #endregion

        #region Свойства навигации
    
        [DataMember]
        public Door Door
        {
            get { return _door; }
            set
            {
                if (!ReferenceEquals(_door, value))
                {
                    var previousValue = _door;
                    _door = value;
                    FixupDoor(previousValue);
                    OnNavigationPropertyChanged("Door");
                }
            }
        }
        private Door _door;

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
            Door = null;
        }

        #endregion

        #region Исправление ассоциаций
    
        private void FixupDoor(Door previousValue, bool skipKeys = false)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (previousValue != null && previousValue.Events.Contains(this))
            {
                previousValue.Events.Remove(this);
            }
    
            if (Door != null)
            {
                if (!Door.Events.Contains(this))
                {
                    Door.Events.Add(this);
                }
    
                DoorId = Door.Id;
            }
            else if (!skipKeys)
            {
                DoorId = null;
            }
    
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("Door")
                    && (ChangeTracker.OriginalValues["Door"] == Door))
                {
                    ChangeTracker.OriginalValues.Remove("Door");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("Door", previousValue);
                }
                if (Door != null && !Door.ChangeTracker.ChangeTrackingEnabled)
                {
                    Door.StartTracking();
                }
            }
        }

        #endregion

    }
}
