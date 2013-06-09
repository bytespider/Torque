var torque = require('torque');

var board = new torque.Board({port: '/dev/tty.usbmodem411'});
board.on('ready', function () {
    var servo = new torque.servo({
        range: [ 0, 180 ],
        startAngle: 90,
        pin: 10 // attach servo to pin 10
    });

    servo.center(); // center the servo to center of range
    servo.move(180, 1000); // move servo to angle, and take 1000ms to do so
    servo.min(); // moves the servo to minimum angle
    servo.max(); // moves the servo to maximum angle


    var degrees = 10;

    this.loop(25, function () {
        servo.move(degrees, 20);
        degrees += 10;
    });
});
