import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Login, QRScan, Support } from '../screens';
import {
  MdiCustomerSupport,
  MdiQrCode,
  MdiUserAddOutline,
} from '../../assets/icons';
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          minHeight: 75,
          alignItems: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 4,
          marginTop: 12,
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: fontFamilies.regular,
          fontSize: 16,
          color: colors.description,
        },
        tabBarIcon: () => {
          let icon = <MdiUserAddOutline />;
          switch (route.name) {
            case 'Login':
              icon = <MdiUserAddOutline />;
              break;
            case 'Support':
              icon = <MdiCustomerSupport />;
              break;
            case 'QRScan':
              icon = <MdiQrCode />;
              break;
          }
          return icon;
        },
      })}
    >
      <Tabs.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Đăng nhập',
        }}
      />
      <Tabs.Screen
        name="Support"
        component={Support}
        options={{
          tabBarLabel: 'Hỗ trợ',
        }}
      />
      <Tabs.Screen
        name="QRScan"
        component={QRScan}
        options={{
          tabBarLabel: 'Qr code',
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
