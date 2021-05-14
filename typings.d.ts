declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

import * as React from 'react';

declare module 'react' {
     interface HTMLProps<T> {
        ref?:any
    }

}

type ref = any