import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { FingerPrintOutline, QuocKy } from '../../../assets/icons';
import {
  Button,
  Input,
  Loading,
  Row,
  Section,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { addAuth } from '../../store/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyle';
import { isValidEmail } from '../../utils/validate';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSavePass, setIsSavePass] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setError({
      isError: false,
      message: '',
    });
  }, [email, password]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!email || !password) {
        setError({ isError: true, message: 'Vui lòng nhập đầy đủ thông tin' });
        return;
      }

      if (!isValidEmail(email)) {
        setError({ isError: true, message: 'Email không hợp lệ' });
        return;
      }

      if (password.length < 6) {
        setError({
          isError: true,
          message: 'Mật khẩu phải có ít nhất 6 ký tự',
        });
        return;
      }

      // save password

      if (isSavePass) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            email,
            password,
          }),
        );
      }

      // Call your login API here
      dispatch(
        addAuth({
          email,
          password,
        }),
      );
    } catch (error) {
      setError({
        isError: true,
        message: 'Đăng nhập không thành công. Vui lòng thử lại',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <Section padding={8}>
        <Row justify="space-between">
          <Image
            source={require('../../../assets/images/logo-1.png')}
            style={{ width: 58, height: 58 }}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={[
              globalStyles.center,
              {
                width: 48,
                height: 48,
              },
            ]}
          >
            <QuocKy />
          </TouchableOpacity>
        </Row>
      </Section>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        style={[globalStyles.container]}
        showsVerticalScrollIndicator={false}
      >
        <Section>
          <Row justify="center">
            <TextComponent text="Quản lý dự án" type="title" />
          </Row>
        </Section>
        <Section
          styles={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Input
            allowClear
            onChange={setEmail}
            value={email}
            placeholder="Email"
          />
          <Input
            onChange={setPassword}
            value={password}
            placeholder="Mật khẩu"
            password
          />
          {error.isError && (
            <TextComponent text={error.message} color={colors.error} />
          )}
          <Button
            styles={{ marginTop: 20 }}
            title="Đăng nhập"
            onPress={handleLogin}
          />
          <Row justify="space-between">
            <Row onPress={() => setIsSavePass(!isSavePass)} align="center">
              <TextComponent
                text="Nhớ mật khẩu"
                size={14}
                font={fontFamilies.medium}
                type="description"
              />
              <CheckBox
                boxType="square"
                tintColors={{
                  true: colors.primary,
                  false: colors.description,
                }}
                value={isSavePass}
                onValueChange={setIsSavePass}
              />
            </Row>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
              <TextComponent text="Quên mật khẩu?" />
            </TouchableOpacity>
          </Row>
          <Row justify="center" style={{ marginTop: 30 }}>
            <TextComponent text="Bạn chưa có tài khoản? " />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <TextComponent color={colors.primary} text="Đăng ký" />
            </TouchableOpacity>
          </Row>
        </Section>
      </ScrollView>
      <Row
        style={[
          globalStyles.center,
          {
            backgroundColor: `${colors.primary}33`,
            paddingVertical: 12,
            minHeight: 68,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            globalStyles.center,
            {
              position: 'absolute',
              top: -20,
              width: 48,
              height: 48,
              borderRadius: 100,
              backgroundColor: colors.primary,
            },
          ]}
        >
          <FingerPrintOutline />
        </TouchableOpacity>
      </Row>
      {isLoading && <Loading />}
    </View>
  );
};

export default Login;
