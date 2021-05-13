import React, { useEffect, useState } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import { styles } from './styles';

const { scale } = dimensionsScale;

export interface Props {
  style?: StyleProp<ViewStyle>;
  percent: number;
  data: { color: string; percent: number }[];
  border?: boolean;
  height?: number;
}

const defaultProps = {
  style: {},
  data: [
    { color: 'red', percent: 33.33 },
    { color: 'gray', percent: 33.33 },
    { color: 'green', percent: 33.33 },
  ],
  border: false,
  height: dimensionsScale.scale(6),

};

let iPercent = 100;

const ProgressComponent: React.FC<Props> = (props) => {
  const { percent, data, height, border, style } = props;
  const [controlColor, setControlColor] = useState<string>('black');

  useEffect(() => {
    if (data) {
      iPercent = 100 / data.length;
      const index = Math.ceil(percent / iPercent);
      const findColor = data[index - 1].color;
      setControlColor(findColor);
    }
  }, [percent, data]);

  return (
    <View style={[styles.main, style]}>
      <View
        style={[
          {
            left: `${percent - 6}%`,
          },
          styles.controlBox,
        ]}>
        <View style={[styles.control, { backgroundColor: controlColor }]}>
          <Text style={{ color: 'white' }}>{percent}</Text>
        </View>
        <View style={[styles.triangle, { borderTopColor: controlColor }]} />
        <View style={[styles.tick, { backgroundColor: controlColor }]} />
      </View>
      <View style={[styles.container, { height: height }]}>
        {data &&
          data.map((item, index) => (
            <View
              key={index}
              style={[
                { backgroundColor: item.color, width: `${item.percent}%` },
                border && index === 0 && { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
                border &&
                index === data.length - 1 && {
                  borderTopRightRadius: scale(5),
                  borderBottomRightRadius: scale(5),
                },
              ]}
            />
          ))}
      </View>
    </View>
  );
};

ProgressComponent.defaultProps = defaultProps;

export default ProgressComponent;
