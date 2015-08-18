/* global beforeEach, describe, expect, it */
'use strict';

import Rectangle from './rectangle';

describe('Rectangle Spec', () => {
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
});