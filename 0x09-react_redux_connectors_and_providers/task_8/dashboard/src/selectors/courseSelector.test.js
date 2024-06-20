import { fromJS } from 'immutable';
import { getCoursesList } from './courseSelector';

// Mock state
const mockState = {
  courses: fromJS({
    entities: {
      1: { id: 1, name: 'Course 1', credit: 3 },
      2: { id: 2, name: 'Course 2', credit: 4 },
      3: { id: 3, name: 'Course 3', credit: 5 }
    }
  })
};

describe('courseSelector', () => {
  it('should return a List of course entities', () => {
    const expectedCoursesList = fromJS([
      { id: 1, name: 'Course 1', credit: 3 },
      { id: 2, name: 'Course 2', credit: 4 },
      { id: 3, name: 'Course 3', credit: 5 }
    ]);

    const result = getCoursesList(mockState);
    expect(result).toEqual(expectedCoursesList);
  });

  it('should return an empty List if there are no course entities', () => {
    const emptyState = {
      courses: fromJS({
        entities: {}
      })
    };

    const result = getCoursesList(emptyState);
    expect(result).toEqual(fromJS([]));
  });

  it('should return an empty List if state is null or undefined', () => {
    const result = getCoursesList(null);
    expect(result).toEqual(fromJS([]));

    const resultUndefined = getCoursesList(undefined);
    expect(resultUndefined).toEqual(fromJS([]));
  });
});