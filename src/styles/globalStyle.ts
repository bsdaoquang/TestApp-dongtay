import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    padding: 16,
    backgroundColor: colors.bg,
  },

  title: {
    fontFamily: fontFamilies.medium,
    fontSize: 32,
    lineHeight: 44,
    color: colors.title,
  },

  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },

  description: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.description,
  },

  containerInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 48,
  },

  inputStyle: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    color: colors.text,
    // backgroundColor: 'coral',
    width: '100%',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
  },

  buttonText: {
    fontFamily: fontFamilies.regular,
    fontSize: 22,
    lineHeight: 24,
    color: `${colors.text}cc`,
  },
});
