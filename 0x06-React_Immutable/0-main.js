const { getImmutableObject } = require('./0-fromjs');
const { isMap } = require('immutable');

const obj = {
  fear: true,
  smell: -1033575916.9145899,
  wall: false,
  thing: -914767132
};

const immutableObj = getImmutableObject(obj);

console.log(immutableObj);
console.log(isMap(immutableObj)); 
// Should print true if the object is converted correctly