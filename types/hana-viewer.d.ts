import type { HTMLAttributes } from 'react';

declare namespace JSX {
  interface IntrinsicElements {
    'hana-viewer': HTMLAttributes<HTMLElement> & {
      url?: string;
    };
    'spline-viewer': HTMLAttributes<HTMLElement> & {
      url?: string;
    };
  }
}
