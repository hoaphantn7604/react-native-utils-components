import React, { useEffect, useState } from 'react';
import { Animated, Easing, FlatList, Image, Modal, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useScale } from 'react-native-utils-toolkit';
import { styles } from './styles';
import { CDropdown } from './type';

const { scale } = useScale;

const ic_down = require('./icon/down.png');
const ic_close = require('./icon/close.png');

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  data: [],
  style: {},
}

const Dropdown: CDropdown = (props) => {

  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>(null);
  const [height] = useState(new Animated.Value(0));

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
    renderTickIcon,
    renderLeftIcon
  } = props;

  useEffect(() => {
    getValue();
  }, []);

  const show = () => {
    Animated.timing(height, {
      toValue: scale(300),
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => { });
  }

  const close = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => { });
  }

  useEffect(() => {
    if (visible) {
      show();
    } else {
      close();
    }
  }, [visible])

  const showOrClose = () => {
    setVisible(!visible);
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
    return <Animated.View style={[{ height: height }]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  }

  const _renderModal = () => {
    if (visible) {
      return (
        <Modal visible={visible} animationType={'none'} transparent>
          <View style={styles.main}>
            <TouchableOpacity style={{ flex: 1 }} onPress={showOrClose}>
              <View style={{ flex: 1 }} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <SafeAreaView>
                <View style={[styles.header, headerStyle]}>
                  <Text style={[styles.headerTitle, labelStyle]}>{label}</Text>
                  <TouchableOpacity style={styles.closeIcon} onPress={showOrClose}>
                    <Image source={ic_close} style={[styles.icon, { tintColor: iconColor }]} />
                  </TouchableOpacity>
                </View>
                {_renderList()}
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      )
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

Dropdown.defaultProps = defaultProps;

export default Dropdown;

