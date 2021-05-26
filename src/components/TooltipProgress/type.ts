import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  tooltipStyle?: StyleProp<ViewStyle>;
  data: Item[];
  activeColor?: string;
  inActiveColor?: string;
  selectIndex?: number;
  onSelectIndex?: (index: number) => void;
  selectColor?: string;
  textSize?: number;
}

export interface Item {
  stage?: string;
  text: string;
  status: boolean;
  icon?: any;
}

export type TooltipProgress = React.FC<Props>