import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

interface ColProps {
  children: React.ReactNode;
  flex?: number;
  onPress?: () => void;
  styles?: ViewStyle | ViewStyle[];
}

const Col = (props: ColProps) => {
  const { children, flex = 1, onPress, styles } = props;
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[{ flex }, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[{ flex }, styles]} onTouchEnd={onPress}>
      {children}
    </View>
  );
};

export default Col;
