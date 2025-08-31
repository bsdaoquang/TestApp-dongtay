import { ArrowLeft } from 'iconsax-react-nativejs';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Section, TextComponent } from '.';
import { globalStyles } from '../styles/globalStyle';
import Loading from './Loading';
import Row from './Row';
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';

export interface ContainerProps {
  children: React.ReactNode;
  loading?: boolean;
  footer?: React.ReactNode;
  isScroll?: boolean;
  navigation?: any;
  title?: string;
  extra?: React.ReactNode;
  left?: React.ReactNode;
}

const Container = (props: ContainerProps) => {
  const {
    children,
    loading,
    title,
    footer,
    isScroll,
    navigation,
    extra,
    left,
  } = props;

  const renderChildren = isScroll ? (
    <ScrollView style={[globalStyles.container]}>{children}</ScrollView>
  ) : (
    <View style={[globalStyles.container]}>{children}</View>
  );

  return (
    <View style={[globalStyles.container]}>
      {left || (navigation && navigation.canGoBack()) || title || extra ? (
        <Row style={[globalStyles.header]}>
          {navigation && navigation.canGoBack() ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
          ) : null}

          {left ? <View>{left}</View> : null}

          {title || extra ? (
            <Row justify="space-between" style={{ flex: 1, marginLeft: 10 }}>
              {title ? (
                <TextComponent
                  text={title}
                  font={fontFamilies.bold}
                  color={colors.text}
                  size={16}
                />
              ) : null}
              {extra ? <View>{extra}</View> : null}
            </Row>
          ) : null}
        </Row>
      ) : null}
      <Section flex={1}>{renderChildren}</Section>

      <Row style={[globalStyles.header]}>{footer}</Row>
      {loading && <Loading />}
    </View>
  );
};

export default Container;
