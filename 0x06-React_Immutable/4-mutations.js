import { Map } from 'immutable';

// Create an Immutable Map with the given object
export const map = Map({
  1: 'Liam',
  2: 'Noah',
  3: 'Elijah',
  4: 'Oliver',
  5: 'Jacob',
  6: 'Lucas',
});

// Use map to derive map2 with specified modifications
export const map2 = map.withMutations((m) => {
  m.set(2, 'Benjamin');
  m.set(4, 'Oliver');
});
