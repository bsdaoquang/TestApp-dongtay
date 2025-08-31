import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProjectModel } from '../models/ProjectModel';
import Card from './Card';
import Row from './Row';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';
import Divider from './Divider';
import { More } from 'iconsax-react-nativejs';
import { colors } from '../constants/colors';
import Space from './Space';

interface ProjectItemProps {
  project: ProjectModel;
}

const ProjectItem = (props: ProjectItemProps) => {
  const { project } = props;

  const renderStatus = ({
    label,
    flex = 1,
    value,
    extra,
  }: {
    label: string;
    flex?: number;
    value: string | number | undefined;
    extra?: React.ReactNode;
  }) => (
    <Row style={{ flex }} justify="space-between">
      <TextComponent
        size={14}
        text={`${label}: ${value ? value : ''}`}
        type="body"
      />
      {extra ? <Space width={8} /> : null} {extra ? extra : null}
    </Row>
  );

  return (
    <Card onPress={() => console.log(project)}>
      <Row justify="center">
        <TextComponent
          text={project.TENDUAN}
          type="body"
          font={fontFamilies.bold}
          size={14}
          numberOfLines={1}
          styles={{
            textAlign: 'center',
          }}
        />
      </Row>
      <Divider />
      <Row>
        {renderStatus({
          label: 'Năm',
          value: `${project.NAMTHONGBAOKEHOACH}`,
        })}
        <Divider orientation="vertical" />
        {renderStatus({
          label: 'Kinh phí',
          value: `${
            project.TONGMUCDAUTUDUKIEN
              ? project.TONGMUCDAUTUDUKIEN.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })
              : ''
          }`,
          extra: (
            <TouchableOpacity>
              <More variant="Outline" size={18} color={colors.text} />
            </TouchableOpacity>
          ),
          flex: 3,
        })}
      </Row>
      <Space height={16} />
      <Row>
        {renderStatus({
          label: 'Tiến độ',
          value: `${project.TIENDOTHUCHIENDUAN ?? ''}`,
        })}
        <Divider orientation="vertical" />
        {renderStatus({
          label: 'Tình trạng',
          value: `${project.TINHTRANGDUAN ?? ''}`,
          extra: (
            <TouchableOpacity>
              <More variant="Outline" size={18} color={colors.text} />
            </TouchableOpacity>
          ),
          flex: 3,
        })}
      </Row>
    </Card>
  );
};

export default ProjectItem;
