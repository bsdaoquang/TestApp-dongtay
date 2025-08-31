import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyle';
import Space from './Space';
import TextComponent from './TextComponent';

interface LoadingProps {
  message?: string;
}

const Loading = (props: LoadingProps) => {
  const { message } = props;
  return (
    <Modal
      style={[globalStyles.container]}
      statusBarTranslucent
      transparent
      animationType="fade"
    >
      <View
        style={[
          globalStyles.center,
          globalStyles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        ]}
      >
        <ActivityIndicator color={colors.text} />
        <Space height={8} />
        <TextComponent text={message || 'Loading...'} type="description" />
      </View>
    </Modal>
  );
};

export default Loading;
