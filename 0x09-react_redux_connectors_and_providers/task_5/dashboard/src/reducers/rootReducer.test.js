import rootReducer from './rootReducer';
import { Map, List } from 'immutable';
import { courseNormalizer } from '../schema/courses';
import { normalize } from 'normalizr';
import { courseSchema } from '../schema/courses';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      courses: Map({
        entities: Map({
          courses: Map({})
        }),
        result: List([])
      }),
      notifications: Map({
        notifications: Map({}),
        filter: 'DEFAULT'
      }),
      ui: Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: Map({
          email: '',
          isLoggedIn: false,
        })
      })
    };

    expect(rootReducer(undefined, {})).toEqual(initialState);
  });
});