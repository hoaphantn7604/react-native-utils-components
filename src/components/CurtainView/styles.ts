import { StyleSheet } from 'react-native';
import { useScale } from 'react-native-utils-toolkit';

const { scale } = useScale;

export const styles = StyleSheet.create({
  containerTop: {},
  containerBottom: {
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: '#BBBBBB',
    height: scale(40),
    justifyContent: 'center',
  },
  pan: {
    width: scale(40),
    height: scale(5),
    borderRadius: scale(5),
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
