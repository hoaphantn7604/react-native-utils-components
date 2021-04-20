import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export interface Props {
  data: Item[];
  activeColor: string;
  inActiveColor: string;
  selectIndex: number;
  selectColor: string;
  textSize: number;
}

export interface Item {
  text: string;
  status: boolean;
}

const defaultProps = {
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
  selectIndex: 0,
  textSize: 16,
};

const SliderStepComponent: React.FC<Props> = (props) => {
  const { data, activeColor, inActiveColor, selectIndex, textSize, selectColor } = props;

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

          <View
            style={[
              styles.radius,
              {
                borderColor:
                  index === selectIndex ? selectColor : item.status ? activeColor : inActiveColor,
              },
            ]}>
            {item.status && (
              <FontAwesome
                name="check"
                size={18}
                color={index === selectIndex ? selectColor : activeColor}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderText = (item: Item, index: number) => {
    return (
      <View
        style={[
          index !== 0 && {
            flex: 1,
            alignItems: 'flex-end',
          },
        ]}>
        <Text style={[styles.text, { fontSize: dimensionsScale.fontScale(textSize) }]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: dimensionsScale.scale(5),
        }}>
        {data.map((item, index) => renderItem(item, index))}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {data.map((item, index) => renderText(item, index))}
      </View>
    </View>
  );
};

SliderStepComponent.defaultProps = defaultProps;

export default SliderStepComponent;

const styles = StyleSheet.create({
  container: {
    paddingLeft: dimensionsScale.scale(10),
  },
  radius: {
    width: dimensionsScale.scale(30),
    height: dimensionsScale.scale(30),
    borderRadius: dimensionsScale.scale(15),
    borderWidth: dimensionsScale.scale(2),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: dimensionsScale.scale(3),
    marginTop: dimensionsScale.scale(15),
  },
  text: {
    marginTop: dimensionsScale.scale(15),
  },
});
