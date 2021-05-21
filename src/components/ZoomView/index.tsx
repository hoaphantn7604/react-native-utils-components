import React, { useEffect, useRef } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { CZoomView } from './type';

const { width, height } = Dimensions.get('window');

const defaultProps = {
  maximumZoomScale: 2,
  minimumZoomScale: 1,
  autoZoom: false,
  zoomHeight: height,
  zoomWidth: width,
}

const ZoomViewComponent: CZoomView = (props) => {
  const { maximumZoomScale, minimumZoomScale, zoomHeight, zoomWidth, autoZoom } = props;
  const scrollRef = useRef<any>(null);

  const onDefault = () => {
    if (scrollRef.current) {
      scrollRef.current.getScrollResponder().scrollResponderZoomTo({animated: false});
    }
  }

  useEffect(() => { 
    if(autoZoom){
      setTimeout(() => {
        onDefault();
      }, 50);
    }
  }, []);

  return (
      <View style={{ width: zoomWidth, height: zoomHeight }}>
        <ScrollView
          ref={scrollRef}
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