import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  BitcointBag,
  Calendar,
  ChartPieOutline,
  StreamlineCyberPersion,
} from '../../../assets/icons';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Section,
  Space,
  TextComponent,
  TimeLineItem,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { createDoc, updateDoc } from '../../firebase/server';
import { HistoryModel } from '../../models/HistoryModel';
import {
  PaymentModel,
  TENTINHTRANG,
  TINHTRANGID,
} from '../../models/PaymentModel';
import { getDateString } from '../../utils/datetime';

const PaymentApprove = ({ navigation, route }: any) => {
  /*
   * Get payment ID from route params
   * Chỉ cần truyền paymentId vì đây là khóa duy nhất để truy xuất chi tiết thanh toán từ database.
   * Khi có paymentId, bạn có thể lấy toàn bộ thông tin liên quan mà không cần truyền thêm dữ liệu,
   * giúp giảm thiểu dữ liệu truyền qua route và đảm bảo tính nhất quán, cập nhật mới nhất từ server.
   */
  const { paymentId }: { paymentId: string } = route.params;

  const [payment, setPayment] = useState<PaymentModel | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [histories, setHistories] = useState<HistoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (paymentId) {
      getPaymentDetailById();
      getHistoriesChangeStatus();
    }
  }, [paymentId]);

  const getPaymentDetailById = () => {
    // Sử dụng onSnapshot để lắng nghe realtime thay đổi của document
    setIsLoading(true);
    const unsubscribe = firestore()
      .collection('thanhtoan')
      .doc(paymentId)
      .onSnapshot(
        doc => {
          if (doc.exists()) {
            const paymentDetail: any = doc.data();
            setPayment(paymentDetail);
          } else {
            setPayment(null);
          }
          setIsLoading(false);
        },
        error => {
          setIsLoading(false);
          console.log(error);
        },
      );
    // Cleanup listener when component unmounts
    return unsubscribe;
  };

  const getHistoriesChangeStatus = () => {
    // Sử dụng onSnapshot để lắng nghe realtime thay đổi của collection 'histories'
    // get theo thứ tự createdAt giảm dần
    firestore()
      .collection('histories')
      .where('paymentId', '==', paymentId)
      .onSnapshot(querySnapshot => {
        const historiesData = querySnapshot.docs.map(
          doc => doc.data() as HistoryModel,
        );
        setHistories(historiesData);
      });
  };

  // update status of payment
  const changeStatus = async (status: TINHTRANGID) => {
    setIsUpdating(true);
    try {
      // update payment status
      await updateDoc({
        collection: 'thanhtoan',
        docId: paymentId,
        data: {
          TINHTRANGID: status,
          TENTINHTRANG: TENTINHTRANG[TINHTRANGID[status]],
          updatedAt: Date.now(),
        },
      });

      Toast.show({
        type: status === TINHTRANGID.DaDuyet ? 'success' : 'error',
        text1: 'Đã cập nhật',
        text2:
          status === TINHTRANGID.DaDuyet
            ? 'Cập nhật trạng thái thành Đã duyệt'
            : 'Cập nhật Đã Trả hồ sơ -> Khởi tạo',
      });
      await handleCreateHistory(status);
      /*
        Chỗ này sẽ push notification cho những user liên quan dựa vào userId, và fcmtoken được lưu trong database
        await sendPushNotification({
          title:
          body:
          paymentId:
          status: 
        })
      */
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateHistory = async (status: TINHTRANGID) => {
    try {
      if (!payment) return;

      const historyData = {
        paymentId,
        userId: 'admin', // tạm thời hardcode userId, vì chưa có user
        oldStatus: payment.TINHTRANGID,
        newStatus: status,
        createdAt: Date.now(),
      };

      await createDoc({
        collection: 'histories',
        data: historyData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderRowItem = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => (
    <Row
      style={{
        paddingVertical: 4,
      }}
    >
      {icon}
      <Space width={6} />
      <Col>
        <TextComponent size={14} type="body" text={label} numberOfLines={1} />
      </Col>
    </Row>
  );

  return isLoading ? (
    <>
      <Section>
        <ActivityIndicator />
        <Row justify="center">
          <TextComponent text="Đang tải..." />
        </Row>
      </Section>
    </>
  ) : payment ? (
    <Container
      back
      title={`Thanh toán đợt: ${payment.STT}`}
      footer={
        <TextComponent
          font={fontFamilies.bold}
          size={14}
          text={`Mã dự án: ${payment.DUANID}`}
          type="body"
        />
      }
    >
      <Card radius={0}>
        <Row>
          <Col>
            {renderRowItem({
              icon: <ChartPieOutline />,
              label: payment.TENTINHTRANG,
            })}
            <Row align="flex-start">
              <Col>
                {renderRowItem({
                  icon: <Calendar />,
                  label: payment.NGAYCHUNGTU
                    ? getDateString(payment.NGAYCHUNGTU)
                    : '',
                })}
              </Col>
              <Col>
                {renderRowItem({
                  icon: <BitcointBag />,
                  label: `${payment.TIENLAMTRON.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}`,
                })}
              </Col>
            </Row>

            {renderRowItem({
              icon: <StreamlineCyberPersion />,
              label: payment.TENKH,
            })}
          </Col>
        </Row>
        <Space height={16} />
        <Row>
          <Col>
            <Button
              isLoading={isUpdating}
              disabled={payment.TINHTRANGID === TINHTRANGID.KhoiTao}
              color={colors.error}
              textStyles={{
                fontFamily: fontFamilies.regular,
                fontSize: 16,
                color: colors.bg,
              }}
              title="Trả hồ sơ"
              onPress={() => changeStatus(TINHTRANGID.KhoiTao)}
            />
          </Col>
          <Space width={12} />
          <Col>
            <Button
              disabled={payment.TINHTRANGID === TINHTRANGID.DaDuyet}
              isLoading={isUpdating}
              textStyles={{
                fontFamily: fontFamilies.regular,
                fontSize: 16,
              }}
              title="Duyệt"
              onPress={() => changeStatus(TINHTRANGID.DaDuyet)}
            />
          </Col>
        </Row>
      </Card>
      <Card radius={0} styles={{ flex: 1 }}>
        <FlatList
          data={histories.sort((a: any, b: any) => b.createdAt - a.createdAt)}
          renderItem={({ item }) => <TimeLineItem item={item} />}
        />
      </Card>
    </Container>
  ) : (
    <Section>
      <TextComponent text="Không tìm thấy dữ liệu thanh toán" />
    </Section>
  );
};

export default PaymentApprove;
