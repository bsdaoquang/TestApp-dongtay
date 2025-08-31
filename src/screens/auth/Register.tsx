import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyle';
import { Button, Input, Row, Section } from '../../components';
import { ArrowLeft } from 'iconsax-react-nativejs';

const Register = ({ navigation }: any) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  return (
    <ImageBackground
      source={require('../../../assets/images/bg-1.png')}
      style={[globalStyles.container]}
    >
      <Section>
        <Row justify="flex-start">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} />
          </TouchableOpacity>
        </Row>
      </Section>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Section>
          <Input
            value={profile.name}
            required
            placeholder="Họ và tên"
            allowClear
            onChange={text => setProfile({ ...profile, name: text })}
          />
          <Button
            title="Đăng ký"
            onPress={() => {}}
            styles={{
              marginTop: 30,
            }}
          />
        </Section>
      </ScrollView>
    </ImageBackground>
  );
};

export default Register;
