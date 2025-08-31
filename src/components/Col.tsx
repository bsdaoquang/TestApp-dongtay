import { View, Text } from 'react-native';
import React from 'react';

interface ColProps {
  children: React.ReactNode;
  flex?: number;
}

const Col = (props: ColProps) => {
  const { children, flex = 1 } = props;
  return <View style={{ flex }}>{children}</View>;
};

export default Col;
