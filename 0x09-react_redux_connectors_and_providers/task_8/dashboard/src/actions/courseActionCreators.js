import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';


export const selectCourse = (index) => {
  return {
    type: SELECT_COURSE,
    index,
  };
};

export const boundSelectCourse = (index) => (dispatch) => dispatch(selectCourse(index));

export const unSelectCourse = (index) => {
  return {
    type: UNSELECT_COURSE,
    index,
  };
};

export const boundUnSelectCourse = (index) => (dispatch) => dispatch(unSelectCourse(index));


export const fetchCourseSuccess = () => async (dispatch) => {
  // return (dispatch) => {
    dispatch({ type: FETCH_COURSE_SUCCESS, data: null });

    try {
      const response = await fetch('/dist/courses.json');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
    //  return data;
      dispatch({ type: FETCH_COURSE_SUCCESS, data });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  //};
};