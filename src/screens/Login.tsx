import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';

const Login = ({ navigation }: any) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Go to Register</Text>
      </TouchableOpacity>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
