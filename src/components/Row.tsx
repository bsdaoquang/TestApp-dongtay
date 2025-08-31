import React from 'react';
import { FlexStyle, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';

export interface RowProps {
  children?: React.ReactNode;
  style?: object;
  onPress?: () => void;
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
  isWrap?: boolean;
}

const Row = ({
  children,
  style,
  onPress,
  justify,
  align,
  isWrap,
}: RowProps) => {
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        {
          flexWrap: isWrap ? 'wrap' : 'nowrap',
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
          flexWrap: isWrap ? 'wrap' : 'nowrap',
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
