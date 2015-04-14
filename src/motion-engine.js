'use strict';

var MotionDirection = require('./motion-direction');
var RandomMotionAdapter = require('./motion-adapters/random-motion-adapter');

/**
 * @memberof MoveHere
 * @class MotionEngine
 * @classdesc Main engine for the motion to move stuff from there to here.
 * @param options
 * @param {MoveHere.Rectangle} options.boundingRectangle - Rectangle to calculate motion of assets in.
 * @param {MoveHere.MotionDirection} [options.motionDirection=MoveHere.MotionDirection.CURVE_RANDOM] - String enum for a type of direction to calculate.
 * @constructor
 */
var MotionEngine = function(options) {
   var _public,
      _paused,
      _boundingRectangle,
      _motionAdapter;

   _paused = false;
   _boundingRectangle = options.boundingRectangle;

   options.motionDirection = options.motionDirection || MotionDirection.CURVE_RANDOM;

   switch (options.motionDirection) {
      case MotionDirection.CURVE_RANDOM:
         _motionAdapter = RandomMotionAdapter();
         break;
      default:
         break;
   }

   _public = Object.defineProperties({}, {
      /**
       *  @public
       *  @readonly
       *  @memberof MoveHere.MotionEngine
       *  @property {Boolean} paused - Is engine paused.
       */
      paused: {
         get: function() {
            return _paused;
         }
      }
   });

   /**
    *  Start the motion engine.
    *  @memberof MoveHere.MotionEngine
    *  @function start
    */
   _public.start = function() {
      _paused = false;
   };

   /**
    *  Pause the motion engine.
    *  @memberof MoveHere.MotionEngine
    *  @function pause
    */
   _public.pause = function() {
      _paused = true;
   };

   return _public;
};

module.exports = MotionEngine;