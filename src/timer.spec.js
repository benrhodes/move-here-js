/* global beforeEach, describe, expect, it */
'use strict';

import Timer from './timer';

describe('Timer', () => {
   let timer = null;
   beforeEach(function() {
      window.performance = {
         now: jasmine.createSpy('now').and.returnValue(100)
      };
      window.requestAnimationFrame = jasmine.createSpy('requestAnimationFrame');
      window.cancelAnimationFrame = jasmine.createSpy('cancelAnimationFrame');
      jasmine.createSpy(window, 'requestAnimationFrame');

      timer = new Timer();
   });

   describe('play', function() {
      beforeEach(function() {
         timer.play();
      });

      it('will call performance.now', function() {
         expect(window.performance.now).toHaveBeenCalled();
      });

      it('will set up request animation frame.', function() {
         expect(window.requestAnimationFrame).toHaveBeenCalled();
      });

      it('will set up request animation frame.', function() {
         expect(window.requestAnimationFrame).toHaveBeenCalled();
      });

      it('will set paused to false.', function() {
         expect(timer.paused).toBe(false);
      });
   });

   describe('pause', function() {
      it('will call set paused to true', function() {
         timer.play();
         timer.pause();

         expect(timer.paused).toBe(true);
      });

      it('will call cancelAnimationFrame if requestAnimationFrame is queued.', function() {
         window.requestAnimationFrame.and.returnValue(1);

         timer.play();

         timer.pause();

         expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
      });
   });

   it('timer will calculate correct time.', function() {
      var tick;
      window.requestAnimationFrame.and.callFake(function(tickCallback) {
         tick = tickCallback;
      });

      timer.play();

      window.performance.now.and.returnValue(2000);
      tick();

      expect(timer.time).toBe(1900);

      window.performance.now.and.returnValue(2500);
      tick();

      expect(timer.time).toBe(2400);
   });

   it('calls event listener when time is updated', function() {
      var tick;
      window.requestAnimationFrame.and.callFake(function(tickCallback) {
         tick = tickCallback;
      });
      var timeUpdateHandler = jasmine.createSpy('timeUpateHandler');
      timer.addTimeUpdateListener(timeUpdateHandler);

      timer.play();

      window.performance.now.and.returnValue(2000);
      tick();

      expect(timeUpdateHandler).toHaveBeenCalledWith(1900);
   });

   it('will not call requestAnimationFrame on animation tick when timer has been paused.', function() {
      var tick;
      window.requestAnimationFrame.and.callFake(function(tickCallback) {
         tick = tickCallback;
      });

      timer.play();
      timer.pause();
      window.requestAnimationFrame.calls.reset();
      tick();

      expect(window.requestAnimationFrame).not.toHaveBeenCalled();
   });
});