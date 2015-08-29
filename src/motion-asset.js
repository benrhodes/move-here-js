import MotionDirection from './motion-direction';
import IdGenerator from './id-generator';

const TARGET_FRAME_RATE = 60;

export default class MotionAsset {
   constructor(target, initTime, duration, unitsPerSecond, rotationSpeed, motionDirection, rotateToDirection) {
      this._id = IdGenerator.getId();
      this._target = target;
      this._initTimeInMilliseconds = initTime;
      this._duration = duration;
      this._unitsPerSecond = unitsPerSecond;
      this._rotationSpeed = rotationSpeed;
      this._motionDirection = motionDirection;
      this._rotateToDirection = rotateToDirection;
      this._unitsPerFrame = unitsPerSecond / TARGET_FRAME_RATE;
      this._acquireRotationDirection = false;
      this._destinationX = 0;
      this._destinationY = 0;
      this._status = 'born';
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
      this._target.rotation = rotation;
   }
   get rotation() {
      return this._target.rotation;
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
   get rotationSpeed() {
      return this._rotationSpeed;
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
}