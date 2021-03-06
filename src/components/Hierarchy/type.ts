import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  fontFamily?: string;
  iconColor: string;
  data: any[];
  textField: string;
  childField: string;
  buttonName?: string;
  onSelect: (data: any) => void;
}

export type Hierarchy = React.FC<Props>
