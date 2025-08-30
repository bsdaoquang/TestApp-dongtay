// svg.d.ts
// This file provides TypeScript declarations for importing SVG files as React components in a React Native project.

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
