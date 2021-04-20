import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import Fontisto from 'react-native-vector-icons/Fontisto';

export interface Props {
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
          {childs && childs.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                showChild(item);
              }}>
              <Text style={styles.showIcon}>{item.show ? '+' : '-'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              if (!item.tick) {
                onTick(item);
              } else {
                onUnTick(item);
              }
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Fontisto
                style={styles.tick}
                size={dimensionsScale.scale(18)}
                name={item.tick ? 'checkbox-active' : 'checkbox-passive'}
              />
              <Text style={styles.name}>{item[props.textField]}</Text>
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
    <View style={styles.container}>
      <ScrollView style={styles.container} key={key}>
        {data.map((item: any, index: number) => renderList(item, item[props.childField], index))}
      </ScrollView>
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
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: dimensionsScale.scale(5),
    marginVertical: dimensionsScale.scale(4),
    alignItems: 'center',
  },
  showIcon: {
    fontSize: dimensionsScale.scale(30),
    width: dimensionsScale.scale(18),
  },
  name: {
    marginHorizontal: dimensionsScale.scale(10),
    fontSize: dimensionsScale.fontScale(16),
  },
  tick: {
    marginLeft: dimensionsScale.scale(15),
  },
  btn: {
    width: dimensionsScale.scale(150),
    height: dimensionsScale.scale(50),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: dimensionsScale.scale(25),
  },
  btnName: {
    fontSize: dimensionsScale.fontScale(20),
    color: 'white',
    fontWeight: 'bold',
  },
});
