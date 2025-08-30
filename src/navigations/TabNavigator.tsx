import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Login, QRScan, Support } from '../screens';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Login" component={Login} />
      <Tabs.Screen name="QRScan" component={QRScan} />
      <Tabs.Screen name="Support" component={Support} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
