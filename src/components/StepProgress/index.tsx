import React from 'react';
import { Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import { styles } from './styles';
const ic_check = require('./icon/check.png');

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
  renderIcon: any;
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
  renderIcon: null
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
    renderIcon
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
              {item.status ?
                <Image
                  style={[
                    styles.icon,
                    { tintColor: index === selectIndex ? selectColor : activeColor },
                  ]}
                  source={renderIcon ? renderIcon : ic_check}
                />
                : <Text style={{ fontSize: fontScale(textSize), color: inActiveColor, fontWeight: 'bold' }}>{index + 1}</Text>}
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
