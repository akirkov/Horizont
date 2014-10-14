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
    [KnownType(typeof(CessationClaim))]
    [KnownType(typeof(Disp))]
    public partial class CessationClaimHistoryItem: IObjectWithChangeTracker, INotifyPropertyChanged
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
        public Nullable<int> ClaimId
        {
            get { return _claimId; }
            set
            {
                if (_claimId != value)
                {
                    ChangeTracker.RecordOriginalValue("ClaimId", _claimId);
                    if (!IsDeserializing)
                    {
                        if (CessationClaim != null && CessationClaim.Id != value)
                        {
                            CessationClaim = null;
                        }
                    }
                    _claimId = value;
                    OnPropertyChanged("ClaimId");
                }
            }
        }
        private Nullable<int> _claimId;
    
        [DataMember]
        public string AddressStr
        {
            get { return _addressStr; }
            set
            {
                if (_addressStr != value)
                {
                    _addressStr = value;
                    OnPropertyChanged("AddressStr");
                }
            }
        }
        private string _addressStr;
    
        [DataMember]
        public string Abonent
        {
            get { return _abonent; }
            set
            {
                if (_abonent != value)
                {
                    _abonent = value;
                    OnPropertyChanged("Abonent");
                }
            }
        }
        private string _abonent;
    
        [DataMember]
        public Nullable<int> CessationObject
        {
            get { return _cessationObject; }
            set
            {
                if (_cessationObject != value)
                {
                    _cessationObject = value;
                    OnPropertyChanged("CessationObject");
                }
            }
        }
        private Nullable<int> _cessationObject;
    
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
    
        [DataMember]
        public Nullable<int> ObjectType
        {
            get { return _objectType; }
            set
            {
                if (_objectType != value)
                {
                    _objectType = value;
                    OnPropertyChanged("ObjectType");
                }
            }
        }
        private Nullable<int> _objectType;
    
        [DataMember]
        public Nullable<int> ObjectsCount
        {
            get { return _objectsCount; }
            set
            {
                if (_objectsCount != value)
                {
                    _objectsCount = value;
                    OnPropertyChanged("ObjectsCount");
                }
            }
        }
        private Nullable<int> _objectsCount;
    
        [DataMember]
        public Nullable<int> FlatsCount
        {
            get { return _flatsCount; }
            set
            {
                if (_flatsCount != value)
                {
                    _flatsCount = value;
                    OnPropertyChanged("FlatsCount");
                }
            }
        }
        private Nullable<int> _flatsCount;
    
        [DataMember]
        public string Applicant
        {
            get { return _applicant; }
            set
            {
                if (_applicant != value)
                {
                    _applicant = value;
                    OnPropertyChanged("Applicant");
                }
            }
        }
        private string _applicant;
    
        [DataMember]
        public string Basis
        {
            get { return _basis; }
            set
            {
                if (_basis != value)
                {
                    _basis = value;
                    OnPropertyChanged("Basis");
                }
            }
        }
        private string _basis;
    
        [DataMember]
        public string BasisComment
        {
            get { return _basisComment; }
            set
            {
                if (_basisComment != value)
                {
                    _basisComment = value;
                    OnPropertyChanged("BasisComment");
                }
            }
        }
        private string _basisComment;
    
        [DataMember]
        public string OrgName
        {
            get { return _orgName; }
            set
            {
                if (_orgName != value)
                {
                    _orgName = value;
                    OnPropertyChanged("OrgName");
                }
            }
        }
        private string _orgName;
    
        [DataMember]
        public string Comment
        {
            get { return _comment; }
            set
            {
                if (_comment != value)
                {
                    _comment = value;
                    OnPropertyChanged("Comment");
                }
            }
        }
        private string _comment;
    
        [DataMember]
        public string ReceivedOperator
        {
            get { return _receivedOperator; }
            set
            {
                if (_receivedOperator != value)
                {
                    _receivedOperator = value;
                    OnPropertyChanged("ReceivedOperator");
                }
            }
        }
        private string _receivedOperator;
    
        [DataMember]
        public Nullable<System.DateTime> ReceivedTime
        {
            get { return _receivedTime; }
            set
            {
                if (_receivedTime != value)
                {
                    _receivedTime = value;
                    OnPropertyChanged("ReceivedTime");
                }
            }
        }
        private Nullable<System.DateTime> _receivedTime;
    
        [DataMember]
        public Nullable<bool> IsLegate
        {
            get { return _isLegate; }
            set
            {
                if (_isLegate != value)
                {
                    _isLegate = value;
                    OnPropertyChanged("IsLegate");
                }
            }
        }
        private Nullable<bool> _isLegate;
    
        [DataMember]
        public string ExecutedOperator
        {
            get { return _executedOperator; }
            set
            {
                if (_executedOperator != value)
                {
                    _executedOperator = value;
                    OnPropertyChanged("ExecutedOperator");
                }
            }
        }
        private string _executedOperator;
    
        [DataMember]
        public Nullable<System.DateTime> ExecutedTime
        {
            get { return _executedTime; }
            set
            {
                if (_executedTime != value)
                {
                    _executedTime = value;
                    OnPropertyChanged("ExecutedTime");
                }
            }
        }
        private Nullable<System.DateTime> _executedTime;
    
        [DataMember]
        public Nullable<int> DispId
        {
            get { return _dispId; }
            set
            {
                if (_dispId != value)
                {
                    ChangeTracker.RecordOriginalValue("DispId", _dispId);
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
        private Nullable<int> _dispId;
    
        [DataMember]
        public string RegNumber
        {
            get { return _regNumber; }
            set
            {
                if (_regNumber != value)
                {
                    _regNumber = value;
                    OnPropertyChanged("RegNumber");
                }
            }
        }
        private string _regNumber;
    
        [DataMember]
        public Nullable<System.DateTime> ChangeTime
        {
            get { return _changeTime; }
            set
            {
                if (_changeTime != value)
                {
                    _changeTime = value;
                    OnPropertyChanged("ChangeTime");
                }
            }
        }
        private Nullable<System.DateTime> _changeTime;
    
        [DataMember]
        public string ChangeOperator
        {
            get { return _changeOperator; }
            set
            {
                if (_changeOperator != value)
                {
                    _changeOperator = value;
                    OnPropertyChanged("ChangeOperator");
                }
            }
        }
        private string _changeOperator;
    
        [DataMember]
        public Nullable<int> ChangeId
        {
            get { return _changeId; }
            set
            {
                if (_changeId != value)
                {
                    _changeId = value;
                    OnPropertyChanged("ChangeId");
                }
            }
        }
        private Nullable<int> _changeId;

        #endregion

        #region Свойства навигации
    
        [DataMember]
        public CessationClaim CessationClaim
        {
            get { return _cessationClaim; }
            set
            {
                if (!ReferenceEquals(_cessationClaim, value))
                {
                    var previousValue = _cessationClaim;
                    _cessationClaim = value;
                    FixupCessationClaim(previousValue);
                    OnNavigationPropertyChanged("CessationClaim");
                }
            }
        }
        private CessationClaim _cessationClaim;
    
        [DataMember]
        public Disp Disp
        {
            get { return _disp; }
            set
            {
                if (!ReferenceEquals(_disp, value))
                {
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
            CessationClaim = null;
            Disp = null;
        }

        #endregion

        #region Исправление ассоциаций
    
        private void FixupCessationClaim(CessationClaim previousValue, bool skipKeys = false)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (CessationClaim != null)
            {
                ClaimId = CessationClaim.Id;
            }
    
            else if (!skipKeys)
            {
                ClaimId = null;
            }
    
            if (ChangeTracker.ChangeTrackingEnabled)
            {
                if (ChangeTracker.OriginalValues.ContainsKey("CessationClaim")
                    && (ChangeTracker.OriginalValues["CessationClaim"] == CessationClaim))
                {
                    ChangeTracker.OriginalValues.Remove("CessationClaim");
                }
                else
                {
                    ChangeTracker.RecordOriginalValue("CessationClaim", previousValue);
                }
                if (CessationClaim != null && !CessationClaim.ChangeTracker.ChangeTrackingEnabled)
                {
                    CessationClaim.StartTracking();
                }
            }
        }
    
        private void FixupDisp(Disp previousValue, bool skipKeys = false)
        {
            if (IsDeserializing)
            {
                return;
            }
    
            if (Disp != null)
            {
                DispId = Disp.Id;
            }
    
            else if (!skipKeys)
            {
                DispId = null;
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
