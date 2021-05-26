import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  percent: number;
  data: { color: string; percent: number }[];
  border?: boolean;
  height?: number;
}

export type Progress = React.FC<Props>