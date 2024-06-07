// reducers/courseReducer.test.js

import courseReducer from './courseReducer.js';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes.js';

describe('courseReducer', () => {
  it('should return the default state when no action is passed', () => {
    const newState = courseReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it('should return the data passed when FETCH_COURSE_SUCCESS action is dispatched', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
    const action = { type: FETCH_COURSE_SUCCESS, data: courses };
    const newState = courseReducer([], action);
    expect(newState).toEqual([
      { id: 1, name: 'ES6', credit: 60, isSelected: false },
      { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      { id: 3, name: 'React', credit: 40, isSelected: false },
    ]);
  });

  it('should update the correct course to selected when SELECT_COURSE action is dispatched', () => {
    const prevState = [
      { id: 1, name: 'ES6', credit: 60, isSelected: false },
      { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      { id: 3, name: 'React', credit: 40, isSelected: false },
    ];
    const action = { type: SELECT_COURSE, index: 2 };
    const newState = courseReducer(prevState, action);
    expect(newState[1].isSelected).toBe(true);
  });

  it('should update the correct course to unselected when UNSELECT_COURSE action is dispatched', () => {
    const prevState = [
      { id: 1, name: 'ES6', credit: 60, isSelected: false },
      { id: 2, name: 'Webpack', credit: 20, isSelected: true },
      { id: 3, name: 'React', credit: 40, isSelected: false },
    ];
    const action = { type: UNSELECT_COURSE, index: 2 };
    const newState = courseReducer(prevState, action);
    expect(newState[1].isSelected).toBe(false);
  });
});
