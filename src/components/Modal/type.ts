import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface Props {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  height?: number;
  transparent?: boolean;
  onRequestClose: () => void;
  renderHeader?: () => JSX.Element;
}

export type CModal = React.FC<Props>;
