import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  HeartOrgan,
  ChildCognition,
  Lungs,
  Stomach,
  Thyroid,
  Kidneys,
  Skeleton
} from 'healthicons-react-native';
import { systems } from '../globalHelpers';

const medicationRoutes = [
  {
    key: 'iv',
    label: 'IV',
    check: (drug) => drug?.adult?.hasIV || drug?.pediatric?.hasIV,
    category: (drug) => {
      if (drug?.adult?.hasIV && drug?.pediatric?.hasIV) {
        return 'both';
      } else if (drug?.adult?.hasIV) {
        return 'adult';
      } else if (drug?.pediatric?.hasIV) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#E3F2FD',
    borderColor: '#2196F3',
    textColor: '#1565C0'
  },
  {
    key: 'io',
    label: 'IO',
    check: (drug) => drug?.adult?.hasIO || drug?.pediatric?.hasIO,
    category: (drug) => {
      if (drug?.adult?.hasIO && drug?.pediatric?.hasIO) {
        return 'both';
      } else if (drug?.adult?.hasIO) {
        return 'adult';
      } else if (drug?.pediatric?.hasIO) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#F3E5F5',
    borderColor: '#9C27B0',
    textColor: '#6A1B9A'
  },
  {
    key: 'im',
    label: 'IM',
    check: (drug) => drug?.adult?.hasIM || drug?.pediatric?.hasIM,
    category: (drug) => {
      if (drug?.adult?.hasIM && drug?.pediatric?.hasIM) {
        return 'both';
      } else if (drug?.adult?.hasIM) {
        return 'adult';
      } else if (drug?.pediatric?.hasIM) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#E8F5E9',
    borderColor: '#4CAF50',
    textColor: '#2E7D32'
  },
  {
    key: 'in',
    label: 'IN',
    check: (drug) => drug?.adult?.hasIN || drug?.pediatric?.hasIN,
    category: (drug) => {
      if (drug?.adult?.hasIN && drug?.pediatric?.hasIN) {
        return 'both';
      } else if (drug?.adult?.hasIN) {
        return 'adult';
      } else if (drug?.pediatric?.hasIN) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#FFF3E0',
    borderColor: '#FF9800',
    textColor: '#E65100'
  },
  {
    key: 'po',
    label: 'PO',
    check: (drug) => drug?.adult?.hasPO || drug?.pediatric?.hasPO,
    category: (drug) => {
      if (drug?.adult?.hasPO && drug?.pediatric?.hasPO) {
        return 'both';
      } else if (drug?.adult?.hasPO) {
        return 'adult';
      } else if (drug?.pediatric?.hasPO) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#FCE4EC',
    borderColor: '#E91E63',
    textColor: '#AD1457'
  },
  {
    key: 'sl',
    label: 'SL',
    check: (drug) => drug?.adult?.hasSL || drug?.pediatric?.hasSL,
    category: (drug) => {
      if (drug?.adult?.hasSL && drug?.pediatric?.hasSL) {
        return 'both';
      } else if (drug?.adult?.hasSL) {
        return 'adult';
      } else if (drug?.pediatric?.hasSL) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#F1F8E9',
    borderColor: '#8BC34A',
    textColor: '#558B2F'
  },
  {
    key: 'pr',
    label: 'PR',
    check: (drug) => drug?.adult?.hasPR || drug?.pediatric?.hasPR,
    category: (drug) => {
      if (drug?.adult?.hasPR && drug?.pediatric?.hasPR) {
        return 'both';
      } else if (drug?.adult?.hasPR) {
        return 'adult';
      } else if (drug?.pediatric?.hasPR) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#FFF9C4',
    borderColor: '#FDD835',
    textColor: '#F57F17'
  },
  {
    key: 'neb',
    label: 'NEB',
    check: (drug) => drug?.adult?.hasNEB || drug?.pediatric?.hasNEB,
    category: (drug) => {
      if (drug?.adult?.hasNEB && drug?.pediatric?.hasNEB) {
        return 'both';
      } else if (drug?.adult?.hasNEB) {
        return 'adult';
      } else if (drug?.pediatric?.hasNEB) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#E0F2F1',
    borderColor: '#009688',
    textColor: '#00695C'
  },
  {
    key: 'et',
    label: 'ET',
    check: (drug) => drug?.adult?.hasET || drug?.pediatric?.hasET,
    category: (drug) => {
      if (drug?.adult?.hasET && drug?.pediatric?.hasET) {
        return 'both';
      } else if (drug?.adult?.hasET) {
        return 'adult';
      } else if (drug?.pediatric?.hasET) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#EDE7F6',
    borderColor: '#673AB7',
    textColor: '#4527A0'
  },
  {
    key: 'sga',
    label: 'SGA',
    check: (drug) => drug?.adult?.hasSGA || drug?.pediatric?.hasSGA,
    category: (drug) => {
      if (drug?.adult?.hasSGA && drug?.pediatric?.hasSGA) {
        return 'both';
      } else if (drug?.adult?.hasSGA) {
        return 'adult';
      } else if (drug?.pediatric?.hasSGA) {
        return 'pediatric';
      }
      return null;
    },
    bgColor: '#FFEBEE',
    borderColor: '#F44336',
    textColor: '#C62828'
  }
];

const Badge = ({ label, bgColor, borderColor, textColor }) => (
  <View style={[
    badgeStyles.badge,
    { backgroundColor: bgColor, borderColor: borderColor }
  ]}>
    <Text style={[badgeStyles.badgeText, { color: textColor }]}>
      {label}
    </Text>
  </View>
);

export const HomeScreenHelpers = {
  getRoutes: (drug) => {
    const activeRoutes = medicationRoutes.filter(route => route.check(drug));
    
    if (activeRoutes.length === 0) return null;
    
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
        {activeRoutes.map((route) => {
          const cat = route.category(drug);
          let label;

          switch (cat) {
            case 'both':
              label = `${route.label}`
              break;
            case 'adult':
              label = `A: ${route.label}`
              break;
            case 'pediatric':
              label = `P: ${route.label}`
              break;
            default: 
              label = ''
          }

          return (
            <Badge
              key={route.key}
              label={label}
              bgColor={route.bgColor}
              borderColor={route.borderColor}
              textColor={route.textColor}
            />
          )
        })}
      </View>
    );
  },
    
    getSystem: (drug) => {
        if (!drug?.system) return null;

        const system = systems.find(sys => sys.value === drug.system);
        if (!system) return null;
        
        const IconComponent = {
            HeartOrgan,
            ChildCognition,
            Lungs,
            Stomach,
            Thyroid,
            Kidneys,
            Skeleton
        }[system.icon];
        if (!IconComponent) return null;
        
        return <IconComponent height={32} width={32} color={system.color} />;
    }
}

const badgeStyles = StyleSheet.create({
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 5,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
});