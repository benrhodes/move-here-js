var MoveHere = (function (exports) {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Rectangle =
  /*#__PURE__*/
  function () {
    function Rectangle(_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? -0 : _ref$y,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? 0 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 0 : _ref$height;

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
  }();

  var MotionDirection = Object.defineProperties({}, {
    CURVE_RANDOM: {
      enumerable: true,
      value: 'curveRandom'
    }
  });

  var RADIANS_CONVERSION = Math.PI / 180;
  var DEGREES_CONVERSION = 180 / Math.PI;

  var Mathy =
  /*#__PURE__*/
  function () {
    function Mathy() {}

    Mathy.radians = function radians(degrees) {
      return RADIANS_CONVERSION * degrees;
    };

    Mathy.degrees = function degrees(radians) {
      return DEGREES_CONVERSION * radians;
    };

    Mathy.normalizeAngle = function normalizeAngle(angleInDegrees) {
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
    };

    Mathy.getMinAngleDiff = function getMinAngleDiff(angleInDegrees1, angleInDegrees2) {
      if (angleInDegrees1 <= 0 && angleInDegrees2 >= 0 || angleInDegrees1 >= 0 && angleInDegrees2 <= 0) {
        var angle1Abs = angleInDegrees1 > 0.0 ? angleInDegrees1 : -angleInDegrees1;
        var angle2Abs = angleInDegrees2 > 0.0 ? angleInDegrees2 : -angleInDegrees2;
        var angle1Remainder = 180 - angle1Abs;
        var angle2Remainder = 180 - angle2Abs;
        return Math.min(angle1Remainder + angle2Remainder, angle1Abs + angle2Abs);
      }

      var rotationDiff = angleInDegrees1 - angleInDegrees2;
      return rotationDiff > 0.0 ? rotationDiff : -rotationDiff;
    };

    Mathy.convertRotationToAngle = function convertRotationToAngle(rotation, xDiff, yDiff) {
      var currentAngle; // Quad 1

      if (xDiff >= 0 && yDiff < 0) {
        currentAngle = 90 + rotation; // Quad 2
      } else if (xDiff >= 0 && yDiff >= 0) {
        currentAngle = rotation - 90; // Quad 3
      } else if (xDiff < 0 && yDiff >= 0) {
        currentAngle = rotation + 270; // Quad 4
      } else {
        currentAngle = rotation + 90;
      }

      return Mathy.normalizeAngle(currentAngle);
    };

    Mathy.convertAngleToRotation = function convertAngleToRotation(angle, xDiff, yDiff) {
      var rotation; // Quad 1

      if (xDiff >= 0 && yDiff < 0) {
        rotation = 90 - angle; // Quad 2
      } else if (xDiff >= 0 && yDiff >= 0) {
        rotation = 90 + angle; // Quad 3
      } else if (xDiff < 0 && yDiff >= 0) {
        rotation = -270 + angle; // Quad 4
      } else {
        rotation = 90 - angle;
      }

      return rotation;
    };

    Mathy.distanceBetweenTwoPoints = function distanceBetweenTwoPoints(x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    Mathy.getRandomPointInsideRect = function getRandomPointInsideRect(motionAsset, rect, uniqueQuad) {
      if (uniqueQuad === void 0) {
        uniqueQuad = true;
      }

      var randomXRange = {
        min: 0,
        max: 0
      };
      var randomYRange = {
        min: 0,
        max: 0
      };
      var point = {
        x: 0,
        y: 0
      };

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
    };

    Mathy.getRandomPointOutsideRect = function getRandomPointOutsideRect(motionAsset, rect) {
      var point = {
        x: 0,
        y: 0
      };
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
    };

    return Mathy;
  }();

  var Status = Object.freeze({
    BORN: 'born',
    ALIVE: 'alive',
    DYING: 'dying',
    DEAD: 'dead'
  });

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
    var destinationPoint;

    if (location === INSIDE_TARGET_AREA) {
      destinationPoint = Mathy.getRandomPointInsideRect(motionAsset, boundingRectangle);
    } else {
      destinationPoint = Mathy.getRandomPointOutsideRect(motionAsset, boundingRectangle);
    }

    motionAsset.destinationX = destinationPoint.x;
    motionAsset.destinationY = destinationPoint.y;
  };

  var resetRotationDirection = function resetRotationDirection(motionAsset) {
    motionAsset.acquireRotationDirection = true;
    motionAsset.rotationAmount = 0;
  };

  var setAssetStateBasedOnTime = function setAssetStateBasedOnTime(motionAsset, timeInMilliseconds, boundingRectangle) {
    if (motionAsset.status === Status.ALIVE && motionAsset.duration !== -1 && timeInMilliseconds - motionAsset.initTime >= motionAsset.duration) {
      setNewDestinationPoint(motionAsset, boundingRectangle, OUTSIDE_TARGET_AREA);
      resetRotationDirection(motionAsset);
      motionAsset.status = Status.DYING;
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

      motionAsset.scaleX = newScale;
      motionAsset.scaleY = newScale;
    }
  };

  var setRotation = function setRotation(motionAsset, positionDelta) {
    var distance = Mathy.distanceBetweenTwoPoints(motionAsset.x, motionAsset.y, motionAsset.destinationX, motionAsset.destinationY);

    if (distance === 0) {
      return;
    }

    var nextRotation = motionAsset.rotation;
    var calculatedAngle = Math.round(Mathy.degrees(Math.acos(positionDelta.x / distance)));
    var calculatedRotation = Mathy.convertAngleToRotation(calculatedAngle, positionDelta.x, positionDelta.y);
    var rotationDiff = Mathy.getMinAngleDiff(calculatedRotation, nextRotation);

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
      } // determine rotation modifier, this only comes into play when an object has rotated more than
      // 360 degrees around the destination point.  We need to increase the speed of rotation to it
      // so it can reach its destination eventually.


      var rotationModifier = motionAsset.rotationAmount / 360 <= 1 ? 1 : motionAsset.rotationAmount / 360;
      nextRotation += motionAsset.rotationDirection * motionAsset.rotationPerFrame * rotationModifier;
      nextRotation = Mathy.normalizeAngle(nextRotation);
    }

    motionAsset.rotationAmount += Mathy.getMinAngleDiff(motionAsset.rotation, nextRotation);
    motionAsset.rotation = nextRotation;
  };

  var setTranslation = function setTranslation(motionAsset, positionDelta) {
    if (Math.abs(positionDelta.x) < motionAsset.unitsPerFrame && Math.abs(positionDelta.y) < motionAsset.unitsPerFrame) {
      if (motionAsset.status === Status.DYING) {
        motionAsset.status = Status.DEAD;
      }

      motionAsset.x = motionAsset.destinationX;
      motionAsset.y = motionAsset.destinationY;
    } else {
      var currentAngleRadians = Mathy.radians(Mathy.convertRotationToAngle(motionAsset.rotation, positionDelta.x, positionDelta.y));

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

  var RandomMotionAdapter =
  /*#__PURE__*/
  function () {
    function RandomMotionAdapter(boundingRectangle) {
      this._boundingRectangle = boundingRectangle;
      this._motionAssets = {};
    }

    var _proto = RandomMotionAdapter.prototype;

    _proto.addAsset = function addAsset(motionAsset) {
      var initPoint;

      if (motionAsset.spawnLocation === 'inside') {
        initPoint = Mathy.getRandomPointInsideRect(motionAsset, this._boundingRectangle, false);
      } else {
        initPoint = Mathy.getRandomPointOutsideRect(motionAsset, this._boundingRectangle);
      }

      motionAsset.x = initPoint.x;
      motionAsset.y = initPoint.y;
      setNewDestinationPoint(motionAsset, this._boundingRectangle, INSIDE_TARGET_AREA);
      resetRotationDirection(motionAsset);
      setScale(motionAsset, this._boundingRectangle);
      motionAsset.status = Status.ALIVE;
      this._motionAssets[motionAsset.id] = motionAsset;
    };

    _proto.update = function update(timeInMilliseconds) {
      var _this = this;

      var motionAsset;
      var positionDelta;
      Object.keys(this._motionAssets).forEach(function (key) {
        motionAsset = _this._motionAssets[key];
        setAssetStateBasedOnTime(motionAsset, timeInMilliseconds, _this._boundingRectangle);
        positionDelta = getPositionDelta(motionAsset);
        setScale(motionAsset, _this._boundingRectangle);
        setRotation(motionAsset, positionDelta);
        setTranslation(motionAsset, positionDelta);

        if (doesAssetNeedNewDestinationPoint(motionAsset)) {
          setNewDestinationPoint(motionAsset, _this._boundingRectangle, INSIDE_TARGET_AREA);
          resetRotationDirection(motionAsset);
        }

        if (motionAsset.status === Status.DEAD) {
          delete _this._motionAssets[key];
        }
      });
    };

    return RandomMotionAdapter;
  }();

  var Timer =
  /*#__PURE__*/
  function () {
    function Timer() {
      this._requestAnimationId = null;
      this._paused = true;
      this._currentTime = 0;
      this._lastTime = 0;
      this._timeInMilliseconds = 0;
      this._timeUpdateHandlers = [];
    }

    var _proto = Timer.prototype;

    _proto._tick = function _tick() {
      var _this = this;

      this._requestAnimationId = null;
      this._currentTime = performance.now();
      this._timeInMilliseconds += this._currentTime - this._lastTime;
      this._lastTime = this._currentTime;

      this._timeUpdateHandlers.every(function (timeUpdateHandler) {
        return timeUpdateHandler(_this._timeInMilliseconds);
      });

      if (!this._paused) {
        this._requestAnimationId = requestAnimationFrame(function () {
          return _this._tick();
        });
      }
    };

    _proto.addTimeUpdateListener = function addTimeUpdateListener(eventHandler) {
      this._timeUpdateHandlers.push(eventHandler);
    };

    _proto.play = function play() {
      var _this2 = this;

      this._paused = false;
      this._lastTime = performance.now();
      this._requestAnimationId = requestAnimationFrame(function () {
        return _this2._tick();
      });
    };

    _proto.pause = function pause() {
      if (this._requestAnimationId) {
        cancelAnimationFrame(this._requestAnimationId);
        this._requestAnimationId = null;
      }

      this._paused = true;
    };

    _createClass(Timer, [{
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
  }();

  var id$1 = 0;

  var IdGenerator =
  /*#__PURE__*/
  function () {
    function IdGenerator() {}

    IdGenerator.getId = function getId() {
      return id$1++;
    };

    return IdGenerator;
  }();

  var TARGET_FRAME_RATE = 60;
  var MIN_ROTATION_PER_FRAME = 1;

  var MotionAsset =
  /*#__PURE__*/
  function () {
    function MotionAsset(target, initTime, duration, unitsPerSecond, rotationPerSecond, motionDirection, rotateToDirection, simulateDepth, spawnLocation) {
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
      this._rotationProxy = 0; // check rotation per frame value to avoid pathing issues

      if (this._rotationPerFrame < MIN_ROTATION_PER_FRAME) {
        this._rotationPerFrame = MIN_ROTATION_PER_FRAME;
      }
    }

    _createClass(MotionAsset, [{
      key: "id",
      get: function get() {
        return this._id;
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "duration",
      get: function get() {
        return this._duration;
      }
    }, {
      key: "unitsPerSecond",
      get: function get() {
        return this._unitsPerSecond;
      }
    }, {
      key: "unitsPerFrame",
      get: function get() {
        return this._unitsPerFrame;
      }
    }, {
      key: "status",
      set: function set(status) {
        this._status = status;
      },
      get: function get() {
        return this._status;
      }
    }, {
      key: "initTime",
      set: function set(timeInMilliseconds) {
        this._initTimeInMilliseconds = timeInMilliseconds;
      },
      get: function get() {
        return this._initTimeInMilliseconds;
      }
    }, {
      key: "x",
      set: function set(x) {
        this._target.x = x;
      },
      get: function get() {
        return this._target.x;
      }
    }, {
      key: "y",
      set: function set(y) {
        this._target.y = y;
      },
      get: function get() {
        return this._target.y;
      }
    }, {
      key: "width",
      get: function get() {
        return this._target.width || 0;
      }
    }, {
      key: "height",
      get: function get() {
        return this._target.height || 0;
      }
    }, {
      key: "rotation",
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
        }

        return this._rotationProxy;
      }
    }, {
      key: "destinationX",
      set: function set(x) {
        this._destinationX = x;
      },
      get: function get() {
        return this._destinationX;
      }
    }, {
      key: "destinationY",
      set: function set(y) {
        this._destinationY = y;
      },
      get: function get() {
        return this._destinationY;
      }
    }, {
      key: "rotationPerSecond",
      get: function get() {
        return this._rotationPerSecond;
      }
    }, {
      key: "rotationPerFrame",
      get: function get() {
        return this._rotationPerFrame;
      }
    }, {
      key: "motionDirection",
      get: function get() {
        return this._motionDirection;
      }
    }, {
      key: "rotateToDirection",
      set: function set(bool) {
        this._rotateToDirection = bool;
      },
      get: function get() {
        return this._rotateToDirection;
      }
    }, {
      key: "acquireRotationDirection",
      set: function set(acquireRotationDirection) {
        this._acquireRotationDirection = acquireRotationDirection;
      },
      get: function get() {
        return this._acquireRotationDirection;
      }
    }, {
      key: "rotationAmount",
      set: function set(rotationAmount) {
        this._rotationAmount = rotationAmount;
      },
      get: function get() {
        return this._rotationAmount;
      }
    }, {
      key: "rotationDirection",
      set: function set(rotationDirection) {
        this._rotationDirection = rotationDirection;
      },
      get: function get() {
        return this._rotationDirection;
      }
    }, {
      key: "simulateDepth",
      set: function set(simulateDepth) {
        this._simulateDepth = simulateDepth;
      },
      get: function get() {
        return this._simulateDepth;
      }
    }, {
      key: "spawnLocation",
      set: function set(spawnLocation) {
        this._spawnLocation = spawnLocation;
      },
      get: function get() {
        return this._spawnLocation;
      }
    }]);

    return MotionAsset;
  }();

  var MIN_DURATION = 2000;
  var MIN_UNITS_PER_SECOND = 30;
  var MIN_ROTATION_SPEED_MODIFIER = 1;

  var MotionEngine =
  /*#__PURE__*/
  function () {
    function MotionEngine(rect) {
      if (rect === void 0) {
        rect = new Rectangle();
      }

      this._boundingRectangle = rect;
      this._timer = new Timer();
      this._adaptersMap = {};
      var randomMotionAdapter = new RandomMotionAdapter(this._boundingRectangle);

      this._timer.addTimeUpdateListener(randomMotionAdapter.update.bind(randomMotionAdapter));

      this._adaptersMap[MotionDirection.CURVE_RANDOM] = randomMotionAdapter;
    }

    var _proto = MotionEngine.prototype;

    _proto.start = function start() {
      this._timer.play();
    };

    _proto.stop = function stop() {
      this._timer.pause();
    };

    _proto.addAsset = function addAsset(_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$target = _ref.target,
          target = _ref$target === void 0 ? null : _ref$target,
          _ref$motionDirection = _ref.motionDirection,
          motionDirection = _ref$motionDirection === void 0 ? MotionDirection.CURVE_RANDOM : _ref$motionDirection,
          _ref$duration = _ref.duration,
          duration = _ref$duration === void 0 ? MIN_DURATION : _ref$duration,
          _ref$unitsPerSecond = _ref.unitsPerSecond,
          unitsPerSecond = _ref$unitsPerSecond === void 0 ? MIN_UNITS_PER_SECOND : _ref$unitsPerSecond,
          _ref$rotationSpeedMod = _ref.rotationSpeedModifier,
          rotationSpeedModifier = _ref$rotationSpeedMod === void 0 ? MIN_ROTATION_SPEED_MODIFIER : _ref$rotationSpeedMod,
          _ref$rotateToDirectio = _ref.rotateToDirection,
          rotateToDirection = _ref$rotateToDirectio === void 0 ? true : _ref$rotateToDirectio,
          _ref$simulateDepth = _ref.simulateDepth,
          simulateDepth = _ref$simulateDepth === void 0 ? false : _ref$simulateDepth,
          _ref$spawnLocation = _ref.spawnLocation,
          spawnLocation = _ref$spawnLocation === void 0 ? 'outside' : _ref$spawnLocation;

      // TODO: provide way to map transform (x, y, rotation, scale...) properties to target passed
      var motionAdapter = this._adaptersMap[motionDirection];

      if (!motionAdapter) {
        throw new Error("MotionEngine - No motion adapter found with supplied motion direction of (" + motionDirection + ")");
      }

      var rotationSpeed = Math.round(unitsPerSecond * rotationSpeedModifier);
      var motionAsset = new MotionAsset(target, this._timer.time, duration, unitsPerSecond, rotationSpeed, motionDirection, rotateToDirection, simulateDepth, spawnLocation);
      motionAdapter.addAsset(motionAsset);
      return motionAsset;
    };

    _createClass(MotionEngine, [{
      key: "paused",
      get: function get() {
        return this._timer.paused;
      }
    }]);

    return MotionEngine;
  }();

  exports.MotionDirection = MotionDirection;
  exports.Rectangle = Rectangle;
  exports.MotionEngine = MotionEngine;

  return exports;

}({}));
