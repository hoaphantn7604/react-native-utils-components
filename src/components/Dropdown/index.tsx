import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView
} from 'react-native';
import { styles } from './styles';
import { Dropdown } from './type';
import CModal from '../Modal';

const ic_down = require('./icon/down.png');

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  data: [],
  style: {},
}

const DropdownComponent: Dropdown = (props) => {

  const {
    onChange,
    data,
    label,
    value,
    style,
    labelField,
    valueField,
    textErrorStyle,
    activeColor,
    textStyle,
    textError,
    iconColor,
    headerStyle,
    labelStyle,
    placeholder,
    maxHeight = 400,
    renderTickIcon,
    renderLeftIcon
  } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>(null);

  useEffect(() => {
    getValue();
  }, []);

  const showOrClose = () => {
    setVisible(!visible);
  }

  const scrollToIndex = (ref: any) => {
    const index = data.findIndex(e => value === e[valueField]);
    if (index !== -1 && ref) {
      setTimeout(() => {
        ref.scrollToIndex({ index: index, animated: true })
      }, 300);

    }
  }

  const getValue = () => {
    const getItem = data.filter(e => value === e[valueField]);
    if (getItem.length > 0) {
      setCurrentValue((e: any) => e = getItem[0]);
    }
  }

  const onSelect = (item: any) => {
    setCurrentValue((e: any) => e = item);
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
      <TouchableWithoutFeedback onPress={showOrClose}>
        <View style={styles.dropdown}>
          {renderLeftIcon?.()}
          <Text style={[{ flex: 1 }, textStyle]}>
            {currentValue && currentValue[labelField] || placeholder}
          </Text>
          <Image source={ic_down} style={[styles.icon, { tintColor: iconColor }]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={[styles.item, item[valueField] === (currentValue && currentValue[valueField]) && { backgroundColor: activeColor }]}>
          <Text style={[textStyle]}
          >{item[labelField]}</Text>
          {item[valueField] === (currentValue && currentValue[valueField]) &&
            renderTickIcon?.()
          }
        </View>
      </TouchableOpacity>
    );
  };

  const _renderList = () => {
    return <SafeAreaView><FlatList
      ref={(e) => scrollToIndex(e)}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    /></SafeAreaView>
  }

  const _header = () => {
    return (
      <View style={[styles.header, headerStyle]}>
        <View style={styles.pan} />
      </View>)
  }

  const _renderModal = () => {
    if (visible) {
      return <CModal
        transparent
        visible={visible}
        headerStyle={styles.header}
        height={maxHeight}
        onRequestClose={showOrClose}
        renderHeader={() => _header()}
        supportedOrientations={['landscape', 'portrait']}
      >
        {_renderList()}
      </CModal>
    }
    return null
  }

  return (
    <View>
      <View style={[style]}>
        {_renderTitle()}
        {_renderDropdown()}
        {_renderModal()}
      </View>
      {textError && <Text style={[styles.textError, textErrorStyle]}>{textError}</Text>}
    </View>
  );
};

DropdownComponent.defaultProps = defaultProps;

export default Dropdown;

