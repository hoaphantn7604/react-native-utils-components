interface Props {
  maximumZoomScale?: number;
  minimumZoomScale?: number;
  autoZoom?: boolean;
}

export type ZoomView = React.FC<Props>
