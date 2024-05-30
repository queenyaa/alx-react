import { concatElements, mergeElements } from './5-merge.js';

// Test concatElements
const page1 = [1, 2, 3];
const page2 = [4, 5, 6];
const concatenatedList = concatElements(page1, page2);
console.log(concatenatedList); // Should log: List [ 1, 2, 3, 4, 5, 6 ]

// Test mergeElements
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: 4, d: 5 };
const mergedList = mergeElements(obj1, obj2);
console.log(mergedList); // Should log: List [ 1, 4, 3, 5 ]