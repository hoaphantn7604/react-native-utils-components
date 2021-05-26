import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    seconds: number;
    start: boolean;
    onTimes?: (seconds: number) => void
    onEnd?: () => void
}

export type Countdown = React.FC<Props>