import { StyleProp, ViewStyle } from 'react-native';

export interface Item {
    text: string;
    status: boolean;
}

export interface Props {
  style?: StyleProp<ViewStyle>;
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

export type CStepProgress = React.FC<Props>