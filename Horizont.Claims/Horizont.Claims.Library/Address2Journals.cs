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

namespace Horizont.Claims.Model
{
    [DataContract(IsReference = true)]
    [KnownType(typeof(Address))]
    [KnownType(typeof(Disp))]
    public partial class Address2Journals: IObjectWithChangeTracker, INotifyPropertyChanged
    {
        #region Свойства-примитивы
    
        [DataMember]
        public int DispId
        {
            get { return _dispId; }
            set
            {
                if (_dispId != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство DispId является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    if (!IsDeserializing)
                    {
                        if (Disp != null && Disp.Id != value)
                        {
                            Disp = null;
                        }
                    }
                    _dispId = value;
                    OnPropertyChanged("DispId");
                }
            }
        }
        private int _dispId;
    
        [DataMember]
        public int AddressId
        {
            get { return _addressId; }
            set
            {
                if (_addressId != value)
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added)
                    {
                        throw new InvalidOperationException("Свойство AddressId является частью ключа объекта, поэтому его нельзя изменить. Ключевые свойства можно изменять только в тех случаях, когда объект не отслеживается или находится в состоянии добавления.");
                    }
                    if (!IsDeserializing)
                    {
                        if (Address != null && Address.Id != value)
                        {
                            Address = null;
                        }
                    }
                    _addressId = value;
                    OnPropertyChanged("AddressId");
                }
            }
        }
        private int _addressId;
    
        [DataMember]
        public Nullable<int> JournalId
        {
            get { return _journalId; }
            set
            {
                if (_journalId != value)
                {
                    _journalId = value;
                    OnPropertyChanged("JournalId");
                }
            }
        }
        private Nullable<int> _journalId;
    
        [DataMember]
        public Nullable<bool> IsInclude
        {
            get { return _isInclude; }
            set
            {
                if (_isInclude != value)
                {
                    _isInclude = value;
                    OnPropertyChanged("IsInclude");
                }
            }
        }
        private Nullable<bool> _isInclude;

        #endregion

        #region Свойства навигации
    
        [DataMember]
        public Address Address
        {
            get { return _address; }
            set
            {
                if (!ReferenceEquals(_address, value))
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added && value != null)
                    {
                        // Это зависимый конец идентифицирующего отношения, поэтому основной конец изменить нельзя, если он уже задан,
                        // в противном случае для него может быть задана только сущность с первичным ключом, имеющим то же значение, что и у внешнего ключа зависимого элемента.
                        if (AddressId != value.Id)
                        {
                            throw new InvalidOperationException("Основной конец идентифицирующего отношения может быть изменен только тогда, когда зависимый конец находится в состоянии Added.");
                        }
                    }
                    var previousValue = _address;
                    _address = value;
                    FixupAddress(previousValue);
                    OnNavigationPropertyChanged("Address");
                }
            }
        }
        private Address _address;
    
        [DataMember]
        public Disp Disp
        {
            get { return _disp; }
            set
            {
                if (!ReferenceEquals(_disp, value))
                {
                    if (ChangeTracker.ChangeTrackingEnabled && ChangeTracker.State != ObjectState.Added && value != null)
                    {
                        // Это зависимый конец идентифицирующего отношения, поэтому основной конец изменить нельзя, если он уже задан,
                        // в противном случае для него может быть задана только сущность с первичным ключом, имеющим то же значение, что и у внешнего ключа зависимого элемента.
                        if (DispId != value.Id)
                        {
                            throw new InvalidOperationException("Основной конец идентифицирующего отношения может быть изменен только тогда, когда зависимый конец находится в состоянии Added.");
                        }
                    }
                    var previousValue = _disp;
                    _disp = value;
                    FixupDisp(previousValue);
                    OnNavigationPropertyChanged("Disp");
                }
            }
        }
        private Disp _disp;

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
            Address = null;
            Disp = null;
        }

        #endregion

        #region Исправление ассоциаций
    
        private void FixupAddress(Address previousValue)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (previousValue != null && previousValue.Address2Journals.Contains(this))
            {
                previousValue.Address2Journals.Remove(this);
            }
    
            if (Address != null)
            {
                if (!Address.Address2Journals.Contains(this))
                {
                    Address.Address2Journals.Add(this);
                }
    
                AddressId = Address.Id;
            }
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("Address")
                    && (ChangeTracker.OriginalValues["Address"] == Address))
                {
                    ChangeTracker.OriginalValues.Remove("Address");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("Address", previousValue);
                }
                if (Address != null && !Address.ChangeTracker.ChangeTrackingEnabled)
                {
                    Address.StartTracking();
                }
            }
        }
    
        private void FixupDisp(Disp previousValue)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (previousValue != null && previousValue.Address2Journals.Contains(this))
            {
                previousValue.Address2Journals.Remove(this);
            }
    
            if (Disp != null)
            {
                if (!Disp.Address2Journals.Contains(this))
                {
                    Disp.Address2Journals.Add(this);
                }
    
                DispId = Disp.Id;
            }
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("Disp")
                    && (ChangeTracker.OriginalValues["Disp"] == Disp))
                {
                    ChangeTracker.OriginalValues.Remove("Disp");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("Disp", previousValue);
                }
                if (Disp != null && !Disp.ChangeTracker.ChangeTrackingEnabled)
                {
                    Disp.StartTracking();
                }
            }
        }

        #endregion

    }
}