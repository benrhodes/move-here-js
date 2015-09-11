export default class Timer {
   constructor() {
      this._requestAnimationId = null;
      this._paused = true;
      this._currentTime = 0;
      this._lastTime = 0;
      this._timeInMilliseconds = 0;
      this._timeUpdateHandlers = [];
   }
   _tick() {
      this._requestAnimationId = null;
      this._currentTime = performance.now();
      this._timeInMilliseconds += (this._currentTime - this._lastTime);
      this._lastTime = this._currentTime;
      this._timeUpdateHandlers.every((timeUpdateHandler) => {
         timeUpdateHandler(this._timeInMilliseconds);
      });
      if(!this._paused) {
         this._requestAnimationId = requestAnimationFrame(() => this._tick());
      }
   }
   get paused() {
      return this._paused;
   }
   get time() {
      return this._timeInMilliseconds;
   }
   addTimeUpdateListener(eventHandler) {
      this._timeUpdateHandlers.push(eventHandler);
   }
   play() {
      this._paused = false;
      this._lastTime = performance.now();
      this._requestAnimationId = requestAnimationFrame(() => this._tick());
   }
   pause() {
      if(this._requestAnimationId) {
         cancelAnimationFrame(this._requestAnimationId);
         this._requestAnimationId = null;
      }
      this._paused = true;
   }
}