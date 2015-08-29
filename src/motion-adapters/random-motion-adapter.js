const OUTSIDE_TARGET_AREA = 'outside';
const INSIDE_TARGET_AREA = 'inside';

export default class RandomMotionAdapter {
   constructor(boundingRectangle) {
      this._boundingRectangle = boundingRectangle;
      this._motionAssets = {};
   }
   generatePoint(motionAsset, targetArea) {
      let randomXRange = {min:0, max:0};
      let randomYRange = {min:0, max:0};
      let point = {x: 0, y: 0};

      switch(targetArea) {
         case INSIDE_TARGET_AREA:
            if(motionAsset.x < (this._boundingRectangle.x + this._boundingRectangle.halfWidth)) {
               randomXRange.min = this._boundingRectangle.eighthWidth;
               randomXRange.max = this._boundingRectangle.halfWidth - randomXRange.min;
            } else {
               randomXRange.min = - this._boundingRectangle.eighthWidth;
               randomXRange.max = - this._boundingRectangle.halfWidth - randomXRange.min;
            }

            if(motionAsset.y < (this._boundingRectangle.y + this._boundingRectangle.halfHeight)) {
               randomYRange.min = this._boundingRectangle.eighthHeight;
               randomYRange.max = this._boundingRectangle.halfHeight - randomYRange.min;
            } else {
               randomYRange.min = - this._boundingRectangle.eighthHeight;
               randomYRange.max = - this._boundingRectangle.halfHeight - randomYRange.min;
            }

            point.x = motionAsset.x + Math.round(randomXRange.min + Math.random() * randomXRange.max);
            point.y = motionAsset.y + Math.round(randomYRange.min + Math.random() * randomYRange.max);

            if(point.x > this._boundingRectangle.x + this._boundingRectangle.width) {
               point.x = this._boundingRectangle.x + this._boundingRectangle.width;
            } else if(point.x < this._boundingRectangle.x) {
               point.x = this._boundingRectangle.x;
            }

            if(point.y > this._boundingRectangle.y + this._boundingRectangle.height) {
               point.y = this._boundingRectangle.y + this._boundingRectangle.height;
            } else if(point.y < this._boundingRectangle.y) {
               point.y = this._boundingRectangle.y;
            }
            break;
         case OUTSIDE_TARGET_AREA:
            let region = Math.floor(Math.random() * 4);
            switch(region) {
               case 0:
                  point.x = this._boundingRectangle.x - motionAsset.width;
                  point.y = this._boundingRectangle.y + Math.round(Math.random() * this._boundingRectangle.height);
                  break;
               case 1:
                  point.x = this._boundingRectangle.x + Math.round(Math.random() * this._boundingRectangle.width);
                  point.y = this._boundingRectangle.y - motionAsset.height;
                  break;
               case 2:
                  point.x = (this._boundingRectangle.x + this._boundingRectangle.width) + motionAsset.width;
                  point.y = this._boundingRectangle.y + Math.round(Math.random() * this._boundingRectangle.height);
                  break;
               case 3:
                  point.x = this._boundingRectangle.x + Math.round(Math.random() * this._boundingRectangle.width);
                  point.y = this._boundingRectangle.y + this._boundingRectangle.height + motionAsset.height;
                  break;
               default:
                  break;

            }
            break;
      }

      return point;
   }
   addAsset(motionAsset) {
      let initPoint = this.generatePoint(motionAsset, OUTSIDE_TARGET_AREA);
      motionAsset.x = initPoint.x;
      motionAsset.y = initPoint.y;

      let destinationPoint = this.generatePoint(motionAsset, INSIDE_TARGET_AREA);
      motionAsset.destinationX = destinationPoint.x;
      motionAsset.destinationY = destinationPoint.y;

      motionAsset.acquireRotationDirection = true;

      this._motionAssets[motionAsset.id] = motionAsset;
   }
   update(timeInMilliseconds) {

   }
};