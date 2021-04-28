import React, { useState } from 'react';
import { StyleSheet, ViewStyle, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

const { scale, fontScale } = dimensionsScale;

export interface Props {
  style: ViewStyle;
  listData?: any;
  textField: string;
  childField: string;
  buttonName?: string;
  selected: (data: any) => void;
}

let selectItem: any = [];

const RecursiveComponent: React.FC<Props> = (props) => {
  const [data] = useState<any>(props.listData);
  const [key, setKey] = useState(Math.random());

  const parent = (item: any) => {
    if (item && item[props.childField]) {
      const check = item[props.childField].filter((child: any) => !child.tick);
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
    if (item[props.childField]) {
      item[props.childField].map((child: any) => onTick(child));
    }
    reload();
  };

  const onUnTick = (item: any) => {
    item.tick = false;
    parent(item.parent);
    if (item[props.childField]) {
      item[props.childField].map((child: any) => onUnTick(child));
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
    selectItemTick(data);
  };

  const selectItemTick = (data: any) => {
    data.map((item: any) => {
      if (item.tick) {
        selectItem.push(item);
      }
      if (item[props.childField]) {
        selectItemTick(item[props.childField]);
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
      <View style={{ marginLeft: 20 }} key={index}>
        <View style={styles.row}>
          {childs && childs.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                showChild(item);
              }}>
              <Text style={styles.showIcon}>{item.show ? '+' : '-'}</Text>
            </TouchableOpacity>
          ) : <Text style={styles.showIcon}>{`  `}</Text>}
          <TouchableOpacity
            onPress={() => {
              if (!item.tick) {
                onTick(item);
              } else {
                onUnTick(item);
              }
            }}>
            <View style={{ flexDirection: 'row' }}>
              {item.tick ? <Text style={styles.tick}>☑</Text> : <Text style={styles.unTick}>☐</Text>}
              <Text style={styles.name} numberOfLines={1}>{item[props.textField]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[!item.show && { height: 0 }]}>
          {childs &&
            childs.map((data: any, index: number) => {
              if (!data.parent) {
                data.parent = item;
              }
              return renderList(data, data[props.childField], index);
            })}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderList(item, item[props.childField], index)}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        extraData={key}
      />
      <TouchableOpacity style={styles.btn} onPress={() => {
        props.selected(selectItem);
      }}>
        <Text style={styles.btnName}>{props.buttonName ? props.buttonName : 'Button'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecursiveComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: scale(5),
    marginVertical: scale(4),
    alignItems: 'center',
  },
  showIcon: {
    fontSize: scale(30),
  },
  name: {
    marginHorizontal: scale(10),
    fontSize: fontScale(16),
    marginTop: scale(5)
  },
  tick: {
    marginLeft: scale(16),
    fontSize: scale(25),
  },
  unTick: {
    marginLeft: scale(15),
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
