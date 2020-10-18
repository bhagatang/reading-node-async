const timers = require('timers');

console.log(Object.keys(timers));

console.log(
    'setTimeout === timers.setTimeout = ' + 
    (setTimeout === timers.setTimeout)
);

console.dir({ setTimeout: setTimeout(() => {}, 0).unref() });
console.dir({ setInterval: setInterval(() => {}, 0).unref() });
console.dir({ setImmediate: setImmediate(() => {}).unref() });
console.dir({ nextTick: process.nextTick(() => {}) });