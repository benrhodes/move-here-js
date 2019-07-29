var MoveHere = (function (exports) {
   'use strict';

   class Rectangle {
      constructor({x = 0, y = -0, width = 0, height = 0} = {}) {
         this._x = x;
         this._y = y;
         this._width = width;
         this._height = height;
         this._halfWidth = width / 2;
         this._halfHeight = height / 2;
         this._eighthWidth = width / 8;
         this._eighthHeight = height / 8;
      }

      set x(value) {
         this._x = value;
      }

      get x() {
         return this._x;
      }

      set y(value) {
         this._y = value;
      }

      get y() {
         return this._y;
      }

      set width(value) {
         this._width = value;
         this._halfWidth = value / 2;
         this._eighthWidth = value / 8;
      }

      get width() {
         return this._width;
      }

      set height(value) {
         this._height = value;
         this._halfHeight = value / 2;
         this._eighthHeight = value / 8;
      }

      get height() {
         return this._height;
      }

      get halfWidth() {
         return this._halfWidth;
      }

      get halfHeight() {
         return this._halfHeight;
      }

      get eighthWidth() {
         return this._eighthWidth;
      }

      get eighthHeight() {
         return this._eighthHeight;
      }
   }

   const MotionDirection = Object.defineProperties({}, {
      CURVE_RANDOM: {
         enumerable: true,
         value: 'curveRandom'
      }
   });

   const RADIANS_CONVERSION = Math.PI / 180;
   const DEGREES_CONVERSION = 180 / Math.PI;

   class Mathy {
      static radians(degrees) {
         return RADIANS_CONVERSION * degrees;
      }
      static degrees(radians) {
         return DEGREES_CONVERSION * radians;
      }
      static normalizeAngle(angleInDegrees) {
         if (angleInDegrees > 360) {
            while (angleInDegrees > 360) {
               angleInDegrees -= 360;
            }
         } else if (angleInDegrees < -360) {
            while (angleInDegrees < -360) {
               angleInDegrees += 360;
            }
         }
         return angleInDegrees;
      }
      static getMinAngleDiff(angleInDegrees1, angleInDegrees2) {
         if (angleInDegrees1 <= 0 && angleInDegrees2 >= 0 || angleInDegrees1 >= 0 && angleInDegrees2 <= 0) {
            const angle1Abs = angleInDegrees1 > 0.0 ? angleInDegrees1 : -angleInDegrees1;
            const angle2Abs = angleInDegrees2 > 0.0 ? angleInDegrees2 : -angleInDegrees2;
            const angle1Remainder = 180 - angle1Abs;
            const angle2Remainder = 180 - angle2Abs;
            return Math.min(angle1Remainder + angle2Remainder, angle1Abs + angle2Abs);
         }
         const rotationDiff = angleInDegrees1 - angleInDegrees2;
         return rotationDiff > 0.0 ? rotationDiff : -rotationDiff;
      }
      static convertRotationToAngle(rotation, xDiff, yDiff) {
         let currentAngle;

         // Quad 1
         if (xDiff >= 0 && yDiff < 0) {
            currentAngle = 90 + rotation;
            // Quad 2
         } else if (xDiff >= 0 && yDiff >= 0) {
            currentAngle = rotation - 90;
            // Quad 3
         } else if (xDiff < 0 && yDiff >= 0) {
            currentAngle = rotation + 270;
            // Quad 4
         } else {
            currentAngle = rotation + 90;
         }

         return Mathy.normalizeAngle(currentAngle);
      }
      static convertAngleToRotation(angle, xDiff, yDiff) {
         let rotation;

         // Quad 1
         if (xDiff >= 0 && yDiff < 0) {
            rotation = 90 - angle;
            // Quad 2
         } else if (xDiff >= 0 && yDiff >= 0) {
            rotation = 90 + angle;
            // Quad 3
         } else if (xDiff < 0 && yDiff >= 0) {
            rotation = -270 + angle;
            // Quad 4
         } else {
            rotation = 90 - angle;
         }

         return rotation;
      }
      static distanceBetweenTwoPoints(x1, y1, x2, y2) {
         return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      }
      static getRandomPointInsideRect(motionAsset, rect, uniqueQuad = true) {
         const randomXRange = {min: 0, max: 0};
         const randomYRange = {min: 0, max: 0};
         const point = {x: 0, y: 0};

         if (uniqueQuad) {
            if (motionAsset.x < rect.x + rect.halfWidth) {
               randomXRange.min = rect.eighthWidth;
               randomXRange.max = rect.halfWidth - randomXRange.min;
            } else {
               randomXRange.min = -rect.eighthWidth;
               randomXRange.max = -rect.halfWidth - randomXRange.min;
            }

            if (motionAsset.y < rect.y + rect.halfHeight) {
               randomYRange.min = rect.eighthHeight;
               randomYRange.max = rect.halfHeight - randomYRange.min;
            } else {
               randomYRange.min = -rect.eighthHeight;
               randomYRange.max = -rect.halfHeight - randomYRange.min;
            }
         } else {
            randomXRange.min = rect.x;
            randomXRange.max = rect.width;
            randomYRange.min = rect.y;
            randomYRange.max = rect.height;
         }

         point.x = motionAsset.x + Math.round(randomXRange.min + Math.random() * randomXRange.max);
         point.y = motionAsset.y + Math.round(randomYRange.min + Math.random() * randomYRange.max);

         if (point.x > rect.x + rect.width) {
            point.x = rect.x + rect.width;
         } else if (point.x < rect.x) {
            point.x = rect.x;
         }

         if (point.y > rect.y + rect.height) {
            point.y = rect.y + rect.height;
         } else if (point.y < rect.y) {
            point.y = rect.y;
         }

         return point;
      }
      static getRandomPointOutsideRect(motionAsset, rect) {
         const point = {x: 0, y: 0};
         const region = Math.floor(Math.random() * 4);
         switch (region) {
            case 0:
               point.x = rect.x - motionAsset.width;
               point.y = rect.y + Math.round(Math.random() * rect.height);
               break;
            case 1:
               point.x = rect.x + Math.round(Math.random() * rect.width);
               point.y = rect.y - motionAsset.height;
               break;
            case 2:
               point.x = rect.x + rect.width + motionAsset.width;
               point.y = rect.y + Math.round(Math.random() * rect.height);
               break;
            case 3:
               point.x = rect.x + Math.round(Math.random() * rect.width);
               point.y = rect.y + rect.height + motionAsset.height;
               break;
            default:
               break;
         }

         return point;
      }
   }

   var Status = Object.freeze({
      BORN: 'born',
      ALIVE: 'alive',
      DYING: 'dying',
      DEAD: 'dead'
   });

   const OUTSIDE_TARGET_AREA = 'outside';
   const INSIDE_TARGET_AREA = 'inside';
   const MIN_SCALE = .5;
   const MAX_SCALE = 1.5;

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

   class RandomMotionAdapter {
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

   class Timer {
      constructor() {
         this._requestAnimationId = null;
         this._paused = true;
         this._currentTime = 0;
         this._lastTime = 0;
         this._timeInMilliseconds = 0;
         this._timeUpdateHandlers = [];
      }
      _tick() {
         this._requestAnimationId = null;
         this._currentTime = performance.now();
         this._timeInMilliseconds += this._currentTime - this._lastTime;
         this._lastTime = this._currentTime;
         this._timeUpdateHandlers.every((timeUpdateHandler) => {
            return timeUpdateHandler(this._timeInMilliseconds);
         });
         if (!this._paused) {
            this._requestAnimationId = requestAnimationFrame(() => this._tick());
         }
      }
      get paused() {
         return this._paused;
      }
      get time() {
         return this._timeInMilliseconds;
      }
      addTimeUpdateListener(eventHandler) {
         this._timeUpdateHandlers.push(eventHandler);
      }
      play() {
         this._paused = false;
         this._lastTime = performance.now();
         this._requestAnimationId = requestAnimationFrame(() => this._tick());
      }
      pause() {
         if (this._requestAnimationId) {
            cancelAnimationFrame(this._requestAnimationId);
            this._requestAnimationId = null;
         }
         this._paused = true;
      }
   }

   let id = 0;

   class IdGenerator {
      static getId() {
         return id++;
      }
   }

   const TARGET_FRAME_RATE = 60;
   const MIN_ROTATION_PER_FRAME = 1;

   class MotionAsset {
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

   const MIN_DURATION = 2000;
   const MIN_UNITS_PER_SECOND = 30;
   const MIN_ROTATION_SPEED_MODIFIER = 1;

   class MotionEngine {
      constructor(rect = new Rectangle()) {
         this._boundingRectangle = rect;
         this._timer = new Timer();
         this._adaptersMap = {};

         const randomMotionAdapter = new RandomMotionAdapter(this._boundingRectangle);
         this._timer.addTimeUpdateListener(randomMotionAdapter.update.bind(randomMotionAdapter));

         this._adaptersMap[MotionDirection.CURVE_RANDOM] = randomMotionAdapter;
      }
      get paused() {
         return this._timer.paused;
      }
      start() {
         this._timer.play();
      }
      stop() {
         this._timer.pause();
      }
      addAsset({target = null, motionDirection = MotionDirection.CURVE_RANDOM, duration = MIN_DURATION, unitsPerSecond = MIN_UNITS_PER_SECOND, rotationSpeedModifier = MIN_ROTATION_SPEED_MODIFIER, rotateToDirection = true, simulateDepth = false, spawnLocation = 'outside', boundingRectangle = null} = {}) {
         // TODO: provide way to map transform (x, y, rotation, scale...) properties to target passed
         const motionAdapter = this._adaptersMap[motionDirection];
         if (!motionAdapter) {
            throw new Error(`MotionEngine - No motion adapter found with supplied motion direction of (${motionDirection})`);
         }

         const rotationSpeed = Math.round(unitsPerSecond * rotationSpeedModifier);
         const motionAsset = new MotionAsset(target, this._timer.time, duration, unitsPerSecond, rotationSpeed, motionDirection, rotateToDirection, simulateDepth, spawnLocation, boundingRectangle);

         motionAdapter.addAsset(motionAsset);

         return motionAsset;
      }
   }

   exports.MotionDirection = MotionDirection;
   exports.Rectangle = Rectangle;
   exports.MotionEngine = MotionEngine;

   return exports;

}({}));
