const RADIANS_CONVERSION = Math.PI/180;
const DEGREES_CONVERSION = 180/Math.PI;

export default class Mathy {
   static radians(degrees) {
      return RADIANS_CONVERSION * degrees;
   }
   static degrees(radians) {
      return DEGREES_CONVERSION * radians;
   }
   static getMinAngleDiff(angleInDegrees1, angleInDegrees2) {
      if((angleInDegrees1 <= 0 && angleInDegrees2 >= 0) || (angleInDegrees1 >= 0 && angleInDegrees2 <= 0)) {
         let angle1Abs = angleInDegrees1 > 0.0 ? angleInDegrees1 : -angleInDegrees1;
         let angle2Abs = angleInDegrees2 > 0.0 ? angleInDegrees2 : -angleInDegrees2;
         let angle1Remainder = 180 - angle1Abs;
         let angle2Remainder = 180 - angle2Abs;
         return Math.min(angle1Remainder + angle2Remainder, angle1Abs + angle2Abs);
      } else {
         let rotationDiff = angleInDegrees1 - angleInDegrees2;
         return rotationDiff > 0.0 ? rotationDiff : -rotationDiff;
      }
   }
   static convertRotationToAngle(rotation, xDiff, yDiff) {
      let currentAngle;

      // Quad 1
      if(xDiff >= 0 && yDiff < 0) {
         currentAngle = 90 + rotation;
         // Quad 2
      } else if(xDiff >= 0 && yDiff >= 0) {
         currentAngle = rotation - 90;
         // Quad 3
      } else if(xDiff < 0 && yDiff >= 0) {
         currentAngle = rotation + 270;
         // Quad 4
      } else {
         currentAngle = rotation + 90;
      }

      if(currentAngle > 360) {
         currentAngle = currentAngle - 360;
      }

      return currentAngle;
   }
   static convertAngleToRotation(angle, xDiff, yDiff) {
      let rotation;

      // Quad 1
      if(xDiff >= 0 && yDiff < 0) {
         rotation = 90 - angle;
         // Quad 2
      } else if(xDiff >= 0 && yDiff >= 0) {
         rotation = 90 + angle;
         // Quad 3
      } else if(xDiff < 0 && yDiff >= 0) {
         rotation = -270 + angle;
         // Quad 4
      } else {
         rotation = 90 - angle;
      }

      return rotation;

   }
   static distanceBetweenTwoPoints(x1, y1, x2, y2) {
      return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
   }
   static getRandomPointInsideRect(motionAsset, rect) {
      let randomXRange = {min:0, max:0};
      let randomYRange = {min:0, max:0};
      let point = {x: 0, y: 0};

      if(motionAsset.x < (rect.x + rect.halfWidth)) {
         randomXRange.min = rect.eighthWidth;
         randomXRange.max = rect.halfWidth - randomXRange.min;
      } else {
         randomXRange.min = - rect.eighthWidth;
         randomXRange.max = - rect.halfWidth - randomXRange.min;
      }

      if(motionAsset.y < (rect.y + rect.halfHeight)) {
         randomYRange.min = rect.eighthHeight;
         randomYRange.max = rect.halfHeight - randomYRange.min;
      } else {
         randomYRange.min = - rect.eighthHeight;
         randomYRange.max = - rect.halfHeight - randomYRange.min;
      }

      point.x = motionAsset.x + Math.round(randomXRange.min + Math.random() * randomXRange.max);
      point.y = motionAsset.y + Math.round(randomYRange.min + Math.random() * randomYRange.max);

      if(point.x > rect.x + rect.width) {
         point.x = rect.x + rect.width;
      } else if(point.x < rect.x) {
         point.x = rect.x;
      }

      if(point.y > rect.y + rect.height) {
         point.y = rect.y + rect.height;
      } else if(point.y < rect.y) {
         point.y = rect.y;
      }

      return point;
   }
   static getRandomPointOutsideRect(motionAsset, rect) {
      let point = {x: 0, y: 0};
      let region = Math.floor(Math.random() * 4);
      switch(region) {
         case 0:
            point.x = rect.x - motionAsset.width;
            point.y = rect.y + Math.round(Math.random() * rect.height);
            break;
         case 1:
            point.x = rect.x + Math.round(Math.random() * rect.width);
            point.y = rect.y - motionAsset.height;
            break;
         case 2:
            point.x = (rect.x + rect.width) + motionAsset.width;
            point.y = rect.y + Math.round(Math.random() * rect.height);
            break;
         case 3:
            point.x = rect.x + Math.round(Math.random() * rect.width);
            point.y = rect.y + rect.height + motionAsset.height;
            break;
         default:
            break;

      }

      return point;
   }
};