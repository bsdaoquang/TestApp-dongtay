import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserModel } from '../models/UserModel';
import { addAuth, authSelector } from '../store/reducers/authReducer';
import { globalStyles } from '../styles/globalStyle';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routers = () => {
  const auth: UserModel | null = useSelector(authSelector);

  return auth && auth.email ? (
    <View style={globalStyles.container}>
      <HomeNavigation />
    </View>
  ) : (
    <AuthNavigation />
  );
};

export default Routers;
