import Rectangle from './rectangle';
import MotionDirection from './motion-direction';
import RandomMotionAdapter from './motion-adapters/random-motion-adapter';

export default class MotionEngine {
   constructor({rect=new Rectangle(), motionDirection=MotionDirection.CURVE_RANDOM} = {}) {
      this._boundingRectangle = rect;
      this._paused = false;
      switch (motionDirection) {
         case MotionDirection.CURVE_RANDOM:
            this._motionAdapter = new RandomMotionAdapter();
            break;
         default:
            break;
      }
   }
   get paused(){
      return this._paused;
   }
   start() {
      this._paused = false;
   }
   stop() {
      this._paused = true;
   }
}