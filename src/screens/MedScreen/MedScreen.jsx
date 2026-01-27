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

export default function MedScreen({ route }) {
  const { drugId } = route.params;

  const navigation = useNavigation();
  const { medication, loading, error } = useMedScreen(drugId);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);

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
                  <Text style={styles.badgeText}>{`${medication?.system} System`}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Onset/Duration */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <View style={[styles.onsetDurationCard, { width: '49%' }]}>
                {medication?.onset?.unit === 'immediate' ? (
                  <Text style={styles.onsetDurationText}>Immediate Onset</Text>
                ) : (
                  <Text style={styles.onsetDurationText}>
                    {`Onset: ${medication?.onset?.min} - ${medication?.onset?.max} ${medication?.onset?.unit}`}
                  </Text>
                )}
            </View>
            <View style={[styles.onsetDurationCard, { width: '49%' }]}>
              {medication?.duration?.unit === 'immediate' ? (
                <Text style={styles.onsetDurationText}>Immediate Onset</Text>
              ) : (
                <Text style={styles.onsetDurationText}>
                  {`Duration: ${medication?.duration?.min} - ${medication?.duration?.max} ${medication?.duration?.unit}`}
                </Text>
              )}
            </View>
          </View>
          {/* Indications */}  
          <View style={styles.indicationCard}>
            <View style={styles.indicationCardHeader}>
              <View style={styles.indicationCardHeaderColorFlag} />
              <View style={styles.indicationCardHeaderContent}>
                <Ionicons name="checkmark-circle" size={20} color="rgb(101, 157, 85)" />
                <Text style={styles.indicationCardHeaderText}>Indications</Text>
              </View>
            </View>
            <View style={{ borderWidth: '.6', borderColor: 'rgb(232 233 232)' }} />
            <View style={styles.indicationCardContent}>
              {medication?.indications?.map((i) => {
                return (
                  <View style={styles.indicationCardHeaderContent}>
                    <Ionicons name="checkmark-circle" size={20} color="rgb(101, 157, 85)" />
                    <Text style={styles.indicationContentText}>{i}</Text>
                  </View>
                )
              })}
            </View>
          </View>
          {/* Contraindications */}  
          <View style={styles.contraCard}>
            <View style={styles.contraCardHeader}>
              <View style={styles.contraCardHeaderColorFlag} />
              <View style={styles.contraCardHeaderContent}>
                <Ionicons name="close-circle" size={20} color="rgb(203 88 61)" />
                <Text style={styles.contraCardHeaderText}>Contraindications</Text>
              </View>
            </View>
            <View style={{ borderWidth: '.6', borderColor: 'rgb(232 233 232)' }} />
            <View style={styles.contraCardContent}>
              {medication?.contraindications?.map((i) => {
                return (
                  <View style={styles.contraCardHeaderContent}>
                    <Ionicons name="close-circle" size={20} color="rgb(203 88 61)" />
                    <Text style={styles.contraContentText}>{i}</Text>
                  </View>
                )
              })}
            </View>
          </View>
          {/* Precautionary Statement */}  
          <View style={styles.warningCard}>
            <View style={styles.warningCardHeader}>
              <View style={styles.warningCardHeaderColorFlag} />
              <View style={styles.warningCardHeaderContent}>
                <Ionicons name="warning" size={20} color="rgb(226 161 59)" />
                <Text style={styles.warningCardHeaderText}>Precautionary Statement</Text>
              </View>
            </View>
            <View style={{ borderWidth: '.6', borderColor: 'rgb(232 233 232)' }} />
            <View style={styles.warningCardContent}>
              <Text>{medication?.precautions}</Text>
            </View>
          </View>
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#D5D5D5',
    marginRight: 2,
    borderWidth: 1,
    borderColor: '#A0A0A0'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '400'
  },
  onsetDurationCard: {
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
  onsetDurationText: {
    fontSize: 12,
    color: colors.text
  },
  indicationCard: {
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
  indicationCardHeader: {
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgb(230, 244, 227)'
  },
  indicationCardHeaderColorFlag: {
    borderTopLeftRadius: 8,
    paddingHorizontal: 6,
    backgroundColor: 'rgb(101, 157, 85)'
  },
  indicationCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4
  },
  indicationCardHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  indicationCardContent: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 13
  },
  indicationContentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
  },
  contraCard: {
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
  contraCardHeader: {
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgb(251 240 233)'
  },
  contraCardHeaderColorFlag: {
    borderTopLeftRadius: 8,
    paddingHorizontal: 6,
    backgroundColor: 'rgb(203 88 61)'
  },
  contraCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4
  },
  contraCardHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  contraCardContent: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 13
  },
  contraContentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
  },
  warningCard: {
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
  warningCardHeader: {
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgb(250 244 232)'
  },
  warningCardHeaderColorFlag: {
    borderTopLeftRadius: 8,
    paddingHorizontal: 6,
    backgroundColor: 'rgb(226 161 59)'
  },
  warningCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4
  },
  warningCardHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  warningCardContent: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  warningContentText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
  }
});
