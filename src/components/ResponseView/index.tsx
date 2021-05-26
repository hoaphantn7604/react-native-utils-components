import React, { useRef, useState } from 'react';
import { Easing, PanResponder, View } from 'react-native';
import { Animated } from 'react-native';
import { styles } from './styles';
import { ResponseView } from './type';

const ComponentScreen: ResponseView = props => {
  const { minHeight = 0, maxHeight = 400, renderHeader } = props;
  const [viewHeight] = useState(new Animated.Value(minHeight));

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveY } = gestureState;

        if (moveY < maxHeight && moveY > minHeight) {
          Animated.timing(viewHeight, {
            toValue: moveY,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { moveY } = gestureState;

        if (moveY > (maxHeight - minHeight) / 2) {
          Animated.timing(viewHeight, {
            toValue: maxHeight,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {});
        } else {
          Animated.timing(viewHeight, {
            toValue: minHeight,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {});
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          backgroundColor: '#DDDDDD',
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

export default ComponentScreen;
