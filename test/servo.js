var torque = require('../lib/torque');
var serialport = require('./serialport/serialport');


exports["instance"] = {
    setUp: function (callback) {
        this.board = new torque.Board({
           serialport: new serialport.SerialPort()     
        });
        this.servo = new torque.Servo({
            range: [0, 180],
            startAngle: 90,
            pin: 10
        });

        this.board.attach(servo);

        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    "instance": function (test) {
        var servo = this.servo;

        test.expect(1);
        test.ok( servo, 'Servo instance' );
        test.done();
    },
    "initialisation": function (test) {
        var servo = this.servo;

        //test.expect(1);
        //test.equals(90, servo.angle());

        //board.serialport.emit('open');
        test.done();
    }
};
