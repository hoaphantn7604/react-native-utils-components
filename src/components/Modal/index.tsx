import React, { useRef, useState } from 'react';
import { Animated, Easing, Modal, PanResponder, View } from 'react-native';
import { useDetectDevice, useScale } from 'react-native-utils-toolkit';
import { styles } from './styles';
import { CModal } from './type';

const { scale } = useScale;
const { height: h } = useDetectDevice;

const defaultProps = {
  visible: false,
  transparent: false,
  height: h / 2,
  styles: {},
  headerStyle: {},
  backgroundColor: 'rgba(0,0,0,0.4)',
};

const ModalComponent: CModal = props => {
  const {
    visible,
    height = h / 2,
    onRequestClose,
    transparent,
    style,
    backgroundColor,
    headerStyle,
    renderHeader,
  } = props;
  const [viewHeight] = useState(new Animated.Value(0));

  const show = () => {
    Animated.timing(viewHeight, {
      toValue: height,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {});
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        console.log('onStartShouldSetPanResponder', gestureState);
        return true;
      },
      onPanResponderEnd: (evt, gestureState) => {
        console.log('onPanResponderEnd', gestureState);
        return true;
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveY } = gestureState;
        const getHeight = h - moveY;
        Animated.timing(viewHeight, {
          toValue: getHeight,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {});
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { moveY } = gestureState;
        const getHeight = h - moveY;
        if (getHeight < height - 50) {
          Animated.timing(viewHeight, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {
            if (onRequestClose) {
              onRequestClose();
            }
          });
        } else {
          Animated.timing(viewHeight, {
            toValue: height,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {});
        }
      },
    }),
  ).current;

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      style={{ flex: 1 }}
      onShow={() => {
        show();
      }}>
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: backgroundColor,
          },
          style,
        ]}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.header, headerStyle]}>
          {renderHeader ? renderHeader() : <View style={styles.pan} />}
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: 'white',
            height: viewHeight,
          }}>
          {props?.children}
        </Animated.View>
      </View>
    </Modal>
  );
};

ModalComponent.defaultProps = defaultProps;
export default ModalComponent;
