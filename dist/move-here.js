(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rectangle = require('./rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _motionDirection = require('./motion-direction');

var _motionDirection2 = _interopRequireDefault(_motionDirection);

var _motionEngine = require('./motion-engine');

var _motionEngine2 = _interopRequireDefault(_motionEngine);

var MoveHere = global.MoveHere = global.MoveHere || {};

MoveHere.MotionDirection = _motionDirection2['default'];
MoveHere.Rectangle = _rectangle2['default'];
MoveHere.MotionEngine = _motionEngine2['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./motion-direction":6,"./motion-engine":7,"./rectangle":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;

var IdGenerator = (function () {
   function IdGenerator() {
      _classCallCheck(this, IdGenerator);
   }

   _createClass(IdGenerator, null, [{
      key: "getId",
      value: function getId() {
         return id++;
      }
   }]);

   return IdGenerator;
})();

exports["default"] = IdGenerator;
;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RADIANS_CONVERSION = Math.PI / 180;
var DEGREES_CONVERSION = 180 / Math.PI;

var Mathy = (function () {
   function Mathy() {
      _classCallCheck(this, Mathy);
   }

   _createClass(Mathy, null, [{
      key: "radians",
      value: function radians(degrees) {
         return RADIANS_CONVERSION * degrees;
      }
   }, {
      key: "degrees",
      value: function degrees(radians) {
         return DEGREES_CONVERSION * radians;
      }
   }, {
      key: "normalizeAngle",
      value: function normalizeAngle(angleInDegrees) {
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
   }, {
      key: "getMinAngleDiff",
      value: function getMinAngleDiff(angleInDegrees1, angleInDegrees2) {
         if (angleInDegrees1 <= 0 && angleInDegrees2 >= 0 || angleInDegrees1 >= 0 && angleInDegrees2 <= 0) {
            var angle1Abs = angleInDegrees1 > 0.0 ? angleInDegrees1 : -angleInDegrees1;
            var angle2Abs = angleInDegrees2 > 0.0 ? angleInDegrees2 : -angleInDegrees2;
            var angle1Remainder = 180 - angle1Abs;
            var angle2Remainder = 180 - angle2Abs;
            return Math.min(angle1Remainder + angle2Remainder, angle1Abs + angle2Abs);
         } else {
            var rotationDiff = angleInDegrees1 - angleInDegrees2;
            return rotationDiff > 0.0 ? rotationDiff : -rotationDiff;
         }
      }
   }, {
      key: "convertRotationToAngle",
      value: function convertRotationToAngle(rotation, xDiff, yDiff) {
         var currentAngle = undefined;

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
   }, {
      key: "convertAngleToRotation",
      value: function convertAngleToRotation(angle, xDiff, yDiff) {
         var rotation = undefined;

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
   }, {
      key: "distanceBetweenTwoPoints",
      value: function distanceBetweenTwoPoints(x1, y1, x2, y2) {
         return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      }
   }, {
      key: "getRandomPointInsideRect",
      value: function getRandomPointInsideRect(motionAsset, rect) {
         var uniqueQuad = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

         var randomXRange = { min: 0, max: 0 };
         var randomYRange = { min: 0, max: 0 };
         var point = { x: 0, y: 0 };

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
   }, {
      key: "getRandomPointOutsideRect",
      value: function getRandomPointOutsideRect(motionAsset, rect) {
         var point = { x: 0, y: 0 };
         var region = Math.floor(Math.random() * 4);
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
   }]);

   return Mathy;
})();

exports["default"] = Mathy;
;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mathy = require('../mathy');

var _mathy2 = _interopRequireDefault(_mathy);

var _statusConstants = require('../status-constants');

var _statusConstants2 = _interopRequireDefault(_statusConstants);

var OUTSIDE_TARGET_AREA = 'outside';
var INSIDE_TARGET_AREA = 'inside';
var MIN_SCALE = .5;
var MAX_SCALE = 1.5;

var getPositionDelta = function getPositionDelta(motionAsset) {
   var positionDelta = {};
   positionDelta.x = motionAsset.destinationX - motionAsset.x;
   positionDelta.y = motionAsset.destinationY - motionAsset.y;
   return positionDelta;
};

var setNewDestinationPoint = function setNewDestinationPoint(motionAsset, boundingRectangle, location) {
   var destinationPoint = undefined;
   if (location === 'inside') {
      destinationPoint = _mathy2['default'].getRandomPointInsideRect(motionAsset, boundingRectangle);
   } else {
      destinationPoint = _mathy2['default'].getRandomPointOutsideRect(motionAsset, boundingRectangle);
   }

   motionAsset.destinationX = destinationPoint.x;
   motionAsset.destinationY = destinationPoint.y;
};

var resetRotationDirection = function resetRotationDirection(motionAsset) {
   motionAsset.acquireRotationDirection = true;
   motionAsset.rotationAmount = 0;
};

var setAssetStateBasedOnTime = function setAssetStateBasedOnTime(motionAsset, timeInMilliseconds, boundingRectangle) {
   if (motionAsset.status === _statusConstants2['default'].ALIVE && motionAsset.duration !== -1 && timeInMilliseconds - motionAsset.initTime >= motionAsset.duration) {
      setNewDestinationPoint(motionAsset, boundingRectangle, 'outside');
      resetRotationDirection(motionAsset);
      motionAsset.status = _statusConstants2['default'].DYING;
   }
};

var setScale = function setScale(motionAsset, boundingRectangle) {
   if (motionAsset.simulateDepth) {
      var newScale = MIN_SCALE + (motionAsset.y - boundingRectangle.y) / boundingRectangle.height * (MAX_SCALE - MIN_SCALE);

      if (newScale < MIN_SCALE) {
         newScale = MIN_SCALE;
      }
      if (newScale > MAX_SCALE) {
         newScale = MAX_SCALE;
      }

      motionAsset.scaleX = motionAsset.scaleY = newScale;
   }
};

var setRotation = function setRotation(motionAsset, positionDelta) {
   var distance = _mathy2['default'].distanceBetweenTwoPoints(motionAsset.x, motionAsset.y, motionAsset.destinationX, motionAsset.destinationY);
   if (distance === 0) {
      return;
   }
   var nextRotation = motionAsset.rotation;
   var calculatedAngle = Math.round(_mathy2['default'].degrees(Math.acos(positionDelta.x / distance)));
   var calculatedRotation = _mathy2['default'].convertAngleToRotation(calculatedAngle, positionDelta.x, positionDelta.y);
   var rotationDiff = _mathy2['default'].getMinAngleDiff(calculatedRotation, nextRotation);

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
      var rotationModifier = motionAsset.rotationAmount / 360 <= 1 ? 1 : motionAsset.rotationAmount / 360;

      nextRotation += motionAsset.rotationDirection * motionAsset.rotationPerFrame * rotationModifier;
      nextRotation = _mathy2['default'].normalizeAngle(nextRotation);
   }
   motionAsset.rotationAmount += _mathy2['default'].getMinAngleDiff(motionAsset.rotation, nextRotation);
   motionAsset.rotation = nextRotation;
};

var setTranslation = function setTranslation(motionAsset, positionDelta) {
   if (Math.abs(positionDelta.x) < motionAsset.unitsPerFrame && Math.abs(positionDelta.y) < motionAsset.unitsPerFrame) {
      if (motionAsset.status === _statusConstants2['default'].DYING) {
         motionAsset.status = _statusConstants2['default'].DEAD;
      }
      motionAsset.x = motionAsset.destinationX;
      motionAsset.y = motionAsset.destinationY;
   } else {
      var currentAngleRadians = _mathy2['default'].radians(_mathy2['default'].convertRotationToAngle(motionAsset.rotation, positionDelta.x, positionDelta.y));
      if (positionDelta.y < 0) {
         motionAsset.x -= Math.cos(currentAngleRadians) * motionAsset.unitsPerFrame;
         motionAsset.y -= Math.sin(currentAngleRadians) * motionAsset.unitsPerFrame;
      } else {
         motionAsset.x += Math.cos(currentAngleRadians) * motionAsset.unitsPerFrame;
         motionAsset.y += Math.sin(currentAngleRadians) * motionAsset.unitsPerFrame;
      }
   }
};

var doesAssetNeedNewDestinationPoint = function doesAssetNeedNewDestinationPoint(motionAsset) {
   return motionAsset.x === motionAsset.destinationX && motionAsset.y === motionAsset.destinationY;
};

var RandomMotionAdapter = (function () {
   function RandomMotionAdapter(boundingRectangle) {
      _classCallCheck(this, RandomMotionAdapter);

      this._boundingRectangle = boundingRectangle;
      this._motionAssets = {};
   }

   _createClass(RandomMotionAdapter, [{
      key: 'addAsset',
      value: function addAsset(motionAsset) {
         var initPoint = undefined;
         if (motionAsset.spawnLocation === 'inside') {
            initPoint = _mathy2['default'].getRandomPointInsideRect(motionAsset, this._boundingRectangle, false);
         } else {
            initPoint = _mathy2['default'].getRandomPointOutsideRect(motionAsset, this._boundingRectangle);
         }
         motionAsset.x = initPoint.x;
         motionAsset.y = initPoint.y;

         setNewDestinationPoint(motionAsset, this._boundingRectangle, 'inside');
         resetRotationDirection(motionAsset);
         setScale(motionAsset, this._boundingRectangle);

         motionAsset.status = _statusConstants2['default'].ALIVE;

         this._motionAssets[motionAsset.id] = motionAsset;
      }
   }, {
      key: 'update',
      value: function update(timeInMilliseconds) {
         var _this = this;

         var motionAsset = undefined;
         var positionDelta = undefined;

         Object.keys(this._motionAssets).forEach(function (key) {
            motionAsset = _this._motionAssets[key];

            setAssetStateBasedOnTime(motionAsset, timeInMilliseconds, _this._boundingRectangle);

            positionDelta = getPositionDelta(motionAsset);
            setScale(motionAsset, _this._boundingRectangle);
            setRotation(motionAsset, positionDelta);
            setTranslation(motionAsset, positionDelta);

            if (doesAssetNeedNewDestinationPoint(motionAsset)) {
               setNewDestinationPoint(motionAsset, _this._boundingRectangle, 'inside');
               resetRotationDirection(motionAsset);
            }

            if (motionAsset.status === _statusConstants2['default'].DEAD) {
               delete _this._motionAssets[key];
            }
         });
      }
   }]);

   return RandomMotionAdapter;
})();

exports['default'] = RandomMotionAdapter;
;
module.exports = exports['default'];

},{"../mathy":3,"../status-constants":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _motionDirection = require('./motion-direction');

var _motionDirection2 = _interopRequireDefault(_motionDirection);

var _idGenerator = require('./id-generator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _statusConstants = require('./status-constants');

var _statusConstants2 = _interopRequireDefault(_statusConstants);

var TARGET_FRAME_RATE = 60;
var MIN_ROTATION_PER_FRAME = 1;

var MotionAsset = (function () {
   function MotionAsset(target, initTime, duration, unitsPerSecond, rotationPerSecond, motionDirection, rotateToDirection, simulateDepth, spawnLocation) {
      _classCallCheck(this, MotionAsset);

      this._id = _idGenerator2['default'].getId();
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
      this._status = _statusConstants2['default'].BORN;
      this._rotationAmount = 0;
      this._rotationDirection = 1;
      this._rotationProxy = 0;

      // check rotation per frame value to avoid pathing issues
      if (this._rotationPerFrame < MIN_ROTATION_PER_FRAME) {
         this._rotationPerFrame = MIN_ROTATION_PER_FRAME;
      }
   }

   _createClass(MotionAsset, [{
      key: 'id',
      get: function get() {
         return this._id;
      }
   }, {
      key: 'target',
      get: function get() {
         return this._target;
      }
   }, {
      key: 'duration',
      get: function get() {
         return this._duration;
      }
   }, {
      key: 'unitsPerSecond',
      get: function get() {
         return this._unitsPerSecond;
      }
   }, {
      key: 'unitsPerFrame',
      get: function get() {
         return this._unitsPerFrame;
      }
   }, {
      key: 'status',
      set: function set(status) {
         this._status = status;
      },
      get: function get() {
         return this._status;
      }
   }, {
      key: 'initTime',
      set: function set(timeInMilliseconds) {
         this._initTimeInMilliseconds = timeInMilliseconds;
      },
      get: function get() {
         return this._initTimeInMilliseconds;
      }
   }, {
      key: 'x',
      set: function set(x) {
         this._target.x = x;
      },
      get: function get() {
         return this._target.x;
      }
   }, {
      key: 'y',
      set: function set(y) {
         this._target.y = y;
      },
      get: function get() {
         return this._target.y;
      }
   }, {
      key: 'width',
      get: function get() {
         return this._target.width || 0;
      }
   }, {
      key: 'height',
      get: function get() {
         return this._target.height || 0;
      }
   }, {
      key: 'rotation',
      set: function set(rotation) {
         if (this._rotateToDirection) {
            this._target.rotation = rotation;
         } else {
            this._rotationProxy = rotation;
         }
      },
      get: function get() {
         if (this._rotateToDirection) {
            return this._target.rotation;
         } else {
            return this._rotationProxy;
         }
      }
   }, {
      key: 'destinationX',
      set: function set(x) {
         this._destinationX = x;
      },
      get: function get() {
         return this._destinationX;
      }
   }, {
      key: 'destinationY',
      set: function set(y) {
         this._destinationY = y;
      },
      get: function get() {
         return this._destinationY;
      }
   }, {
      key: 'rotationPerSecond',
      get: function get() {
         return this._rotationPerSecond;
      }
   }, {
      key: 'rotationPerFrame',
      get: function get() {
         return this._rotationPerFrame;
      }
   }, {
      key: 'motionDirection',
      get: function get() {
         return this._motionDirection;
      }
   }, {
      key: 'rotateToDirection',
      set: function set(bool) {
         this._rotateToDirection = bool;
      },
      get: function get() {
         return this._rotateToDirection;
      }
   }, {
      key: 'acquireRotationDirection',
      set: function set(acquireRotationDirection) {
         this._acquireRotationDirection = acquireRotationDirection;
      },
      get: function get() {
         return this._acquireRotationDirection;
      }
   }, {
      key: 'rotationAmount',
      set: function set(rotationAmount) {
         this._rotationAmount = rotationAmount;
      },
      get: function get() {
         return this._rotationAmount;
      }
   }, {
      key: 'rotationDirection',
      set: function set(rotationDirection) {
         this._rotationDirection = rotationDirection;
      },
      get: function get() {
         return this._rotationDirection;
      }
   }, {
      key: 'simulateDepth',
      set: function set(simulateDepth) {
         this._simulateDepth = simulateDepth;
      },
      get: function get() {
         return this._simulateDepth;
      }
   }, {
      key: 'spawnLocation',
      set: function set(spawnLocation) {
         this._spawnLocation = spawnLocation;
      },
      get: function get() {
         return this._spawnLocation;
      }
   }]);

   return MotionAsset;
})();

exports['default'] = MotionAsset;
module.exports = exports['default'];

},{"./id-generator":2,"./motion-direction":6,"./status-constants":9}],6:[function(require,module,exports){
'use strict';

var MotionDirection = Object.defineProperties({}, {
   'CURVE_RANDOM': {
      enumerable: true,
      value: 'curveRandom'
   }
});

module.exports = MotionDirection;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _rectangle = require('./rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _motionDirection = require('./motion-direction');

var _motionDirection2 = _interopRequireDefault(_motionDirection);

var _motionAdaptersRandomMotionAdapter = require('./motion-adapters/random-motion-adapter');

var _motionAdaptersRandomMotionAdapter2 = _interopRequireDefault(_motionAdaptersRandomMotionAdapter);

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _motionAsset = require('./motion-asset');

var _motionAsset2 = _interopRequireDefault(_motionAsset);

var MIN_DURATION = 2000;
var MIN_UNITS_PER_SECOND = 30;
var MIN_ROTATION_SPEED_MODIFIER = 1;

var MotionEngine = (function () {
   function MotionEngine() {
      var rect = arguments.length <= 0 || arguments[0] === undefined ? new _rectangle2['default']() : arguments[0];

      _classCallCheck(this, MotionEngine);

      this._boundingRectangle = rect;
      this._timer = new _timer2['default']();
      this._adaptersMap = {};

      var randomMotionAdapter = new _motionAdaptersRandomMotionAdapter2['default'](this._boundingRectangle);
      this._timer.addTimeUpdateListener(randomMotionAdapter.update.bind(randomMotionAdapter));

      this._adaptersMap[_motionDirection2['default'].CURVE_RANDOM] = randomMotionAdapter;
   }

   _createClass(MotionEngine, [{
      key: 'start',
      value: function start() {
         this._timer.play();
      }
   }, {
      key: 'stop',
      value: function stop() {
         this._timer.pause();
      }
   }, {
      key: 'addAsset',
      value: function addAsset() {
         var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         var _ref$target = _ref.target;
         var target = _ref$target === undefined ? null : _ref$target;
         var _ref$motionDirection = _ref.motionDirection;
         var motionDirection = _ref$motionDirection === undefined ? _motionDirection2['default'].CURVE_RANDOM : _ref$motionDirection;
         var _ref$duration = _ref.duration;
         var duration = _ref$duration === undefined ? MIN_DURATION : _ref$duration;
         var _ref$unitsPerSecond = _ref.unitsPerSecond;
         var unitsPerSecond = _ref$unitsPerSecond === undefined ? MIN_UNITS_PER_SECOND : _ref$unitsPerSecond;
         var _ref$rotationSpeedModifier = _ref.rotationSpeedModifier;
         var rotationSpeedModifier = _ref$rotationSpeedModifier === undefined ? MIN_ROTATION_SPEED_MODIFIER : _ref$rotationSpeedModifier;
         var _ref$rotateToDirection = _ref.rotateToDirection;
         var rotateToDirection = _ref$rotateToDirection === undefined ? true : _ref$rotateToDirection;
         var _ref$simulateDepth = _ref.simulateDepth;
         var simulateDepth = _ref$simulateDepth === undefined ? false : _ref$simulateDepth;
         var _ref$spawnLocation = _ref.spawnLocation;
         var spawnLocation = _ref$spawnLocation === undefined ? 'outside' : _ref$spawnLocation;

         // TODO: provide way to map transform (x, y, rotation, scale...) properties to target passed
         var motionAdapter = this._adaptersMap[motionDirection];
         if (!motionAdapter) {
            throw new Error('MotionEngine - No motion adapter found with supplied motion direction of (' + motionDirection + ')');
         }

         var rotationSpeed = Math.round(unitsPerSecond * rotationSpeedModifier);
         var motionAsset = new _motionAsset2['default'](target, this._timer.time, duration, unitsPerSecond, rotationSpeed, motionDirection, rotateToDirection, simulateDepth, spawnLocation);

         motionAdapter.addAsset(motionAsset);

         return motionAsset;
      }
   }, {
      key: 'paused',
      get: function get() {
         return this._timer.paused;
      }
   }]);

   return MotionEngine;
})();

exports['default'] = MotionEngine;
module.exports = exports['default'];

},{"./motion-adapters/random-motion-adapter":4,"./motion-asset":5,"./motion-direction":6,"./rectangle":8,"./timer":10}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = (function () {
   function Rectangle() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$x = _ref.x;
      var x = _ref$x === undefined ? 0 : _ref$x;
      var _ref$y = _ref.y;
      var y = _ref$y === undefined ? -0 : _ref$y;
      var _ref$width = _ref.width;
      var width = _ref$width === undefined ? 0 : _ref$width;
      var _ref$height = _ref.height;
      var height = _ref$height === undefined ? 0 : _ref$height;

      _classCallCheck(this, Rectangle);

      this._x = x;
      this._y = y;
      this._width = width;
      this._height = height;
      this._halfWidth = width / 2;
      this._halfHeight = height / 2;
      this._eighthWidth = width / 8;
      this._eighthHeight = height / 8;
   }

   _createClass(Rectangle, [{
      key: "x",
      set: function set(value) {
         this._x = value;
      },
      get: function get() {
         return this._x;
      }
   }, {
      key: "y",
      set: function set(value) {
         this._y = value;
      },
      get: function get() {
         return this._y;
      }
   }, {
      key: "width",
      set: function set(value) {
         this._width = value;
         this._halfWidth = value / 2;
         this._eighthWidth = value / 8;
      },
      get: function get() {
         return this._width;
      }
   }, {
      key: "height",
      set: function set(value) {
         this._height = value;
         this._halfHeight = value / 2;
         this._eighthHeight = value / 8;
      },
      get: function get() {
         return this._height;
      }
   }, {
      key: "halfWidth",
      get: function get() {
         return this._halfWidth;
      }
   }, {
      key: "halfHeight",
      get: function get() {
         return this._halfHeight;
      }
   }, {
      key: "eighthWidth",
      get: function get() {
         return this._eighthWidth;
      }
   }, {
      key: "eighthHeight",
      get: function get() {
         return this._eighthHeight;
      }
   }]);

   return Rectangle;
})();

exports["default"] = Rectangle;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});
exports['default'] = Object.freeze({
   BORN: 'born',
   ALIVE: 'alive',
   DYING: 'dying',
   DEAD: 'dead'
});
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = (function () {
   function Timer() {
      _classCallCheck(this, Timer);

      this._requestAnimationId = null;
      this._paused = true;
      this._currentTime = 0;
      this._lastTime = 0;
      this._timeInMilliseconds = 0;
      this._timeUpdateHandlers = [];
   }

   _createClass(Timer, [{
      key: "_tick",
      value: function _tick() {
         var _this = this;

         this._requestAnimationId = null;
         this._currentTime = performance.now();
         this._timeInMilliseconds += this._currentTime - this._lastTime;
         this._lastTime = this._currentTime;
         this._timeUpdateHandlers.every(function (timeUpdateHandler) {
            timeUpdateHandler(_this._timeInMilliseconds);
         });
         if (!this._paused) {
            this._requestAnimationId = requestAnimationFrame(function () {
               return _this._tick();
            });
         }
      }
   }, {
      key: "addTimeUpdateListener",
      value: function addTimeUpdateListener(eventHandler) {
         this._timeUpdateHandlers.push(eventHandler);
      }
   }, {
      key: "play",
      value: function play() {
         var _this2 = this;

         this._paused = false;
         this._lastTime = performance.now();
         this._requestAnimationId = requestAnimationFrame(function () {
            return _this2._tick();
         });
      }
   }, {
      key: "pause",
      value: function pause() {
         if (this._requestAnimationId) {
            cancelAnimationFrame(this._requestAnimationId);
            this._requestAnimationId = null;
         }
         this._paused = true;
      }
   }, {
      key: "paused",
      get: function get() {
         return this._paused;
      }
   }, {
      key: "time",
      get: function get() {
         return this._timeInMilliseconds;
      }
   }]);

   return Timer;
})();

exports["default"] = Timer;
module.exports = exports["default"];

},{}]},{},[1])


//# sourceMappingURL=move-here.js.map
