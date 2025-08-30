import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from '../screens';
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
    </Stack.Navigator>
  );
};

export default AuthNavigation;
