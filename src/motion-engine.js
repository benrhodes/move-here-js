import Rectangle from './rectangle';
import MotionDirection from './motion-direction';
import RandomMotionAdapter from './motion-adapters/random-motion-adapter';
import Timer from './timer';

export default class MotionEngine {
   constructor({rect=new Rectangle()} = {}) {
      this._boundingRectangle = rect;
      this._timer = new Timer();
      this._adapters = {};
      this._adapters[MotionDirection.CURVE_RANDOM] = new RandomMotionAdapter(this._boundingRectangle);
      this._timer.addTimeUpdateListener(this._adapters[MotionDirection.CURVE_RANDOM].update);
   }
   get paused(){
      return this._timer.paused;
   }
   start() {
      this._timer.play();
   }
   stop() {
      this._timer.pause();
   }
}