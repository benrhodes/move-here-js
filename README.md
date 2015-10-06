Move ➤ Here
============
JavaScript that moves 'things'.

## Demo
http://benrhodes.github.io/move-here-js/

## Install
### Bower
`bower install move-here --save`


## Setup
`<script src="dist/move-here.min.js"></script>`

## Usage

This example shows how to create and add an object to the MoveHere motion engine.  Note that MoveHere does not handle rendering, you can use any method or library to render what is being moved to the screen.

```javascript
// create a rectangle to move objects within
var rect = new MoveHere.Rectangle({width: 300, height: 200});

var motionEngine = new MoveHere.MotionEngine(rect);

// MoveHere is setup to manipulate an object with these display properties 
var targetInst = {x: 0, y:0, width: 5, height: 5, rotation:0, scaleX: 1, scaleY: 1};

// returns a new asset that will be updated by the lib while running
var asset = motionEngine.addAsset({target:targetInst, duration: -1, unitsPerSecond: 80});

// start the motion
motionEngine.start();

// basic code to render changes
var renderLoop = function() {
  // do something with the asset object

  if(!motionEngine.paused) {
    requestAnimationFrame(renderLoop);
  }
};

requestAnimationFrame(renderLoop);
```



