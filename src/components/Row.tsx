import React from 'react';
import { FlexStyle, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';

export interface RowProps {
  children?: React.ReactNode;
  style?: object;
  onPress?: () => void;
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
}

const Row = ({ children, style, onPress, justify, align }: RowProps) => {
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        {
          justifyContent: justify || 'space-between',
          alignItems: align || 'center',
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        globalStyles.row,
        {
          justifyContent: justify || 'space-between',
          alignItems: align || 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Row;
