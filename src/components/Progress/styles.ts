import {StyleSheet} from 'react-native';
import { useScale } from 'react-native-utils-toolkit';

const { scale } = useScale;

export const styles = StyleSheet.create({
    main: {
      justifyContent: 'flex-end',
      minHeight: scale(44)
    },
    container: {
      width: '100%',
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: scale(5),
      opacity: 0.5,
    },
    controlBox: {
      position: 'absolute',
      width: scale(30),
      height: scale(30),
      zIndex: 9999,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    control: {
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'white',
      height: scale(30),
      width: scale(30),
      borderRadius: scale(15),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: scale(1),
      opacity: 0.5,
    },
    tick: {
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'white',
      height: scale(10),
      width: scale(10),
      borderRadius: scale(5),
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: 5,
      borderRightWidth: 5,
      borderBottomWidth: 0,
      borderLeftWidth: 5,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      opacity: 0.5,
    },
  });
  