import { View, Text } from 'react-native';
import React from 'react';
import { HistoryModel } from '../models/HistoryModel';
import Row from './Row';
import Col from './Col';
import Space from './Space';
import TextComponent from './TextComponent';
import { getDateTimeString } from '../utils/datetime';
import { TENTINHTRANG, TINHTRANGID } from '../models/PaymentModel';
import { Timestamp } from '@react-native-firebase/firestore';

interface TimeLineItemProps {
  item: HistoryModel;
}

const TimeLineItem = (props: TimeLineItemProps) => {
  const { item } = props;

  const renderDot = (
    <View
      style={{
        width: 12,
        height: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 100,
        marginVertical: 12,
        marginTop: 20,
      }}
    />
  );
  return (
    <Row
      style={{
        minHeight: 80,
        marginBottom: 16,
        paddingHorizontal: 16,
      }}
      align="flex-start"
      justify="flex-start"
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderDot}
        <View
          style={{
            width: 1,
            minHeight: '80%',
            flex: 1,
            backgroundColor: '#e0e0e0',
          }}
        />
      </View>
      <Space width={12} />
      <Col flex={1}>
        <TextComponent size={12} text={getDateTimeString(item.createdAt)} />
        <TextComponent
          type="body"
          text={`Cập nhật trạng thái thành ${(() => {
            const statusKey = item.newStatus as keyof typeof TINHTRANGID;
            const tinhTrangId = TINHTRANGID[statusKey];
            return tinhTrangId !== undefined
              ? TENTINHTRANG[tinhTrangId as keyof typeof TENTINHTRANG] ?? ''
              : '';
          })().toLowerCase()}`}
          size={14}
        />
      </Col>
    </Row>
  );
};

export default TimeLineItem;
