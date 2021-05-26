import React from 'react';

interface Props {
  minHeight?: number;
  maxHeight?: number;
  renderHeader?: () => JSX.Element;
}

export type ResponseView = React.FC<Props>;
