import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageStyle, KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  Text, TextInput,
  TextInputFocusEventData,
  TextStyle,
  TouchableOpacity, View,
  ViewStyle
} from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import { styles } from './styles';

const { scale } = dimensionsScale;
const ic_eye = require('./icon/eye.png');
const ic_uneye = require('./icon/uneye.png');
const ic_close= require('./icon/close.png');

export interface Props {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  textErrorStyle?: StyleProp<TextStyle>;
  textError?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  label?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  maxLength?: number;
  showIcon?: boolean;
  currency?: boolean;
  numeric?: boolean;
  unitCurrency?: string;
  renderRightIcon?: () => JSX.Element | null | undefined;
  renderLeftIcon?: () => JSX.Element | null | undefined;
  onChangeText: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const defaultProps = {
  placeholderTextColor: '#000',
  placeholder: '',
  value: '',
  showIcon: true,
  currency: false,
  numeric: false,
  labelColor: 'gray',
  unitCurrency: '$',
  onChangeText: (value: string) => { },
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => { },
  onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => { },
};

const TextInputComponent: React.FC<Props> = (props) => {
  const {
    style,
    placeholder,
    value,
    label,
    secureTextEntry,
    autoCapitalize,
    keyboardType,
    multiline,
    autoFocus,
    editable,
    maxLength,
    showIcon,
    placeholderTextColor,
    inputStyle,
    iconStyle,
    currency,
    numeric,
    labelStyle,
    unitCurrency,
    textErrorStyle,
    textError,
    onChangeText,
    onBlur,
    onFocus,
    renderLeftIcon,
    renderRightIcon,
  } = props;

  const [text, setText] = useState<string>('');
  const [textEntry, setTextEntry] = useState<boolean>(secureTextEntry ? true : false);

  useEffect(() => {
    if (value) {
      if (currency || numeric) {
        setText(formatCurrency(value));
      } else {
        setText(value);
      }
    }
  }, []);

  const formatCurrency = (num: string) => {
    const values = num.toString().replace(/\D/g, '');
    return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const reConvertCurrency = (x: string) => {
    let s;
    s = x.split('.');
    s = s.join('');
    return s;
  };

  const onChange = (text: string) => {
    if (currency || numeric) {
      setText(formatCurrency(text));
      onChangeText(reConvertCurrency(text));
    } else {
      setText(text);
      onChangeText(text);
    }
  };

  const onChangeTextEntry = () => {
    setTextEntry(!textEntry);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return (
          renderRightIcon()
        );
      }
      if (secureTextEntry) {
        return (
          <TouchableOpacity onPress={onChangeTextEntry}>
            <Image source={textEntry ? ic_eye : ic_uneye} style={[styles.icon, iconStyle]} />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => setText('')}>
            <Image source={ic_close} style={[styles.icon, iconStyle]} />
          </TouchableOpacity>)
      }
    }
    return null;
  };

  return (
    <View>
      <View style={[styles.container, style]}>
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
          </Text>
        )}
        <View style={styles.textInput}>
          {renderLeftIcon?.()}
          {currency && (
            <Text style={{ marginRight: scale(3) }}>
              {unitCurrency}
            </Text>
          )}
          <TextInput
            style={[{ flex: 1 }, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize && autoCapitalize}
            secureTextEntry={textEntry}
            keyboardType={keyboardType && keyboardType}
            multiline={multiline && multiline}
            autoFocus={autoFocus && autoFocus}
            editable={editable && editable}
            maxLength={maxLength && maxLength}
            value={text}
            onChangeText={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {_renderRightIcon()}
        </View>
      </View>
      {textError && <Text style={[styles.textError, textErrorStyle]}>{textError}</Text>}
    </View>
  );
};

TextInputComponent.defaultProps = defaultProps;

export default TextInputComponent;
