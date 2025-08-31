import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigation from './DrawerNavigation';
import {
  Notifications,
  PaymentApprove,
  PaymentDetail,
  ProjectDetail,
} from '../screens';

const HomeNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={DrawerNavigation} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
      <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
      <Stack.Screen name="PaymentApprove" component={PaymentApprove} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
