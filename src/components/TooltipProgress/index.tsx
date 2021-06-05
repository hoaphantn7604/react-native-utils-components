import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useScale } from 'react-native-utils-toolkit';
import { styles } from './styles';
import { Item, TooltipProgress } from './type';

const { scale, fontScale } = useScale;

const defaultProps = {
  style: {},
  tooltipStyle: {},
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
  onSelectIndex: (index: number) => { },
};

const CTooltipProgressComponent: TooltipProgress = (props) => {
  const {
    style,
    fontFamily,
    data,
    activeColor,
    inActiveColor,
    selectIndex,
    textSize,
    selectColor,
    tooltipStyle,
    onSelectIndex,
  } = props;

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      }
    } else {
      return {}
    }
  }

  const renderItem = (item: Item, index: number) => {
    return (
      <View key={index} style={[index !== 0 && { flex: 1 }]}>
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
              {item.icon ? <Image
                style={[
                  styles.icon,
                  { tintColor: 'white' },
                ]}
                source={item.icon}
              /> : <Text
                style={[
                  {
                    fontSize: fontScale(textSize),
                    color: 'white',
                  },
                  font()
                ]}>
                {item?.stage}
              </Text>}
            </View>
            {index === selectIndex && (
              <View style={[styles.triangle, { borderBottomColor: selectColor }]} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderText = (item: Item, index: number) => {
    return (
      <View key={index} style={{ flex: 1 }}>
        {index === selectIndex && (
          <View
            style={[styles.tag, { backgroundColor: selectColor }, index === data.length - 1 && {}, tooltipStyle]}>
            <Text style={[styles.text, { fontSize: fontScale(textSize) }, font()]}>{item.text}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
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
