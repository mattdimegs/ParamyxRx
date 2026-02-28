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
import {
  defaultMedicationRouteBadgeColors,
  medicationRouteBadgeColors,
  medicationRouteLabels,
  medicationRouteOrder,
  systems
} from '../globalHelpers';

export const getSystemIcon = (medicationSystem) => {
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

export const mapPurposeByRoute = (contentMap) => {
  if (!contentMap || typeof contentMap !== 'object') return {};

  const groupedMap = {};

  Object.entries(contentMap).forEach(([route, entries]) => {
    if (!Array.isArray(entries) || !entries.length) return;

    entries.forEach((entry) => {
      const purpose = entry?.purpose?.trim() || 'General';

      if (!groupedMap[purpose]) {
        groupedMap[purpose] = {};
      }

      if (!groupedMap[purpose][route]) {
        groupedMap[purpose][route] = [];
      }

      groupedMap[purpose][route].push(entry);
    });
  });

  const sortedGroupedMap = {};

  Object.entries(groupedMap).forEach(([purpose, routeMap]) => {
    const orderedRoutes = {};

    medicationRouteOrder.forEach((routeKey) => {
      if (routeMap[routeKey]) {
        orderedRoutes[routeKey] = routeMap[routeKey];
      }
    });

    Object.keys(routeMap).forEach((routeKey) => {
      if (!orderedRoutes[routeKey]) {
        orderedRoutes[routeKey] = routeMap[routeKey];
      }
    });

    sortedGroupedMap[purpose] = orderedRoutes;
  });

  return sortedGroupedMap;
};

const capitalizeFirstLetter = (value) => {
  if (typeof value !== 'string' || !value.length) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const getRouteLabel = (route) => {
  if (!route) return '';
  return medicationRouteLabels[route] || route.toUpperCase();
};

const getRouteBadgeColors = (route) => {
  return medicationRouteBadgeColors[route] || defaultMedicationRouteBadgeColors;
};

export const TabCard = ({
  cardKey,
  tabs,
  content
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.id)
  const [selectedRoutesByPurpose, setSelectedRoutesByPurpose] = useState({});
  const selectedTabContent = content?.[selectedTab];
  const groupedContent = mapPurposeByRoute(selectedTabContent);
  const groupedEntries = Object.entries(groupedContent);
  const totalMax = selectedTabContent?.totalMax;
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.universalCard} key={cardKey}>
      <View 
        key={cardKey}
        style={[
          styles.cardHeader,
          { 
            backgroundColor: 'rgb(244 246 242)'
          }
        ]}
      >
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 6,
            flex: 1
          }}
        >
          <View 
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            {tabs?.map((i, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === tabs.length - 1;
              return (
                <TouchableOpacity
                  key={idx}
                  style={{
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#A0A0A0',
                    width: 125,
                    paddingVertical: 1,
                    borderTopLeftRadius: isFirst ? 8 : 0,
                    borderBottomLeftRadius: isFirst ? 8 : 0,
                    borderTopRightRadius: isLast ? 8 : 0,
                    borderBottomRightRadius: isLast ? 8 : 0,
                    borderLeftWidth: isFirst ? 1 : 0,
                    backgroundColor: selectedTab === i?.id ? 'rgb(177 182 182)' : ''
                  }}
                  onPress={() => { return setSelectedTab(i?.id) }}
                >
                  <Text style={{ 
                    fontWeight: '600',
                    color: colors.text
                  }}>{i?.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <CardHeaderBorder />
      <View style={styles.contentCard}>
        {totalMax ? (
          <View style={[
            styles.tabTotalMaxContainer,
            totalMax.includes('Not Recommended')
              ? styles.tabNotRecommendedBorder
              : styles.tabTotalMaxBorder
          ]}>
            <Ionicons
              name={totalMax.includes('Not Recommended') 
                ? 'alert-circle' 
                : 'warning'
              }
              size={18}
              color={totalMax.includes('Not Recommended') 
                ? 'rgb(203 88 61)' 
                : 'rgb(226 161 59)'
              }
            />
            {totalMax.includes('Not Recommended') ? (
              <Text
                style={styles.tabNotRecommendedText}
              >
                {`Not recommended in the ${selectedTab} setting!`}
              </Text>
            ) : (
              <Text
                style={[styles.tabTotalMaxText]}
              >
                {`Total max: ${totalMax}`}
              </Text>
            )}
            <Ionicons
              name={totalMax.includes('Not Recommended') 
                ? 'alert-circle' 
                : 'warning'
              }
              size={18}
              color={totalMax.includes('Not Recommended') 
                ? 'rgb(203 88 61)' 
                : 'rgb(226 161 59)'
              }
            />
          </View>
        ) : null}
        {!totalMax && !groupedEntries.length ? (
          <Text style={styles.itemContentText}>No dosing information available.</Text>
        ) : (
          groupedEntries.map(([purpose, routes], purposeIdx) => {
            const isLastPurpose = purposeIdx === groupedEntries.length - 1;
            const routeKeys = Object.keys(routes);
            const selectedRoute = selectedRoutesByPurpose[purpose] || routeKeys[0];
            const selectedRouteEntries = routes?.[selectedRoute] || [];
            return (
              <View
                key={purpose}
                style={[
                  styles.tabPurposeContainer,
                  isLastPurpose ? styles.tabPurposeContainerLast : null
                ]}
              >
                {purpose !== 'General' ? (
                  <Text style={styles.tabPurposeText}>{purpose}</Text>
                ) : null }
                <View style={styles.tabRouteSelectorRow}>
                  {routeKeys.map((route) => {
                    const badgeColors = getRouteBadgeColors(route);
                    const isSelected = route === selectedRoute;
                    return (
                      <TouchableOpacity
                        key={`${purpose}-${route}`}
                        onPress={() => {
                          return setSelectedRoutesByPurpose((prev) => ({
                            ...prev,
                            [purpose]: route
                          }))
                        }}
                        accessibilityRole='button'
                        accessibilityState={{ selected: isSelected }}
                        style={[
                          styles.tabRouteBadge,
                          {
                            backgroundColor: badgeColors.bgColor,
                            borderColor: badgeColors.borderColor,
                            opacity: isSelected ? 1 : 0.55
                          },
                          isSelected ? styles.tabRouteBadgeSelected : null
                        ]}
                      >
                        <View style={styles.tabRouteBadgeContent}>
                          {isSelected ? (
                            <Ionicons
                              name='checkmark-circle'
                              size={12}
                              color={badgeColors.textColor}
                            />
                          ) : null}
                          <Text style={[
                            styles.tabRouteBadgeText,
                            { color: badgeColors.textColor },
                            isSelected ? styles.tabRouteBadgeTextSelected : null
                          ]}>
                            {getRouteLabel(route)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.tabRouteBodyContainer}>
                  {selectedRouteEntries.map((entry, idx) => {
                    const isLastEntry = idx === selectedRouteEntries.length - 1;
                    return (
                      <View
                        key={`${purpose}-${selectedRoute}-${idx}`}
                        style={[
                          styles.tabEntryContainer,
                          isLastEntry ? styles.tabEntryContainerLast : null
                        ]}
                      >
                        {entry?.amt ? (
                          <Text style={styles.tabAmountText}>{entry.amt}</Text>
                        ) : null}
                        {entry?.initMax ? (
                          <Text style={styles.tabMetaText}>{`Initial max: ${entry.initMax}`}</Text>
                        ) : null}
                        {entry?.adt ? (
                          <Text style={styles.tabDetailText}>{capitalizeFirstLetter(entry.adt)}</Text>
                        ) : null}
                        {entry?.repeat ? (
                          <Text style={styles.tabMetaText}>{`Repeat: ${entry.repeat}`}</Text>
                        ) : null}
                        {entry?.repeatMax ? (
                          <Text style={styles.tabMetaText}>{`Repeat max: ${entry.repeatMax}`}</Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>    
  );
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
        },
        !cardOpen ? { 
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8
        } : {}
      ]}
      onPress={() => { return setCardOpen(!cardOpen) }}
      >
      <View style={[
        styles.cardHeaderColorFlag,
        {
          backgroundColor: cardColor
        },
        !cardOpen ? { borderBottomLeftRadius: 8 } : {}
      ]} />
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
  defaultOpen = false,
  bulletIcon = null
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
                  <Ionicons name={bulletIcon || cardIcon} size={20} color={bulletIcon ? 'grey' : cardColor}/>
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
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 14
  },
  tabPurposeContainer: {
    paddingTop: 6,
    paddingBottom: 8,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  tabPurposeContainerLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  tabPurposeText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  tabRouteSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  tabRouteBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
  tabRouteBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  tabRouteBadgeSelected: {
    borderWidth: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  tabRouteBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabRouteBadgeTextSelected: {
    fontWeight: '700',
  },
  tabEntryContainer: {
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  tabEntryContainerLast: {
    borderBottomWidth: 0,
  },
  tabRouteBodyContainer: {
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: 8,
    backgroundColor: colors.groupedBackground,
  },
  tabAmountText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  tabDetailText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 17,
  },
  tabMetaText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 15,
  },
  tabTotalMaxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 4,
    marginBottom: '.75',
  },
  tabNotRecommendedBorder: {
    backgroundColor: 'rgb(251 240 233)',
    borderWidth: 1,
    borderColor: 'rgb(203 88 61)',
    borderRadius: 6,
  },
  tabTotalMaxBorder: {
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: '#E6D48C',
    borderRadius: 6,
  },
  tabNotRecommendedText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgb(203 88 61)',
  },
  tabTotalMaxText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7A6A1E',
  },
});