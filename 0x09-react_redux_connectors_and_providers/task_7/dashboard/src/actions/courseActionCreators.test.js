import { selectCourse, unSelectCourse, fetchCourseSuccess } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('course action creators', () => {

  it('selectCourse should create an action to select a course', () => {
    const index = 1;
    const expectedAction = {
      type: SELECT_COURSE,
      index,
    };
    expect(selectCourse(index)).toEqual(expectedAction);
  });

  it('unSelectCourse should create an action to unselect a course', () => {
    const index = 1;
    const expectedAction = {
      type: UNSELECT_COURSE,
      index,
    };
    expect(unSelectCourse(index)).toEqual(expectedAction);
  });

});

describe('fetchCourseSuccess', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches FETCH_COURSE_SUCCESS with data on successful fetch', async () => {
    // Mock successful fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 1, title: 'ES6' }, { id: 2, title: 'Webpack' }]),
    });

    // Expected actions to be dispatched
    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, data: null }, // Initial dispatch
      { type: FETCH_COURSE_SUCCESS, data: [{ id: 1, title: 'ES6' }, { id: 2, title: 'Webpack' }] }, // Successful fetch dispatch
    ];

    // Dispatch the fetchCourseSuccess action
    await store.dispatch(fetchCourseSuccess());

    // Verify actions dispatched to the store
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('logs error when fetch fails', async () => {
    // Mock failed fetch response
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch courses'));

    // Expected actions to be dispatched
    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, data: null }, // Initial dispatch
    ];

    // Mock console.error to capture log output
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Dispatch the fetchCourseSuccess action
    await store.dispatch(fetchCourseSuccess());

    // Verify actions dispatched to the store
    expect(store.getActions()).toEqual(expectedActions);

    // Verify console.error was called with the correct error message
    expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching courses:', new Error('Failed to fetch courses'));

    // Restore the original console.error function
    consoleErrorMock.mockRestore();
  });
});