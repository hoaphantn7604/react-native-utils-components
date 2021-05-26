import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  start: boolean;
  onTimes?: (seconds: number) => void
  onEnd?: (seconds: number) => void
}

export type Timer = React.FC<Props>