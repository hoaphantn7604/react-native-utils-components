import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface Props {
  check?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  size?: number;
  type?: 'checkbox' | 'radio';
  color?: string;
  label?: string;
  onPress?: () => void;
}

export type Checkbox = React.FC<Props>
