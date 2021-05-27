import React, { useEffect, useRef, useState } from 'react';
import { Easing, PanResponder, View } from 'react-native';
import { Animated } from 'react-native';
import { styles } from './styles';
import { CurtainView } from './type';

const CurtainViewComponent: CurtainView = props => {
  const { style, headerStyle, backgroundColor= 'transparent', maxHeight = 200, renderHeader, position = 'top', show = false, onShow } = props;
  const minHeight = 0;
  const [viewHeight] = useState(new Animated.Value(minHeight));
  let currentHeight = 0;

  useEffect(() => {
    if (show) {
      checkshow(show);
    }
  }, [show])

  const checkshow = (status: boolean) => {
    Animated.timing(viewHeight, {
      toValue: status ? maxHeight : minHeight,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => { currentHeight = status ? maxHeight : minHeight });
  };

  const handlerShow = (status: boolean) => {
    if (onShow) {
      onShow(status);
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderEnd: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;

        if (position === 'top') {
          if (dy > 0) {
            if (currentHeight < maxHeight) {
              currentHeight = dy;
            }
          } else {
            currentHeight = maxHeight + dy;
          }
        } else {
          if (dy < 0) {
            if (currentHeight < maxHeight) {
              currentHeight = minHeight - dy;
            }
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
          }).start(() => { });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        if (dy !== 0) {
          if (position === 'top') {
            if (dy > 0) {
              Animated.timing(viewHeight, {
                toValue: maxHeight,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(() => {
                currentHeight = maxHeight;
                handlerShow(true);
              });
            } else {
              Animated.timing(viewHeight, {
                toValue: minHeight,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(() => {
                currentHeight = minHeight;
                handlerShow(false);
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
                handlerShow(true);
              });
            } else {
              Animated.timing(viewHeight, {
                toValue: minHeight,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(() => {
                currentHeight = minHeight;
                handlerShow(false);
              });
            }
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
            backgroundColor: backgroundColor,
            height: viewHeight,
          }}>
          {props?.children}
        </Animated.View>
        <Animated.View {...panResponder.panHandlers} style={[styles.header, headerStyle]}>
          {renderHeader ? renderHeader() : <View style={styles.pan} />}
        </Animated.View>
      </View>
    );
  };

  const _renderBottom = () => {
    return (
      <View style={[styles.containerBottom, style]}>
        <Animated.View {...panResponder.panHandlers} style={[styles.header, headerStyle]}>
          {renderHeader ? renderHeader() : <View style={styles.pan} />}
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: backgroundColor,
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
