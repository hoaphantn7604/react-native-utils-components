import {
    ImageStyle, KeyboardTypeOptions,
    NativeSyntheticEvent,
    StyleProp,
    TextInputFocusEventData,
    TextStyle,
    ViewStyle
} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  textErrorStyle?: StyleProp<TextStyle>;
  textError?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  label?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  maxLength?: number;
  showIcon?: boolean;
  currency?: boolean;
  numeric?: boolean;
  unitCurrency?: string;
  renderRightIcon?: () => JSX.Element | null | undefined;
  renderLeftIcon?: () => JSX.Element | null | undefined;
  onChangeText: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export type CTextInput = React.FC<Props>