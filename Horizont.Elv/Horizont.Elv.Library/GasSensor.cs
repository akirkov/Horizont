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
    [KnownType(typeof(GasSensorEvent))]
    [KnownType(typeof(Term))]
    [KnownType(typeof(GasSensorState))]
    public partial class GasSensor: IObjectWithChangeTracker, INotifyPropertyChanged
    {
        #region Свойства-примитивы
    
        [DataMember]
        public int Id
        {
            get { return _id; }
            set
            {
                if (_id != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство Id является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    _id = value;
                    OnPropertyChanged("Id");
                }
            }
        }
        private int _id;
    
        [DataMember]
        public string Name
        {
            get { return _name; }
            set
            {
                if (_name != value)
                {
                    _name = value;
                    OnPropertyChanged("Name");
                }
            }
        }
        private string _name;
    
        [DataMember]
        public string Address
        {
            get { return _address; }
            set
            {
                if (_address != value)
                {
                    _address = value;
                    OnPropertyChanged("Address");
                }
            }
        }
        private string _address;
    
        [DataMember]
        public int Idx
        {
            get { return _idx; }
            set
            {
                if (_idx != value)
                {
                    _idx = value;
                    OnPropertyChanged("Idx");
                }
            }
        }
        private int _idx;
    
        [DataMember]
        public int TermId
        {
            get { return _termId; }
            set
            {
                if (_termId != value)
                {
                    ChangeTracker.RecordOriginalValue("TermId", _termId);
                    if (!IsDeserializing)
                    {
                        if (Term != null && Term.Id != value)
                        {
                            Term = null;
                        }
                    }
                    _termId = value;
                    OnPropertyChanged("TermId");
                }
            }
        }
        private int _termId;

        #endregion

        #region Сложные свойства
    
        [DataMember]
        public RecordInfoType RecordInfo
        {
            get
            {
                if (!_recordInfoInitialized && _recordInfo == null)
                {
                    _recordInfo = new RecordInfoType();
                    ((INotifyComplexPropertyChanging)_recordInfo).ComplexPropertyChanging += HandleRecordInfoChanging;
                }
                _recordInfoInitialized = true;
                return _recordInfo;
            }
            set
            {
                _recordInfoInitialized = true;
                if (!Equals(_recordInfo, value))
                {
                    if (_recordInfo != null)
                    {
                        ((INotifyComplexPropertyChanging)_recordInfo).ComplexPropertyChanging -= HandleRecordInfoChanging;
                    }
    
                    HandleRecordInfoChanging(this, null);
                    _recordInfo = value;
                    OnPropertyChanged("RecordInfo");
    
                    if (value != null)
                    {
                        ((INotifyComplexPropertyChanging)_recordInfo).ComplexPropertyChanging += HandleRecordInfoChanging;
                    }
                }
            }
        }
        private RecordInfoType _recordInfo;
        private bool _recordInfoInitialized;

        #endregion

        #region Свойства навигации
    
        [DataMember]
        public TrackableCollection<GasSensorEvent> Events
        {
            get
            {
                if (_events == null)
                {
                    _events = new TrackableCollection<GasSensorEvent>();
                    _events.CollectionChanged += FixupEvents;
                }
                return _events;
            }
            set
            {
                if (!ReferenceEquals(_events, value))
                {
                    if (ChangeTracker.ChangeTrackingEnabled)
                    {
                        throw new InvalidOperationException("Не удается задать FixupChangeTrackingCollection, если включено ChangeTracking");
                    }
                    if (_events != null)
                    {
                        _events.CollectionChanged -= FixupEvents;
                        // Это основной конец в ассоциации, выполняющей каскадные удаления.
                        // Удалите обработчик события каскадного удаления для всех сущностей в текущей коллекции.
                        foreach (GasSensorEvent item in _events)
                        {
                            ChangeTracker.ObjectStateChanging -= item.HandleCascadeDelete;
                        }
                    }
                    _events = value;
                    if (_events != null)
                    {
                        _events.CollectionChanged += FixupEvents;
                        // Это основной конец в ассоциации, выполняющей каскадные удаления.
                        // Добавьте обработчик события каскадного удаления для всех сущностей, уже присутствующих в новой коллекции.
                        foreach (GasSensorEvent item in _events)
                        {
                            ChangeTracker.ObjectStateChanging += item.HandleCascadeDelete;
                        }
                    }
                    OnNavigationPropertyChanged("Events");
                }
            }
        }
        private TrackableCollection<GasSensorEvent> _events;
    
        [DataMember]
        public Term Term
        {
            get { return _term; }
            set
            {
                if (!ReferenceEquals(_term, value))
                {
                    var previousValue = _term;
                    _term = value;
                    FixupTerm(previousValue);
                    OnNavigationPropertyChanged("Term");
                }
            }
        }
        private Term _term;
    
        [DataMember]
        public GasSensorState State
        {
            get { return _state; }
            set
            {
                if (!ReferenceEquals(_state, value))
                {
                    var previousValue = _state;
                    _state = value;
                    FixupState(previousValue);
                    OnNavigationPropertyChanged("State");
                }
            }
        }
        private GasSensorState _state;

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
        // Записывает исходные значения для сложного свойства RecordInfo
        private void HandleRecordInfoChanging(object sender, EventArgs args)
        {
            if (ChangeTracker.State != ObjectState.Added && ChangeTracker.State != ObjectState.Deleted)
            {
                ChangeTracker.State = ObjectState.Modified;
            }
        }
    
    
        protected virtual void ClearNavigationProperties()
        {
            Events.Clear();
            Term = null;
            State = null;
        }

        #endregion

        #region Исправление ассоциаций
    
        private void FixupTerm(Term previousValue)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (previousValue != null && previousValue.GasSensors.Contains(this))
            {
                previousValue.GasSensors.Remove(this);
            }
    
            if (Term != null)
            {
                if (!Term.GasSensors.Contains(this))
                {
                    Term.GasSensors.Add(this);
                }
    
                TermId = Term.Id;
            }
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("Term")
                    && (ChangeTracker.OriginalValues["Term"] == Term))
                {
                    ChangeTracker.OriginalValues.Remove("Term");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("Term", previousValue);
                }
                if (Term != null && !Term.ChangeTracker.ChangeTrackingEnabled)
                {
                    Term.StartTracking();
                }
            }
        }
    
        private void FixupState(GasSensorState previousValue)
        {
            // Это основной конец в ассоциации, выполняющей каскадные удаления.
            // Обновите приемник событий с использованием ссылки на новый зависимый объект.
            if (previousValue != null)
            {
                ChangeTracker.ObjectStateChanging -= previousValue.HandleCascadeDelete;
            }
    
            if (State != null)
            {
                ChangeTracker.ObjectStateChanging += State.HandleCascadeDelete;
            }
    
            if (IsDeserializing)
            {
                return;
            }
    
            if (State != null)
            {
                State.GasSensorId = Id;
            }
    
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("State")
                    && (ChangeTracker.OriginalValues["State"] == State))
                {
                    ChangeTracker.OriginalValues.Remove("State");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("State", previousValue);
                    // Это основной конец идентифицирующей ассоциации, поэтому при удалении связи следует удалять и зависимый элемент.
                    // Если текущее состояние зависимого элемента - Added, связь может быть изменена, не вызывая удаления зависимого элемента.
                    if (previousValue != null && previousValue.ChangeTracker.State != ObjectState.Added)
                    {
                        previousValue.MarkAsDeleted();
                    }
                }
                if (State != null && !State.ChangeTracker.ChangeTrackingEnabled)
                {
                    State.StartTracking();
                }
            }
        }
    
        private void FixupEvents(object sender, NotifyCollectionChangedEventArgs e)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (e.NewItems != null)
            {
                foreach (GasSensorEvent item in e.NewItems)
                {
                    item.GasSensor = this;
                    if (ChangeTracker.ChangeTrackingEnabled)
                    {
                        if (!item.ChangeTracker.ChangeTrackingEnabled)
                        {
                            item.StartTracking();
                        }
                        ChangeTracker.RecordAdditionToCollectionProperties("Events", item);
                    }
                    // Это основной конец в ассоциации, выполняющей каскадные удаления.
                    // Обновите приемник событий с использованием ссылки на новый зависимый объект.
                    ChangeTracker.ObjectStateChanging += item.HandleCascadeDelete;
                }
            }
    
            if (e.OldItems != null)
            {
                foreach (GasSensorEvent item in e.OldItems)
                {
                    if (ReferenceEquals(item.GasSensor, this))
                    {
                        item.GasSensor = null;
                    }
                    if (ChangeTracker.ChangeTrackingEnabled)
                    {
                        ChangeTracker.RecordRemovalFromCollectionProperties("Events", item);
                        // Удалите зависимый конец этой идентифицирующей ассоциации. Если текущее состояние - Added,
                        // разрешите изменение связи без удаления зависимого элемента.
                        if (item.ChangeTracker.State != ObjectState.Added)
                        {
                            item.MarkAsDeleted();
                        }
                    }
                    // Это основной конец в ассоциации, выполняющей каскадные удаления.
                    // Удалите предыдущий зависимый элемент из приемника событий.
                    ChangeTracker.ObjectStateChanging -= item.HandleCascadeDelete;
                }
            }
        }

        #endregion

    }
}
