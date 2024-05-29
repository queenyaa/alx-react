import { Map } from 'immutable';

export default function accessImmutableObject(object, array) {
    // Use reduce to traverse the object according to the path
    return array.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, object);
  }
