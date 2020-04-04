// capital case means class 
const EventEmitter = require('events');

var url = 'http://mylogger.io/log';


// extend EventEmitter class to be able to use all its functions 
class Logger extends EventEmitter{
    // when function is inside class, call it method
    log(message) {
        // Send an HTTP request 
        console.log(message);
    
        // Raise an event, 2nd param is data about event, can use this keyword
        this.emit('messageLogged', {id: 1, url: 'http://'});
    
    };
}


// when exporting only a single function or variable, you can set exports directly equal to the fct/var you want to export
module.exports = Logger; // adding method log to exports object, setting it to log function defined above

/*
exports.log = log; // this is ok

exports = log; // cannot do this, cannot change reference module.exports = 
*/