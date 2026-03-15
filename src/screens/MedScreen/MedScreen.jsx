import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useMedScreen } from '../../hooks/useMedScreen';
import {
  ContentCard,
  SystemIcon,
  ItemCard,
  TabCard,
  TimeCard
} from './helpers';

export default function MedScreen({ route }) {
  const { drugId } = route.params;

  const navigation = useNavigation();
  const { medication, loading, error } = useMedScreen(drugId);
  const { colors, activeTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);
  const cardHeaderColors = {
    action: activeTheme === 'dark' ? 'rgb(10 25 40)' : 'rgb(229 241 246)',
    indications: activeTheme === 'dark' ? 'rgb(12 28 12)' : 'rgb(230, 244, 227)',
    contraindications: activeTheme === 'dark' ? 'rgb(45 15 8)' : 'rgb(251 240 233)',
    adverse: activeTheme === 'dark' ? 'rgb(20 12 45)' : 'rgb(243 240 255)',
    precautions: activeTheme === 'dark' ? 'rgb(38 28 8)' : 'rgb(250 244 232)',
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => { 
            return navigation.goBack() 
          }}
        >
          <Ionicons name="chevron-back-outline" style={styles.headerTitle} />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>{medication?.generic}</Text>
      </View>
      {loading && !error ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !loading && error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.noResultsText}>There has been an error.</Text>
          <Text style={styles.noResultsText}>Please restart the application.</Text>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {/* Trade/Classes/System */}
          <View style={styles.card}>
            <View>
              {medication?.generic !== medication?.trade ? (
                <Text style={styles.cardTitle}>{medication?.trade}</Text>
              ) : null}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                {medication?.class?.map((i, idx) => {
                  return (
                    <View key={idx} style={styles.badge}>
                      <Text style={styles.badgeText}>{i}</Text>
                    </View>
                  );
                })}
                <View style={styles.badge}>
                  <SystemIcon system={medication?.system} />
                  <Text style={styles.badgeText}>{`${medication?.system} System`}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Onset/Duration */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <TimeCard content={medication?.onset} type='Onset' />
            <TimeCard content={medication?.duration} type='Duration' />
          </View>
          <TabCard cardKey='tabs'
            tabs={[
              { id: 'adult', label: 'Adult' },
              { id: 'pediatric', label: 'Pediatric' }
            ]}
            content={{
              adult: medication?.adult,
              pediatric: medication?.pediatric
            }}
          />
          <ContentCard cardKey='action'
            cardColor='rgb(56 124 167)'
            cardIcon='information-circle-outline'
            cardTitle='Medication Action'
            content={medication?.action}
            headerColor={cardHeaderColors.action}
          />
          <ItemCard cardKey='indications'
            cardColor='rgb(101, 157, 85)'
            cardIcon='checkmark-circle'
            cardTitle='Indications'
            contentMap={medication?.indications}
            headerColor={cardHeaderColors.indications}
          />
          <ItemCard cardKey='contraindications'
            cardColor='rgb(203 88 61)'
            cardIcon='close-circle'
            cardTitle='Contraindications'
            contentMap={medication?.contraindications}
            headerColor={cardHeaderColors.contraindications}
            defaultOpen
          />
          <ItemCard cardKey='adverse'
            cardColor='rgb(107 70 193)'
            cardIcon='nuclear'
            cardTitle='Adverse Effects'
            contentMap={medication?.adverse}
            headerColor={cardHeaderColors.adverse}
            bulletIcon='caret-forward-outline'
          />
          <ContentCard cardKey='precautions'
            cardColor='rgb(226 161 59)'
            cardIcon='warning'
            cardTitle='Precautionary Statement'
            content={medication?.precautions}
            headerColor={cardHeaderColors.precautions}
          />
          {medication?.tip ? (
            <ContentCard cardKey='tips'
              cardColor='rgb(56 124 167)'
              cardIcon='information-circle-outline'
              cardTitle='Field Tips'
              content={medication?.tip}
              headerColor={cardHeaderColors.action}
            />
          ) : null}
        {/* Content */}  
        </ScrollView>
      )}
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.groupedBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    padding: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 20,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  badge: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.systemGray5,
    marginRight: 2,
    borderWidth: 1,
    borderColor: colors.systemGray3
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text,
  }
});
