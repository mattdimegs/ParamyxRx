import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {
  HeartOrgan,
  ChildCognition,
  Lungs,
  Stomach,
  Thyroid,
  Kidneys,
  Skeleton
} from 'healthicons-react-native/outline';
import { systems } from '../globalHelpers';

export const SystemIcon = ({ medicationSystem }) => {
  if (!medicationSystem) return null;
  
  const system = systems.find(sys => sys.value === medicationSystem);
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
  
  return <IconComponent height={20} width={20} color='grey' />;
}

export const TimeCard = ({
  content,
  type
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={[styles.timeCard, { width: '49%' }]}>
      {content?.unit === 'immediate' ? (
        <Text style={styles.timeCardText}>Immediate {type}</Text>
      ) : (
        <Text style={styles.timeCardText}>
          {`${type}: ${content?.min} - ${content?.max} ${content?.unit}`}
        </Text>
      )}
    </View>
  )
}

export const CardHeader = ({
  cardKey,
  cardColor,
  cardIcon,
  cardTitle,
  headerColor,
  cardOpen,
  setCardOpen,
  colors,
  styles
}) => {
  return (
    <TouchableOpacity 
      key={cardKey}
      style={[
        styles.cardHeader,
        { 
          backgroundColor: headerColor
        }
      ]}
      onPress={() => { return setCardOpen(!cardOpen) }}
      >
      <View style={[styles.cardHeaderColorFlag, { backgroundColor: cardColor }]} />
      <View style={styles.cardHeaderContent}>
        <View style={styles.cardHeaderTitleContainer}>
          <Ionicons name={cardIcon} size={20} color={cardColor} />
          <Text style={styles.cardHeaderText}>{cardTitle}</Text>
        </View>
        {cardOpen ? (
          <Ionicons name='chevron-back-outline' size={20} color={colors.text} />
        ) : (
          <Ionicons name='chevron-down-outline' size={20} color={colors.text} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export const CardHeaderBorder = () => {
  return (
    <View style={{ borderWidth: '.6', borderColor: 'rgb(232 233 232)' }} />
  );
};

export const ContentCard = ({
  cardKey,
  cardColor,
  cardIcon,
  cardTitle,
  content,
  headerColor,
  defaultOpen = false
}) => {
  const [cardOpen, setCardOpen] = useState(defaultOpen);
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.universalCard} key={cardKey}>
      <CardHeader
        cardKey={cardKey}
        cardColor={cardColor}
        cardIcon={cardIcon}
        cardTitle={cardTitle}
        headerColor={headerColor}
        colors={colors}
        styles={styles}
        cardOpen={cardOpen}
        setCardOpen={setCardOpen}
      />
      {cardOpen ? (
        <View>
          <CardHeaderBorder />
          <View style={styles.contentCard}>
            <Text>{content}</Text>
          </View>
        </View>
       ) : null}
    </View>
  );
};

export const ItemCard = ({
  cardKey,
  cardColor,
  cardIcon,
  cardTitle,
  contentMap,
  headerColor,
  defaultOpen = false
}) => {
  const [cardOpen, setCardOpen] = useState(defaultOpen);
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.universalCard} key={cardKey}>
      <CardHeader
        cardKey={cardKey}
        cardColor={cardColor}
        cardIcon={cardIcon}
        cardTitle={cardTitle}
        headerColor={headerColor}
        colors={colors}
        styles={styles}
        cardOpen={cardOpen}
        setCardOpen={setCardOpen}
      />
      {cardOpen ? (
        <View>
          <CardHeaderBorder />
          <View style={styles.itemCardContent}>
            {contentMap?.map((i, idx) => {
              return (
                <View style={styles.itemCardHeaderContent} key={idx}>
                  <Ionicons name={cardIcon} size={20} color={cardColor}/>
                  <Text style={styles.itemContentText}>{i}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  timeCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  timeCardText: {
    fontSize: 12,
    color: colors.text
  },
  cardHeader: {
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  cardHeaderColorFlag: {
    borderTopLeftRadius: 8,
    paddingHorizontal: 6
  },
  cardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
  },
  cardHeaderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  universalCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemCardContent: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 13
  },
  itemCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4
  },
  itemContentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
  },
  contentCard: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 20
  },
});