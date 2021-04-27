import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

export interface Props {
  percent: number;
  color: { color: string; percent: number }[];
  border?: boolean;
  height?: number;
}

const defaultProps = {
  color: [
    { color: 'red', percent: 33.33 },
    { color: 'gray', percent: 33.33 },
    { color: 'green', percent: 33.33 },
  ],
  border: false,
  height: dimensionsScale.scale(6),
};

let iPercent = 100;

const ProgressComponent: React.FC<Props> = (props) => {
  const { percent, color, height, border } = props;
  const [controlColor, setControlColor] = useState<string>('black');

  useEffect(() => {
    if (color) {
      iPercent = 100 / color.length;
      const index = Math.ceil(percent / iPercent);
      const findColor = color[index - 1].color;
      setControlColor(findColor);
    }
  }, [percent, color]);

  return (
    <View style={{ justifyContent: 'flex-end', minHeight: dimensionsScale.scale(30) }}>
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
        {color &&
          color.map((item, index) => (
            <View
              style={[
                { backgroundColor: item.color, width: `${item.percent}%` },
                border && index === 0 && { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
                border &&
                  index === color.length - 1 && {
                    borderTopRightRadius: dimensionsScale.scale(5),
                    borderBottomRightRadius: dimensionsScale.scale(5),
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: dimensionsScale.scale(5),
    opacity: 0.5,
  },
  controlBox: {
    position: 'absolute',
    width: dimensionsScale.scale(30),
    height: dimensionsScale.scale(30),
    zIndex: 9999,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  control: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    height: dimensionsScale.scale(30),
    width: dimensionsScale.scale(30),
    borderRadius: dimensionsScale.scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dimensionsScale.scale(1),
    opacity: 0.5,
  },
  tick: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    height: dimensionsScale.scale(10),
    width: dimensionsScale.scale(10),
    borderRadius: dimensionsScale.scale(5),
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    opacity: 0.5,
  },
});
