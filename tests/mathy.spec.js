/* global beforeEach, describe, expect, it */
'use strict';

import Mathy from '../src/mathy';
import Rectangle from '../src/rectangle';

describe('Mathy', () => {
   describe('getMinAngleDiff', () => {
      it('should return minimum angle difference for supplied angles', function() {
         expect(Mathy.getMinAngleDiff(-30, 90)).toBe(120);
         expect(Mathy.getMinAngleDiff(-260, 90)).toBe(10);
         expect(Mathy.getMinAngleDiff(30, -90)).toBe(120);
         expect(Mathy.getMinAngleDiff(30, -90)).toBe(120);
         expect(Mathy.getMinAngleDiff(10, 90)).toBe(80);
         expect(Mathy.getMinAngleDiff(90, 10)).toBe(80);
      });
   });

   describe('normalizeAngle', () => {
      it('should normalize angel to be between -360 and 360', function() {
         expect(Mathy.normalizeAngle(400)).toBe(40);
         expect(Mathy.normalizeAngle(800)).toBe(80);
         expect(Mathy.normalizeAngle(-400)).toBe(-40);
         expect(Mathy.normalizeAngle(-800)).toBe(-80);
      });
   });

   describe('convertRotationToAngle', () => {
      it('should return correct angle when diff is in quad 1', function() {
         expect(Mathy.convertRotationToAngle(30, 0, -1)).toBe(120);
         expect(Mathy.convertRotationToAngle(30, 1, -1)).toBe(120);
      });
      it('should return correct angle when diff is in quad 2', function() {
         expect(Mathy.convertRotationToAngle(30, 0, 0)).toBe(-60);
         expect(Mathy.convertRotationToAngle(30, 1, 0)).toBe(-60);
         expect(Mathy.convertRotationToAngle(30, 0, 1)).toBe(-60);
         expect(Mathy.convertRotationToAngle(30, 1, 1)).toBe(-60);
      });
      it('should return correct angle when diff is in quad 3', function() {
         expect(Mathy.convertRotationToAngle(30, -1, 0)).toBe(300);
         expect(Mathy.convertRotationToAngle(30, -1, 1)).toBe(300);
      });
      it('should return correct angle when diff is in quad 4', function() {
         expect(Mathy.convertRotationToAngle(30, -1, -1)).toBe(120);
      });
      it('should call Mathy.normalizeAngle', function() {
         spyOn(Mathy, 'normalizeAngle');

         Mathy.convertRotationToAngle(300, 0, -1);

         expect(Mathy.normalizeAngle).toHaveBeenCalledWith(390);
      });
   });

   describe('convertAngleToRotation', () => {
      it('should return correct rotation when diff is in quad 1', function() {
         expect(Mathy.convertAngleToRotation(30, 0, -1)).toBe(60);
         expect(Mathy.convertAngleToRotation(30, 1, -1)).toBe(60);
      });
      it('should return correct rotation when diff is in quad 2', function() {
         expect(Mathy.convertAngleToRotation(30, 0, 0)).toBe(120);
         expect(Mathy.convertAngleToRotation(30, 1, 0)).toBe(120);
         expect(Mathy.convertAngleToRotation(30, 0, 1)).toBe(120);
         expect(Mathy.convertAngleToRotation(30, 1, 1)).toBe(120);
      });
      it('should return correct rotation when diff is in quad 3', function() {
         expect(Mathy.convertAngleToRotation(30, -1, 0)).toBe(-240);
         expect(Mathy.convertAngleToRotation(30, -1, 1)).toBe(-240);
      });
      it('should return correct rotation when diff is in quad 4', function() {
         expect(Mathy.convertAngleToRotation(30, -1, -1)).toBe(60);
      });
   });

   describe('getRandomPointInsideRect', () => {
      let rectangle;
      let motionAsset;

      beforeEach(function() {
         rectangle = new Rectangle({x:0, y:0, width:200, height:100});

         motionAsset = {
            x: 0,
            y: 0
         };
      });

      describe('uniqueQuad is false', () => {
         it('should return random point inside rectangle', function() {
            spyOn(Math, 'random').and.returnValue(0.5);

            var pt = Mathy.getRandomPointInsideRect(motionAsset, rectangle, false);

            expect(pt).toEqual({x:100, y:50});
         });

         it('should limit the point to be inside of rectangle passed.', function() {
            spyOn(Math, 'random').and.returnValue(0.5);
            motionAsset.x = 120;
            motionAsset.y = 60;

            var pt = Mathy.getRandomPointInsideRect(motionAsset, rectangle, false);

            expect(pt).toEqual({x:200, y:100});
         });
      });

      describe('uniqueQuad is true', () => {
         it('should return random point that is to the right and bottom of the current position.', function() {
            motionAsset.x = 20;
            motionAsset.y = 20;

            var pt = Mathy.getRandomPointInsideRect(motionAsset, rectangle, true);

            expect(pt.x > motionAsset.x).toBe(true);
            expect(pt.y > motionAsset.y).toBe(true);
         });

         it('should return random point that is to the left and bottom of the current position.', function() {
            motionAsset.x = 120;
            motionAsset.y = 20;

            var pt = Mathy.getRandomPointInsideRect(motionAsset, rectangle, true);

            expect(pt.x < motionAsset.x).toBe(true);
            expect(pt.y > motionAsset.y).toBe(true);
         });

         it('should return random point that is to the right and top of the current position.', function() {
            motionAsset.x = 20;
            motionAsset.y = 60;

            var pt = Mathy.getRandomPointInsideRect(motionAsset, rectangle, true);

            expect(pt.x > motionAsset.x).toBe(true);
            expect(pt.y < motionAsset.y).toBe(true);
         });

         it('should return random point that is to the left and top of the current position.', function() {
            motionAsset.x = 120;
            motionAsset.y = 60;

            var pt = Mathy.getRandomPointInsideRect(motionAsset, rectangle, true);

            expect(pt.x < motionAsset.x).toBe(true);
            expect(pt.y < motionAsset.y).toBe(true);
         });
      });
   });

   describe('getRandomPointOutsideRect', () => {
      let rectangle;
      let motionAsset;

      beforeEach(function() {
         rectangle = new Rectangle({x:0, y:0, width:200, height:100});

         motionAsset = {
            x: 0,
            y: 0,
            width: 10,
            height: 10
         };
      });

      it('should generate point outside the left of the rectangle', function() {
         let randomCalls = 0;
         spyOn(Math, 'random').and.callFake(function() {
            if(randomCalls === 0) {
               randomCalls++;
               return .1;
            } else {
               return .5;
            }
         });

         var pt = Mathy.getRandomPointOutsideRect(motionAsset, rectangle);

         expect(pt).toEqual({x: -10, y:50});
      });

      it('should generate point outside the top of the rectangle', function() {
         let randomCalls = 0;
         spyOn(Math, 'random').and.callFake(function() {
            if(randomCalls === 0) {
               randomCalls++;
               return .3;
            } else {
               return .5;
            }
         });

         var pt = Mathy.getRandomPointOutsideRect(motionAsset, rectangle);

         expect(pt).toEqual({x: 100, y:-10});
      });

      it('should generate point outside the right of the rectangle', function() {
         let randomCalls = 0;
         spyOn(Math, 'random').and.callFake(function() {
            if(randomCalls === 0) {
               randomCalls++;
               return .6;
            } else {
               return .5;
            }
         });

         var pt = Mathy.getRandomPointOutsideRect(motionAsset, rectangle);

         expect(pt).toEqual({x: 210, y:50});
      });

      it('should generate point outside the bottom of the rectangle', function() {
         let randomCalls = 0;
         spyOn(Math, 'random').and.callFake(function() {
            if(randomCalls === 0) {
               randomCalls++;
               return .8;
            } else {
               return .5;
            }
         });

         var pt = Mathy.getRandomPointOutsideRect(motionAsset, rectangle);

         expect(pt).toEqual({x: 100, y:110});
      });
   });
});