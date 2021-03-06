import { StyleProp, ViewStyle } from 'react-native';

export interface Item {
    text?: string;
    status: boolean;
    icon?: any;
}

export interface Props {
  style?: StyleProp<ViewStyle>;
  fontFamily?: string;
  data: Item[];
  activeColor?: string;
  inActiveColor?: string;
  textColor?: string;
  selectIndex?: number;
  onSelectIndex?: (index: number) => void;
  selectColor?: string;
  textSize?: number;
  iconTick?: any;
}

export type StepProgress = React.FC<Props>
