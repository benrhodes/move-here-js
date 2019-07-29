const OUTSIDE_TARGET_AREA = 'outside';
const INSIDE_TARGET_AREA = 'inside';
const MIN_SCALE = .5;
const MAX_SCALE = 1.5;

import Mathy from '../mathy';
import Status from '../status-constants';

const getPositionDelta = function(motionAsset) {
   const positionDelta = {};
   positionDelta.x = motionAsset.destinationX - motionAsset.x;
   positionDelta.y = motionAsset.destinationY - motionAsset.y;
   return positionDelta;
};

const setNewDestinationPoint = function(motionAsset, boundingRectangle, location) {
   let destinationPoint;
   if (location === INSIDE_TARGET_AREA) {
      destinationPoint = Mathy.getRandomPointInsideRect(motionAsset, boundingRectangle);
   } else {
      destinationPoint = Mathy.getRandomPointOutsideRect(motionAsset, boundingRectangle);
   }

   motionAsset.destinationX = destinationPoint.x;
   motionAsset.destinationY = destinationPoint.y;
};

const resetRotationDirection = function(motionAsset) {
   motionAsset.acquireRotationDirection = true;
   motionAsset.rotationAmount = 0;
};

const setAssetStateBasedOnTime = function(motionAsset, timeInMilliseconds, boundingRectangle) {
   if (motionAsset.status === Status.ALIVE && motionAsset.duration !== -1 && timeInMilliseconds - motionAsset.initTime >= motionAsset.duration) {
      setNewDestinationPoint(motionAsset, boundingRectangle, OUTSIDE_TARGET_AREA);
      resetRotationDirection(motionAsset);
      motionAsset.status = Status.DYING;
   }
};

const setScale = function(motionAsset, boundingRectangle) {
   if (motionAsset.simulateDepth) {
      let newScale = MIN_SCALE + (motionAsset.y - boundingRectangle.y) / boundingRectangle.height * (MAX_SCALE - MIN_SCALE);

      if (newScale < MIN_SCALE) {
         newScale = MIN_SCALE;
      }
      if (newScale > MAX_SCALE) {
         newScale = MAX_SCALE;
      }

      motionAsset.scaleX = newScale;
      motionAsset.scaleY = newScale;
   }
};

const setRotation = function(motionAsset, positionDelta) {
   const distance = Mathy.distanceBetweenTwoPoints(motionAsset.x, motionAsset.y, motionAsset.destinationX, motionAsset.destinationY);
   if (distance === 0) {
      return;
   }
   let nextRotation = motionAsset.rotation;
   const calculatedAngle = Math.round(Mathy.degrees(Math.acos(positionDelta.x / distance)));
   const calculatedRotation = Mathy.convertAngleToRotation(calculatedAngle, positionDelta.x, positionDelta.y);
   const rotationDiff = Mathy.getMinAngleDiff(calculatedRotation, nextRotation);

   if (rotationDiff <= motionAsset.rotationPerFrame) {
      nextRotation = calculatedRotation;
   } else {
      if (motionAsset.acquireRotationDirection) {
         motionAsset.acquireRotationDirection = false;
         if (calculatedAngle < nextRotation) {
            motionAsset.rotationDirection = -1;
         } else {
            motionAsset.rotationDirection = 1;
         }
      }

      // determine rotation modifier, this only comes into play when an object has rotated more than
      // 360 degrees around the destination point.  We need to increase the speed of rotation to it
      // so it can reach its destination eventually.
      const rotationModifier = motionAsset.rotationAmount / 360 <= 1 ? 1 : motionAsset.rotationAmount / 360;

      nextRotation += motionAsset.rotationDirection * motionAsset.rotationPerFrame * rotationModifier;
      nextRotation = Mathy.normalizeAngle(nextRotation);
   }
   motionAsset.rotationAmount += Mathy.getMinAngleDiff(motionAsset.rotation, nextRotation);
   motionAsset.rotation = nextRotation;
};

const setTranslation = function(motionAsset, positionDelta) {
   if (Math.abs(positionDelta.x) < motionAsset.unitsPerFrame && Math.abs(positionDelta.y) < motionAsset.unitsPerFrame) {
      if (motionAsset.status === Status.DYING) {
         motionAsset.status = Status.DEAD;
      }
      motionAsset.x = motionAsset.destinationX;
      motionAsset.y = motionAsset.destinationY;
   } else {
      const currentAngleRadians = Mathy.radians(Mathy.convertRotationToAngle(motionAsset.rotation, positionDelta.x, positionDelta.y));
      if (positionDelta.y < 0) {
         motionAsset.x -= Math.cos(currentAngleRadians) * motionAsset.unitsPerFrame;
         motionAsset.y -= Math.sin(currentAngleRadians) * motionAsset.unitsPerFrame;
      } else {
         motionAsset.x += Math.cos(currentAngleRadians) * motionAsset.unitsPerFrame;
         motionAsset.y += Math.sin(currentAngleRadians) * motionAsset.unitsPerFrame;
      }
   }
};

const doesAssetNeedNewDestinationPoint = function(motionAsset) {
   return motionAsset.x === motionAsset.destinationX && motionAsset.y === motionAsset.destinationY;
};

export default class RandomMotionAdapter {
   constructor(boundingRectangle) {
      this._boundingRectangle = boundingRectangle;
      this._motionAssets = {};
   }
   addAsset(motionAsset) {
      let initPoint;
      if (motionAsset.spawnLocation === 'inside') {
         initPoint = Mathy.getRandomPointInsideRect(motionAsset, motionAsset.boundingRectangle || this._boundingRectangle, false);
      } else {
         initPoint = Mathy.getRandomPointOutsideRect(motionAsset, motionAsset.boundingRectangle || this._boundingRectangle);
      }
      motionAsset.x = initPoint.x;
      motionAsset.y = initPoint.y;

      setNewDestinationPoint(motionAsset, motionAsset.boundingRectangle || this._boundingRectangle, INSIDE_TARGET_AREA);
      resetRotationDirection(motionAsset);
      setScale(motionAsset, this._boundingRectangle);

      motionAsset.status = Status.ALIVE;

      this._motionAssets[motionAsset.id] = motionAsset;
   }
   update(timeInMilliseconds) {
      let motionAsset;
      let positionDelta;

      Object.keys(this._motionAssets).forEach((key) => {
         motionAsset = this._motionAssets[key];

         setAssetStateBasedOnTime(motionAsset, timeInMilliseconds, motionAsset.boundingRectangle || this._boundingRectangle);

         positionDelta = getPositionDelta(motionAsset);
         setScale(motionAsset, this._boundingRectangle);
         setRotation(motionAsset, positionDelta);
         setTranslation(motionAsset, positionDelta);

         if (doesAssetNeedNewDestinationPoint(motionAsset)) {
            setNewDestinationPoint(motionAsset, motionAsset.boundingRectangle || this._boundingRectangle, INSIDE_TARGET_AREA);
            resetRotationDirection(motionAsset);
         }

         if (motionAsset.status === Status.DEAD) {
            delete this._motionAssets[key];
         }
      });
   }
}
