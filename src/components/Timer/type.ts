import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onTimes?: (seconds: number) => void
  onEnd?: (seconds: number) => void
}
