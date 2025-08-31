import React from 'react';
import { Text } from 'react-native';
import { Container } from '../../components';

const PaymentDetail = ({ navigation, route }: any) => {
  const { project } = route.params;

  return (
    <Container title="Thanh toán" back>
      <Text>PaymentDetail</Text>
    </Container>
  );
};

export default PaymentDetail;
