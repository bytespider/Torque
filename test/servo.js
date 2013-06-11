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

        test.expect(1);
        test.equals("#10P1500T100\r\n", this.board.serialport.lastWrite);

        test.done();
    },
    "move": function (test) {
        var servo = this.servo;

        test.expect(1);

        servo.move(45, 1000); // move to 100 degrees over 1 second
        test.equals("#10P1250T1000\r\n", this.board.serialport.lastWrite);

        test.done();
    },
    "min": function (test) {
        var servo = this.servo;

        test.expect(1);

        servo.min();
        test.equals("#10P1000T100\r\n", this.board.serialport.lastWrite);

        test.done();
    },
    "max": function (test) {
        var servo = this.servo;

        test.expect(1);

        servo.max();
        test.equals("#10P2000T100\r\n", this.board.serialport.lastWrite);

        test.done();
    },
    "center": function (test) {
        var servo = this.servo;

        test.expect(1);

        servo.center();
        test.equals("#10P1500T100\r\n", this.board.serialport.lastWrite);

        test.done();
    },
    "calibrate": function (test) {
        var servo = this.servo;

        test.expect(2);

        servo.calibrate([700, 2400]);

        servo.min();
        test.equals("#10P700T100\r\n", this.board.serialport.lastWrite);

        servo.max();
        test.equals("#10P2400T100\r\n", this.board.serialport.lastWrite);

        test.done();
    }
};
