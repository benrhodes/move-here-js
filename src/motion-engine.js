import Rectangle from './rectangle';
import MotionDirection from './motion-direction';
import RandomMotionAdapter from './motion-adapters/random-motion-adapter';
import Timer from './timer';
import MotionAsset from './motion-asset';

const MIN_DURATION = 2000;
const MIN_UNITS_PER_SECOND = 15;
const MIN_ROTATION_SPEED_MODIFIER = 1;

export default class MotionEngine {
   constructor(rect=new Rectangle()) {
      this._boundingRectangle = rect;
      this._timer = new Timer();
      this._adaptersMap = {};

      let randomMotionAdapter = new RandomMotionAdapter(this._boundingRectangle);
      this._timer.addTimeUpdateListener(randomMotionAdapter.update.bind(randomMotionAdapter));

      this._adaptersMap[MotionDirection.CURVE_RANDOM] = randomMotionAdapter;
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
   addAsset({target=null, motionDirection=MotionDirection.CURVE_RANDOM, duration = MIN_DURATION, unitsPerSecond = MIN_UNITS_PER_SECOND, rotationSpeedModifier = MIN_ROTATION_SPEED_MODIFIER, rotateToDirection = true} = {}) {
      // TODO: provide way to map transform (x, y, rotation, scale...) properties to target passed
      let motionAdapter = this._adaptersMap[motionDirection];
      if(!motionAdapter) {
         throw new Error('MotionEngine - No motion adapter found with supplied motion direction of (' + motionDirection + ')');
      }

      let rotationSpeed = Math.round(unitsPerSecond * rotationSpeedModifier);
      let motionAsset = new MotionAsset(target, this._timer.time, duration, unitsPerSecond, rotationSpeed, motionDirection, rotateToDirection);

      motionAdapter.addAsset(motionAsset);
   }
}