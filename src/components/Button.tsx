import { View, Text, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import Row from './Row';
import { globalStyles } from '../styles/globalStyle';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  styles?: ViewStyle | null;
  textStyles?: TextStyle | null;
}

const Button = (props: ButtonProps) => {
  const { title, onPress, styles, textStyles } = props;

  return (
    <Row onPress={onPress} style={[globalStyles.button, styles]}>
      <Text style={[globalStyles.buttonText, textStyles]}>{title}</Text>
    </Row>
  );
};

export default Button;
