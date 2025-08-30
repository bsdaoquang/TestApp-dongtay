import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { colors } from './src/constants/colors';
import Routers from './src/navigations/Routers';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(colors.bg);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
