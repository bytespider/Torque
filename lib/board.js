var serialport = require("serialport");
var util = require('util');
var events = require('events');

function Board(opts) {
    if (!(this instanceof Board)) {
        return new Board(opts);
    }

    events.EventEmitter.call(this);

    var board = this;

    // Ensure opts is an object
    opts = opts || {};

    this.ready = false;
    var sp = this.serialport = opts.serialport || new serialport.SerialPort(opts.port, {
        baudrate: opts.baudrate || 9600
    }, true);

    sp.on('open', function () {
        board.emit('ready');
    });

    sp.on('error', function (error) {
        board.emit('error', error);
    });

    sp.on('data', function (data) {
        // do something with data
        board.emit('data', data);
    });

    Board.instance = this;
}
util.inherits(Board, events.EventEmitter);

Board.prototype.servoWrite = function(pin, degrees, duration) {
    this.serialport.write('#' + pin + 'P' + Math.round(1000 + 5.555555556 * degrees) + (duration > 0 ? 'T' + duration : '') + "\r");
};

Board.prototype.wait = function (time, callback) {
    return setTimeout(callback.bind(this), time);
};

Board.prototype.loop = function (time, callback) {
    return setInterval(callback.bind(this), time);
};

Board.constrain = function (value, min, max) {
    return  (value < min) ? min : ((value > max) ? max : value);
};

module.exports = Board;
