import { createSelector } from 'reselect';
import { List } from 'immutable';

// Assuming the courses are stored under `state.courses.entities`
const selectCourseEntities = (state) => {
  if (!state || !state.courses) {
    return null;
  }

  return state.courses.get('entities');
};

// Create a selector to get all course entities and return as a List using valueSeq
export const getCoursesList = createSelector(
  [selectCourseEntities],
  (courseEntities) => {
    if (courseEntities) {
      return courseEntities.valueSeq().toList();
    }
    return List();
  }
);