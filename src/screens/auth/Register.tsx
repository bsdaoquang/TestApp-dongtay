import { ArrowLeft } from 'iconsax-react-nativejs';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Google } from '../../../assets/icons';
import {
  Button,
  Input,
  Row,
  Section,
  Space,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../store/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }: any) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      // Call your registration API here
      if (profile.email && profile.password) {
        dispatch(addAuth(profile));
        await AsyncStorage.setItem('user', JSON.stringify(profile));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg-1.png')}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />

      <Section>
        <Row justify="flex-start">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} />
          </TouchableOpacity>
        </Row>
      </Section>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
        >
          <Section styles={{ paddingVertical: 12 }}>
            <Row justify="center">
              <TextComponent type="title" text="Đăng ký tài khoản" />
            </Row>
          </Section>

          <Section>
            <Input
              value={profile.name}
              required
              placeholder="Họ và tên"
              allowClear
              onChange={text => setProfile({ ...profile, name: text })}
            />
            <Input
              value={profile.phone}
              required
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              allowClear
              onChange={text => setProfile({ ...profile, phone: text })}
            />
            <Input
              value={profile.email}
              placeholder="Email"
              keyboardType="email-address"
              allowClear
              onChange={text => setProfile({ ...profile, email: text })}
            />
            <Input
              value={profile.password}
              placeholder="Mật khẩu"
              password
              allowClear
              onChange={text => setProfile({ ...profile, password: text })}
            />

            <Button
              title="Đăng ký"
              onPress={handleRegister}
              styles={{
                marginTop: 30,
                borderWidth: 1,
                borderColor: colors.bg,
              }}
            />
          </Section>

          <Section>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <TextComponent type="body" text="Liên kết tài khoản?" />
              <Space height={16} />
              <Google />
            </TouchableOpacity>
          </Section>
        </ScrollView>
      </KeyboardAvoidingView>

      <Section justifyContent="center" alignItems="center">
        <TextComponent type="body" text="Chính sách quyền riêng tư" />
        <TextComponent type="body" text="ID: 123456" />
      </Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});

export default Register;
