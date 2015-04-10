'use strict';

module.exports = function() {
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
         x: {
            get: function() {
               return _x;
            },
            set: function(value) {
               _x = value;
            }
         },
         y: {
            get: function() {
               return _y;
            },
            set: function(value) {
               _y = value;
            }
         },
         width: {
            get: function() {
               return _width;
            },
            set: function(value) {
               _width = value;
            }
         },
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