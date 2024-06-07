// reducers/courseReducer.js

import { fromJS } from 'immutable';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

const initialState = fromJS({
  entities: {
    courses: {}
  },
  result: [],
});

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      const normalizedData = coursesNormalizer(action.data);
      return state.merge({
        entities: fromJS(normalizedData.entities),
        result: fromJS(normalizedData.result),
      });
    case SELECT_COURSE:
      return state.setIn(['entities', 'courses', action.index.toString(), 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn(['entities', 'courses', action.index.toString(), 'isSelected'], false);
    default:
      return state;
  }
};

export default courseReducer;
