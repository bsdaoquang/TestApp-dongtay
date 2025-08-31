import React from 'react';
import { View, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyle';

export interface SectionProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  styles?: ViewStyle | null | undefined;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  flex?: number;
}

const Section = ({
  children,
  padding,
  flex,
  margin,
  backgroundColor,
  justifyContent,
  alignItems,
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
          justifyContent: justifyContent ?? 'flex-start',
          alignItems: alignItems ?? 'stretch',
          flex: flex ?? 0,
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default Section;
