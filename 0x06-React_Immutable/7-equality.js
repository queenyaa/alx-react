import { is } from 'immutable';

// Function to compare two Immutable Maps for equality
export default function areMapsEqual(map1, map2) {
  return is(map1, map2);
}
