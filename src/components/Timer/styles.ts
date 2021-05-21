import {StyleSheet} from 'react-native';
import { useScale } from 'react-native-utils-toolkit';

export const styles = StyleSheet.create({
    text: {
      fontSize: useScale.fontScale(20),
      color: 'black',
    },
  });
  