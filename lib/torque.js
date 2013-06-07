var constructors = [
    'Board',
    'Servo'
];

constructors.forEach(function (constructor) {
    module.exports[ constructor ] = require( './' + constructor.toLowerCase() );
});
