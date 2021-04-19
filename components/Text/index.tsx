import { dimensionsScale } from 'react-native-utils-scale';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'reduxs/store/rootReducers';
import { COLOR } from 'reduxs/root/model';

interface Props {
  fontSize?: number | undefined;
  bold?: boolean;
  color?: string | undefined;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  touch?: boolean;
  onPress?: () => void;
  lineHeight?: number | undefined;
}
const defaultProps = {
  style: {},
  fontSize: undefined,
  bold: false,
  touch: false,
  color: undefined,
  lineHeight: undefined,
  onPress: () => {},
};

const TextComponent: React.FC<Props> = (props) => {
  const { setupColor } = useSelector(
    (state: RootState) => ({
      setupColor: state.Root.color as COLOR,
    }),
    shallowEqual,
  );

  const {
    touch,
    numberOfLines,
    onPress,
    fontSize,
    bold,
    color,
    style,
    children,
    lineHeight,
  } = props;

  let FONTSIZE: number = 12;
  if (fontSize) {
    FONTSIZE = fontSize;
  }
  if (touch) {
    if (numberOfLines) {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <Text
            style={[
              {
                fontSize: dimensionsScale.scale(FONTSIZE),
                color: !color ? setupColor.TEXT_COLOR : color,
              },
              bold && { fontWeight: 'bold' },
              style,
            ]}
            numberOfLines={numberOfLines}>
            {children}
          </Text>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <Text
            style={[
              {
                fontSize: dimensionsScale.fontScale(FONTSIZE),
                color: !color ? setupColor.TEXT_COLOR : color,
              },
              bold && { fontWeight: 'bold' },
              lineHeight && { lineHeight: lineHeight },
              style,
            ]}>
            {children}
          </Text>
        </TouchableWithoutFeedback>
      );
    }
  } else {
    if (numberOfLines) {
      return (
        <Text
          style={[
            {
              fontSize: dimensionsScale.scale(FONTSIZE),
              color: !color ? setupColor.TEXT_COLOR : color,
            },
            bold && { fontWeight: 'bold' },
            lineHeight && { lineHeight: lineHeight },
            style,
          ]}
          numberOfLines={numberOfLines}>
          {children}
        </Text>
      );
    } else {
      return (
        <Text
          style={[
            {
              fontSize: dimensionsScale.scale(FONTSIZE),
              color: !color ? setupColor.TEXT_COLOR : color,
            },
            bold && { fontWeight: 'bold' },
            lineHeight && { lineHeight: lineHeight },
            style,
          ]}>
          {children}
        </Text>
      );
    }
  }
};

TextComponent.defaultProps = defaultProps;

export default TextComponent;

const styles = StyleSheet.create({
  text: {
    color: 'gray',
  },
});
