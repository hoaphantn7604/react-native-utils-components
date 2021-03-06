import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface Props {

  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  fontFamily?: string;
  type?: 'checkbox' | 'radio';
  label?: string;
  check?: boolean;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export type Checkbox = React.FC<Props>
