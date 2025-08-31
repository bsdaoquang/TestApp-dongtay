import messaging from '@react-native-firebase/messaging';

export class Notifications {
  static CheckPermision = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.GetFcmToken();
    } else {
      console.log('Can not permision messaging');
    }
  };

  static GetFcmToken = async () => {
    // const res = await AsyncStorage.getItem('auth');
    // const auth = res ? JSON.parse(res) : null;
    // const token = await messaging().getToken();
    // if (auth && (!auth.fcmtoken || auth.fcmtoken !== token)) {
    //   await HandleAPI(
    //     `/user/update-profile?id=${auth._id}`,
    //     {fcmtoken: token},
    //     'put',
    //   );
    // }
  };
}
