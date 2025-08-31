import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { PaymentModel } from '../models/PaymentModel';
import Card from './Card';
import Row from './Row';
import {
  BitcointBag,
  Calendar,
  ChartPieOutline,
  More,
  Pin,
  StreamlineCyberPersion,
} from '../../assets/icons';
import TextComponent from './TextComponent';
import Space from './Space';
import Col from './Col';
import { getDateString } from '../utils/datetime';

interface PaymentItemProps {
  payment: PaymentModel;
  onPress: () => void;
}

const PaymentItem = (props: PaymentItemProps) => {
  const { payment, onPress } = props;

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

  return (
    <Card onPress={onPress}>
      <Row>
        <Col>
          <Row align="flex-start">
            <Col>
              {renderRowItem({
                icon: <Pin />,
                label: payment.STT,
              })}
            </Col>
            <Col>
              {renderRowItem({
                icon: <Calendar />,
                label: payment.NGAYCHUNGTU
                  ? getDateString(payment.NGAYCHUNGTU)
                  : '',
              })}
            </Col>
          </Row>
          {renderRowItem({
            icon: <ChartPieOutline />,
            label: payment.TENTINHTRANG,
          })}
          {renderRowItem({
            icon: <BitcointBag />,
            label: `${payment.TIENLAMTRON.toLocaleString()}`,
          })}
          {renderRowItem({
            icon: <StreamlineCyberPersion />,
            label: payment.TENKH,
          })}
        </Col>
        <Space width={8} />
        <TouchableOpacity>
          <More />
        </TouchableOpacity>
      </Row>
    </Card>
  );
};

export default PaymentItem;
