import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    textStyle?: StyleProp<TextStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    textErrorStyle?: StyleProp<TextStyle>;
    iconColor?: string
    activeColor?: string
    data: any[];
    value?: any | null;
    textError?: string;
    label?: string;
    placeholder?: string;
    labelField: string;
    valueField: string;
    onChange: (item: any) => void;
    renderLeftIcon?: () => JSX.Element | null | undefined;
    renderTickIcon?: () => JSX.Element | null | undefined;
  }

  export type CDropdown = React.FC<Props>
