import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
const { width, height } = Dimensions.get('window');

export interface Props {
  maximumZoomScale?: number;
  minimumZoomScale?: number;
  zoomHeight?: number;
  zoomWidth?: number;
}

const defaultProps = {
  maximumZoomScale: 2,
  minimumZoomScale: 1,
  zoomHeight: height,
  zoomWidth: width,
}

const ZoomViewComponent: React.FC<Props> = (props) => {
  const { maximumZoomScale, minimumZoomScale, zoomHeight, zoomWidth } = props;
  return (
      <View style={{ width: zoomWidth, height: zoomHeight }}>
        <ScrollView
          maximumZoomScale={maximumZoomScale}
          minimumZoomScale={minimumZoomScale}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >{props.children}</ScrollView>
      </View>
  );
};

ZoomViewComponent.defaultProps = defaultProps;

export default ZoomViewComponent;
