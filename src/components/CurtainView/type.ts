import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  maxHeight: number;
  position?: 'top' | 'bottom';
  renderHeader?: () => JSX.Element;
}

export type CurtainView = React.FC<Props>;
