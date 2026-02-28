import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { HomeScreenHelpers } from './helpers';
import { useHomeScreen } from '../../hooks/useHomeScreen';

const filters = [
  {
    id: 'route',
    name: 'Administration Route',
    options: [
      'Intravenous',
      'Intraosseous',
      'Intramuscular',
      'Intranasal',
      'Sublingual',
      'Rectal',
      'Inhalation',
      'Oral'
    ],
    multiSelect: true
  },
  {
    id: 'system',
    name: 'System',
    options: [
      'Cardiovascular',
      'Central Nervous',
      'Respiratory',
      'Gastrointestinal',
      'Endocrine',
      'Urinary',
      'Musculoskeletal'
    ],
    multiSelect: true
  },
  {
    id: 'class',
    name: 'Class',
    options: () => {
      const options = new Set();
      data?.forEach((i) => {
        i?.class?.forEach((e) => {
          options.add(e);
        });
      });
      return [...options];
    },
    multiSelect: true
  }
];

const regions = [
  'NMETC',
  'NREMT',
  'Connecticut',
  'Massachusetts',
  'Wisconsin'
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const data = useHomeScreen();
  const {
    medications,
    loading,
    error
  } = data;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [region, setRegion] = useState('NREMT');
  const [regionOpen, setRegionOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const [originalSortedData, setOriginalSortedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [completeData, setCompleteData] = useState(filteredData);

  useEffect(() => {
    if (medications && !loading && !error) {
      setOriginalSortedData(medications?.sort((a, b) => {
        if (a.generic < b.generic) {
          return -1;
        }
        if (a.generic > b.generic) {
          return 1;
        }
        return 0;
      }));
    }
  }, [medications]);

  useEffect(() => {
    setFilteredData(originalSortedData);
  }, [originalSortedData]);

  useEffect(() => {
    setCompleteData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    if (search) {
      const searchLowerCase = search.toLowerCase();
      const newData = [];
      filteredData?.forEach((i) => {
        if (i?.generic?.toLowerCase()?.startsWith(searchLowerCase) || i?.trade?.toLowerCase()?.startsWith(searchLowerCase)) {
          newData.push(i);
        }
      });
      setCompleteData(newData?.sort((a, b) => {
        if (a.generic < b.generic) {
          return -1;
        }
        if (a.generic > b.generic) {
          return 1;
        }
        return 0;
      }));
    } else {
      if (filteredData) {
        setCompleteData(filteredData);
      } else {
        setCompleteData(originalSortedData);
      }
    }
  }, [search]);

  useEffect(() => {
    console.log('filter: ', filter);
  }, [filter]);

  useEffect(() => {
    if (filterOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [filterOpen]);

  useEffect(() => {
    if (regionOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [regionOpen]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Medications</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => setRegionOpen(true)}>
          <Text>Region</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionsContainer}>
        <TextInput style={styles.searchBar} onChangeText={setSearch} value={search} placeholder='Search' />
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterOpen(true)}>
          <Text>Filters</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reset}>
        <TouchableOpacity onPress={() => {
          setCompleteData(originalSortedData);
          setSearch('');
          setFilter([]);
        }}>
          <Text style={styles.resetText}>Reset All Filters & Search</Text>
        </TouchableOpacity>
      </View>
      {loading || (completeData?.length === 0 && search === '') && !error ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : completeData?.length === 0 && !loading && !error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.noResultsText}>No medications found</Text>
        </View>
      ) : !loading && error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.noResultsText}>There has been an error.</Text>
          <Text style={styles.noResultsText}>Please restart the application.</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {completeData?.map((i, idx) => {
              return (
                <TouchableOpacity style={styles.card} key={`${i?.generic}_${idx}`} onPress={() => { 
                  return navigation.navigate('MedScreen', { drugId: i?.id });
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                      <Text style={styles.cardTitle}>{i?.generic}</Text>
                      {HomeScreenHelpers.getRoutes(i)}
                    </View>
                    {HomeScreenHelpers.getSystem(i)}
                    <View style={{ width: 12 }} />
                    <Ionicons name="chevron-forward-outline" />
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      )}
      <Modal
        visible={filterOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setFilterOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setFilterOpen(false)}
        >
          <Animated.View 
            style={[
              styles.modalContent, 
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <TouchableOpacity 
                style={styles.modalHeader}
                activeOpacity={1}
                onPress={() => setFilterOpen(false)}
              >
                <Text style={styles.modalTitle}>Filter Options</Text>
                <TouchableOpacity onPress={() => setFilterOpen(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <ScrollView style={styles.modalBody}>
                {filters?.map((i, idx) => {
                  return (
                    <View key={`${i?.id}_${idx}`}>
                      <Text style={styles.modalText}>{i?.name}</Text>
                      {i?.multiSelect ? (
                        <Text>Placeholder for now</Text>
                      ) : null}
                    </View>
                  )
                })}
              </ScrollView>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
      <Modal
        visible={regionOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setRegionOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setRegionOpen(false)}
        >
          <Animated.View 
            style={[
              styles.modalContent, 
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <TouchableOpacity 
                style={styles.modalHeader}
                activeOpacity={1}
                onPress={() => setRegionOpen(false)}
              >
                <Text style={styles.modalTitle}>Region Options</Text>
                <TouchableOpacity onPress={() => setRegionOpen(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <ScrollView style={styles.modalBody}>
                {[...regions].sort((a, b) => {
                  if (a === region) return -1;
                  if (b === region) return 1;
                  return a.localeCompare(b);
                })?.map((regionName, idx) => {
                  const isSelected = region === regionName;
                  return (
                    <TouchableOpacity 
                      key={`${regionName}_${idx}`}
                      style={[
                        styles.regionButton,
                        isSelected && styles.regionButtonSelected
                      ]}
                      onPress={() => {
                        setRegion(regionName);
                        setRegionOpen(false);
                      }}
                    >
                      <Text style={[
                        styles.regionButtonText,
                        isSelected && styles.regionButtonTextSelected
                      ]}>
                        {regionName}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
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
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  content: {
    padding: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '25%',
    borderRadius: 12
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '25%',
    borderRadius: 12
  },
  reset: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 8
  },
  resetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue'
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  cardSectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.text,
    marginTop: 4,
    marginBottom: 4
  },
  cardText: {
    fontSize: 15,
    color: colors.secondaryText,
    lineHeight: 22,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.separator,
    marginVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    fontSize: 24,
    color: colors.secondaryText,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    color: colors.text,
  },
  regionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.groupedBackground,
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  regionButtonSelected: {
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  regionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  regionButtonTextSelected: {
    fontWeight: '700',
    color: colors.primary,
  },
});
