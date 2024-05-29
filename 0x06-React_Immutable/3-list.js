import { List } from 'immutable';

// Function to convert an array to an immutable List
export function getListObject(array) {
  return List(array);
}

// Function to add an element (string or any type) to an immutable List
export function addElementToList(list, element) {
  return list.push(element);
}
