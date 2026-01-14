/**
 * HomeScreen - Main app screen after authentication
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const data = [
  {
    generic: 'Ketamine',
    trade: 'Ketalar',
    action: 'Blocks N-methyl-D-aspartate (NMDA) receptors in the central nervous system, reducing the perception of pain in the body.',
    dose: {
      adult: {
        iv: {
          amt: '0.5 - 2 mg/kg',
          adt: 'slow bolus, followed by NS flush.',
          max: null
        },
        io: {
          amt: '0.5 - 2 mg/kg',
          adt: 'slow bolus, followed by NS flush.',
          max: null
        },
        po: null,
        im: null,
        in: null,
        max: null
      },
      pediatric: {
        iv: {
          amt: '0.5 - 2 mg/kg',
          adt: 'slow bolus, followed by NS flush.',
          max: null
        },
        io: {
          amt: '0.5 - 2 mg/kg',
          adt: 'slow bolus, followed by NS flush.',
          max: null
        },
        po: null,
        im: null,
        in: null,
        max: null
      }
    },
    class: [
      'Analgesic',
      'Sedative'
    ],
    indications: [
      'Moderate to Severe Pain',
      'Procedural Sedation'
    ],
    contraindications: [
      'Hypersensitivity',
      'Stroke',
      'Severe Hypertension',
      'Intercranial Pressure'
    ],
    precautions: '',
    adverse: [
      'Hallucinations',
      'Agitation',
      'Nausea & Vomiting',
      'Tachycardia',
      'Hypertension',
      'Arrythmias',
      'Respiratory Depression'
    ],
    onset: {
      min: '30',
      max: '60',
      unit: 'seconds'
    },
    duration: {
      min: '20',
      max: '60',
      unit: 'minutes'
    },
    tip: 'Consider using a co-induction agent, such as Midazolam in certain patient populations to help minimize the risk of adverse reactions.'
  },
  {
    generic: 'Fentanyl',
    trade: 'Sublimaze',
    action: 'Binds to mu-opioid receptors in the central nervous system, leading to an icreased potassium efflux and decreased calcium influx.',
    dose: {
      adult: {
        iv: {
          amt: '0.5 - 2 mcg/kg',
          adt: 'slow bolus, followed by NS flush.',
          repeat: '5 - 10 minutes',
          max: '100 mcg'
        },
        io: {
          amt: '0.5 - 2 mcg/kg',
          adt: 'slow bolus, followed by NS flush.',
          repeat: '5 - 10 minutes',
          max: '100 mcg'
        },
        po: null,
        im: null,
        in: null,
        max: '300 mcg'
      },
      pediatric: {
        iv: {
          amt: '0.5 - 1 mcg/kg',
          adt: 'slow bolus, followed by NS flush.',
          repeat: '5 - 10 minutes',
          max: '100 mcg'
        },
        io: {
          amt: '0.5 - 1 mcg/kg',
          adt: 'slow bolus, followed by NS flush.',
          repeat: '5 - 10 minutes',
          max: '100 mcg'
        },
        po: null,
        im: null,
        in: null,
        max: '3 mcg/kg'
      }
    },
    class: [
      'Opioid Analgesic'
    ],
    indications: [
      'Moderate to Severe Pain',
      'Procedural Sedation'
    ],
    contraindications: [
      'Hypersensitivity',
      'CNS & Respiratory Depression',
      'Hypotension',
      'Arrythmias',
      'Myasthenia Gravis'
    ],
    precautions: '',
    adverse: [
      'Drowsiness',
      'Delirium',
      'Nausea & Vomiting',
      'Hypotension',
      'Bradycardia',
      'Respiratory Depression',
      'Chest Wall Rigidity',
      'Overdose'
    ],
    onset: {
      min: '1',
      max: '2',
      unit: 'minutes'
    },
    duration: {
      min: '30',
      max: '60',
      unit: 'minutes'
    },
    tip: 'Use appropriate PPE to avoid exposure when handling Fentanyl, as it is quite easy to overdose on it.'
  }
];
const filters = [
  {
    id: 'route',
    name: 'Administration Route',
    options: [
      {value: 'Intravenous'},
      {value: 'Intraosseous'},
      {value: 'Intramuscular'},
      {value: 'Sublingual'},
      {value: 'Rectal'},
      {value: 'Inhalation'},
      {value: 'Oral'}
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

export default function HomeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const originalSortedData = data?.sort((a, b) => {
      if (a.generic < b.generic) {
        return -1;
      }
      if (a.generic > b.generic) {
        return 1;
      }
      return 0;
    });
  const [filteredData, setFilteredData] = useState(originalSortedData);
  const [completeData, setCompleteData] = useState(filteredData);

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
      setCompleteData(originalSortedData);
    }
  }, [search]);

  useEffect(() => {
    console.log('filter: ', filter)
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

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TextInput style={styles.searchBar} onChangeText={setSearch} value={search} placeholder='Search' />
        <TouchableOpacity style={styles.button} onPress={() => setFilterOpen(true)}>
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {completeData?.map((i, idx) => {
            return (
              <View style={styles.card} key={`${i?.generic}_${idx}`}>
                <Text style={styles.cardTitle}>{i?.generic}</Text>
                <Text style={styles.cardText}>{i?.action}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
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
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.groupedBackground,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
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
  button: {
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
  cardText: {
    fontSize: 15,
    color: colors.secondaryText,
    lineHeight: 22,
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
});
