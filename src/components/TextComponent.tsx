import React from 'react';
import { Text, TextStyle } from 'react-native';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyle';
import { colors } from '../constants/colors';

export interface TextComponentProps {
  text: string;
  type?: 'title' | 'body' | 'description';
  styles?: TextStyle | null;
  color?: string;
  size?: number;
  fontWeight?: TextStyle['fontWeight'];
  font?: string;
}

const TextComponent = (props: TextComponentProps) => {
  const { text, type, styles, color, size, fontWeight, font } = props;

  const style = {
    ...(type === 'title'
      ? globalStyles.title
      : type === 'body'
      ? globalStyles.body
      : globalStyles.description),
    ...(color ? { color } : {}),
    ...(size ? { fontSize: size } : {}),
    ...(fontWeight ? { fontWeight } : {}),
    ...(font ? { fontFamily: font } : {}),
  };

  return <Text style={[globalStyles.text, style, styles]}>{text}</Text>;
};

export default TextComponent;
