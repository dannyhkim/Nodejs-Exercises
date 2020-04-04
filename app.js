/* setTimeout(); // used to call function after a delay - used in client, inside browser, or node 
clearTimeout();

setInterval(); // repeatedly call function after given delay 
clearInterval(); // stop function from being called repeatedly 


var message = '';

var sayHello = function() {

}
window.sayHello();

// in node, the object is called global 
console.log(global.message);

// you need to define variables using global. prefix in node to attach it to global object 

console.log(module); // module is a JSON object with attributes 

const log = require('./logger'); // require function is only available in node, not browsers
// returns the object that is exported from the target module

console.log(log);

log('message');
*/ 

const path = require('path');

var pathObj = path.parse(__filename); 
console.log(pathObj);

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// Template string
// helps us build a string without concatenation
// ES6 / ES2015 : ECMAScript 6

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
/* 
const fs = require('fs');

// callback function as 2nd param
fs.readdir('./', function(err, files){
    if(err)
        console.log('Error', err);
    else
        console.log('Result', files);
})

// capital case means class 

const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => { // e for event
    console.log('Listener called', arg);
});

logger.log('message');
*/


// Using http module
const http = require('http');

const server = http.createServer((req, res) => {

    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end();
    }
});

server.listen(3000);
console.log("Listening on port 3000...");






