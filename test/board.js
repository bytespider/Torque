var torque = require('../lib/torque');
var serialport = require('./serialport/serialport');


exports["instance"] = {
    setUp: function (callback) {
        this.board = new torque.Board({
            serialport: new serialport.SerialPort()
        });
        this.board.on('error', function (error) {
            console.error(error);
        });

        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    "instance": function (test) {
        var board = this.board;

        test.expect(1);
        test.ok( board, 'Board instance' );
        test.done();
    },
    "serialport": function (test) {
        var board = this.board;

        test.expect(1);
        test.ok( board.serialport, 'Board instance serial port' );
        test.done();
    },
    "ready event": function (test) {
        var board = this.board;

        test.expect(1);
        board.on('ready', function () {
            test.ok(true);
            test.done();
        });

        board.serialport.emit('open');
    }
};
