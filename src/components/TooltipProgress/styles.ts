import { StyleSheet } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
const { scale, fontScale } = dimensionsScale;

export const styles = StyleSheet.create({
    container: {},
    radius: {
      width: scale(30),
      height: scale(30),
      borderRadius: scale(15),
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      height: scale(3),
      marginTop: scale(15),
    },
    text: { color: 'white', fontSize: fontScale(16) },
    icon: {
      width: scale(20),
      height: scale(20),
    },
    tag: {
      paddingHorizontal: scale(12),
      paddingVertical: scale(6),
      borderRadius: scale(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    triangle: {
      marginTop: scale(10),
      marginLeft: scale(10),
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: 0,
      borderRightWidth: 5,
      borderBottomWidth: 10,
      borderLeftWidth: 5,
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      opacity: 1,
    },
  });
  