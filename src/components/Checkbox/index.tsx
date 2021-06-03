import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image
} from 'react-native';
import { Checkbox } from './type';
import { useScale } from 'react-native-utils-toolkit';
import { styles } from './styles';

const { scale, fontScale } = useScale;
const checkbox_check = require('./icon/checkbox-check.png');
const checkbox_uncheck = require('./icon/checkbox-uncheck.png');
const radio_check = require('./icon/radio-check.png');
const radio_uncheck = require('./icon/radio-uncheck.png');

const defaultProps = {
  check: false,
  style: undefined,
  labelStyle: {},
  color: 'black',
  label: undefined,
  onPress: () => { },
};

const CheckComponent: Checkbox = (props) => {
  const { style, size = 25, type= 'checkbox', color, check, onPress, label, labelStyle } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[style ? style : styles.container]}>
        <Image
          style={{
            width: scale(size),
            height: scale(size),
            tintColor: color
          }}
          source={type === 'checkbox' ? check ? checkbox_check : checkbox_uncheck : check ? radio_check : radio_uncheck}
        />
        {label && <Text style={[styles.text, { fontSize: fontScale(size - 5), color: color }, labelStyle]}>{label}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

CheckComponent.defaultProps = defaultProps;

export default CheckComponent;
