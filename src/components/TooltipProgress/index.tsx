import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

const { scale, fontScale } = dimensionsScale;

export interface Props {
  data: Item[];
  activeColor?: string;
  inActiveColor?: string;
  selectIndex?: number;
  onSelectIndex?: (index: number) => void;
  selectColor?: string;
  textSize?: number;
}

export interface Item {
  stage: string;
  text: string;
  status: boolean;
}

const defaultProps = {
  data: [
    { stage: 'S1', text: 'S1', status: false },
    { stage: 'S2', text: 'S2', status: false },
    { stage: 'S3', text: 'S3', status: false },
    { stage: 'S4', text: 'S4', status: false },
    { stage: 'S5', text: 'S5', status: false },
    { stage: 'S6', text: 'S6', status: false },
  ],
  activeColor: '#32C5FF',
  inActiveColor: '#C6CDD8',
  selectColor: '#FF9900',
  selectIndex: 0,
  textSize: 16,
  onSelectIndex: (index: number) => {},
};

const CTooltipProgressComponent: React.FC<Props> = (props) => {
  const {
    data,
    activeColor,
    inActiveColor,
    selectIndex,
    textSize,
    selectColor,
    onSelectIndex,
  } = props;

  const renderItem = (item: Item, index: number) => {
    return (
      <View style={[index !== 0 && { flex: 1 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {index !== 0 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor:
                    item.status || index === selectIndex ? activeColor : inActiveColor,
                },
              ]}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (onSelectIndex) {
                if (index > 0 && data[index - 1].status) {
                  onSelectIndex(index);
                } else {
                  if (index === 0) {
                    onSelectIndex(index);
                  }
                }
              }
            }}>
            <View
              style={[
                styles.radius,
                {
                  backgroundColor:
                    index === selectIndex ? selectColor : item.status ? activeColor : inActiveColor,
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: fontScale(textSize),
                    color: item.status || index === selectIndex ? 'white' : 'gray',
                  },
                ]}>
                {item.stage}
              </Text>
            </View>
            {index === selectIndex && (
              <View style={[styles.triangle, { borderBottomColor: activeColor }]} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderText = (item: Item, index: number) => {
    return (
      <View style={{ flex: 1 }}>
        {index === selectIndex && (
          <View
            style={[styles.tag, { backgroundColor: activeColor }, index === data.length - 1 && {}]}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: scale(5),
        }}>
        {data.map((item, index) => renderItem(item, index))}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {data.map((item, index) => renderText(item, index))}
      </View>
    </View>
  );
};

CTooltipProgressComponent.defaultProps = defaultProps;

export default CTooltipProgressComponent;

const styles = StyleSheet.create({
  container: {},
  radius: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: scale(3),
    marginTop: scale(15),
  },
  text: { color: 'white', fontSize: fontScale(16) },
  icon: {
    width: scale(20),
    height: scale(20),
  },
  tag: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    marginTop: scale(10),
    marginLeft: scale(10),
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftWidth: 5,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    opacity: 1,
  },
});
