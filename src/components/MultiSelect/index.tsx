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
import { MultiSelect } from 'react-native-utils-components/src/components/MultiSelect/type';
import CModal from 'react-native-utils-components/src/components/Modal';
import CInput from 'react-native-utils-components/src/components/TextInput';
import { useScale } from 'react-native-utils-toolkit';

const { scale, fontScale } = useScale;

const ic_down = require('./icon/down.png');

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  backgroundColor: 'white',
  data: [],
  style: {},
}

const MultiSelectComponent: MultiSelect = (props) => {

  const {
    onChange,
    data,
    label,
    value,
    style,
    labelField,
    valueField,
    textErrorStyle,
    selectedStyle,
    selectedTextStyle,
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
  const [currentValue, setCurrentValue] = useState<any[]>([]);
  const [textSearch, setTextSearch] = useState<string>('');
  const [listData, setListData] = useState<any[]>(data);
  const [key, setKey] = useState<number>(Math.random());

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
    if (textSearch.length === 0) {
      const index = data.findIndex(e => value === e[valueField]);
      if (index !== -1 && ref) {
        setTimeout(() => {
          ref.scrollToIndex({ index: index, animated: true })
        }, 300);
      }
    }
  }

  const getValue = () => {
    setCurrentValue(value);
  }

  const onSelect = (item: any) => {
    onSearch('');

    const index = currentValue.findIndex(e => e === item[valueField]);
    if (index > -1) {
      currentValue.splice(index, 1);
    } else {
      currentValue.push(item[valueField]);
    }
    onChange(currentValue);
    setKey(Math.random());
  }

  const _renderTitle = () => {
    if (label) {
      return (
        <Text style={[styles.title, labelStyle, font()]}>
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
            {placeholder}
          </Text>
          <Image source={ic_down} style={[styles.icon, { tintColor: iconColor }]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const checkSelected = (item: any) => {
    const index = currentValue.findIndex(e => e === item[valueField]);
    return index > -1;
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={[styles.item, checkSelected(item) && { backgroundColor: activeColor, marginBottom: scale(0.5) }]}>
          <Text style={[styles.textItem, textStyle, font()]}
          >{item[labelField]}</Text>
          {checkSelected(item) &&
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
        extraData={key}
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
        visible={visible}
        headerStyle={styles.header}
        backgroundColor={backgroundColor}
        maxHeight={maxHeight}
        onRequestClose={showOrClose}
        renderHeader={() => renderHeader ? renderHeader(): _header()}
        supportedOrientations={['landscape', 'portrait']}
      >
        {_renderList()}
      </CModal>
    }
    return null
  }

  const unSelect = (item: any) => {
    const index = currentValue.indexOf(item[valueField]);
    currentValue.splice(index, 1);
    setKey(Math.random());
  }

  const _renderItemSelected = () => {
    const list = data.filter((e: any) => {
      const check = currentValue.indexOf(e[valueField]);
      if (check !== -1) {
        return e;
      }
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {list.map(e => {
          return (
            <TouchableOpacity
              key={e[labelField]}
              style={[styles.selectedItem, selectedStyle]}
              onPress={() => unSelect(e)}
            >
              <Text style={[{ fontSize: fontScale(12), color: 'gray' }, selectedTextStyle, font()]}>{e[labelField]}</Text>
              <Text style={[styles.selectedTextItem, selectedTextStyle]}>ⓧ</Text>
            </TouchableOpacity>
          )
        })}
      </View>)
  }

  return (
    <View>
      <View style={[style]}>
        {_renderTitle()}
        {_renderDropdown()}
        {_renderModal()}
      </View>
      {textError && <Text style={[styles.textError, textErrorStyle, font()]}>{textError}</Text>}
      {_renderItemSelected()}
    </View>
  );
};

MultiSelectComponent.defaultProps = defaultProps;

export default MultiSelectComponent;

