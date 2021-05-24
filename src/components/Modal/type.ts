import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  transparent?: boolean;
  height?: number;
  supportedOrientations?: Array<
    'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'
  >;
  onRequestClose?: () => void;
  renderHeader?: () => JSX.Element;
}

export type CModal = React.FC<Props>;
