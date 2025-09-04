import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPass, Login, QRScan, Register, Support } from '../screens';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="/" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="QrCodeScanner" component={QRScan} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
