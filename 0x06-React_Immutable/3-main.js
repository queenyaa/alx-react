import { getListObject, addElementToList } from './3-list.js';

// Create an immutable List from an array
const immutableList = getListObject([1, 2, 3]);

// Add a number to the immutable List
const newListWithNumber = addElementToList(immutableList, 4);

// Add a string to the immutable List
const newListWithString = addElementToList(immutableList, 'hello');

// Log the results
console.log(immutableList); // Should log: List [ 1, 2, 3 ]
console.log(newListWithNumber); // Should log: List [ 1, 2, 3, 4 ]
console.log(newListWithString); // Should log: List [ 1, 2, 3, 'hello' ]
