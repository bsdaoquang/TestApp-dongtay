import AsyncStorage from '@react-native-async-storage/async-storage';
import { HamburgerMenu, Notification } from 'iconsax-react-nativejs';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { authSelector, removeAuth } from '../../store/reducers/authReducer';

const Home = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  return (
    <Container
      navigation={navigation}
      title={user?.name ?? 'Họ tên'}
      left={
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <HamburgerMenu />
        </TouchableOpacity>
      }
      extra={
        <TouchableOpacity>
          <Notification />
        </TouchableOpacity>
      }
      footer={
        <TextComponent
          text={`Số lượng dự án: `}
          font={fontFamilies.bold}
          size={16}
          color={colors.text}
        />
      }
    >
      <TextComponent text={user?.name ?? 'Họ tên'} />
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          dispatch(removeAuth({}));
        }}
      >
        <TextComponent text="Logout" />
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
