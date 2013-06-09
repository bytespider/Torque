Torque
======

A library for controlling servos connected to a SSC or Torobot servo controller board. API modelled after [Johnny-Five](https://github.com/rwldrn/johnny-five)

If you have one of these boards, please help out.

Install
-------
    npm install torque


Example
-------

```javascript
var torque = require('torque');
var board = new torque.Board({
    port: '/path/to/fd'
});

board.on('ready', function () {
    var servo = new torque.Servo({ pin: 0 });
    servo.move(45, 500); // rotate to 45 degrees, and take 500ms to do so
    
    // wait 2 seconds then...
    board.wait(2000, function () {
        servo.move(130); // rotate to 130 degrees, take the default time of 50ms to do so
    });
});
```
