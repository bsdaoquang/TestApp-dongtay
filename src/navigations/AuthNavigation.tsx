import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPass, Register } from '../screens';
import TabNavigator from './TabNavigator';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="/" component={TabNavigator} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
