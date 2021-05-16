import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageStyle, Modal, SafeAreaView, StyleProp, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { styles } from './styles';

const ic_check = require('./icon/check.png');
const ic_down = require('./icon/down.png');
const ic_close = require('./icon/close.png');

interface Props {
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  iconTickStyle?: StyleProp<ImageStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  textErrorStyle?: StyleProp<TextStyle>;
  data: any[];
  value?: any | null;
  textError?: string;
  label?: string;
  placeholder?: string;
  labelField: string;
  valueField: string;
  iconTick: any;
  onChange: (item: any) => void;
}

const defaultProps = {
  placeholder: 'Select item',
  data: [],
  style: {},
  iconTick: null
}

const Dropdown: React.FC<Props> = (props) => {

  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(null);
  const {
    onChange,
    data,
    label,
    value,
    style,
    labelField,
    valueField,
    textErrorStyle,
    textError,
    iconStyle,
    headerStyle,
    iconTickStyle,
    labelStyle,
    placeholder,
    iconTick
  } = props;

  useEffect(() => {
    getValue();
  }, []);

  const getValue = () => {
    const getItem = data.filter(e => value === e[valueField]);
    if (getItem.length > 0) {
      setCurrentValue(e => e = getItem[0]);
    }
  }

  const onSelect = (item: any) => {
    setCurrentValue(e => e = item);
    onChange(item[valueField]);
    setVisible(false);
  }

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
            {currentValue && currentValue[labelField] || placeholder}
          </Text>
          <Image source={ic_down} style={[styles.icon, iconStyle]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity onPress={() => { onSelect(item) }}>
        <View style={[styles.item, item[valueField] === (currentValue && currentValue[valueField]) && { backgroundColor: '#F6F7F8' }]}>
          <Text style={[labelStyle]}
          >{item[labelField]}</Text>
          {item[valueField] === (currentValue && currentValue[valueField]) &&
            <Image source={iconTick ? iconTick : ic_check} style={[styles.icon, iconTickStyle]} />
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
                  <Image source={ic_close} style={[styles.icon, iconStyle]} />
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
    <View>
      <View style={[styles.container, style]}>
        {_renderTitle()}
        {_renderDropdown()}
        {_renderModal()}
      </View>
      {textError && <Text style={[styles.textError, textErrorStyle]}>{textError}</Text>}
    </View>
  );
};

Dropdown.defaultProps = defaultProps;

export default Dropdown;

