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
import CInput from '../TextInput';
import { useScale } from 'react-native-utils-toolkit';

const { scale } = useScale;

const ic_down = require('./icon/down.png');

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  backgroundColor: 'white',
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
    backgroundColor,
    fontFamily,
    textStyle,
    textError,
    iconColor,
    headerStyle,
    labelStyle,
    searchStyle,
    searchPlaceholder,
    placeholder,
    maxHeight = scale(400),
    search = false,
    renderTickIcon,
    renderLeftIcon,
    renderHeader
  } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>(null);
  const [textSearch, setTextSearch] = useState<string>('');
  const [listData, setListData] = useState<any[]>(data);

  useEffect(() => {
    getValue();
  }, []);

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      }
    } else {
      return {}
    }
  }

  const showOrClose = () => {
    setVisible(!visible);
  }

  const scrollToIndex = (ref: any) => {
    if(textSearch.length === 0){
      const index = data.findIndex(e => value === e[valueField]);
      if (index !== -1 && ref) {
        setTimeout(() => {
          ref.scrollToIndex({ index: index, animated: true })
        }, 300);
      }
    }  
  }

  const getValue = () => {
    const getItem = data.filter(e => value === e[valueField]);
    if (getItem.length > 0) {
      setCurrentValue((e: any) => e = getItem[0]);
    }
  }

  const onSelect = (item: any) => {
    onSearch('');
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
          <Text style={[styles.textItem, textStyle, font()]}>
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
          <Text style={[styles.textItem, textStyle, font()]}
          >{item[labelField]}</Text>
          {item[valueField] === (currentValue && currentValue[valueField]) &&
            renderTickIcon?.()
          }
        </View>
      </TouchableOpacity>
    );
  };

  const onSearch = (text: string) => {
    setTextSearch(text);
    if (text.length > 0) {
      const dataSearch = data.filter(e => {
        const item = e[labelField].toLowerCase().replace(' ', '');
        const key = text.toLowerCase().replace(' ', '');
        
        return item.indexOf(key) >= 0
      });
      setListData(dataSearch);
    } else {
      setListData(data);
    }
  }

  const _renderList = () => {
    return <SafeAreaView style={{ flex: 1 }}>
      {search && <CInput
        style={[styles.input, searchStyle]}
        inputStyle={font()}
        placeholder={searchPlaceholder}
        onChangeText={onSearch}
        placeholderTextColor="gray"
        iconStyle={{ tintColor: 'gray' }}
      />}
      <FlatList
        ref={(e) => scrollToIndex(e)}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
        backgroundColor={backgroundColor}
        visible={visible}
        headerStyle={styles.header}
        maxHeight={maxHeight}
        onRequestClose={showOrClose}
        renderHeader={() => renderHeader ? renderHeader() : _header()}
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
      {textError && <Text style={[styles.textError, textErrorStyle, font()]}>{textError}</Text>}
    </View>
  );
};

DropdownComponent.defaultProps = defaultProps;

export default DropdownComponent;

