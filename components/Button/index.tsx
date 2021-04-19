import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import { shallowEqual, useSelector } from 'react-redux';
import { COLOR } from 'reduxs/root/model';
import { RootState } from 'reduxs/store/rootReducers';

interface Props {
  title?: string;
  textColor?: string;
  bgColor?: string;
  style?: ViewStyle;
  fontSize?: number | any;
  onPress: () => void;
  border?: boolean;
  primaryColor?: string | null;
}

const defaultProps = {
  bgColor: '',
  style: {},
  textColor: '',
  fontSize: null,
  border: false,
  onPress: () => {},
  primaryColor: null,
};

const ButtonComponent: React.FC<Props> = (props) => {
  const { color } = useSelector(
    (state: RootState) => ({
      color: state.Root.color as COLOR,
    }),
    shallowEqual,
  );

  const { fontSize, bgColor, style, textColor, title, onPress, border, primaryColor } = props;
  if (border) {
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[
          styles.container,
          {
            borderColor:
              textColor === '' ? (primaryColor ? primaryColor : color.PRIMARY) : textColor,
            borderWidth: dimensionsScale.scale(1),
          },
          style,
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: textColor === '' ? (primaryColor ? primaryColor : color.PRIMARY) : textColor,
            },
            fontSize && { fontSize: dimensionsScale.fontScale(fontSize) },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.container,
        { backgroundColor: bgColor === '' ? color.BUTTON : bgColor },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          { color: textColor === '' ? color.BUTTON_TEXT_COLOR : textColor },
          fontSize && { fontSize: dimensionsScale.fontScale(fontSize) },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

ButtonComponent.defaultProps = defaultProps;

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: dimensionsScale.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensionsScale.scale(5),
    paddingHorizontal: dimensionsScale.scale(10),
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: dimensionsScale.scale(18),
    fontWeight: 'bold',
    marginLeft: dimensionsScale.scale(5),
    textAlign: 'center',
  },
});
