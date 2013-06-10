Torque
======

[![Build Status](https://travis-ci.org/bytespider/Torque.png?branch=master)](https://travis-ci.org/bytespider/Torque)

A library for controlling servos connected to a SSC or Torobot servo controller board. API modelled after [Johnny-Five](https://github.com/rwldrn/johnny-five)


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

`Torque.Board` provides `loop(ms, callback)` and `wait(ms, callback)`, however if you need to use more complicated event loop
programming such as queues or repeat x times, please feel free to use [compulsive](https://npmjs.org/package/compulsive).


Contributing
------------

If you have one of these boards, please help out.

1. *Fork* the project, and run `npm install`
2. *Create a branch* off develop for a feature; `$ git checkout -b myfeature develop` or off master for a bug fix `$ git checkout -b hotfix-issue1 master`
3. *Add tests* where you can
4. *Implement* your feature or bug fix
5. *Run tests* by running `npm test` in the root folder
6. *Commit* and push your changes. You could use a [pre-commit hook](https://gist.github.com/bytespider/5748723) to make the combine the last 2 steps.
7. *Submit* your pull request

