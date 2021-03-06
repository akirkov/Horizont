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
    [KnownType(typeof(Hoist))]
    public partial class HoistEvent: IObjectWithChangeTracker, INotifyPropertyChanged
    {
        #region Свойства-примитивы
    
        [DataMember]
        public Nullable<System.DateTime> BreakTime
        {
            get { return _breakTime; }
            set
            {
                if (_breakTime != value)
                {
                    _breakTime = value;
                    OnPropertyChanged("BreakTime");
                }
            }
        }
        private Nullable<System.DateTime> _breakTime;
    
        [DataMember]
        public int HoistId
        {
            get { return _hoistId; }
            set
            {
                if (_hoistId != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство HoistId является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    if (!IsDeserializing)
                    {
                        if (Hoist != null && Hoist.Id != value)
                        {
                            Hoist = null;
                        }
                    }
                    _hoistId = value;
                    OnPropertyChanged("HoistId");
                }
            }
        }
        private int _hoistId;
    
        [DataMember]
        public bool IsBreak
        {
            get { return _isBreak; }
            set
            {
                if (_isBreak != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство IsBreak является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    _isBreak = value;
                    OnPropertyChanged("IsBreak");
                }
            }
        }
        private bool _isBreak;
    
        [DataMember]
        public string Reason
        {
            get { return _reason; }
            set
            {
                if (_reason != value)
                {
                    _reason = value;
                    OnPropertyChanged("Reason");
                }
            }
        }
        private string _reason;

        #endregion

        #region Свойства навигации
    
        [DataMember]
        public Hoist Hoist
        {
            get { return _hoist; }
            set
            {
                if (!ReferenceEquals(_hoist, value))
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added && value != null)
                    {
                        // Это зависимый конец идентифицирующего отношения, поэтому основной конец изменить нельзя, если он уже задан,
                        // в противном случае для него может быть задана только сущность с первичным ключом, имеющим то же значение, что и у внешнего ключа зависимого элемента.
                        if (HoistId != value.Id)
                        {
                            throw new InvalidOperationException("Основной конец идентифицирующего отношения может быть изменен только тогда, когда зависимый конец находится в состоянии Added.");
                        }
                    }
                    var previousValue = _hoist;
                    _hoist = value;
                    FixupHoist(previousValue);
                    OnNavigationPropertyChanged("Hoist");
                }
            }
        }
        private Hoist _hoist;

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
            Hoist = null;
        }

        #endregion

        #region Исправление ассоциаций
    
        private void FixupHoist(Hoist previousValue)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (previousValue != null && previousValue.HoistEvents.Contains(this))
            {
                previousValue.HoistEvents.Remove(this);
            }
    
            if (Hoist != null)
            {
                if (!Hoist.HoistEvents.Contains(this))
                {
                    Hoist.HoistEvents.Add(this);
                }
    
                HoistId = Hoist.Id;
            }
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("Hoist")
                    && (ChangeTracker.OriginalValues["Hoist"] == Hoist))
                {
                    ChangeTracker.OriginalValues.Remove("Hoist");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("Hoist", previousValue);
                }
                if (Hoist != null && !Hoist.ChangeTracker.ChangeTrackingEnabled)
                {
                    Hoist.StartTracking();
                }
            }
        }

        #endregion

    }
}
