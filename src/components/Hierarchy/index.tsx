import React, { useState } from 'react';
import { StyleSheet, ViewStyle, Text, View, TouchableOpacity, FlatList, StyleProp, TextStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

const { scale, fontScale } = dimensionsScale;

export interface Props {
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  iconColor: string;
  data: any[];
  textField: string;
  childField: string;
  buttonName?: string;
  selected: (data: any) => void;
}

const defaultProps = {
  style: {},
  textStyle: {},
  buttonStyle: {},
  buttonTextStyle: {},
  iconColor: 'black'
}

let selectItem: any = [];

const HierarchyComponent: React.FC<Props> = (props) => {
  const { data, textField, childField, style, textStyle, buttonStyle, iconColor, buttonTextStyle } = props;

  const [listData] = useState<any>(data);
  const [key, setKey] = useState(Math.random());

  const parent = (item: any) => {
    if (item && item[childField]) {
      const check = item[childField].filter((child: any) => !child.tick);
      if (check.length === 0) {
        item.tick = true;
      } else {
        item.tick = false;
      }
      parent(item.parent);
      reload();
    }
  };

  const onTick = (item: any) => {
    item.tick = true;
    parent(item.parent);
    if (item[childField]) {
      item[childField].map((child: any) => onTick(child));
    }
    reload();
  };

  const onUnTick = (item: any) => {
    item.tick = false;
    parent(item.parent);
    if (item[childField]) {
      item[childField].map((child: any) => onUnTick(child));
    }
    reload();
  };

  const showChild = (item: any) => {
    item.show = !item.show;
    reload();
  };

  const reload = () => {
    setKey(Math.random());
    selectItem = [];
    selectItemTick(listData);
  };

  const selectItemTick = (data: any) => {
    data.map((item: any) => {
      if (item.tick) {
        selectItem.push(item);
      }
      if (item[childField]) {
        selectItemTick(item[childField]);
      }
    });
  };

  const renderList = (item: any, childs: any, index: number) => {
    if (!item.show) {
      item.show = false;
    }
    if (!item.tick) {
      item.tick = false;
    }
    return (
      <View style={styles.item} key={index}>
        <View style={styles.rowItem}>
          {childs && childs.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                showChild(item);
              }}>
              <Text style={[styles.showIcon, { color: iconColor }]}>{item.show ? '+' : '-'}</Text>
            </TouchableOpacity>
          ) : <Text style={styles.showIcon}>{`  `}</Text>}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              if (!item.tick) {
                onTick(item);
              } else {
                onUnTick(item);
              }
            }}>
            <View style={styles.center}>
              {item.tick ? <Text style={[styles.tick, { color: iconColor }]}>☑</Text> : <Text style={[styles.unTick, { color: iconColor }]}>☐</Text>}
              <Text style={[styles.name, textStyle]} numberOfLines={3}>{item[textField]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[!item.show && { height: 0 }]}>
          {childs &&
            childs.map((data: any, index: number) => {
              if (!data.parent) {
                data.parent = item;
              }
              return renderList(data, data[childField], index);
            })}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={listData}
        renderItem={({ item, index }) => renderList(item, item[childField], index)}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        extraData={key}
      />
      <TouchableOpacity style={[styles.btn, buttonStyle]} onPress={() => {
        props.selected(selectItem);
      }}>
        <Text style={[styles.btnName, buttonTextStyle]}>{props.buttonName ? props.buttonName : 'Button'}</Text>
      </TouchableOpacity>
    </View>
  );
};

HierarchyComponent.defaultProps = defaultProps;

export default HierarchyComponent;

const styles = StyleSheet.create({
  container: {
    marginLeft: - scale(20)
  },
  item: {
    marginLeft: scale(30),
  },
  rowItem: {
    flexDirection: 'row',
    marginHorizontal: scale(5),
    marginVertical: scale(4),
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showIcon: {
    fontSize: scale(30),
    marginBottom: scale(5),
    width: scale(15),
  },
  name: {
    fontSize: fontScale(16),
    flex:1
  },
  tick: {
    marginHorizontal: scale(10),
    fontSize: scale(25),
  },
  unTick: {
    marginHorizontal: scale(10),
    fontSize: scale(30),
    marginTop: 3
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: scale(24),
    marginTop: scale(10),
    padding: scale(14)
  },
  btnName: {
    fontSize: fontScale(20),
    color: 'white',
    fontWeight: 'bold',
  },
});
