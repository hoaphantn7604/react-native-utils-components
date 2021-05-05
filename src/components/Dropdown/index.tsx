import React, { useState } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, Modal, SafeAreaView, Image, TouchableOpacity, FlatList, TouchableWithoutFeedback, ImageStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

const { scale } = dimensionsScale;

interface Item {
  label: string;
  value: any;
}

interface Props {
  data: Item[];
  onChange: (item: Item) => void;
  value?: Item | null;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  iconTickStyle?: StyleProp<ImageStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  label?: string | undefined;
  placeholder?: string | undefined
}

const defaultProps = {
  placeholder: 'Select item',
  data: [],
  style: {}
}

const Dropdown: React.FC<Props> = (props) => {

  const [visible, setVisible] = useState<boolean>(false);
  const { onChange, data, label, value, style, iconStyle, headerStyle, iconTickStyle, labelStyle, placeholder } = props;

  const _renderTitle = () => {
    if (label) {
      return (
        <Text style={[styles.title, labelStyle]}>
          {label}
        </Text>
      )
    }
  }

  const _renderDropdown = () => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        setVisible(!visible);
      }}>
        <View style={styles.dropdown}>
              <Text style={[labelStyle]}>
                {value?.label || placeholder}
              </Text>
              <Image source={require('./icon/down.png')} style={[styles.icon, iconStyle]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    return (
      <TouchableOpacity onPress={() => { onChange(item); setVisible(false) }}>
        <View style={[styles.item, item.value === value?.value && { backgroundColor: '#F6F7F8' }]}>
          <Text style={[labelStyle]}
          >{item.label}</Text>
          {item.value === value?.value &&  
            <Image source={require('./icon/check.png')} style={[styles.icon, iconTickStyle]} />
          }
        </View>
      </TouchableOpacity>
    );
  };

  const _renderList = () => {
    return <View style={styles.list}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  }

  const _renderModal = () => {
    return (
      <Modal visible={visible} animationType={'slide'} transparent>
        <View style={styles.main}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <SafeAreaView>
              <View style={[styles.header, headerStyle]}>
                <Text style={styles.headerTitle}>{label}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={() => { setVisible(false) }}>
                  <Image source={require('./icon/close.png')} style={[styles.icon, iconStyle]} />
                </TouchableOpacity>
              </View>
              {_renderList()}
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {_renderTitle()}
      {_renderDropdown()}
      {_renderModal()}
    </View>
  );
};

Dropdown.defaultProps = defaultProps;

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: scale(8),
    padding: dimensionsScale.scale(12),
    justifyContent: 'center'
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
  },
  header: {
    height: scale(50),
    width: '100%',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(8),
    borderBottomWidth: scale(0.3),
    borderBottomColor: 'gray'
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1,
    marginLeft: scale(45),
    fontSize: scale(15)
  },
  closeIcon: {
    width: scale(45),
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(35)
  },
  title: {
    marginVertical: dimensionsScale.scaleH(5),
    fontSize: scale(15)
  },
  list: {
    maxHeight: scale(300)
  },
  item: {
    padding: scale(17),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    width: scale(24),
    height: scale(24),
  }
});
