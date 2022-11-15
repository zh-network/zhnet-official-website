// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type GlobeGenericInstance from 'globe.gl';
import { type OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare module 'globe.gl' {
  interface GlobeGenericInstance {
    controls(): OrbitControls;
  }
}
