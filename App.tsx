import React, { useEffect } from 'react';
import { SafeAreaView, SafeAreaViewBase, StatusBar, View } from 'react-native';
import { colors } from './src/constants/colors';
import Routers from './src/navigations/Routers';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { globalStyles } from './src/styles/globalStyle';
import { fontFamilies } from './src/constants/fontFamilies';

const App = () => {
  useEffect(() => {
    // StatusBar.setBarStyle('dark-content');
    // StatusBar.setBackgroundColor(colors.bg);
    StatusBar.setHidden(true);
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
        <View
          style={{
            flex: 1,
            backgroundColor: colors.bg,
            paddingBottom: StatusBar.currentHeight,
          }}
        >
          <Routers />
        </View>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
