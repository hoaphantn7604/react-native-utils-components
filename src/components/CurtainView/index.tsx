import React, { useRef, useState } from 'react';
import { Easing, PanResponder, View } from 'react-native';
import { Animated } from 'react-native';
import { styles } from './styles';
import { CurtainView } from './type';

const CurtainViewComponent: CurtainView = props => {
  const { style, maxHeight = 200, renderHeader, position = 'top' } = props;
  const minHeight = 0;
  const [viewHeight] = useState(new Animated.Value(minHeight));
  let currentHeight = 0;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;

        if (position === 'top') {
          if (dy > 0) {
            currentHeight = dy;
          } else {
            currentHeight = maxHeight + dy;
          }
        } else {
          if (dy < 0) {
            currentHeight = minHeight - dy;
          } else {
            currentHeight = maxHeight - dy;
          }
        }

        if (currentHeight < maxHeight && currentHeight > 0) {
          Animated.timing(viewHeight, {
            toValue: currentHeight,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;

        if (position === 'top') {
          if (dy > 0) {
            Animated.timing(viewHeight, {
              toValue: maxHeight,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }).start(() => {
              currentHeight = maxHeight;
            });
          } else {
            Animated.timing(viewHeight, {
              toValue: minHeight,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }).start(() => {
              currentHeight = minHeight;
            });
          }
        } else {
          if (dy < 0) {
            Animated.timing(viewHeight, {
              toValue: maxHeight,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }).start(() => {
              currentHeight = maxHeight;
            });
          } else {
            Animated.timing(viewHeight, {
              toValue: minHeight,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }).start(() => {
              currentHeight = minHeight;
            });
          }
        }
      },
    }),
  ).current;

  const _renderTop = () => {
    return (
      <View style={[styles.containerTop, style]}>
        <Animated.View
          style={{
            backgroundColor: 'transparent',
            height: viewHeight,
          }}>
          {props?.children}
        </Animated.View>
        <Animated.View {...panResponder.panHandlers} style={styles.header}>
          {renderHeader ? renderHeader() : <View style={styles.pan} />}
        </Animated.View>
      </View>
    );
  };

  const _renderBottom = () => {
    return (
      <View style={[styles.containerBottom, style, { height: maxHeight }]}>
        <Animated.View {...panResponder.panHandlers} style={styles.header}>
          {renderHeader ? renderHeader() : <View style={styles.pan} />}
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: 'transparent',
            height: viewHeight,
          }}>
          {props?.children}
        </Animated.View>
      </View>
    );
  };

  if (position === 'top') {
    return _renderTop();
  }
  return _renderBottom();
};

export default CurtainViewComponent;
