interface Props {
  maximumZoomScale?: number;
  minimumZoomScale?: number;
  zoomHeight?: number;
  zoomWidth?: number;
  autoZoom?: boolean;
}

export type CZoomView = React.FC<Props>