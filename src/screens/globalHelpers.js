export const systems = [
  {
    value: 'Cardiovascular',
    color: '#C62828',
    icon: 'HeartOrgan'
  },
  {
    value: 'Central Nervous',
    color: '#6A1B9A',
    icon: 'ChildCognition'
  },
  {
    value: 'Respiratory',
    color: '#01579B',
    icon: 'Lungs'
  },
  {
    value: 'Gastrointestinal',
    color: '#E65100',
    icon: 'Stomach'
  },
  {
    value: 'Endocrine',
    color: '#2E7D32',
    icon: 'Thyroid'
  },
  {
    value: 'Urinary',
    color: '#00695C',
    icon: 'Kidneys'
  },
  {
    value: 'Musculoskeletal',
    color: '#F57F17',
    icon: 'Skeleton'
  }
];

export const medicationRouteLabels = {
  iv: 'IV',
  io: 'IO',
  im: 'IM',
  in: 'IN',
  po: 'PO',
  sl: 'SL',
  pr: 'PR',
  neb: 'NEB',
  et: 'ET',
  sga: 'SGA'
};

export const medicationRouteOrder = [
  'iv',
  'io',
  'im',
  'in',
  'po',
  'sl',
  'pr',
  'neb',
  'et',
  'sga'
];

export const medicationRouteBadgeColors = {
  iv: { bgColor: '#E3F2FD', borderColor: '#2196F3', textColor: '#1565C0' },
  io: { bgColor: '#F3E5F5', borderColor: '#9C27B0', textColor: '#6A1B9A' },
  im: { bgColor: '#E8F5E9', borderColor: '#4CAF50', textColor: '#2E7D32' },
  in: { bgColor: '#FFF3E0', borderColor: '#FF9800', textColor: '#E65100' },
  po: { bgColor: '#FCE4EC', borderColor: '#E91E63', textColor: '#AD1457' },
  sl: { bgColor: '#F1F8E9', borderColor: '#8BC34A', textColor: '#558B2F' },
  pr: { bgColor: '#FFF9C4', borderColor: '#FDD835', textColor: '#F57F17' },
  neb: { bgColor: '#E0F2F1', borderColor: '#009688', textColor: '#00695C' },
  et: { bgColor: '#EDE7F6', borderColor: '#673AB7', textColor: '#4527A0' },
  sga: { bgColor: '#FFEBEE', borderColor: '#F44336', textColor: '#C62828' }
};

export const defaultMedicationRouteBadgeColors = {
  bgColor: '#F5F5F5',
  borderColor: '#A0A0A0',
  textColor: '#4A4A4A'
};