import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  maxHeight: number;
  position?: 'top' | 'bottom';
  show?: boolean;
  renderHeader?: () => JSX.Element;
  onShow?: (status: boolean)=> void;
}

export type CurtainView = React.FC<Props>;
