import { CText } from 'components';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { shallowEqual, useSelector } from 'react-redux';
import { COLOR } from 'reduxs/root/model';
import { RootState } from 'reduxs/store/rootReducers';

interface Props {
  check?: boolean;
  style?: ViewStyle;
  size?: number | undefined;
  onPress?: () => void;
  type: 'checkbox' | 'radio';
  bgcolor?: string | undefined;
  title?: string | undefined;
}

const defaultProps = {
  check: false,
  style: {},
  size: 25,
  bgcolor: undefined,
  title: undefined,
  onPress: () => {},
};

const CheckComponent: React.FC<Props> = (props) => {
  const { color } = useSelector(
    (state: RootState) => ({
      color: state.Root.color as COLOR,
    }),
    shallowEqual,
  );

  const { style, size, type, bgcolor, check, onPress, title } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <MaterialIcons
          style={style}
          size={size}
          color={bgcolor ? bgcolor : color.PRIMARY}
          name={
            type === 'checkbox'
              ? check
                ? 'check-box'
                : 'check-box-outline-blank'
              : check
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
          }
        />
        {title && <CText style={[styles.text, { fontSize: size ? size - 8 : 16 }]}>{title}</CText>}
      </View>
    </TouchableWithoutFeedback>
  );
};

CheckComponent.defaultProps = defaultProps;

export default CheckComponent;

const styles = StyleSheet.create({
  container: {
    padding: dimensionsScale.scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: dimensionsScale.scale(10),
  },
});
