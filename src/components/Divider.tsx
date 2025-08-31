import React from 'react';
import { DimensionValue, View, ViewProps, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  length?: DimensionValue;
  styles?: ViewStyle;
};

const Divider = (props: DividerProps) => {
  const {
    orientation = 'horizontal',
    thickness = 1,
    color = colors.primary,
    length = '100%',
    styles,
  } = props;

  const dividerStyle: ViewStyle =
    orientation === 'horizontal'
      ? {
          height: thickness,
          width: length ?? '100%',
          backgroundColor: color,
          marginVertical: 8,
        }
      : {
          width: thickness,
          height: length ?? '100%',
          backgroundColor: color,
          marginHorizontal: 8,
        };

  return <View style={[dividerStyle, styles]} />;
};

export default Divider;
