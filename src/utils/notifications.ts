import messaging from '@react-native-firebase/messaging';

export class Notifications {
  static CheckPermision = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Notification permission granted');
    } else {
      console.log('Can not permision messaging');
    }
  };
}
