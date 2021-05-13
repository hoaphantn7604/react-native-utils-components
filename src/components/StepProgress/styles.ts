import {StyleSheet} from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';

const { scale, fontScale } = dimensionsScale;

export const styles = StyleSheet.create({
    container: {},
    radius: {
      width: scale(30),
      height: scale(30),
      borderRadius: scale(15),
      borderWidth: scale(2),
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      height: scale(3),
      marginTop: scale(15),
    },
    wrapTick: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    wrapText: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    text: {
      marginTop: scale(10),
      textAlign: 'center',
      fontWeight: '500'
    },
    icon: {
      width: scale(20),
      height: scale(20),
    },
  });