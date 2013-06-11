var torque = require('./lib/torque');

var board = new torque.Board({port: '/dev/tty.usbmodemfd121'});
board.on('ready', function () {
    var servo = new torque.Servo({
        range: [ 0, 180 ],
        pwmRange: [ 700, 2400 ], // configures the servo's internal pulse duration calculation
        startAngle: 90,
        pin: 1 // attach servo to pin 1
    });

    this.wait(1000, function () {
        servo.move(180, 500); // move servo to angle, and take 1000ms to do so

        this.wait(1000, function () {
            servo.min(); // moves the servo to minimum angle
            this.wait(1000, function () {
                servo.max(); // moves the servo to maximum angle

                this.wait(1000, function () {
                    servo.center(); // center the servo to center of range
                });
            });
        });

        this.wait(5000, function () {
            var degrees = 0;
            var amount = 2;
            this.loop(33, function () {
                if (degrees > 180 || degrees < 0) {
                    amount *= -1;
                }

                degrees += amount;
                servo.move(degrees);
            });
        });
    });
});

board.on('error', function (error) {
    console.error(error);
});
