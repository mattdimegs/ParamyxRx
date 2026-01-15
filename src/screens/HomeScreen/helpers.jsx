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

const medicationRoutes = [
  {
    key: 'iv',
    label: 'IV',
    check: (drug) => drug?.dose?.adult?.iv !== null || drug?.dose?.pediatric?.iv !== null,
    bgColor: '#E3F2FD',
    borderColor: '#2196F3',
    textColor: '#1565C0'
  },
  {
    key: 'io',
    label: 'IO',
    check: (drug) => drug?.dose?.adult?.io !== null || drug?.dose?.pediatric?.io !== null,
    bgColor: '#F3E5F5',
    borderColor: '#9C27B0',
    textColor: '#6A1B9A'
  },
  {
    key: 'im',
    label: 'IM',
    check: (drug) => drug?.dose?.adult?.im !== null || drug?.dose?.pediatric?.im !== null,
    bgColor: '#E8F5E9',
    borderColor: '#4CAF50',
    textColor: '#2E7D32'
  },
  {
    key: 'in',
    label: 'IN',
    check: (drug) => drug?.dose?.adult?.in !== null || drug?.dose?.pediatric?.in !== null,
    bgColor: '#FFF3E0',
    borderColor: '#FF9800',
    textColor: '#E65100'
  },
  {
    key: 'po',
    label: 'PO',
    check: (drug) => drug?.dose?.adult?.po !== null || drug?.dose?.pediatric?.po !== null,
    bgColor: '#FCE4EC',
    borderColor: '#E91E63',
    textColor: '#AD1457'
  },
  {
    key: 'sl',
    label: 'SL',
    check: (drug) => drug?.dose?.adult?.sl !== null || drug?.dose?.pediatric?.sl !== null,
    bgColor: '#F1F8E9',
    borderColor: '#8BC34A',
    textColor: '#558B2F'
  },
  {
    key: 'rectal',
    label: 'Rectal',
    check: (drug) => drug?.dose?.adult?.r !== null || drug?.dose?.pediatric?.r !== null,
    bgColor: '#FFF9C4',
    borderColor: '#FDD835',
    textColor: '#F57F17'
  },
  {
    key: 'inhalation',
    label: 'Inhalation',
    check: (drug) => drug?.dose?.adult?.ih !== null || drug?.dose?.pediatric?.ih !== null,
    bgColor: '#E0F2F1',
    borderColor: '#009688',
    textColor: '#00695C'
  }
];

const systems = [
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
                {activeRoutes.map(route => (
                    <Badge
                        key={route.key}
                        label={route.label}
                        bgColor={route.bgColor}
                        borderColor={route.borderColor}
                        textColor={route.textColor}
                    />
                ))}
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