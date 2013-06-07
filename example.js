var torque = require('torque');

var board = new torque.Board({port: '/dev/cu.usbmodem411'});
board.on('ready', function () {
    var servo = new torque.servo({
        range: [ 0, 180 ],
        startAngle: 90,
        channel: 10 // attach servo to channel 10
    });
    board.attach(servo);

    servo.center(); // center the servo to center of range
    servo.move(180, 1000); // move servo to angle, and take 1000ms to do so
    servo.min(); // moves the servo to minimum angle
    servo.max(); // moves the servo to maximum angle


    var degrees = 10;
    // "move" events fire after a successful move.
    servo.on('move', function (err, degrees) {
        console.log( 'move', degrees );
    });

    this.loop(25, function () {
        servo.move(degrees, 20);
        degrees += 10;
    });
});
