import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Section, Space, TextComponent } from '../components';
import { Home } from '../screens';
import { authSelector, removeAuth } from '../store/reducers/authReducer';
import { TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { colors } from '../constants/colors';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();

  const user = useSelector(authSelector);

  const handleLogout = async () => {
    dispatch(removeAuth({}));
    await AsyncStorage.clear();
  };

  return (
    <Drawer.Navigator
      drawerContent={() => (
        <Section flex={1}>
          <Row onPress={() => handleLogout()}>
            <TextComponent text="Đăng xuất" />
          </Row>
          <Space height={12} />
          <TextComponent text="FCM Token: " />
          <TextComponent text={user?.fcmtoken || 'Chưa có'} />
          <TouchableOpacity
            onPress={() => Clipboard.setString(user?.fcmtoken || '')}
          >
            <TextComponent color={colors.primary} text="Copy" />
          </TouchableOpacity>
        </Section>
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
