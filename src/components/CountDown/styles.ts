import {StyleSheet} from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

export const styles = StyleSheet.create({
    text: {
      fontSize: 20 * dimensionsScale.fontScale(),
      color: 'black',
    },
  });
  