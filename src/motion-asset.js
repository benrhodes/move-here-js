import IdGenerator from './id-generator';
import Status from './status-constants';

const TARGET_FRAME_RATE = 60;
const MIN_ROTATION_PER_FRAME = 1;

export default class MotionAsset {
   constructor(target, initTime, duration, unitsPerSecond, rotationPerSecond, motionDirection, rotateToDirection, simulateDepth, spawnLocation, boundingRectangle = null) {
      this._id = IdGenerator.getId();
      this._target = target;
      this._initTimeInMilliseconds = initTime;
      this._duration = duration;
      this._unitsPerSecond = unitsPerSecond;
      this._rotationPerSecond = rotationPerSecond;
      this._rotationPerFrame = rotationPerSecond / TARGET_FRAME_RATE;
      this._motionDirection = motionDirection;
      this._rotateToDirection = rotateToDirection;
      this._unitsPerFrame = unitsPerSecond / TARGET_FRAME_RATE;
      this._simulateDepth = simulateDepth;
      this._spawnLocation = spawnLocation;
      this._acquireRotationDirection = false;
      this._destinationX = 0;
      this._destinationY = 0;
      this._status = Status.BORN;
      this._rotationAmount = 0;
      this._rotationDirection = 1;
      this._rotationProxy = 0;
      this._boundingRectangle = boundingRectangle;

      // check rotation per frame value to avoid pathing issues
      if (this._rotationPerFrame < MIN_ROTATION_PER_FRAME) {
         this._rotationPerFrame = MIN_ROTATION_PER_FRAME;
      }
   }
   get id() {
      return this._id;
   }
   get target() {
      return this._target;
   }
   get duration() {
      return this._duration;
   }
   get unitsPerSecond() {
      return this._unitsPerSecond;
   }
   get unitsPerFrame() {
      return this._unitsPerFrame;
   }
   set status(status) {
      this._status = status;
   }
   get status() {
      return this._status;
   }
   set initTime(timeInMilliseconds) {
      this._initTimeInMilliseconds = timeInMilliseconds;
   }
   get initTime() {
      return this._initTimeInMilliseconds;
   }
   set x(x) {
      this._target.x = x;
   }
   get x() {
      return this._target.x;
   }
   set y(y) {
      this._target.y = y;
   }
   get y() {
      return this._target.y;
   }
   get width() {
      return this._target.width || 0;
   }
   get height() {
      return this._target.height || 0;
   }
   set rotation(rotation) {
      if (this._rotateToDirection) {
         this._target.rotation = rotation;
      } else {
         this._rotationProxy = rotation;
      }
   }
   get rotation() {
      if (this._rotateToDirection) {
         return this._target.rotation;
      }
      return this._rotationProxy;
   }
   set destinationX(x) {
      this._destinationX = x;
   }
   get destinationX() {
      return this._destinationX;
   }
   set destinationY(y) {
      this._destinationY = y;
   }
   get destinationY() {
      return this._destinationY;
   }
   get rotationPerSecond() {
      return this._rotationPerSecond;
   }
   get rotationPerFrame() {
      return this._rotationPerFrame;
   }
   get motionDirection() {
      return this._motionDirection;
   }
   set rotateToDirection(bool) {
      this._rotateToDirection = bool;
   }
   get rotateToDirection() {
      return this._rotateToDirection;
   }
   set acquireRotationDirection(acquireRotationDirection) {
      this._acquireRotationDirection = acquireRotationDirection;
   }
   get acquireRotationDirection() {
      return this._acquireRotationDirection;
   }
   set rotationAmount(rotationAmount) {
      this._rotationAmount = rotationAmount;
   }
   get rotationAmount() {
      return this._rotationAmount;
   }
   set rotationDirection(rotationDirection) {
      this._rotationDirection = rotationDirection;
   }
   get rotationDirection() {
      return this._rotationDirection;
   }
   set simulateDepth(simulateDepth) {
      this._simulateDepth = simulateDepth;
   }
   get simulateDepth() {
      return this._simulateDepth;
   }
   set spawnLocation(spawnLocation) {
      this._spawnLocation = spawnLocation;
   }
   get spawnLocation() {
      return this._spawnLocation;
   }
   get boundingRectangle() {
      return this._boundingRectangle;
   }
}