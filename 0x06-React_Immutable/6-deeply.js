import { Map, List } from 'immutable';

// Function to deeply merge two objects into an Immutable List
export default function mergeDeeplyElements(page1, page2) {
  const map1 = Map(page1);
  const map2 = Map(page2);
  const mergedMap = map1.mergeDeep(map2);
  return List(mergedMap.values());
}
