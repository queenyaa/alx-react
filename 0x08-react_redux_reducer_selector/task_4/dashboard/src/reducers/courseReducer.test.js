// reducers/courseReducer.test.js

import { fromJS } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

describe('courseReducer', () => {
  it('should return the default state', () => {
    const initialState = fromJS({
      entities: {
        courses: {}
      },
      result: [],
    });

    const state = courseReducer(undefined, {});

    expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should handle FETCH_COURSE_SUCCESS', () => {
    const initialState = fromJS({
      entities: {
        courses: {}
      },
      result: [],
    });

    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
    };

    const normalizedData = coursesNormalizer(action.data);

    const expectedState = fromJS({
      entities: {
        courses: normalizedData.entities.courses
      },
      result: normalizedData.result,
    });

    const state = courseReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SELECT_COURSE', () => {
    const initialState = fromJS({
      entities: {
        courses: {
          1: { id: 1, name: "ES6", credit: 60, isSelected: false },
          2: { id: 2, name: "Webpack", credit: 20, isSelected: false },
          3: { id: 3, name: "React", credit: 40, isSelected: false },
        }
      },
      result: [1, 2, 3],
    });

    const action = {
      type: SELECT_COURSE,
      index: 2,
    };

    const expectedState = initialState.setIn(['entities', 'courses', '2', 'isSelected'], true);

    const state = courseReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it('should handle UNSELECT_COURSE', () => {
    const initialState = fromJS({
      entities: {
        courses: {
          1: { id: 1, name: "ES6", credit: 60, isSelected: false },
          2: { id: 2, name: "Webpack", credit: 20, isSelected: true },
          3: { id: 3, name: "React", credit: 40, isSelected: false },
        }
      },
      result: [1, 2, 3],
    });

    const action = {
      type: UNSELECT_COURSE,
      index: 2,
    };

    const expectedState = initialState.setIn(['entities', 'courses', '2', 'isSelected'], false);

    const state = courseReducer(initialState, action);

    expect(state.toJS()).toEqual(expectedState.toJS());
  });
});