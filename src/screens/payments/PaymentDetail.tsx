import { SearchNormal1 } from 'iconsax-react-nativejs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import {
  Container,
  PaymentItem,
  Section,
  TextComponent,
} from '../../components';
import { fontFamilies } from '../../constants/fontFamilies';
import { ProjectModel } from '../../models/ProjectModel';
import { colors } from '../../constants/colors';
import { readDocs } from '../../firebase/server';
import { PaymentModel } from '../../models/PaymentModel';

const PaymentDetail = ({ navigation, route }: any) => {
  const { project }: { project: ProjectModel } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState<PaymentModel[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    project && project.MADUAN && getPaymentsByProjectId();
  }, [project]);

  // Get payments by project ID
  const getPaymentsByProjectId = async () => {
    setIsLoading(true);
    try {
      const res: {
        items: PaymentModel[];
        totalItems: number;
      } = await readDocs({
        collection: 'thanhtoan',
        conditions: [
          {
            field: 'DUANID',
            op: '==',
            value: project.DUANID,
          },
        ],
        limit,
      });

      setPayments(res.items);
      setTotalItems(res.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (payments.length >= totalItems) return;
    setIsLoadingMore(true);
    try {
      const newLimit = limit + 20;
      const res: { items: any[]; totalItems: number } = await readDocs({
        collection: 'thanhtoan',
        conditions: [
          {
            field: 'DUANID',
            op: '==',
            value: project.DUANID,
          },
        ],
        limit: newLimit,
      });
      setPayments(res.items);
      setLimit(newLimit);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return isLoading ? (
    <Section flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color={colors.description} />
      <TextComponent text="Đang tải..." />
    </Section>
  ) : (
    <Container
      title="Thanh toán"
      back
      footer={
        <TextComponent
          text={`Mã dự án: ${project.MADUAN}`}
          type="body"
          font={fontFamilies.bold}
        />
      }
      extra={
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <SearchNormal1 size={22} />
        </TouchableOpacity>
      }
    >
      <FlatList
        data={payments}
        renderItem={({ item }) => (
          <PaymentItem
            payment={item}
            onPress={() =>
              navigation.navigate('PaymentApprove', { paymentId: item.id })
            }
          />
        )}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          <Section>
            <TextComponent text="Không có dữ liệu thanh toán" />
          </Section>
        }
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default PaymentDetail;
