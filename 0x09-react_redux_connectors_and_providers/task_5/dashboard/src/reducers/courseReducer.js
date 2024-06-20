// reducers/courseReducer.js

import { fromJS } from 'immutable';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';
import { normalize } from 'normalizr';
import { courseSchema } from '../schema/courses';

const initialState = fromJS({
  entities: {
    courses: {}
  },
  result: [],
}); 

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      if (action.data) {
        // const { courses } = action.payload;
        const normalizedData = coursesNormalizer(action.data);
        return state.merge({
           entities: {
            // ...state.entities,
            courses: normalizedData.entities.courses,
           },
          result: normalizedData.result,
        });
      }
      return state;
    case SELECT_COURSE:
      if (typeof action.index === 'number') {
        return state.setIn(['entities', 'courses', action.index.toString(), 'isSelected'], true);
      }
      return state;
    case UNSELECT_COURSE:
      if (typeof action.index === 'number') {
        return state.setIn(['entities', 'courses', action.index.toString(), 'isSelected'], false);
      }
      return state;
    default:
      return state;
  }
};

export default courseReducer;