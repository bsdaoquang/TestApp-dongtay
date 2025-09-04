import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { UserModel } from '../models/UserModel';
import { authSelector } from '../store/reducers/authReducer';
import { globalStyles } from '../styles/globalStyle';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';

const Routers = () => {
  const auth: UserModel | null = useSelector(authSelector);

  return auth && auth.accesstoken ? (
    <View style={globalStyles.container}>
      <HomeNavigation />
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default Routers;
