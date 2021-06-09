import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { ZoomView } from './type';

const defaultProps = {
  maximumZoomScale: 2,
  minimumZoomScale: 1,
  autoZoom: false,
}

const ZoomViewComponent: ZoomView = (props) => {
  const { maximumZoomScale, minimumZoomScale, autoZoom } = props;
  const scrollRef = useRef<any>(null);

  const onDefault = () => {
    if (scrollRef.current) {
      scrollRef.current.getScrollResponder().scrollResponderZoomTo({ animated: false });
    }
  }

  useEffect(() => {
    if (autoZoom) {
      setTimeout(() => {
        onDefault();
      }, 50);
    }
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      maximumZoomScale={maximumZoomScale}
      minimumZoomScale={minimumZoomScale}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >{props.children}</ScrollView>
  );
};

ZoomViewComponent.defaultProps = defaultProps;

export default ZoomViewComponent;
