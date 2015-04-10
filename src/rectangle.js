'use strict';

/**
 * @memberof MoveHere
 * @class Rectangle
 * @classdesc Rectangle object
 * @constructor
 */
var Rectangle = function() {
   var _x;
   var _y;
   var _width;
   var _height;

   _x = 0;
   _y = 0;
   _width = 0;
   _height = 0;

   return Object.defineProperties({},
      {
         /**
          *  @public
          *  @memberof MoveHere.Rectangle
          *  @property {Number} x - x position of the rectangle.
          */
         x: {
            get: function() {
               return _x;
            },
            set: function(value) {
               _x = value;
            }
         },
         /**
          *  @public
          *  @memberof MoveHere.Rectangle
          *  @property {Number} y - y position of the rectangle.
          */
         y: {
            get: function() {
               return _y;
            },
            set: function(value) {
               _y = value;
            }
         },
         /**
          *  @public
          *  @memberof MoveHere.Rectangle
          *  @property {Number} width - width of the rectangle.
          */
         width: {
            get: function() {
               return _width;
            },
            set: function(value) {
               _width = value;
            }
         },
         /**
          *  @public
          *  @memberof MoveHere.Rectangle
          *  @property {Number} height - height of the rectangle.
          */
         height: {
            get: function() {
               return _height;
            },
            set: function(value) {
               _height = value;
            }
         }
      }
   );
};

module.exports = Rectangle;