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
    public partial class GasSensorState: IObjectWithChangeTracker, INotifyPropertyChanged
    {
        #region Свойства-примитивы
    
        [DataMember]
        public int GasSensorId
        {
            get { return _gasSensorId; }
            set
            {
                if (_gasSensorId != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство GasSensorId является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    _gasSensorId = value;
                    OnPropertyChanged("GasSensorId");
                }
            }
        }
        private int _gasSensorId;
    
        [DataMember]
        public bool IsAlarm
        {
            get { return _isAlarm; }
            set
            {
                if (_isAlarm != value)
                {
                    _isAlarm = value;
                    OnPropertyChanged("IsAlarm");
                }
            }
        }
        private bool _isAlarm;
    
        [DataMember]
        public System.DateTime AlarmTime
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
        private System.DateTime _alarmTime;

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
    
        // Этот тип сущности является зависимым концом как минимум в одной ассоциации, выполняющей каскадное удаление.
        // Этот обработчик события обрабатывает уведомления, создаваемые при удалении основного конца.
        internal void HandleCascadeDelete(object sender, ObjectStateChangingEventArgs e)
        {
            if (e.NewState == ObjectState.Deleted)
            {
                this.MarkAsDeleted();
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
        }

        #endregion

    }
}
