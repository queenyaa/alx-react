import { fromJS } from 'immutable';

/**
 * Converts a plain JavaScript object into an immutable Map.
 *
 * @param {Object} obj - The plain JavaScript object to convert.
 * @return {Map} The resulting immutable Map.
 */
function getImmutableObject(obj) {
  return fromJS(obj);
}

module.exports = { getImmutableObject };