/* global beforeEach, describe, expect, it */
'use strict';

import Rectangle from '../src/rectangle';

describe('Rectangle', () => {
   let rectangle;
   let rectangle2;

   beforeEach(function() {
      rectangle = new Rectangle();
      rectangle2 = new Rectangle();
   });

   it('setting property of one rectangle does not change the property of another rectangle instance', function() {
      rectangle.x = 30;
      rectangle2.x = 40;
      rectangle.y = 31;
      rectangle2.y = 41;
      rectangle.width = 32;
      rectangle2.width = 42;
      rectangle.height = 33;
      rectangle2.height = 43;

      expect(rectangle.x).toBe(30);
      expect(rectangle2.x).toBe(40);
      expect(rectangle.y).toBe(31);
      expect(rectangle2.y).toBe(41);
      expect(rectangle.width).toBe(32);
      expect(rectangle2.width).toBe(42);
      expect(rectangle.height).toBe(33);
      expect(rectangle2.height).toBe(43);
   });

   it('creating rect will calculate 1/2 and 1/8th values of width and height', function() {
      var rect = new Rectangle({x:0, y:0, width:160, height:160});

      expect(rect.halfWidth).toBe(80);
      expect(rect.eighthWidth).toBe(20);
      expect(rect.halfHeight).toBe(80);
      expect(rect.eighthHeight).toBe(20);
   });

   it('setting width will calculate 1/2 and 1/8th values of the width value', function() {
      rectangle.width = 100;

      expect(rectangle.halfWidth).toBe(50);
      expect(rectangle.eighthWidth).toBe(12.5);
   });

   it('setting height will calculate 1/2 and 1/8th values of the height value', function() {
      rectangle.height = 120;

      expect(rectangle.halfHeight).toBe(60);
      expect(rectangle.eighthHeight).toBe(15);
   });
});