export default class Rectangle {
   constructor({x=0, y=-0, width=0, height=0} = {}) {
      this._x = x;
      this._y = y;
      this._width = width;
      this._height = height;
      this._halfWidth = width / 2;
      this._halfHeight = height / 2;
      this._eighthWidth = width / 8;
      this._eighthHeight = height / 8;
   }

   set x(value){
      this._x = value;
   }

   get x(){
      return this._x;
   }

   set y(value){
      this._y = value;
   }

   get y(){
      return this._y;
   }

   set width(value){
      this._width = value;
      this._halfWidth = value / 2;
      this._eighthWidth = value / 8;
   }

   get width(){
      return this._width;
   }

   set height(value){
      this._height = value;
      this._halfHeight = value / 2;
      this._eighthHeight = value / 8;
   }

   get height(){
      return this._height;
   }

   get halfWidth() {
      return this._halfWidth;
   }

   get halfHeight() {
      return this._halfHeight;
   }

   get eighthWidth() {
      return this._eighthWidth;
   }

   get eighthHeight() {
      return this._eighthHeight;
   }
}