const OUTSIDE_TARGET_AREA = 'outside';
const INSIDE_TARGET_AREA = 'inside';
const MIN_SCALE = .5;
const MAX_SCALE = 1.5;

import Mathy from '../mathy';
import Status from '../status-constants';

export default class RandomMotionAdapter {
   constructor(boundingRectangle) {
      this._boundingRectangle = boundingRectangle;
      this._motionAssets = {};
   }
   addAsset(motionAsset) {
      let initPoint = Mathy.getRandomPointOutsideRect(motionAsset, this._boundingRectangle);
      motionAsset.x = initPoint.x;
      motionAsset.y = initPoint.y;

      let destinationPoint = Mathy.getRandomPointInsideRect(motionAsset, this._boundingRectangle);
      motionAsset.destinationX = destinationPoint.x;
      motionAsset.destinationY = destinationPoint.y;

      motionAsset.status = Status.ALIVE;
      motionAsset.acquireRotationDirection = true;

      if(motionAsset.simulateDepth) {
         motionAsset.scaleX = motionAsset.scaleY = (MIN_SCALE + ((motionAsset.y - this._boundingRectangle.y) / this._boundingRectangle.height));
      }

      this._motionAssets[motionAsset.id] = motionAsset;
   }
   update(timeInMilliseconds) {
      let isAssetOutOfTime;
      let currentAngle;
      let currentRotation;
      let distance;
      let nextX;
      let nextY;
      let xDiff;
      let yDiff;
      let absXDiff;
      let absYDiff;
      let finalAngle;
      let rotationDiff;
      let rotationModifier;
      let motionAsset;
      let destinationPoint;
      let rotationAngle;
      let newScale;

      Object.keys(this._motionAssets).forEach((key) => {
         motionAsset = this._motionAssets[key];

         if(motionAsset.duration !== -1) {
            isAssetOutOfTime = (timeInMilliseconds - motionAsset.initTime) >= motionAsset.duration;
         } else {
            isAssetOutOfTime = false;
         }

         if (motionAsset.simulateDepth) {
            newScale = MIN_SCALE + (((motionAsset.y - this._boundingRectangle.y) / this._boundingRectangle.height) * (MAX_SCALE - MIN_SCALE));
            if (newScale < MIN_SCALE) {
               newScale = MIN_SCALE;
            }
            if(newScale > MAX_SCALE) {
               newScale = MAX_SCALE;
            }

            motionAsset.scaleX = motionAsset.scaleY = newScale;
         }

         if(isAssetOutOfTime && motionAsset.status === Status.ALIVE) {
            motionAsset.status = Status.DYING;

            destinationPoint = Mathy.getRandomPointOutsideRect(motionAsset, this._boundingRectangle);
            motionAsset.destinationX = destinationPoint.x;
            motionAsset.destinationY = destinationPoint.y;
            motionAsset.acquireRotationDirection = true;
            motionAsset.rotationAmount = 0;
         }

         currentRotation = motionAsset.rotation;

         distance = Mathy.distanceBetweenTwoPoints(motionAsset.x, motionAsset.y, motionAsset.destinationX, motionAsset.destinationY);
         xDiff = motionAsset.destinationX - motionAsset.x;
         yDiff = motionAsset.destinationY - motionAsset.y;

         finalAngle = Math.round(Mathy.degrees(Math.acos(xDiff/distance)));
         rotationAngle = Mathy.convertAngleToRotation(finalAngle, xDiff, yDiff);
         rotationDiff = Mathy.getMinAngleDiff(rotationAngle, currentRotation);

         if(rotationDiff <= motionAsset.rotationPerFrame) {
            currentRotation = rotationAngle;
            currentAngle = Mathy.convertRotationToAngle(currentRotation, xDiff, yDiff);
         } else {
            currentAngle = Mathy.convertRotationToAngle(currentRotation, xDiff, yDiff);

            if(motionAsset.acquireRotationDirection) {
               motionAsset.acquireRotationDirection = false;
               if(finalAngle < currentRotation) {
                  motionAsset.rotationDirection = -1;
               } else {
                  motionAsset.rotationDirection = 1;
               }
            }

            // determine rotation modifier, this only comes into play when an object has rotated more than
            // 360 degrees around the destination point.  We need to increase the speed of rotation to it
            // so it can reach its destination eventually.
            rotationModifier = (motionAsset.rotationAmount/360 <= 1 ? 1 : motionAsset.rotationAmount/360);

            currentAngle += motionAsset.rotationDirection * motionAsset.rotationPerFrame * rotationModifier;
            currentRotation += motionAsset.rotationDirection * motionAsset.rotationPerFrame * rotationModifier;
         }

         motionAsset.rotationAmount += Mathy.getMinAngleDiff(motionAsset.rotation, currentRotation);
         motionAsset.rotation = currentRotation;

         if(yDiff < 0) {
            nextX = motionAsset.x - (Math.cos(Mathy.radians(currentAngle)) * motionAsset.unitsPerFrame);
            nextY = motionAsset.y - (Math.sin(Mathy.radians(currentAngle)) * motionAsset.unitsPerFrame);
         } else {
            nextX = motionAsset.x + (Math.cos(Mathy.radians(currentAngle)) * motionAsset.unitsPerFrame);
            nextY = motionAsset.y + (Math.sin(Mathy.radians(currentAngle)) * motionAsset.unitsPerFrame);
         }

         absXDiff = xDiff > 0.0 ? xDiff : -xDiff;
         absYDiff = yDiff > 0.0 ? yDiff : -yDiff;

         if(absXDiff < motionAsset.unitsPerFrame && absYDiff < motionAsset.unitsPerFrame) {
            if(motionAsset.status === Status.ALIVE) {
               motionAsset.x = motionAsset.destinationX;
               motionAsset.y = motionAsset.destinationY;

               destinationPoint = Mathy.getRandomPointInsideRect(motionAsset, this._boundingRectangle);
               motionAsset.destinationX = destinationPoint.x;
               motionAsset.destinationY = destinationPoint.y;
               motionAsset.acquireRotationDirection = true;
               motionAsset.rotationAmount = 0;
            } else {
               // TODO: notify that asset is dead
               motionAsset.status = Status.DEAD;
               delete this._motionAssets[key];
            }
         } else {
            motionAsset.x = nextX;
            motionAsset.y = nextY;
         }
      });
   }
};