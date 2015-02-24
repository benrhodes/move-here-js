'use strict';

var MotionDirection = require('./motion-direction');
var RandomMotionAdapter = require('./motion-adapters/random-motion-adapter');

module.exports = function() {

   /**
    * @class MotionEngine
    * @param options
    * @param {MoveHere.Rectangle} [options.boundingRectangle] - Rectangle to calculate motion of assets in.
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
         paused: {
            get: function() {
               return _paused;
            }
         }
      });

      _public.play = function() {
         _paused = false;
      };

      _public.pause = function() {
         _paused = true;
      };

      return _public;
   };

   return {
      /**
       * Factory method that returns a new MotionEngine object.
       * @function create
       * @param options
       * @param {MoveHere.Rectangle} [options.boundingRectangle] - Rectangle to calculate motion of assets in.
       * @param {MoveHere.MotionDirection} [options.motionDirection] - String enum for a type of direction to calculate.
       * @returns {MotionEngine}
       */
      create: function(options) {
         return new MotionEngine(options);
      }
   }
};