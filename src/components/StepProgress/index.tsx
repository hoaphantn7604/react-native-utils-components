import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

const { scale, fontScale } = dimensionsScale;

export interface Props {
  style?: StyleProp<ViewStyle>;
  data: Item[];
  activeColor?: string;
  inActiveColor?: string;
  textColor?: string;
  selectIndex?: number;
  onSelectIndex?: (index: number) => void;
  selectColor?: string;
  textSize?: number;
}

export interface Item {
  text: string;
  status: boolean;
}

const defaultProps = {
  style: {},
  data: [
    { text: 'Step 1', status: false },
    { text: 'Step 2', status: false },
    { text: 'Step 3', status: false },
    { text: 'Step 4', status: false },
    { text: 'Step 5', status: false },
    { text: 'Step 6', status: false },
  ],
  activeColor: '#32C5FF',
  inActiveColor: '#C6CDD8',
  selectColor: '#FF9900',
  textColor: '#C6CDD8',
  selectIndex: 0,
  textSize: 16,
  onSelectIndex: (index: number) => { },
};

const StepProgress: React.FC<Props> = (props) => {
  const {
    style,
    data,
    activeColor,
    inActiveColor,
    textColor,
    selectIndex,
    textSize,
    selectColor,
    onSelectIndex,
  } = props;

  const renderItem = (item: Item, index: number) => {
    return (
      <View key={index} style={
        [index !== 0 && { flex: 1 },
        index === 0 && { marginLeft: scale(25) },
        index === data.length - 1 && { marginRight: scale(25) }
        ]}>
        <View style={styles.row}>
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
                  borderColor:
                    index === selectIndex ? selectColor : item.status ? activeColor : inActiveColor,
                },
              ]}>
              {item.status ? (
                <Image
                  style={[
                    styles.icon,
                    { tintColor: index === selectIndex ? selectColor : activeColor },
                  ]}
                  source={require('./icon/check.png')}
                />
              ) : <Text style={{ fontSize: fontScale(textSize), color: inActiveColor, fontWeight: 'bold' }}>{index + 1}</Text>}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderText = (item: Item, index: number) => {
    return (
      <View key={index} style={
        [index !== 0 && { flex: 1, alignItems: 'flex-end' },
        index === 0 && { marginLeft: scale(18) },
        index === data.length - 1 && { marginRight: scale(18) }
        ]}>
        <Text style={[styles.text, { fontSize: fontScale(textSize), color: index === selectIndex ? selectColor : textColor }]}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={styles.wrapTick}>
        {data.map((item, index) => renderItem(item, index))}
      </View>
      <View style={styles.wrapText}>
        {data.map((item, index) => renderText(item, index))}
      </View>
    </View>
  );
};

StepProgress.defaultProps = defaultProps;

export default StepProgress;

const styles = StyleSheet.create({
  container: {},
  radius: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    borderWidth: scale(2),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: scale(3),
    marginTop: scale(15),
  },
  wrapTick: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wrapText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    marginTop: scale(10),
    textAlign: 'center',
    fontWeight: '500'
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
});
