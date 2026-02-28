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
import { medicationRouteBadgeColors, medicationRouteLabels, systems } from '../globalHelpers';

const medicationRoutes = [
  {
    key: 'iv',
    label: medicationRouteLabels.iv,
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
    ...medicationRouteBadgeColors.iv
  },
  {
    key: 'io',
    label: medicationRouteLabels.io,
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
    ...medicationRouteBadgeColors.io
  },
  {
    key: 'im',
    label: medicationRouteLabels.im,
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
    ...medicationRouteBadgeColors.im
  },
  {
    key: 'in',
    label: medicationRouteLabels.in,
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
    ...medicationRouteBadgeColors.in
  },
  {
    key: 'po',
    label: medicationRouteLabels.po,
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
    ...medicationRouteBadgeColors.po
  },
  {
    key: 'sl',
    label: medicationRouteLabels.sl,
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
    ...medicationRouteBadgeColors.sl
  },
  {
    key: 'pr',
    label: medicationRouteLabels.pr,
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
    ...medicationRouteBadgeColors.pr
  },
  {
    key: 'neb',
    label: medicationRouteLabels.neb,
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
    ...medicationRouteBadgeColors.neb
  },
  {
    key: 'et',
    label: medicationRouteLabels.et,
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
    ...medicationRouteBadgeColors.et
  },
  {
    key: 'sga',
    label: medicationRouteLabels.sga,
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
    ...medicationRouteBadgeColors.sga
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