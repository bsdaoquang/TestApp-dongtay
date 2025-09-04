import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { HamburgerMenu, Notification } from 'iconsax-react-nativejs';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  ProjectItem,
  Section,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { readDocs } from '../../firebase/server';
import { ProjectModel } from '../../models/ProjectModel';
import { authSelector, updateAuth } from '../../store/reducers/authReducer';

const Home = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoadmore, setIsLoadmore] = useState(false);
  const [limit, setLimit] = useState(20);
  const user = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getProjects();
    checkAndSaveFcmToken();

    messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const { notification } = remoteMessage;
        Toast.show({
          type: 'info',
          text1: notification?.title,
          text2: notification?.body,
        });
      },
    );
  }, []);

  const checkAndSaveFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    if (user && fcmToken && user.fcmtoken !== fcmToken) {
      dispatch(updateAuth({ ...user, fcmtoken: fcmToken }));

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({ ...user, fcmtoken: fcmToken }),
      );
    }
  };

  // Get projects
  const getProjects = async () => {
    setIsLoading(true);
    try {
      const data: { items: ProjectModel[]; totalItems: number } =
        await readDocs({ collection: 'duan', limit });
      setProjects(data.items);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle load more projects
  const handleLoadmore = async () => {
    if (projects.length >= totalItems) return;
    setIsLoadmore(true);
    try {
      const newLimit = limit + 20;
      const data: { items: ProjectModel[]; totalItems: number } =
        await readDocs({ collection: 'duan', limit: newLimit });
      setProjects(data.items);
      setLimit(newLimit);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadmore(false);
    }
  };

  return (
    <Container
      title={user?.name ?? 'Họ tên'}
      left={
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <HamburgerMenu />
        </TouchableOpacity>
      }
      extra={
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Notification />
        </TouchableOpacity>
      }
      footer={
        <TextComponent
          text={`Số lượng dự án: ${projects.length}/${totalItems}`}
          font={fontFamilies.bold}
          size={16}
          color={colors.text}
        />
      }
    >
      {isLoading ? (
        <Section justifyContent="center" alignItems="center" flex={1}>
          <View>
            <ActivityIndicator color={colors.description} />
          </View>
          <TextComponent
            text="Đang tải dữ liệu..."
            styles={{ marginLeft: 8 }}
          />
        </Section>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={projects}
          ListEmptyComponent={
            <Section>
              <TextComponent text="Không có dự án nào" />
            </Section>
          }
          ListFooterComponent={
            isLoadmore ? <ActivityIndicator color={colors.description} /> : null
          }
          onEndReached={handleLoadmore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <ProjectItem
              project={item}
              onPress={() =>
                navigation.navigate('PaymentDetail', { project: item })
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Container>
  );
};

export default Home;
