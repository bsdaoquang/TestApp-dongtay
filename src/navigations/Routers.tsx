import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserModel } from '../models/UserModel';
import { authSelector } from '../store/reducers/authReducer';
import { globalStyles } from '../styles/globalStyle';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';

const Routers = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const auth: UserModel | null = useSelector(authSelector);
  const dispatch = useDispatch();

  const checkLogin = async () => {
    setIsLoading(true);
    try {
      if (!auth) {
        // Redirect to login
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View style={[globalStyles.container, globalStyles.center]}>
      <ActivityIndicator />
    </View>
  ) : auth && auth.accesstoken ? (
    <View style={globalStyles.container}>
      <HomeNavigation />
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default Routers;
