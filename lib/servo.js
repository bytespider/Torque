var Board = require('./board');

var util = require('util');
var events = require('events');

function Servo( opts ) {
    if (!(this instanceof Servo)) {
        return new Servo(opts);
    }

    events.EventEmitter.call(this);

    // Ensure opts is an object
    opts = opts || {};

    this.board = Board.instance;
    this.pin = opts.pin;
    this.range = opts.range || [0, 180];
    this.last = null;
    this.isMoving = false;

    this.calibrate(opts.pwmRange || [1000, 2000]);
    this.move('startAngle' in opts ? opts.startAngle : 90);
}
util.inherits(Servo, events.EventEmitter);

Servo.prototype.pin = 0;
Servo.prototype.move = function (degrees, duration) {
    degrees = Board.constrain(degrees, this.range[0], this.range[1]);

    if (this.last != null && this.last == degrees) {
        return;
    }

    var pwm = Math.round(this.pwmRange[0] + ((this.pwmRange[1] - this.pwmRange[0]) / 180 * degrees));
    this.board.servoWrite(this.pin, pwm, duration);

    this.isMoving = true;
    this.last = degrees;
    setImmediate(function () {
        this.emit('move', null, degrees, duration);
    }.bind(this));
};

Servo.prototype.min = function() {
    return this.move(this.range[0]);
};

Servo.prototype.max = function() {
    return this.move(this.range[1]);
};

Servo.prototype.center = function() {
    return this.move(Math.abs((this.range[0] + this.range[1]) / 2));
};

Servo.prototype.calibrate = function (pwm_range) {

    this.pwmRange = pwm_range;
};

module.exports = Servo;
