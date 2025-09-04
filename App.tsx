import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { colors } from './src/constants/colors';
import { fontFamilies } from './src/constants/fontFamilies';
import Routers from './src/navigations/Routers';
import { store } from './src/store/store';
import { globalStyles } from './src/styles/globalStyle';
import { Notifications } from './src/utils/notifications';

const App = () => {
  useEffect(() => {
    StatusBar.setHidden(true);
    Notifications.CheckPermision();
  }, []);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.primary,
        }}
        text1Style={[globalStyles.text]}
        text2Style={{
          fontFamily: fontFamilies.regular,
          fontSize: 14,
        }}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.primary,
        }}
        text1Style={[globalStyles.text]}
        text2Style={{
          fontFamily: fontFamilies.regular,
          fontSize: 14,
        }}
      />
    ),
    error: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: colors.error,
        }}
        text1Style={[globalStyles.text]}
        text2Style={{
          fontFamily: fontFamilies.regular,
          fontSize: 14,
        }}
        text2NumberOfLines={2}
      />
    ),
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={[globalStyles.container]}>
          <Routers />
        </SafeAreaView>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
