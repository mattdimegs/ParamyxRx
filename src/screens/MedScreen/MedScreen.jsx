import React from 'react';
import {
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
        <TouchableOpacity style={styles.headerTouchable} onPress={() => { return navigation.goBack() }}>
          <Ionicons name="chevron-back-outline" style={styles.headerTitle} />
          <Text style={styles.headerTitle}>{medication?.generic}</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  headerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.text,
  }
});
