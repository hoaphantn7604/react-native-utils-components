import { StyleSheet } from 'react-native';
import { useScale } from 'react-native-utils-toolkit';

const { scale, fontScale } = useScale;

export const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: scale(8),
      padding: scale(12),
      justifyContent: 'center'
    },
    main: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
      backgroundColor: 'white',
      width: '100%',
      borderTopLeftRadius: scale(16),
      borderTopRightRadius: scale(16),
    },
    header: {
      height: scale(50),
      width: '100%',
      borderTopLeftRadius: scale(16),
      borderTopRightRadius: scale(16),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: scale(8),
      borderBottomWidth: scale(0.3),
      borderBottomColor: 'gray'
    },
    headerTitle: {
      textAlign: 'center',
      flex: 1,
      marginLeft: scale(45),
      fontSize: scale(15)
    },
    closeIcon: {
      width: scale(45),
      height: scale(45),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: scale(35)
    },
    title: {
      marginVertical: scale(5),
      fontSize: scale(15)
    },
    list: {
      maxHeight: scale(300)
    },
    item: {
      padding: scale(17),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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
  