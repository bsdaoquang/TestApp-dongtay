import React from 'react';
import { View, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyle';

export interface SectionProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  styles?: ViewStyle | null | undefined;
}

const Section = ({
  children,
  padding,
  margin,
  backgroundColor,
  styles,
}: SectionProps) => {
  return (
    <View
      style={[
        globalStyles.section,
        {
          padding: padding ?? 16,
          margin: margin ?? 0,
          backgroundColor,
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default Section;
