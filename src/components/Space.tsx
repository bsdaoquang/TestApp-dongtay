import { View, Text } from 'react-native';
import React from 'react';

interface SpaceProps {
  height?: number;
  width?: number;
}

const Space = ({ height, width }: SpaceProps) => {
  return <View style={{ height, width }} />;
};

export default Space;
