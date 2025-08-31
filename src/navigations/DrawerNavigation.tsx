import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Home } from '../screens';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
