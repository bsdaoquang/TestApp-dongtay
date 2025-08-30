import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
