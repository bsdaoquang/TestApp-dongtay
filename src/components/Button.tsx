import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Row from './Row';
import { globalStyles } from '../styles/globalStyle';
import { colors } from '../constants/colors';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  styles?: ViewStyle | null;
  textStyles?: TextStyle | null;
  color?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { title, onPress, styles, textStyles, color, disabled, isLoading } =
    props;

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.row,
        {
          backgroundColor: disabled
            ? `${colors.placeholder}aa`
            : color
            ? color
            : colors.primary,
        },
        styles,
      ]}
    >
      {isLoading && <ActivityIndicator color={colors.bg} />}
      <Text style={[globalStyles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
