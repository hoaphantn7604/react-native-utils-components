import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    iconTickStyle?: StyleProp<ImageStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<ViewStyle>;
    textErrorStyle?: StyleProp<TextStyle>;
    data: any[];
    value?: any | null;
    textError?: string;
    label?: string;
    placeholder?: string;
    labelField: string;
    valueField: string;
    iconTick?: any;
    onChange: (item: any) => void;
  }

  export type CDropdown = React.FC<Props>