/* global beforeEach, describe, expect, it */
'use strict';

import RandomMotionAdapter from '../../src/motion-adapters/random-motion-adapter';
import Rectangle from '../../src/rectangle';
import Mathy from '../../src/mathy';
import Status from '../../src/status-constants';

describe('Random Motion Adapter', () => {
   let randomMotionAdapter = null;
   let boundingRectangle = new Rectangle({x:0, y:0, width: 200, height:100});
   let motionAssetMock;
   let initPoint;
   let destinationPoint;

   beforeEach(function() {
      initPoint = {x:10, y:10};
      destinationPoint = {x:100, y:50};
      motionAssetMock = {
         id: 'testId',
         initTime: 0,
         x: 0,
         y:0,
         width: 10,
         height: 10,
         destinationX: 100,
         destinationY: 50,
         rotation: 0,
         rotationAmount: 0,
         rotationPerFrame: 1,
         status: 'born',
         acquireRotationDirection: true,
         unitsPerFrame: 5,
         boundingRectangle: null
      };
      spyOn(Mathy, 'getRandomPointInsideRect').and.returnValue(initPoint);
      spyOn(Mathy, 'getRandomPointOutsideRect').and.returnValue(initPoint);
      randomMotionAdapter = new RandomMotionAdapter(boundingRectangle);
   });
   describe('addAsset', () => {
      it('should call getRandomPointInsideRect when spawnLocation param is set to inside and set initial point.', function() {
         motionAssetMock.spawnLocation = 'inside';

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(Mathy.getRandomPointInsideRect).toHaveBeenCalledWith(motionAssetMock, boundingRectangle, false);
         expect(motionAssetMock.x).toBe(initPoint.x);
         expect(motionAssetMock.y).toBe(initPoint.y);
      });

      it('should call getRandomPointInsideRect with Motion Asset bounding rectangle if supplied', function() {
         const motionAssetBoundingRectangle = new Rectangle();
         motionAssetMock.spawnLocation = 'inside';
         motionAssetMock.boundingRectangle = motionAssetBoundingRectangle;

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(Mathy.getRandomPointInsideRect).toHaveBeenCalledWith(motionAssetMock, motionAssetBoundingRectangle, false);
         expect(motionAssetMock.x).toBe(initPoint.x);
         expect(motionAssetMock.y).toBe(initPoint.y);
      });

      it('should call getRandomPointOutsideRect when spawnLocation param is set to outside and set initial point.', function() {
         motionAssetMock.spawnLocation = 'outside';

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(Mathy.getRandomPointOutsideRect).toHaveBeenCalledWith(motionAssetMock, boundingRectangle);
         expect(motionAssetMock.x).toBe(initPoint.x);
         expect(motionAssetMock.y).toBe(initPoint.y);
      });

      it('should call getRandomPointOutsideRect with motion asset bounding rectangle if supplied', function() {
         const motionAssetBoundingRectangle = new Rectangle();
         motionAssetMock.spawnLocation = 'outside';
         motionAssetMock.boundingRectangle = motionAssetBoundingRectangle;

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(Mathy.getRandomPointOutsideRect).toHaveBeenCalledWith(motionAssetMock, motionAssetBoundingRectangle);
         expect(motionAssetMock.x).toBe(initPoint.x);
         expect(motionAssetMock.y).toBe(initPoint.y);
      });

      it('should generate a destination point for the motion asset', function() {
         Mathy.getRandomPointInsideRect.and.returnValue(destinationPoint);

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(motionAssetMock.destinationX).toBe(destinationPoint.x);
         expect(motionAssetMock.destinationY).toBe(destinationPoint.y);
      });

      it('should set MotionAsset status to Status.Alive', function() {
         randomMotionAdapter.addAsset(motionAssetMock);

         expect(motionAssetMock.status).toBe(Status.ALIVE);
      });

      it('should set MotionAsset acquireRotationDirection to true', function() {
         motionAssetMock.acquireRotationDirection = false;

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(motionAssetMock.acquireRotationDirection).toBe(true);
      });

      it('should set scaleX and scaleY for MotionAsset when simulateDepth prop is true', function() {
         motionAssetMock.simulateDepth = true;

         randomMotionAdapter.addAsset(motionAssetMock);

         expect(motionAssetMock.scaleX).toBe(.6);
         expect(motionAssetMock.scaleY).toBe(.6);
      });
   });

   describe('update', () => {
      beforeEach(function() {
         motionAssetMock.duration = 5000;
         randomMotionAdapter.addAsset(motionAssetMock);
      });

      describe('when motion asset stage time exceeds motion asset duration', () => {
         it('updates status to Status.DYING', function() {
            motionAssetMock.x = 55;
            motionAssetMock.y = 66;

            randomMotionAdapter.update(5001);

            expect(motionAssetMock.status).toBe(Status.DYING);
         });

         it('generates new point outside rectangle', function() {
            Mathy.getRandomPointOutsideRect.calls.reset();
            Mathy.getRandomPointOutsideRect.and.returnValue(destinationPoint);

            randomMotionAdapter.update(5001);

            expect(Mathy.getRandomPointOutsideRect).toHaveBeenCalledWith(motionAssetMock, boundingRectangle);
            expect(motionAssetMock.destinationX).toBe(destinationPoint.x);
            expect(motionAssetMock.destinationY).toBe(destinationPoint.y);
         });

         it('generates new point outside of motion asset rectangle', function() {
            Mathy.getRandomPointOutsideRect.calls.reset();
            Mathy.getRandomPointOutsideRect.and.returnValue(destinationPoint);

            const motionAssetBoundingRectangle = new Rectangle();
            motionAssetMock.boundingRectangle = motionAssetBoundingRectangle;

            randomMotionAdapter.update(5001);

            expect(Mathy.getRandomPointOutsideRect).toHaveBeenCalledWith(motionAssetMock, motionAssetBoundingRectangle);
            expect(motionAssetMock.destinationX).toBe(destinationPoint.x);
            expect(motionAssetMock.destinationY).toBe(destinationPoint.y);
         });

         it('does not change status when MotionAsset duration is -1', function() {
            motionAssetMock.duration = -1;

            randomMotionAdapter.update(5001);

            expect(motionAssetMock.status).toBe(Status.ALIVE);
         });
      });

      describe('scale', () => {
         beforeEach(function() {
            motionAssetMock.simulateDepth = true;
         });
         it('is modified based on y position when MotionAsset.simulateDepth is true', function() {
            motionAssetMock.y = 50;

            randomMotionAdapter.update(4000);

            // min scale is .5 and max is 1.5
            expect(motionAssetMock.scaleX).toBe(1);
            expect(motionAssetMock.scaleY).toBe(1);
         });

         it('is clamped at a min value when y is below bounding rect y position', function() {
            motionAssetMock.y = -50;

            randomMotionAdapter.update(4000);

            // min scale is .5 and max is 1.5
            expect(motionAssetMock.scaleX).toBe(0.5);
            expect(motionAssetMock.scaleY).toBe(0.5);
         });

         it('is clamped at a max value when y is below bounding rect y position', function() {
            motionAssetMock.y = 300;

            randomMotionAdapter.update(4000);

            // min scale is .5 and max is 1.5
            expect(motionAssetMock.scaleX).toBe(1.5);
            expect(motionAssetMock.scaleY).toBe(1.5);
         });

         it('is not modified when MotionAsset.simulateDepth is false', function() {
            motionAssetMock.y = 50;
            motionAssetMock.scaleX = .6;
            motionAssetMock.scaleY = .6;
            motionAssetMock.simulateDepth = false;

            randomMotionAdapter.update(4000);

            expect(motionAssetMock.scaleX).toBe(.6);
            expect(motionAssetMock.scaleY).toBe(.6);
         });
      });

      describe('rotation', () => {
         it('is not modified when position and destination are the same', function() {
            motionAssetMock.x = 50;
            motionAssetMock.y = 50;
            motionAssetMock.destinationX = 50;
            motionAssetMock.destinationY = 50;
            motionAssetMock.rotation = 30;

            randomMotionAdapter.update(4000);

            expect(motionAssetMock.rotation).toBe(30);
         });

         it('is set to the final angle when asset is almost to destination', function() {
            motionAssetMock.x = 72;
            motionAssetMock.y = 72;
            motionAssetMock.destinationX = 75;
            motionAssetMock.destinationY = 75;
            motionAssetMock.rotation = 134;

            randomMotionAdapter.update(4000);

            expect(motionAssetMock.rotation).toBe(135);
         });

         it('is adjusted by the rotationPerFrame value.', function() {
            motionAssetMock.x = 30;
            motionAssetMock.y = 20;
            motionAssetMock.rotationPerFrame = 2;
            motionAssetMock.destinationX = 75;
            motionAssetMock.destinationY = 75;
            motionAssetMock.rotation = 40;

            randomMotionAdapter.update(4000);

            expect(motionAssetMock.rotation).toBe(42);
         });
      });

      describe('position', () => {
         it('is set to based on the unitsPerFrame and current angle', function() {
            motionAssetMock.unitsPerFrame = 5;
            motionAssetMock.rotation = 135;
            motionAssetMock.x = 0;
            motionAssetMock.y = 0;
            motionAssetMock.destinationX = 25;
            motionAssetMock.destinationY = 25;

            randomMotionAdapter.update(4000);

            expect(Math.round(motionAssetMock.x)).toBe(4);
            expect(Math.round(motionAssetMock.y)).toBe(4);
         });

         it('reaches destination point, new destination point is created.', function() {
            motionAssetMock.x = 25;
            motionAssetMock.y = 25;
            motionAssetMock.destinationX = 25;
            motionAssetMock.destinationY = 25;

            Mathy.getRandomPointInsideRect.and.returnValue({x: 99, y:3});

            randomMotionAdapter.update(4000);

            expect(motionAssetMock.destinationX).toBe(99);
            expect(motionAssetMock.destinationY).toBe(3);
         });
      });
   });
});