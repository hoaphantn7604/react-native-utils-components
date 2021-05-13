import { StyleSheet } from 'react-native';
import { dimensionsScale } from 'react-native-utils-scale';
const { scale, fontScale } = dimensionsScale;

export const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: scale(8),
      padding: scale(12),
      justifyContent: 'center',
    },
    textInput: {
      fontSize: fontScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      height: scale(40),
    },
    label: {
      marginBottom: scale(4),
      fontSize: scale(15)
    },
    row: {
      flexDirection: 'row',
    },
    icon: {
      width: scale(24),
      height: scale(24),
    },
    textError: {
      color: 'red',
      fontSize: fontScale(14),
      marginTop: scale(10)
    }
  });
  