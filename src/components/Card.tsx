import { View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyle';

interface CardProps {
  children: React.ReactNode;
  styles?: ViewStyle;
  padding?: number;
  marginBottom?: number;
  radius?: number;
  onPress?: () => void;
}

const Card = ({
  children,
  styles,
  padding,
  marginBottom,
  radius,
  onPress,
}: CardProps) => {
  const cardStyles = [
    globalStyles.card,
    {
      padding: padding ?? 12,
      marginBottom: marginBottom ?? 18,
      borderRadius: radius ?? 8,
      ...styles,
    },
  ];

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={cardStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={cardStyles}>{children}</View>
  );
};

export default Card;
