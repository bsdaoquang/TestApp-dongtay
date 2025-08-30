import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Register = ({ navigation }: any) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('/')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <Text>Register</Text>
    </View>
  );
};

export default Register;
